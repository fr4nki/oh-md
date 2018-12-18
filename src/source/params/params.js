import EditorUtils from '../utils';

class EditorParams {
    constructor(element, settings) {
        this.element = element;
        this.settings = settings;
    }

    generateContainer() {
        console.log(this.element, this.settings);
    }
}

export default EditorParams