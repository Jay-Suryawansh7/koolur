export function render(text, color) {
    const hex = color.toHex();
    return `<span style="color: ${hex}">${escapeHtml(text)}</span>`;
}
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
export function createChalkStyle(color) {
    return (text) => render(text, color);
}
export const browser = {
    render,
    createChalkStyle,
};
export default browser;
//# sourceMappingURL=browser.js.map