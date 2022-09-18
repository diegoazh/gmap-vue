import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(process.cwd(), __dirname),
  plugins: [
    vue(),
    // {
    //   name: 'static-js',
    //   apply: 'serve',
    //   enforce: 'pre',
    //   resolveId(source, importer) {
    //     if (source.endsWith('main.umd.js')) {
    //       return '\ufeff' + source;
    //     }
    //   },
    // },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  build: {
    outDir: './dist',
    rollupOptions: {
      external: ['vue', 'google.maps'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    minify: false,
  },
});
