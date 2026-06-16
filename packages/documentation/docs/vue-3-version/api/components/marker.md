---
id: marker
sidebar_position: 3
sidebar_label: Marker
---

# Marker

:::info Official sources

- [Advanced Marker guide](https://developers.google.com/maps/documentation/javascript/advanced-markers/overview)
- [AdvancedMarkerElement reference](https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElement)

:::

`GmvMarker` wraps `google.maps.marker.AdvancedMarkerElement`. It uses `google.maps.importLibrary("marker")`, so document and configure it as an Advanced Marker, not as legacy `google.maps.Marker`.

The component is exported as `Marker` from `@gmap-vue/v3/components` and registered by the plugin as `GmvMarker`.

## Props

```ts title="Marker props interface" showLineNumbers
export interface MarkerProps {
  collisionBehavior?: google.maps.CollisionBehavior;
  content?: HTMLElement;
  gmpClickable?: boolean;
  gmpDraggable?: boolean;
  position?:
    | google.maps.LatLng
    | google.maps.LatLngLiteral
    | google.maps.LatLngAltitude
    | google.maps.LatLngAltitudeLiteral;
  title?: string;
  zIndex?: number;
  markerKey?: string;
  clusterKey?: string;
  mapKey?: string;
  options?: Record<string, unknown>;
}
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `collisionBehavior` | `google.maps.CollisionBehavior` | `undefined` | Advanced Marker collision behavior. |
| `content` | `HTMLElement` | `undefined` | DOM content passed to the Advanced Marker options. Verify mount timing when passing Vue-owned elements. |
| `gmpClickable` | `boolean` | `true` | Enables Advanced Marker click behavior. This is part of the Google Advanced Marker beta surface. |
| `gmpDraggable` | `boolean` | `false` | Enables marker dragging. |
| `position` | `google.maps.LatLng \| google.maps.LatLngLiteral \| google.maps.LatLngAltitude \| google.maps.LatLngAltitudeLiteral` | `undefined` | Marker position. |
| `title` | `string` | `undefined` | Accessibility text and hover title. |
| `zIndex` | `number` | `undefined` | Marker stacking order. |
| `markerKey` | `string` | `undefined` | Promise key used by `useMarkerPromise(key)`. |
| `clusterKey` | `string` | `undefined` | Cluster promise key used when adding the marker to a specific cluster. |
| `mapKey` | `string` | `undefined` | Map promise key used when the marker is not a direct descendant of `GmvMap`. |
| `options` | `Record<string, unknown>` | `undefined` | Fallback for Google Advanced Marker options not yet represented by explicit props. |

## Map and cluster resolution

When `mapKey` is provided, the component injects that map promise. Without `mapKey`, it finds the parent `GmvMap` instance.

When `clusterKey` is provided, the component uses that cluster promise. Without `clusterKey`, it can find a parent `GmvCluster`. Clustered markers are created without a map and are added to the clusterer.

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `click` | `google.maps.MapMouseEvent` | Standard marker click event. |
| `drag` | `google.maps.MapMouseEvent` | Fired while dragging. |
| `dragstart` | `google.maps.MapMouseEvent` | Fired when dragging starts. |
| `dragend` | `google.maps.MapMouseEvent` | Fired when dragging ends. |
| `gmp-click` | `google.maps.marker.AdvancedMarkerClickEvent` | Advanced Marker click event. |
| `update:position` | `{ lat?: number; lng?: number }` | Fired after `dragend` with the marker's current position. |

## Exposed properties

| Property | Type | Description |
| --- | --- | --- |
| `markerPromise` | `Promise<google.maps.marker.AdvancedMarkerElement \| undefined>` | Resolves to the underlying Advanced Marker instance. |
| `VNodeMarkerIcon` | `VNode \| undefined` | Internal vnode used when marker content participates in parent-child component behavior. |

```vue showLineNumbers
<script setup lang="ts">
import { Marker } from "@gmap-vue/v3/components";
import { ref } from "vue";

const markerRef = ref<InstanceType<typeof Marker> | null>(null);

async function readMarker() {
  const marker = await markerRef.value?.markerPromise;
  console.log(marker?.position);
}
</script>

<template>
  <GmvMap
    :center="{ lat: -34.6037, lng: -58.3816 }"
    :zoom="13"
    style="width: 100%; height: 500px"
  >
    <GmvMarker
      ref="markerRef"
      :position="{ lat: -34.6037, lng: -58.3816 }"
      title="Marker"
    />
  </GmvMap>

  <button @click="readMarker">Read marker</button>
</template>
```

## Related APIs

- [`useMarkerPromise`](/docs/vue-3-version/api/composables#usemarkerpromise)
- [Marker guide](/docs/vue-3-version/guide/components/marker)
- [InfoWindow guide](/docs/vue-3-version/guide/components/info-window)
