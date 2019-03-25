const defaultClassNamePrefix = 'oh-md';

const defaultParams = {
    counter: true,
    autosave: 10,
    wordwrap: {
        paramVisible: true,
        active: true,
    },
    doubleReturn: {
        modificatorKey: 'shiftKey',
        active: false,
    },
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
        control: 'bold',
        hotkey: {
            default: {
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
        control: 'italic',
        hotkey: {
            default: {
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
        control: 'heading',
        hotkey: {
            default: {
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
        control: 'strike',
        hotkey: {
            default: {
                modificator: 'ctrlKey',
                key: 'd',
            },
            mac: {
                modificator: 'metaKey',
                key: 'd',
            },
        },
    },
    {
        control: 'separator',
    },
    {
        control: 'ordered_list',
        hotkey: {
            default: {
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
        control: 'unordered_list',
        hotkey: {
            default: {
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
        control: 'separator',
    },
    {
        control: 'quote',
        hotkey: {
            default: {
                modificator: 'ctrlKey',
                key: '\'',
            },
            mac: {
                modificator: 'metaKey',
                key: '\'',
            },
        },
    },
    {
        control: 'code',
        hotkey: {
            default: {
                modificator: 'ctrlKey',
                key: 'k',
            },
            mac: {
                modificator: 'metaKey',
                key: 'k',
            },
        },
    },
    {
        control: 'link',
        hotkey: {
            default: {
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
        control: 'image',
        hotkey: {
            default: {
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
        control: 'separator',
    },
    {
        control: 'preview',
        hotkey: {
            default: {
                modificator: 'ctrlKey',
                key: 'j',
            },
            mac: {
                modificator: 'metaKey',
                key: 'j',
            },
        },
    },
    {
        control: 'fullscreen',
        hotkey: {
            default: {
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

export default {
    defaultClassNamePrefix,
    defaultParams,
    defaultTheme,
    defaultClasses,
    defaultControls,
    defaultLayout,
};
