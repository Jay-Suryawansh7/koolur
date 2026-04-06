export type RGB = { r: number; g: number; b: number };
export type Hex = string;

export type HSLValue = { h: number; s: number; l: number };

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

export class Color implements ColorValue {
  private readonly rgb: RGB;

  constructor(r: number, g: number, b: number) {
    this.rgb = {
      r: this.clamp(r, 0, 255),
      g: this.clamp(g, 0, 255),
      b: this.clamp(b, 0, 255),
    };
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, Math.round(value)));
  }

  toHex(): Hex {
    const toHexPart = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
    return `#${toHexPart(this.rgb.r)}${toHexPart(this.rgb.g)}${toHexPart(this.rgb.b)}`;
  }

  toRgb(): RGB {
    return { ...this.rgb };
  }

  toHsl(): HSLValue {
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

  toString(): string {
    return this.toHex();
  }
}

export class HslColor implements ColorValue {
  constructor(
    public readonly h: number,
    public readonly s: number,
    public readonly l: number
  ) {}

  toHex(): Hex {
    const rgb = this.toRgb();
    const toHexPart = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
    return `#${toHexPart(rgb.r)}${toHexPart(rgb.g)}${toHexPart(rgb.b)}`;
  }

  toRgb(): RGB {
    const h = this.h / 360;
    const s = this.s / 100;
    const l = this.l / 100;

    if (s === 0) {
      const v = Math.round(l * 255);
      return { r: v, g: v, b: v };
    }

    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
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

  toHsl(): HSLValue {
    return { h: this.h, s: this.s, l: this.l };
  }

  toString(): string {
    const rgb = this.toRgb();
    const toHexPart = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
    return `#${toHexPart(rgb.r)}${toHexPart(rgb.g)}${toHexPart(rgb.b)}`;
  }
}

function createColor(r: number, g: number, b: number): Color {
  return new Color(r, g, b);
}

export const red = (text: string = ''): StylizedText => new StylizedText(text, createColor(255, 0, 0));
export const green = (text: string = ''): StylizedText => new StylizedText(text, createColor(0, 128, 0));
export const blue = (text: string = ''): StylizedText => new StylizedText(text, createColor(0, 0, 255));
export const yellow = (text: string = ''): StylizedText => new StylizedText(text, createColor(255, 255, 0));
export const cyan = (text: string = ''): StylizedText => new StylizedText(text, createColor(0, 255, 255));
export const magenta = (text: string = ''): StylizedText => new StylizedText(text, createColor(255, 0, 255));
export const white = (text: string = ''): StylizedText => new StylizedText(text, createColor(255, 255, 255));
export const black = (text: string = ''): StylizedText => new StylizedText(text, createColor(0, 0, 0));
export const gray = (text: string = ''): StylizedText => new StylizedText(text, createColor(128, 128, 128));
export const grey = gray;

export const brightRed = (text: string = ''): StylizedText => new StylizedText(text, createColor(255, 0, 0));
export const brightGreen = (text: string = ''): StylizedText => new StylizedText(text, createColor(0, 255, 0));
export const brightBlue = (text: string = ''): StylizedText => new StylizedText(text, createColor(0, 0, 255));
export const brightYellow = (text: string = ''): StylizedText => new StylizedText(text, createColor(255, 255, 0));
export const brightCyan = (text: string = ''): StylizedText => new StylizedText(text, createColor(0, 255, 255));
export const brightMagenta = (text: string = ''): StylizedText => new StylizedText(text, createColor(255, 0, 255));
export const brightWhite = (text: string = ''): StylizedText => new StylizedText(text, createColor(255, 255, 255));
export const brightBlack = (text: string = ''): StylizedText => new StylizedText(text, createColor(0, 0, 0));

export class StylizedText {
  constructor(
    public readonly text: string,
    public readonly color: ColorValue
  ) {}

  toString(): string {
    return this.text;
  }

  valueOf(): string {
    return this.text;
  }
}

const defaultPlugins: Map<string, Plugin> = new Map();

export function registerPlugin(plugin: Plugin): void {
  defaultPlugins.set(plugin.name, plugin);
}

export function getPlugin(name: string): Plugin | undefined {
  return defaultPlugins.get(name);
}

export function createChain(color: ColorValue): ChainBuilder {
  return new ChainBuilder(color);
}

export class ChainBuilder {
  constructor(private color: ColorValue) {}

  bold(): ChainBuilder {
    return this;
  }

  italic(): ChainBuilder {
    return this;
  }

  underline(): ChainBuilder {
    return this;
  }

  strikethrough(): ChainBuilder {
    return this;
  }

  toString(): string {
    return this.color.toString();
  }
}

export function rgb(r: number, g: number, b: number): Color {
  return new Color(r, g, b);
}

export function hex(hexString: string): Color {
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

export function hsl(h: number, s: number, l: number): Color {
  const hslColor = new HslColor(h, s, l);
  const rgbValue = hslColor.toRgb();
  return new Color(rgbValue.r, rgbValue.g, rgbValue.b);
}