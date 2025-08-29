/**
 * MQTT Discovery Configuration Templates
 * 
 * Provides standardized configuration templates for TeddyCloud
 * MQTT discovery messages that create proper Home Assistant devices.
 */

import { generateDeviceConfig, generateEntityConfigs } from './device-mapper.js';

/**
 * Generate complete MQTT discovery configuration for a TeddyCloud server
 */
export function generateServerDiscoveryConfig(serverInfo, discoveryPrefix = 'homeassistant') {
  const deviceConfig = generateDeviceConfig('server', serverInfo);
  const entityConfigs = generateEntityConfigs('server', serverInfo);
  const discoveries = [];

  // Generate discovery messages for each entity type
  for (const [entityType, entities] of Object.entries(entityConfigs)) {
    const entityArray = Array.isArray(entities) ? entities : [entities];
    
    for (const config of entityArray) {
      const topic = `${discoveryPrefix}/${entityType}/${config.unique_id}/config`;
      discoveries.push({
        topic,
        payload: JSON.stringify(config),
        retain: true,
        qos: 1
      });
    }
  }

  return {
    device: deviceConfig,
    discoveries
  };
}

/**
 * Generate complete MQTT discovery configuration for a Toniebox
 */
export function generateBoxDiscoveryConfig(boxInfo, discoveryPrefix = 'homeassistant') {
  const deviceConfig = generateDeviceConfig('box', boxInfo);
  const entityConfigs = generateEntityConfigs('box', boxInfo);
  const discoveries = [];

  // Generate discovery messages for each entity type
  for (const [entityType, entities] of Object.entries(entityConfigs)) {
    const entityArray = Array.isArray(entities) ? entities : [entities];
    
    for (const config of entityArray) {
      const topic = `${discoveryPrefix}/${entityType}/${config.unique_id}/config`;
      discoveries.push({
        topic,
        payload: JSON.stringify(config),
        retain: true,
        qos: 1
      });
    }
  }

  return {
    device: deviceConfig,
    discoveries
  };
}

/**
 * Generate removal configuration for cleaning up discovered entities
 */
export function generateRemovalConfig(deviceType, deviceId, discoveryPrefix = 'homeassistant') {
  const removalMessages = [];

  if (deviceType === 'server') {
    const serverEntityTypes = [
      { type: 'binary_sensor', objects: ['status'] },
      { type: 'sensor', objects: ['boxes_count', 'version', 'uptime'] },
      { type: 'switch', objects: ['cloud_enabled', 'cache_content'] }
    ];

    for (const { type, objects } of serverEntityTypes) {
      for (const objectId of objects) {
        const uniqueId = `teddycloud_server_${deviceId}_${objectId}`;
        removalMessages.push({
          topic: `${discoveryPrefix}/${type}/${uniqueId}/config`,
          payload: '',
          retain: true,
          qos: 1
        });
      }
    }
  } else if (deviceType === 'box') {
    const boxEntityTypes = [
      { type: 'binary_sensor', objects: ['online', 'charger', 'tag_valid'] },
      { type: 'sensor', objects: ['content_title', 'content_audio_id', 'tag_uid', 'volume_level', 'volume_db', 'battery_level', 'playback_position'] },
      { type: 'image', objects: ['content_picture'] },
      { type: 'event', objects: ['volume_up', 'volume_down', 'tonie_placed', 'tonie_removed'] },
      { type: 'number', objects: ['volume_control'] }
    ];

    for (const { type, objects } of boxEntityTypes) {
      for (const objectId of objects) {
        const uniqueId = `toniebox_${deviceId}_${objectId}`;
        removalMessages.push({
          topic: `${discoveryPrefix}/${type}/${uniqueId}/config`,
          payload: '',
          retain: true,
          qos: 1
        });
      }
    }
  }

  return removalMessages;
}

/**
 * Create a device availability configuration
 */
export function generateAvailabilityConfig(deviceType, deviceInfo) {
  const baseTopic = deviceType === 'server' 
    ? `${deviceInfo.prefix}/teddy/server`
    : `${deviceInfo.prefix}/teddy/box/${deviceInfo.id}`;

  return {
    availability: {
      topic: `${baseTopic}/status`,
      payload_available: 'online',
      payload_not_available: 'offline'
    }
  };
}

/**
 * Generate Last Will and Testament (LWT) configuration for graceful offline handling
 */
export function generateLWTConfig(deviceType, deviceInfo) {
  const baseTopic = deviceType === 'server' 
    ? `${deviceInfo.prefix}/teddy/server`
    : `${deviceInfo.prefix}/teddy/box/${deviceInfo.id}`;

  return {
    topic: `${baseTopic}/status`,
    payload: 'offline',
    retain: true,
    qos: 1
  };
}

/**
 * Batch discovery configuration for multiple devices
 */
export function generateBatchDiscoveryConfig(servers = [], boxes = [], discoveryPrefix = 'homeassistant') {
  const allDiscoveries = [];

  // Add server discoveries
  for (const server of servers) {
    const serverConfig = generateServerDiscoveryConfig(server, discoveryPrefix);
    allDiscoveries.push(...serverConfig.discoveries);
  }

  // Add box discoveries
  for (const box of boxes) {
    const boxConfig = generateBoxDiscoveryConfig(box, discoveryPrefix);
    allDiscoveries.push(...boxConfig.discoveries);
  }

  return allDiscoveries;
}

/**
 * Validate discovery configuration before publishing
 */
export function validateDiscoveryConfig(config) {
  const errors = [];

  if (!config.topic) {
    errors.push('Missing topic');
  }

  if (!config.payload && config.payload !== '') {
    errors.push('Missing payload');
  }

  if (config.payload && config.payload !== '') {
    try {
      const parsed = JSON.parse(config.payload);
      
      // Validate required fields
      const required = ['name', 'unique_id'];
      for (const field of required) {
        if (!parsed[field]) {
          errors.push(`Missing required field: ${field}`);
        }
      }

      // Validate device information
      if (!parsed.device) {
        errors.push('Missing device configuration');
      } else {
        if (!parsed.device.identifiers || parsed.device.identifiers.length === 0) {
          errors.push('Device must have at least one identifier');
        }
        if (!parsed.device.name) {
          errors.push('Device must have a name');
        }
      }
    } catch (e) {
      errors.push('Invalid JSON payload');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Generate status update configuration for real-time entity updates
 */
export function generateStatusUpdateConfig(deviceType, deviceInfo, entityType, value) {
  const baseTopic = deviceType === 'server' 
    ? `${deviceInfo.prefix}/teddy/server`
    : `${deviceInfo.prefix}/teddy/box/${deviceInfo.id}`;

  return {
    topic: `${baseTopic}/${entityType}`,
    payload: typeof value === 'object' ? JSON.stringify(value) : String(value),
    retain: true,
    qos: 1
  };
}