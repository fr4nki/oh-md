export interface EditorParamsSettingsInterface {
    autosave?: number;
    counter?: boolean;
    wordwrap?: {
        paramVisible: boolean;
        active: boolean;
    };
    id?: string;
    doubleReturn?: {
        modificator: string;
        active: boolean;
    };
}
