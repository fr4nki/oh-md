import Editor from '../../source/index';

(function () {
    const els = document.querySelectorAll('textarea');
    const opts = {
        classes: {
            container: '',
            controls: 'my-line',
            button: 'nooope',
            footer: 'my-bottom',
        },

        settings: {
            autosave: true,
            theme: 'default',
        },

        buttons: [[
            {
                button: 'bold',
                hotkey: 'ctrl+b',
                class: 'button-bold',
                onClick: () => {
                    console.log('make me bold, babe!', arguments)
                },
            },
            {
                button: 'italic',
                hotkey: 'ctrl+i',
            },
            {
                button: 'heading',
                hotkey: 'ctrl+h',
            },
            {
                button: 'ordered_list',
                hotkey: 'ctrl+o',
            },
            {
                button: 'unordered_list',
                hotkey: 'ctrl+u',
            },
            {
                button: 'quote',
                hotkey: 'ctrl+q',
            },
            {
                separator: true,
            },
            {
                button: 'link',
                hotkey: 'ctrl+l',
            },
            {
                button: 'image',
                hotkey: 'ctrl+i',
            },
            {
                separator: true,
            },
            {
                button: 'preview',
                hotkey: 'ctrl+p',
            },
            {
                button: 'fullscreen',
                hotkey: 'ctrl+f',
            },
        ]]
    };
    els.forEach(e => new Editor(e, opts).init());
}())