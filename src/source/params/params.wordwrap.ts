import EditorUtils from '../utils';
import EditorSettings from '../settings';

import { EditorParamsSettingsInterface } from './paramsInterface';

class Wordwrap {
    textarea: HTMLTextAreaElement;
    element: Element;
    container: Element;
    settings: EditorParamsSettingsInterface;

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

    init() {
        // const { createElement } = EditorUtils;
        // const { params } = defaultClasses;

        // this.element = createElement('a', [`${params}--wordwrap`]);
    }
}

export default Wordwrap;
