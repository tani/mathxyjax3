const modules = {
  'xmldom-sre': await import('@xmldom/xmldom'),
  'wicked-good-xpath': await import('wicked-good-xpath'),
  commander: {},
  fs: {},
} as const;

const require = <Key extends keyof typeof modules>(name: Key) => modules[name];

declare global {
  // MathJax attaches a custom loader that expects a CommonJS-like require.
  var MathJax_require: typeof require;
  var MathJax: any;
}

globalThis.MathJax_require = require;

const lazyModules = {
  'mathjax/es5/adaptors/liteDOM.js': () => import('mathjax/es5/adaptors/liteDOM.js'),
  'xyjax/build/xypic.js': () => import('xyjax/build/xypic.js'),
} as const;

const lazyRequire = (name: keyof typeof lazyModules) => lazyModules[name]();

globalThis.MathJax = {
  loader: {
    source: {},
    require: lazyRequire,
    load: [
      "adaptors/liteDOM",
      "[custom]/xypic"
    ],
    paths: {
      mathjax: "mathjax/es5",
      custom: "xyjax/build",
    },
  },
  tex: {
    packages: { "[+]": [ "xypic"] },
  },
  svg: {
    fontCache: "none",
  },
  startup: {
    typeset: false,
  },
};

await import('mathjax/es5/tex-svg-full.js');
await globalThis.MathJax.startup?.promise;

export interface Tex2SvgHtmlOptions {
  display?: boolean;
  [key: string]: unknown;
}

export function tex2svgHtml(math = '', options: Tex2SvgHtmlOptions = {}) {
  const node = globalThis.MathJax.tex2svg(math, { display: true, ...options });
  const adaptor = globalThis.MathJax.startup.adaptor;
  const style = adaptor.textContent(globalThis.MathJax.svgStylesheet());
  const html = adaptor.outerHTML(node);
  const id = `mjx-${Math.random().toString(16).substring(8)}`;
  return `
    <span id="${id}">
      <style>
      #${id}{
        display:contents;
        mjx-assistive-mml {
          user-select: text !important;
          clip: auto !important;
          color: rgba(0,0,0,0);
        }
        ${style}
      }
      </style>
      ${html}
    </span>
  `;
}
