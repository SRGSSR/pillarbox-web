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
      entry: './build.js'
    },
    rollupOptions: {
      output: [
        {
          name: 'srgssr',
          entryFileNames: 'pillarbox.umd.min.js',
          format: 'umd',
          exports: 'named',
          plugins: [terser()]
        },
        {
          name: 'srgssr',
          entryFileNames: 'pillarbox.umd.js',
          exports: 'named',
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
