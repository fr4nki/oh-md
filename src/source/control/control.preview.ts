import marked from 'marked';

import EditorControl from './control';
import EditorUtils from '../utils';
import EditorSettings from '../settings';

import {
    EditorControlsBinderInterface,
    EditorControlsSettingsInterface
} from './controlInterface';

class Preview extends EditorControl {
    textarea: HTMLTextAreaElement;
    container: Element;
    settings: EditorControlsSettingsInterface;
    button: Element;
    previewContainer: Element;

    constructor(
        textarea: HTMLTextAreaElement,
        container: Element,
        settings: EditorControlsSettingsInterface
    ) {
        super(textarea);

        this.textarea = textarea;
        this.container = container;
        this.settings = settings;

        this.previewContainer = null;
        this.button = undefined;

        this.handleAreaInput = EditorUtils.debounce(this.handleAreaInput.bind(this), 250);
    }

    private handle(): void {
        const { hotkeyCurrent: hotkey } = this.settings;
        const argument: EditorControlsBinderInterface = {
            hotkey,
            callback: this.handlePreview.bind(this)
        };

        super.addHandler(argument);
        this.button.addEventListener('click', this.click.bind(this));
    }

    private click(e: MouseEvent): void {
        e.preventDefault();
        this.handlePreview();
    }

    private handlePreview(): void {
        if (this.previewContainer === null) {
            this.initPreview();
        } else {
            this.removePreview();
        }
    }

    private initPreview() {
        const { createElement } = EditorUtils;
        const area = EditorSettings.defaultClasses.area[0];

        this.previewContainer = createElement(
            'div',
            [`${area}--container__preview`],
        );

        this.textarea.parentElement.parentElement.appendChild(this.previewContainer);
        this.textarea.addEventListener('keyup', this.handleAreaInput);
        this.handleAreaInput();
    }

    private removePreview() {
        this.textarea.parentElement.parentElement.removeChild(this.previewContainer);
        this.previewContainer = null;
        this.textarea.removeEventListener('keyup', this.handleAreaInput);
    }

    private handleAreaInput() {
        this.previewContainer.innerHTML = marked(this.textarea.value);
    }

    public init(): void {
        const { control, hotkey } = this.settings;

        this.settings.hotkeyCurrent = super.getCurrentHotkey(hotkey);
        this.button = super.generateElement(control, this.settings.hotkeyCurrent);
        this.container.appendChild(this.button);

        this.handle();
    }
}

export default Preview;
