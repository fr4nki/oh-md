interface EditorControlsHotkeyInterface {
    modificator: string;
    key: string;
}

export interface EditorControlsSettingsInterface {
    type: string;
    button?: string;
    hotkey?: {
        win?: EditorControlsHotkeyInterface;
        mac?: EditorControlsHotkeyInterface;
    };
    hotkeyCurrent?: EditorControlsHotkeyInterface;
}
