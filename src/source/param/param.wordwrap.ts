import EditorUtils from "../utils/utils";
import EditorSettings from "../settings";

import { EditorAreaInterface, EditorParamsSettingsInterface } from "../types";

class Wordwrap {
    private area: EditorAreaInterface;
    private container: Element;
    private settings: EditorParamsSettingsInterface;
    private wordwrapStatus: boolean;
    private element: Element;

    constructor(
        area: EditorAreaInterface,
        container: Element,
        settings: EditorParamsSettingsInterface
    ) {
        this.area = area;
        this.container = container;
        this.settings = settings;

        this.element = null;
        this.wordwrapStatus = null;
    }

    private setWordwrapStatus() {
        const area = EditorSettings.defaultClasses.area[0];
        const params = EditorSettings.defaultClasses.params[0];
        const wordwrapAreaClassname = `${area}--text--wordwrap__off`;
        const wordwrapParamsClassname = `${params}--wordwrap__off`;

        this.wordwrapStatus = !this.wordwrapStatus;

        if (!this.wordwrapStatus) {
            this.area.areaElement.classList.remove(wordwrapAreaClassname);
            this.element.classList.remove(wordwrapParamsClassname);
        } else {
            this.area.areaElement.classList.add(wordwrapAreaClassname);
            this.element.classList.add(wordwrapParamsClassname);
        }
    }

    public init() {
        const { createElement } = EditorUtils;
        const params = EditorSettings.defaultClasses.params[0];
        const { paramVisible, active } = this.settings.wordwrap;

        this.wordwrapStatus = active;

        if (!paramVisible) {
            return;
        }

        this.element = createElement('a', [`${params}--wordwrap`], {
            title: 'Word wrap'
        });

        this.setWordwrapStatus();

        this.element.addEventListener(
            'click',
            this.setWordwrapStatus.bind(this)
        );
        this.container.appendChild(this.element);
    }
}

export default Wordwrap;
