import { around } from 'monkey-around';
import { App, ItemView, Plugin, PluginSettingTab, setIcon, Setting, setTooltip, View } from 'obsidian';
import { EditorView } from '@codemirror/view';

interface DragWikilinkSettings {
    enabled: boolean;
}

const DEFAULT_SETTINGS: DragWikilinkSettings = {
    enabled: true
}

export default class DragWikilinkPlugin extends Plugin {
    settings: DragWikilinkSettings;

    async onload() {
        await this.loadSettings();

        // Register editor extension to handle wikilink drops
        this.registerEditorExtension([
            EditorView.domEventHandlers({
                drop: (event: DragEvent, view: EditorView) => {
                    const text = event.dataTransfer?.getData("text/plain");
                    if (text?.endsWith("]] ")) {
                        // Prevent default drop behavior
                        event.preventDefault();
                        
                        // Get drop position from editor coordinates
                        const pos = view.posAtCoords({x: event.clientX, y: event.clientY});
                        if (pos) {
                            // Insert text and move cursor after it
                            view.dispatch({
                                changes: {from: pos, insert: text},
                                selection: {anchor: pos + text.length}
                            });
                            return true;
                        }
                    }
                    return false;
                }
            })
        ]);

        // Add the draggable link icon to view headers
        this.register(around(ItemView.prototype, {
            load(old) {
                return function(this: View) {
                    if (!this.iconEl) {
                        const iconEl = this.iconEl = this.headerEl.createDiv("clickable-icon view-header-icon")
                        // Add our new wiki-link drag icon after the main icon
                        const linkEl = this.headerEl.createDiv("clickable-icon view-header-link-icon")
                        setIcon(linkEl, "link")
                        setTooltip(linkEl, "Drag to create link")

                        this.headerEl.prepend(iconEl)
                        iconEl.draggable = true
                        linkEl.draggable = true

                        iconEl.addEventListener("dragstart", e => { this.app.workspace.onDragLeaf(e, this.leaf) })
                        linkEl.addEventListener("dragstart", e => {
                            // Set drag data for the link
                            if (this.file) {
                                // Add a space after the wikilink
                                e.dataTransfer.setData("text/plain", `[[${this.file.path}]] `)
                                e.dataTransfer.effectAllowed = "copy"
                            }
                        })

                        setIcon(iconEl, this.getIcon())
                        setTooltip(iconEl, "Drag to rearrange")
                    }
                    return old.call(this)
                }
            }
        }));

        // Add settings tab
        this.addSettingTab(new DragWikilinkSettingTab(this.app, this));
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

class DragWikilinkSettingTab extends PluginSettingTab {
    plugin: DragWikilinkPlugin;

    constructor(app: App, plugin: DragWikilinkPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;

        containerEl.empty();

        containerEl.createEl('h2', {text: 'Drag Wikilink Settings'});

        new Setting(containerEl)
            .setName('Enable drag wikilink')
            .setDesc('Adds a draggable link icon to note headers for creating wikilinks')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.enabled)
                .onChange(async (value) => {
                    this.plugin.settings.enabled = value;
                    await this.plugin.saveSettings();
                }));
    }
}