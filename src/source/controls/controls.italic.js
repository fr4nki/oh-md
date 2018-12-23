import EditorUtils from '../utils';
import EditorSettings from '../settings';

class Italic {
    static mdTag = '__';

    constructor(textarea, container, settings) {
        this.textarea = textarea;
        this.container = container;
        this.settings = settings || {};
    }

    _settingsNormalize() {
        const {log, detectOs} = EditorUtils;
        const {buttons} = EditorSettings.defaultWarnings.controls;
        const os = detectOs();
        const {hotkey} = this.settings;
        const currentHotkeys = hotkey[os];

        if (
            !currentHotkeys.modificator ||
            !currentHotkeys.key
        ) {
            log(buttons.hotkey.hotkeyWrong, 'warn');
        }

        this.settings.hotkey = currentHotkeys
    }

    _insertTag() {
        const {textarea} = this;
        const {selectionStart, selectionEnd} = textarea;

        if (selectionStart === selectionEnd) {
            textarea.value = textarea.value.slice(0, selectionStart) +
                Italic.mdTag + Italic.mdTag +
                textarea.value.slice(selectionStart);

            textarea.focus();
            textarea.setSelectionRange(selectionStart + Italic.mdTag.length, selectionStart + Italic.mdTag.length);
        } else {
            const selection = textarea.value.slice(selectionStart, selectionEnd);

            if (
                selection.slice(0, Italic.mdTag.length) === Italic.mdTag &&
                selection.slice(selection.length - Italic.mdTag.length) === Italic.mdTag
            ) {
                textarea.value = textarea.value.slice(0, selectionStart) +
                    selection.slice(Italic.mdTag.length, selection.length - Italic.mdTag.length) +
                    textarea.value.slice(selectionEnd);

                textarea.focus();
                textarea.setSelectionRange(selectionStart, selectionEnd - Italic.mdTag.length * 2);
            } else {
                textarea.value = textarea.value.slice(0, selectionStart) +
                    Italic.mdTag +
                    textarea.value.slice(selectionStart, selectionEnd) +
                    Italic.mdTag +
                    textarea.value.slice(selectionEnd);

                textarea.focus();
                textarea.setSelectionRange(selectionStart, selectionEnd + Italic.mdTag.length * 2);
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
        const {hotkey} = this.settings;

        if (
            window.document.activeElement === this.textarea &&
            e[hotkey.modificator] && e.key === hotkey.key
        ) {
            this._insertTag();
        }
    }

    _unhandle() {

    }

    init() {
        const {createElement} = EditorUtils;
        const {controls} = EditorSettings.defaultClasses;
        const {button} = this.settings;

        this.button = createElement(
            'a',
            [`${controls}--button`, `${controls}--button__${button.toLowerCase()}`],
            {href: "#"},
        );
        this.button.innerText = button;
        this.container.appendChild(this.button);

        this._settingsNormalize();
        this._handle();
    }
}

export default Italic;
