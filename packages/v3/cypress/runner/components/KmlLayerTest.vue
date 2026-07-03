<template>
  <div>
    <gmv-map
      :center="center"
      :zoom="11"
      style="width: 100%; height: 500px"
      map-id="DEMO_MAP_ID"
    >
      <gmv-kml-layer
        v-for="(l, i) in kmlLayers"
        :id="`kml-icon-${i + 1}`"
        :key="i"
        :clickable="true"
        :kml-key="`kml-layer-${i}`"
        :preserve-viewport="true"
        :url="l.url"
      />
    </gmv-map>
  </div>
</template>

<script setup lang="ts">
import { useKmlPromise } from '../../../dist/composables.es';
import { nextTick, onMounted } from 'vue';

type KmlLayerWindow = Window & {
  __gmvKmlLayerDebug__?: {
    isReady: boolean;
    url?: string;
  };
};

const center = {
  lat: 37.40289194122376,
  lng: 237.91539350810598,
};

const kmlLayers = [
  {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml',
  },
];

async function updateKmlLayerDebug(): Promise<void> {
  const kmlWindow = window as KmlLayerWindow;
  kmlWindow.__gmvKmlLayerDebug__ = { isReady: false };

  await nextTick();

  const kmlLayer = await useKmlPromise('kml-layer-0');
  kmlWindow.__gmvKmlLayerDebug__ = {
    isReady: kmlLayer != null,
    url: kmlLayer?.getUrl(),
  };
}

onMounted(updateKmlLayerDebug);
</script>
