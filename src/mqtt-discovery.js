/**
 * TeddyCloud MQTT Discovery Service
 * 
 * Monitors MQTT topics for TeddyCloud instances and their Tonieboxes,
 * then publishes Home Assistant MQTT discovery messages to create
 * proper devices and entities automatically.
 */

import { generateDeviceConfig, generateEntityConfigs } from './device-mapper.js';

export class TeddyCloudMqttDiscovery {
  constructor(mqttClient, discoveryPrefix = 'homeassistant') {
    this.mqtt = mqttClient;
    this.discoveryPrefix = discoveryPrefix;
    this.discoveredServers = new Map(); // serverId -> server info
    this.discoveredBoxes = new Map();   // boxId -> box info
    this.subscriptions = [];
    
    // Bind methods to preserve context
    this.onMessage = this.onMessage.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
  }

  /**
   * Start the discovery service
   */
  async start() {
    console.log('🔍 Starting TeddyCloud MQTT Discovery Service...');
    
    try {
      // Subscribe to MQTT events
      this.mqtt.on('connect', this.onConnect);
      this.mqtt.on('message', this.onMessage);
      this.mqtt.on('disconnect', this.onDisconnect);
      
      // Subscribe to discovery topics
      await this.subscribeToDiscoveryTopics();
      
      console.log('✅ TeddyCloud MQTT Discovery Service started successfully');
    } catch (error) {
      console.error('❌ Failed to start TeddyCloud MQTT Discovery Service:', error);
      throw error;
    }
  }

  /**
   * Stop the discovery service
   */
  async stop() {
    console.log('🛑 Stopping TeddyCloud MQTT Discovery Service...');
    
    try {
      // Unsubscribe from all topics
      for (const topic of this.subscriptions) {
        await this.mqtt.unsubscribe(topic);
      }
      this.subscriptions = [];
      
      // Remove event listeners
      this.mqtt.off('connect', this.onConnect);
      this.mqtt.off('message', this.onMessage);
      this.mqtt.off('disconnect', this.onDisconnect);
      
      console.log('✅ TeddyCloud MQTT Discovery Service stopped');
    } catch (error) {
      console.error('❌ Error stopping TeddyCloud MQTT Discovery Service:', error);
    }
  }

  /**
   * Subscribe to MQTT topics for TeddyCloud discovery
   */
  async subscribeToDiscoveryTopics() {
    const topics = [
      '+/teddy',           // TeddyCloud server status
      '+/teddy/box/+',     // Individual Toniebox discovery
      '+/teddy/box/+/+',   // Toniebox entity data
    ];

    for (const topic of topics) {
      try {
        await this.mqtt.subscribe(topic, { qos: 1 });
        this.subscriptions.push(topic);
        console.log(`📡 Subscribed to: ${topic}`);
      } catch (error) {
        console.error(`❌ Failed to subscribe to ${topic}:`, error);
      }
    }
  }

  /**
   * Handle MQTT connection
   */
  onConnect() {
    console.log('🔗 MQTT connected - rescanning for TeddyCloud instances...');
    // Request current status from all TeddyCloud instances
    this.requestStatusUpdate();
  }

  /**
   * Handle MQTT disconnection
   */
  onDisconnect() {
    console.log('🔌 MQTT disconnected - marking devices as unavailable...');
    // Mark all discovered devices as offline
    this.markAllDevicesOffline();
  }

  /**
   * Request status update from TeddyCloud instances
   */
  requestStatusUpdate() {
    // Send a request to all possible TeddyCloud instances to report their status
    // This helps discover instances after reconnection
    this.mqtt.publish('teddycloud/discovery/request', 'status', { qos: 1, retain: false });
  }

  /**
   * Mark all discovered devices as offline
   */
  markAllDevicesOffline() {
    for (const [serverId, server] of this.discoveredServers) {
      this.updateServerStatus(serverId, 'offline');
    }
    
    for (const [boxId, box] of this.discoveredBoxes) {
      this.updateBoxStatus(box.serverId, boxId, 'offline');
    }
  }

