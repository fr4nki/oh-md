

interface EditorClassesInterface {
    container: string[];
    area: string[];
    controls: string[];
    params: string[];
}

export interface EditorControlsHotkeyInterface {
    modificator: string;
    key: string;
}

export interface EditorControlsBinder {
    callback: Function;
    hotkey: EditorControlsHotkeyInterface;
}

interface EditorClassesInterface {
    container: string[];
    area: string[];
    controls: string[];
    params: string[];
}

export interface EditorControllerInterface {
    element: HTMLElement | Node;
    settings: EditorSettingsInterface;
}

export interface EditorSettingsInterface {
    theme: string;
    params: EditorParamsSettings;
    controls: EditorControlsSettings[];
    classes: EditorClassesInterface;
    layout: string[];
}

export interface EditorInputInterface {
    input: HTMLTextAreaElement;
    settings: object;
}

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
    cancel(): void;
    init(): EditorPopupInterface;
}







// a
export interface EditorControlsSettings {
    control?: string;
    hotkey?: {
        win?: EditorControlsHotkeyInterface;
        mac?: EditorControlsHotkeyInterface;
    };
    hotkeyCurrent?: EditorControlsHotkeyInterface;
}

export interface EditorParamsSettings {
    autosave?: number;
    counter?: boolean;
    wordwrap?: {
        paramVisible: boolean;
        active: boolean;
    };
    id?: string;
    doubleReturn?: {
        modificatorKey: string;
        active: boolean;
    };
}

export interface EditorSettings {
    theme: string;
    params: EditorParamsSettings;
    controls: EditorControlsSettings[];
    classes: EditorClassesInterface;
    layout: string[];
}

export interface EditorInterface {

}

export interface EditorInputInterface {

}

export interface EditorLayout {
    controls?: Element;
    area?: Element;
    params?: Element;
}
