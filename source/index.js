export default class Editor {
    static defaultClassNamePrefix = 'oh-md'

    static defaultSettings = {
        autosave: 0,
        counter: true,
        theme: `${Editor.defaultClassNamePrefix}-theme-default`,
    }

    static defaultClasses = {
        container: [Editor.defaultClassNamePrefix],
        area: [`${Editor.defaultClassNamePrefix}-area`],
        controls: [`${Editor.defaultClassNamePrefix}-controls`],
        button: [`${Editor.defaultClassNamePrefix}-button`],
        params: [`${Editor.defaultClassNamePrefix}-param`],
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
        this.params = null;
        this.autosaveBlock = null;
        this.counterBlock = null;
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

    counterInit() {
        this.counterBlock = document.createElement('p');
        this.counterBlock.classList.add(`${Editor.defaultClassNamePrefix}-param-counter`);
        this.params.appendChild(this.counterBlock);

        this.element.addEventListener('input', () => {
            this.counterBlock.innerText = this.element.value.length;
        })
    }

    autosaveFill() {
        const { URL: url } = window.document;
        this.element.value = window.localStorage[url];
    }

    autosaveToggleClass() {
        const { URL: url } = window.document;
        const { value } = this.element;

        this.autosaveBlock.classList.add('active');
        window.localStorage[url] = value;

        setTimeout(() => {
            this.autosaveBlock.classList.remove('active');
        }, 2000)
    }

    autosaveInit() {
        this.autosaveBlock = document.createElement('p');
        this.autosaveBlock.classList.add(`${Editor.defaultClassNamePrefix}-param-autosave`);
        this.autosaveBlock.innerText = 'Saved';
        this.params.appendChild(this.autosaveBlock);

        setInterval(
            () => { this.autosaveToggleClass() },
            this.settings.settings.autosave * 1000
        )
    }

    makeLayout() {
        const clone = this.element.cloneNode(true);
        const area = document.createElement('div');
        area.classList.add(this.settings.classes.area);

        this.container = document.createElement('section');
        this.container.appendChild(clone);
        this.container.classList.add(
            ...this.settings.classes.container,
            this.settings.settings.theme
        );

        this.element.parentElement.insertBefore(this.container, this.element);
        this.element.parentElement.removeChild(this.element);
        this.element = clone
        area.appendChild(this.element);
        this.container.appendChild(area);
    }

    makeButtons() {
        this.controls = document.createElement('div');
        this.controls.classList.add(...this.settings.classes.controls);
        this.container.insertBefore(this.controls, this.element.parentElement);
    }

    makeParams() {
        const { autosave, counter } = this.settings.settings

        this.params = document.createElement('div');
        this.params.classList.add(...this.settings.classes.params);
        this.container.appendChild(this.params);

        if (autosave) {
            this.autosaveInit();
            this.autosaveFill();
        }

        if (counter) {
            this.counterInit();
        }
    }

    init() {
        this.setSettings();
        this.makeLayout();
        this.makeButtons();
        this.makeParams();
    }
}