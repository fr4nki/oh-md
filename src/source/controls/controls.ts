import EditorUtils from '../utils';
import EditorSettings from '../settings';

import { EditorControlsBinderInterface } from './controlsInterface';

class Controls {
    textarea: HTMLTextAreaElement;

    private static handlerList: EditorControlsBinderInterface[] = [];

    constructor(textarea: HTMLTextAreaElement) {
        this.textarea = textarea;
    }

    private setFocusToTextarea(start, finish) {
        this.textarea.focus();
        this.textarea.setSelectionRange(start, finish);
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

    protected insertTagInto(tagList: string[]) {
        const [tStart, tEnd] = tagList;
        const {
            selectionStart: sStart,
            selectionEnd: sEnd,
            value: taV,
        } = this.textarea;

        const isSelectionEmpty = sStart === sEnd;

        const isTagsOutside =
            taV.slice(sStart - tStart.length, sStart) === tStart &&
            taV.slice(sEnd, sEnd + tEnd.length) === tEnd;

        const isTagsInside =
            taV.slice(sStart, sStart + tStart.length) === tStart &&
            taV.slice(sEnd - tEnd.length, sEnd) === tEnd;

        if (isTagsInside && !isSelectionEmpty) {
            this.textarea.value =
                taV.slice(0, sStart) +
                taV.slice(sStart + tStart.length, sEnd - tEnd.length) +
                taV.slice(sEnd);

            this.setFocusToTextarea(sStart, sEnd - tStart.length - tEnd.length);
        } else if (isTagsOutside) {
            this.textarea.value =
                taV.slice(0, sStart - tStart.length) +
                taV.slice(sStart, sEnd) +
                taV.slice(sEnd + tEnd.length);

            this.setFocusToTextarea(sStart - tStart.length, sEnd - tEnd.length);
        } else {
            this.textarea.value =
                taV.slice(0, sStart) +
                tStart +
                taV.slice(sStart, sEnd) +
                tEnd +
                taV.slice(sEnd);

            this.setFocusToTextarea(sStart + tStart.length, sEnd + tEnd.length);
        }
    }

    protected addHandler(o: EditorControlsBinderInterface) {
        Controls.handlerList.push(o);
    }

    public init() {
        window.document.addEventListener('keydown', (e) => {
            if (window.document.activeElement === this.textarea) {
                Controls.handlerList.forEach((handler) => {
                    if (handler.hotkey) {
                        if (
                            e[handler.hotkey.modificator] &&
                            e.key === handler.hotkey.key
                        ) {
                            handler.callback();
                        }
                    } else {
                        handler.callback();
                    }
                });
            }
        });
    }
}

export default Controls;
