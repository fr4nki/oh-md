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
    wrapper: Element;

    constructor(
        textarea: HTMLTextAreaElement,
        container: Element,
        settings: EditorControlsSettingsInterface,
        wrapper: Element,
    ) {
        super(textarea);

        this.textarea = textarea;
        this.container = container;
        this.settings = settings;
        this.wrapper = wrapper;

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
        // const { defaultClasses } = EditorSettings;

        // const controls = defaultClasses.controls[0];
        // const container = defaultClasses.container[0];

        // const wrapperClassname = `${container}-mode-fullscreen`;
        // const buttonClassname = `${controls}--button__fullscreen__active`;

        // if (this.isFullscreenEnabled) {
        //     this.wrapper.classList.remove(wrapperClassname);
        //     this.button.classList.remove(buttonClassname);
        // } else {
        //     this.wrapper.classList.add(wrapperClassname);
        //     this.button.classList.add(buttonClassname);
        // }

        const { defaultClasses } = EditorSettings;
        const { createElement } = EditorUtils;

        const area = defaultClasses.area[0];
        const controls = defaultClasses.controls[0];
        const container = defaultClasses.container[0];

        const buttonClassname = `${controls}--button__preview__active`;
        const wrapperClassname = `${container}-mode-preview`;

        this.previewContainer = createElement(
            'div',
            [`${area}--container__preview`],
        );

        this.textarea.parentElement.parentElement.appendChild(this.previewContainer);
        this.textarea.addEventListener('input', this.handleAreaInput);

        this.button.classList.add(buttonClassname);
        this.wrapper.classList.add(wrapperClassname);

        this.handleAreaInput();
    }

    private removePreview() {
        const { defaultClasses } = EditorSettings;

        const controls = defaultClasses.controls[0];
        const container = defaultClasses.container[0];

        const buttonClassname = `${controls}--button__preview__active`;
        const wrapperClassname = `${container}-mode-preview`;

        this.textarea.parentElement.parentElement.removeChild(this.previewContainer);
        this.previewContainer = null;
        this.textarea.removeEventListener('input', this.handleAreaInput);
        this.button.classList.remove(buttonClassname);
        this.wrapper.classList.remove(wrapperClassname);
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
