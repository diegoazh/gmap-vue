<template>
  <GmvMap
    ref="mapRef"
    class="map"
    :center="center"
    :zoom="7"
    mapId="DEMO_MAP_ID"
    mapKey="firstMap"
  >
    <!-- <GmvInfoWindow
      :content="'<strong style=\'color:black\'>Marker 1</strong>'"
      :marker="markerRef?.markerInstance"
      :opened="infoWinOpen"
      :position="{ lat: 1.0, lng: 100.0 }"
      @closeclick="toggleInfoWindow"
    /> -->
    <GmvMarker
      v-if="mapRef"
      ref="markerRef"
      :position="{ lat: 1.0, lng: 100.0 }"
      @click="toggleInfoWindow"
    />
  </GmvMap>

  <br />
  <br />

  <GmvMap
    ref="mapRef2"
    class="map"
    :center="center"
    :zoom="7"
    mapId="DEMO_MAP_ID"
    :options="{ recycle: 'secondMap' }"
  >
    <!-- <GmvInfoWindow
      :content="'<strong style=\'color:black\'>Marker 1</strong>'"
      :marker="markerRef2?.markerInstance"
      :opened="infoWinOpen"
      :position="center"
      @closeclick="toggleInfoWindow"
    /> -->
    <GmvMarker
      v-if="mapRef2"
      ref="markerRef2"
      :position="center"
      @click="toggleInfoWindow"
    />
  </GmvMap>
</template>
<script setup lang="ts">
import type { MapLayer, Marker } from '@gmap-vue/v3/components';
import { useMapPromise } from '@gmap-vue/v3/composables';
import { ComponentInstance, onMounted, ref } from 'vue';

const mapRef = ref<ComponentInstance<typeof MapLayer> | null>(null);
const mapRef2 = ref<ComponentInstance<typeof MapLayer> | null>(null);
const markerRef = ref<ComponentInstance<typeof Marker> | null>(null);
const markerRef2 = ref<ComponentInstance<typeof Marker> | null>(null);
const infoWinOpen = ref<boolean>(false);
const mapPromise = useMapPromise('firstMap');
const mapPromise2 = useMapPromise('secondMap');
const center = {
  lat: 1.32,
  lng: 103.8,
};

function toggleInfoWindow() {
  console.log('clicked...', infoWinOpen.value);
  infoWinOpen.value = !infoWinOpen.value;
}

onMounted(() => {
  mapPromise?.then((map) => {
    if (map) {
      setTimeout(() => {
        map.panTo({ lat: 1.0, lng: 100.0 });
        console.log(mapRef.value?.getRecycleKey());
        console.log(mapRef2.value?.getRecycleKey());
      }, 2000);
    }
  });
  mapPromise2?.then((map) => {
    if (map) {
      setTimeout(() => {
        map.panTo({ lat: 1.0, lng: 100.0 });
        console.log(mapRef.value?.getRecycleKey());
        console.log(mapRef2.value?.getRecycleKey());
      }, 2000);
    }
  });
});
</script>
<style scoped>
.map {
  height: 50vh;
  width: 50vw;
}
</style>
