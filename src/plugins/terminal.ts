import { ColorValue, Color, HslColor } from '../index.js';

interface TerminalStyle {
  readonly open: string;
  readonly close: string;
}

const reset: TerminalStyle = { open: '\x1b[0m', close: '\x1b[0m' };

const foregroundStyles: Record<string, TerminalStyle> = {
  black:   { open: '\x1b[30m', close: '\x1b[39m' },
  red:     { open: '\x1b[31m', close: '\x1b[39m' },
  green:   { open: '\x1b[32m', close: '\x1b[39m' },
  yellow:  { open: '\x1b[33m', close: '\x1b[39m' },
  blue:    { open: '\x1b[34m', close: '\x1b[39m' },
  magenta: { open: '\x1b[35m', close: '\x1b[39m' },
  cyan:    { open: '\x1b[36m', close: '\x1b[39m' },
  white:   { open: '\x1b[37m', close: '\x1b[39m' },
  gray:    { open: '\x1b[90m', close: '\x1b[39m' },
  grey:    { open: '\x1b[90m', close: '\x1b[39m' },
  redBright:     { open: '\x1b[91m', close: '\x1b[39m' },
  greenBright:   { open: '\x1b[92m', close: '\x1b[39m' },
  yellowBright:  { open: '\x1b[93m', close: '\x1b[39m' },
  blueBright:    { open: '\x1b[94m', close: '\x1b[39m' },
  magentaBright: { open: '\x1b[95m', close: '\x1b[39m' },
  cyanBright:    { open: '\x1b[96m', close: '\x1b[39m' },
  whiteBright:   { open: '\x1b[97m', close: '\x1b[39m' },
};

const modifierStyles: Record<string, TerminalStyle> = {
  bold:          { open: '\x1b[1m',  close: '\x1b[22m' },
  dim:           { open: '\x1b[2m',  close: '\x1b[22m' },
  italic:        { open: '\x1b[3m',  close: '\x1b[23m' },
  underline:     { open: '\x1b[4m',  close: '\x1b[24m' },
  overline:      { open: '\x1b[53m', close: '\x1b[55m' },
  inverse:       { open: '\x1b[7m',  close: '\x1b[27m' },
  hidden:        { open: '\x1b[8m',  close: '\x1b[28m' },
  strikethrough: { open: '\x1b[9m',  close: '\x1b[29m' },
};

function colorName(color: ColorValue): string {
  const rgb = color.toRgb();
  const { r, g, b } = rgb;
  
  if (r === 0 && g === 0 && b === 0) return 'black';
  if (r === 255 && g === 0 && b === 0) return 'red';
  if (r === 0 && g === 128 && b === 0) return 'green';
  if (r === 255 && g === 255 && b === 0) return 'yellow';
  if (r === 0 && g === 0 && b === 255) return 'blue';
  if (r === 255 && g === 0 && b === 255) return 'magenta';
  if (r === 0 && g === 255 && b === 255) return 'cyan';
  if (r === 255 && g === 255 && b === 255) return 'white';
  
  if (r >= 128 && g >= 128 && b >= 128) return 'gray';
  
  if (r >= 200 && g < 100 && b < 100) return 'redBright';
  if (g >= 200 && r < 100 && b < 100) return 'greenBright';
  if (b >= 200 && r < 100 && g < 100) return 'blueBright';
  
  if (r >= 200 && g >= 200 && b < 100) return 'yellowBright';
  if (r >= 200 && b >= 200 && g < 100) return 'magentaBright';
  if (g >= 200 && b >= 200 && r < 100) return 'cyanBright';
  
  return 'white';
}

function findStyle(color: ColorValue): TerminalStyle {
  const name = colorName(color);
  return foregroundStyles[name] || foregroundStyles.white;
}

export function render(text: string, color: ColorValue): string {
  const style = findStyle(color);
  return `${style.open}${text}${style.close}`;
}

export function createChalkStyle(color: ColorValue): (text: string) => string {
  return (text: string) => render(text, color);
}

export const terminal = {
  render,
  createChalkStyle,
};

export default terminal;