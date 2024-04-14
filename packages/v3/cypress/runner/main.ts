/// <reference types="vite/client" />
import { createApp } from 'vue';
import { createGmapVuePlugin } from '../../dist/main.es';
import App from './components/App.vue';
import '@gmap-vue/v3/dist/style.css';

declare global {
  interface Window {
    google: typeof google;

    [key: string | number | symbol]: any;
  }
}

window.app = createApp(App)
  .use(
    createGmapVuePlugin({
      excludeEventsOnAllComponents() {
        return ['mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup'];
      },
      load: {
        key: import.meta.env.VITE_GOOGLE_API_KEY,
        libraries: 'places,visualization,drawing',
        mapIds: ['DEMO_MAP_ID'],
      },
    }),
  )
  .mount('#app');
