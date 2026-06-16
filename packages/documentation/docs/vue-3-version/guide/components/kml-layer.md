---
id: kml-layer
sidebar_position: 12
sidebar_label: KML Layer
---

# KML Layer

`GmvKmlLayer` renders a Google Maps `KmlLayer` on a `GmvMap`. Use it when you have a KML, KMZ, or GeoRSS source that Google Maps can fetch and render.

The component is exported as `KmlLayer` from `@gmap-vue/v3/components` and registered by the plugin as `GmvKmlLayer`.

## Basic usage

Pass a public `url` and render the layer inside a map.

```vue title="KmlLayerExample.vue" showLineNumbers
<script setup lang="ts">
const center = { lat: 41.8758, lng: -87.6189 };
const kmlUrl = "https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml";
</script>

<template>
  <GmvMap :center="center" :zoom="11" style="width: 100%; height: 500px">
    <GmvKmlLayer :url="kmlUrl" />
  </GmvMap>
</template>
```

The component imports the Google `maps` library internally with `google.maps.importLibrary('maps')`.

## Configure viewport and overlays

```vue showLineNumbers
<template>
  <GmvMap :center="center" :zoom="11" style="width: 100%; height: 500px">
    <GmvKmlLayer
      :url="kmlUrl"
      :preserve-viewport="true"
      :screen-overlays="true"
      :suppress-info-windows="false"
      :z-index="10"
      @click="handleKmlClick"
    />
  </GmvMap>
</template>
```

```ts showLineNumbers
function handleKmlClick(event: google.maps.KmlMouseEvent) {
  console.log(event.featureData.name);
}
```

`preserveViewport` controls whether the map viewport changes to fit the KML content. `suppressInfoWindows` prevents Google Maps from opening default KML info windows.

## Access the Google instance

Use `kml-key` with `useKmlPromise` when you need direct access to the underlying `google.maps.KmlLayer` instance.

```vue showLineNumbers
<script setup lang="ts">
import { useKmlPromise } from "@gmap-vue/v3/composables";

const kmlKey = "campus-kml";
const kmlPromise = useKmlPromise(kmlKey);

async function logKmlStatus() {
  const kmlLayer = await kmlPromise;
  console.log(kmlLayer?.getStatus());
}
</script>

<template>
  <GmvMap :center="{ lat: 41.8758, lng: -87.6189 }" :zoom="11" style="width: 100%; height: 500px">
    <GmvKmlLayer
      :kml-key="kmlKey"
      url="https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml"
    />
  </GmvMap>

  <button @click="logKmlStatus">Log KML status</button>
</template>
```

## Gotchas

- The KML URL must be publicly reachable by Google. Localhost, private network URLs, authenticated URLs, and blocked crawlers will not load.
- `GmvKmlLayer` needs a parent `GmvMap` or a valid `map-key`.
- The wrapper currently emits `click` for KML feature clicks. Use the Google instance promise when you need methods such as `getStatus()`.
- `options` is spread after explicit props, so it can override wrapper-provided values.
- Use a unique `kmlKey` for every simultaneously mounted KML layer when you use composable access.

## Related pages

- [KML Layer API](/docs/vue-3-version/api/components/kml-layer)
- [Map guide](/docs/vue-3-version/guide/components/map)
- [Google KmlLayer guide](https://developers.google.com/maps/documentation/javascript/kmllayer)
- [Google KmlLayer reference](https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayer)
