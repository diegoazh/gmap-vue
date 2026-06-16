---
id: kml-layer
sidebar_position: 12
sidebar_label: KML Layer
---

# KML Layer

:::info Official sources

- [KML Layer guide](https://developers.google.com/maps/documentation/javascript/kmllayer)
- [KmlLayer reference](https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer)
- [KmlLayerOptions reference](https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions)

:::

`GmvKmlLayer` wraps `google.maps.KmlLayer`. It attaches to a parent `GmvMap` or to the map identified by `map-key`.

The component is exported as `KmlLayer` from `@gmap-vue/v3/components` and registered by the plugin as `GmvKmlLayer`.

## Props

```ts title="KmlLayer props interface" showLineNumbers
export interface KmlLayerProps {
  clickable?: boolean;
  preserveViewport?: boolean;
  screenOverlays?: boolean;
  suppressInfoWindows?: boolean;
  url?: string;
  zIndex?: number;
  kmlKey?: string;
  mapKey?: string;
  options?: Record<string, unknown>;
}
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `clickable` | `boolean` | `true` | Whether KML features receive click events. |
| `preserveViewport` | `boolean` | `false` | Prevents the map from moving to fit the KML content. |
| `screenOverlays` | `boolean` | `true` | Whether screen overlays are rendered. |
| `suppressInfoWindows` | `boolean` | `undefined` | Suppresses Google Maps default KML info windows. |
| `url` | `string` | `undefined` | Public KML/KMZ/GeoRSS URL to load. |
| `zIndex` | `number` | `undefined` | Layer stacking order. |
| `kmlKey` | `string` | `undefined` | Promise key used by `useKmlPromise(key)`. |
| `mapKey` | `string` | `undefined` | Map promise key used when the layer is not a direct descendant of `GmvMap`. |
| `options` | `Record<string, unknown>` | `undefined` | Fallback for Google KmlLayer options not represented by explicit props. Spread after explicit props, so it can override them. |

`clickable`, `preserveViewport`, `screenOverlays`, and `suppressInfoWindows` are passed into the layer options. The current wrapper does not bind those props reactively after creation.

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `click` | `google.maps.KmlMouseEvent` | Fired when a clickable KML feature is clicked. |

The component declares `defaultviewport_changed` and `status_changed` internally, but the current event binding helper skips `_changed` auto events and the component does not manually emit those events. Use the Google instance promise when you need to call methods such as `getDefaultViewport()` or `getStatus()`.

## Exposed properties

| Property | Type | Description |
| --- | --- | --- |
| `kmlLayerPromise` | `Promise<google.maps.KmlLayer \| undefined>` | Resolves to the underlying Google KmlLayer instance. |

```vue showLineNumbers
<script setup lang="ts">
import { KmlLayer } from '@gmap-vue/v3/components';
import { ref } from 'vue';

const kmlRef = ref<InstanceType<typeof KmlLayer> | null>(null);

async function logStatus() {
  const kmlLayer = await kmlRef.value?.kmlLayerPromise;
  console.log(kmlLayer?.getStatus());
}
</script>

<template>
  <GmvMap :center="{ lat: 41.8758, lng: -87.6189 }" :zoom="11" style="width: 100%; height: 500px">
    <GmvKmlLayer
      ref="kmlRef"
      url="https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml"
    />
  </GmvMap>

  <button @click="logStatus">Log status</button>
</template>
```

## Composable access

Use `useKmlPromise(key?)` when direct component refs are inconvenient.

```ts showLineNumbers
import { useKmlPromise } from '@gmap-vue/v3/composables';

const kmlLayerPromise = useKmlPromise('campus-kml');
```

For one KML layer, the key is optional and defaults to the shared `$kmlLayerPromise` key. Use a unique `kmlKey` for every simultaneously mounted KML layer when you need direct instance access.

## Related APIs

- [KML Layer guide](/docs/vue-3-version/guide/components/kml-layer)
- [`useKmlPromise`](/docs/vue-3-version/api/composables#usekmlpromise)
- [Map API](/docs/vue-3-version/api/components/map)
