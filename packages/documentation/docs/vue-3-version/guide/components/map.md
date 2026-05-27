---
id: map
sidebar_position: 2
sidebar_label: Map
---

# Map

`GmvMap` renders a Google Maps map and exposes a `mapPromise` that resolves to the underlying `google.maps.Map` instance.

The component is exported as `MapLayer` from `@gmap-vue/v3/components` and registered by the plugin as `GmvMap`.

## Basic usage

```vue showLineNumbers
<script setup lang="ts">
import { ref } from "vue";

const center = ref({ lat: 10, lng: 10 });
</script>

<template>
  <GmvMap :center="center" :zoom="7" style="width: 100%; height: 500px" />
</template>
```

## Access the map instance

Use a template ref or the `useMapPromise` composable when you need the Google Maps object.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from "vue";
import {
  useGoogleMapsApiPromiseLazy,
  useMapPromise,
} from "@gmap-vue/v3/composables";

const center = ref({ lat: 10, lng: 10 });
const mapKey = "main-map";
const mapPromise = useMapPromise(mapKey);

async function handleTilesLoaded(): Promise<void> {
  const google = await useGoogleMapsApiPromiseLazy();
  if (!google) return;

  const map = await mapPromise;
  if (!map) return;

  console.log("center", map.getCenter());
  console.log("zoom", map.getZoom());
  console.log("bounds", map.getBounds());
}
</script>

<template>
  <GmvMap
    :map-key="mapKey"
    :center="center"
    :zoom="11"
    style="width: 100%; height: 500px"
    @tilesloaded="handleTilesLoaded"
  />
</template>
```

`getBounds()` can return `undefined` before the map is initialized or visible. The `tilesloaded` event is a safer place to read bounds, center, and zoom.

## Use `PlacesService`

Enable the `places` library in the plugin options before using `google.maps.places.PlacesService`.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from "vue";
import {
  useGoogleMapsApiPromiseLazy,
  useMapPromise,
} from "@gmap-vue/v3/composables";

const center = ref({ lat: 10, lng: 10 });
const zoom = ref(11);
const mapKey = "places-map";
const mapPromise = useMapPromise(mapKey);

async function findPlace(): Promise<void> {
  const google = await useGoogleMapsApiPromiseLazy();
  if (!google) return;

  const service = new google.maps.places.PlacesService(
    document.createElement("div"),
  );
  const map = await mapPromise;
  if (!map) return;

  service.findPlaceFromQuery(
    {
      query: "Museum of Contemporary Art Australia",
      fields: ["name", "geometry"],
    },
    (results, status) => {
      const [firstResult] = results ?? [];
      const location = firstResult?.geometry?.location;

      if (status === google.maps.places.PlacesServiceStatus.OK && location) {
        map.setCenter(location);
      }
    },
  );
}
</script>

<template>
  <GmvMap
    :map-key="mapKey"
    :center="center"
    :zoom="zoom"
    style="width: 100%; height: 500px"
    @tilesloaded="findPlace"
  />
</template>
```

## Source code

- [Component source on GitHub](https://github.com/diegoazh/gmap-vue/blob/master/packages/v3/src/components/map-layer.vue)
- [Generated component API](/docs/vue-3-version/api/components/map#source-code)
