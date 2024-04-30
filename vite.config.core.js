import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  esbuild: false,
  build: {
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      name: 'pillarbox',
      entry: './src/pillarbox.js'
    },
    rollupOptions: {
      external: ['video.js', 'videojs-contrib-eme'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name]-core.es.js'
        },
        {
          format: 'cjs',
          entryFileNames: '[name]-core.cjs.js'
        }
      ],
      plugins: [babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      })]
    }
  }
});
