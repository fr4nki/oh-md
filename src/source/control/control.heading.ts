import EditorControl from './control';
import EditorButton from '../button/button';
import EditorUtils from '../utils/utils';

import {
    EditorControlsBinder,
    EditorControlsSettings,
    EditorAreaInterface,
} from '../types';

class EditorControlHeading extends EditorControl {
    private static mdTag = ['#', null];
    private static mdTagMaxLength = 6;

    controlContainer: HTMLElement;
    settings: EditorControlsSettings;
    area: EditorAreaInterface;

    button: HTMLElement;

    constructor(
        controlContainer: HTMLElement,
        settings: EditorControlsSettings,
        area: EditorAreaInterface,
    ) {
        super(area);

        this.controlContainer = controlContainer;
        this.settings = settings;
        this.area = area;

        this.button = null;
    }

    private getNextQuantity (qty: number) {
        const qtyToIncrement = 1;

        if (qty + qtyToIncrement <= EditorControlHeading.mdTagMaxLength) {
            return qty + qtyToIncrement;
        }

        return qtyToIncrement;
    }

    private setTagPrefix(slice: string, qty: number) {
        const prefix = slice.slice(0, qty);
        const qtyToIncrement = 1;

        if (prefix.length + qtyToIncrement <= EditorControlHeading.mdTagMaxLength) {
            return (EditorControlHeading.mdTag[0])
                .repeat(prefix.length + qtyToIncrement) + slice.slice(qty);
        }

        return EditorControlHeading.mdTag[0] + slice.slice(qty);
    }

    private getTagsQuantity(slice: string) {
        let counter = 0;
        const space = ' ';
        const sliceArray = slice.split('');

        for (let i = 0; sliceArray.length > i; i += 1) {
            if (sliceArray[i] === EditorControlHeading.mdTag[0]) {
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
        const tStart = EditorControlHeading.mdTag[0];
        const space = ' ';
        const st = start - space.length;
        let counter = 0;
        const { value } = this.area.selection;

        for (let i = 0; start > i; i += 1) {
            const sl = value.slice(st - i, st).split('');

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
            value: taV,
            slice,
            selectedValue,
        } = this.area.selection;
        const { start: sStart, end: sEnd } = slice;

        const space = ' ';
        const EOL = '\n';
        const tStart = EditorControlHeading.mdTag[0];
        const buttonTitle = EditorUtils.capitalize(this.settings.control.split('_').join(''));

        const isSomeSelected = selectedValue.length;
        const normalSlice = selectedValue;
        const isInside = normalSlice.startsWith(tStart);
        const outerStartSlice = taV.slice(sStart - space.length - tStart.length, sEnd);
        const isOutside = outerStartSlice.startsWith(tStart);

        if (isSomeSelected) {
            if (isInside) {
                const tagsQuantity = this.getTagsQuantity(normalSlice);
                const nextQty = this.getNextQuantity(tagsQuantity);

                const value = this.setTagPrefix(normalSlice, tagsQuantity);

                const slice = {
                    start: sStart,
                    end: sEnd,
                };
                const focus = {
                    start: sStart + nextQty + space.length,
                    end: sEnd - tagsQuantity + nextQty,
                };

                this.area.selection = { value, slice, focus };
                return;
            }

            if (isOutside) {
                const qty = this.getPrefixQty(sStart, sEnd);
                const nextQty = this.getNextQuantity(qty);
                const fullSlice = taV.slice(sStart - space.length - qty, sEnd);

                const value = this.setTagPrefix(fullSlice, qty);

                const slice = {
                    start: sStart - space.length - qty,
                    end: sEnd,
                };

                const focus = {
                    start: sStart - qty + nextQty,
                    end: sEnd - qty + nextQty,
                };

                this.area.selection = { value, slice, focus };
                return;
            }

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

            const value = prefix + tStart + space + normalSlice + postfix;

            const slice = {
                start: sStart,
                end: sEnd
            };

            const focus = {
                start: sStart + prefix.length + tStart.length + space.length,
                end: sStart + prefix.length + tStart.length + space.length + normalSlice.length,
            };

            this.area.selection = { value, slice, focus };
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
            const value = prefix + tStart + space + buttonTitle + postfix;

            const slice = {
                start: sStart,
                end: sEnd
            };

            const focus = {
                start: sStart + prefix.length + tStart.length + space.length,
                end: sStart + prefix.length + tStart.length + space.length + buttonTitle.length,
            };

            this.area.selection = { value, slice, focus };
        }
    }

    public init(): void {
        const handler: EditorControlsBinder = {
            settings: this.settings,
            callback: this.insertTagInto.bind(this),
        };

        this.button = new EditorButton(handler).init();
        this.area.addHandler(handler);

        this.controlContainer.appendChild(this.button);
    }
}

export default EditorControlHeading;
