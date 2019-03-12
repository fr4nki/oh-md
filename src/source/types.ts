export interface EditorControlsHotkeyInterface {
    modificator: string;
    key: string;
}

export interface EditorControlsBinder {
    callback: Function;
    settings: EditorControlsSettings;
    // hotkey: EditorControlsHotkeyInterface;
}

interface EditorClassesInterface {
    container: string[];
    area: string[];
    controls: string[];
    params: string[];
}

export interface EditorSettingsInterface {
    theme: string;
    params: EditorParamsSettings;
    controls: EditorControlsSettings[];
    classes: EditorClassesInterface;
    layout: string[];
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
    init(): void;
}

export interface EditorControlsSettings {
    control?: string;
    hotkey?: {
        default?: EditorControlsHotkeyInterface;
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

export interface EditorLayout {
    controls?: Element;
    area?: Element;
    params?: Element;
}

export interface EditorSelectionSlice {
    start: number;
    end: number;
}

export interface EditorSelection {
    value: string | null;
    slice: EditorSelectionSlice | null;
    selectedValue?: string | null;
    focus?: EditorSelectionSlice | null;
}

export interface EditorAreaInterface {
    container: Element;
    element: HTMLTextAreaElement;
    settings: EditorSettingsInterface;
    areaContainer: HTMLElement;
    previewContainer: HTMLElement;
    handlerList?: EditorControlsBinder[];
    insertCommand?: string;
    addHandler: (a: EditorControlsBinder) => void;
    init: () => EditorAreaInterface;
    hasEndOfLine: () => boolean;
    enabledFullscreen?: boolean;
    enabledPreview?: boolean;
    html: string;
    text: string;
    areaElement: HTMLTextAreaElement;
    selection: EditorSelection;
}

export interface EditorParamsSettingsInterface {
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

