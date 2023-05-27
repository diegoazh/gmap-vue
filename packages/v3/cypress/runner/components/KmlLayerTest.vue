<template>
  <div>
    <gmv-map :center="center" :zoom="11" style="width: 100%; height: 500px">
      <gmv-kml-layer
        v-for="(l, i) in kmlLayers"
        :key="i"
        :clickable="true"
        :preserveViewport="true"
        :url="l.url"
      ></gmv-kml-layer>
    </gmv-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: {
        lat: 37.40289194122376,
        lng: 237.91539350810598,
      },
      kmlLayers: [
        {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml',
        },
      ],
    };
  },
};
</script>
