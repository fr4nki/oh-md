import EditorUtils from '../utils/utils';
import EditorSettings from '../editor/editorSettings';

import { EditorParamsSettingsInterface } from './paramInterface';

class Wordwrap {
    textarea: HTMLTextAreaElement;
    container: Element;
    settings: EditorParamsSettingsInterface;

    private wordwrapStatus: boolean;
    private element: Element;

    constructor(
        textarea: HTMLTextAreaElement,
        container: Element,
        settings: EditorParamsSettingsInterface,
    ) {
        this.textarea = textarea;
        this.container = container;
        this.settings = settings;

        this.element = null;
        this.wordwrapStatus = null;
    }

    private setWordwrapStatus() {
        const area = EditorSettings.defaultClasses.area[0];
        const params = EditorSettings.defaultClasses.params[0];
        const wordwrapAreaClassname = `${area}--text--wordwrap__off`;
        const wordwrapParamsClassname = `${params}--wordwrap__off`;

        this.wordwrapStatus = !this.wordwrapStatus;

        if (!this.wordwrapStatus) {
            this.textarea.classList.remove(wordwrapAreaClassname);
            this.element.classList.remove(wordwrapParamsClassname);
        } else {
            this.textarea.classList.add(wordwrapAreaClassname);
            this.element.classList.add(wordwrapParamsClassname);
        }
    }

    public init() {
        const { createElement } = EditorUtils;
        const params = EditorSettings.defaultClasses.params[0];
        const { paramVisible, active } = this.settings.wordwrap;

        this.wordwrapStatus = active;

        if (!paramVisible) {
            return;
        }

        this.element = createElement(
            'a',
            [`${params}--wordwrap`],
            {
                title: 'Word wrap',
            }
        );

        this.setWordwrapStatus();

        this.element.addEventListener('click', this.setWordwrapStatus.bind(this));
        this.container.appendChild(this.element);
    }
}

export default Wordwrap;
