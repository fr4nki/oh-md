import EditorControl from './controls';

import {
    EditorControlsBinderInterface,
    EditorControlsSettingsInterface
} from './controlsInterface';

class Strike extends EditorControl {
    private static mdTag = ['~~', '~~'];

    textarea: HTMLTextAreaElement;
    container: Element;
    settings: EditorControlsSettingsInterface;
    button: Element;

    constructor(
        textarea: HTMLTextAreaElement,
        container: Element,
        settings: EditorControlsSettingsInterface
    ) {
        super(textarea);

        this.textarea = textarea;
        this.container = container;
        this.settings = settings;

        this.button = undefined;
    }

    private handle(): void {
        const { hotkeyCurrent: hotkey } = this.settings;
        const argument: EditorControlsBinderInterface = {
            hotkey,
            callback: this.insertTagInto.bind(this)
        };

        super.addHandler(argument);
        this.button.addEventListener('click', this.click.bind(this));
    }

    private insertTagInto() {
        super.insertSimpleElement(Strike.mdTag);
    }

    private click(e: MouseEvent): void {
        e.preventDefault();
        this.insertTagInto();
    }

    public init(): void {
        const { control, hotkey } = this.settings;

        this.settings.hotkeyCurrent = super.getCurrentHotkey(hotkey);
        this.button = super.generateElement(control);
        this.container.appendChild(this.button);

        this.handle();
    }
}

export default Strike;
