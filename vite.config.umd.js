import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  esbuild: false,
  build: {
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      name: 'pillarbox',
      entry: './build.umd.js'
    },
    rollupOptions: {
      output: [
        {
          name: 'Pillarbox',
          entryFileNames: 'pillarbox.umd.min.js',
          format: 'umd',
          plugins: [terser()]
        },
        {
          name: 'Pillarbox',
          entryFileNames: 'pillarbox.umd.js',
          format: 'umd',
        }
      ],
      plugins: [babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      })]
    }
  }
});
