import EditorControl from './control';
import EditorPopup from '../popup/popup';

import {
    EditorControlsBinderInterface,
    EditorControlsSettingsInterface,
} from './controlInterface';

import {
    EditorPopupSettingsItem,
    EditorPopupInterface,
} from '../popup/popupInterface';

class Image extends EditorControl {
    private static mdTagText = '__text__';
    private static mdTagLink = '__href__';
    private static mdTag = [`![${Image.mdTagText}](${Image.mdTagLink})`, null];

    textarea: HTMLTextAreaElement;
    container: Element;
    settings: EditorControlsSettingsInterface;
    button: Element;
    isPopupOpen: Boolean;
    popup: EditorPopupInterface;

    constructor(
        textarea: HTMLTextAreaElement,
        container: Element,
        settings: EditorControlsSettingsInterface
    ) {
        super(textarea);

        this.textarea = textarea;
        this.container = container;
        this.settings = settings;
        this.button = null;
        this.popup = null;
        this.isPopupOpen = false;
    }

    private handle(): void {
        const { hotkeyCurrent: hotkey } = this.settings;
        const argument: EditorControlsBinderInterface = {
            hotkey,
            callback: this.insertTagInto.bind(this)
        };

        super.addHandler(argument);
        this.button.addEventListener('click', this.click.bind(this));
    }

    private insertTagInto(): void {
        if (this.isPopupOpen) {
            return;
        }

        const {
            selectionStart: sStart,
            selectionEnd: sEnd,
            value: taV
        } = this.textarea;

        const value = sStart !== sEnd
            ? taV.slice(sStart, sEnd)
            : ''
        ;

        const settings = [
            {
                value,
                type: 'text',
                id: Image.mdTagText,
                title: 'Image title',
            },
            {
                value: '',
                type: 'text',
                id: Image.mdTagLink,
                title: 'Image URL',
            }
        ];

        this.popup = new EditorPopup(
            settings,
            this.container,
            this.onSubmit.bind(this),
            this.onCancel.bind(this),
        );
        this.popup.init();
    }

    private click(e: MouseEvent): void {
        e.preventDefault();

        this.insertTagInto();
    }

    public onSubmit(data: EditorPopupSettingsItem[]): void {
        const {
            selectionStart: sStart,
            selectionEnd: sEnd,
        } = this.textarea;
        let value = Image.mdTag[0];

        this.popup = null;

        data.forEach(d => value = value.replace(d.id, d.value));

        super.insertTextInto(value, [sStart, sEnd], [sStart + 1, sStart + 1]);
    }

    private onCancel(): void {
        const {
            selectionStart: sStart,
            selectionEnd: sEnd,
            value,
        } = this.textarea;

        super.insertTextInto(value.slice(sStart, sEnd), [sStart, sEnd], [sStart, sStart]);
    }

    public init(): void {
        const { control, hotkey } = this.settings;

        this.settings.hotkeyCurrent = super.getCurrentHotkey(hotkey);
        this.button = super.generateElement(control, this.settings.hotkeyCurrent);
        this.container.appendChild(this.button);

        this.handle();
    }
}

export default Image;
