import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import * as GmapVue from '../../src/main';
import App from './app.vue';

Vue.use(GmapVue, {
  installComponents: true,
  load: {
    key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc',
    libraries: 'places',
  },
});

// json filter is now not bundled with vue
Vue.filter('json', (x) => JSON.stringify(x));

// TODO: Should be analyzed when we start with the test issue
// eslint-disable-next-line no-new -- should be analyzed
new Vue({
  el: '#root',
  components: {
    myApp: App,
  },
});
