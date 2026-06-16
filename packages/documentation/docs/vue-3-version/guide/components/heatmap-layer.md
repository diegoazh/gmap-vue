---
id: heatmap-layer
sidebar_position: 11
sidebar_label: Heatmap Layer
---

# Heatmap Layer

`GmvHeatmapLayer` renders a Google Maps `visualization.HeatmapLayer` on a `GmvMap`. Use it when you need to visualize point density or weighted point intensity over an existing map.

The component is exported as `HeatmapLayer` from `@gmap-vue/v3/components` and registered by the plugin as `GmvHeatmapLayer`.

## Basic usage

`GmvHeatmapLayer` must be inside a `GmvMap`, or receive a `map-key` that points to a map promise.

```vue title="HeatmapLayerExample.vue" showLineNumbers
<script setup lang="ts">
import { useGoogleMapsApiPromiseLazy } from "@gmap-vue/v3/composables";
import { onMounted, ref } from "vue";

const center = { lat: 37.7749, lng: -122.4194 };
const googleMapsApiPromise = useGoogleMapsApiPromiseLazy();
const heatmapData = ref<google.maps.visualization.HeatmapLayerOptions["data"]>([]);

onMounted(async () => {
  const googleApi = await googleMapsApiPromise;
  if (!googleApi) return;

  heatmapData.value = [
    { location: new googleApi.maps.LatLng(37.782, -122.447), weight: 3 },
    { location: new googleApi.maps.LatLng(37.782, -122.445), weight: 2 },
    new googleApi.maps.LatLng(37.774, -122.419),
  ];
});
</script>

<template>
  <GmvMap :center="center" :zoom="13" style="width: 100%; height: 500px">
    <GmvHeatmapLayer :data="heatmapData" :opacity="0.7" />
  </GmvMap>
</template>
```

The component imports the Google `visualization` library internally with `google.maps.importLibrary('visualization')`.

## Configure intensity and appearance

Use heatmap props for common Google HeatmapLayer options.

```vue showLineNumbers
<template>
  <GmvMap :center="center" :zoom="12" style="width: 100%; height: 500px">
    <GmvHeatmapLayer
      :data="heatmapData"
      :dissipating="true"
      :gradient="['rgba(0, 255, 255, 0)', 'rgba(0, 255, 255, 1)', 'blue']"
      :max-intensity="5"
      :opacity="0.65"
    />
  </GmvMap>
</template>
```

The current wrapper prop for the heatmap radius-like source field is named `number`. Do not use `radius` as a direct prop unless the component source adds it. If you need to pass Google HeatmapLayer options that are not represented by explicit props, use `options`.

```vue showLineNumbers
<GmvHeatmapLayer :data="heatmapData" :options="{ radius: 24 }" />
```

## React to data changes

Changing the `data` prop calls `heatmapLayer.setData(value)` and emits `data_changed` with the new data value.

```vue showLineNumbers
<script setup lang="ts">
import { useGoogleMapsApiPromiseLazy } from "@gmap-vue/v3/composables";
import { ref } from "vue";

const center = { lat: 37.7749, lng: -122.4194 };
const googleMapsApiPromise = useGoogleMapsApiPromiseLazy();
const heatmapData = ref<google.maps.visualization.HeatmapLayerOptions["data"]>([]);

async function replaceData() {
  const googleApi = await googleMapsApiPromise;
  if (!googleApi) return;

  heatmapData.value = [new googleApi.maps.LatLng(37.782, -122.447)];
}
</script>

<template>
  <button @click="replaceData">Replace heatmap data</button>

  <GmvMap :center="center" :zoom="13" style="width: 100%; height: 500px">
    <GmvHeatmapLayer :data="heatmapData" @data_changed="console.log($event)" />
  </GmvMap>
</template>
```

## Access the Google instance

Use `heatmap-key` with `useHeatmapLayerPromise` when you need direct access to the underlying `google.maps.visualization.HeatmapLayer` instance.

```vue showLineNumbers
<script setup lang="ts">
import { useHeatmapLayerPromise } from "@gmap-vue/v3/composables";

const heatmapKey = "traffic-density";
const heatmapLayerPromise = useHeatmapLayerPromise(heatmapKey);

async function hideHeatmap() {
  const heatmap = await heatmapLayerPromise;
  heatmap?.setMap(null);
}
</script>

<template>
  <GmvMap :center="{ lat: 37.7749, lng: -122.4194 }" :zoom="13" style="width: 100%; height: 500px">
    <GmvHeatmapLayer :heatmap-key="heatmapKey" :data="[]" />
  </GmvMap>

  <button @click="hideHeatmap">Hide heatmap</button>
</template>
```

## Gotchas

- `GmvHeatmapLayer` needs a parent `GmvMap` or a valid `map-key`.
- `data_changed` is emitted when the Vue `data` prop changes and the wrapper calls `setData()`.
- `options` is spread after explicit props, so it can override wrapper-provided values.
- The current wrapper prop is named `number`; use `options` for Google options such as `radius` when needed.
- Use a unique `heatmapKey` for every simultaneously mounted heatmap layer when you use composable access.

## Related pages

- [Heatmap Layer API](/docs/vue-3-version/api/components/heatmap-layer)
- [Map guide](/docs/vue-3-version/guide/components/map)
- [Google HeatmapLayer reference](https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayer)
