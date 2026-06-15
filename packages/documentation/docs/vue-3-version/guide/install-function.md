---
id: install-function
sidebar_position: 2
sidebar_label: Install function
---

# The install function

This page explains what `createGmapVuePlugin()` does when you call `app.use(...)`. For a first map, start with the [quick start](./index.md) instead.

## App-level state

The install function receives your plugin options, merges them with defaults, and creates a lazy promise for the Google Maps JavaScript API.

The plugin exposes that state in two ways:

- `app.config.globalProperties.$gmapApiPromiseLazy`
- `app.config.globalProperties.$gmapOptions`
- Vue `provide()` entries consumed by the Composition API helpers

```ts title="plugin main.ts" showLineNumbers
app.config.globalProperties.$gmapApiPromiseLazy = googleMapsApiPromiseLazy;
app.config.globalProperties.$gmapOptions = finalOptions;
app.provide($gmapOptions, finalOptions);
app.provide($gmapApiPromiseLazy, googleMapsApiPromiseLazy);
```

Use the documented composables when you are writing Composition API code. See [global properties and composables](/docs/vue-3-version/guide/global-properties).

## Default Google Maps libraries

The plugin defaults `load.libraries` to `"places"`. Set the option explicitly when your app needs additional libraries.

```ts title="main.ts" showLineNumbers
app.use(
  createGmapVuePlugin({
    load: {
      key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      libraries: "places,visualization",
    },
  }),
);
```

Prefer comma-separated strings in public app code because the plugin option type documents `libraries` as a string.

## Global components

By default, the plugin registers all Vue components globally and lazy-loads their implementation.

Common global names include:

- `GmvMap`
- `GmvMarker`
- `GmvInfoWindow`
- `GmvAutocomplete`
- `GmvCircle`, `GmvPolygon`, `GmvPolyline`, `GmvRectangle`
- `GmvHeatmapLayer`, `GmvKmlLayer`, `GmvStreetViewPanorama`
- `GmvCluster`

See the [components entrypoint](/docs/vue-3-version/api/components) for the full export-to-global-name mapping.

:::note
`GmvCluster` is registered by default. The package already depends on `@googlemaps/markerclusterer`, so app users normally do not need to install it separately.
:::

## Related API pages

- [Plugin API](/docs/vue-3-version/api/gmap-vue-plugin)
- [Supported package entrypoints](/docs/vue-3-version/api/#supported-entrypoints)
- [Components API](/docs/vue-3-version/api/components)
