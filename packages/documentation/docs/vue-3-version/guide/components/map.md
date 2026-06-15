---
id: map
sidebar_position: 2
sidebar_label: Map
---

# Map

`GmvMap` renders a Google Maps map and exposes a `mapPromise` that resolves to the underlying `google.maps.Map` instance.

The component is exported as `MapLayer` from `@gmap-vue/v3/components` and registered by the plugin as `GmvMap`.

## Basic usage

Give the map an explicit width and height. Without height, the map can load but appear blank.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from "vue";

const center = ref({ lat: -34.6037, lng: -58.3816 });
</script>

<template>
  <GmvMap :center="center" :zoom="12" style="width: 100%; height: 500px" />
</template>
```

## Use reactive props first

For data-driven UI changes, update Vue state and let `GmvMap` sync the Google Maps instance.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from "vue";

const center = ref({ lat: -34.6037, lng: -58.3816 });
const zoom = ref(12);

function moveToRecoleta() {
  center.value = { lat: -34.5875, lng: -58.3974 };
  zoom.value = 14;
}
</script>

<template>
  <GmvMap :center="center" :zoom="zoom" style="width: 100%; height: 500px" />
  <button @click="moveToRecoleta">Move to Recoleta</button>
</template>
```

Use the imperative map instance only when you need methods that are not represented by Vue props yet.

## Access the map instance

Use a template ref or the `useMapPromise` composable when you need the Google Maps object.

```vue showLineNumbers
<script setup lang="ts">
import { useMapPromise } from "@gmap-vue/v3/composables";
import { ref } from "vue";

const center = ref({ lat: -34.6037, lng: -58.3816 });
const mapKey = "main-map";
const mapPromise = useMapPromise(mapKey);

async function handleTilesLoaded(): Promise<void> {
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
    :zoom="12"
    style="width: 100%; height: 500px"
    @tilesloaded="handleTilesLoaded"
  />
</template>
```

The string passed to `useMapPromise(mapKey)` must match the map's `map-key` prop. `getBounds()` can return `undefined` before the map is initialized or visible, so map events such as `tilesloaded` are safer places to read bounds, center, and zoom.

## Use `PlacesService`

Enable the `places` library in the plugin options before using `google.maps.places.PlacesService`. `places` is the plugin default, but explicit configuration makes the dependency clear.

```ts title="main.ts excerpt" showLineNumbers
createGmapVuePlugin({
  load: {
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: "places",
  },
});
```

Then use the map promise before interacting with the map. Trigger Places requests from explicit user actions or controlled state, not high-frequency map render events.

```vue showLineNumbers
<script setup lang="ts">
import {
  useGoogleMapsApiPromiseLazy,
  useMapPromise,
} from "@gmap-vue/v3/composables";
import { ref } from "vue";

const center = ref({ lat: -34.6037, lng: -58.3816 });
const mapKey = "places-map";
const mapPromise = useMapPromise(mapKey);

async function findPlace(): Promise<void> {
  const google = await useGoogleMapsApiPromiseLazy();
  const map = await mapPromise;
  if (!google || !map) return;

  const service = new google.maps.places.PlacesService(
    document.createElement("div"),
  );

  service.findPlaceFromQuery(
    {
      query: "Teatro Colón Buenos Aires",
      fields: ["name", "geometry"],
    },
    (results, status) => {
      const location = results?.[0]?.geometry?.location;

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
    :zoom="12"
    style="width: 100%; height: 500px"
  />
  <button @click="findPlace">Find Teatro Colón</button>
</template>
```

## Related pages

- [Quick start](../index.md)
- [Map reference](../basic-usage/map-reference.md)
- [Generated component API](/docs/vue-3-version/api/components/map#source-code)
- [Component source on GitHub](https://github.com/diegoazh/gmap-vue/blob/master/packages/v3/src/components/map-layer.vue)
