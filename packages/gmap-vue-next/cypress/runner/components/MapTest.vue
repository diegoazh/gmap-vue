<template>
  <div>
    <h2>Test 1</h2>
    <ol>
      <li>You can pan around this map, and the center is updated.</li>
      <li>When you edit the lat/lng the map center is updated</li>
    </ol>

    <div>
      <small>
        <strong>Lat:</strong>
      </small>
      <input v-model.lazy.trim="reportedMapCenter.lat"
             step="0.00001"
             type="number"
             @change="sync"/>
      &nbsp;
      <small><strong>Lng:</strong></small>
      <input v-model.number.lazy="reportedMapCenter.lng"
             step="0.00001"
             type="number"
             @change="sync"/>
    </div>

    <br>

    <div class="flex-container">
      <div>
        <gmap-map :center="mapCenter"
                  :zoom="12"
                  class="map-container"
                  @center_changed="updateCenter"
                  @idle="sync">
        </gmap-map>
      </div>
      <div>
              <gmap-street-view-panorama
                ref="pano"
                :position="mapCenter"
                :pov="pov"
                class="map-container"
                @position_changed="updateCenter">
              </gmap-street-view-panorama>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapTest',
  data() {
    return {
      reportedMapCenter: {
        lat: 1.32,
        lng: 103.8
      },
      mapCenter: null,
      pov: {
        pitch: 0,
        heading: 0
      }
    };
  },
  onMounted() {
    this.sync();
  },
  methods: {
    updateCenter(latLng) {
      this.reportedMapCenter = {
        lat: latLng.lat(),
        lng: latLng.lng()
      };
    },
    sync() {
      this.mapCenter = this.reportedMapCenter;
    }
  }
};
</script>

<style lang="stylus" scoped>
.map-container {
  width: 400px;
  height: 400px;
  display: inline-block;
}

.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
