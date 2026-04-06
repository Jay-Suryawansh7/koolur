# koolur

> Unified secure color library with pluggable output backends — zero runtime dependencies

[![npm](https://img.shields.io/npm/v/koolur)](https://www.npmjs.com/package/koolur)
[![license](https://img.shields.io/npm/l/koolur)](https://opensource.org/licenses/MIT)
[![node](https://img.shields.io/node/v/koolur)](https://nodejs.org)
[![test](https://img.shields.io/badge/tests-68%20passed-brightgreen)](https://github.com/Jay-Suryawansh7/koolur)

## Why koolur?

**Supply chain attacks are real.** In September 2025, npm faced massive supply-chain attacks compromising 18 widely-used libraries including `chalk`, `color-convert`, `color-name`, and `ansi-styles` [1]. The March 2026 Axios compromise showed the problem is getting worse [2].

koolur was built to solve this by providing a **single trusted dependency** with:
- Zero runtime dependencies (no supply chain risk)
- Built-in security by default
- Pluggable output backends
- Runtime integrity verification

## Chalk Comparison

| Feature | chalk | koolur |
|---------|-------|--------|
| **Dependencies** | 0 (but transitive deps) | **0** (truly zero) |
| **Supply Chain Risk** | Compromised in Sep 2025 | **Secure by design** |
| **Integrity Verification** | ❌ None | **✅ Self-SHA at build** |
| **Package Signing** | ❌ None | **✅ Sigstore/Cosign ready** |
| **Output Plugins** | Terminal only | **Terminal + Browser + JSON** |
| **TypeScript** | ✅ Yes | **✅ Yes** |
| **Test Coverage** | Unknown | **68 tests, 82%+** |

### Vulnerabilities in Chalk (that koolur fixes)

1. **Sept 2025 Attack** — Chalk versions were compromised with crypto-stealing code [1]
2. **Transitive Dependencies** — Chalk depends on external packages that could be compromised
3. **No Integrity Verification** — No way to verify the package hasn't been tampered with
4. **Single Output** — Only terminal output, no browser/JSON support

## Features

### Core
- **Zero Runtime Dependencies** — No supply chain attack surface
- **Chalk 5.x Compatible API** — Easy migration from chalk
- **TypeScript Native** — Full type definitions included
- **ESM + CommonJS** — Works with both module systems

### Security
- **Runtime Integrity Verification** — SHA-256 checksums computed at build time
- **Sigstore/Cosign Ready** — Package signing for npm publish
- **No eval() / no network calls** — Sandboxed by design
- **No postinstall scripts** — Eliminates common attack vector

### Pluggable Output
- **Terminal** — ANSI codes for console (chalk-compatible)
- **Browser** — HTML/CSS for web applications
- **JSON** — Structured output for programmatic use

## Installation

```bash
npm install koolur
```

## Quick Start

```javascript
import { red, green, blue, yellow } from 'koolur';
import { render } from 'koolur/plugins/terminal';

// Simple usage (like chalk)
console.log(red('Error message'));
console.log(green('Success!'));

// With explicit rendering
console.log(render('Styled text', red()));
```

## API

### Named Colors (Chalk-compatible)

```javascript
import { red, green, blue, yellow, cyan, magenta, black, white, gray } from 'koolur';

console.log(red('red text'));
console.log(green('green text'));
console.log(blue('blue text'));
```

### Factory Functions

```javascript
import { rgb, hex, hsl } from 'koolur';

// RGB
console.log(rgb(255, 128, 0)('orange text'));

// Hex
console.log(hex('#FF5500')('hex color'));

// HSL
console.log(hsl(270, 100, 50)('purple text'));
```

### Color Object Methods

```javascript
import { Color } from 'koolur';

const color = new Color(255, 0, 0);
console.log(color.toHex());   // #FF0000
console.log(color.toRgb());  // { r: 255, g: 0, b: 0 }
console.log(color.toHsl());  // { h: 0, s: 100, l: 50 }
```

### Output Plugins

```javascript
// Terminal (ANSI)
import { render as terminalRender } from 'koolur/plugins/terminal';
console.log(terminalRender('text', red()));

// Browser (HTML)
import { render as browserRender } from 'koolur/plugins/browser';
console.log(browserRender('text', red()));
// Output: <span style="color: #FF0000">text</span>

// JSON (structured)
import { render as jsonRender } from 'koolur/plugins/json';
console.log(jsonRender('text', red()));
// Output: { text: 'text', color: { hex: '#FF0000', rgb: {...}, hsl: {...} } }
```

## Migration from Chalk

**Before (chalk):**
```javascript
import chalk from 'chalk';
console.log(chalk.red('Hello'));
```

**After (koolur):**
```javascript
import { red } from 'koolur';
console.log(red('Hello'));
```

For more complex usage:
```javascript
import { red, bold } from 'koolur';
console.log(bold(red('Important!')));
```

## Security

### Integrity Verification

koolur generates SHA-256 checksums of all dist files at build time:

```bash
npm run build  # Generates src/integrity.ts with checksums
```

### Supply Chain Security

1. **Zero dependencies** — Eliminates attack surface
2. **Build-time integrity** — Every release has verifiable checksums  
3. **Sigstore signing** — CI/CD signs packages with Cosign
4. **No postinstall scripts** — Prevents dependency hijacking

See [SECURITY.md](SECURITY.md) for the full security audit.

## Comparison with Other Libraries

| Library | Dependencies | Security | Plugins |
|---------|-------------|----------|---------|
| chalk | 0 (but 4 transitive) | ⚠️ Compromised | ❌ |
| picocolors | 0 | ✅ | ❌ |
| colorette | 0 | ✅ | ❌ |
| **koolur** | **0** | ✅ | ✅ |

## License

MIT

## Sources

[1] Palo Alto Networks - npm Supply Chain Attack (Sept 2025)  
[2] Microsoft Blog - Axios Supply Chain Compromise (March 2026)