---
id: other-components
title: Other components
sidebar_label: Other components
---

# Other Vue 3 components

Start with `GmvMap`, then add only the Google Maps features your screen needs. This page gives you the practical role of each component before you jump into API details.

## Component overview

| Component | Use it when | Notes |
| --- | --- | --- |
| `GmvMarker` | You need a point on the map that can react to clicks or show an info window. | Use a stable `marker-key` when you need access through `useMarkerPromise`. |
| `GmvInfoWindow` | You need contextual content anchored to a marker or position. | Updating `position` or `marker` while open is supported in `@gmap-vue/v3@2.2.1` and newer. |
| `GmvCircle` | You need a radius around a point. | Useful for coverage, distance, or search areas. |
| `GmvPolygon` | You need a filled area with one or more paths. | Use for regions, zones, or custom boundaries. |
| `GmvPolyline` | You need a path without a filled area. | Use for routes, tracks, or measured lines. |
| `GmvRectangle` | You need a rectangular bounds overlay. | Use when your data is naturally represented as north, south, east, and west bounds. |
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
    libraries: 'places,visualization',
  },
});
```

| Feature | Required library |
| --- | --- |
| `GmvAutocomplete` | `places` |
| `GmvHeatmapLayer` | `visualization` |
| `GmvDrawingManager` | `drawing`, only for environments where the removed Drawing Library is still available |

## Access component instances

Use composables when you need the underlying Google Maps object after a component is mounted.

```vue title="MarkerExample.vue"
<script setup lang="ts">
import { useMarkerPromise } from '@gmap-vue/v3/composables';

async function focusMarker() {
  const marker = await useMarkerPromise('office-marker');
  marker?.map?.panTo(marker.position!);
}
</script>

<template>
  <GmvMarker marker-key="office-marker" :position="{ lat: 47.3763, lng: 8.5475 }" />
  <button @click="focusMarker">Focus marker</button>
</template>
```

Prefer component props and events for normal Vue state updates. Reach for `use*Promise` only when you need a Google Maps instance method that is not represented as a Vue prop or event yet.

## Next steps

- Use the [map guide](./map.md) for the base map setup.
- Use the [map reference guide](../basic-usage/map-reference.md) when you need direct map instance access.
- Use the [API reference](/docs/vue-3-version/api/components) when you need supported component exports.
