---
id: cluster
sidebar_position: 5
sidebar_label: Cluster
---

# Cluster

`GmvCluster` groups many `GmvMarker` instances with [`@googlemaps/markerclusterer`](https://github.com/googlemaps/js-markerclusterer). Use it when a map has enough markers that individual pins become hard to read or expensive to render.

The component is exported as `Cluster` from `@gmap-vue/v3/components` and registered by the plugin as `GmvCluster`.

## Basic usage

Wrap markers in `GmvCluster`. Child `GmvMarker` components discover the parent cluster and are added to the clusterer instead of being attached directly to the map.

```vue showLineNumbers
<script setup lang="ts">
const center = { lat: -34.6037, lng: -58.3816 };
const stores = [
  { id: "palermo", title: "Palermo", position: { lat: -34.5889, lng: -58.4306 } },
  { id: "recoleta", title: "Recoleta", position: { lat: -34.5895, lng: -58.3974 } },
  { id: "san-telmo", title: "San Telmo", position: { lat: -34.6212, lng: -58.3731 } },
];
</script>

<template>
  <GmvMap :center="center" :zoom="12" style="width: 100%; height: 500px">
    <GmvCluster>
      <GmvMarker
        v-for="store in stores"
        :key="store.id"
        :position="store.position"
        :title="store.title"
      />
    </GmvCluster>
  </GmvMap>
</template>
```

`GmvMarker` wraps `google.maps.marker.AdvancedMarkerElement`, not legacy `google.maps.Marker`. The clusterer receives advanced marker instances created by the marker components.

## Use a cluster key

Use `cluster-key` when markers are not direct children of the cluster or when you need direct access to the clusterer instance.

```vue showLineNumbers
<script setup lang="ts">
import { useClusterPromise } from "@gmap-vue/v3/composables";

const center = { lat: -34.6037, lng: -58.3816 };
const clusterKey = "store-cluster";
const clusterPromise = useClusterPromise(clusterKey);

async function repaintClusters() {
  const cluster = await clusterPromise;
  cluster?.render();
}
</script>

<template>
  <GmvMap :center="center" :zoom="12" style="width: 100%; height: 500px">
    <GmvCluster :cluster-key="clusterKey" />

    <GmvMarker
      :cluster-key="clusterKey"
      :position="{ lat: -34.5889, lng: -58.4306 }"
      title="Palermo"
    />
  </GmvMap>

  <button @click="repaintClusters">Render clusters</button>
</template>
```

For normal parent-child usage, prefer wrapping markers in `GmvCluster`. Reach for `cluster-key` when component structure prevents direct nesting or when you need the underlying `MarkerClusterer` instance.

## Custom algorithm, renderer, and click behavior

Pass `algorithm`, `renderer`, or `on-cluster-click` when you need behavior supported by `@googlemaps/markerclusterer`.

```vue showLineNumbers
<template>
  <GmvMap :center="center" :zoom="12" style="width: 100%; height: 500px">
    <GmvCluster :renderer="renderer" :on-cluster-click="handleClusterClick">
      <GmvMarker
        v-for="store in stores"
        :key="store.id"
        :position="store.position"
        :title="store.title"
      />
    </GmvCluster>
  </GmvMap>
</template>
```

Keep custom cluster behavior in app code and pass the configured objects to `GmvCluster`. The component forwards them to `new MarkerClusterer({ map, markers, onClusterClick, algorithm, renderer })`.

## Gotchas

- `GmvCluster` uses `@googlemaps/markerclusterer`; it is not the old MarkerClustererPlus package.
- Clustered markers are created without a map and then added to the clusterer.
- Use `cluster-key` on both `GmvCluster` and `GmvMarker` when they are not direct parent-child components.
- Use `map-key` when the cluster cannot discover a parent `GmvMap`.
- On unmount, the component clears markers, detaches the clusterer from the map, and destroys its promise key.

## Related pages

- [Cluster API](/docs/vue-3-version/api/components/cluster)
- [Marker guide](/docs/vue-3-version/guide/components/marker)
- [Map guide](/docs/vue-3-version/guide/components/map)
- [Marker clustering guide](https://developers.google.com/maps/documentation/javascript/marker-clustering)
- [MarkerClusterer reference](https://googlemaps.github.io/js-markerclusterer/classes/MarkerClusterer.html)
