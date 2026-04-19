import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [tailwindcss()],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        archive: resolve(__dirname, 'archive.html'),
        synced: resolve(__dirname, 'projects/synced.html'),
        vect0r: resolve(__dirname, 'projects/vect0r.html'),
        epitaph: resolve(__dirname, 'projects/epitaph-1997.html'),
        flashlight: resolve(__dirname, 'projects/flashlight.html'),
        vamp: resolve(__dirname, 'projects/vamp.html'),
        judge: resolve(__dirname, 'projects/judge.html'),
        inciteInfiltrate: resolve(__dirname, 'projects/incite-infiltrate.html'),
        pico8: resolve(__dirname, 'projects/pico8-prototypes.html'),
        doom: resolve(__dirname, 'projects/doom-e1m1.html'),
        vect0rLd: resolve(__dirname, 'projects/vect0r-ld.html'),
        epitaphLd: resolve(__dirname, 'projects/epitaph-1997-ld.html'),
        zhuangZhou: resolve(__dirname, 'projects/zhuang-zhou-ld.html'),
        portal2: resolve(__dirname, 'projects/portal2-light-bridge-ld.html')
      }
    }
  },
  server: {
    port: 5173,
    open: true,
    fs: { strict: false }
  }
});
