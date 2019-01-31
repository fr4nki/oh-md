import marked from 'marked';

import EditorControl from './controls';

import {
    EditorControlsBinderInterface,
    EditorControlsSettingsInterface
} from './controlsInterface';

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
    }

    private handle(): void {
        const { hotkeyCurrent: hotkey } = this.settings;
        const argument: EditorControlsBinderInterface = {
            hotkey: null,
            callback: this.handlePreview.bind(this)
        };

        super.addHandler(argument);
        this.button.addEventListener('click', this.click.bind(this));
    }

    private handlePreview() {
        const { value } = this.textarea;

        this.previewContainer.innerHTML = marked(value);
    }

    private click(e: MouseEvent): void {
        e.preventDefault();
        this.handlePreview();
    }

    public init(): void {
        const { control, hotkey } = this.settings;

        this.settings.hotkeyCurrent = super.getCurrentHotkey(hotkey);
        this.button = super.generateElement(control);
        this.container.appendChild(this.button);
        this.previewContainer = document.createElement('div');

        this.textarea.parentElement.appendChild(this.previewContainer);

        this.textarea.addEventListener('keydown', this.handlePreview.bind(this));

        console.log(this);

        this.handle();
    }
}

export default Preview;
