# TeddyCloud Toniebox Card

A custom Home Assistant card for displaying TeddyCloud Toniebox information with configurable parameters and multi-language support.

## What does this card do?

This card provides a comprehensive overview of your Toniebox status when using the TeddyCloud add-on. It displays:

- **Current Content**: Picture and title of the active Tonie
- **Toniebox Status**: Battery, charging, volume levels, and controls
- **Server Settings**: Cloud content caching and operation settings

## Requirements

- [TeddyCloud Add-on](https://github.com/mrueg/addon-teddycloud) must be installed and running
- TeddyCloud entities must be available in Home Assistant
- Home Assistant 2024.4.1 or newer

## Configuration

The card requires two essential parameters:
- **Toniebox ID**: Found in your TeddyCloud entity names (e.g., if your entities are named `sensor.teddycloud_box_12345678_*`, then your ID is `12345678`)
- **Toniebox Name**: A friendly display name for your Toniebox

## Features

✅ **Visual Editor**: Easy configuration through Home Assistant UI  
✅ **Multi-language**: English and German interface  
✅ **Responsive Design**: Works on desktop and mobile  
✅ **Entity Validation**: Shows helpful error messages for missing entities  
✅ **Interactive**: Click entities to view more details  

## Quick Setup

1. Install through HACS
2. Add the card to your dashboard
3. Enter your Toniebox ID and name
4. Choose your preferred language
5. Save and enjoy!

The card will automatically detect and display all relevant TeddyCloud entities for your configured Toniebox.

Perfect for Toniebox enthusiasts who want to monitor their device status directly from Home Assistant!