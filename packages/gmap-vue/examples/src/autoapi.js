import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import AutoAPI from './AutoAPI.vue';

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-new -- should be analyzed later
  new Vue({
    el: '#app',
    render(h) {
      return h(AutoAPI);
    },
  });
});
