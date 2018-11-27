import settings from './settings';

export default class Layout {
    constructor(element, options) {
        this.element = element;
        this.options = options;
        this.layout = null;
    }

    make() {
        console.log(this);


        const clone = this.element.cloneNode(true);
        // const layoutClassName = this.options.class.layout

        this.layout = document.createElement('div');
        this.layout.classList.add(this.options.class || 'oh-md');
        this.layout.appendChild(clone);

        this.element.parentElement.insertBefore(this.layout, this.element);
        this.element.parentElement.removeChild(this.element);
        this.element = clone
    }
}