import DefaultSettings from '../settings';
import EditorUtils from '../utils/utils';
import EditorControls from '../control/index';
import EditorParams from '../param/index';
import EditorArea from '../area/area';

import {
    EditorSettings as EditorSettingsInterface,
    EditorLayout,
    EditorControlsSettings,
} from '../types';

class EditorController {
    public element: HTMLTextAreaElement;
    public settings: EditorSettingsInterface;
    public input: EditorArea;
    public layout: EditorLayout;

    private container: null | Element;

    constructor(
        element: HTMLTextAreaElement,
        settings: EditorSettingsInterface,
    ) {
        this.element = element;
        this.settings = settings;

        this.container = null;
        this.input = null;
        this.layout = {
            area: null,
            controls: null,
            params: null,
        };
    }

    private collectSettings(): void {
        const params = Object.assign(
            DefaultSettings.defaultParams,
            this.settings.params || {}
        );

        const os = EditorUtils.detectOs();

        const theme = this.settings.theme || DefaultSettings.defaultTheme;
        const controls = this.settings.controls || DefaultSettings.defaultControls;
        const classes = DefaultSettings.defaultClasses;
        const layout = Object.assign(DefaultSettings.defaultLayout, this.settings.layout || []);

        Object.keys(this.settings.classes).forEach((c) => {
            classes[c].push(this.settings.classes[c].join(' '));
        });

        controls.forEach((control: EditorControlsSettings) => {
            if (control.hotkey) {
                control.hotkeyCurrent = control.hotkey[os];
            }
        });

        this.settings = { theme, params, controls, classes, layout };
    }

    private generateLayout(): void {
        const { layout, classes } = this.settings;
        const { createElement } = EditorUtils;

        this.container = EditorUtils.createElement(
            'section',
            this.settings.classes.container,
        );

        layout.forEach((layoutItem) => {
            this.layout[layoutItem] = createElement('div', [...classes[layoutItem]]);
            this.container.appendChild(this.layout[layoutItem]);
        });

        this.element.parentElement.insertBefore(this.container, this.element);
    }

    private generateInput(): void {
        this.input = new EditorArea(
            this.container,
            this.layout.area,
            this.element,
            this.settings,
        ).init();

        this.element = this.input.areaElement;
    }

    private generateControls(): void {
        const { capitalize } = EditorUtils;
        const { controls: settingsControls } = this.settings;

        if (!settingsControls.length || !this.layout.controls) return;

        settingsControls.forEach((settings) => {
            const callee = capitalize(settings.control);

            if (
                EditorControls[callee] &&
                EditorControls[callee] instanceof Function
            ) {
                new EditorControls[callee](
                    this.layout.controls,
                    settings,
                    this.input,
                ).init();
            } else {
                console.log('Button is not exists:', callee);
            }
        });
    }

    private generateParams(): void {
        const { capitalize } = EditorUtils;
        const { params } = this.settings;
        const paramsTypes = Object.keys(params);

        if (!paramsTypes.length || !this.layout.params) return;

        paramsTypes.forEach((type) => {
            const key = capitalize(type);
            const settings = {
                [type]: params[type],
            };

            if (EditorParams[key] && EditorParams[key] instanceof Function) {
                new EditorParams[key](this.element, this.layout.params, settings).init();
            }
        });
    }

    public get html(): string {
        return this.input.html;
    }

    public get text(): string {
        return this.input.text;
    }

    public set text(text: string) {
        this.input.text = text;
    }

    public init(): EditorController {
        this.collectSettings();
        this.generateLayout();
        this.generateInput();
        this.generateParams();
        this.generateControls();

        return this;
    }

}

export default EditorController;
