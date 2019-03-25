import EditorControl from './control';
import EditorButton from '../button/button';
import EditorPopup from '../popup/popup';

import {
    EditorControlsBinder,
    EditorControlsSettings,
    EditorAreaInterface,
    EditorPopupSettingsItem,
} from '../types';
import EditorSettings from '../settings';

class EditorControlLink extends EditorControl {
    private static mdTagText = '__text__';
    private static mdTagLink = '__href__';
    private static mdTag = [
        `[${EditorControlLink.mdTagText}](${EditorControlLink.mdTagLink})`,
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
        let value = EditorControlLink.mdTag[0];

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

    private onDone(): void {
        const [controlClassname] = EditorSettings.defaultClasses.controls;
        const buttonClassname = `${controlClassname}--button__active`;

        this.button.classList.remove(buttonClassname);
    }

    private onCancel(): void {
    }

    private handle() {
        if (!this.area.disabled) {
            const { selectedValue: value } = this.area.selection;
            const [controlClassname] = EditorSettings.defaultClasses.controls;
            const buttonClassname = `${controlClassname}--button__active`;

            const settings = [
                {
                    value,
                    type: 'text',
                    id: EditorControlLink.mdTagText,
                    title: 'Insert text',
                },
                {
                    value: '',
                    type: 'text',
                    id: EditorControlLink.mdTagLink,
                    title: 'Insert URL',
                }
            ];

            const popup = new EditorPopup(
                this.area.areaContainer,
                settings,
                this.onSubmit.bind(this),
                this.onCancel.bind(this),
                this.onDone.bind(this),
            );

            const popupInstance = popup.init();

            if (popupInstance) {
                this.button.classList.add(buttonClassname);
            }

            return popupInstance;
        }
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

export default EditorControlLink;
