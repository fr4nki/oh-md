import Layout from './oh-md/layout';
import './styles/style.scss';

export default class Editor {
    constructor(element, options) {
        this.element = element;
        this.options = options;
    }

    init() {
        console.log(this.element);
        console.log(this.options);

        const layout = new Layout(this.element, this.options);
        layout.make();
    }
}