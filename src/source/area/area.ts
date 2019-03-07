import marked from 'marked';

import EditorUtils from '../utils/utils';
import EditorSettings from '../settings';

import {
    EditorSettings as EditorSettingsInterface,
    EditorControlsBinder,
    EditorSelection,
    EditorAreaInterface,
} from '../types';

class EditorArea implements EditorAreaInterface {
    container: Element;
    element: HTMLTextAreaElement;
    settings: EditorSettingsInterface;
    areaContainer: HTMLElement;
    previewContainer: HTMLElement;
    controller: Element;
    // elementKeyPress: () => {};
    fullscreenEnabled: boolean;
    previewEnabled: boolean;
    private static handlerList: EditorControlsBinder[] = [];
    private static insertCommand: string = 'insertText';
    private static endOfLine = '\n';

    private static areaParams = {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        spellcheck: 'false',
    };

    private static elementHandlers = ['keydown', 'paste'];

    constructor(
        controller: Element,
        container: Element,
        element: HTMLTextAreaElement,
        settings: EditorSettingsInterface,
    ) {
        this.element = element;
        this.container = container;
        this.settings = settings;
        this.controller = controller;

        this.areaContainer = null;
        this.previewContainer = null;
        this.fullscreenEnabled = false;
        this.previewEnabled = false;

        this.elementKeyPress = EditorUtils.debounce(this.elementKeyPress.bind(this), 250);
    }

    private previewOn() {
        const { classes } = this.settings;

        EditorArea.elementHandlers.forEach((handler) => {
            this.element.addEventListener(handler, this.elementKeyPress);
        });

        this.elementKeyPress();

        this.previewContainer.classList.add(`${classes.area}--preview__active`);
    }

    private previewOff() {
        const { classes } = this.settings;

        EditorArea.elementHandlers.forEach((handler) => {
            this.element.removeEventListener(handler, this.elementKeyPress);
        });

        this.previewContainer.classList.remove(`${classes.area}--preview__active`);
        this.previewContainer.innerHTML = '';
    }

    private elementKeyPress() {
        this.previewContainer.innerHTML = this.html;
    }

    public get html() {
        return marked(this.text);
    }

    public get text() {
        return this.element.value;
    }

    public set text(str: string) {
        this.element.value = str;
    }

    public get areaElement() {
        return this.element;
    }

    public get enabledFullscreen(): boolean {
        return this.fullscreenEnabled;
    }

    public set enabledFullscreen(status: boolean) {
        const [controllerPrefixClassname] = EditorSettings.defaultClasses.container;
        const controllerClassname = `${controllerPrefixClassname}-mode-fullscreen`;

        this.fullscreenEnabled = status;

        if (this.fullscreenEnabled) {
            this.controller.classList.add(controllerClassname);
        } else {
            this.controller.classList.remove(controllerClassname);
        }
    }

    public get enabledPreview(): boolean {
        return this.previewEnabled;
    }

    public set enabledPreview(status: boolean) {
        this.previewEnabled = status;

        if (this.previewEnabled) {
            this.previewOn();
        } else {
            this.previewOff();
        }
    }

    public get selection(): EditorSelection {
        const {
            selectionStart: start,
            selectionEnd: end,
            value,
        } = this.element;

        return {
            value,
            slice: {
                start,
                end,
            },
            selectedValue: value.slice(start, end),
        };
    }

    public set selection(selection: EditorSelection) {
        const {
            focus,
            slice,
            value,
        } = selection;

        this.element.focus();
        this.element.setSelectionRange(slice.start, slice.end);

        if (
            document.queryCommandEnabled(EditorArea.insertCommand) &&
            document.queryCommandSupported(EditorArea.insertCommand)
        ) {
            document.execCommand(EditorArea.insertCommand, false, value);
        } else {
            const { value: val } = this.element;

            this.element.value = val.slice(0, slice.start) + value + val.slice(slice.end);
        }

        this.element.setSelectionRange(focus.start, focus.end);
    }

    public hasEndOfLine(): boolean {
        const { slice, value } = this.selection;

        return value.slice(slice.start, slice.end).includes(EditorArea.endOfLine);
    }

    public addHandler(binder: EditorControlsBinder): void {
        EditorArea.handlerList.push(binder);
    }

    public init(): EditorArea {
        const areaClassname = this.settings.classes.area[0];
        const { createElement } = EditorUtils;
        const clone = this.element.cloneNode(true);
        const textareaParamsKeys = Object.keys(EditorArea.areaParams);

        this.areaContainer = createElement('div', [`${areaClassname}--text`]);
        this.previewContainer = createElement('div', [`${areaClassname}--preview`]);

        this.element.parentElement.removeChild(this.element);
        this.element = <HTMLTextAreaElement>clone;
        this.element.classList.add(`${areaClassname}--text__element`);

        textareaParamsKeys.forEach((k) => {
            this.element.setAttribute(k, EditorArea.areaParams[k]);
        });

        this.areaContainer.appendChild(this.element);

        this.container.appendChild(this.areaContainer);
        this.container.appendChild(this.previewContainer);

        this.element.addEventListener('keydown', (e) => {
            if (window.document.activeElement === this.element) {
                EditorArea.handlerList.forEach((handler) => {
                    const { settings } = handler;

                    if (
                        settings.hotkeyCurrent &&
                        e[settings.hotkeyCurrent.modificator] &&
                        e.key === settings.hotkeyCurrent.key
                    ) {
                        e.preventDefault();
                        handler.callback();

                        return;
                    }
                });
            }
        });

        return this;
    }
}

export default EditorArea;
