export default class Editor {
    static defaultClassNamePrefix = 'oh-md'

    static defaultSettings = {
        autosave: true,
        counter: true,
        theme: `${Editor.defaultClassNamePrefix}-theme-default`,
    }

    static defaultClasses = {
        container: [Editor.defaultClassNamePrefix],
        controls: [`${Editor.defaultClassNamePrefix}-controls`],
        button: [`${Editor.defaultClassNamePrefix}-button`],
        footer: [`${Editor.defaultClassNamePrefix}-footer`],
    }

    static defaultButtons = [
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


    constructor(element, settings) {
        this.element = element;
        this.container = null;
        this.controls = null;
        this.footer = null;
        this.settings = settings || {};
    }

    setSettings() {
        const settings = Object.assign(Editor.defaultSettings, this.settings.settings || {})
        const buttons = this.settings.buttons || Editor.defaultButtons
        const classes = Editor.defaultClasses

        Object.keys(this.settings.classes).forEach(c => {
            classes[c].push(this.settings.classes[c].join(' '))
        })

        this.settings = { settings, buttons, classes }
    }


    makeLayout() {
        const clone = this.element.cloneNode(true);

        this.container = document.createElement('div');
        this.container.classList.add(...this.settings.classes.container);
        this.container.appendChild(clone);

        this.element.parentElement.insertBefore(this.container, this.element);
        this.element.parentElement.removeChild(this.element);
        this.element = clone
    }

    makeButtons() {
        console.log(this.settings)

        this.controls = document.createElement('div');
        this.controls.classList.add(...this.settings.classes.controls);
        this.element.parentElement.insertBefore(this.controls, this.element);
    }

    makeFooter() {
        this.footer = document.createElement('div');
        this.footer.classList.add(...this.settings.classes.footer);
        this.container.appendChild(this.footer);
    }

    init() {
        console.log(this.element);
        console.log(this.settings);

        this.setSettings();
        this.makeLayout();
        this.makeButtons();
        this.makeFooter();
    }
}