import EditorControl from './controls';

import EditorUtils from '../utils';
import EditorSettings from '../settings';

import {
    EditorControlsSettingsInterface,
    EditorControlsBinderInterface,
} from './controlsInterface';

class Italic extends EditorControl {
    textarea: HTMLTextAreaElement;
    container: Element;
    settings: EditorControlsSettingsInterface;

    private button: Element;
    private static mdTag = ['_', '_'];

    constructor(
        textarea: HTMLTextAreaElement,
        container: Element,
        settings: EditorControlsSettingsInterface
    ) {
        super(textarea);

        this.textarea = textarea;
        this.container = container;
        this.settings = settings || {};

        this.button = undefined;
    }

    private insertTag(): void {
        super.insertTagInto(Italic.mdTag);
    }

    private handle(): void {
        const { hotkeyCurrent: hotkey } = this.settings;
        const argument: EditorControlsBinderInterface = {
            callback: this.insertTag.bind(this),
            hotkey,
        };

        this.addHandler(argument);
        this.button.addEventListener('click', this.click.bind(this));
    }

    private click(e: MouseEvent): void {
        e.preventDefault();
        this.insertTag();
    }

    public init(): void {
        const { control, hotkey } = this.settings;

        this.settings.hotkeyCurrent = super.getCurrentHotkey(hotkey);
        this.button = super.generateElement(control);
        this.container.appendChild(this.button);

        this.handle();
    }
}

export default Italic;
