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
    private static mdTag = '_';

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
        const { textarea } = this;
        const { selectionStart, selectionEnd } = textarea;

        if (selectionStart === selectionEnd) {
            textarea.value =
                textarea.value.slice(0, selectionStart) +
                Italic.mdTag +
                Italic.mdTag +
                textarea.value.slice(selectionStart);

            textarea.focus();
            textarea.setSelectionRange(
                selectionStart + Italic.mdTag.length,
                selectionStart + Italic.mdTag.length
            );
        } else {
            const selection = textarea.value.slice(
                selectionStart,
                selectionEnd
            );

            if (
                selection.slice(0, Italic.mdTag.length) === Italic.mdTag &&
                selection.slice(selection.length - Italic.mdTag.length) ===
                    Italic.mdTag
            ) {
                textarea.value =
                    textarea.value.slice(0, selectionStart) +
                    selection.slice(
                        Italic.mdTag.length,
                        selection.length - Italic.mdTag.length
                    ) +
                    textarea.value.slice(selectionEnd);

                textarea.focus();
                textarea.setSelectionRange(
                    selectionStart,
                    selectionEnd - Italic.mdTag.length * 2
                );
            } else {
                textarea.value =
                    textarea.value.slice(0, selectionStart) +
                    Italic.mdTag +
                    textarea.value.slice(selectionStart, selectionEnd) +
                    Italic.mdTag +
                    textarea.value.slice(selectionEnd);

                textarea.focus();
                textarea.setSelectionRange(
                    selectionStart,
                    selectionEnd + Italic.mdTag.length * 2
                );
            }
        }
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
