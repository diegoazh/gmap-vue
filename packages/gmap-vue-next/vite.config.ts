import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import VitePluginStyleInject from 'vite-plugin-style-inject';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePluginStyleInject()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist/lib',
    lib: {
      entry: resolve(__dirname, './src/main.ts'),
      name: 'GmapVue',
      fileName: (format) => `main.${format}.js`,
      formats: ['cjs', 'es', 'iife', 'umd'],
    },
    rollupOptions: {
      external: ['vue', '@googlemaps/markerclusterer', 'google.maps'],
      output: {
        globals: {
          vue: 'Vue',
          '@googlemaps/markerclusterer': 'MarkerClusterer',
          'google.maps': 'google.maps',
        },
      },
    },
    minify: false,
  },
});
