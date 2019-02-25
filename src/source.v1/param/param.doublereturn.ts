import EditorUtils from '../utils/utils';
import EditorSettings from '../editor/editorSettings';

import { EditorParamsSettingsInterface } from './paramInterface';

class DoubleReturn {
    private textarea: HTMLTextAreaElement;
    private element: Element;
    readonly container: Element;
    readonly settings: EditorParamsSettingsInterface;

    constructor(
        textarea: HTMLTextAreaElement,
        container: Element,
        settings: EditorParamsSettingsInterface,
    ) {
        this.element = null;
        this.textarea = textarea;
        this.container = container;
        this.settings = settings;
    }

    private keyHandler(e: KeyboardEvent): void {
        const { modificatorKey } = this.settings.doubleReturn;

        if (e.keyCode === 13) {
            const {
                selectionStart: sStart,
                selectionEnd: sEnd,
                value: taV
            } = this.textarea;

            const EOLcount = e[modificatorKey] ? 1 : 2;
            const EOL = '\n'.repeat(EOLcount);

            e.preventDefault();

            console.log(e);
            if (
                document.queryCommandEnabled('insertText') &&
                document.queryCommandSupported('insertText')
            ) {
                document.execCommand('insertText', false, EOL);

            } else {
                this.textarea.value = taV.slice(0, sStart) + EOL + taV.slice(sEnd);
            }
        }
    }

    private setHandlers(): void {
        document.addEventListener('DOMContentLoaded', () => {
            this.textarea.addEventListener('keydown', this.keyHandler.bind(this));
        });
    }

    public init() {
        const { doubleReturn } = this.settings;

        if (!doubleReturn.active) return;

        this.setHandlers();
    }
}

export default DoubleReturn;
