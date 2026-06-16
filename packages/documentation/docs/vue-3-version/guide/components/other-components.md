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
| `GmvKmlLayer` | You need to render a KML source supported by Google Maps. | Read the [KML Layer guide](./kml-layer.md). |
| `GmvHeatmapLayer` | You need density visualization over a set of weighted points. | Read the [Heatmap Layer guide](./heatmap-layer.md). |
| `GmvCluster` | You need to group many markers visually. | Read the [Cluster guide](./cluster.md). |
| `GmvStreetViewPanorama` | You need an embedded standalone Street View panorama. | Read the [Street View Panorama guide](./street-view-panorama.md). |
| `GmvDrawingManager` | You maintain an app that still depends on the old Drawing Library. | Read the [Drawing Manager legacy guide](./drawing-manager.md). |

## Optional Google Maps library preloading

Some components use optional Google Maps libraries. The wrappers import those libraries internally, but you can still list them in your loader configuration when you want to make dependencies explicit or preload them.

```ts title="main.ts"
createGmapVuePlugin({
  load: {
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: "places,visualization",
  },
});
```

| Feature | Library |
| --- | --- |
| `GmvAutocomplete` | `places` |
| `GmvHeatmapLayer` | `visualization` |
| `GmvDrawingManager` | `drawing`, only for legacy environments where Google still serves the removed Drawing Library |

`GmvMarker` imports the Google Maps `marker` library internally. `GmvInfoWindow`, `GmvKmlLayer`, and the shape components (`GmvCircle`, `GmvPolygon`, `GmvPolyline`, and `GmvRectangle`) import the Google Maps `maps` library internally. `GmvHeatmapLayer` imports the Google Maps `visualization` library internally. `GmvStreetViewPanorama` imports the Google Maps `streetView` library internally. `GmvCluster` uses the package dependency `@googlemaps/markerclusterer`.

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
- Use the [Cluster guide](./cluster.md) when you need to group many markers visually.
- Use the [InfoWindow guide](./info-window.md) when you need contextual content anchored to a marker or position.
- Use the shape guides for overlays: [Circle](./circle.md), [Polygon](./polygon.md), [Polyline](./polyline.md), and [Rectangle](./rectangle.md).
- Use the [Heatmap Layer guide](./heatmap-layer.md) for density visualizations.
- Use the [KML Layer guide](./kml-layer.md) for public KML/KMZ/GeoRSS sources.
- Use the [Street View Panorama guide](./street-view-panorama.md) when Street View is the primary UI.
- Use the [Drawing Manager legacy guide](./drawing-manager.md) only when maintaining apps that still depend on Google's removed Drawing Library.
- Use the [map reference guide](../basic-usage/map-reference.md) when you need direct map instance access.
- Use the [API reference](/docs/vue-3-version/api/components) when you need supported component exports.
