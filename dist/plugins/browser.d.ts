import { ColorValue } from '../index.js';
export declare function render(text: string, color: ColorValue): string;
export declare function createChalkStyle(color: ColorValue): (text: string) => string;
export declare const browser: {
    render: typeof render;
    createChalkStyle: typeof createChalkStyle;
};
export default browser;
//# sourceMappingURL=browser.d.ts.map