---
id: map-reference
sidebar_position: 2
sidebar_label: Map reference
---

# Getting a map reference

Most map updates should use Vue state. Reach for the underlying `google.maps.Map` instance only when you need an imperative Google Maps method.

## Reactive props

The `:center` prop on `GmvMap` and the `:position` prop on `GmvMarker` are reactive. Binding them to reactive values is enough for normal data-driven updates.

```vue title="ReactiveMap.vue" showLineNumbers
<script setup lang="ts">
import { ref } from "vue";

const center = ref({ lat: 1.32, lng: 103.8 });

function moveToNewLocation() {
  center.value = { lat: 1.38, lng: 103.8 };
}
</script>

<template>
  <GmvMap :center="center" :zoom="14" style="width: 100%; height: 400px">
    <GmvMarker :position="center" />
  </GmvMap>
  <button @click="moveToNewLocation">Move to new location</button>
</template>
```

:::note
Use `panTo()` or other instance methods for programmatic interactions. For data-driven changes, prefer reactive props.
:::

## Access the map with `map-key`

Use `map-key` plus `useMapPromise()` when the parent component needs the map instance.

```vue title="MapPromiseExample.vue" showLineNumbers
<script setup lang="ts">
import { useMapPromise } from "@gmap-vue/v3/composables";
import { ref } from "vue";

const center = ref({ lat: 1.32, lng: 103.8 });
const mapKey = "main-map";
const mapPromise = useMapPromise(mapKey);

async function panToLocation() {
  const map = await mapPromise;
  map?.panTo({ lat: 1.0, lng: 100.0 });
}
</script>

<template>
  <GmvMap
    :map-key="mapKey"
    :center="center"
    :zoom="7"
    style="width: 100%; height: 400px"
  />
  <button @click="panToLocation">Pan map</button>
</template>
```

The string passed to `useMapPromise(mapKey)` must match the `map-key` prop. Use stable, unique keys when a page renders multiple maps.

## Access the map with a component ref

`GmvMap` also exposes `mapPromise` through the component instance. This is useful when you already need a template ref.

```vue title="MapRefExample.vue" showLineNumbers
<script setup lang="ts">
import { MapLayer } from "@gmap-vue/v3/components";
import { onMounted, ref } from "vue";

const center = ref({ lat: 1.32, lng: 103.8 });
const mapRef = ref<InstanceType<typeof MapLayer> | null>(null);

onMounted(async () => {
  const map = await mapRef.value?.mapPromise;
  map?.panTo({ lat: 1.0, lng: 100.0 });
});
</script>

<template>
  <GmvMap ref="mapRef" :center="center" :zoom="7" style="width: 100%; height: 400px" />
</template>
```

## Typing a component ref globally

If you use Options API refs heavily, you can augment Vue's `$refs` typing. Most Composition API code can use the local `InstanceType<typeof MapLayer>` pattern shown above instead.

```ts title="main.ts" showLineNumbers
import { MapLayer } from "@gmap-vue/v3/components";

declare module "vue" {
  interface ComponentCustomProperties {
    $refs: {
      mapRef: InstanceType<typeof MapLayer>;
    };
  }
}
```

## Why parent components should not inject the map promise

`GmvMap` provides the default map promise to its descendants. A parent component cannot inject something that is provided by its child, because the child has not executed `provide()` yet.

```ts title="This only works in descendants of GmvMap" showLineNumbers
import { inject } from "vue";
import { $mapPromise } from "@gmap-vue/v3/keys";

const mapPromise = inject($mapPromise);
```

For parent components, use one of these instead:

- `useMapPromise(mapKey)` with a matching `<GmvMap :map-key="mapKey" />`
- a template ref and `mapRef.value?.mapPromise`

## Related pages

- [`GmvMap` guide](../components/map.md)
- [Supported composables](/docs/vue-3-version/api/composables)
