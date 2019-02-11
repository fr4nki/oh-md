import EditorSettings from '../settings';
import EditorUtils from '../utils';

import {
    EditorPopupInterface,
    EditorPopupSettingsItem,
} from './popupInterface';

class EditorPopup implements EditorPopupInterface {
    form: Element;
    submit: (a: EditorPopupSettingsItem[]) => EditorPopupSettingsItem[];
    cancel: () => void;
    btnSubmit: HTMLButtonElement;
    btnCancel: HTMLButtonElement;

    readonly settings: EditorPopupSettingsItem[];
    readonly container: Element;
    private static prefixPopupId = 'popup-item-';

    constructor(
        settings: EditorPopupSettingsItem[],
        container: Element,
        submit: (a: EditorPopupSettingsItem[]) => EditorPopupSettingsItem[],
        cancel: () => void,
    ) {
        this.settings = settings;
        this.container = container.parentElement;
        this.submit = submit;
        this.cancel = cancel;

        this.form = null;
        this.btnSubmit = null;
        this.btnCancel = null;

        this.keyHandler = this.keyHandler.bind(this);
        this.removePopup = this.removePopup.bind(this);
        this.submitPopup = this.submitPopup.bind(this);
    }

    private generateFormItem(settingsItem: EditorPopupSettingsItem): HTMLElement {
        const { createElement } = EditorUtils;
        const popup = EditorSettings.defaultClasses.popup[0];

        const itemClassname = `${popup}-item`;
        const idPrefix = EditorPopup.prefixPopupId;

        const inputId = `${idPrefix}${settingsItem.id}`;

        const item = createElement('div', [itemClassname]);
        const label = createElement(
            'label',
            [`${itemClassname}-label`],
            {
                for: `${idPrefix}${settingsItem.id}`,
            }
        );
        const input = createElement(
            'input',
            [`${itemClassname}-input`],
            {
                id: inputId,
                type: settingsItem.type,
                value: settingsItem.value,
            }
        );

        label.innerText = settingsItem.title;

        item.appendChild(label);
        item.appendChild(input);

        return item;
    }

    private generateControls(): Node {
        const { createElement } = EditorUtils;
        const popup = EditorSettings.defaultClasses.popup[0];
        const controlClassname = `${popup}-controls`;

        const wrapper = createElement(
            'div',
            [controlClassname],
        );

        this.btnSubmit = <HTMLButtonElement>createElement(
            'button',
            [`${controlClassname}-button`, `${controlClassname}-button__submit`],
        );

        this.btnCancel = <HTMLButtonElement>createElement(
            'button',
            [`${controlClassname}-button`, `${controlClassname}-button__cancel`],
        );

        this.btnCancel.innerText = 'Cancel';
        this.btnSubmit.innerText = 'OK';

        this.btnCancel.addEventListener('click', this.removePopup);
        this.btnSubmit.addEventListener('click', this.submitPopup);

        wrapper.appendChild(this.btnCancel);
        wrapper.appendChild(this.btnSubmit);

        return wrapper;
    }

    private generateForm(): void {
        const { createElement } = EditorUtils;
        const { popup } = EditorSettings.defaultClasses;

        this.form = createElement('div', popup);

        this.settings.forEach((s, num) => {
            const item = this.generateFormItem(s);

            this.form.appendChild(item);
        });

        this.form.appendChild(this.generateControls());
        this.container.appendChild(this.form);
        this.form.querySelector('input').focus();

        document.addEventListener('keydown', this.keyHandler);
    }

    private collectData(): EditorPopupSettingsItem[] {
        const result = [];
        const idPrefix = EditorPopup.prefixPopupId;

        this.settings.forEach((s) => {
            const currentId = `#${idPrefix}${s.id}`;
            const { value } = <HTMLInputElement>this.form.querySelector(currentId);

            result.push({
                ...s,
                value,
            });
        });

        return result;
    }

    private keyHandler(e: KeyboardEvent) {
        if (e.keyCode === 27) {
            this.removePopup(e);
        }

        if (e.keyCode === 13) {
            this.submitPopup(e);
        }
    }

    public removePopup(e: Event): void {
        e.preventDefault();

        document.removeEventListener('keydown', this.keyHandler);
        this.btnCancel.removeEventListener('click', this.removePopup);
        this.btnSubmit.removeEventListener('click', this.submitPopup);

        this.container.removeChild(this.form);
        this.keyHandler = null;

        this.cancel();
    }

    public submitPopup(e: Event): void {
        e.preventDefault();

        const data = this.collectData();

        this.submit(data);
        this.removePopup(e);
    }

    public init(): EditorPopupInterface {
        this.generateForm();

        return this;
    }
}

export default EditorPopup;
