import { EditorParamsSettingsInterface } from './paramInterface';

class DoubleReturn {
    readonly textarea: HTMLTextAreaElement;
    readonly container: Element;
    readonly settings: EditorParamsSettingsInterface;

    constructor(
        textarea: HTMLTextAreaElement,
        container: Element,
        settings: EditorParamsSettingsInterface,
    ) {
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

            const EOL_COUNT = e[modificatorKey] ? 1 : 2;
            const EOL = '\n'.repeat(EOL_COUNT);

            e.preventDefault();

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
