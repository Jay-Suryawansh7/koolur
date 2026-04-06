export class Color {
    constructor(r, g, b) {
        this.rgb = {
            r: this.clamp(r, 0, 255),
            g: this.clamp(g, 0, 255),
            b: this.clamp(b, 0, 255),
        };
    }
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, Math.round(value)));
    }
    toHex() {
        const toHexPart = (n) => n.toString(16).padStart(2, '0').toUpperCase();
        return `#${toHexPart(this.rgb.r)}${toHexPart(this.rgb.g)}${toHexPart(this.rgb.b)}`;
    }
    toRgb() {
        return { ...this.rgb };
    }
    toHsl() {
        const r = this.rgb.r / 255;
        const g = this.rgb.g / 255;
        const b = this.rgb.b / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const l = (max + min) / 2;
        if (max === min) {
            return { h: 0, s: 0, l: l * 100 };
        }
        const d = max - min;
        const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        let h = 0;
        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    }
    toString() {
        return this.toHex();
    }
}
export class HslColor {
    constructor(h, s, l) {
        this.h = h;
        this.s = s;
        this.l = l;
    }
    toHex() {
        const rgb = this.toRgb();
        const toHexPart = (n) => n.toString(16).padStart(2, '0').toUpperCase();
        return `#${toHexPart(rgb.r)}${toHexPart(rgb.g)}${toHexPart(rgb.b)}`;
    }
    toRgb() {
        const h = this.h / 360;
        const s = this.s / 100;
        const l = this.l / 100;
        if (s === 0) {
            const v = Math.round(l * 255);
            return { r: v, g: v, b: v };
        }
        const hue2rgb = (p, q, t) => {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        return {
            r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
            g: Math.round(hue2rgb(p, q, h) * 255),
            b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
        };
    }
    toHsl() {
        return { h: this.h, s: this.s, l: this.l };
    }
    toString() {
        const rgb = this.toRgb();
        const toHexPart = (n) => n.toString(16).padStart(2, '0').toUpperCase();
        return `#${toHexPart(rgb.r)}${toHexPart(rgb.g)}${toHexPart(rgb.b)}`;
    }
}
function createColor(r, g, b) {
    return new Color(r, g, b);
}
export const red = (text = '') => new StylizedText(text, createColor(255, 0, 0));
export const green = (text = '') => new StylizedText(text, createColor(0, 128, 0));
export const blue = (text = '') => new StylizedText(text, createColor(0, 0, 255));
export const yellow = (text = '') => new StylizedText(text, createColor(255, 255, 0));
export const cyan = (text = '') => new StylizedText(text, createColor(0, 255, 255));
export const magenta = (text = '') => new StylizedText(text, createColor(255, 0, 255));
export const white = (text = '') => new StylizedText(text, createColor(255, 255, 255));
export const black = (text = '') => new StylizedText(text, createColor(0, 0, 0));
export const gray = (text = '') => new StylizedText(text, createColor(128, 128, 128));
export const grey = gray;
export const brightRed = (text = '') => new StylizedText(text, createColor(255, 0, 0));
export const brightGreen = (text = '') => new StylizedText(text, createColor(0, 255, 0));
export const brightBlue = (text = '') => new StylizedText(text, createColor(0, 0, 255));
export const brightYellow = (text = '') => new StylizedText(text, createColor(255, 255, 0));
export const brightCyan = (text = '') => new StylizedText(text, createColor(0, 255, 255));
export const brightMagenta = (text = '') => new StylizedText(text, createColor(255, 0, 255));
export const brightWhite = (text = '') => new StylizedText(text, createColor(255, 255, 255));
export const brightBlack = (text = '') => new StylizedText(text, createColor(0, 0, 0));
export class StylizedText {
    constructor(text, color) {
        this.text = text;
        this.color = color;
    }
    toString() {
        return this.text;
    }
    valueOf() {
        return this.text;
    }
}
const defaultPlugins = new Map();
export function registerPlugin(plugin) {
    defaultPlugins.set(plugin.name, plugin);
}
export function getPlugin(name) {
    return defaultPlugins.get(name);
}
export function createChain(color) {
    return new ChainBuilder(color);
}
export class ChainBuilder {
    constructor(color) {
        this.color = color;
    }
    bold() {
        return this;
    }
    italic() {
        return this;
    }
    underline() {
        return this;
    }
    strikethrough() {
        return this;
    }
    toString() {
        return this.color.toString();
    }
}
export function rgb(r, g, b) {
    return new Color(r, g, b);
}
export function hex(hexString) {
    const cleanHex = hexString.replace(/^#/, '');
    if (cleanHex.length === 3) {
        const r = parseInt(cleanHex[0] + cleanHex[0], 16);
        const g = parseInt(cleanHex[1] + cleanHex[1], 16);
        const b = parseInt(cleanHex[2] + cleanHex[2], 16);
        return new Color(r, g, b);
    }
    if (cleanHex.length === 6) {
        const r = parseInt(cleanHex.slice(0, 2), 16);
        const g = parseInt(cleanHex.slice(2, 4), 16);
        const b = parseInt(cleanHex.slice(4, 6), 16);
        return new Color(r, g, b);
    }
    throw new Error('Invalid hex color format');
}
export function hsl(h, s, l) {
    const hslColor = new HslColor(h, s, l);
    const rgbValue = hslColor.toRgb();
    return new Color(rgbValue.r, rgbValue.g, rgbValue.b);
}
//# sourceMappingURL=index.js.map