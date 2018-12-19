import EditorUtils from '../utils';
import EditorSettings from '../settings';

class Separator {
    constructor(textarea, container, settings) {
        this.textarea = textarea;
        this.container = container;
        this.settings = settings || {};
    }

    init() {
        const { controls } = EditorSettings.defaultClasses;
        const { createElement } = EditorUtils;
        const element = createElement(
            'p',
            [`${controls}--separator`]
        );

        this.container.appendChild(element);
    }
}

export default Separator;