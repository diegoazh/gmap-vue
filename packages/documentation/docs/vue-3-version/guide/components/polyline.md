---
id: polyline
sidebar_position: 7
sidebar_label: Polyline
---

# Polyline

`GmvPolyline` renders a Google Maps `Polyline` overlay on a `GmvMap`. Use it for routes, tracks, paths, boundaries without fill, and measured lines.

The component is exported as `Polyline` from `@gmap-vue/v3/components` and registered by the plugin as `GmvPolyline`.

## Basic polyline

Pass `path` as Google Maps coordinates and style the stroke.

```vue showLineNumbers
<script setup lang="ts">
const center = { lat: -34.6037, lng: -58.3816 };
const path = [
  { lat: -34.59, lng: -58.39 },
  { lat: -34.6037, lng: -58.3816 },
  { lat: -34.615, lng: -58.37 },
];
</script>

<template>
  <GmvMap :center="center" :zoom="13" style="width: 100%; height: 500px">
    <GmvPolyline
      :path="path"
      stroke-color="#d32f2f"
      :stroke-opacity="0.9"
      :stroke-weight="4"
    />
  </GmvMap>
</template>
```

## Editable path

Set `editable` when users should reshape the line. The component emits `path_changed` from Google Maps MVC path mutations.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from "vue";

const center = { lat: -34.6037, lng: -58.3816 };
const path = ref([
  { lat: -34.59, lng: -58.39 },
  { lat: -34.6037, lng: -58.3816 },
  { lat: -34.615, lng: -58.37 },
]);

function handlePathChanged(path: google.maps.MVCArray<google.maps.LatLng>) {
  console.log("polyline path changed", path);
}
</script>

<template>
  <GmvMap :center="center" :zoom="13" style="width: 100%; height: 500px">
    <GmvPolyline
      :path="path"
      :editable="true"
      :deep-watch="true"
      @path_changed="handlePathChanged"
    />
  </GmvMap>
</template>
```

`deepWatch` controls the Vue watcher depth for the `path` prop. `path_changed` is not `v-model`; update your own state from the Google MVC path data when you need persistence.

## Geodesic lines and icons

Use `geodesic` for great-circle segments and `icons` for line symbols supported by Google Maps.

```vue showLineNumbers
<template>
  <GmvPolyline
    :path="path"
    :geodesic="true"
    :icons="icons"
    stroke-color="#1976d2"
  />
</template>
```

## Access the polyline instance

Use `polyline-key` with `usePolylinePromise` only when you need a method from the underlying `google.maps.Polyline` instance.

```vue showLineNumbers
<script setup lang="ts">
import { usePolylinePromise } from "@gmap-vue/v3/composables";

const polylineKey = "route-line";
const polylinePromise = usePolylinePromise(polylineKey);

async function readPathLength() {
  const polyline = await polylinePromise;
  console.log(polyline?.getPath().getLength());
}
</script>

<template>
  <GmvMap :center="{ lat: -34.6037, lng: -58.3816 }" :zoom="13" style="width: 100%; height: 500px">
    <GmvPolyline :polyline-key="polylineKey" :path="[]" />
  </GmvMap>

  <button @click="readPathLength">Read path length</button>
</template>
```

## Gotchas

- `GmvPolyline` imports the Google Maps `maps` library internally with `google.maps.importLibrary("maps")`.
- `clickable` and `visible` default to `true`; `draggable`, `editable`, `geodesic`, and `deepWatch` default to `false`.
- `options` is spread after explicit props, so values in `options` can override prop-derived Google Maps options.
- `path_changed` is emitted from Google Maps MVC path mutations, not from Vue `v-model`.

## Related pages

- [Polyline API](/docs/vue-3-version/api/components/polyline)
- [Map guide](/docs/vue-3-version/guide/components/map)
- [Google Polyline reference](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline)
