import EditorUtils from '../utils';
import EditorSettings from '../settings';

import { EditorParamsSettingsInterface } from './paramsInterface';

class Autosave {
    textarea: HTMLTextAreaElement;
    element: Element;
    container: Element;
    settings: EditorParamsSettingsInterface;

    static separator = '|||||';

    constructor(
        textarea: HTMLTextAreaElement,
        container: Element,
        settings: EditorParamsSettingsInterface,
    ) {
        this.element = null;
        this.textarea = textarea;
        this.container = container;
        this.settings = settings;
    }

    _getTextareaHash() {
        const { URL: url } = window.document;
        const { id } = this.settings;

        return `${url}${Autosave.separator}${id}`;
    }

    _fillTextArea() {
        const hash = this._getTextareaHash();
        this.textarea.value = window.localStorage[hash] || '';
    }

    _saveText() {
        const { params } = EditorSettings.defaultClasses;
        const { value } = this.textarea;
        const hash = this._getTextareaHash();

        this.element.classList.add(`${params}--autosave__saved`);
        window.localStorage[hash] = value;

        setTimeout(() => {
            this.element.classList.remove('active');
        }, 2000);
    }

    init() {
        const { defaultWarnings, defaultClasses } = EditorSettings;
        const { createElement, log } = EditorUtils;
        const { params } = defaultClasses;
        const { id: idWarning } = defaultWarnings.autosave;
        const { autosave } = this.settings;
        const id = this.textarea.id || this.textarea.name || null;

        if (!autosave) return;
        if (!id) {
            log(idWarning, 'warn', [String(this.textarea)]);
            return;
        }

        this.element = createElement('p', [`${params}--autosave`]);
        this.element.innerHTML = 'Saved';
        this.container.appendChild(this.element);
        this.settings.id = id;

        this._fillTextArea();

        setInterval(() => {
            this._saveText();
        }, autosave * 1000);
    }
}

export default Autosave;
