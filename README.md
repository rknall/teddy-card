# TeddyCloud Toniebox Card

[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/yourusername/teddy-card.svg)](https://github.com/yourusername/teddy-card/releases)
[![License](https://img.shields.io/github/license/yourusername/teddy-card.svg)](LICENSE.md)

A custom Home Assistant card for displaying TeddyCloud Toniebox information with configurable parameters and multi-language support (English/German).

This card integrates with the [TeddyCloud Add-on](https://github.com/mrueg/addon-teddycloud) to provide a comprehensive overview of your Toniebox status, content, and server settings.

## Features

- 📱 **Visual Interface**: Clean, responsive card design
- 🎵 **Content Display**: Shows current content picture and title
- 📊 **Status Information**: Battery, volume, and connection status
- ⚡ **Interactive Elements**: Click entities for more information
- 🌍 **Multi-language**: English and German support
- ⚙️ **Visual Editor**: Easy configuration through the Home Assistant UI
- 🎯 **HACS Compatible**: Install directly through HACS

## Prerequisites

- Home Assistant 2024.4.1 or newer
- [HACS](https://hacs.xyz/) installed
- [TeddyCloud Add-on](https://github.com/mrueg/addon-teddycloud) running and configured
- TeddyCloud entities available in Home Assistant

## Installation

### Via HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Navigate to "Frontend" section
3. Click the three dots menu and select "Custom repositories"
4. Add this repository URL: `https://github.com/yourusername/teddy-card`
5. Select "Lovelace" as the category
6. Click "Add"
7. Find "TeddyCloud Toniebox Card" in the HACS frontend list
8. Click "Install"
9. Restart Home Assistant

### Manual Installation

1. Download the latest `teddy-card.js` file from the [releases page](https://github.com/yourusername/teddy-card/releases)
2. Copy the file to your `config/www` directory
3. Add the following to your `ui-lovelace.yaml` or through the UI:

```yaml
resources:
  - url: /local/teddy-card.js
    type: module
```

4. Restart Home Assistant

## Configuration

### Using the Visual Editor

1. Enter edit mode on your dashboard
2. Add a new card
3. Search for "TeddyCloud Toniebox Card"
4. Configure the required fields:
   - **Toniebox ID**: The ID of your Toniebox (found in entity names)
   - **Toniebox Name**: Display name for your Toniebox
   - **Language**: Interface language (English/German)

### Manual Configuration

```yaml
type: custom:teddy-card
toniebox_id: "12345678"  # Required: Your Toniebox ID
toniebox_name: "My Toniebox"  # Required: Display name
language: "en"  # Optional: 'en' or 'de', defaults to 'en'
```

## Required Entities

The card expects the following entities to be available in Home Assistant:

### Toniebox-specific entities (using your Toniebox ID):
- `image.teddycloud_box_[ID]_content_picture`
- `sensor.teddycloud_box_[ID]_content_title`
- `sensor.teddycloud_box_[ID]_tag_valid`
- `binary_sensor.teddycloud_box_[ID]_charger`
- `sensor.teddycloud_box_[ID]_volume_db`
- `sensor.teddycloud_box_[ID]_volume_level`
- `event.teddycloud_box_[ID]_volume_down`
- `event.teddycloud_box_[ID]_volume_up`
- `sensor.teddycloud_box_[ID]_content_audio_id`

### Server entities:
- `switch.teddycloud_server_cloud_cachecontent_cache_cloud_content_on_local_server`
- `switch.teddycloud_server_cloud_enabled_generally_enable_cloud_operation`

## Card Layout

The card displays information in the following sections:

1. **Content Picture**: Current Tonie content image
2. **Content Title**: Title of the currently active content
3. **Toniebox Status**: 
   - Tag UID
   - Charging station status
   - Volume levels (dB and percentage)
   - Volume control buttons (ears)
   - Content Audio ID
4. **Server Settings**:
   - Cache cloud content toggle
   - Enable cloud operation toggle

## Language Support

The card supports two languages:

- **English** (`en`) - Default
- **German** (`de`)

Language can be set during configuration or changed later through the visual editor.

### German Translations

| English | German |
|---------|---------|
| Title | Titel |
| Charging Station | Ladestation |
| Small Ear (quieter) | kleines Ohr (leiser) |
| Big Ear (louder) | großes Ohr (lauter) |
| Cache Cloud Content | Cloud-Inhalte zwischenspeichern |
| Enable Cloud Operation | Cloud-Betrieb aktivieren |

## Troubleshooting

### Card Not Showing

1. Check that HACS has installed the card correctly
2. Verify that Home Assistant has been restarted after installation
3. Check browser console for JavaScript errors

### Missing Entities

If you see "Entity not found" errors:

1. Verify that TeddyCloud is running and integrated with Home Assistant
2. Check that your Toniebox ID is correct
3. Ensure all required entities exist in Home Assistant
4. Check the Developer Tools > States page for available entities

### Configuration Issues

- **Toniebox ID**: This should match the ID used in your TeddyCloud entity names
- **Toniebox Name**: This is just a display name and can be anything you like
- **Language**: Must be either 'en' or 'de'

### Visual Editor Not Working

1. Clear browser cache and refresh
2. Check that you're using Home Assistant 2024.4.1 or newer
3. Verify the card is properly installed through HACS

## Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/yourusername/teddy-card.git
cd teddy-card

# Install dependencies
npm install

# Build the card
npm run build

# Watch for changes during development
npm run watch
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/teddy-card/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/yourusername/teddy-card/issues)
- 📖 **Documentation**: [Wiki](https://github.com/yourusername/teddy-card/wiki)

## Related Projects

- [TeddyCloud Add-on](https://github.com/mrueg/addon-teddycloud) - The TeddyCloud Home Assistant Add-on that provides the entities for this card
- [HACS](https://hacs.xyz/) - Home Assistant Community Store

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Changelog

### v1.0.0
- Initial release
- Support for all TeddyCloud entities
- Visual editor
- Multi-language support (EN/DE)
- HACS compatibility

---

**Note**: Replace `yourusername` with your actual GitHub username in all URLs above before publishing.