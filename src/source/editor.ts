import EditorControls from './controls/index';
import EditorParams from './params/index';
import EditorSettings from './settings';
import EditorUtils from './utils';

import { EditorInterface, EditorSettingsInterface } from './editorInterface';

class Editor implements EditorInterface {
    element: Element;
    settings: EditorSettingsInterface;

    private container: null | Element;
    private controls: null | Element;
    private params: null | Element;
    private area: null | Element;

    constructor(element: Element, settings: EditorSettingsInterface) {
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
        const layout = Object.assign(
            EditorSettings.defaultLayout,
            this.settings.layout || []
        );

        Object.keys(this.settings.classes).forEach((c) => {
            classes[c].push(this.settings.classes[c].join(' '));
        });

        this.settings = { theme, params, controls, classes, layout };
    }

    private makeLayout(): void {
        const { element, settings } = this;
        const { layout, classes } = settings;
        const { createElement } = EditorUtils;
        const clone = element.cloneNode(true);

        this.container = EditorUtils.createElement('section', [
            ...this.settings.classes.container,
            this.settings.theme,
        ]);

        this.element.parentElement.insertBefore(this.container, this.element);
        this.element.parentElement.removeChild(this.element);
        this.element = <Element>clone;
        this.element.classList.add(`${classes.area}--text`);

        layout.forEach((layoutItem) => {
            this[layoutItem] = createElement('div', [...classes[layoutItem]]);
            this.container.appendChild(this[layoutItem]);
        });

        if (this.area) {
            this.area.appendChild(this.element);
        }
    }

    private makeControls(): void {
        const { capitalize, log } = EditorUtils;
        const { notExists } = EditorSettings.defaultWarnings.controls;
        const { element, controls: container, settings } = this;
        const { controls: settingsControls } = settings;

        if (!settingsControls.length || !this.controls) return;

        settingsControls.forEach((settings) => {
            if (settings.type === 'separator') {
                new EditorControls.Separator(
                    element,
                    container,
                    settings
                ).init();
            } else if (settings.type === 'button') {
                const callee = capitalize(settings.button);

                if (
                    EditorControls[callee] &&
                    EditorControls[callee] instanceof Function
                ) {
                    new EditorControls[callee](
                        element,
                        container,
                        settings
                    ).init();
                } else {
                    log(notExists, 'warn', [`"${callee}"`]);
                }
            }
        });
    }

    private makeParams(): void {
        const { capitalize } = EditorUtils;
        const { element, params: container, settings } = this;
        const { params } = settings;
        const paramsTypes = Object.keys(params);

        if (!paramsTypes.length || !this.params) return;

        paramsTypes.forEach((type) => {
            const key = capitalize(type);
            const settings = {
                [type]: params[type],
            };

            if (EditorParams[key] && EditorParams[key] instanceof Function) {
                new EditorParams[key](element, container, settings).init();
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
