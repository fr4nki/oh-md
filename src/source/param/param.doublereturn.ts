import { EditorAreaInterface, EditorParamsSettingsInterface } from '../types';

class DoubleReturn {
    private area: EditorAreaInterface;
    readonly container: Element;
    readonly settings: EditorParamsSettingsInterface;

    constructor(
        area: EditorAreaInterface,
        container: Element,
        settings: EditorParamsSettingsInterface,
    ) {
        this.area = area;
        this.container = container;
        this.settings = settings;
    }

    private keyHandler(e: KeyboardEvent): void {
        const { modificatorKey } = this.settings.doubleReturn;

        if (e.keyCode === 13) {
            const { slice } = this.area.selection;
            const EOL_COUNT = e[modificatorKey] ? 1 : 2;
            const EOL = '\n'.repeat(EOL_COUNT);

            e.preventDefault();

            this.area.selection = {
                slice,
                focus: { start: slice.start + EOL_COUNT, end: slice.end + EOL_COUNT },
                value: EOL,
            };
        }
    }

    private setHandlers(): void {
        document.addEventListener('DOMContentLoaded', () => {
            this.area.areaElement.addEventListener(
                'keydown',
                this.keyHandler.bind(this)
            );
        });
    }

    public init() {
        const { doubleReturn } = this.settings;

        if (!doubleReturn.active) return;

        this.setHandlers();
    }
}

export default DoubleReturn;
