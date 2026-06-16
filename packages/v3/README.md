# @gmap-vue/v3

[![CI](https://github.com/diegoazh/gmap-vue/actions/workflows/ci.yml/badge.svg)](https://github.com/diegoazh/gmap-vue/actions/workflows/ci.yml)
[![Documentation](https://github.com/diegoazh/gmap-vue/actions/workflows/documentation.yml/badge.svg)](https://github.com/diegoazh/gmap-vue/actions/workflows/documentation.yml)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@gmap-vue/v3/badge)](https://www.jsdelivr.com/package/npm/@gmap-vue/v3)

Vue 3 components and composables for the Google Maps JavaScript API.

`@gmap-vue/v3` is the actively developed GmapVue package. It provides Vue wrappers for maps, markers, info windows, shapes, clusters, layers, autocomplete, and Street View, plus composables for accessing the underlying Google Maps instances.

## Documentation

- [Vue 3 guide](https://diegoazh.github.io/gmap-vue/docs/vue-3-version/)
- [Component API reference](https://diegoazh.github.io/gmap-vue/docs/vue-3-version/api/components/)
- [Composables API](https://diegoazh.github.io/gmap-vue/docs/vue-3-version/api/composables/)

## Installation

```bash
npm install @gmap-vue/v3
```

```bash
pnpm add @gmap-vue/v3
```

```bash
yarn add @gmap-vue/v3
```

## Quick start

Register the plugin once in your Vue app:

```ts
import { createApp } from 'vue';
import { createGmapVuePlugin } from '@gmap-vue/v3';
import '@gmap-vue/v3/dist/style.css';
import App from './App.vue';

createApp(App)
  .use(
    createGmapVuePlugin({
      load: {
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      },
    }),
  )
  .mount('#app');
```

Then use the public components in your templates:

```vue
<template>
  <GmvMap
    :center="{ lat: -34.6037, lng: -58.3816 }"
    :zoom="12"
    style="width: 100%; height: 500px"
  >
    <GmvMarker :position="{ lat: -34.6037, lng: -58.3816 }" />
  </GmvMap>
</template>
```

## Google Maps API key

You need a browser API key for the Google Maps JavaScript API. For production applications:

- restrict the key by HTTP referrer,
- enable only the APIs and libraries your app uses,
- monitor billing and quota in Google Cloud Console,
- avoid calling paid APIs from high-frequency map events.

## Public entrypoints

Use the package entrypoints instead of deep imports:

```ts
import { createGmapVuePlugin, GmvMap } from '@gmap-vue/v3';
import { useMapPromise } from '@gmap-vue/v3/composables';
import { mapPromiseKey } from '@gmap-vue/v3/keys';
import type { IMapLayerVueComponentExpose } from '@gmap-vue/v3/interfaces';
```

## Migrating from Vue 2

The Vue 3 package changes the plugin structure, component names, and instance-access patterns. See the [Vue 3 migration guide](https://diegoazh.github.io/gmap-vue/docs/vue-3-version/#migrating-from-version-for-vue-2) before migrating from `@gmap-vue/v2`.

## Contributing

Contributions are welcome. Please read the repository-level [`README.md`](https://github.com/diegoazh/gmap-vue#readme), [`AGENTS.md`](https://github.com/diegoazh/gmap-vue/blob/master/AGENTS.md), and [Copilot instructions](https://github.com/diegoazh/gmap-vue/blob/master/.github/copilot-instructions.md) before opening a PR.
