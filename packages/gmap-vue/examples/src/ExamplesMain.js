import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import VueRouter from 'vue-router';
import * as GmapVue from '../../dist/main';
import Examples from '../examples-index';
import ExamplePage from './ExamplePage.vue';
import ExamplePageDefault from './ExamplePageDefault.vue';
import ExamplesApp from './ExamplesApp.vue';

Vue.config.optionMergeStrategies.description = (a, b) => a || b;

Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc',
    libraries: 'places',
  },
});
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Examples.map((e) => ({
    path: `/${e.name}`,
    component: ExamplePage,
    name: e.name,
    props: {
      name: e.name,
      description: e.description,
      source: e.source,
      component: e.module,
    },
  })).concat([{ path: '/', component: ExamplePageDefault }]),
});

document.addEventListener('DOMContentLoaded', () => {
  new (Vue.extend(ExamplesApp))({ router }).$mount('#app');
});
