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
    button: [`${defaultClassNamePrefix}-buttons`],
    params: [`${defaultClassNamePrefix}-params`],
};

const defaultButtons = [
    {
        button: 'heading',
        hotkey: 'ctrl+h',
    },
    {
        button: 'bold',
        hotkey: 'ctrl+b',
    },
    {
        button: 'italic',
        hotkey: 'ctrl+i',
    },
    { separator: true },
    {
        button: 'ordered_list',
        hotkey: 'ctrl+o',
    },
    {
        button: 'unordered_list',
        hotkey: 'ctrl+u',
    },
    { separator: true },
    {
        button: 'quote',
        hotkey: 'ctrl+q',
    },
    {
        button: 'link',
        hotkey: 'ctrl+l',
    },
    {
        button: 'image',
        hotkey: 'ctrl+i',
    },
    { separator: true },
    {
        button: 'preview',
        hotkey: 'ctrl+p',
    },
    {
        button: 'fullscreen',
        hotkey: 'ctrl+f',
    }
];

const defaultWarnings = {
    autosave: {
        id: '# OH-MD: Textarea element doesn\'t contain id or name attribute. Autosave will not work correctly',
    },
};

export default {
    defaultClassNamePrefix,
    defaultParams,
    defaultTheme,
    defaultClasses,
    defaultButtons,
    defaultWarnings,
}
