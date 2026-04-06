import { ColorValue } from '../index.js';

export function render(text: string, color: ColorValue): string {
  const hex = color.toHex();
  return `<span style="color: ${hex}">${escapeHtml(text)}</span>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function createChalkStyle(color: ColorValue): (text: string) => string {
  return (text: string) => render(text, color);
}

export const browser = {
  render,
  createChalkStyle,
};

export default browser;