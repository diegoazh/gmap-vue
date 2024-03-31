import { createApp } from 'vue';
import { createGmapVuePlugin } from '../../dist/main.es';
import App from './components/App.vue';
import '@gmap-vue/v3/dist/style.css';

window.app = createApp(App)
  .use(
    createGmapVuePlugin({
      excludeEventsOnAllComponents() {
        return ['mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup'];
      },
      load: {
        key: import.meta.env.VITE_GOOGLE_API_KEY,
        libraries: 'places,visualization,drawing',
      },
    }),
  )
  .mount('#app');
