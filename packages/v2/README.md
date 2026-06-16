# @gmap-vue/v2

[![CI](https://github.com/diegoazh/gmap-vue/actions/workflows/ci.yml/badge.svg)](https://github.com/diegoazh/gmap-vue/actions/workflows/ci.yml)
[![Documentation](https://github.com/diegoazh/gmap-vue/actions/workflows/documentation.yml/badge.svg)](https://github.com/diegoazh/gmap-vue/actions/workflows/documentation.yml)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@gmap-vue/v2/badge)](https://www.jsdelivr.com/package/npm/@gmap-vue/v2)

Legacy Vue 2 package for GmapVue.

`@gmap-vue/v2` wraps the Google Maps JavaScript API in Vue 2 components. It is maintained for existing Vue 2 applications, while new applications should use [`@gmap-vue/v3`](https://www.npmjs.com/package/@gmap-vue/v3).

## Status

Vue 2 support is legacy maintenance only. Expect compatibility fixes and documentation corrections, not new feature development. If you are starting a new project, use Vue 3 and `@gmap-vue/v3`.

## Documentation

- [Vue 2 legacy documentation](https://diegoazh.github.io/gmap-vue/docs/vue-2-version/)
- [Vue 3 documentation](https://diegoazh.github.io/gmap-vue/docs/vue-3-version/)
- [Repository README](https://github.com/diegoazh/gmap-vue#readme)

## Installation

```bash
npm install @gmap-vue/v2
```

```bash
pnpm add @gmap-vue/v2
```

```bash
yarn add @gmap-vue/v2
```

## Quick start

```js
import Vue from 'vue';
import GmapVue from '@gmap-vue/v2';

Vue.use(GmapVue, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: 'places',
  },
});
```

```vue
<template>
  <GmapMap
    :center="{ lat: -34.6037, lng: -58.3816 }"
    :zoom="12"
    style="width: 100%; height: 500px"
  >
    <GmapMarker :position="{ lat: -34.6037, lng: -58.3816 }" />
  </GmapMap>
</template>
```

## Browser builds

The package publishes UMD/IIFE bundles for legacy browser usage. Prefer npm/pnpm/yarn package installation for application builds.

```html
<script src="https://cdn.jsdelivr.net/npm/@gmap-vue/v2@3.5.4/dist/gmap-vue.min.js"></script>
```

When using browser builds, use kebab-case component names in in-DOM templates, for example `<gmap-map>` instead of `<GmapMap>`.

## Public components

When `installComponents` is enabled, the plugin registers:

- `GmapMap`
- `GmapMarker`
- `GmapInfoWindow`
- `GmapHeatmapLayer`
- `GmapKmlLayer`
- `GmapPolyline`
- `GmapPolygon`
- `GmapCircle`
- `GmapRectangle`
- `GmapDrawingManager`
- `GmapAutocomplete`
- `GmapPlaceInput`
- `GmapStreetViewPanorama`

## Google Maps API key

You need a browser API key for the Google Maps JavaScript API. For production applications:

- restrict the key by HTTP referrer,
- enable only the APIs and libraries your app uses,
- monitor billing and quota in Google Cloud Console,
- avoid calling paid APIs from high-frequency map events.

## Migrating to Vue 3

The Vue 3 package changes the package name, component names, TypeScript support, and instance-access patterns. See the [Vue 3 migration guide](https://diegoazh.github.io/gmap-vue/docs/vue-3-version/#migrating-from-version-for-vue-2) before migrating.

## Breaking changes history

### v3.0.0

- `autobindAllEvents` was renamed to `autoBindAllEvents`.
- `vueGoogleMapsInit` was renamed to `GoogleMapsCallback`.
- `gmapApi` was renamed to `getGoogleMapsAPI`.
- `MapElementMixin` is exported from the `components` object instead of the `helpers` object.
- `customCallback` was added to reuse a Google Maps API script that is already loaded.

### v2.0.0

- Components were rewritten as Vue single-file components.
- `MarkerCluster` was renamed to `Cluster`.
- `@google/markerclustererplus` was replaced with `@googlemaps/markerclusterer`.
- The plugin exports `components` and `helpers` objects.
- The default export is the plugin install object, so consumers should use:

  ```js
  import GmapVue from '@gmap-vue/v2';
  ```

## Contributing

Contributions are welcome for compatibility fixes, documentation, and validation improvements. Please read the repository-level [`README.md`](https://github.com/diegoazh/gmap-vue#readme), [`AGENTS.md`](https://github.com/diegoazh/gmap-vue/blob/master/AGENTS.md), and [Copilot instructions](https://github.com/diegoazh/gmap-vue/blob/master/.github/copilot-instructions.md) before opening a PR.
