import EditorControl from './control';

import {
    EditorControlsSettingsInterface,
    EditorControlsBinderInterface,
} from './controlInterface';

class Italic extends EditorControl {
    private static mdTag = ['_', '_'];

    textarea: HTMLTextAreaElement;
    container: Element;
    settings: EditorControlsSettingsInterface;
    private button: Element;

    constructor(
        textarea: HTMLTextAreaElement,
        container: Element,
        settings: EditorControlsSettingsInterface
    ) {
        super(textarea);

        this.button = undefined;
        this.textarea = textarea;
        this.container = container;
        this.settings = settings || {};
    }

    private insertTagInto() {
        super.insertSimpleElement(Italic.mdTag);
    }

    private handle(): void {
        const { hotkeyCurrent: hotkey } = this.settings;
        const argument: EditorControlsBinderInterface = {
            hotkey,
            callback: this.insertTagInto.bind(this),
        };

        this.addHandler(argument);
        this.button.addEventListener('click', this.click.bind(this));
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

export default Italic;