  /**
   * Handle incoming MQTT messages
   */
  async onMessage(topic, message) {
    const payload = message.toString();
    
    try {
      // Parse the topic to determine what type of message this is
      const parsedTopic = this.parseTopic(topic);
      
      if (!parsedTopic) {
        return; // Not a TeddyCloud topic we care about
      }

      switch (parsedTopic.type) {
        case 'server_status':
          await this.handleServerStatus(parsedTopic, payload);
          break;
          
        case 'box_discovery':
          await this.handleBoxDiscovery(parsedTopic, payload);
          break;
          
        case 'box_entity':
          await this.handleBoxEntity(parsedTopic, payload);
          break;
          
        default:
          console.debug(`🤷 Unknown topic type: ${parsedTopic.type}`);
      }
    } catch (error) {
      console.error(`❌ Error processing MQTT message on topic ${topic}:`, error);
    }
  }

  /**
   * Parse MQTT topic to extract information
   */
  parseTopic(topic) {
    // Pattern: {prefix}/teddy
    const serverMatch = topic.match(/^([^/]+)\/teddy$/);
    if (serverMatch) {
      return {
        type: 'server_status',
        prefix: serverMatch[1],
        serverId: this.generateServerId(serverMatch[1])
      };
    }

    // Pattern: {prefix}/teddy/box/{boxId}
    const boxDiscoveryMatch = topic.match(/^([^/]+)\/teddy\/box\/([A-F0-9]+)$/);
    if (boxDiscoveryMatch) {
      return {
        type: 'box_discovery',
        prefix: boxDiscoveryMatch[1],
        serverId: this.generateServerId(boxDiscoveryMatch[1]),
        boxId: boxDiscoveryMatch[2]
      };
    }

    // Pattern: {prefix}/teddy/box/{boxId}/{entity}
    const boxEntityMatch = topic.match(/^([^/]+)\/teddy\/box\/([A-F0-9]+)\/(.+)$/);
    if (boxEntityMatch) {
      return {
        type: 'box_entity',
        prefix: boxEntityMatch[1],
        serverId: this.generateServerId(boxEntityMatch[1]),
        boxId: boxEntityMatch[2],
        entity: boxEntityMatch[3]
      };
    }

    return null; // Not a recognized pattern
  }

  /**
   * Generate a unique server ID from topic prefix
   */
  generateServerId(prefix) {
    // Convert topic prefix to a valid Home Assistant device identifier
    return prefix.toLowerCase().replace(/[^a-z0-9_]/g, '_');
  }

  /**
   * Handle TeddyCloud server status messages
   */
  async handleServerStatus(parsedTopic, payload) {
    const { serverId, prefix } = parsedTopic;
    const status = payload.toLowerCase();

    console.log(`🖥️ TeddyCloud Server ${serverId}: ${status}`);

    if (status === 'online') {
      // Discover or update server
      await this.discoverServer(serverId, prefix, payload);
    } else if (status === 'offline') {
      // Mark server as offline
      this.updateServerStatus(serverId, 'offline');
    }
  }

  /**
   * Handle Toniebox discovery messages
   */
  async handleBoxDiscovery(parsedTopic, payload) {
    const { serverId, boxId, prefix } = parsedTopic;

    console.log(`📦 Toniebox ${boxId} discovered on server ${serverId}`);

    try {
      // Parse box information from payload
      let boxInfo;
      try {
        boxInfo = JSON.parse(payload);
      } catch {
        // If payload is not JSON, treat it as a simple status
        boxInfo = { status: payload, name: `Toniebox ${boxId}` };
      }

      await this.discoverBox(serverId, boxId, boxInfo, prefix);
    } catch (error) {
      console.error(`❌ Error discovering box ${boxId}:`, error);
    }
  }

  /**
   * Handle Toniebox entity data messages
   */
  async handleBoxEntity(parsedTopic, payload) {
    const { serverId, boxId, entity } = parsedTopic;

    // Update entity data for the box
    if (!this.discoveredBoxes.has(boxId)) {
      console.warn(`📦 Received entity data for unknown box ${boxId}`);
      return;
    }

    const box = this.discoveredBoxes.get(boxId);
    if (!box.entities) {
      box.entities = {};
    }

    box.entities[entity] = payload;
    box.lastSeen = Date.now();

    // Trigger entity update in Home Assistant
    await this.updateBoxEntity(serverId, boxId, entity, payload);
  }

  /**
   * Discover and register a TeddyCloud server
   */
  async discoverServer(serverId, prefix, statusPayload) {
    const serverInfo = {
      id: serverId,
      prefix: prefix,
      status: 'online',
      lastSeen: Date.now(),
      boxes: new Set()
    };

    this.discoveredServers.set(serverId, serverInfo);

    // Publish MQTT discovery message for the server device
    await this.publishServerDiscovery(serverInfo);

    console.log(`✅ TeddyCloud Server ${serverId} registered`);
  }

