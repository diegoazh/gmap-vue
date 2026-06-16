---
id: street-view-panorama
sidebar_position: 10
sidebar_label: Street View Panorama
---

# Street View Panorama

`GmvStreetViewPanorama` creates a standalone Google Maps `StreetViewPanorama` instance. It is not a layer inside `GmvMap` and does not require a parent map component.

The component is exported as `StreetViewPanorama` from `@gmap-vue/v3/components` and registered by the plugin as `GmvStreetViewPanorama`.

## Basic standalone panorama

Give the component root an explicit size. The component renders an absolutely positioned inner panorama element, so the `GmvStreetViewPanorama` root needs a height and positioning context.

```vue title="StreetViewPanoramaExample.vue" showLineNumbers
<script setup lang="ts">
const position = { lat: 40.758, lng: -73.9855 };
const pov = { heading: 34, pitch: 10 };
</script>

<template>
  <GmvStreetViewPanorama
    class="street-view-frame"
    :position="position"
    :pov="pov"
    :zoom="1"
    :visible="true"
  />
</template>

<style scoped>
.street-view-frame {
  position: relative;
  width: 100%;
  height: 500px;
}
</style>
```

The component loads the Google `streetView` library internally with `google.maps.importLibrary("streetView")`.

## Control position, panorama, and visibility

Use normal Vue state for Street View options. The component watches `position`, `pano`, `pov`, and `zoom` and forwards changes to the Google instance.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from "vue";

const visible = ref(true);
const position = ref({ lat: 40.758, lng: -73.9855 });
const pov = ref({ heading: 34, pitch: 10 });

function lookEast() {
  pov.value = { heading: 90, pitch: 0 };
}
</script>

<template>
  <button @click="visible = !visible">
    {{ visible ? "Hide" : "Show" }} panorama
  </button>
  <button @click="lookEast">Look east</button>

  <GmvStreetViewPanorama
    style="position: relative; width: 100%; height: 500px"
    :position="position"
    :pov="pov"
    :visible="visible"
    @position_changed="position = $event?.toJSON() ?? position"
    @pov_changed="console.log('POV changed')"
    @visible_changed="console.log('visibility changed')"
  />
</template>
```

:::tip
Street View events are Google Maps events exposed as Vue events. They are not `v-model` updates. Keep your own Vue state in sync only for the events you care about.
:::

## Resize after layout changes

If the panorama is inside a tab, drawer, modal, or resizable panel, call `resize()` after it becomes visible. Use `resizePreserveCenter()` when you want to keep the current Street View position after the resize event.

```vue showLineNumbers
<script setup lang="ts">
import { StreetViewPanorama } from "@gmap-vue/v3/components";
import { nextTick, ref } from "vue";

const panoramaRef = ref<InstanceType<typeof StreetViewPanorama> | null>(null);
const panelOpen = ref(true);

async function openPanel() {
  panelOpen.value = true;
  await nextTick();
  await panoramaRef.value?.resizePreserveCenter();
}
</script>

<template>
  <button @click="openPanel">Open panel</button>

  <GmvStreetViewPanorama
    v-if="panelOpen"
    ref="panoramaRef"
    style="position: relative; width: 100%; height: 500px"
    :position="{ lat: 40.758, lng: -73.9855 }"
  />
</template>
```

## Access the Google instance

Use `street-view-key` with `useStreetViewPanoramaPromise` when you need direct access to the underlying `google.maps.StreetViewPanorama` instance.

```vue showLineNumbers
<script setup lang="ts">
import { useStreetViewPanoramaPromise } from "@gmap-vue/v3/composables";

const streetViewKey = "times-square-panorama";
const streetViewPanoramaPromise = useStreetViewPanoramaPromise(streetViewKey);

async function readStatus() {
  const panorama = await streetViewPanoramaPromise;
  console.log(panorama?.getStatus());
}
</script>

<template>
  <GmvStreetViewPanorama
    style="position: relative; width: 100%; height: 500px"
    :street-view-key="streetViewKey"
    :position="{ lat: 40.758, lng: -73.9855 }"
  />

  <button @click="readStatus">Read status</button>
</template>
```

For normal UI state, prefer props and events. Direct instance access is best for Google methods not represented as Vue props or exposed methods.

Use a unique `streetViewKey` for each simultaneously mounted panorama, even if you do not call the composable. The component promise is keyed globally and multiple default-key panoramas can overwrite each other.

## Gotchas

- `GmvStreetViewPanorama` creates its own panorama DOM element. It does not need `GmvMap`.
- The component root needs explicit dimensions. Without a height on `GmvStreetViewPanorama` itself, the absolutely positioned panorama element may not be visible.
- `position_changed`, `pov_changed`, `pano_changed`, and `visible_changed` are not `v-model` updates.
- Use a unique `streetViewKey` for every simultaneously mounted panorama. Without unique keys, instances share the default promise key.
- Call `resize()` or `resizePreserveCenter()` after showing the panorama from hidden or resized UI containers.

## Related pages

- [Street View Panorama API](/docs/vue-3-version/api/components/street-view-panorama)
- [Composables API](/docs/vue-3-version/api/composables#usestreetviewpanoramapromise)
- [Google Street View service guide](https://developers.google.com/maps/documentation/javascript/streetview)
- [Google StreetViewPanorama reference](https://developers.google.com/maps/documentation/javascript/reference/street-view#StreetViewPanorama)
