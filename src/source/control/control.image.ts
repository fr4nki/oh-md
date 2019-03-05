import EditorControl from './control';
import EditorButton from '../button/button';
import EditorPopup from '../popup/popup';

import {
    EditorControlsBinder,
    EditorControlsSettings,
    EditorAreaInterface,
    EditorPopupSettingsItem,
} from '../types';

class EditorControlImage extends EditorControl {
    private static mdTagText = '__text__';
    private static mdTagLink = '__href__';
    private static mdTag = [
        `![${EditorControlImage.mdTagText}](${EditorControlImage.mdTagLink})`,
        null,
    ];

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

    private onSubmit(data: EditorPopupSettingsItem[]): void {
        const { slice } = this.area.selection;
        let value = EditorControlImage.mdTag[0];

        data.forEach(d => value = value.replace(d.id, d.value));

        this.area.selection = {
            value,
            slice,
            focus: {
                start: slice.start,
                end: slice.start + value.length,
            },
        };
    }

    private onCancel(): void {}

    private handle() {
        const { selectedValue: value } = this.area.selection;

        const settings = [
            {
                value,
                type: 'text',
                id: EditorControlImage.mdTagText,
                title: 'Image title',
            },
            {
                value: '',
                type: 'text',
                id: EditorControlImage.mdTagLink,
                title: 'Image URL',
            }
        ];

        const popup = new EditorPopup(
            this.area.areaContainer,
            settings,
            this.onSubmit.bind(this),
            this.onCancel.bind(this),
        );

        return popup.init();
    }

    public init(): void {
        const handler: EditorControlsBinder = {
            settings: this.settings,
            callback: this.handle.bind(this),
        };

        this.button = new EditorButton(handler).init();
        this.area.addHandler(handler);

        this.controlContainer.appendChild(this.button);
    }
}

export default EditorControlImage;
