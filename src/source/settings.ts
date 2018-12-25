const defaultClassNamePrefix = 'oh-md';

const defaultParams = {
    autosave: 0,
    counter: true,
    wordwrap: false,
};

const defaultTheme = `${defaultClassNamePrefix}-theme-default`;

const defaultClasses = {
    container: [defaultClassNamePrefix],
    area: [`${defaultClassNamePrefix}-area`],
    controls: [`${defaultClassNamePrefix}-controls`],
    params: [`${defaultClassNamePrefix}-params`],
};

const defaultControls = [
    {
        type: 'button',
        button: 'heading',
        hotkey: {
            win: {
                modificator: 'ctrlKey',
                key: 'h',
            },
            mac: {
                modificator: 'metaKey',
                key: 'h',
            },
        },
    },
    {
        type: 'button',
        button: 'bold',
        hotkey: {
            win: {
                modificator: 'ctrlKey',
                key: 'b',
            },
            mac: {
                modificator: 'metaKey',
                key: 'b',
            },
        },
    },
    {
        type: 'button',
        button: 'italic',
        hotkey: {
            win: {
                modificator: 'ctrlKey',
                key: 'i',
            },
            mac: {
                modificator: 'metaKey',
                key: 'i',
            },
        },
    },
    {
        type: 'separator',
    },
    {
        type: 'button',
        button: 'ordered_list',
        hotkey: {
            win: {
                modificator: 'ctrlKey',
                key: 'o',
            },
            mac: {
                modificator: 'metaKey',
                key: 'o',
            },
        },
    },
    {
        type: 'button',
        button: 'unordered_list',
        hotkey: {
            win: {
                modificator: 'ctrlKey',
                key: 'u',
            },
            mac: {
                modificator: 'metaKey',
                key: 'u',
            },
        },
    },
    {
        type: 'separator',
    },
    {
        type: 'button',
        button: 'quote',
        hotkey: {
            win: {
                modificator: 'ctrlKey',
                key: 'q',
            },
            mac: {
                modificator: 'metaKey',
                key: 'q',
            },
        },
    },
    {
        type: 'button',
        button: 'link',
        hotkey: {
            win: {
                modificator: 'ctrlKey',
                key: 'l',
            },
            mac: {
                modificator: 'metaKey',
                key: 'l',
            },
        },
    },
    {
        type: 'button',
        button: 'image',
        hotkey: {
            win: {
                modificator: 'ctrlKey',
                key: 'g',
            },
            mac: {
                modificator: 'metaKey',
                key: 'g',
            },
        },
    },
    {
        type: 'separator',
    },
    {
        type: 'button',
        button: 'preview',
        hotkey: {
            win: {
                modificator: 'ctrlKey',
                key: 'p',
            },
            mac: {
                modificator: 'metaKey',
                key: 'p',
            },
        },
    },
    {
        type: 'button',
        button: 'fullscreen',
        hotkey: {
            win: {
                modificator: 'ctrlKey',
                key: 'f',
            },
            mac: {
                modificator: 'metaKey',
                key: 'f',
            },
        },
    },
];

const defaultLayout = ['controls', 'area', 'params'];

const defaultWarnings = {
    autosave: {
        id: "Textarea element doesn't contain id or name attribute. Autosave will not work.",
    },
    controls: {
        notExists: 'Button is not implemented',
        hotkeyWrong: 'Check your "hotkey" in settings. Seems it\'s wrong.',
    },
};

export default {
    defaultClassNamePrefix,
    defaultParams,
    defaultTheme,
    defaultClasses,
    defaultControls,
    defaultWarnings,
    defaultLayout,
};
