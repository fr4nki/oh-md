import EditorControl from './controls';
import EditorPopup from '../popup/popup';

import {
    EditorControlsBinderInterface,
    EditorControlsSettingsInterface,
} from './controlsInterface';

import {
    EditorPopupInterface,
    EditorPopupSettingsItem,
} from '../popup/popupInterface';

class Link extends EditorControl {
    private static mdTagText = '__text__';
    private static mdTagLink = '__href__';
    private static mdTag = [`[${Link.mdTagText}](${Link.mdTagLink})`, null];

    textarea: HTMLTextAreaElement;
    container: Element;
    settings: EditorControlsSettingsInterface;
    button: Element;
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

    private insertTagInto() {
        const {
            selectionStart: sStart,
            selectionEnd: sEnd,
            value: taV
        } = this.textarea;

        const slice = taV.slice(sStart, sEnd);
        const EOL = '\n';
        const tag = ['!!!', null];
        // const tag = slice.includes(EOL)
        //     ? Code.fullMdTag
        //     : Code.mdTag
        // ;

        super.insertSimpleElement(tag);
    }

    private click(e: MouseEvent): void {
        e.preventDefault();

        const settings = [
            {
                type: 'text',
                id: Link.mdTagText,
                title: 'Insert text',
                required: true,
            },
            {
                type: 'text',
                id: Link.mdTagLink,
                title: 'Insert URL',
                required: true,
            }
        ];

        new EditorPopup(settings, this.container, this.onSubmit).init();
    }

    public onSubmit(data: EditorPopupSettingsItem[]): any {
        console.log(data);
        console.log('LINK!!!!!!!!!!! SUBMIT!!!!!!');
    }

    public init(): void {
        const { control, hotkey } = this.settings;

        this.settings.hotkeyCurrent = super.getCurrentHotkey(hotkey);
        this.button = super.generateElement(control);
        this.container.appendChild(this.button);

        this.handle();
    }
}

export default Link;
