import esbuild from 'esbuild';
import replace from 'unplugin-replace/esbuild';

await esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2024',
  minify: false,
  sourcemap: true,
  outdir: 'dist',
  external: [],
  banner: { js: 'const global = globalThis; const process = { env: {} };' },
  plugins: [
    replace({
      values: [
        {
          find: /eval\("require"\)/g,
          replacement: "globalThis.MathJax_require",
        },
        {
          find: /typeof process/g,
          replacement: '"object"',
        },
        {
          find: /typeof window/g,
          replacement: '"undefined"',
        },
        {
          find: /typeof document/g,
          replacement: '"undefined"',
        },
      ]
    })
  ]
});
