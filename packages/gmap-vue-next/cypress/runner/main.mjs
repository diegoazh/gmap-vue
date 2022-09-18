import App from './components/App.vue';

const { createApp } = window.Vue;

window.app = createApp(App).use(GmapVue, {
  load: {
    key: 'AIzaSyCpPM3Ig06oSO1GOs0QGir5cIqwK3XRe_4'
  }
});

window.app.mount('#app');
