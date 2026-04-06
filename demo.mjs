import { red, green, blue, yellow, cyan, magenta, black, white, rgb, hex, hsl, StylizedText } from './dist/index.js';
import { render as terminalRender } from './dist/plugins/terminal.js';
import { render as browserRender } from './dist/plugins/browser.js';
import { render as jsonRender } from './dist/plugins/json.js';

function style(text, colorFn) {
  return terminalRender(text, colorFn().color);
}

console.log('=== Color Unified Library Demo ===\n');

console.log('--- Named colors ---');
console.log(style('Hello in red', red));
console.log(style('Hello in green', green));
console.log(style('Hello in blue', blue));
console.log(style('Hello in yellow', yellow));
console.log(style('Hello in cyan', cyan));
console.log(style('Hello in magenta', magenta));

console.log('\n--- Factory functions ---');
console.log(terminalRender('RGB(255, 128, 0)', rgb(255, 128, 0)));
console.log(terminalRender('Hex #FF5500', hex('#FF5500')));
console.log(terminalRender('HSL(270, 100%, 50%)', hsl(270, 100, 50)));

console.log('\n--- With StylizedText ---');
console.log(red('This is red text').toString());
console.log(green('This is green text').toString());
console.log(blue('This is blue text').toString());

console.log('\n--- Browser output ---');
console.log(browserRender('Hello in red', red().color));
console.log(browserRender('Hello in green', green().color));

console.log('\n--- JSON output ---');
console.log(JSON.stringify(jsonRender('Hello', red().color), null, 2));

console.log('\n=== Demo complete ===');