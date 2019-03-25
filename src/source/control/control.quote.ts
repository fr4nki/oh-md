import EditorControl from './control';
import EditorButton from '../button/button';
import EditorUtils from '../utils/utils';

import {
    EditorControlsBinder,
    EditorControlsSettings,
    EditorAreaInterface,
} from '../types';

class EditorControlQuote extends EditorControl {
    private static mdTag = ['>', null];

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

    private insertTagInto() {
        if (!this.area.disabled) {
            const {
                value: taV,
                slice,
                selectedValue,
            } = this.area.selection;
            const { start: sStart, end: sEnd } = slice;
            const { capitalize } = EditorUtils;
            const [tStart] = EditorControlQuote.mdTag;
            const isSomeSelected = selectedValue.length;
            const normalSlice = taV.slice(sStart, sEnd);
            const outerSlice = taV.slice(sStart - tStart.length, sEnd);
            const isTagExists = outerSlice.includes(tStart);
            const buttonTitle = capitalize(this.settings.control.split('_').join(''));
            const EOL = '\n';
            const tagOffset = 2;
            const space = ' ';

            if (isSomeSelected) {
                if (isTagExists) {
                    let counter: number = 0;

                    outerSlice
                        .split('')
                        .forEach((r, num) => {
                            if (r === tStart && outerSlice[num + 1] === space) {
                                counter += 1;
                            }
                        });

                    const r = new RegExp(/> /g);

                    const isTagInside = outerSlice.slice(0, tStart.length) !== tStart;

                    const value = outerSlice.replace(r, '');

                    const slice = {
                        start: sStart - tStart.length,
                        end: sEnd
                    };

                    const focus = {
                        start: isTagInside ? sStart : sStart - tStart.length,
                        end: sEnd - counter * tStart.length - counter * space.length,
                    };

                    this.area.selection = { value, slice, focus };
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
                                return tStart + space + word;
                            }

                            return word;
                        })
                        .join('\n')
                    ;

                    const value = prefix + val + postfix;

                    const slice = {
                        start: sStart,
                        end: sEnd,
                    };

                    const focus = {
                        start: sStart + prefix.length,
                        end: sEnd + postfix.length + counter + counter * space.length,
                    };

                    this.area.selection = { value, slice, focus };
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

export default EditorControlQuote;
