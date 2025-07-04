import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  esbuild: false,
  build: {
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      formats: ['cjs'],
      name: 'pillarbox',
      entry: './build.js'
    },
    rollupOptions: {
      external: ['video.js', 'videojs-contrib-eme'],
      output: {
        entryFileNames: 'pillarbox.cjs',
        exports: 'named'
      },
      plugins: [babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      })]
    }
  }
});
