---
id: heatmap-layer
sidebar_position: 11
sidebar_label: Heatmap Layer
---

# Heatmap Layer

:::info Official sources

- [Heatmap Layer guide](https://developers.google.com/maps/documentation/javascript/heatmaplayer)
- [HeatmapLayer reference](https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayer)
- [HeatmapLayerOptions reference](https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions)

:::

`GmvHeatmapLayer` wraps `google.maps.visualization.HeatmapLayer`. It attaches to a parent `GmvMap` or to the map identified by `map-key`.

The component is exported as `HeatmapLayer` from `@gmap-vue/v3/components` and registered by the plugin as `GmvHeatmapLayer`.

## Required Google Maps library

The component imports the Visualization library internally:

```ts showLineNumbers
const { HeatmapLayer } = (await google.maps.importLibrary(
  'visualization',
)) as google.maps.VisualizationLibrary;
```

## Props

```ts title="HeatmapLayer props interface" showLineNumbers
export interface HeatmapLayerProps {
  data?:
    | (google.maps.LatLng | google.maps.visualization.WeightedLocation)[]
    | google.maps.MVCArray<
        google.maps.LatLng | google.maps.visualization.WeightedLocation
      >;
  dissipating?: boolean;
  gradient?: string[];
  maxIntensity?: number;
  opacity?: number;
  number?: number;
  heatmapKey?: string;
  mapKey?: string;
  options?: Record<string, unknown>;
}
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `(google.maps.LatLng \| google.maps.visualization.WeightedLocation)[] \| google.maps.MVCArray<google.maps.LatLng \| google.maps.visualization.WeightedLocation>` | `undefined` | Heatmap points or weighted points. |
| `dissipating` | `boolean` | `undefined` | Whether heatmap intensity dissipates on zoom. |
| `gradient` | `string[]` | `undefined` | Color gradient CSS color strings. |
| `maxIntensity` | `number` | `undefined` | Maximum heatmap intensity. |
| `opacity` | `number` | `0.6` | Layer opacity. |
| `number` | `number` | `undefined` | Current wrapper prop name forwarded by the source. Use `options` for Google options such as `radius` when needed. |
| `heatmapKey` | `string` | `undefined` | Promise key used by `useHeatmapLayerPromise(key)`. |
| `mapKey` | `string` | `undefined` | Map promise key used when the layer is not a direct descendant of `GmvMap`. |
| `options` | `Record<string, unknown>` | `undefined` | Fallback for Google HeatmapLayer options not represented by explicit props. Spread after explicit props, so it can override them. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `data_changed` | New `data` value | Emitted by the wrapper when the Vue `data` prop changes and `setData(value)` is called. |

This is not a `v-model` update.

## Exposed properties

| Property | Type | Description |
| --- | --- | --- |
| `heatmapLayerPromise` | `Promise<google.maps.visualization.HeatmapLayer \| undefined>` | Resolves to the underlying Google HeatmapLayer instance. |

```vue showLineNumbers
<script setup lang="ts">
import { HeatmapLayer } from '@gmap-vue/v3/components';
import { ref } from 'vue';

const heatmapRef = ref<InstanceType<typeof HeatmapLayer> | null>(null);

async function hideHeatmap() {
  const heatmap = await heatmapRef.value?.heatmapLayerPromise;
  heatmap?.setMap(null);
}
</script>

<template>
  <GmvMap :center="{ lat: 37.7749, lng: -122.4194 }" :zoom="13" style="width: 100%; height: 500px">
    <GmvHeatmapLayer ref="heatmapRef" :data="[]" />
  </GmvMap>

  <button @click="hideHeatmap">Hide heatmap</button>
</template>
```

## Composable access

Use `useHeatmapLayerPromise(key?)` when direct component refs are inconvenient.

```ts showLineNumbers
import { useHeatmapLayerPromise } from '@gmap-vue/v3/composables';

const heatmapLayerPromise = useHeatmapLayerPromise('traffic-density');
```

For one heatmap layer, the key is optional and defaults to the shared `$heatmapLayerPromise` key. Use a unique `heatmapKey` for every simultaneously mounted heatmap layer when you need direct instance access.

## Related APIs

- [Heatmap Layer guide](/docs/vue-3-version/guide/components/heatmap-layer)
- [`useHeatmapLayerPromise`](/docs/vue-3-version/api/composables#useheatmaplayerpromise)
- [Map API](/docs/vue-3-version/api/components/map)
