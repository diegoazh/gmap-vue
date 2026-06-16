---
id: marker
sidebar_position: 3
sidebar_label: Marker
---

# Marker

`GmvMarker` renders a Google Maps [Advanced Marker](https://developers.google.com/maps/documentation/javascript/advanced-markers/overview) on a `GmvMap`.

The component is exported as `Marker` from `@gmap-vue/v3/components` and registered by the plugin as `GmvMarker`.

## Basic usage

Place `GmvMarker` inside a `GmvMap`. The marker finds the parent map automatically.

```vue showLineNumbers
<script setup lang="ts">
const center = { lat: -34.6037, lng: -58.3816 };
</script>

<template>
  <GmvMap :center="center" :zoom="13" style="width: 100%; height: 500px">
    <GmvMarker :position="center" title="Buenos Aires" />
  </GmvMap>
</template>
```

`GmvMarker` uses `google.maps.importLibrary("marker")` and creates a `google.maps.marker.AdvancedMarkerElement`. Do not use legacy `google.maps.Marker` options unless the component explicitly supports them.

## React to marker clicks

Use Vue events for normal UI state.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from "vue";

const selected = ref(false);
const position = { lat: -34.6037, lng: -58.3816 };
</script>

<template>
  <GmvMap :center="position" :zoom="13" style="width: 100%; height: 500px">
    <GmvMarker
      :position="position"
      title="Open details"
      @click="selected = true"
      @gmp-click="selected = true"
    />
  </GmvMap>

  <p v-if="selected">Marker selected.</p>
</template>
```

`click` is the normal Maps event. `gmp-click` is the Advanced Marker event exposed by Google Maps for clickable advanced markers.

## Draggable marker

Set `gmp-draggable` and listen for `update:position`. The component emits `{ lat?: number; lng?: number }` after `dragend`.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from "vue";

const markerPosition = ref({ lat: -34.6037, lng: -58.3816 });

function updateMarkerPosition(position: { lat?: number; lng?: number }) {
  if (typeof position.lat === "number" && typeof position.lng === "number") {
    markerPosition.value = { lat: position.lat, lng: position.lng };
  }
}
</script>

<template>
  <GmvMap
    :center="markerPosition"
    :zoom="13"
    style="width: 100%; height: 500px"
  >
    <GmvMarker
      :position="markerPosition"
      gmp-draggable
      title="Drag me"
      @update:position="updateMarkerPosition"
    />
  </GmvMap>

  <pre>{{ markerPosition }}</pre>
</template>
```

## Access the marker instance

Prefer props and events first. Use `marker-key` and `useMarkerPromise` only when you need the underlying Google Advanced Marker instance.

```vue showLineNumbers
<script setup lang="ts">
import { useMarkerPromise } from "@gmap-vue/v3/composables";

const center = { lat: -34.6037, lng: -58.3816 };
const markerKey = "office-marker";
const markerPromise = useMarkerPromise(markerKey);

async function logMarkerPosition() {
  const marker = await markerPromise;
  console.log(marker?.position);
}
</script>

<template>
  <GmvMap :center="center" :zoom="13" style="width: 100%; height: 500px">
    <GmvMarker :marker-key="markerKey" :position="center" title="Office" />
  </GmvMap>

  <button @click="logMarkerPosition">Log marker position</button>
</template>
```

When a marker is not a direct child of the map, pass `map-key` so it can use the correct map promise.

## Marker content

Advanced markers can use custom DOM content through the `content` prop, which maps to `AdvancedMarkerElementOptions.content`.

The current component also accepts default slot content internally, but that slot is not assigned to the Google Advanced Marker `content` option. Do not rely on the default slot to render custom marker DOM until that behavior is explicitly supported by the component.

For most cases, start with the default Google pin plus `title`, `position`, and drag/click events. If you need custom DOM marker content, pass an `HTMLElement` through `content` and verify the mount timing in your app.

## Clustering note

`GmvMarker` can join a `GmvCluster` through a parent cluster component or a matching `cluster-key`. When clustered, the marker is created without a map and added to the clusterer.

Full clustering examples will live in dedicated cluster documentation. For now, use a stable `marker-key` for markers you need to access individually.

## Gotchas

- `GmvMarker` wraps `google.maps.marker.AdvancedMarkerElement`, not legacy `google.maps.Marker`.
- `gmpClickable` defaults to `true` and `gmpDraggable` defaults to `false`.
- `gmpClickable` is part of the Advanced Marker beta surface in Google Maps.
- `update:position` is emitted after `dragend`, not continuously while dragging.
- Use `map-key` when the marker cannot discover a parent `GmvMap`.
- Use `cluster-key` when the marker must join a specific cluster promise.

## Related pages

- [Marker API](/docs/vue-3-version/api/components/marker)
- [InfoWindow guide](/docs/vue-3-version/guide/components/info-window)
- [Map guide](/docs/vue-3-version/guide/components/map)
- [Google Advanced Markers](https://developers.google.com/maps/documentation/javascript/advanced-markers/overview)
