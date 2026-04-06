import { ColorValue } from '../index.js';

export interface JsonColorOutput {
  text: string;
  color: {
    hex: string;
    rgb: { r: number; g: number; b: number };
    hsl: { h: number; s: number; l: number };
  };
}

export function render(text: string, color: ColorValue): JsonColorOutput {
  return {
    text,
    color: {
      hex: color.toHex(),
      rgb: color.toRgb(),
      hsl: color.toHsl(),
    },
  };
}

export function renderPlain(text: string, color: ColorValue): string {
  return text;
}

export const json = {
  render,
  renderPlain,
};

export default json;