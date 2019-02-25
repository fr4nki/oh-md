import EditorControl from './control';
import EditorUtils from '../utils/utils';

import {
    EditorControlsBinderInterface,
    EditorControlsSettingsInterface
} from './controlInterface';

class OrderedList extends EditorControl {
    private static mdTag = ['$.', null];

    textarea: HTMLTextAreaElement;
    container: Element;
    settings: EditorControlsSettingsInterface;
    button: Element;

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

    private handle(): void {
        const { hotkeyCurrent: hotkey } = this.settings;
        const argument: EditorControlsBinderInterface = {
            hotkey,
            callback: this.insertTagInto.bind(this)
        };

        super.addHandler(argument);
        this.button.addEventListener('click', this.click.bind(this));
    }

    private insertTagInto() {
        const {
            selectionStart: sStart,
            selectionEnd: sEnd,
            value: taV
        } = this.textarea;

        const { capitalize } = EditorUtils;
        const [tStart] = OrderedList.mdTag;
        const isSomeSelected = sEnd - sStart;
        const normalSlice = taV.slice(sStart, sEnd);
        const outerSlice = taV.slice(sStart - tStart.length, sEnd);

        let isTagExists = false;

        const buttonTitle = capitalize(this.settings.control.split('_').join(' '));
        const EOL = '\n';
        const tagOffset = 2;
        const space = ' ';
        const tagNumStartCounter = new RegExp(/^\d. /);

        const eolSlices = outerSlice.split('\n').filter(s => s !== '');
        let eolSlicesCounter = 0;

        eolSlices.forEach((slice) => {
            if (
                slice !== '' &&
                slice.match(tagNumStartCounter)
            ) {
                eolSlicesCounter += 1;
            }
        });

        if (eolSlices.length === eolSlicesCounter) {
            isTagExists = true;
        }

        if (isSomeSelected) {
            if (isTagExists) {
                const sliceArr = outerSlice.split('\n');
                let counter: number = 0;

                const val = sliceArr.map((s: string) => {
                    if (
                        s !== '' &&
                        s.match(tagNumStartCounter)
                    ) {
                        counter += 1;
                        return s.replace(tagNumStartCounter, '');
                    }

                    return s;
                }).join('\n');

                const slice = [sStart - tStart.length, sEnd];
                const isTagInside = outerSlice.slice(0, tStart.length) !== tStart;
                const focus = [
                    isTagInside ? sStart : sStart - tStart.length,
                    sEnd - counter * tStart.length - counter * space.length,
                ];

                super.insertTextInto(val, slice, focus);
            } else {
                let counter: number = 0;

                const preSlice = taV.slice(sStart - tagOffset, sStart).split('').reverse();
                const preCount = (function () {
                    let offset = tagOffset;

                    for (let i = 0; preSlice.length; i += 1) {
                        if (preSlice[i] === EOL) {
                            offset -= 1;
                        } else {
                            break;
                        }
                    }

                    return offset;
                }());

                const prefix = EOL.repeat(preCount);

                const postSlice = taV.slice(sEnd, sEnd + tagOffset).split('');
                const postCount = (function () {
                    let offset = tagOffset;

                    for (let i = 0; postSlice.length; i += 1) {
                        if (postSlice[i] === EOL) {
                            offset -= 1;
                        } else {
                            break;
                        }
                    }

                    return offset;
                }());

                const postfix = EOL.repeat(postCount);

                const val = normalSlice
                    .split('\n')
                    .map((word) => {
                        if (word !== '') {
                            counter += 1;
                            return tStart.replace('$', String(counter)) + space + word;
                        }

                        return word;
                    })
                    .join('\n')
                ;

                const focusLastOffset = (tStart[0].length + space.length) * counter;

                const value = prefix + val + postfix;
                const slice = [sStart, sEnd];
                const focus = [
                    sStart + prefix.length,
                    sEnd + postfix.length + focusLastOffset + counter,
                ];

                super.insertTextInto(value, slice, focus);
            }
        } else {
            const preSlice = taV.slice(sStart - tagOffset, sStart).split('').reverse();
            const preCount = (function () {
                let offset = tagOffset;

                for (let i = 0; preSlice.length; i += 1) {
                    if (preSlice[i] === EOL) {
                        offset -= 1;
                    } else {
                        break;
                    }
                }

                return offset;
            }());

            const prefix = EOL.repeat(preCount);

            const postSlice = taV.slice(sEnd, sEnd + tagOffset).split('');
            const postCount = (function () {
                let offset = tagOffset;

                for (let i = 0; postSlice.length; i += 1) {
                    if (postSlice[i] === EOL) {
                        offset -= 1;
                    } else {
                        break;
                    }
                }

                return offset;
            }());

            const postfix = EOL.repeat(postCount);
            const tStartNormalized = tStart.replace('$', '1');
            const val = prefix + tStartNormalized + space + buttonTitle + postfix;
            const slice = [sStart, sEnd];
            const focus = [
                sStart + prefix.length + tStart.length + space.length,
                sStart + prefix.length + tStart.length + space.length + buttonTitle.length,
            ];

            super.insertTextInto(val, slice, focus);
        }
    }

    private click(e: MouseEvent): void {
        e.preventDefault();
        this.insertTagInto();
    }

    public init(): void {
        const { control, hotkey } = this.settings;

        this.settings.hotkeyCurrent = super.getCurrentHotkey(hotkey);
        this.button = super.generateElement(control, this.settings.hotkeyCurrent);
        this.container.appendChild(this.button);

        this.handle();
    }
}

export default OrderedList;
