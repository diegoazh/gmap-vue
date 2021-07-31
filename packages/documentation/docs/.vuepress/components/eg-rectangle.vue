<template>
  <div>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width: 100%; height: 500px"
      ref="map"
    >
      <gmap-rectangle
        :editable="editable"
        :draggable="draggable"
        :bounds="bounds"
        ref="rectangle"
      >
      </gmap-rectangle>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "eg-rectangle",
  data() {
    return {
      center: { lat: 1.38, lng: 103.8 },
      editable: true,
      draggable: true,
      bounds: {
        north: 33.685,
        south: 33.671,
        east: -116.234,
        west: -116.251
      }
    };
  }
};
</script>

<style lang="css" scoped></style>
