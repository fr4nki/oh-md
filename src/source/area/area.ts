class EditorArea {
    container: Element;
    element: HTMLTextAreaElement;

    constructor(
        container: Element,
        element: HTMLTextAreaElement,
    ) {
        this.element = element;
        this.container = container;
        // this.textarea =
    }

    public get html() {
        return '<p></p>';
    }

    public get text() {
        return 'this';
    }

    public set text(str: string) {

    }

    public init(): EditorArea {
        return this;
    }
}

export default EditorArea;
