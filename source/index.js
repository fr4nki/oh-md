export default class Editor {
    static defaultClassNamePrefix = 'oh-md'

    static defaultParams = {
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

    static createElement = (el, className = ['']) => {
        const e = document.createElement(el);
        e.classList.add(...className);

        return e;
    }

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
        const params = Object.assign(Editor.defaultParams, this.settings.params || {});
        const buttons = this.settings.buttons || Editor.defaultButtons;
        const classes = Editor.defaultClasses;
        const elementId = this.element.id || this.element.name;

        Object.keys(this.settings.classes).forEach(c => {
            classes[c].push(this.settings.classes[c].join(' '))
        });

        if (params.autosave) {
            if (elementId) {
                params.id = elementId;
            } else {
                params.id = +new Date();

                console.warn(
                    '# OH-MD: Textarea element doesn\'t contain id or name attribute. Autosave will not work correctly',
                    this.element
                );
            }
        }

        this.settings = { params, buttons, classes };
    }

    counterInit() {
        this.counterBlock = Editor.createElement(
            'p',
            [`${Editor.defaultClassNamePrefix}-param-counter`]
        );
        this.params.appendChild(this.counterBlock);

        this.element.addEventListener('input', () => {
            this.counterUpdate();
        });
    }

    counterUpdate() {
        this.counterBlock.innerText = this.element.value.length;
    }

    getTextareaHash() {
        const { URL: url } = window.document;
        const { id } = this.settings.params;

        return `${url}@@@${id}`;
    }

    autosaveFill() {
        const hash = this.getTextareaHash();

        this.element.value = window.localStorage[hash] || '';
        this.counterUpdate();
    }

    autosaveToggleClass() {
        const { value } = this.element;
        const hash = this.getTextareaHash();

        this.autosaveBlock.classList.add('active');
        window.localStorage[hash] = value;

        setTimeout(() => {
            this.autosaveBlock.classList.remove('active');
        }, 2000);
    }

    autosaveInit() {
        this.autosaveBlock = Editor.createElement(
            'p',
            [`${Editor.defaultClassNamePrefix}-param-autosave`]
        );
        this.autosaveBlock.innerText = 'Saved';
        this.params.appendChild(this.autosaveBlock);

        setInterval(
            () => { this.autosaveToggleClass() },
            this.settings.params.autosave * 1000
        )
    }

    makeLayout() {
        const clone = this.element.cloneNode(true);
        const area = Editor.createElement(
            'div',
            [...this.settings.classes.area]
        );

        this.container = Editor.createElement(
            'section',
            [...this.settings.classes.container, this.settings.params.theme]
        );
        this.container.appendChild(clone);

        this.element.parentElement.insertBefore(this.container, this.element);
        this.element.parentElement.removeChild(this.element);
        this.element = clone
        area.appendChild(this.element);
        this.container.appendChild(area);
    }

    makeButtons() {
        this.controls = Editor.createElement(
            'div',
            [...this.settings.classes.controls]
        );

        this.container.insertBefore(this.controls, this.element.parentElement);
    }

    makeParams() {
        const { autosave, counter } = this.settings.params

        this.params = Editor.createElement(
            'div',
            [...this.settings.classes.params]
        );
        this.container.appendChild(this.params);

        if (counter) {
            this.counterInit();
        }

        if (autosave) {
            this.autosaveInit();
            this.autosaveFill();
        }
    }

    init() {
        this.setSettings();
        this.makeLayout();
        this.makeButtons();
        this.makeParams();
    }
}