import { EditorInputInterface } from './inputInterface';

import EditorUtils from '../utils/utils';

import {
    EditorControllerInterface,
    EditorSettingsInterface,
} from '../editor/editorInterface';

class EditorInput implements EditorInputInterface {
    element: HTMLTextAreaElement;
    settings: EditorSettingsInterface;

    private container: null | Element;

    private static EditorInputParams = {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        spellcheck: 'false',
    };

    constructor(
        input: HTMLTextAreaElement,
        settings: EditorSettingsInterface,
    ) {
        this.element = input;

        this.container = null;
    }

    public get text(): string {
        return '';
    }

    public set text(text: string) {
        this.element.value = text;
    }

    public get focus(): number[] {
        return [0, 0];
    }

    public set focus(range: number[]) {
        console.log(range);
    }

    public init(): EditorInput {
        const { layout, classes } = this.settings;
        const { createElement } = EditorUtils;
        const clone = this.element.cloneNode(true);
        const textareaParamsKeys = Object.keys(EditorInput.EditorInputParams);
        const elementContainer = createElement('div', [`${classes.area}--container__text`]);



        this.element.parentElement.insertBefore(this.container, this.element);
        this.element.parentElement.removeChild(this.element);
        this.element = <HTMLTextAreaElement>clone;
        this.element.classList.add(`${classes.area}--text`);

        textareaParamsKeys.forEach((k) => {
            this.element.setAttribute(k, EditorController.textareaParams[k]);
        });

        layout.forEach((layoutItem) => {
            this[layoutItem] = createElement('div', [...classes[layoutItem]]);
            this.container.appendChild(this[layoutItem]);
        });

        elementContainer.appendChild(this.element);
        this.area.appendChild(elementContainer);

        return this;
    }
}

export default EditorInput;
