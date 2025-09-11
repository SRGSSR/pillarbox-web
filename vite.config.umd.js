import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const outroScript = `
window.pillarbox = pillarbox;
window.videojs = window.pillarbox;
`.trim();

export default defineConfig({
  esbuild: false,
  build: {
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      name: 'pillarbox',
      entry: './build.js'
    },
    rollupOptions: {
      output: [
        {
          name: 'srgssr',
          entryFileNames: 'pillarbox.umd.min.js',
          exports: 'named',
          format: 'umd',
          outro: outroScript,
          plugins: [terser()]
        },
        {
          name: 'srgssr',
          entryFileNames: 'pillarbox.umd.js',
          exports: 'named',
          format: 'umd',
          outro: outroScript,
        }
      ],
      plugins: [babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      })]
    }
  }
});
