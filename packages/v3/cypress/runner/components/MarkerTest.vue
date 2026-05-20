<template>
  <button id="visibility2" type="button" @click="toggleVisible2">
    {{ btnTxt2 }}
  </button>
  <button id="empty" type="button" @click="toggleEmpty">
    {{ btnTxt3 }}
  </button>
  <br /><br />
  <gmv-map
    :center="center"
    :zoom="6"
    style="width: 100%; height: 500px"
    map-id="DEMO_MAP_ID"
  >
    <gmv-marker
      v-for="(m, i) in markers"
      :key="i"
      :clickable="true"
      :draggable="true"
      :position="m.position"
      :marker-key="`marker-${i}`"
      @click="center = m.position"
    />
    <gmv-marker
      v-if="visible2"
      :key="2"
      :clickable="true"
      :draggable="true"
      :position="markers2[0].position"
      :marker-key="`marker-2`"
      @click="center = markers2[0].position"
    />
    <gmv-marker
      v-if="visible2"
      :key="3"
      :clickable="true"
      :draggable="true"
      :position="markers2[1].position"
      :marker-key="`marker-3`"
      @click="center = markers2[1].position"
    />
  </gmv-map>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';

type MapMarkersWindow = Window & {
  __mapMarkers__?: string[];
  __gmvMarkerDebug__?: {
    expectedCount: number;
    isReady: boolean;
  };
};

const visible2 = ref(true);
const empty = ref(false);
const center = ref<google.maps.LatLngLiteral>({ lat: 10.0, lng: 10.0 });

const markers2 = [
  { position: { lat: 12.0, lng: 12.0 } },
  { position: { lat: 13.0, lng: 13.0 } },
];

const btnTxt2 = computed(() =>
  visible2.value ? 'Hide markers' : 'Show markers',
);
const btnTxt3 = computed(() =>
  empty.value ? 'Empty the markers array' : 'Fill the markers array',
);

const markers = computed(() => {
  if (empty.value) return [];
  return [
    { position: { lat: 10.0, lng: 10.0 } },
    { position: { lat: 11.0, lng: 11.0 } },
  ];
});

function getVisibleMarkerKeys(): string[] {
  const keys: string[] = [];
  if (!empty.value) {
    keys.push('marker-0', 'marker-1');
  }
  if (visible2.value) {
    keys.push('marker-2', 'marker-3');
  }

  return keys;
}

async function updateWindowMarkers(): Promise<void> {
  const markerWindow = window as MapMarkersWindow;
  markerWindow.__gmvMarkerDebug__ = {
    expectedCount: 0,
    isReady: false,
  };

  // Wait for Vue to finish rendering this reactive transition before exposing
  // marker counts to Cypress.
  await nextTick();

  const visibleMarkerKeys = getVisibleMarkerKeys();
  markerWindow.__mapMarkers__ = visibleMarkerKeys;
  markerWindow.__gmvMarkerDebug__ = {
    expectedCount: visibleMarkerKeys.length,
    isReady: true,
  };
}

async function toggleVisible2(): Promise<void> {
  visible2.value = !visible2.value;
  await updateWindowMarkers();
}

async function toggleEmpty(): Promise<void> {
  empty.value = !empty.value;
  await updateWindowMarkers();
}

onMounted(updateWindowMarkers);
</script>
