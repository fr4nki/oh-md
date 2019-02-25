import EditorController from './editor/editor';
import {
    EditorControllerInterface,
    EditorSettingsInterface,
} from './editor/editorInterface';

import '../styles/style.scss';

class Editor {
    element: HTMLTextAreaElement;
    settings: EditorSettingsInterface;
    editor: EditorControllerInterface;

    constructor(
        element: HTMLTextAreaElement,
        settings: EditorSettingsInterface,
    ) {
        this.settings = settings;
        this.element = element;

        this.editor = null;
    }

    get text(): string {
        // return this.editor.text;
        return '';
    }

    set text(text: string) {
    }

    get HTML(): string {
        return '123';
    }

    init(): Editor {
        this.editor = new EditorController(this.element, this.settings).init();

        return this;
    }
}

export default Editor;
