import EditorUtils from '../utils';
import EditorSettings from '../settings';

class Autosave {
    constructor(textarea, container, settings) {
        this.element = null;
        this.textarea = textarea;
        this.container = container;
        this.settings = settings || {};
    }

    _getTextareaHash() {
        const { URL: url } = window.document;
        const { id } = this.settings;
        const separator = '|||||'

        return `${url}${separator}${id}`;
    }

    _fillTextArea() {
        const hash = this._getTextareaHash();
        const value = window.localStorage[hash] || '';

        this.textarea.value = value;
    }

    _saveText() {
        const { value } = this.textarea;
        const hash = this._getTextareaHash();

        this.element.classList.add('active');
        window.localStorage[hash] = value;

        setTimeout(() => {
            this.element.classList.remove('active');
        }, 2000);
    }

    init() {
        const { defaultWarnings, defaultClasses } = EditorSettings
        const { params } = defaultClasses;
        const { id: idWarning } = defaultWarnings.autosave;
        const { autosave } = this.settings;
        const id = this.textarea.id || this.textarea.name || null;

        if (!autosave) return;
        if (!id) {
            console.warn(idWarning, this.textarea);
            return;
        }

        this.element = EditorUtils.createElement(
            'p',
            [`${params}--autosave`]
        );
        this.element.innerText = 'Saved';
        this.container.appendChild(this.element);
        this.settings.id = id;

        this._fillTextArea();

        setInterval(
            () => { this._saveText() },
            autosave * 1000,
        );
    }
}

export default Autosave