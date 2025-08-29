/**
 * TeddyCloud Device Mapper
 * 
 * Maps TeddyCloud MQTT topics to Home Assistant devices and entities
 * following the MQTT Discovery protocol.
 */

/**
 * Generate device configuration for MQTT discovery
 */
export function generateDeviceConfig(deviceType, deviceInfo) {
  if (deviceType === 'server') {
    return {
      identifiers: [`teddycloud_server_${deviceInfo.id}`],
      name: `TeddyCloud Server (${deviceInfo.id})`,
      manufacturer: "TeddyCloud",
      model: "TeddyCloud Server",
      sw_version: deviceInfo.version || "unknown",
      configuration_url: deviceInfo.url || null,
      connections: deviceInfo.ip ? [["ip", deviceInfo.ip]] : undefined
    };
  } else if (deviceType === 'box') {
    return {
      identifiers: [`toniebox_${deviceInfo.id}`],
      name: deviceInfo.name || `Toniebox ${deviceInfo.id}`,
      manufacturer: "Boxine",
      model: "Toniebox",
      hw_version: deviceInfo.hardware_version || null,
      sw_version: deviceInfo.firmware_version || null,
      via_device: [`teddycloud_server_${deviceInfo.serverId}`]
    };
  }
  
  throw new Error(`Unknown device type: ${deviceType}`);
}

/**
 * Generate entity configurations for MQTT discovery
 */
export function generateEntityConfigs(deviceType, deviceInfo) {
  if (deviceType === 'server') {
    return generateServerEntityConfigs(deviceInfo);
  } else if (deviceType === 'box') {
    return generateBoxEntityConfigs(deviceInfo);
  }
  
  throw new Error(`Unknown device type: ${deviceType}`);
}

/**
 * Generate entity configurations for TeddyCloud server
 */
function generateServerEntityConfigs(serverInfo) {
  const device = generateDeviceConfig('server', serverInfo);
  const baseTopic = `${serverInfo.prefix}/teddy/server`;
  
  return {
    binary_sensor: [
      {
        name: "TeddyCloud Server Status",
        object_id: "status",
        unique_id: `teddycloud_server_${serverInfo.id}_status`,
        state_topic: `${baseTopic}/status`,
        payload_on: "online",
        payload_off: "offline",
        device_class: "connectivity",
        icon: "mdi:server-network",
        device: device
      }
    ],
    sensor: [
      {
        name: "Connected Tonieboxes",
        object_id: "boxes_count",
        unique_id: `teddycloud_server_${serverInfo.id}_boxes_count`,
        state_topic: `${baseTopic}/boxes_count`,
        unit_of_measurement: "boxes",
        icon: "mdi:toy-brick",
        device: device
      },
      {
        name: "TeddyCloud Version",
        object_id: "version",
        unique_id: `teddycloud_server_${serverInfo.id}_version`,
        state_topic: `${baseTopic}/version`,
        icon: "mdi:information",
        device: device
      },
      {
        name: "Uptime",
        object_id: "uptime",
        unique_id: `teddycloud_server_${serverInfo.id}_uptime`,
        state_topic: `${baseTopic}/uptime`,
        unit_of_measurement: "s",
        device_class: "duration",
        icon: "mdi:timer",
        device: device
      }
    ],
    switch: [
      {
        name: "Cloud Operation",
        object_id: "cloud_enabled",
        unique_id: `teddycloud_server_${serverInfo.id}_cloud_enabled`,
        state_topic: `${baseTopic}/cloud/enabled`,
        command_topic: `${baseTopic}/cloud/enabled/set`,
        payload_on: "true",
        payload_off: "false",
        icon: "mdi:cloud",
        device: device
      },
      {
        name: "Cache Cloud Content",
        object_id: "cache_content",
        unique_id: `teddycloud_server_${serverInfo.id}_cache_content`,
        state_topic: `${baseTopic}/cloud/cache`,
        command_topic: `${baseTopic}/cloud/cache/set`,
        payload_on: "true",
        payload_off: "false",
        icon: "mdi:cloud-download",
        device: device
      }
    ]
  };
}

/**
 * Generate entity configurations for Toniebox
 */
