const modules = {
  "xmldom-sre": await import("xmldom-sre"),
  "wicked-good-xpath": await import("wicked-good-xpath"),
  "commander": {},
  "fs": {},
};

const require = name => modules[name];

globalThis.MathJax_require = require;

const lazyModules = {
  "mathjax/es5/adaptors/liteDOM.js": () => import("mathjax/es5/adaptors/liteDOM.js"),
  "xyjax/build/xypic.js": () => import("xyjax/build/xypic.js"),
};

const lazyRequire = name => lazyModules[name]();

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
    fontCache: "local",
  },
  startup: {
    typeset: false,
  },
};

await import("mathjax/es5/tex-svg-full.js");
await globalThis.MathJax.startup?.promise;

export function tex2svg(math = "", options = {}) {
  const node = globalThis.MathJax.tex2svg(math, { display: true, ... options });
  const adaptor = globalThis.MathJax.startup.adaptor;
  const style = adaptor.textContent(globalThis.MathJax.svgStylesheet());
  const html = adaptor.outerHTML(node);
  const id = 'mjx-'+Math.random().toString(16).substring(8)
  return `<div id=${id}><style>#${id}{display:contents;${style}}</style>${html}</div>`;
}
