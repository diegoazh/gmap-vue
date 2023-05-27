<template>
  <gmv-map :center="center" :zoom="7" style="width: 100%; height: 500px">
    <gmv-marker
      v-for="(m, i) in markers"
      :key="i"
      :clickable="true"
      :draggable="true"
      :position="m.position"
      @click="center = m.position"
    ></gmv-marker>
  </gmv-map>
</template>

<script>
export default {
  data() {
    return {
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
};
</script>
