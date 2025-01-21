# Obsidian Drag Wikilink

> ⚠️ **Beta Version**: This plugin is currently in beta. After enabling it, please reload your Obsidian window for the plugin to work properly.

A simple plugin that adds a draggable link icon to note headers in [Obsidian](https://obsidian.md), making it easier to create wikilinks by dragging and dropping.

## Features

- Adds a draggable link icon next to the default note icon in headers
- Create wikilinks by dragging the link icon to any editor
- Visual feedback when dragging
- Maintains the standard note dragging functionality

## Installation (WIP, not read for public release yet, install via BRAT if you know what you are doing #buildinpublic)

You can install the plugin via the Community Plugins tab within Obsidian:

1. Open Settings in Obsidian
2. Navigate to Community Plugins and disable Safe Mode
3. Click Browse and search for "Drag Wikilink"
4. Click Install
5. Enable the plugin in the Community Plugins tab
6. **Important**: Reload your Obsidian window (Ctrl/Cmd + R)

## Usage

1. Enable the plugin
2. **Reload Obsidian** for changes to take effect
3. You'll see a new link icon (🔗) next to the default note icon in headers
4. To create a wikilink:
   - Click and drag the link icon to any editor
   - Release to insert a wikilink to that note

## Manual Installation

1. Download the latest release from the releases page
2. Extract the zip file into your vault's `.obsidian/plugins/` directory
3. Enable the plugin in Obsidian's Community Plugins settings
4. **Reload Obsidian**

## For Developers

This plugin is built using:

- TypeScript
- Obsidian API
- `monkey-around` for view modifications

To build:

```bash
# Clone this repository
git clone https://github.com/yourusername/obsidian-drag-wikilink

# Install dependencies
npm install

# Build
npm run build
```

## Known Issues

- The plugin requires a window reload after enabling to work properly
- Currently in beta testing - please report any issues you encounter and provide feedback :)

## Support

If you encounter any issues or have suggestions:

1. Check the known issues above
2. If your issue isn't listed, please open an issue on GitHub

## License

This project is licensed under the MIT License - see the LICENSE file for details.
