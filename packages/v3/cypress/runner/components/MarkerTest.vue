<template>
  <button type="button" @click="visible = !visible">{{ btnTxt }}</button>
  <br /><br />
  <gmv-map :center="center" :zoom="7" style="width: 100%; height: 500px">
    <gmv-marker
      v-for="(m, i) in markers"
      :key="i"
      :clickable="true"
      :draggable="true"
      :position="m.position"
      @click="center = m.position"
      :visible="visible"
    ></gmv-marker>
  </gmv-map>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
      center: {
        lat: 10.0,
        lng: 10.0,
      },
      markers: [
        {
          position: {
            lat: 10.0,
            lng: 10.0,
          },
        },
        {
          position: {
            lat: 11.0,
            lng: 11.0,
          },
        },
      ],
    };
  },
  computed: {
    btnTxt() {
      return this.visible ? 'Hide markers' : 'Show markers';
    },
  },
};
</script>
