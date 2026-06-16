---
id: polygon
sidebar_position: 6
sidebar_label: Polygon
---

# Polygon

`GmvPolygon` renders a Google Maps `Polygon` overlay on a `GmvMap`. Use it for zones, regions, service areas, boundaries, and any filled shape defined by one or more paths.

The component is exported as `Polygon` from `@gmap-vue/v3/components` and registered by the plugin as `GmvPolygon`.

## Basic polygon

Pass `paths` as Google Maps coordinates and style the fill/stroke.

```vue showLineNumbers
<script setup lang="ts">
const center = { lat: -34.6037, lng: -58.3816 };
const paths = [
  { lat: -34.595, lng: -58.39 },
  { lat: -34.603, lng: -58.371 },
  { lat: -34.615, lng: -58.384 },
];
</script>

<template>
  <GmvMap :center="center" :zoom="13" style="width: 100%; height: 500px">
    <GmvPolygon
      :paths="paths"
      fill-color="#2e7d32"
      :fill-opacity="0.25"
      stroke-color="#1b5e20"
      :stroke-weight="2"
    />
  </GmvMap>
</template>
```

## Editable paths

Set `editable` when users should reshape the polygon. The component emits `paths_changed` from Google Maps MVC path mutations.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from "vue";

const center = { lat: -34.6037, lng: -58.3816 };
const paths = ref([
  { lat: -34.595, lng: -58.39 },
  { lat: -34.603, lng: -58.371 },
  { lat: -34.615, lng: -58.384 },
]);

function handlePathsChanged(paths: google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>) {
  console.log("polygon paths changed", paths);
}
</script>

<template>
  <GmvMap :center="center" :zoom="13" style="width: 100%; height: 500px">
    <GmvPolygon
      :paths="paths"
      :editable="true"
      :deep-watch="true"
      @paths_changed="handlePathsChanged"
    />
  </GmvMap>
</template>
```

`deepWatch` controls the Vue watcher depth for the `paths` prop. `paths_changed` is not `v-model`; update your own state from the Google MVC path data when you need persistence.

## Access the polygon instance

Use `polygon-key` with `usePolygonPromise` only when you need a method from the underlying `google.maps.Polygon` instance.

```vue showLineNumbers
<script setup lang="ts">
import { usePolygonPromise } from "@gmap-vue/v3/composables";

const polygonKey = "service-area";
const polygonPromise = usePolygonPromise(polygonKey);

async function readPathCount() {
  const polygon = await polygonPromise;
  console.log(polygon?.getPaths().getLength());
}
</script>

<template>
  <GmvMap :center="{ lat: -34.6037, lng: -58.3816 }" :zoom="13" style="width: 100%; height: 500px">
    <GmvPolygon :polygon-key="polygonKey" :paths="[]" />
  </GmvMap>

  <button @click="readPathCount">Read path count</button>
</template>
```

## Gotchas

- `GmvPolygon` imports the Google Maps `maps` library internally with `google.maps.importLibrary("maps")`.
- `clickable` and `visible` default to `true`; `draggable`, `editable`, `geodesic`, and `deepWatch` default to `false`.
- `options` is spread after explicit props, so values in `options` can override prop-derived Google Maps options.
- `paths_changed` is emitted from Google Maps MVC path mutations, not from Vue `v-model`.

## Related pages

- [Polygon API](/docs/vue-3-version/api/components/polygon)
- [Map guide](/docs/vue-3-version/guide/components/map)
- [Google Polygon reference](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon)
