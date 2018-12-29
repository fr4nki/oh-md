interface EditorControlsHotkeyInterface {
    modificator: string;
    key: string;
}

export interface EditorControlsSettingsInterface {
    control?: string;
    hotkey?: {
        win?: EditorControlsHotkeyInterface;
        mac?: EditorControlsHotkeyInterface;
    };
    hotkeyCurrent?: EditorControlsHotkeyInterface;
}

export interface EditorControlsBinderInterface {
    callback: Function;
    hotkey: EditorControlsHotkeyInterface;
}
