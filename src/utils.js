/**
 * Utility functions for TeddyCloud entity discovery and management
 */

/**
 * Extract Toniebox ID from an entity ID
 * @param {string} entityId - The entity ID to parse
 * @returns {string|null} The extracted Toniebox ID or null if not found
 */
export function extractBoxIdFromEntity(entityId) {
  if (!entityId || typeof entityId !== 'string') {
    return null;
  }
  
  const match = entityId.match(/teddycloud_box_([^_]+)_/);
  return match ? match[1] : null;
}

/**
 * Check if an entity ID is a TeddyCloud entity
 * @param {string} entityId - The entity ID to check
 * @returns {boolean} True if this is a TeddyCloud entity
 */
export function isTeddyCloudEntity(entityId) {
  return entityId && entityId.includes('teddycloud_box_');
}

/**
 * Check if an entity ID is a TeddyCloud server entity
 * @param {string} entityId - The entity ID to check  
 * @returns {boolean} True if this is a TeddyCloud server entity
 */
export function isTeddyCloudServerEntity(entityId) {
  return entityId && entityId.includes('teddycloud_server_');
}

/**
 * Extract friendly device name from entity attributes
 * @param {object} entity - The Home Assistant entity object
 * @param {string} boxId - The box ID for fallback naming
 * @returns {string} A friendly device name
 */
export function extractDeviceName(entity, boxId) {
  if (!entity?.attributes) {
    return `Toniebox ${boxId}`;
  }
  
  // Try multiple attribute sources for device name
  const friendlyName = entity.attributes.friendly_name;
  const name = entity.attributes.name;
  const deviceName = entity.attributes.device_name;
  
  if (friendlyName) {
    // Remove common prefixes to get a clean name
    return friendlyName
      .replace(/^TeddyCloud Box \w+ /, '')
      .replace(/^Toniebox /, '')
      .replace(/^Box /, '') || `Toniebox ${boxId}`;
  }
  
  if (deviceName) {
    return deviceName;
  }
  
  if (name) {
    return name;
  }
  
  return `Toniebox ${boxId}`;
}

/**
 * Discover all TeddyCloud devices and their entities from Home Assistant state
 * @param {object} hass - Home Assistant object
 * @returns {Map} Map of box ID to device information
 */
export function findTeddyCloudDevices(hass) {
  const devices = new Map();
  
  if (!hass?.states) {
    return devices;
  }
  
  // Group entities by box ID
  Object.keys(hass.states).forEach(entityId => {
    if (isTeddyCloudEntity(entityId)) {
      const boxId = extractBoxIdFromEntity(entityId);
      if (boxId) {
        if (!devices.has(boxId)) {
          devices.set(boxId, {
            id: boxId,
            entities: [],
            name: null,
            sampleEntity: entityId // Store first entity for name extraction
          });
        }
        devices.get(boxId).entities.push(entityId);
      }
    }
  });
  
  // Extract device names from sample entities
  devices.forEach((device, boxId) => {
    const sampleEntity = hass.states[device.sampleEntity];
    device.name = extractDeviceName(sampleEntity, boxId);
  });
  
  return devices;
}

/**
 * Get all expected entity IDs for a specific Toniebox
 * @param {string} boxId - The Toniebox ID
 * @returns {object} Object with all expected entity IDs
 */
export function getExpectedEntities(boxId) {
  return {
    // Image entities
    contentPicture: `image.teddycloud_box_${boxId}_content_picture`,
    
    // Sensor entities  
    contentTitle: `sensor.teddycloud_box_${boxId}_content_title`,
    tagValid: `sensor.teddycloud_box_${boxId}_tag_valid`,
    volumeDb: `sensor.teddycloud_box_${boxId}_volume_db`,
    volumeLevel: `sensor.teddycloud_box_${boxId}_volume_level`,
    contentAudioId: `sensor.teddycloud_box_${boxId}_content_audio_id`,
    
    // Binary sensor entities
    charger: `binary_sensor.teddycloud_box_${boxId}_charger`,
    
    // Event entities
    volumeDown: `event.teddycloud_box_${boxId}_volume_down`,
    volumeUp: `event.teddycloud_box_${boxId}_volume_up`,
    
    // Server entities (shared across all boxes)
    cacheContent: 'switch.teddycloud_server_cloud_cachecontent_cache_cloud_content_on_local_server',
    enableCloud: 'switch.teddycloud_server_cloud_enabled_generally_enable_cloud_operation'
  };
}

/**
 * Validate that all expected entities exist for a Toniebox
 * @param {object} hass - Home Assistant object
 * @param {string} boxId - The Toniebox ID to validate
 * @returns {object} Validation result with missing entities
 */
export function validateTonieboxEntities(hass, boxId) {
  const expected = getExpectedEntities(boxId);
  const missing = [];
  const available = [];
  
  Object.entries(expected).forEach(([key, entityId]) => {
    if (hass?.states?.[entityId]) {
      available.push({ key, entityId });
    } else {
      missing.push({ key, entityId });
    }
  });
  
  return {
    valid: missing.length === 0,
    missing,
    available,
    totalExpected: Object.keys(expected).length,
    foundCount: available.length
  };
}

