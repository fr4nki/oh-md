import EditorSettings from '../settings';
import EditorUtils from '../utils';

import {
    EditorPopupInterface,
    EditorPopupSettingsItem,
} from './popupInterface';

class EditorPopup implements EditorPopupInterface {
    form: Element;
    submit: (a: EditorPopupSettingsItem[]) => EditorPopupSettingsItem[];
    readonly settings: EditorPopupSettingsItem[];
    readonly container: Element;

    private static prefixPopupId = 'popup-item-';

    constructor(
        settings: EditorPopupSettingsItem[],
        container: Element,
        submit: (a: EditorPopupSettingsItem[]) => EditorPopupSettingsItem[],
    ) {
        this.settings = settings;
        this.container = container.parentElement;
        this.submit = submit;
        this.form = null;
    }

    private generateFormItem(settingsItem: EditorPopupSettingsItem): Node {
        const { createElement } = EditorUtils;
        const { popup } = EditorSettings.defaultClasses;

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
            }
        );

        label.innerText = settingsItem.title;

        item.appendChild(label);
        item.appendChild(input);

        return item;
    }

    private generateControls(): Node {
        const { createElement } = EditorUtils;
        const { popup } = EditorSettings.defaultClasses;
        const controlClassname = `${popup}-controls`;

        const wrapper = createElement(
            'div',
            [controlClassname],
        );

        const btnSubmit = createElement(
            'button',
            [`${controlClassname}-button`, `${controlClassname}-button__submit`],
        );

        const btnCancel = createElement(
            'button',
            [`${controlClassname}-button`, `${controlClassname}-button__cancel`],
        );

        btnCancel.innerText = 'Cancel';
        btnSubmit.innerText = 'OK';

        btnCancel.addEventListener('click', this.removePopup.bind(this));
        btnSubmit.addEventListener('click', this.submitPopup.bind(this));

        wrapper.appendChild(btnCancel);
        wrapper.appendChild(btnSubmit);

        return wrapper;
    }

    private generateForm() {
        const { createElement } = EditorUtils;
        const { popup } = EditorSettings.defaultClasses;

        this.form = createElement('div', popup);

        this.settings.forEach(s => this.form.appendChild(
            this.generateFormItem(s))
        );
        this.form.appendChild(this.generateControls());
        this.container.appendChild(this.form);
    }

    private collectData(): EditorPopupSettingsItem[] {
        const result = [];
        const idPrefix = EditorPopup.prefixPopupId;
        // let errors = 0;

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

    public removePopup(e: Event) {
        e.preventDefault();

        this.container.removeChild(this.form);
        this.form = null;
    }

    public submitPopup(e: Event) {
        e.preventDefault();

        const data = this.collectData();

        this.submit(data);
        this.removePopup(e);
    }

    public init() {
        this.generateForm();
    }
}

export default EditorPopup;
