---
id: other-components
title: Other components
sidebar_label: Other components
---

# Other Vue 3 components

Start with `GmvMap`, then add only the Google Maps features your screen needs. This page gives you the practical role of each component before you jump into dedicated guides or API details.

## Component overview

| Component | Use it when | Next step |
| --- | --- | --- |
| `GmvMarker` | You need an Advanced Marker point on the map that can react to clicks, drag, join clusters, or anchor an info window. | Read the [Marker guide](./marker.md). |
| `GmvInfoWindow` | You need contextual content anchored to a marker or position. | Read the [InfoWindow guide](./info-window.md). |
| `GmvAutocomplete` | You need a Places-powered search input. | Read the [Autocomplete guide](./autocomplete.md). |
| `GmvCircle` | You need a radius around a point. | Read the [Circle guide](./circle.md). |
| `GmvPolygon` | You need a filled area with one or more paths. | Read the [Polygon guide](./polygon.md). |
| `GmvPolyline` | You need a path without a filled area. | Read the [Polyline guide](./polyline.md). |
| `GmvRectangle` | You need a rectangular bounds overlay. | Read the [Rectangle guide](./rectangle.md). |
| `GmvKmlLayer` | You need to render a KML source supported by Google Maps. | The source must be publicly reachable by Google. |
| `GmvHeatmapLayer` | You need density visualization over a set of weighted points. | Requires the `visualization` library in the Google Maps loader options. |
| `GmvCluster` | You need to group many markers visually. | Uses `@googlemaps/markerclusterer` under the hood. |
| `GmvStreetViewPanorama` | You need an embedded Street View panorama. | Use when Street View is the primary UI, not only a map control. |
| `GmvDrawingManager` | You maintain an app that still depends on the old Drawing Library. | The Google Maps Drawing Library was removed in Maps JavaScript API v3.65, prefer custom drawing UX for new work. |

## Loading required Google Maps libraries

Some components require optional Google Maps libraries. Add them to the plugin `load.libraries` option.

```ts title="main.ts"
createGmapVuePlugin({
  load: {
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: "places,visualization",
  },
});
```

| Feature | Required library |
| --- | --- |
| `GmvAutocomplete` | `places` |
| `GmvHeatmapLayer` | `visualization` |
| `GmvDrawingManager` | `drawing`, only for environments where the removed Drawing Library is still available |

`GmvMarker` imports the Google Maps `marker` library internally. `GmvInfoWindow` and the shape components (`GmvCircle`, `GmvPolygon`, `GmvPolyline`, and `GmvRectangle`) import the Google Maps `maps` library internally.

## Access component instances

Use composables when you need the underlying Google Maps object after a component is mounted.

```vue title="MarkerExample.vue" showLineNumbers
<script setup lang="ts">
import { useMapPromise, useMarkerPromise } from "@gmap-vue/v3/composables";

const mapKey = "main-map";
const markerKey = "office-marker";
const mapPromise = useMapPromise(mapKey);
const markerPromise = useMarkerPromise(markerKey);

async function focusMarker() {
  const [map, marker] = await Promise.all([mapPromise, markerPromise]);
  if (!map || !marker?.position) return;

  map.panTo(marker.position);
}
</script>

<template>
  <GmvMap
    :map-key="mapKey"
    :center="{ lat: 47.3763, lng: 8.5475 }"
    :zoom="13"
    style="width: 100%; height: 500px"
  >
    <GmvMarker
      :marker-key="markerKey"
      :position="{ lat: 47.3763, lng: 8.5475 }"
      title="Office"
    />
  </GmvMap>

  <button @click="focusMarker">Focus marker</button>
</template>
```

Prefer component props and events for normal Vue state updates. Reach for `use*Promise` only when you need a Google Maps instance method that is not represented as a Vue prop or event yet.

## Next steps

- Use the [map guide](./map.md) for the base map setup.
- Use the [Marker guide](./marker.md) when you need points, draggable markers, or direct marker access.
- Use the [InfoWindow guide](./info-window.md) when you need contextual content anchored to a marker or position.
- Use the shape guides for overlays: [Circle](./circle.md), [Polygon](./polygon.md), [Polyline](./polyline.md), and [Rectangle](./rectangle.md).
- Use the [map reference guide](../basic-usage/map-reference.md) when you need direct map instance access.
- Use the [API reference](/docs/vue-3-version/api/components) when you need supported component exports.
