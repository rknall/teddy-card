const translations = {
  en: {
    title: 'Title',
    tag_uid: 'Tag UID',
    charging_station: 'Charging Station',
    volume_db: 'Volume dB',
    volume_level: 'Volume Level',
    small_ear_quieter: 'Small Ear (quieter)',
    big_ear_louder: 'Big Ear (louder)',
    content_audio_id: 'Content Audio ID',
    cache_cloud_content: 'Cache Cloud Content',
    enable_cloud_operation: 'Enable Cloud Operation',
    config: {
      toniebox_id: 'Toniebox ID',
      toniebox_name: 'Toniebox Name',
      language: 'Language',
      selection_mode: 'Configuration Mode',
      entity_source: 'Select Toniebox Entity',
      device_source: 'Select Toniebox Device',
      toniebox_id_description: 'The ID of your Toniebox (used in entity names)',
      toniebox_name_description: 'Display name for your Toniebox',
      language_description: 'Language for the card interface',
      selection_mode_description: 'Choose how to configure your Toniebox',
      entity_source_description: 'Select any entity from your Toniebox to auto-configure',
      device_source_description: 'Select your Toniebox device directly from Home Assistant registry',
      mode_auto: 'Auto-detect from entity',
      mode_manual: 'Manual configuration',
      mode_device: 'Device-based selection',
      no_devices_found: 'No TeddyCloud devices found',
      no_ha_devices_found: 'No TeddyCloud devices found in Home Assistant registry',
      devices_found: 'Found {count} TeddyCloud device(s)',
      ha_devices_found: 'Found {count} Toniebox device(s) in registry',
      entity_validation: 'Entity Validation',
      device_validation: 'Device Validation',
      entities_missing: '{count} of {total} entities missing',
      entities_all_found: 'All entities found',
      device_valid: 'Device configuration valid',
      device_invalid: 'Device configuration invalid',
      switch_to_auto: 'Switch to auto-detection',
      switch_to_manual: 'Switch to manual setup',
      switch_to_device: 'Switch to device selection'
    },
    errors: {
      missing_toniebox_id: 'Toniebox ID is required',
      missing_toniebox_name: 'Toniebox Name is required',
      entity_not_found: 'Entity not found'
    }
  },
  de: {
    title: 'Titel',
    tag_uid: 'Tag UID',
    charging_station: 'Ladestation',
    volume_db: 'Lautstärke dB',
    volume_level: 'Lautstärke Level',
    small_ear_quieter: 'kleines Ohr (leiser)',
    big_ear_louder: 'großes Ohr (lauter)',
    content_audio_id: 'Content Audio ID',
    cache_cloud_content: 'Cloud-Inhalte zwischenspeichern',
    enable_cloud_operation: 'Cloud-Betrieb aktivieren',
    config: {
      toniebox_id: 'Toniebox ID',
      toniebox_name: 'Toniebox Name',
      language: 'Sprache',
      selection_mode: 'Konfigurationsmodus',
      entity_source: 'Toniebox Entity auswählen',
      device_source: 'Toniebox Gerät auswählen',
      toniebox_id_description: 'Die ID Ihrer Toniebox (wird in Entity-Namen verwendet)',
      toniebox_name_description: 'Anzeigename für Ihre Toniebox',
      language_description: 'Sprache für die Karten-Oberfläche',
      selection_mode_description: 'Wählen Sie, wie Sie Ihre Toniebox konfigurieren möchten',
      entity_source_description: 'Wählen Sie eine Entity Ihrer Toniebox zur automatischen Konfiguration',
      device_source_description: 'Wählen Sie Ihr Toniebox-Gerät direkt aus der Home Assistant Registrierung',
      mode_auto: 'Automatische Erkennung von Entity',
      mode_manual: 'Manuelle Konfiguration',
      mode_device: 'Gerätebasierte Auswahl',
      no_devices_found: 'Keine TeddyCloud Geräte gefunden',
      no_ha_devices_found: 'Keine TeddyCloud Geräte in Home Assistant Registrierung gefunden',
      devices_found: '{count} TeddyCloud Gerät(e) gefunden',
      ha_devices_found: '{count} Toniebox-Gerät(e) in Registrierung gefunden',
      entity_validation: 'Entity Validierung',
      device_validation: 'Geräte Validierung',
      entities_missing: '{count} von {total} Entities fehlen',
      entities_all_found: 'Alle Entities gefunden',
      device_valid: 'Geräte-Konfiguration gültig',
      device_invalid: 'Geräte-Konfiguration ungültig',
      switch_to_auto: 'Zur automatischen Erkennung wechseln',
      switch_to_manual: 'Zur manuellen Einrichtung wechseln',
      switch_to_device: 'Zur Geräteauswahl wechseln'
    },
    errors: {
      missing_toniebox_id: 'Toniebox ID ist erforderlich',
      missing_toniebox_name: 'Toniebox Name ist erforderlich',
      entity_not_found: 'Entity nicht gefunden'
    }
  }
};

export function localize(key, language = 'en', replacements = {}) {
  const keys = key.split('.');
  let value = translations[language] || translations.en;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  if (!value) {
    return key;
  }
  
  // Replace template variables like {count}, {total}
  let result = value;
  Object.entries(replacements).forEach(([placeholder, replacement]) => {
    result = result.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), replacement);
  });
  
  return result;
}