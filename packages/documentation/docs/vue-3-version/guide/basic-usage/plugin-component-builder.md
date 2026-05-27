---
id: plugin-component-builder
sidebar_position: 8
sidebar_label: Plugin component builder
---

# Plugin component builder

Use `utilities.pluginComponentBuilder` when you need a Google Maps wrapper component that is not provided by `@gmap-vue/v3`.

:::info
This is an advanced API. Prefer the built-in components first. Import it only from the public root entrypoint: `@gmap-vue/v3`.
:::

## Basic pattern

```ts title="DirectionsRenderer.ts" showLineNumbers
import { utilities } from "@gmap-vue/v3";

const { pluginComponentBuilder } = utilities;

export default pluginComponentBuilder({
  name: "directionsRenderer",
  ctr: () => google.maps.DirectionsRenderer,
  events: ["directions_changed"],
  props: {
    routeIndex: { type: Number },
    options: { type: Object },
    panel: { type: Object },
    directions: { type: Object },
  },
  mappedProps: {
    noBind: [],
    twoWay: [],
    trackProperties: {},
  },
  beforeCreate(options) {
    return options;
  },
  afterCreate(directionsRendererInstance) {
    return directionsRendererInstance;
  },
});
```

## Use the custom component

```vue title="DirectionsExample.vue" showLineNumbers
<script setup lang="ts">
import { ref } from "vue";
import DirectionsRenderer from "./DirectionsRenderer";

const center = ref({ lat: 10, lng: 10 });
</script>

<template>
  <GmvMap :zoom="7" :center="center" style="width: 100%; height: 500px">
    <DirectionsRenderer />
  </GmvMap>
</template>
```

## Notes

- Do not import `helpers`, `MapElementFactory`, or `gmap-vue` in Vue 3 apps.
- Keep constructor access lazy with `ctr: () => google.maps.YourConstructor` so the Google Maps API can load before the component creates the map object.
- Define Vue prop types in `props`. Use `mappedProps` for binding behavior (`noBind`, `twoWay`, and nested `trackProperties`).
- For the full contract, see the [`pluginComponentBuilder` API](/docs/vue-3-version/api/utilities#plugincomponentbuilder).
