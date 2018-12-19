import EditorControls from './controls/index';
import EditorParams from './params/index';
import EditorSettings from './settings';
import EditorUtils from './utils';

export default class Editor {
    constructor(element, settings) {
        this.element = element;
        this.container = null;
        this.controls = null;
        this.params = null;
        this.autosaveBlock = null;
        this.counterBlock = null;
        this.settings = settings || {};
    }

    _setSettings() {
        const params = Object.assign(EditorSettings.defaultParams, this.settings.params || {});
        const theme = this.settings.theme || EditorSettings.defaultTheme;
        const controls = this.settings.controls || EditorSettings.defaultControls;
        const classes = EditorSettings.defaultClasses;
        const layout = Object.assign(EditorSettings.defaultLayout, this.settings.layout || []);

        Object.keys(this.settings.classes).forEach(c => {
            classes[c].push(this.settings.classes[c].join(' '))
        });

        this.settings = { theme, params, controls, classes, layout };
    }

    _makeLayout() {
        const { element, settings } = this;
        const { layout, classes } = settings;
        const { createElement } = EditorUtils;
        const clone = element.cloneNode(true);

        this.container = EditorUtils.createElement(
            'section',
            [...this.settings.classes.container, this.settings.theme]
        );

        this.element.parentElement.insertBefore(this.container, this.element);
        this.element.parentElement.removeChild(this.element);
        this.element = clone
        this.element.classList.add(`${classes.area}--text`)

        layout.forEach((layoutItem) => {
            this[layoutItem] = createElement(
                'div',
                [...classes[layoutItem]],
            );

            this.container.appendChild(this[layoutItem]);
        });

        if (this.area) {
            this.area.appendChild(this.element);
        }
    }

    _makeControls() {
        const { capitalize, log } = EditorUtils;
        const { notExists } = EditorSettings.defaultWarnings.controls.buttons;
        const { element, controls: container, settings } = this;
        const { controls: settingsControls } = settings;

        if (!settingsControls.length || !this.controls) return;

        settingsControls.forEach((control) => {
            const settings = control;

            const args = [
                element,
                container,
                settings,
            ];

            if (control.type === 'separator') {
                new EditorControls.Separator(...args).init();
            } else
            if (control.type === 'button') {
                const callee = capitalize(control.button);

                if (
                    EditorControls[callee] &&
                    EditorControls[callee] instanceof Function
                ) {
                    new EditorControls[callee](...args).init();
                } else {
                    log(notExists, 'warn', [`"${callee}"`]);
                }
            }
        })
    }

    _makeParams() {
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

            const args = [
                element,
                container,
                settings,
            ];

            if (
                EditorParams[key] &&
                EditorParams[key] instanceof Function
            ) {
                new EditorParams[key](...args).init();
            }
        })
    }

    init() {
        this._setSettings();
        this._makeLayout();
        this._makeControls();
        this._makeParams();
    }
}