import grapesjs from 'grapesjs';
import gjsWebpagePreset from 'grapesjs-preset-webpage';
import { GrapesjsEditor, GrapeJsData } from '../../types';
import axios from 'axios';


export default {
    initEditor: (id: string, data?: GrapeJsData, onSave?: (data: GrapeJsData) => void) => {

        var editor = grapesjs.init({
            container: `#${id}`,
            components: data?.components || data?.html || '',
            style: data?.style || data?.css || '',
            plugins: [gjsWebpagePreset],
            storageManager: {
                // type: 'remote',
                type: null,
                stepsBeforeSave: 3,
                urlStore: 'http://localhost:8080/templates',
                urlLoad: 'http://localhost:8080/templates',
                // For custom parameters/headers on requests
            },
            // storageManager: {
            //     id: 'gjs-',             // Prefix identifier that will be used on parameters
            //     type: null,          // Type of the storage
            //     autosave: true,         // Store data automatically
            //     autoload: false,         // Autoload stored data on init
            //     stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
            // },
            pluginsOpts: {
                'gjs-preset-webpage': {
                    // options
                }
            },
        });

        editor?.Keymaps?.removeAll();

        console.log("INITIALIZE", data?.components)

        // var pnm = editor.Panels; pnm.addButton('options', [{ id: 'save-database', className: 'fa fa-floppy-o', command: 'save-database', attributes: { title: 'Save to database' } }])

        editor.Commands.add('save-database', {
            run: function (em: any, sender: any) {
                console.log("save clicked")
                const data: GrapeJsData = {
                    html: editor.getHtml(),
                    css: editor.getCss(),
                    style: editor.getStyle(),
                    components: editor.getComponents()
                }
                axios.post('http://localhost:8080/templates', data)
            }
        })

        // $.post("/components/save/component", {html: InnerHtml}, function (result:any) { //do some code }); }, });
        editor.Panels.addButton(
            'options',
            {
                id: `${id}-save`,
                label: '<b>Save</b>',
                command: 'gjs-save',
                active: false
            },
        )

        editor.Commands.add('gjs-save', {
            run(editor: GrapesjsEditor, sender: any) {
                const data: GrapeJsData = {
                    html: editor.getHtml(),
                    css: editor.getCss(),
                    style: editor.getStyle(),
                    components: editor.getComponents()
                }
                console.log("saving", data)
                if (onSave)
                    onSave(data)
            }

        })

        return editor as GrapesjsEditor
    },
    configStorage: (editor: any) => {
        const LOAD_COMMAND = 'external-load';
        const storageManager = editor.StorageManager;
        console.log("config", editor)
        if (!editor) return;
        // Add Save Button
        editor.Panels.addButton(
            'options',
            {
                id: 'open',
                className: 'fa fa-folder-open-o',
                attributes: { title: 'Open Template' },
                command: LOAD_COMMAND,
            },
        );

        // Custom Save Command
        editor.Commands.add(
            LOAD_COMMAND,
            {
                run(editor: any, sender: any) {
                    storageManager.get('remote').set({
                        urlLoad: 'localhost:8000/templates/5',
                        urlStore: 'localhost:8000/templates'
                    });

                    editor.load(() => {
                        sender.set('active', 0);
                    });
                },
            },
        );
    }
}