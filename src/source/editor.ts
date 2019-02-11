import EditorControls from './control/index';
import EditorParams from './param/index';
import EditorSettings from './settings';
import EditorUtils from './utils';

import {
    EditorInterface,
    EditorSettingsInterface,
} from './editorInterface';

import '../styles/style.scss';

class Editor implements EditorInterface {
    element: HTMLTextAreaElement;
    settings: EditorSettingsInterface;

    private container: null | Element;
    readonly controls: null | Element;
    readonly params: null | Element;
    readonly area: null | Element;

    private static textareaParams = {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        spellcheck: 'false',
    };

    constructor(
        element: HTMLTextAreaElement,
        settings: EditorSettingsInterface
    ) {
        this.settings = settings;
        this.element = element;

        this.container = null;
        this.controls = null;
        this.params = null;
        this.area = null;
    }

    private setSettings(): void {
        const params = Object.assign(
            EditorSettings.defaultParams,
            this.settings.params || {}
        );
        const theme = this.settings.theme || EditorSettings.defaultTheme;
        const controls = this.settings.controls || EditorSettings.defaultControls;
        const classes = EditorSettings.defaultClasses;
        const layout = Object.assign(EditorSettings.defaultLayout, this.settings.layout || []);

        Object.keys(this.settings.classes).forEach((c) => {
            classes[c].push(this.settings.classes[c].join(' '));
        });

        this.settings = { theme, params, controls, classes, layout };
    }

    private makeLayout(): void {
        const { layout, classes } = this.settings;
        const { createElement } = EditorUtils;
        const clone = this.element.cloneNode(true);
        const textareaParamsKeys = Object.keys(Editor.textareaParams);
        const elementContainer = createElement('div', [`${classes.area}--container__text`]);

        this.container = EditorUtils.createElement('section', [
            ...this.settings.classes.container,
            this.settings.theme,
        ]);

        this.element.parentElement.insertBefore(this.container, this.element);
        this.element.parentElement.removeChild(this.element);
        this.element = <HTMLTextAreaElement>clone;
        this.element.classList.add(`${classes.area}--text`);

        textareaParamsKeys.forEach((k) => {
            this.element.setAttribute(k, Editor.textareaParams[k]);
        });

        layout.forEach((layoutItem) => {
            this[layoutItem] = createElement('div', [...classes[layoutItem]]);
            this.container.appendChild(this[layoutItem]);
        });

        elementContainer.appendChild(this.element);
        this.area.appendChild(elementContainer);
    }

    private makeControls(): void {
        const { capitalize, log } = EditorUtils;
        const { notExists } = EditorSettings.defaultWarnings.controls;
        const { controls: settingsControls } = this.settings;

        if (!settingsControls.length || !this.controls) return;

        settingsControls.forEach((settings) => {
            const callee = capitalize(settings.control);

            if (
                EditorControls[callee] &&
                EditorControls[callee] instanceof Function
            ) {
                new EditorControls[callee](
                    this.element,
                    this.controls,
                    settings,
                    this.container,
                ).init();
            } else {
                log(notExists, 'warn', [`"${callee}"`]);
            }
        });

        new EditorControls.Controls(this.element).init();
    }

    private makeParams(): void {
        const { capitalize } = EditorUtils;
        const { params } = this.settings;
        const paramsTypes = Object.keys(params);

        if (!paramsTypes.length || !this.params) return;

        paramsTypes.forEach((type) => {
            const key = capitalize(type);
            const settings = {
                [type]: params[type],
            };

            if (EditorParams[key] && EditorParams[key] instanceof Function) {
                new EditorParams[key](this.element, this.params, settings).init();
            }
        });
    }

    public init(): void {
        this.setSettings();
        this.makeLayout();
        this.makeControls();
        this.makeParams();
    }
}

export default Editor;
