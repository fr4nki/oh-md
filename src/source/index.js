// import EditorButtons from './buttons/index';
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
        const buttons = this.settings.buttons || EditorSettings.defaultButtons;
        const classes = EditorSettings.defaultClasses;

        Object.keys(this.settings.classes).forEach(c => {
            classes[c].push(this.settings.classes[c].join(' '))
        });

        this.settings = { theme, params, buttons, classes };
    }

    _makeLayout() {
        const clone = this.element.cloneNode(true);
        const area = EditorUtils.createElement(
            'div',
            [...this.settings.classes.area]
        );

        this.container = EditorUtils.createElement(
            'section',
            [...this.settings.classes.container, this.settings.theme]
        );

        this.container.appendChild(clone);

        this.element.parentElement.insertBefore(this.container, this.element);
        this.element.parentElement.removeChild(this.element);
        this.element = clone
        area.appendChild(this.element);
        this.container.appendChild(area);
    }

    _makeButtons() {
        this.controls = EditorUtils.createElement(
            'div',
            [...this.settings.classes.controls]
        );

        this.container.insertBefore(this.controls, this.element.parentElement);
    }

    _makeParams() {
        const { capitalize, createElement } = EditorUtils;
        const { params } = this.settings;
        const paramsTypes = Object.keys(params);

        if (!paramsTypes.length) return;

        this.params = createElement(
            'div',
            [...this.settings.classes.params]
        );
        this.container.appendChild(this.params);

        paramsTypes.forEach((t) => {
            const { element, params: container } = this;
            const key = capitalize(t);
            const settings = {
                [t]: params[t],
            };

            const args = [
                element,
                container,
                settings,
            ];

            new EditorParams[key](...args).init();
        })
    }

    init() {
        this._setSettings();
        this._makeLayout();
        this._makeParams();
        this._makeButtons();
    }
}