import EditorController from './controller/controller';

import { EditorSettings } from './types';

import '../styles/style.scss';

class Editor {
    public element: HTMLTextAreaElement;
    public settings: EditorSettings;
    private controller: EditorController;

    constructor(
        element: HTMLTextAreaElement,
        settings: EditorSettings,
    ) {
        this.settings = settings;
        this.element = element;
        this.controller = null;
    }

    public get text(): string {
        return this.controller.text;
    }

    public set text(text: string) {
        this.controller.text = text;
    }

    public get html(): string {
        return this.controller.html;
    }

    public init(): Editor {
        if (!this.controller) {
            this.controller = new EditorController(
                this.element,
                this.settings,
            ).init();
        }

        return this;
    }
}

export default Editor;
