import EditorControl from './control';
import EditorSettings from '../settings';

import {
    EditorControlsBinderInterface,
    EditorControlsSettingsInterface
} from './controlInterface';

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
        const { defaultClasses } = EditorSettings;

        const controls = defaultClasses.controls[0];
        const container = defaultClasses.container[0];

        const wrapperClassname = `${container}-mode-fullscreen`;
        const buttonClassname = `${controls}--button__fullscreen__active`;

        if (this.isFullscreenEnabled) {
            this.wrapper.classList.remove(wrapperClassname);
            this.button.classList.remove(buttonClassname);
        } else {
            this.wrapper.classList.add(wrapperClassname);
            this.button.classList.add(buttonClassname);
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
        this.button = super.generateElement(control, this.settings.hotkeyCurrent);
        this.container.appendChild(this.button);

        this.handle();
    }
}

export default Fullscreen;
