import EditorUtils from '../utils';
import EditorSettings from '../settings';

import { EditorControlsBinderInterface } from './controlsInterface';

class Controls {
    protected textarea: HTMLTextAreaElement;
    private static handlerList: EditorControlsBinderInterface[] = [];
    private static insertCommand: string = 'insertText';

    constructor(textarea: HTMLTextAreaElement) {
        this.textarea = textarea;
    }

    protected insertTextInto(text: string, slice: number[], focus: number[]) {
        this.textarea.focus();
        this.textarea.setSelectionRange(slice[0], slice[1]);

        if (
            document.queryCommandEnabled(Controls.insertCommand) &&
            document.queryCommandSupported(Controls.insertCommand)
        ) {
            // console.log('===== exec');
            document.execCommand(Controls.insertCommand, false, text);
        } else {
            // console.log('===== value');
            const { value } = this.textarea;

            this.textarea.value = value.slice(0, slice[0]) + text + value.slice(slice[1]);
        }

        this.textarea.setSelectionRange(focus[0], focus[1]);
    }

    protected insertSimpleElement(tag: string[]): string[] {
        const {
            selectionStart: sStart,
            selectionEnd: sEnd,
            value: taV
        } = this.textarea;
        const [tStart, tEnd] = tag;

        const normalSlice = taV.slice(sStart, sEnd);
        const innerSlice = normalSlice.slice(
            tStart.length,
            (tEnd ? -tEnd.length : undefined)
        );
        const outerSlice = taV.slice(
            sStart - tStart.length,
            (sEnd + (tEnd ? tEnd.length : 0))
        );

        const isSelectionOutside =
            (tStart ? outerSlice.slice(0, tStart.length) === tStart : true) &&
            (tEnd ? outerSlice.slice(-tEnd.length) === tEnd : true);

        const isSelectionInside =
            (tStart ? normalSlice.slice(0, tStart.length) === tStart : true) &&
            (tEnd ? normalSlice.slice(-tEnd.length) === tEnd : true);

        let value: string;
        let slice: number[];
        let focus: number[];

        if (isSelectionInside) {
            value = innerSlice;
            slice = [sStart, sEnd];
            focus = [sStart, innerSlice.length + sStart];
        } else
        if (isSelectionOutside) {
            value = normalSlice;
            slice = [sStart - tStart.length, sEnd + (tEnd ? tEnd.length : 0)];
            focus = [sStart - tStart.length, sEnd - (tEnd ? tEnd.length : 0)];
        } else {
            value = [tStart, normalSlice, tEnd].join('');
            slice = [sStart, sEnd];
            focus = [sStart + tStart.length, sStart + tStart.length + normalSlice.length];
        }

        this.insertTextInto(value, slice, focus);

        return [tStart, tEnd];
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
            'button',
            [
                `${controls}--button`,
                `${controls}--button__${controlType.toLowerCase()}`
            ],
            {
                title: normalizedControlName,
            }
        );
        control.innerHTML = normalizedControlName;

        return control;
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
                            e.preventDefault();
                            handler.callback();
                        }
                    } else {
                        e.preventDefault();
                        handler.callback();
                    }
                });
            }
        });
    }
}

export default Controls;
