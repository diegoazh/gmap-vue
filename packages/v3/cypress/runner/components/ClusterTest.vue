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
// to use with `pnpm run dev` import from '../../../src/main'
// to use with `pnpm run test:e2e` import from '../../../dist/main.es'
// to use with `pnpm run test:e2e:ci` import from '../../../dist/main.es'
import { Cluster } from '../../../dist/main.es';

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
