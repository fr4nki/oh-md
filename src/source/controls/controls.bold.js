import EditorUtils from '../utils';
import EditorSettings from '../settings';

class Bold {
    static mdTag = '**';

    constructor(textarea, container, settings) {
        this.textarea = textarea;
        this.container = container;
        this.settings = settings || {};
    }

    _settingsNormalize() {
        const { log, detectOs } = EditorUtils
        const { buttons } = EditorSettings.defaultWarnings.controls
        const os = detectOs();
        const { hotkey } = this.settings;
        const currentHotkeys = hotkey[os];

        if (
            !currentHotkeys.modificator ||
            !currentHotkeys.key
        ) {
            log(buttons.hotkey.hotkeyWrong, 'warn')
        }

        this.settings.hotkey = currentHotkeys
    }

    _click(e) {
        e.preventDefault();
        console.log('click');
    }

    _handle() {
        this.button.addEventListener('click', this._click.bind(this));
        window.document.addEventListener('keydown', this._keydown.bind(this));
    }

    _keydown(e) {
        const { hotkey } = this.settings;

        if (window.document.activeElement === this.textarea) {
            if (e[hotkey.modificator] && e.key === hotkey.key) {
                // TODO: Перетащить в класс Controls. И отрефачить
                const { textarea: a } = this;
                const { selectionStart, selectionEnd } = a;

                if (selectionStart === selectionEnd) {
                    a.value = a.value.slice(0, selectionStart) + Bold.mdTag + a.value.slice(selectionStart);
                    a.setSelectionRange(selectionStart, selectionEnd);
                } else {
                    const selection = a.value.slice(selectionStart, selectionEnd);

                    if (
                        selection.slice(0, Bold.mdTag.length) === Bold.mdTag &&
                        selection.slice(selection.length - 2) === Bold.mdTag
                    ) {
                        a.value = a.value.slice(0, selectionStart) +
                            selection.slice(Bold.mdTag.length, selection.length - Bold.mdTag.length) +
                            a.value.slice(selectionEnd);

                        a.setSelectionRange(selectionStart, selectionEnd - Bold.mdTag.length * 2);
                    } else {
                        a.value = a.value.slice(0, selectionStart) +
                            Bold.mdTag +
                            a.value.slice(selectionStart, selectionEnd) +
                            Bold.mdTag +
                            a.value.slice(selectionEnd);

                        a.setSelectionRange(selectionStart, selectionEnd + Bold.mdTag.length * 2);
                    }
                }

            }
        }
    }

    _unhandle() {

    }

    init() {
        const { createElement } = EditorUtils;
        const { controls } = EditorSettings.defaultClasses;
        const { button } = this.settings;

        this.button = createElement(
            'a',
            [`${controls}--button`, `${controls}--button__${button.toLowerCase()}`],
            { href: "#" },
        );
        this.button.innerText = button
        this.container.appendChild(this.button);

        this._settingsNormalize();
        this._handle();
    }
}

export default Bold;