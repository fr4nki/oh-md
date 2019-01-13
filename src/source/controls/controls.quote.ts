import EditorControl from './controls';

import {
    EditorControlsBinderInterface,
    EditorControlsSettingsInterface
} from './controlsInterface';

class Quote extends EditorControl {
    private static mdTag = ['>', ''];

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

        const [tStart] = Quote.mdTag;
        const isSomeSelected = sEnd - sStart;
        const normalSlice = taV.slice(sStart, sEnd);
        const outerSlice = taV.slice(sStart - tStart.length, sEnd);
        const isTagExists = outerSlice.includes(tStart);
        const EOL = '\n';

        if (isSomeSelected) {
            if (isTagExists) {
                let counter: number = 0;

                const val = outerSlice
                    .split('')
                    .map((r) => {
                        if (r === tStart) {
                            counter += 1;
                            return '';
                        }

                        return r;
                    })
                    .join('');

                const slice = [sStart - tStart.length, sEnd];
                const isTagInside = outerSlice.slice(0, tStart.length) !== tStart;
                const focus = [
                    isTagInside ? sStart : sStart - tStart.length,
                    sEnd - counter,
                ];

                super.insertTextInto(val, slice, focus);
            } else {
                let counter: number = 0;

                const sourceVal = outerSlice[0] === tStart
                    ? outerSlice
                    : normalSlice
                ;

                const val = sourceVal
                    .split('\n')
                    .map((word) => {
                        if (word !== '') {
                            counter += 1;
                            return tStart + word;
                        }

                        return word;
                    })
                    .join('\n')
                ;

                super.insertTextInto(val, [sStart, sEnd], [sStart, sEnd + counter]);
            }
        } else {
            const val = EOL + EOL + tStart;
            const slice = [sStart, sEnd];
            const focus = [sStart + EOL.length * 2, sStart + EOL.length * 2];

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
        this.button = super.generateElement(control);
        this.container.appendChild(this.button);

        this.handle();
    }
}

export default Quote;
