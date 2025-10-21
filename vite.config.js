import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build : {
    rollupOptions : {
      input : {
        index: resolve(__dirname, 'index.html'),
        multi: resolve(__dirname, 'multi.html')
      }
    }
  }
});
