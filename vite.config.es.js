import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  esbuild: false,
  build: {
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      formats: ['es'],
      name: 'pillarbox',
      entry: './build.js'
    },
    rollupOptions: {
      external: ['video.js', 'videojs-contrib-eme'],
      output: {
        entryFileNames: 'pillarbox.es.js'
      },
      plugins: [babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      })]
    }
  }
});
