---
id: introduction
# title: API documentation
sidebar_position: 1
sidebar_label: Introduction
---
# GmapVue Vue 2 API notes

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/gmap-vue/badge)](https://www.jsdelivr.com/package/npm/gmap-vue)

:::danger
The Vue 2 package is frozen and no longer actively maintained because Vue 2 reached EOL.
:::

Use this API documentation only for existing Vue 2 applications that cannot migrate yet. New applications should use [`@gmap-vue/v3`](/docs/vue-3-version/).

## Vue 2 port history

GmapVue started as a fork of the popular `vue2-google-maps` project so community fixes could continue after the original project slowed down. That history is preserved here for existing Vue 2 users, but new feature development now belongs in the Vue 3 package.

## Breaking changes

### v3.0.0

- `autobindAllEvents` config option was renamed to `autoBindAllEvents`
- `vueGoogleMapsInit` name was renamed to `GoogleMapsCallback`
- `gmapApi` function was renamed to `getGoogleMapsAPI`
- `MapElementMixin` now is exported from `components` object instead of `helpers` object
- `customCallback` config option was added to reuse existing Google Maps API that already loaded, eg from an HTML file

### v2.0.0

- All components were rewriting in SFC (`.vue`)
- `MarkerCluster` was renamed to `Cluster`
- `@google/markerclustererplus` was replace for `@googlemaps/markerclusterer`
- The plugin exports two main objects:
  - `components`: it has all components and mountable mixin)
  - `helpers`: it has promise lazy factory function, gmapApi function and map element mixin
- The plugin now exports by default the install function, this means that you can do the following
- From **v2.0.0** and above, the `autocomplete` component uses the `default` slot instead of the named `input` slot, from v1.5.0 the `input` slot on the autocomplete component still works.

  ```js
  import GmapVue from 'gmap-vue';
  ```

  instead of

  ```js
  import * as GmapVue from 'gmap-vue';
  ```

## Installation

### npm

```shell
npm install gmap-vue --save
```

### yarn

```shell
yarn add gmap-vue
```

### Manually

Just download `dist/gmap-vue.js` file and include it from your HTML.

```html
<script src="./gmap-vue.js"></script>
```

### jsdelivr

You can use a free CDN like [jsdelivr](https://www.jsdelivr.com) to include this plugin in your html file

```html
<script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>
```

### unpkg

You can use a free CDN like [unpkg](https://unpkg.com) to include this plugin in your html file

```html
<script src="https://unpkg.com/gmap-vue@1.2.2/dist/gmap-vue.js"></script>
```

:::warning
Be aware that if you use this method, you cannot use TitleCase for your components and your attributes.
That is, instead of writing `<GmapMap>`, you need to write `<gmap-map>`.
:::

[Live example](/docs/vue-2-version/guide/).
