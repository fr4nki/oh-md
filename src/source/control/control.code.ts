import EditorControl from './control';
import EditorButton from '../button/button';

import {
    EditorControlsBinder,
    EditorControlsSettings,
    EditorAreaInterface,
} from '../types';

class EditorControlStrike extends EditorControl {
    private static mdTag = ['`', '`'];
    private static fullMdTag = ['```\n', '\n```'];

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

    private insertTagInto() {
        const tag = this.area.hasEndOfLine()
            ? EditorControlStrike.fullMdTag
            : EditorControlStrike.mdTag
        ;

        super.insertSimpleElement(tag);
    }

    public init(): void {
        const handler: EditorControlsBinder = {
            settings: this.settings,
            callback: this.insertTagInto.bind(this),
        };

        this.button = new EditorButton(handler).init();
        this.area.addHandler(handler);

        this.controlContainer.appendChild(this.button);
    }
}

export default EditorControlStrike;
