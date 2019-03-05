import EditorUtils from '../utils/utils';
import EditorSettings from '../settings';

import {
    EditorControlsSettings,
    EditorAreaInterface,
} from '../types';

class EditorControlSeparator {
    controlContainer: HTMLElement;
    settings: EditorControlsSettings;
    area: EditorAreaInterface;

    constructor(
        controlContainer: HTMLElement,
        settings: EditorControlsSettings,
        area: EditorAreaInterface,
    ) {
        this.controlContainer = controlContainer;
        this.settings = settings || {};
        this.area = area;
    }

    public init(): void {
        const controls = EditorSettings.defaultClasses.controls[0];
        const { createElement } = EditorUtils;
        const element = createElement(
            'div',
            [`${controls}--separator`]
        );

        this.controlContainer.appendChild(element);
    }
}

export default EditorControlSeparator;
