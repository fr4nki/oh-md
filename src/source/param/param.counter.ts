import EditorUtils from '../utils/utils';
import EditorSettings from '../settings';

import { EditorAreaInterface, EditorParamsSettingsInterface } from '../types';

class Counter {
    private area: EditorAreaInterface;
    private element: Element;
    readonly container: Element;
    readonly settings: EditorParamsSettingsInterface;

    constructor(
        area: EditorAreaInterface,
        container: Element,
        settings: EditorParamsSettingsInterface
    ) {
        this.element = null;
        this.area = area;
        this.container = container;
        this.settings = settings;
    }

    private setHandlers(): void {
        document.addEventListener('DOMContentLoaded', () => {
            this.area.areaElement.addEventListener(
                'input',
                this.counterUpdate.bind(this)
            );
            this.area.areaElement.addEventListener(
                'keyup',
                this.counterUpdate.bind(this)
            );
            this.counterUpdate();
        });
    }

    private counterUpdate(): void {
        window.setTimeout(
            () => {
                this.element.innerHTML = String(this.area.text.length);
            },
            0
        );
    }

    public init() {
        const params = EditorSettings.defaultClasses.params[0];
        const { counter } = this.settings;

        if (!counter) return;

        this.element = EditorUtils.createElement('p', [`${params}--counter`]);
        this.container.appendChild(this.element);

        this.setHandlers();
    }
}

export default Counter;
