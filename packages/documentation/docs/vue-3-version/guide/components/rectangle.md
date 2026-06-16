---
id: rectangle
sidebar_position: 8
sidebar_label: Rectangle
---

# Rectangle

`GmvRectangle` renders a Google Maps `Rectangle` overlay on a `GmvMap`. Use it when your data is naturally represented as north, south, east, and west bounds.

The component is exported as `Rectangle` from `@gmap-vue/v3/components` and registered by the plugin as `GmvRectangle`.

## Basic editable rectangle

Pass `bounds` and opt in to editing or dragging when users should reshape the rectangle.

```vue showLineNumbers
<script setup lang="ts">
const center = { lat: -34.6037, lng: -58.3816 };
const bounds = {
  north: -34.59,
  south: -34.62,
  east: -58.36,
  west: -58.4,
};

function handleBoundsChanged() {
  console.log("rectangle bounds changed");
}
</script>

<template>
  <GmvMap :center="center" :zoom="13" style="width: 100%; height: 500px">
    <GmvRectangle
      :bounds="bounds"
      :editable="true"
      :draggable="true"
      fill-color="#ff9800"
      :fill-opacity="0.2"
      stroke-color="#ef6c00"
      :stroke-weight="2"
      @bounds_changed="handleBoundsChanged"
    />
  </GmvMap>
</template>
```

`bounds_changed` is a Google Maps event. It tells you the Google object changed, but it does not implement `v-model` for `bounds`.

## Access the rectangle instance

Use `rectangle-key` with `useRectanglePromise` only when you need a method from the underlying `google.maps.Rectangle` instance.

```vue showLineNumbers
<script setup lang="ts">
import { useRectanglePromise } from "@gmap-vue/v3/composables";

const rectangleKey = "selection-bounds";
const rectanglePromise = useRectanglePromise(rectangleKey);

async function readBounds() {
  const rectangle = await rectanglePromise;
  console.log(rectangle?.getBounds()?.toJSON());
}
</script>

<template>
  <GmvMap :center="{ lat: -34.6037, lng: -58.3816 }" :zoom="13" style="width: 100%; height: 500px">
    <GmvRectangle
      :rectangle-key="rectangleKey"
      :bounds="{ north: -34.59, south: -34.62, east: -58.36, west: -58.4 }"
    />
  </GmvMap>

  <button @click="readBounds">Read bounds</button>
</template>
```

When a rectangle is not a direct child of the map, pass `map-key` so it can use the correct map promise.

## Gotchas

- `GmvRectangle` imports the Google Maps `maps` library internally with `google.maps.importLibrary("maps")`.
- `clickable` and `visible` default to `true`; `draggable` and `editable` default to `false`.
- `options` is spread after explicit props, so values in `options` can override prop-derived Google Maps options.
- Shape events are Google Maps events, not Vue `v-model` updates.

## Related pages

- [Rectangle API](/docs/vue-3-version/api/components/rectangle)
- [Map guide](/docs/vue-3-version/guide/components/map)
- [Google Rectangle reference](https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle)
