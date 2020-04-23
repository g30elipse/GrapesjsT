import grapesjs from 'grapesjs';

export default {
    init: () => {
        const LOAD_COMMAND = 'external-load';
        const storageManager = grapesjs.StorageManager;

        // Add Save Button
        grapesjs.Panels.addButton(
            'options',
            {
                id: 'open',
                className: 'fa fa-folder-open-o',
                attributes: { title: 'Open Template' },
                command: LOAD_COMMAND,
            },
        );

        // Custom Save Command
        grapesjs.Commands.add(
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
