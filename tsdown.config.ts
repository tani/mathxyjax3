import { defineConfig } from 'tsdown';
import Replace from 'unplugin-replace/rollup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  platform: 'browser',
  target: 'es2024',
  minify: true,
  sourcemap: true,
  outDir: 'dist',
  dts: true,
  banner: {
    js: 'const global = globalThis; const process = { env: {} };',
  },
  plugins: [
    Replace({
      values: [
        {
          find: /eval\("require"\)/g,
          replacement: 'globalThis.MathJax_require',
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
        {
          find: /versionWarnings:!0/g,
          replacement: 'versionWarnings:!1',
        },
      ],
    }),
  ],
});
