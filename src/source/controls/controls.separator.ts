import EditorUtils from '../utils';
import EditorSettings from '../settings';

class Separator {
    textarea: Element;
    container: Element;
    settings: object;

    constructor(textarea: Element, container: Element, settings: object) {
        this.textarea = textarea;
        this.container = container;
        this.settings = settings || {};
    }

    public init(): void {
        const controls = EditorSettings.defaultClasses.controls[0];
        const { createElement } = EditorUtils;
        const element = createElement(
            'p',
            [`${controls[0]}--separator`]
        );

        this.container.appendChild(element);
    }
}

export default Separator;
