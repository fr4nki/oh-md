import EditorControl from './control';
import EditorUtils from '../utils/utils';

import {
    EditorControlsSettingsInterface,
    EditorControlsBinderInterface,
} from './controlInterface';

class Heading extends EditorControl {
    private static mdTag = ['#', null];
    private static mdTagMaxLength = 6;

    protected textarea: HTMLTextAreaElement;
    private container: Element;
    private settings: EditorControlsSettingsInterface;
    private button: Element;

    constructor(
        textarea: HTMLTextAreaElement,
        container: Element,
        settings: EditorControlsSettingsInterface
    ) {
        super(textarea);

        this.button = undefined;
        this.textarea = textarea;
        this.container = container;
        this.settings = settings || {};
    }

    private getNextQuantity (qty: number) {
        const qtyToIncrement = 1;

        if (qty + qtyToIncrement <= Heading.mdTagMaxLength) {
            return qty + qtyToIncrement;
        }

        return qtyToIncrement;
    }

    private setTagPrefix(slice: string, qty: number) {
        const prefix = slice.slice(0, qty);
        const qtyToIncrement = 1;

        if (prefix.length + qtyToIncrement <= Heading.mdTagMaxLength) {
            return (Heading.mdTag[0]).repeat(prefix.length + qtyToIncrement) + slice.slice(qty);
        }

        return Heading.mdTag[0] + slice.slice(qty);
    }

    private getTagsQuantity(slice: string) {
        let counter = 0;
        const space = ' ';
        const sliceArray = slice.split('');

        for (let i = 0; sliceArray.length > i; i += 1) {
            if (sliceArray[i] === Heading.mdTag[0]) {
                counter += 1;
            } else {
                break;
            }
        }

        if (slice[counter] === space) {
            return counter;
        }

        return 0;
    }

    private getPrefixQty(start: number, end: number) {
        const tStart = Heading.mdTag[0];
        const space = ' ';
        const st = start - space.length;
        let counter = 0;

        for (let i = 0; start > i; i += 1) {
            const sl = this.textarea.value.slice(st - i, st).split('');

            if (sl.length) {
                if (sl.every(s => s === tStart)) {
                    counter += 1;
                } else {
                    break;
                }
            }
        }

        return counter;
    }

    private insertTagInto() {
        const {
            selectionStart: sStart,
            selectionEnd: sEnd,
            value: taV
        } = this.textarea;

        const space = ' ';
        const EOL = '\n';
        const tStart = Heading.mdTag[0];
        const buttonTitle = EditorUtils.capitalize(this.settings.control.split('_').join(''));

        const isSomeSelected = sEnd - sStart;
        const normalSlice = taV.slice(sStart, sEnd);
        const isInside = normalSlice.startsWith(tStart);
        const outerStartSlice = taV.slice(sStart - space.length - tStart.length, sEnd);
        const isOutside = outerStartSlice.startsWith(tStart);

        if (isSomeSelected) {
            if (isInside) {
                const tagsQuantity = this.getTagsQuantity(normalSlice);
                const nextQty = this.getNextQuantity(tagsQuantity);

                const value = this.setTagPrefix(normalSlice, tagsQuantity);
                const slice = [sStart, sEnd];
                const focus = [sStart + nextQty + space.length, sEnd - tagsQuantity + nextQty];

                super.insertTextInto(value, slice, focus);
                return;
            }

            if (isOutside) {
                const qty = this.getPrefixQty(sStart, sEnd);
                const nextQty = this.getNextQuantity(qty);
                const fullSlice = taV.slice(sStart - space.length - qty, sEnd);

                const value = this.setTagPrefix(fullSlice, qty);
                const slice = [sStart - space.length - qty, sEnd];
                const focus = [sStart - qty + nextQty, sEnd - qty + nextQty];

                super.insertTextInto(value, slice, focus);
                return;
            }

            const tagOffset = 1;
            const preSlice = taV.slice(sStart - tagOffset, sStart).split('').reverse();
            // const isNeedToInsertPrefixEOL = tStar

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

            const tagPostOffset = 2;
            const postSlice = taV.slice(sEnd, sEnd + tagPostOffset).split('');
            const postCount = (function () {
                let offset = tagPostOffset;

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

            const value = prefix + tStart + space + normalSlice + postfix;
            const slice = [sStart, sEnd];
            const focus = [
                sStart + prefix.length + tStart.length + space.length,
                sStart + prefix.length + tStart.length + space.length + normalSlice.length,
            ];

            super.insertTextInto(value, slice, focus);
        } else {
            const tagOffset = 1;
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

            const tagPostOffset = 2;
            const postSlice = taV.slice(sEnd, sEnd + tagPostOffset).split('');
            const postCount = (function () {
                let offset = tagPostOffset;

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
            const val = prefix + tStart + space + buttonTitle + postfix;
            const slice = [sStart, sEnd];
            const focus = [
                sStart + prefix.length + tStart.length + space.length,
                sStart + prefix.length + tStart.length + space.length + buttonTitle.length,
            ];

            super.insertTextInto(val, slice, focus);
        }
    }

    private handle(): void {
        const { hotkeyCurrent: hotkey } = this.settings;
        const argument: EditorControlsBinderInterface = {
            hotkey,
            callback: this.insertTagInto.bind(this),
        };

        this.addHandler(argument);
        this.button.addEventListener('click', this.click.bind(this));
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

export default Heading;
