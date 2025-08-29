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
      toniebox_id_description: 'The ID of your Toniebox (used in entity names)',
      toniebox_name_description: 'Display name for your Toniebox',
      language_description: 'Language for the card interface'
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
      toniebox_id_description: 'Die ID Ihrer Toniebox (wird in Entity-Namen verwendet)',
      toniebox_name_description: 'Anzeigename für Ihre Toniebox',
      language_description: 'Sprache für die Karten-Oberfläche'
    },
    errors: {
      missing_toniebox_id: 'Toniebox ID ist erforderlich',
      missing_toniebox_name: 'Toniebox Name ist erforderlich',
      entity_not_found: 'Entity nicht gefunden'
    }
  }
};

export function localize(key, language = 'en') {
  const keys = key.split('.');
  let value = translations[language] || translations.en;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}