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
        const { enabledPreview} = this.area;
        const [controlClassname] = EditorSettings.defaultClasses.controls;
        const buttonClassname = [
            `${controlClassname}--button__preview__active`,
            `${controlClassname}--button__active`
        ];

        if (!enabledPreview) {
            buttonClassname.forEach((cl) => {
                this.button.classList.add(cl);
            });
            this.area.enabledPreview = true;
        } else {
            buttonClassname.forEach((cl) => {
                this.button.classList.remove(cl);
            });
            this.area.enabledPreview = false;
        }
    }

    public init(): void {
        const handler: EditorControlsBinder = {
            settings: { ...this.settings, cantBeDisabled: true },
            callback: this.togglePreview.bind(this),
        };

        this.button = new EditorButton(handler).init();
        this.area.addHandler(handler);

        this.controlContainer.appendChild(this.button);
    }
}

export default EditorControlPreview;
