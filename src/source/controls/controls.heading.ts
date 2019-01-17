import EditorControl from './controls';

import {
    EditorControlsSettingsInterface,
    EditorControlsBinderInterface,
} from './controlsInterface';

class Heading extends EditorControl {
    private static mdTag = ['#', ''];

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
        super.insertSimpleElement(Heading.mdTag);
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
        this.button = super.generateElement(control);
        this.container.appendChild(this.button);

        this.handle();
    }
}

export default Heading;