function generateBoxEntityConfigs(boxInfo) {
  const device = generateDeviceConfig('box', boxInfo);
  const baseTopic = `${boxInfo.prefix}/teddy/box/${boxInfo.id}`;
  
  return {
    binary_sensor: [
      {
        name: `${boxInfo.name} Online`,
        object_id: "online",
        unique_id: `toniebox_${boxInfo.id}_online`,
        state_topic: `${baseTopic}/status`,
        payload_on: "online",
        payload_off: "offline",
        device_class: "connectivity",
        icon: "mdi:network",
        device: device
      },
      {
        name: `${boxInfo.name} Charger`,
        object_id: "charger",
        unique_id: `toniebox_${boxInfo.id}_charger`,
        state_topic: `${baseTopic}/charger`,
        payload_on: "true",
        payload_off: "false",
        device_class: "battery_charging",
        icon: "mdi:battery-charging",
        device: device
      },
      {
        name: `${boxInfo.name} Tag Valid`,
        object_id: "tag_valid",
        unique_id: `toniebox_${boxInfo.id}_tag_valid`,
        state_topic: `${baseTopic}/tag/valid`,
        payload_on: "true",
        payload_off: "false",
        icon: "mdi:tag",
        device: device
      }
    ],
    sensor: [
      {
        name: `${boxInfo.name} Content Title`,
        object_id: "content_title",
        unique_id: `toniebox_${boxInfo.id}_content_title`,
        state_topic: `${baseTopic}/content/title`,
        icon: "mdi:music",
        device: device
      },
      {
        name: `${boxInfo.name} Content Audio ID`,
        object_id: "content_audio_id",
        unique_id: `toniebox_${boxInfo.id}_content_audio_id`,
        state_topic: `${baseTopic}/content/audio_id`,
        icon: "mdi:identifier",
        device: device
      },
      {
        name: `${boxInfo.name} Tag UID`,
        object_id: "tag_uid",
        unique_id: `toniebox_${boxInfo.id}_tag_uid`,
        state_topic: `${baseTopic}/tag/uid`,
        icon: "mdi:tag",
        device: device
      },
      {
        name: `${boxInfo.name} Volume Level`,
        object_id: "volume_level",
        unique_id: `toniebox_${boxInfo.id}_volume_level`,
        state_topic: `${baseTopic}/volume/level`,
        unit_of_measurement: "%",
        icon: "mdi:volume-medium",
        device: device
      },
      {
        name: `${boxInfo.name} Volume dB`,
        object_id: "volume_db",
        unique_id: `toniebox_${boxInfo.id}_volume_db`,
        state_topic: `${baseTopic}/volume/db`,
        unit_of_measurement: "dB",
        device_class: "sound_pressure",
        icon: "mdi:volume-high",
        device: device
      },
      {
        name: `${boxInfo.name} Battery Level`,
        object_id: "battery_level",
        unique_id: `toniebox_${boxInfo.id}_battery_level`,
        state_topic: `${baseTopic}/battery/level`,
        unit_of_measurement: "%",
        device_class: "battery",
        icon: "mdi:battery",
        device: device
      },
      {
        name: `${boxInfo.name} Playback Position`,
        object_id: "playback_position",
        unique_id: `toniebox_${boxInfo.id}_playback_position`,
        state_topic: `${baseTopic}/playback/position`,
        unit_of_measurement: "s",
        device_class: "duration",
        icon: "mdi:progress-clock",
        device: device
      }
    ],
    image: [
      {
        name: `${boxInfo.name} Content Picture`,
        object_id: "content_picture",
        unique_id: `toniebox_${boxInfo.id}_content_picture`,
        url_topic: `${baseTopic}/content/picture_url`,
        icon: "mdi:image",
        device: device
      }
    ],
    event: [
      {
        name: `${boxInfo.name} Volume Up`,
        object_id: "volume_up",
        unique_id: `toniebox_${boxInfo.id}_volume_up`,
        state_topic: `${baseTopic}/events/volume_up`,
        event_types: ["pressed"],
        icon: "mdi:ear-hearing",
        device: device
      },
      {
        name: `${boxInfo.name} Volume Down`,
        object_id: "volume_down",
        unique_id: `toniebox_${boxInfo.id}_volume_down`,
        state_topic: `${baseTopic}/events/volume_down`,
        event_types: ["pressed"],
        icon: "mdi:ear-hearing-off",
        device: device
      },
      {
        name: `${boxInfo.name} Tonie Placed`,
        object_id: "tonie_placed",
        unique_id: `toniebox_${boxInfo.id}_tonie_placed`,
        state_topic: `${baseTopic}/events/tonie_placed`,
        event_types: ["placed"],
        icon: "mdi:toy-brick-plus",
        device: device
      },
      {
        name: `${boxInfo.name} Tonie Removed`,
        object_id: "tonie_removed",
        unique_id: `toniebox_${boxInfo.id}_tonie_removed`,
        state_topic: `${baseTopic}/events/tonie_removed`,
        event_types: ["removed"],
        icon: "mdi:toy-brick-minus",
        device: device
      }
    ],
    number: [
      {
        name: `${boxInfo.name} Volume Control`,
        object_id: "volume_control",
        unique_id: `toniebox_${boxInfo.id}_volume_control`,
        state_topic: `${baseTopic}/volume/level`,
        command_topic: `${baseTopic}/volume/level/set`,
        min: 0,
        max: 100,
        unit_of_measurement: "%",
        icon: "mdi:volume-medium",
        device: device
      }
    ]
  };
}

