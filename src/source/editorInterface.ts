import { EditorControlsSettingsInterface } from './controls/controlsInterface';

interface EditorClassesInterface {
    container: string[];
    area: string[];
    controls: string[];
    params: string[];
}

export interface EditorInterface {
    element: HTMLElement | Node;
    settings: EditorSettingsInterface;
}

export interface EditorSettingsInterface {
    theme: string;
    params: object;
    controls: EditorControlsSettingsInterface[];
    classes: EditorClassesInterface;
    layout: string[];
}
