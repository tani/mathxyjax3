# MathXyJax3

[![CI](https://github.com/tani/mathxyjax3/actions/workflows/ci.yml/badge.svg)](https://github.com/tani/mathxyjax3/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/mathxyjax3.svg)](https://badge.fury.io/js/mathxyjax3)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MathJax3 with XyJaX-v3 for server-side rendering of mathematical expressions and xy-pic diagrams.

## Features

- **MathJax 3 Integration**: MathJax for high-quality mathematical typesetting
- **XyJax-v3 Support**: Full support for xy-pic diagrams and commutative diagrams
- **Server-Side Rendering**: Optimized for Node.js server environments
- **ESM Module**: Modern ES module support
- **SVG Output**: Clean, scalable vector graphics output

## Installation

```bash
npm install mathxyjax3
```

## Quick Start

```javascript
import mathjax from 'mathxyjax3';

// Render a simple math expression
const mathSvg = mathjax.tex2svgHtml('E = mc^2');
console.log(mathSvg.outerHTML);

// Render xy-pic diagram
const xyDiagram = mathjax.tex2svgHtml('\\xymatrix{A \\ar[r] & B}');
console.log(xyDiagram.outerHTML);
```

## API Reference

### `tex2svgHtml(input, options)`

Converts TeX/LaTeX input to SVG output wrapped in HTML.

#### Parameters:
- `input` (string): The TeX/LaTeX expression to render
- `options` (object, optional): Rendering options

#### Returns:
- HTML string containing SVG

#### Example:
```javascript
const svg = mathjax.tex2svgHtml('\\frac{1}{2}', {
  display: true,
  em: 16,
  ex: 8
});
```

## Supported Formats

### Mathematical Expressions
- Standard LaTeX math commands
- AMS math extensions
- Complex equations and formulas
- Matrices and arrays

### XY-pic Diagrams
- Commutative diagrams
- Category theory diagrams
- Graph theory visualizations
- Custom arrow styles and labels

## Examples

https://mathxyjax3.pages.dev/

### Basic Mathematics
```javascript
// Fractions
mathjax.tex2svgHtml('\\frac{a}{b}');

// Integrals
mathjax.tex2svgHtml('\\int_{-\\infty}^{\\infty} e^{-x^2} dx');

// Matrices
mathjax.tex2svgHtml('\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}');
```

### XY-pic Diagrams
```javascript
// Simple commutative diagram
mathjax.tex2svgHtml('\\xymatrix{A \\ar[r]^f \\ar[d]_g & B \\ar[d]^h \\\\ C \\ar[r]_k & D}');

// Category theory
mathjax.tex2svgHtml('\\xymatrix@1{\\bullet \\ar@/^/[rr]^{f} \\ar@/_/[rr]_{g} && \\bullet}');
```

## Dependencies

- **MathJax 3**: Core mathematical rendering engine
- **XyJax-v3**: XY-pic extension for diagram rendering
- **esbuild**: Fast JavaScript bundler
- **xmldom-sre**: XML DOM implementation
- **wicked-good-xpath**: XPath support

## Related Projects

- [MathJax](https://www.mathjax.org/) - The core rendering engine
- [XyJax](https://github.com/sonoisa/XyJax-v3) - XY-pic extension
- [xy-pic](https://xy-pic.sourceforge.net/) - Original xy-pic package

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- [Issues](https://github.com/tani/mathxyjax3/issues)
- [Discussions](https://github.com/tani/mathxyjax3/discussions)

## Author

TANIGUCHI Masaya
