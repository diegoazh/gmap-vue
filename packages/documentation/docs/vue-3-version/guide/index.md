---
id: introduction
title: Quick start
sidebar_position: 1
sidebar_label: Quick start
---

# Vue 3 quick start

GmapVue wraps the Google Maps JavaScript API with Vue 3 components and composables. This guide gets a new app from install to a visible map.

## 1. Install the package

```bash
pnpm add @gmap-vue/v3
```

Use the equivalent command for your package manager if your app does not use pnpm.

## 2. Create a Google Maps API key

Create a browser key in Google Cloud Console by following the [Google Maps JavaScript API key guide](https://developers.google.com/maps/documentation/javascript/get-api-key).

:::warning
Browser keys are visible to users. Restrict your key by HTTP referrer, enable only the APIs you need, and rotate any unrestricted key that was committed or shared.
:::

For Vite apps, put the key in an environment file:

```env title=".env.local"
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_browser_key
```

`VITE_GOOGLE_MAPS_API_KEY` is convenient configuration, not a secret. Vite exposes `VITE_*` variables to browser code.

## 3. Install the Vue plugin

Register the plugin once in your app entrypoint and import the package stylesheet.

```ts title="main.ts" showLineNumbers {1-2,9-14}
import { createGmapVuePlugin } from "@gmap-vue/v3";
import "@gmap-vue/v3/dist/style.css";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.use(
  createGmapVuePlugin({
    load: {
      key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      libraries: "places",
    },
  }),
);

app.mount("#app");
```

The plugin globally registers components such as `GmvMap`, `GmvMarker`, `GmvInfoWindow`, and `GmvAutocomplete`.

## 4. Render your first map

`GmvMap` needs an explicit size. If the container has no height, the map can initialize correctly but appear blank.

```vue title="App.vue" showLineNumbers
<script setup lang="ts">
import { ref } from "vue";

const center = ref({ lat: -34.6037, lng: -58.3816 });
</script>

<template>
  <GmvMap :center="center" :zoom="12" style="width: 100%; height: 400px" />
</template>
```

## 5. Access the map instance when needed

For normal UI state, prefer reactive props such as `:center` and `:zoom`. Use the underlying `google.maps.Map` instance only when you need Google Maps methods that are not represented by Vue props yet.

```vue title="MapInstanceExample.vue" showLineNumbers
<script setup lang="ts">
import { useMapPromise } from "@gmap-vue/v3/composables";
import { ref } from "vue";

const center = ref({ lat: -34.6037, lng: -58.3816 });
const mapKey = "main-map";
const mapPromise = useMapPromise(mapKey);

async function panToObelisco() {
  const map = await mapPromise;
  map?.panTo({ lat: -34.6037, lng: -58.3816 });
}
</script>

<template>
  <GmvMap
    :map-key="mapKey"
    :center="center"
    :zoom="12"
    style="width: 100%; height: 400px"
  />
  <button @click="panToObelisco">Pan to Obelisco</button>
</template>
```

The string passed to `useMapPromise(mapKey)` must match the map's `map-key` prop.

## Next steps

- Learn the [`GmvMap` component](./components/map.md).
- Learn [map instance access](./basic-usage/map-reference.md).
- Review the [plugin options API](/docs/vue-3-version/api/gmap-vue-plugin#plugin-options).
- Use only the [supported package entrypoints](../api/#supported-entrypoints).
