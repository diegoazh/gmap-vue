---
id: drawing-manager
sidebar_position: 10
sidebar_label: Drawing Manager
---

# Drawing Manager

:::danger Legacy and version-dependent

`GmvDrawingManager` wraps the Google Maps JavaScript API Drawing Library. Google removed `DrawingManager` from Maps JavaScript API v3.65+, so this component is only useful for legacy environments where Google still serves the `drawing` library.

For new apps, prefer editable Maps shapes, the Data layer with GeoJSON, or a third-party drawing library such as [Terra Draw](https://terradraw.io/).

:::

`GmvDrawingManager` attaches a Google `google.maps.drawing.DrawingManager` to a `GmvMap`. It imports the Google `drawing` library internally and rejects `drawingManagerPromise` with `GmapVueDrawingLibraryUnavailableError` when the library is unavailable.

The component is exported as `DrawingManager` from `@gmap-vue/v3/components` and registered by the plugin as `GmvDrawingManager`.

## Props

```ts title="DrawingManager props interface" showLineNumbers
export interface DrawingManagerProps {
  circleOptions?: google.maps.CircleOptions;
  drawingControl?: boolean;
  drawingControlOptions?: google.maps.drawing.DrawingControlOptions;
  drawingMode?: google.maps.drawing.OverlayType | null;
  markerOptions?: google.maps.marker.AdvancedMarkerElementOptions;
  polygonOptions?: google.maps.PolygonOptions;
  polylineOptions?: google.maps.PolylineOptions;
  rectangleOptions?: google.maps.RectangleOptions;
  position?:
    | 'TOP_CENTER'
    | 'TOP_LEFT'
    | 'TOP_RIGHT'
    | 'LEFT_TOP'
    | 'RIGHT_TOP'
    | 'LEFT_CENTER'
    | 'RIGHT_CENTER'
    | 'LEFT_BOTTOM'
    | 'RIGHT_BOTTOM'
    | 'BOTTOM_CENTER'
    | 'BOTTOM_LEFT'
    | 'BOTTOM_RIGHT';
  drawingModes?: google.maps.drawing.OverlayType[];
  shapes?: google.maps.drawing.OverlayCompleteEvent[];
  drawingKey?: string;
  mapKey?: string;
  options?: Record<string, unknown>;
}
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `circleOptions` | `google.maps.CircleOptions` | `undefined` | Options for drawn circles. |
| `drawingControl` | `boolean` | `true` | Shows the built-in Google drawing control. Forced to `false` when the component has a default slot. |
| `drawingControlOptions` | `google.maps.drawing.DrawingControlOptions` | `undefined` | Google drawing control options. |
| `drawingMode` | `google.maps.drawing.OverlayType \| null` | `null` | Current drawing mode. |
| `markerOptions` | `google.maps.marker.AdvancedMarkerElementOptions` | `undefined` | Options for drawn markers according to wrapper typings. Legacy Google library behavior may differ by Maps version. |
| `polygonOptions` | `google.maps.PolygonOptions` | `undefined` | Options for drawn polygons. |
| `polylineOptions` | `google.maps.PolylineOptions` | `undefined` | Options for drawn polylines. |
| `rectangleOptions` | `google.maps.RectangleOptions` | `undefined` | Options for drawn rectangles. |
| `position` | Drawing control position string | `undefined` | Control position, such as `TOP_CENTER` or `RIGHT_TOP`. |
| `drawingModes` | `google.maps.drawing.OverlayType[]` | `undefined` | Toolbar drawing modes. |
| `shapes` | `google.maps.drawing.OverlayCompleteEvent[]` | `undefined` | User-owned tracked shapes array. |
| `drawingKey` | `string` | `undefined` | Promise key used by `useDrawingPromise(key)`. |
| `mapKey` | `string` | `undefined` | Map promise key used when the component is not a direct descendant of `GmvMap`. |
| `options` | `Record<string, unknown>` | `undefined` | Fallback for Google DrawingManager options. Spread after explicit props, so it can override them. |

The wrapper watches `drawingControlOptions`, `position`, `drawingModes`, and the shape option props and forwards updates with `drawingManager.setOptions()`.

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `circlecomplete` | `google.maps.Circle` | Emitted when Google completes a circle. |
| `markercomplete` | `google.maps.marker.AdvancedMarkerElement` | Emitted when Google completes a marker according to wrapper typings. |
| `polygoncomplete` | `google.maps.Polygon` | Emitted when Google completes a polygon. |
| `polylinecomplete` | `google.maps.Polyline` | Emitted when Google completes a polyline. |
| `rectanglecomplete` | `google.maps.Rectangle` | Emitted when Google completes a rectangle. |
| `update:shapes` | `google.maps.drawing.OverlayCompleteEvent[]` | Emitted with a new shapes array after the wrapper appends a completed overlay. Enables `v-model:shapes`. |
| `added:shape` | `google.maps.drawing.OverlayCompleteEvent` | Emitted when the wrapper appends a completed shape. |
| `removed:shape` | `google.maps.drawing.OverlayCompleteEvent` | Intended to emit when the wrapper removes a tracked selected shape. Current source has edge cases; do not rely on this event as the only source of truth. |

The wrapper listens to Google's `overlaycomplete` internally, appends the completed overlay event to `shapes`, emits `added:shape`, and emits `update:shapes` with the new array. The wrapper does not currently re-emit `overlaycomplete` as a Vue event.

## Slots

When a default slot is present, the built-in drawing control is disabled. The slot receives methods for custom controls.

| Slot prop | Type | Description |
| --- | --- | --- |
| `set-drawing-mode` | `(mode: google.maps.drawing.OverlayType \| null) => void` | Sets the current drawing mode. |
| `delete-selection` | `() => void` | Deletes the currently selected shape when possible. Current removal events have edge cases; keep app state defensive. |

`clearAll()` is not a slot prop. Use a component ref for that method.

## Exposed properties and methods

| Exposed member | Type | Description |
| --- | --- | --- |
| `drawingManagerPromise` | `Promise<google.maps.drawing.DrawingManager \| undefined>` | Resolves to the underlying Google DrawingManager instance, or rejects with `GmapVueDrawingLibraryUnavailableError` when the Drawing Library is unavailable. |
| `setDrawingMode(mode)` | `(mode: google.maps.drawing.OverlayType \| null) => void` | Sets the current drawing mode. |
| `deleteSelection()` | `() => void` | Deletes the currently selected shape when possible. Current removal events have edge cases; keep app state defensive. |
| `clearAll()` | `() => void` | Removes tracked shapes from the map. It does not emit a replacement `shapes` array. |

`drawingManagerInstance` appears in an interface type but is not exposed by the current Vue component implementation.

```vue showLineNumbers
<script setup lang="ts">
import { DrawingManager } from '@gmap-vue/v3/components';
import { ref } from 'vue';

const drawingRef = ref<InstanceType<typeof DrawingManager> | null>(null);

function clearShapes() {
  drawingRef.value?.clearAll();
}
</script>

<template>
  <GmvMap :center="{ lat: 37.7749, lng: -122.4194 }" :zoom="12" style="width: 100%; height: 500px">
    <GmvDrawingManager ref="drawingRef" />
  </GmvMap>

  <button @click="clearShapes">Clear all</button>
</template>
```

## Composable access

Use `useDrawingPromise(key?)` when direct component refs are inconvenient. Pair a custom key with the component's `drawing-key` prop.

```ts showLineNumbers
import { useDrawingPromise } from '@gmap-vue/v3/composables';

const drawingManagerPromise = useDrawingPromise('legacy-drawing-manager');
```

For one drawing manager, the key is optional and defaults to the shared `$drawingManagerPromise` key. Use a unique `drawingKey` for every simultaneously mounted drawing manager.

## Related APIs

- [Drawing Manager guide](/docs/vue-3-version/guide/components/drawing-manager)
- [`useDrawingPromise`](/docs/vue-3-version/api/composables#usedrawingpromise)
- [Google Drawing Library documentation](https://developers.google.com/maps/documentation/javascript/drawinglayer)
