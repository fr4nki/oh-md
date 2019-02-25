import EditorUtils from '../utils/utils';
import EditorSettings from '../editor/editorSettings';

import { EditorParamsSettingsInterface } from './paramInterface';

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
        window.setTimeout(
            () => {
                const counter =  String(this.textarea.value.length);
                this.element.innerHTML = counter;
            },
            0,
        );
    }

    public init() {
        const params = EditorSettings.defaultClasses.params[0];
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
