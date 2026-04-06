import { ColorValue } from '../index.js';
export interface JsonColorOutput {
    text: string;
    color: {
        hex: string;
        rgb: {
            r: number;
            g: number;
            b: number;
        };
        hsl: {
            h: number;
            s: number;
            l: number;
        };
    };
}
export declare function render(text: string, color: ColorValue): JsonColorOutput;
export declare function renderPlain(text: string, color: ColorValue): string;
export declare const json: {
    render: typeof render;
    renderPlain: typeof renderPlain;
};
export default json;
//# sourceMappingURL=json.d.ts.map