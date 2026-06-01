/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';

const envs = loadEnv('production', process.cwd(), 'VITE');

const LIBRARY_ENTRIES = {
  main: resolve(__dirname, './src/main.ts'),
  components: resolve(__dirname, './src/components/index.ts'),
  composables: resolve(__dirname, './src/composables/index.ts'),
  keys: resolve(__dirname, './src/keys/index.ts'),
};

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    dts({
      outDir: 'dist/types',
      tsconfigPath: resolve('./tsconfig.app.json'),
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: LIBRARY_ENTRIES,
      name: 'GmapVue',
      fileName: (format, entryName) => {
        if (format === 'cjs') {
          return `${entryName}.cjs`;
        }

        return `${entryName}.es.js`;
      },
      cssFileName: 'style',
      formats: ['cjs', 'es'],
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
    minify: envs['VITE_IS_LOCAL_BUILD'] !== '1',
  },
});