/**
 * Get suggested entities for entity picker (entities that likely belong to TeddyCloud)
 * @param {object} hass - Home Assistant object
 * @returns {Array} Array of entity objects suitable for entity picker
 */
export function getSuggestedEntities(hass) {
  if (!hass?.states) {
    return [];
  }
  
  return Object.keys(hass.states)
    .filter(entityId => isTeddyCloudEntity(entityId))
    .map(entityId => {
      const entity = hass.states[entityId];
      const boxId = extractBoxIdFromEntity(entityId);
      return {
        value: entityId,
        label: `${extractDeviceName(entity, boxId)} (${entity.attributes?.friendly_name || entityId})`,
        boxId: boxId
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Create a configuration object from a selected entity
 * @param {object} hass - Home Assistant object
 * @param {string} entityId - The selected entity ID
 * @returns {object} Partial configuration object
 */
export function createConfigFromEntity(hass, entityId) {
  const boxId = extractBoxIdFromEntity(entityId);
  if (!boxId) {
    throw new Error('Invalid entity selected - cannot extract Toniebox ID');
  }
  
  const entity = hass.states[entityId];
  const deviceName = extractDeviceName(entity, boxId);
  
  return {
    entity_source: entityId,
    toniebox_id: boxId,
    toniebox_name: deviceName,
    selection_mode: 'auto'
  };
}

/**
 * Discover TeddyCloud devices from Home Assistant device registry
 * @param {object} hass - Home Assistant object
 * @returns {Array} Array of TeddyCloud devices
 */
export function findTeddyCloudHADevices(hass) {
  const devices = [];
  
  if (!hass?.devices) {
    return devices;
  }
  
  // Look for devices with TeddyCloud identifiers
  Object.values(hass.devices).forEach(device => {
    if (device.identifiers) {
      const teddyIdentifier = device.identifiers.find(id => 
        id.includes('toniebox_') || id.includes('teddycloud_server_')
      );
      
      if (teddyIdentifier) {
        const deviceType = teddyIdentifier.includes('toniebox_') ? 'box' : 'server';
        const deviceId = teddyIdentifier.replace(/^(toniebox_|teddycloud_server_)/, '');
        
        devices.push({
          id: deviceId,
          device_id: device.id,
          name: device.name || device.name_by_user || `${deviceType} ${deviceId}`,
          type: deviceType,
          manufacturer: device.manufacturer,
          model: device.model,
          sw_version: device.sw_version,
          hw_version: device.hw_version,
          identifiers: device.identifiers,
          connections: device.connections,
          via_device: device.via_device
        });
      }
    }
  });
  
  return devices.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get all entities associated with a specific device
 * @param {object} hass - Home Assistant object
 * @param {string} deviceId - The Home Assistant device ID
 * @returns {Array} Array of entity IDs associated with the device
 */
export function getDeviceEntities(hass, deviceId) {
  const entities = [];
  
  if (!hass?.entities || !deviceId) {
    return entities;
  }
  
  Object.values(hass.entities).forEach(entityReg => {
    if (entityReg.device_id === deviceId) {
      entities.push(entityReg.entity_id);
    }
  });
  
  return entities;
}

/**
 * Create configuration from selected device
 * @param {object} hass - Home Assistant object  
 * @param {string} deviceId - The selected device ID
 * @returns {object} Configuration object
 */
export function createConfigFromDevice(hass, deviceId) {
  const devices = findTeddyCloudHADevices(hass);
  const device = devices.find(d => d.device_id === deviceId);
  
  if (!device) {
    throw new Error('Selected device not found');
  }
  
  if (device.type !== 'box') {
    throw new Error('Only Toniebox devices can be selected for the card');
  }
  
  return {
    device_source: deviceId,
    toniebox_id: device.id,
    toniebox_name: device.name,
    selection_mode: 'device'
  };
}

/**
 * Validate device-based configuration
 * @param {object} hass - Home Assistant object
 * @param {string} deviceId - Device ID to validate
 * @returns {object} Validation result
 */
export function validateDeviceConfiguration(hass, deviceId) {
  const devices = findTeddyCloudHADevices(hass);
  const device = devices.find(d => d.device_id === deviceId);
  
  if (!device) {
    return {
      valid: false,
      errors: ['Device not found'],
      device: null,
      entities: []
    };
  }
  
  const entities = getDeviceEntities(hass, deviceId);
  const expectedEntities = getExpectedEntities(device.id);
  const missing = [];
  const available = [];
  
  Object.entries(expectedEntities).forEach(([key, entityId]) => {
    if (entities.includes(entityId)) {
      available.push({ key, entityId });
    } else {
      missing.push({ key, entityId });
    }
  });
  
  return {
    valid: missing.length === 0,
    device,
    entities: entities,
    missing,
    available,
    totalExpected: Object.keys(expectedEntities).length,
    foundCount: available.length
  };
}

/**
 * Get suggested devices for device picker
 * @param {object} hass - Home Assistant object
 * @returns {Array} Array of device objects suitable for device picker
 */
export function getSuggestedDevices(hass) {
  return findTeddyCloudHADevices(hass)
    .filter(device => device.type === 'box')
    .map(device => ({
      value: device.device_id,
      label: `${device.name} (${device.id})`,
      device: device
    }));
}