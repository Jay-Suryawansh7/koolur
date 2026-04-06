export type RGB = {
    r: number;
    g: number;
    b: number;
};
export type Hex = string;
export type HSLValue = {
    h: number;
    s: number;
    l: number;
};
export interface ColorValue {
    toHex(): Hex;
    toRgb(): RGB;
    toHsl(): HSLValue;
    toString(): string;
}
export interface Plugin {
    name: string;
    render(text: string, color: ColorValue): string;
}
export declare class Color implements ColorValue {
    private readonly rgb;
    constructor(r: number, g: number, b: number);
    private clamp;
    toHex(): Hex;
    toRgb(): RGB;
    toHsl(): HSLValue;
    toString(): string;
}
export declare class HslColor implements ColorValue {
    readonly h: number;
    readonly s: number;
    readonly l: number;
    constructor(h: number, s: number, l: number);
    toHex(): Hex;
    toRgb(): RGB;
    toHsl(): HSLValue;
    toString(): string;
}
export declare const red: (text?: string) => StylizedText;
export declare const green: (text?: string) => StylizedText;
export declare const blue: (text?: string) => StylizedText;
export declare const yellow: (text?: string) => StylizedText;
export declare const cyan: (text?: string) => StylizedText;
export declare const magenta: (text?: string) => StylizedText;
export declare const white: (text?: string) => StylizedText;
export declare const black: (text?: string) => StylizedText;
export declare const gray: (text?: string) => StylizedText;
export declare const grey: (text?: string) => StylizedText;
export declare const brightRed: (text?: string) => StylizedText;
export declare const brightGreen: (text?: string) => StylizedText;
export declare const brightBlue: (text?: string) => StylizedText;
export declare const brightYellow: (text?: string) => StylizedText;
export declare const brightCyan: (text?: string) => StylizedText;
export declare const brightMagenta: (text?: string) => StylizedText;
export declare const brightWhite: (text?: string) => StylizedText;
export declare const brightBlack: (text?: string) => StylizedText;
export declare class StylizedText {
    readonly text: string;
    readonly color: ColorValue;
    constructor(text: string, color: ColorValue);
    toString(): string;
    valueOf(): string;
}
export declare function registerPlugin(plugin: Plugin): void;
export declare function getPlugin(name: string): Plugin | undefined;
export declare function createChain(color: ColorValue): ChainBuilder;
export declare class ChainBuilder {
    private color;
    constructor(color: ColorValue);
    bold(): ChainBuilder;
    italic(): ChainBuilder;
    underline(): ChainBuilder;
    strikethrough(): ChainBuilder;
    toString(): string;
}
export declare function rgb(r: number, g: number, b: number): Color;
export declare function hex(hexString: string): Color;
export declare function hsl(h: number, s: number, l: number): Color;
//# sourceMappingURL=index.d.ts.map