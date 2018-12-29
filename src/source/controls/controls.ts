import EditorUtils from '../utils';
import EditorSettings from '../settings';

import { EditorControlsBinderInterface } from './controlsInterface';

class Controls {
    textarea: HTMLTextAreaElement;

    private static handleList: EditorControlsBinderInterface[] = [];

    constructor(textarea: HTMLTextAreaElement) {
        this.textarea = textarea;
    }

    protected getCurrentHotkey(hotkeys: object) {
        const { log, detectOs } = EditorUtils;
        const { hotkeyWrong } = EditorSettings.defaultWarnings.controls;
        const os = detectOs();
        const currentHotkeys = hotkeys[os];

        if (!currentHotkeys.modificator || !currentHotkeys.key) {
            log(hotkeyWrong, 'warn', null);
        }

        return currentHotkeys;
    }

    protected generateElement(controlType: string) {
        const { createElement, capitalize } = EditorUtils;
        const { controls } = EditorSettings.defaultClasses;
        const normalizedControlName = capitalize(controlType);

        const control = createElement(
            'a',
            [
                `${controls}--button`,
                `${controls}--button__${controlType.toLowerCase()}`,
            ],
            { href: '#', title: normalizedControlName }
        );
        control.innerHTML = normalizedControlName;

        return control;
    }

    protected addHandler(o: EditorControlsBinderInterface) {
        Controls.handleList.push(o);
    }

    public init() {
        window.document.addEventListener('keydown', (e) => {
            if (window.document.activeElement === this.textarea) {
                Controls.handleList.forEach((handler) => {
                    if (
                        handler.hotkey &&
                        e[handler.hotkey.modificator] &&
                        e.key === handler.hotkey.key
                    ) {
                        handler.callback();
                    } else {
                        !handler.callback || handler.callback();
                    }
                });
            }
        });
    }
}

export default Controls;
