import EditorControl from './control';
import EditorButton from '../button/button';
import EditorSettings from '../settings';

import {
    EditorControlsBinder,
    EditorControlsSettings,
    EditorAreaInterface,
} from '../types';

class EditorControlPreview extends EditorControl {
    controlContainer: HTMLElement;
    settings: EditorControlsSettings;
    area: EditorAreaInterface;

    button: HTMLElement;

    constructor(
        controlContainer: HTMLElement,
        settings: EditorControlsSettings,
        area: EditorAreaInterface,
    ) {
        super(area);

        this.controlContainer = controlContainer;
        this.settings = settings;
        this.area = area;

        this.button = null;
    }

    private togglePreview() {
        const [controlClassname] = EditorSettings.defaultClasses.controls;
        const buttonClassname = `${controlClassname}--button__preview__active`;
        const { enabledPreview } = this.area;

        // TODO: NEED TO IMPLEMENT!
        if (!enabledPreview) {
            this.button.classList.add(buttonClassname);
            this.area.enabledPreview = true;
        } else {
            this.button.classList.remove(buttonClassname);
            this.area.enabledPreview = false;
        }
    }

    public init(): void {
        const handler: EditorControlsBinder = {
            settings: this.settings,
            callback: this.togglePreview.bind(this),
        };

        this.button = new EditorButton(handler).init();
        this.area.addHandler(handler);

        this.controlContainer.appendChild(this.button);
    }
}

export default EditorControlPreview;
