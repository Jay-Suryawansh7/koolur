export function render(text, color) {
    return {
        text,
        color: {
            hex: color.toHex(),
            rgb: color.toRgb(),
            hsl: color.toHsl(),
        },
    };
}
export function renderPlain(text, color) {
    return text;
}
export const json = {
    render,
    renderPlain,
};
export default json;
//# sourceMappingURL=json.js.map