/**
 * Get entity mapping for Home Assistant device registry
 */
export function getEntityMapping(deviceType, deviceId) {
  if (deviceType === 'server') {
    return {
      device_id: `teddycloud_server_${deviceId}`,
      entities: {
        status: `binary_sensor.teddycloud_server_${deviceId}_status`,
        boxes_count: `sensor.teddycloud_server_${deviceId}_boxes_count`,
        version: `sensor.teddycloud_server_${deviceId}_version`,
        uptime: `sensor.teddycloud_server_${deviceId}_uptime`,
        cloud_enabled: `switch.teddycloud_server_${deviceId}_cloud_enabled`,
        cache_content: `switch.teddycloud_server_${deviceId}_cache_content`
      }
    };
  } else if (deviceType === 'box') {
    return {
      device_id: `toniebox_${deviceId}`,
      entities: {
        online: `binary_sensor.toniebox_${deviceId}_online`,
        charger: `binary_sensor.toniebox_${deviceId}_charger`,
        tag_valid: `binary_sensor.toniebox_${deviceId}_tag_valid`,
        content_title: `sensor.toniebox_${deviceId}_content_title`,
        content_audio_id: `sensor.toniebox_${deviceId}_content_audio_id`,
        tag_uid: `sensor.toniebox_${deviceId}_tag_uid`,
        volume_level: `sensor.toniebox_${deviceId}_volume_level`,
        volume_db: `sensor.toniebox_${deviceId}_volume_db`,
        battery_level: `sensor.toniebox_${deviceId}_battery_level`,
        playback_position: `sensor.toniebox_${deviceId}_playback_position`,
        content_picture: `image.toniebox_${deviceId}_content_picture`,
        volume_up: `event.toniebox_${deviceId}_volume_up`,
        volume_down: `event.toniebox_${deviceId}_volume_down`,
        tonie_placed: `event.toniebox_${deviceId}_tonie_placed`,
        tonie_removed: `event.toniebox_${deviceId}_tonie_removed`,
        volume_control: `number.toniebox_${deviceId}_volume_control`
      }
    };
  }
  
  throw new Error(`Unknown device type: ${deviceType}`);
}

/**
 * Generate removal messages for MQTT discovery
 */
export function generateRemovalMessages(deviceType, deviceId, discoveryPrefix = 'homeassistant') {
  const entityMapping = getEntityMapping(deviceType, deviceId);
  const removalMessages = [];

  // Generate removal topic for each entity
  for (const [entityKey, entityId] of Object.entries(entityMapping.entities)) {
    const entityParts = entityId.split('.');
    const domain = entityParts[0];
    const objectId = entityParts[1];
    
    const removalTopic = `${discoveryPrefix}/${domain}/${objectId}/config`;
    removalMessages.push({
      topic: removalTopic,
      payload: '' // Empty payload removes the entity
    });
  }

  return removalMessages;
}

/**
 * Validate MQTT discovery configuration
 */
export function validateDiscoveryConfig(config) {
  const required = ['name', 'unique_id', 'device'];
  const missing = required.filter(field => !config[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }

  if (!config.device.identifiers || config.device.identifiers.length === 0) {
    throw new Error('Device must have at least one identifier');
  }

  if (!config.device.name) {
    throw new Error('Device must have a name');
  }

  return true;
}

/**
 * Merge multiple entity configurations
 */
export function mergeEntityConfigs(...configs) {
  const merged = {};

  for (const config of configs) {
    for (const [entityType, entities] of Object.entries(config)) {
      if (!merged[entityType]) {
        merged[entityType] = [];
      }
      merged[entityType].push(...(Array.isArray(entities) ? entities : [entities]));
    }
  }

  return merged;
}