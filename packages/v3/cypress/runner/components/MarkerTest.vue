<template>
  <button id="visibility2" type="button" @click="visible2 = !visible2">
    {{ btnTxt2 }}
  </button>
  <button id="empty" type="button" @click="empty = !empty">
    {{ btnTxt3 }}
  </button>
  <br /><br />
  <gmv-map
    :center="center"
    :zoom="6"
    style="width: 100%; height: 500px"
    mapId="DEMO_MAP_ID"
  >
    <gmv-marker
      v-for="(m, i) in markers"
      :key="i"
      :clickable="true"
      :draggable="true"
      :position="m.position"
      @click="center = m.position"
    ></gmv-marker>
    <gmv-marker
      v-if="visible2"
      :key="i"
      :clickable="true"
      :draggable="true"
      :position="markers2[0].position"
      @click="center = markers2[0].position"
    ></gmv-marker>
    <gmv-marker
      v-if="visible2"
      :key="i"
      :clickable="true"
      :draggable="true"
      :position="markers2[1].position"
      @click="center = markers2[1].position"
    ></gmv-marker>
  </gmv-map>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
      visible2: true,
      empty: false,
      center: {
        lat: 10.0,
        lng: 10.0,
      },
      markers2: [
        {
          position: {
            lat: 12.0,
            lng: 12.0,
          },
        },
        {
          position: {
            lat: 13.0,
            lng: 13.0,
          },
        },
      ],
    };
  },
  computed: {
    btnTxt2() {
      return this.visible2 ? 'Hide markers' : 'Show markers';
    },
    btnTxt3() {
      return this.empty ? 'Empty the markers array' : 'Fill the markers array';
    },
    markers() {
      if (this.empty) {
        return [];
      }

      return [
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
      ];
    },
  },
};
</script>
