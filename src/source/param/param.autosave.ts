import EditorUtils from '../utils/utils';
import EditorSettings from '../settings';

import { EditorAreaInterface, EditorParamsSettingsInterface } from '../types';

class Autosave {
    private area: EditorAreaInterface;
    private container: Element;
    private readonly settings: EditorParamsSettingsInterface;
    private element: Element;
    static separator = '|||||';

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

    private getTextareaHash(): string {
        const { URL: url } = window.document;
        const { id } = this.settings;

        return `${url}${Autosave.separator}${id}`;
    }

    private fillTextArea(): void {
        const hash = this.getTextareaHash();

        this.area.selection = {
            focus: { start: 0, end: 0 },
            slice: { start: 0, end: 0 },
            value: window.localStorage[hash] || '',
        };
    }

    private saveText(): void {
        const params = EditorSettings.defaultClasses.params[0];
        const { value } = this.area.selection;
        const hash = this.getTextareaHash();
        const activeClass = `${params}--autosave__saved`;

        this.element.classList.add(activeClass);
        window.localStorage[hash] = value;

        setTimeout(
            () => {
                this.element.classList.remove(activeClass);
            },
            2000
        );
    }

    public init(): void {
        const { defaultClasses } = EditorSettings;
        const { createElement, log } = EditorUtils;
        const params = defaultClasses.params[0];
        const { autosave } = this.settings;
        const id =
            this.area.areaElement.name ||
            this.area.areaElement.id ||
            null
        ;

        if (!id) {
            log('Id or name is not exists');
        }

        if (!autosave || !id) {
            return;
        }

        this.element = createElement('p', [`${params}--autosave`]);
        this.element.innerHTML = 'Saved';
        this.container.appendChild(this.element);
        this.settings.id = id;

        this.fillTextArea();

        setInterval(
            () => {
                this.saveText();
            },
            autosave * 1000
        );
    }
}

export default Autosave;
