import { createApp } from 'vue';
import GmapVue from '../../dist/main.es';
import App from './components/App.vue';

window.app = createApp(App)
  .use(GmapVue, {
    load: {
      key: import.meta.env.VITE_GOOGLE_API_KEY,
    },
  })
  .mount('#app');
