---
id: introduction
sidebar_position: 1
sidebar_label: Introduction
---

# Components entrypoint

Import Vue component objects from `@gmap-vue/v3/components` when you want to register only the components your app needs.

```ts showLineNumbers
import {
  Autocomplete,
  Circle,
  Cluster,
  DrawingManager,
  HeatmapLayer,
  InfoWindow,
  KmlLayer,
  MapLayer,
  Marker,
  Polygon,
  Polyline,
  Rectangle,
  StreetViewPanorama,
} from '@gmap-vue/v3/components';
```

## Exported components

| Export | Global plugin name | Purpose |
| --- | --- | --- |
| [`MapLayer`](./map.md) | `GmvMap` | Base Google Map component. |
| [`Marker`](./marker.md) | `GmvMarker` | Advanced Marker on the map. |
| [`InfoWindow`](./info-window.md) | `GmvInfoWindow` | Info window anchored to a marker or position. |
| [`Autocomplete`](./autocomplete.md) | `GmvAutocomplete` | Places autocomplete input wrapper. |
| [`Circle`](./circle.md) | `GmvCircle` | Circle overlay. |
| [`Polygon`](./polygon.md) | `GmvPolygon` | Polygon overlay. |
| [`Polyline`](./polyline.md) | `GmvPolyline` | Polyline overlay. |
| [`Rectangle`](./rectangle.md) | `GmvRectangle` | Rectangle overlay. |
| `KmlLayer` | `GmvKmlLayer` | KML layer. |
| `HeatmapLayer` | `GmvHeatmapLayer` | Heatmap layer. |
| `StreetViewPanorama` | `GmvStreetViewPanorama` | Street View panorama. |
| `Cluster` | `GmvCluster` | Marker clustering component. |
| `DrawingManager` | `GmvDrawingManager` | Legacy Drawing Library wrapper. |

## Typing component refs

These exports are Vue components, not Google Maps classes. When you need a component ref in TypeScript, use Vue component typing.

```ts showLineNumbers
import { ref } from 'vue';
import { MapLayer } from '@gmap-vue/v3/components';

const mapRef = ref<InstanceType<typeof MapLayer> | null>(null);
```

For direct Google Maps instances, prefer the composables from `@gmap-vue/v3/composables`, such as `useMapPromise` and `useMarkerPromise`.
