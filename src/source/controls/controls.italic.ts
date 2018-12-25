import EditorUtils from '../utils';
import EditorSettings from '../settings';

import { EditorControlsSettingsInterface } from './controlsInterface';

class Italic {
    textarea: HTMLTextAreaElement;
    button: Element;
    container: Element;
    settings: EditorControlsSettingsInterface;

    static mdTag = '_';

    constructor(textarea, container, settings) {
        this.textarea = textarea;
        this.container = container;
        this.settings = settings || {};
        this.button = undefined;
    }

    _settingsNormalize() {
        const { log, detectOs } = EditorUtils;
        const { hotkeyWrong } = EditorSettings.defaultWarnings.controls;
        const os = detectOs();
        const { hotkey } = this.settings;
        const currentHotkeys = hotkey[os];

        if (!currentHotkeys.modificator || !currentHotkeys.key) {
            log(hotkeyWrong, 'warn', null);
        }

        this.settings.hotkeyCurrent = currentHotkeys;
    }

    _insertTag() {
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

    _handle() {
        this.button.addEventListener('click', this._click.bind(this));
        window.document.addEventListener('keydown', this._keydown.bind(this));
    }

    _click(e) {
        e.preventDefault();
        this._insertTag();
    }

    _keydown(e) {
        const { hotkeyCurrent } = this.settings;

        if (
            window.document.activeElement === this.textarea &&
            e[hotkeyCurrent.modificator] &&
            e.key === hotkeyCurrent.key
        ) {
            this._insertTag();
        }
    }

    init() {
        const { createElement } = EditorUtils;
        const { controls } = EditorSettings.defaultClasses;
        const { button } = this.settings;

        this.button = createElement(
            'a',
            [
                `${controls}--button`,
                `${controls}--button__${button.toLowerCase()}`,
            ],
            { href: '#' }
        );
        this.button.innerHTML = button;
        this.container.appendChild(this.button);

        this._settingsNormalize();
        this._handle();
    }
}

export default Italic;
