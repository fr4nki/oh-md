export interface EditorPopupSettingsItem {
    type: string;
    id: string;
    title?: string;
    required?: boolean;
    value?: string;
}

export interface EditorPopupInterface {
    settings: EditorPopupSettingsItem[];
    container: Element;
    submit(a: EditorPopupSettingsItem[]): EditorPopupSettingsItem[];
}
