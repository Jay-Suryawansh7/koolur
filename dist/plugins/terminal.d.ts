import { ColorValue } from '../index.js';
export declare function render(text: string, color: ColorValue): string;
export declare function createChalkStyle(color: ColorValue): (text: string) => string;
export declare const terminal: {
    render: typeof render;
    createChalkStyle: typeof createChalkStyle;
};
export default terminal;
//# sourceMappingURL=terminal.d.ts.map