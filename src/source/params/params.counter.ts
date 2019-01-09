import EditorUtils from '../utils';
import EditorSettings from '../settings';

import { EditorParamsSettingsInterface } from './paramsInterface';

class Counter {
    private textarea: HTMLTextAreaElement;
    private element: Element;
    readonly container: Element;
    readonly settings: EditorParamsSettingsInterface;

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

    private setHandlers(): void {
        document.addEventListener('DOMContentLoaded', () => {
            this.textarea.addEventListener('input', this.counterUpdate.bind(this));
            this.textarea.addEventListener('keyup', this.counterUpdate.bind(this));
            this.counterUpdate();
        });
    }

    private counterUpdate(): void {
        this.element.innerHTML = String(this.textarea.value.length);
    }

    public init() {
        const { params } = EditorSettings.defaultClasses;
        const { counter } = this.settings;

        if (!counter) return;

        this.element = EditorUtils.createElement(
            'p',
            [`${params}--counter`],
        );
        this.container.appendChild(this.element);

        this.setHandlers();
    }
}

export default Counter;
