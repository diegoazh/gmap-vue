<template>
  <div>
    <gmv-map :center="center" :zoom="7" style="width: 100%; height: 500px">
      <gmv-cluster>
        <gmv-marker
          v-for="(m, index) in markers"
          :key="index"
          :clickable="true"
          :draggable="true"
          :position="m.position"
          @click="center = m.position"
        ></gmv-marker>
      </gmv-cluster>
    </gmv-map>
  </div>
</template>

<script>
import GmapVue from '../../../dist/main.es';

const {
  components: { Cluster },
} = GmapVue;

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
  components: {
    GmvCluster: Cluster,
  },
};
</script>
