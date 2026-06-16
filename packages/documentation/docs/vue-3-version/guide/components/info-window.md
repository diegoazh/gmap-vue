---
id: info-window
sidebar_position: 4
sidebar_label: InfoWindow
---

# InfoWindow

`GmvInfoWindow` renders a Google Maps `InfoWindow` on a `GmvMap`. Use it for contextual content anchored to a marker or to a map position.

The component is exported as `InfoWindow` from `@gmap-vue/v3/components` and registered by the plugin as `GmvInfoWindow`.

## Basic controlled info window

Control visibility with the `opened` prop. A marker click can update normal Vue state and open the info window.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from "vue";

const center = { lat: -34.6037, lng: -58.3816 };
const infoOpen = ref(false);
</script>

<template>
  <GmvMap :center="center" :zoom="13" style="width: 100%; height: 500px">
    <GmvMarker
      marker-key="main-marker"
      :position="center"
      title="Buenos Aires"
      @click="infoOpen = true"
      @gmp-click="infoOpen = true"
    />

    <GmvInfoWindow
      marker-key="main-marker"
      :opened="infoOpen"
      aria-label="Buenos Aires details"
      @closeclick="infoOpen = false"
      @close="infoOpen = false"
    >
      <strong>Buenos Aires</strong>
      <p>Selected marker details.</p>
    </GmvInfoWindow>
  </GmvMap>
</template>
```

`opened` is controlled by your component state. Closing the Google UI does not mutate your state automatically, so handle `close` or `closeclick` when you want the Vue state to follow the Google state.

## Anchor to a marker

The most common pattern is to use the same `marker-key` on `GmvMarker` and `GmvInfoWindow`. When opened, `GmvInfoWindow` prefers the marker resolved from `marker-key`, then the explicit `marker` prop, then a map-only open.

```vue showLineNumbers
<template>
  <GmvMap :center="center" :zoom="13" style="width: 100%; height: 500px">
    <GmvMarker marker-key="store-marker" :position="center" title="Store" />

    <GmvInfoWindow marker-key="store-marker" :opened="true">
      Store location
    </GmvInfoWindow>
  </GmvMap>
</template>
```

If you already have a `google.maps.marker.AdvancedMarkerElement`, pass it through the `marker` prop instead.

## Position-only info window

You can open an info window at a position without anchoring it to a marker.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from "vue";

const position = ref({ lat: -34.6037, lng: -58.3816 });
</script>

<template>
  <GmvMap :center="position" :zoom="13" style="width: 100%; height: 500px">
    <GmvInfoWindow :position="position" :opened="true">
      Info window at a map position
    </GmvInfoWindow>
  </GmvMap>
</template>
```

When `opened` is true and `position` changes, the component calls `setPosition()` and reopens the info window.

## Access the info window instance

Use `info-window-key` with `useInfoWindowPromise` when you need direct access to the Google `InfoWindow` instance.

```vue showLineNumbers
<script setup lang="ts">
import { useInfoWindowPromise } from "@gmap-vue/v3/composables";

const center = { lat: -34.6037, lng: -58.3816 };
const infoWindowKey = "details-window";
const infoWindowPromise = useInfoWindowPromise(infoWindowKey);

async function closeFromCode() {
  const infoWindow = await infoWindowPromise;
  infoWindow?.close();
}
</script>

<template>
  <GmvMap :center="center" :zoom="13" style="width: 100%; height: 500px">
    <GmvInfoWindow
      :info-window-key="infoWindowKey"
      :position="center"
      :opened="true"
    >
      Details
    </GmvInfoWindow>
  </GmvMap>

  <button @click="closeFromCode">Close Google instance</button>
</template>
```

Prefer the `opened` prop for normal app state. Direct instance access is best for methods not exposed as Vue props yet.

## Gotchas

- `opened` controls open and close; keep your Vue state in sync with `close` or `closeclick` if the user can close the window from the Google UI.
- Slot content is moved into Google Maps' DOM when the component mounts. Avoid relying on parent DOM structure around slotted content.
- Changing `position` while open updates the position and reopens the info window.
- Changing `marker` while open reopens the info window anchored to the new marker.
- Use `map-key` when the info window cannot discover a parent `GmvMap`.

## Related pages

- [InfoWindow API](/docs/vue-3-version/api/components/info-window)
- [Marker guide](/docs/vue-3-version/guide/components/marker)
- [Map guide](/docs/vue-3-version/guide/components/map)
- [Google InfoWindow reference](https://developers.google.com/maps/documentation/javascript/reference/info-window)
