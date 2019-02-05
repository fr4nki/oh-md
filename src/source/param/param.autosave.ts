import EditorUtils from '../utils';
import EditorSettings from '../settings';

import { EditorParamsSettingsInterface } from './paramInterface';

class Autosave {
    textarea: HTMLTextAreaElement;
    container: Element;
    settings: EditorParamsSettingsInterface;

    private element: Element;
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

    private getTextareaHash(): string {
        const { URL: url } = window.document;
        const { id } = this.settings;

        return `${url}${Autosave.separator}${id}`;
    }

    private fillTextArea(): void {
        const hash = this.getTextareaHash();
        this.textarea.value = window.localStorage[hash] || '';
    }

    private saveText(): void {
        const params = EditorSettings.defaultClasses.params[0];
        const { value } = this.textarea;
        const hash = this.getTextareaHash();
        const activeClass = `${params}--autosave__saved`;

        this.element.classList.add(activeClass);
        window.localStorage[hash] = value;

        setTimeout(
            () => {
                this.element.classList.remove(activeClass);
            },
            2000
        );
    }

    public init(): void {
        const { defaultWarnings, defaultClasses } = EditorSettings;
        const { createElement, log } = EditorUtils;
        const params = defaultClasses.params[0];
        const { id: idWarning } = defaultWarnings.autosave;
        const { autosave } = this.settings;
        const id = this.textarea.id || this.textarea.name || null;

        if (!autosave) return;
        if (!id) {
            log(idWarning, 'warn', [String(this.textarea)]);
            return;
        }

        this.element = createElement(
            'p',
            [`${params}--autosave`]
        );
        this.element.innerHTML = 'Saved';
        this.container.appendChild(this.element);
        this.settings.id = id;

        this.fillTextArea();

        setInterval(
            () => {
                this.saveText();
            },
            autosave * 1000
        );
    }
}

export default Autosave;
