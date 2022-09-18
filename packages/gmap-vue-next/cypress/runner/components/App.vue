<template>
  <div class="container-flex">
    <aside>
      <ul>
        <li>Map</li>
      </ul>
    </aside>
    <main>
      <div :is="component"></div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      component: null
    };
  },
  components: {}
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
