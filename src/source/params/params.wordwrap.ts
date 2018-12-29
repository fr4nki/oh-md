import EditorUtils from '../utils';
import EditorSettings from '../settings';

import { EditorParamsSettingsInterface } from './paramsInterface';

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
        const { wordwrapStatus, textarea } = this
        const { params } = EditorSettings.defaultClasses;
        const wordwrapClassname = `${params}--wordwrap__off`

        this.wordwrapStatus = !wordwrapStatus

        if (!wordwrapStatus) {
            textarea.classList.add(wordwrapClassname);
        } else {
            textarea.classList.remove(wordwrapClassname);
        }
    }

    public init() {
        const { createElement } = EditorUtils;
        const { params } = EditorSettings.defaultClasses;
        const { paramVisible, active } = this.settings.wordwrap;

        this.wordwrapStatus = active;
        this.setWordwrapStatus();

        if (!paramVisible) {
            return;
        }

        this.element = createElement(
            'a',
            [`${params}--wordwrap`]
        );

        this.element.addEventListener('click', this.setWordwrapStatus.bind(this));
        this.container.appendChild(this.element);
    }
}

export default Wordwrap;
