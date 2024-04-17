import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    server: {
      deps: {
        external: ['@googlemaps/markerclusterer', 'google.maps'],
      },
    },
    environment: 'happy-dom', // or 'happy-dom', 'jsdom', 'node'
    coverage: {
      provider: 'v8', // 'istanbul' or 'c8'
      reporter: ['text', 'json', 'html'],
    },
  },
});
