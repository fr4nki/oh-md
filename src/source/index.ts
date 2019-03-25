import EditorController from './controller/controller';
import EditorUtils from './utils/utils';

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

    public get disabled(): boolean {
        return this.controller.disabled;
    }

    public set disabled(status: boolean) {
        if (typeof status === 'boolean') {
            this.controller.disabled = status;
        } else {
            EditorUtils.log('Disabling status should be boolean');
        }
    }

    public init(): Editor {
        if (
            !this.element ||
            (
                this.element &&
                this.element.tagName &&
                this.element.tagName.toLowerCase() !== 'textarea'
            )
        ) {
            EditorUtils.log(`Passed 'Element' is not a Textarea element`);
            return null;
        }

        if (!this.controller) {
            this.controller = new EditorController(
                this.element,
                this.settings,
            ).init();

            delete this.element;
        }

        return this;
    }
}

export default Editor;
