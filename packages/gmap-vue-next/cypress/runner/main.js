import {createApp} from 'vue';
import GmapVue from '../../dist/main.es';
import App from './components/MapTest.vue';

window.app = createApp(App)
  .use(GmapVue, {
    load: {
      key: '',
    },
  })
  .mount('#app');
