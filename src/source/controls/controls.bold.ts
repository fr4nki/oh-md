import EditorControl from './controls';
import EditorUtils from '../utils';
import EditorSettings from '../settings';

import {
    EditorControlsSettingsInterface,
    EditorControlsBinderInterface,
} from './controlsInterface';

class Bold extends EditorControl {
    textarea: HTMLTextAreaElement;
    container: Element;
    settings: EditorControlsSettingsInterface;

    private button: Element;
    private static mdTag = '**';

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

    private insertTag(): void {
        const { textarea } = this;
        const { selectionStart, selectionEnd } = textarea;

        if (selectionStart === selectionEnd) {
            textarea.value =
                textarea.value.slice(0, selectionStart) +
                Bold.mdTag +
                Bold.mdTag +
                textarea.value.slice(selectionStart);

            textarea.focus();
            textarea.setSelectionRange(
                selectionStart + Bold.mdTag.length,
                selectionStart + Bold.mdTag.length
            );
        } else {
            const selection = textarea.value.slice(
                selectionStart,
                selectionEnd
            );

            if (
                selection.slice(0, Bold.mdTag.length) === Bold.mdTag &&
                selection.slice(selection.length - Bold.mdTag.length) ===
                    Bold.mdTag
            ) {
                textarea.value =
                    textarea.value.slice(0, selectionStart) +
                    selection.slice(
                        Bold.mdTag.length,
                        selection.length - Bold.mdTag.length
                    ) +
                    textarea.value.slice(selectionEnd);

                textarea.focus();
                textarea.setSelectionRange(
                    selectionStart,
                    selectionEnd - Bold.mdTag.length * 2
                );
            } else {
                textarea.value =
                    textarea.value.slice(0, selectionStart) +
                    Bold.mdTag +
                    textarea.value.slice(selectionStart, selectionEnd) +
                    Bold.mdTag +
                    textarea.value.slice(selectionEnd);

                textarea.focus();
                textarea.setSelectionRange(
                    selectionStart,
                    selectionEnd + Bold.mdTag.length * 2
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

export default Bold;
