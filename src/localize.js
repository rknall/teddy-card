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
      toniebox_id_description: 'The ID of your Toniebox (used in entity names)',
      toniebox_name_description: 'Display name for your Toniebox',
      language_description: 'Language for the card interface',
      selection_mode_description: 'Choose how to configure your Toniebox',
      entity_source_description: 'Select any entity from your Toniebox to auto-configure',
      mode_auto: 'Auto-detect from entity',
      mode_manual: 'Manual configuration',
      no_devices_found: 'No TeddyCloud devices found',
      devices_found: 'Found {count} TeddyCloud device(s)',
      entity_validation: 'Entity Validation',
      entities_missing: '{count} of {total} entities missing',
      entities_all_found: 'All entities found',
      switch_to_auto: 'Switch to auto-detection',
      switch_to_manual: 'Switch to manual setup'
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
      toniebox_id_description: 'Die ID Ihrer Toniebox (wird in Entity-Namen verwendet)',
      toniebox_name_description: 'Anzeigename für Ihre Toniebox',
      language_description: 'Sprache für die Karten-Oberfläche',
      selection_mode_description: 'Wählen Sie, wie Sie Ihre Toniebox konfigurieren möchten',
      entity_source_description: 'Wählen Sie eine Entity Ihrer Toniebox zur automatischen Konfiguration',
      mode_auto: 'Automatische Erkennung von Entity',
      mode_manual: 'Manuelle Konfiguration',
      no_devices_found: 'Keine TeddyCloud Geräte gefunden',
      devices_found: '{count} TeddyCloud Gerät(e) gefunden',
      entity_validation: 'Entity Validierung',
      entities_missing: '{count} von {total} Entities fehlen',
      entities_all_found: 'Alle Entities gefunden',
      switch_to_auto: 'Zur automatischen Erkennung wechseln',
      switch_to_manual: 'Zur manuellen Einrichtung wechseln'
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