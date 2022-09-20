<template>
  <div class="container-flex">
    <aside>
      <ul>
        <li>
          <button @click="loadMap">Map</button>
        </li>
      </ul>
    </aside>
    <main>
      <MapTest />
<!--      <component v-if="component" :is="component"></component>-->
    </main>
  </div>
</template>

<script>
import MapTest from '@/components/MapTest.vue';

export default {
  name: 'App',
  data() {
    return {
      component: null
    };
  },
  methods: {
    loadMap() {
      this.component = 'map-test';
    }
  },
  components: {
    MapTest,
  }
};
</script>

<style lang="stylus" scoped>
.container-flex {
  display: flex;

  aside {
    justify-content: center

    ul {
      list-style: none;

      li {
        float: left;
      }
    }
  }
}
</style>
