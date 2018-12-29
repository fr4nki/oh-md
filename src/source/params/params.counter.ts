import EditorUtils from '../utils';
import EditorSettings from '../settings';

import { EditorParamsSettingsInterface } from './paramsInterface';

class Counter {
    textarea: HTMLTextAreaElement;
    container: Element;
    settings: EditorParamsSettingsInterface;

    private element: Element;

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

    _counterUpdate() {
        this.element.innerHTML = String(this.textarea.value.length);
    }

    _setHandlers() {
        document.addEventListener('DOMContentLoaded', () => {
            this.textarea.addEventListener('input', this._counterUpdate.bind(this));
            this._counterUpdate();
        });
    }

    init() {
        const { params } = EditorSettings.defaultClasses;
        const { counter } = this.settings;

        if (!counter) return;

        this.element = EditorUtils.createElement(
            'p',
            [`${params}--counter`],
        );
        this.container.appendChild(this.element);

        this._setHandlers();
    }
}

export default Counter;
