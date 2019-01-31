import EditorControl from './controls';
import EditorSettings from '../settings';

import {
    EditorControlsBinderInterface,
    EditorControlsSettingsInterface
} from './controlsInterface';

class Fullscreen extends EditorControl {
    textarea: HTMLTextAreaElement;
    container: Element;
    settings: EditorControlsSettingsInterface;
    wrapper: Element;

    button: Element;
    isFullscreenEnabled: Boolean;

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

        this.button = null;
        this.isFullscreenEnabled = false;
    }

    private toggleFullscreen() {
        const container = EditorSettings.defaultClasses.container[0];
        const className = `${container}-status-fullscreen`;

        if (this.isFullscreenEnabled) {
            this.wrapper.classList.remove(className);
        } else {
            this.wrapper.classList.add(className);
        }

        this.isFullscreenEnabled = !this.isFullscreenEnabled;
    }

    private handle(): void {
        const { hotkeyCurrent: hotkey } = this.settings;
        const argument: EditorControlsBinderInterface = {
            hotkey,
            callback: this.toggleFullscreen.bind(this)
        };

        super.addHandler(argument);
        this.button.addEventListener('click', this.click.bind(this));
    }

    private click(e: MouseEvent): void {
        e.preventDefault();
        this.toggleFullscreen();
    }

    public init(): void {
        const { control, hotkey } = this.settings;

        this.settings.hotkeyCurrent = super.getCurrentHotkey(hotkey);
        this.button = super.generateElement(control);
        this.container.appendChild(this.button);

        this.handle();
    }
}

export default Fullscreen;
