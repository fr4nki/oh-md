import {
    EditorSelectionSlice,
    EditorAreaInterface,
} from '../types';

class EditorControl {
    area: EditorAreaInterface;

    constructor(
        area: EditorAreaInterface,
    ) {
        this.area = area;
    }

    protected insertSimpleElement(tag: string[]): void {
        const { slice: areaSlice, value: taV } = this.area.selection;
        const { start: sStart, end: sEnd } = areaSlice;
        const [tStart, tEnd] = tag;
        const normalSlice = taV.slice(sStart, sEnd);
        const innerSlice = normalSlice.slice(
            tStart.length,
            (tEnd ? -tEnd.length : undefined)
        );
        const outerSlice = taV.slice(
            sStart - tStart.length,
            (sEnd + (tEnd ? tEnd.length : 0))
        );

        const isSelectionOutside =
            (tStart ? outerSlice.slice(0, tStart.length) === tStart : true) &&
            (tEnd ? outerSlice.slice(-tEnd.length) === tEnd : true);

        const isSelectionInside =
            (tStart ? normalSlice.slice(0, tStart.length) === tStart : true) &&
            (tEnd ? normalSlice.slice(-tEnd.length) === tEnd : true);

        let value: string;
        let slice: EditorSelectionSlice = {
            start: null,
            end: null,
        };

        let focus: EditorSelectionSlice = {
            start: null,
            end: null,
        };

        if (isSelectionInside) {
            value = innerSlice;
            slice = { start: sStart, end: sEnd };
            focus = { start: sStart, end: innerSlice.length + sStart };
        } else
        if (isSelectionOutside) {
            value = normalSlice;
            slice = {
                start: sStart - tStart.length,
                end: sEnd + (tEnd ? tEnd.length : 0),
            };
            focus = {
                start: sStart - tStart.length,
                end: sEnd - (tEnd ? tEnd.length : 0),
            };
        } else {
            value = [tStart, normalSlice, tEnd].join('');
            slice = { start: sStart, end: sEnd };
            focus = {
                start: sStart + tStart.length,
                end: sStart + tStart.length + normalSlice.length
            };
        }

        this.area.selection = { value, slice, focus };
    }
}

export default EditorControl;
