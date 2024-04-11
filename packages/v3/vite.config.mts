/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';

const envs = loadEnv('production', process.cwd(), 'VITE');

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  plugins: [
    vue(),
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
      entry: {
        main: resolve(__dirname, './src/main.ts'),
        composables: resolve(__dirname, './src/composables/index.ts'),
        keys: resolve(__dirname, './src/keys/index.ts'),
      },
      name: 'GmapVue',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
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
