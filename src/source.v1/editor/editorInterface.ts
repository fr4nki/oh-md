import { EditorControlsSettingsInterface } from '../control/controlInterface';
import { EditorParamsSettingsInterface } from '../param/paramInterface';

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
    params: EditorParamsSettingsInterface;
    controls: EditorControlsSettingsInterface[];
    classes: EditorClassesInterface;
    layout: string[];
}
