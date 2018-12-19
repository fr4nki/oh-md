import EditorUtils from '../utils';
import EditorSettings from '../settings';

class Bold {
    static mdTag = '**';

    constructor(textarea, container, settings) {
        this.textarea = textarea;
        this.container = container;
        this.settings = settings || {};
    }

    _click(e) {
        e.preventDefault();
        console.log('click');
    }

    _handle() {
        this.button.addEventListener('click', this._click);

        console.log(this.textarea);
        this.textarea.addEventListener('selectionchange', () => {
            console.log(arguments);
            console.log('1111');
        })
    }

    _unhandle() {

    }

    init() {
        const { createElement } = EditorUtils;
        const { controls } = EditorSettings.defaultClasses;
        const { button } = this.settings;

        this.button = createElement(
            'a',
            [`${controls}--button`, `${controls}--button__${button.toLowerCase()}`],
            { href: "#" },
        );

        this.container.appendChild(this.button);
        this._handle();
    }
}

export default Bold;