<template>
  <div class="container-flex">
    <aside>
      <ul>
        <li>
          <button name="map" @click="loadTestComponent('MapTest')">Map</button>
        </li>
        <li>
          <button name="marker" @click="loadTestComponent('MarkerTest')">
            Marker
          </button>
        </li>
      </ul>
    </aside>
    <br />
    <main>
      <component :is="component" v-if="component"></component>
    </main>
  </div>
</template>

<script>
import MapTest from '@/components/MapTest.vue';
import MarkerTest from '@/components/MarkerTest.vue';

export default {
  name: 'App',
  data() {
    return {
      component: null,
    };
  },
  methods: {
    loadTestComponent(component) {
      this.component = component;
    },
  },
  components: {
    MapTest,
    MarkerTest,
  },
};
</script>

<style lang="stylus" scoped>
.container-flex {
  display: flex;
  flex-direction: column;

  aside {
    justify-content: center;

    ul {
      list-style: none;
      align-items: center;

      li {
        float: left;
      }
    }
  }
}
</style>
