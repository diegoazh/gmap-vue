---
id: introduction
title: Introduction
sidebar_position: 1
sidebar_label: Introduction
---

# Vue 3 guide

GmapVue is a Vue 3 wrapper around the Google Maps JavaScript API. Start here for new applications.

## What you get

- Vue 3 components such as `GmvMap`, `GmvMarker`, and `GmvAutocomplete`.
- Composition API helpers from `@gmap-vue/v3/composables`.
- TypeScript declarations for documented package entrypoints.

## Get a Google Maps API key

Create a key in Google Cloud Console by following the [Google Maps JavaScript API key guide](https://developers.google.com/maps/documentation/javascript/get-api-key).

:::warning
Browser keys are visible to users. Restrict your key by HTTP referrer, enable only the APIs you need, and rotate any unrestricted key that was committed or shared.
:::

## Install the plugin

```ts title="main.ts" showLineNumbers {1-4,9-13}
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

`VITE_GOOGLE_MAPS_API_KEY` is a convenient Vite configuration value, not a secret. Vite exposes `VITE_*` variables to browser code.

## Next steps

- Review the [plugin options API](/docs/vue-3-version/api/gmap-vue-plugin#plugin-options).
- Review the [component API](/docs/vue-3-version/api/components).
- Use only the [supported package entrypoints](../api/#supported-entrypoints).
