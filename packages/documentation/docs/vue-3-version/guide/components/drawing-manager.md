---
id: drawing-manager
sidebar_position: 10
sidebar_label: Drawing Manager
---

# Drawing Manager

:::danger Legacy and version-dependent

`GmvDrawingManager` wraps the Google Maps JavaScript API Drawing Library. Google removed `DrawingManager` from Maps JavaScript API v3.65+, so this component is only useful for legacy environments where Google still serves the `drawing` library.

Do not choose this component for new drawing UX. Prefer editable map shapes, the Data layer with GeoJSON, or a third-party drawing library such as [Terra Draw](https://terradraw.io/).

:::

`GmvDrawingManager` attaches drawing controls to a `GmvMap`. It is exported as `DrawingManager` from `@gmap-vue/v3/components` and registered by the plugin as `GmvDrawingManager`.

The component calls `google.maps.importLibrary('drawing')`. If Google no longer provides the Drawing Library, `drawingManagerPromise` rejects with `GmapVueDrawingLibraryUnavailableError` and the component logs an actionable migration message.

## Legacy map usage

Use this only when your deployed Google Maps JavaScript API version still supports the Drawing Library.

```vue title="LegacyDrawingManagerExample.vue" showLineNumbers
<script setup lang="ts">
import { ref } from 'vue';

const center = { lat: 37.7749, lng: -122.4194 };
const shapes = ref<google.maps.drawing.OverlayCompleteEvent[]>([]);
const drawingModes = [
  'circle',
  'polygon',
  'polyline',
  'rectangle',
] as google.maps.drawing.OverlayType[];
</script>

<template>
  <GmvMap :center="center" :zoom="12" style="width: 100%; height: 500px">
    <GmvDrawingManager v-model:shapes="shapes" :drawing-modes="drawingModes" />
  </GmvMap>
</template>
```

`v-model:shapes` works through the `update:shapes` event. When Google completes a drawing, the wrapper appends the completed overlay event to the shapes array and emits `added:shape` plus `update:shapes`. Your app owns that state.

:::warning
Do not assume that adding `drawing` to `load.libraries` makes this work on Maps JavaScript API v3.65+. Google removed the library from current Maps versions.
:::

## Custom controls slot

When you provide a default slot, the built-in Google drawing toolbar is disabled. The slot receives `set-drawing-mode` and `delete-selection` methods.

```vue showLineNumbers
<template>
  <GmvMap :center="center" :zoom="12" style="width: 100%; height: 500px">
    <GmvDrawingManager v-model:shapes="shapes">
      <template #default="{ setDrawingMode, deleteSelection }">
        <div class="drawing-toolbar">
          <button @click="setDrawingMode('polygon')">Polygon</button>
          <button @click="setDrawingMode('rectangle')">Rectangle</button>
          <button @click="setDrawingMode(null)">Stop drawing</button>
          <button @click="deleteSelection()">Delete selected shape</button>
        </div>
      </template>
    </GmvDrawingManager>
  </GmvMap>
</template>
```

Use `clearAll()` from a component ref when you need to remove all tracked shapes from code.

## Access the DrawingManager instance

Use a component ref for exposed methods, or `drawing-key` with `useDrawingPromise` when you need direct access to the Google `DrawingManager` instance.

```vue showLineNumbers
<script setup lang="ts">
import { DrawingManager } from '@gmap-vue/v3/components';
import { useDrawingPromise } from '@gmap-vue/v3/composables';
import { ref } from 'vue';

const drawingKey = 'legacy-drawing-manager';
const drawingRef = ref<InstanceType<typeof DrawingManager> | null>(null);
const drawingManagerPromise = useDrawingPromise(drawingKey);

async function stopDrawing() {
  drawingRef.value?.setDrawingMode(null);

  const drawingManager = await drawingManagerPromise;
  drawingManager?.setDrawingMode(null);
}

function clearShapes() {
  drawingRef.value?.clearAll();
}
</script>

<template>
  <GmvMap :center="{ lat: 37.7749, lng: -122.4194 }" :zoom="12" style="width: 100%; height: 500px">
    <GmvDrawingManager ref="drawingRef" :drawing-key="drawingKey" />
  </GmvMap>

  <button @click="stopDrawing">Stop drawing</button>
  <button @click="clearShapes">Clear all</button>
</template>
```

Use a unique `drawingKey` for each simultaneously mounted drawing manager.

## Migration guidance

For new apps, do not build product UX around `GmvDrawingManager`. Consider:

- `GmvPolygon`, `GmvPolyline`, `GmvCircle`, and `GmvRectangle` with `editable` enabled.
- The Google Maps Data layer and GeoJSON when your app stores geographic features.
- A maintained third-party drawing library such as Terra Draw.

## Gotchas

- This component depends on Google's removed Drawing Library and may reject its promise at runtime.
- It must attach to a `GmvMap` or to a map identified by `map-key`.
- The default slot disables the built-in drawing control and receives only `set-drawing-mode` and `delete-selection`.
- `clearAll()` is exposed through component refs, not through the slot. It removes tracked overlays from the map, but it does not emit a replacement `shapes` array.
- `drawingManagerInstance` is not exposed by the current component implementation.
- Marker-related typings follow the wrapper source, but the legacy Google Drawing Library may behave differently across versions.
- `deleteSelection()` has current edge cases around emitted removal state; keep your own shape state defensive if you rely on deletion events.

## Related pages

- [Drawing Manager API](/docs/vue-3-version/api/components/drawing-manager)
- [Shape guides](/docs/vue-3-version/guide/components/circle)
- [Google Drawing Library deprecation notice](https://developers.google.com/maps/documentation/javascript/drawinglayer)
