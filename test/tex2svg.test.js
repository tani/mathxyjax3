import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { tex2svgHtml } from '../dist/index.js';

describe('tex2svgHtml', () => {
  test('renders simple math expression', () => {
    const result = tex2svgHtml('x^2 + y^2 = z^2');
    assert(result.includes('<svg'), 'Result should contain SVG tag');
    assert(result.includes('</svg>'), 'Result should close SVG tag');
    assert(result.includes('mjx-container'), 'Result should contain mjx-container');
  });

  test('renders fractions correctly', () => {
    const result = tex2svgHtml('\\frac{1}{2}');
    assert(result.includes('<svg'), 'Result should contain SVG tag');
    assert(result.includes('</svg>'), 'Result should close SVG tag');
  });

  test('renders Greek letters', () => {
    const result = tex2svgHtml('\\alpha + \\beta = \\gamma');
    assert(result.includes('<svg'), 'Result should contain SVG tag');
    assert(result.includes('</svg>'), 'Result should close SVG tag');
  });

  test('renders matrices', () => {
    const result = tex2svgHtml('\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}');
    assert(result.includes('<svg'), 'Result should contain SVG tag');
    assert(result.includes('</svg>'), 'Result should close SVG tag');
  });

  test('renders integrals', () => {
    const result = tex2svgHtml('\\int_0^1 x^2 dx');
    assert(result.includes('<svg'), 'Result should contain SVG tag');
    assert(result.includes('</svg>'), 'Result should close SVG tag');
  });

  test('includes style element', () => {
    const result = tex2svgHtml('a + b');
    assert(result.includes('<style'), 'Result should contain style tag');
    assert(result.includes('</style>'), 'Result should close style tag');
  });

  test('handles display mode (default true)', () => {
    const result = tex2svgHtml('x = y');
    assert(result.includes('display="block"'), 'Default display mode should be block');
  });

  test('handles inline mode when display is false', () => {
    const result = tex2svgHtml('x = y', { display: false });
    assert(result.includes('display="inline"'), 'Should have display="inline" in inline mode');
  });

  test('handles empty input', () => {
    const result = tex2svgHtml('');
    assert(result.includes('<svg'), 'Empty input should still produce SVG');
    assert(result.includes('</svg>'), 'Empty input should have closing SVG tag');
  });

  test('handles undefined input with default empty string', () => {
    const result = tex2svgHtml();
    assert(result.includes('<svg'), 'Undefined input should produce SVG');
    assert(result.includes('</svg>'), 'Undefined input should have closing SVG tag');
  });

  test('handles complex equation', () => {
    const result = tex2svgHtml('E = mc^2 + \\sum_{i=1}^{n} \\frac{\\partial f}{\\partial x_i}');
    assert(result.includes('<svg'), 'Complex equation should produce SVG');
    assert(result.includes('</svg>'), 'Complex equation should have closing SVG tag');
  });

  test('handles XyJax commands', () => {
    const result = tex2svgHtml('\\xymatrix{ A \\ar[r] & B }');
    assert(result.includes('<svg'), 'XyJax command should produce SVG');
    assert(result.includes('</svg>'), 'XyJax command should have closing SVG tag');
  });

  test('preserves display option when explicitly set to true', () => {
    const result = tex2svgHtml('x^2', { display: true });
    assert(result.includes('display="block"'), 'Should preserve display mode when set to true');
  });

  test('handles LaTeX environments', () => {
    const result = tex2svgHtml('\\begin{align} x &= 1 \\\\ y &= 2 \\end{align}');
    assert(result.includes('<svg'), 'LaTeX environment should produce SVG');
    assert(result.includes('</svg>'), 'LaTeX environment should have closing SVG tag');
  });

  test('handles special characters', () => {
    const result = tex2svgHtml('\\sqrt{2} \\approx 1.414');
    assert(result.includes('<svg'), 'Special characters should produce SVG');
    assert(result.includes('</svg>'), 'Special characters should have closing SVG tag');
  });
});
