import EditorParams from './params';
import EditorConfig from './config';

export default class Editor {
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
        const params = Object.assign(EditorConfig.defaultParams, this.settings.params || {});
        const theme = this.settings.theme || EditorConfig.defaultTheme;
        const buttons = this.settings.buttons || EditorConfig.defaultButtons;
        const classes = EditorConfig.defaultClasses;
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

        this.settings = { theme, params, buttons, classes };
    }

    counterInit() {
        this.counterBlock = Editor.createElement(
            'p',
            [`${EditorConfig.defaultClassNamePrefix}-param-counter`]
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

        return `${url}||||${id}`;
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
            [`${EditorConfig.defaultClassNamePrefix}-param-autosave`]
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
            [...this.settings.classes.container, this.settings.theme]
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

        // new EditorParams(this.element, this.settings).init();
        this.makeParams();
        this.makeButtons();

        console.log(this.settings)
    }
}