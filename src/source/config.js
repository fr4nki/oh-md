const defaultClassNamePrefix = 'oh-md'

const defaultParams = {
    autosave: 0,
    counter: true,
}

const defaultTheme = `${defaultClassNamePrefix}-theme-default`;

const defaultClasses = {
    container: [defaultClassNamePrefix],
    area: [`${defaultClassNamePrefix}-area`],
    controls: [`${defaultClassNamePrefix}-controls`],
    button: [`${defaultClassNamePrefix}-button`],
    params: [`${defaultClassNamePrefix}-param`],
}

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
]

export default {
    defaultClassNamePrefix,
    defaultParams,
    defaultTheme,
    defaultClasses,
    defaultButtons,
}