const defaultClassNamePrefix = 'oh-md'

const defaultParams = {
    autosave: 0,
    counter: true,
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
            win: 'ctrl+h',
            osx: 'cmd+h',
        },
    },
    {
        type: 'button',
        button: 'bold',
        hotkey: {
            win: 'ctrl+b',
            osx: 'cmd+b',
        },
    },
    {
        type: 'button',
        button: 'italic',
        hotkey: {
            win: 'ctrl+i',
            osx: 'cmd+i',
        },
    },
    {
        type: 'separator',
        separator: true,
    },
    {
        type: 'button',
        button: 'ordered_list',
        hotkey: {
            win: 'ctrl+o',
            osx: 'cmd+o',
        },
    },
    {
        type: 'button',
        button: 'unordered_list',
        hotkey: {
            win: 'ctrl+u',
            osx: 'cmd+u',
        },
    },
    {
        type: 'separator',
        separator: true,
    },
    {
        type: 'button',
        button: 'quote',
        hotkey: {
            win: 'ctrl+q',
            osx: 'cmd+q',
        },
    },
    {
        type: 'button',
        button: 'link',
        hotkey: {
            win: 'ctrl+l',
            osx: 'cmd+l',
        },
    },
    {
        type: 'button',
        button: 'image',
        hotkey: {
            win: 'ctrl+g',
            osx: 'cmd+g',
        },
    },
    {
        type: 'separator',
        separator: true,
    },
    {
        type: 'button',
        button: 'preview',
        hotkey: {
            win: 'ctrl+p',
            osx: 'cmd+p',
        },
    },
    {
        type: 'button',
        button: 'fullscreen',
        hotkey: {
            win: 'ctrl+f',
            osx: 'cmd+f',
        },
    }
];

const defaultLayout = [
    'controls',
    'area',
    'params',
];

const defaultWarnings = {
    params: {
        autosave: {
            id: 'Textarea element doesn\'t contain id or name attribute. Autosave will not work.',
        },
    },
    controls: {
        buttons: {
            notExists: 'Button is not exists',
        },
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
}
