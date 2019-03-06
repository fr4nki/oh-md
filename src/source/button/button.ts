import EditorSettings from '../settings';
import EditorUtils from '../utils/utils';

import {
    EditorButton as EditorButtonInterface,
    EditorControlsBinder,
    EditorControlsHotkeyInterface as EditorHotkey,
} from '../types';

class EditorButton implements EditorButtonInterface {
    button: HTMLElement;
    handler : EditorControlsBinder;

    constructor(
        handler: EditorControlsBinder
    ) {
        this.handler = handler;
        this.button = null;
    }

    static generateElement(controlType: string, hotKeys: EditorHotkey): HTMLElement {
        const { createElement, capitalize, getNormalizedKey } = EditorUtils;

        const controls = EditorSettings.defaultClasses.controls[0];
        const normalizedControlName = capitalize(controlType.split('_').join(' '));
        const normalizedHotKeyText = [];
        const space = ' ';

        if (hotKeys && hotKeys.modificator) {
            normalizedHotKeyText.push(
                getNormalizedKey(hotKeys.modificator),
                hotKeys.key.toUpperCase(),
            );
        }

        const hotkeyText = normalizedHotKeyText.length
            ? `${space}(${normalizedHotKeyText.join(' + ')})`
            : ''
        ;

        const control = createElement(
            'button',
            [
                `${controls}--button`,
                `${controls}--button__${controlType.toLowerCase()}`
            ],
            {
                title: normalizedControlName + hotkeyText,
            }
        );

        control.innerHTML = normalizedControlName;

        return control;
    }

    public init(): HTMLElement {
        const { control, hotkeyCurrent } = this.handler.settings;
        const [controlClassname] = EditorSettings.defaultClasses.controls;
        const activeControlClassname = `${controlClassname}--button__active`;

        this.button = EditorButton.generateElement(
            control,
            hotkeyCurrent,
        );

        this.button.addEventListener('mousedown', () => {
            this.button.classList.add(activeControlClassname);
        });

        this.button.addEventListener('mouseup', () => {
            this.button.classList.remove(activeControlClassname);
        });

        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.handler.callback();
        });

        return this.button;
    }
}

export default EditorButton;