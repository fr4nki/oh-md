import EditorControl from './control';

import {
    EditorControlsBinderInterface,
    EditorControlsSettingsInterface
} from './controlInterface';

class Bold extends EditorControl {
    private static mdTag = ['**', '**'];

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
        this.button.classList.add('active');
        super.insertSimpleElement(Bold.mdTag);
        this.button.classList.remove('active');
    }

    private click(e: MouseEvent): void {
        e.preventDefault();
        this.insertTagInto();
    }

    public init(): void {
        const { control, hotkey } = this.settings;

        this.settings.hotkeyCurrent = super.getCurrentHotkey(hotkey);
        this.button = super.generateElement(control, this.settings.hotkeyCurrent);
        this.container.appendChild(this.button);

        this.handle();
    }
}

export default Bold;