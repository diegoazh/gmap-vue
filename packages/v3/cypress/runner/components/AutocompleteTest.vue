<template>
  <div id="root">
    <h1>Autocomplete Example</h1>
    <label v-if="ready">
      AutoComplete
      <gmv-autocomplete
        id="autocomplete"
        name="autocomplete"
        placeholder="find a place..."
        @place_changed="setPlace"
      ></gmv-autocomplete>
      <br />
    </label>
    <button
      id="use-place-btn"
      v-if="ready"
      @click="usePlace"
      :style="{ backgroundColor: 'teal', color: 'white' }"
    >
      Change map center using place
    </button>
    <br />
    <br />
    <gmv-map class="map" :zoom="4" :center="center" mapId="DEMO_MAP_ID">
      <gmv-marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
      ></gmv-marker>
    </gmv-map>
  </div>
</template>
<script setup lang="ts">
import { useMapPromise } from '../../../dist/composables.es';
import { onMounted, ref, toRaw } from 'vue';

const mapPromise = useMapPromise();
const ready = ref<boolean>(false);
const map = ref<google.maps.Map | undefined>();
const center = ref<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
const markers = ref<{ position: { lat: number; lng: number } }[]>([]);
const place = ref<google.maps.places.PlaceResult | null>(null);

function setPlace(p: google.maps.places.PlaceResult) {
  place.value = p;
  console.log(toRaw(place.value));
}
function usePlace() {
  if (place.value) {
    const lat = place.value?.geometry?.location?.lat();
    const lng = place.value?.geometry?.location?.lng();

    if (lat != null && lng != null) {
      markers.value.push({
        position: {
          lat,
          lng,
        },
      });

      center.value = {
        lat,
        lng,
      };

      map.value?.panTo({ lat, lng });
      place.value = null;
    }
  }
}

onMounted(async () => {
  console.log(mapPromise);
  mapPromise.then((map) => {
    map.value = map;
    ready.value = true;
  });
  // map.value = await mapPromise;
  // ready.value = true;
});
</script>
<style scoped>
.map {
  height: 50vh;
  width: 50vw;
}
</style>
