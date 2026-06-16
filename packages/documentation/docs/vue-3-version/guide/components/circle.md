---
id: circle
sidebar_position: 5
sidebar_label: Circle
---

# Circle

`GmvCircle` renders a Google Maps `Circle` overlay on a `GmvMap`. Use it for coverage areas, distance ranges, service zones, or any UI that starts from a center point and radius.

The component is exported as `Circle` from `@gmap-vue/v3/components` and registered by the plugin as `GmvCircle`.

## Basic editable circle

Bind `center` and `radius`, then opt in to editing or dragging when users should reshape the circle.

```vue showLineNumbers
<script setup lang="ts">
import { ref } from "vue";

const center = ref({ lat: -34.6037, lng: -58.3816 });
const radius = ref(1500);

function handleCenterChanged() {
  console.log("circle center changed");
}

function handleRadiusChanged() {
  console.log("circle radius changed");
}
</script>

<template>
  <GmvMap :center="center" :zoom="13" style="width: 100%; height: 500px">
    <GmvCircle
      :center="center"
      :radius="radius"
      :editable="true"
      :draggable="true"
      fill-color="#1976d2"
      :fill-opacity="0.2"
      stroke-color="#1976d2"
      :stroke-weight="2"
      @center_changed="handleCenterChanged"
      @radius_changed="handleRadiusChanged"
    />
  </GmvMap>
</template>
```

`center_changed` and `radius_changed` are Google Maps events. They tell you the Google object changed, but they do not implement `v-model` for `center` or `radius`.

## Access the circle instance

Use `circle-key` with `useCirclePromise` only when you need a method from the underlying `google.maps.Circle` instance.

```vue showLineNumbers
<script setup lang="ts">
import { useCirclePromise } from "@gmap-vue/v3/composables";

const circleKey = "delivery-zone";
const circlePromise = useCirclePromise(circleKey);

async function readRadius() {
  const circle = await circlePromise;
  console.log(circle?.getRadius());
}
</script>

<template>
  <GmvMap :center="{ lat: -34.6037, lng: -58.3816 }" :zoom="13" style="width: 100%; height: 500px">
    <GmvCircle
      :circle-key="circleKey"
      :center="{ lat: -34.6037, lng: -58.3816 }"
      :radius="1500"
    />
  </GmvMap>

  <button @click="readRadius">Read radius</button>
</template>
```

When a circle is not a direct child of the map, pass `map-key` so it can use the correct map promise.

## Gotchas

- `GmvCircle` imports the Google Maps `maps` library internally with `google.maps.importLibrary("maps")`.
- `clickable` and `visible` default to `true`; `draggable` and `editable` default to `false`.
- `options` is spread after explicit props, so values in `options` can override prop-derived Google Maps options.
- Shape events are Google Maps events, not Vue `v-model` updates.

## Related pages

- [Circle API](/docs/vue-3-version/api/components/circle)
- [Map guide](/docs/vue-3-version/guide/components/map)
- [Google Circle reference](https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle)
