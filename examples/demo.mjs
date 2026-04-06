#!/usr/bin/env node

import { red, green, blue, yellow, cyan, magenta, white, black, gray, hex, hsl, rgb, StylizedText, registerPlugin } from 'koolur';
import { terminal } from 'koolur/plugins/terminal';

registerPlugin(terminal);

console.log('\n╔═══════════════════════════════════════════════════════════════════╗');
console.log('║                    KOOLUR - Demo Showcase                         ║');
console.log('╚═══════════════════════════════════════════════════════════════════╝\n');

console.log('━━━ Basic Colors (Named Functions) ━━━');
console.log('  ' + red('red') + '     ' + green('green') + '    ' + blue('blue'));
console.log('  ' + yellow('yellow') + ' ' + cyan('cyan') + '  ' + magenta('magenta'));
console.log('  ' + white('white') + '  ' + black('black') + ' ' + gray('gray'));

console.log('\n━━━ RGB Colors ━━━');
const coral = rgb(255, 127, 80);
const turquoise = rgb(64, 224, 208);
const violet = rgb(238, 130, 238);
console.log('  rgb(255,127,80)   → ' + coral.toHex());
console.log('  rgb(64,224,208)   → ' + turquoise.toHex());
console.log('  rgb(238,130,238)  → ' + violet.toHex());

console.log('\n━━━ Hex Colors ━━━');
const c1 = hex('#FF7F50');
const c2 = hex('#008080');
const c3 = hex('#FFD700');
console.log('  #FF7F50 (coral)   → ' + c1.toHex() + ' → ' + new StylizedText('coral', c1));
console.log('  #008080 (teal)    → ' + c2.toHex() + ' → ' + new StylizedText('teal', c2));
console.log('  #FFD700 (gold)   → ' + c3.toHex() + ' → ' + new StylizedText('gold', c3));

console.log('\n━━━ HSL Colors ━━━');
const h1 = hsl(200, 70, 50);
const h2 = hsl(45, 90, 50);
const h3 = hsl(280, 60, 60);
console.log('  hsl(200,70%,50%) → ' + h1.toHex() + ' → ' + new StylizedText('sky blue', h1));
console.log('  hsl(45,90%,50%)  → ' + h2.toHex() + ' → ' + new StylizedText('gold', h2));
console.log('  hsl(280,60%,60%) → ' + h3.toHex() + ' → ' + new StylizedText('purple', h3));

console.log('\n━━━ Color Conversions ━━━');
const sample = hex('#3498DB');
console.log('  Color: #3498DB');
console.log('    toHex(): ' + sample.toHex());
console.log('    toRgb(): RGB(' + sample.toRgb().r + ', ' + sample.toRgb().g + ', ' + sample.toRgb().b + ')');
console.log('    toHsl(): HSL(' + sample.toHsl().h + ', ' + sample.toHsl().s + '%, ' + sample.toHsl().l + '%)');

console.log('\n━━━ Terminal Plugin (ANSI Codes) ━━━');
console.log('  ' + terminal.render('Hello World!', hex('#E74C3C')));
console.log('  ' + terminal.render('Success!', green('x').color));

console.log('\n━━━ Real-world Use Cases ━━━');
console.log('  📊 Log Levels:  ' + red('ERROR') + '  ' + yellow('WARN') + '  ' + green('INFO'));
console.log('  ✅ Status:       ' + green('● Ready') + '   ' + yellow('● Pending') + '   ' + red('● Failed'));
console.log('  📝 Checkmarks:   ' + green('✓ Installed') + '   ' + cyan('✓ Updated') + '   ' + red('✗ Failed'));
console.log('  █ Progress:      ' + green('███████') + yellow('██') + red('██'));

console.log('\n' + '═'.repeat(70));
console.log('  koolur - Zero runtime dependencies • Secure • Pluggable');
console.log('═'.repeat(70));