  /**
   * Discover and register a Toniebox
   */
  async discoverBox(serverId, boxId, boxInfo, prefix) {
    const boxData = {
      id: boxId,
      serverId: serverId,
      prefix: prefix,
      name: boxInfo.name || `Toniebox ${boxId}`,
      status: boxInfo.status || 'online',
      lastSeen: Date.now(),
      entities: {}
    };

    this.discoveredBoxes.set(boxId, boxData);

    // Add box to server's box list
    if (this.discoveredServers.has(serverId)) {
      this.discoveredServers.get(serverId).boxes.add(boxId);
    }

    // Publish MQTT discovery messages for the box and its entities
    await this.publishBoxDiscovery(boxData);

    console.log(`✅ Toniebox ${boxId} registered on server ${serverId}`);
  }

  /**
   * Publish MQTT discovery message for TeddyCloud server
   */
  async publishServerDiscovery(serverInfo) {
    const deviceConfig = generateDeviceConfig('server', serverInfo);
    const entityConfigs = generateEntityConfigs('server', serverInfo);

    // Publish device discovery
    for (const [entityType, config] of Object.entries(entityConfigs)) {
      const topic = `${this.discoveryPrefix}/${entityType}/${serverInfo.id}_server_${config.object_id}/config`;
      
      try {
        await this.mqtt.publish(topic, JSON.stringify(config), { 
          qos: 1, 
          retain: true 
        });
        console.log(`📢 Published server entity discovery: ${entityType}/${config.object_id}`);
      } catch (error) {
        console.error(`❌ Failed to publish server discovery for ${entityType}:`, error);
      }
    }
  }

  /**
   * Publish MQTT discovery message for Toniebox
   */
  async publishBoxDiscovery(boxData) {
    const deviceConfig = generateDeviceConfig('box', boxData);
    const entityConfigs = generateEntityConfigs('box', boxData);

    // Publish device discovery for each entity
    for (const [entityType, entities] of Object.entries(entityConfigs)) {
      for (const config of entities) {
        const topic = `${this.discoveryPrefix}/${entityType}/${boxData.id}_${config.object_id}/config`;
        
        try {
          await this.mqtt.publish(topic, JSON.stringify(config), { 
            qos: 1, 
            retain: true 
          });
          console.log(`📢 Published box entity discovery: ${entityType}/${config.object_id}`);
        } catch (error) {
          console.error(`❌ Failed to publish box discovery for ${entityType}:`, error);
        }
      }
    }
  }

  /**
   * Update server status
   */
  updateServerStatus(serverId, status) {
    if (this.discoveredServers.has(serverId)) {
      const server = this.discoveredServers.get(serverId);
      server.status = status;
      server.lastSeen = Date.now();

      // Publish status update
      const statusTopic = `${server.prefix}/teddy/server/status`;
      this.mqtt.publish(statusTopic, status, { qos: 1, retain: true });
    }
  }

  /**
   * Update box status
   */
  updateBoxStatus(serverId, boxId, status) {
    if (this.discoveredBoxes.has(boxId)) {
      const box = this.discoveredBoxes.get(boxId);
      box.status = status;
      box.lastSeen = Date.now();

      // Publish status update
      const statusTopic = `${box.prefix}/teddy/box/${boxId}/status`;
      this.mqtt.publish(statusTopic, status, { qos: 1, retain: true });
    }
  }

  /**
   * Update specific box entity
   */
  async updateBoxEntity(serverId, boxId, entity, payload) {
    // This would trigger Home Assistant entity updates
    // For now, just log the update
    console.log(`📊 Box ${boxId} entity ${entity} updated: ${payload}`);
  }

  /**
   * Get discovered servers
   */
  getDiscoveredServers() {
    return Array.from(this.discoveredServers.values());
  }

  /**
   * Get discovered boxes
   */
  getDiscoveredBoxes(serverId = null) {
    const boxes = Array.from(this.discoveredBoxes.values());
    return serverId ? boxes.filter(box => box.serverId === serverId) : boxes;
  }

  /**
   * Get box by ID
   */
  getBox(boxId) {
    return this.discoveredBoxes.get(boxId);
  }

  /**
   * Get server by ID
   */
  getServer(serverId) {
    return this.discoveredServers.get(serverId);
  }
}