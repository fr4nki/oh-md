class EditorParams {
    constructor(element, settings) {
        this.element = element;
        this.settings = settings;
    }

    init() {
        console.log(this.element, this.settings);
    }
}

export default EditorParams