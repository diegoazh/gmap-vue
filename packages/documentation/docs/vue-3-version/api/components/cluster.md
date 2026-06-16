---
id: cluster
sidebar_position: 5
sidebar_label: Cluster
---

# Cluster

:::info Official sources

- [Marker clustering guide](https://developers.google.com/maps/documentation/javascript/marker-clustering)
- [MarkerClusterer reference](https://googlemaps.github.io/js-markerclusterer/classes/MarkerClusterer.html)
- [`@googlemaps/markerclusterer`](https://github.com/googlemaps/js-markerclusterer)

:::

`GmvCluster` wraps `MarkerClusterer` from `@googlemaps/markerclusterer`. It groups `google.maps.marker.AdvancedMarkerElement` instances created by `GmvMarker`.

The component is exported as `Cluster` from `@gmap-vue/v3/components` and registered by the plugin as `GmvCluster`.

## Props

```ts title="Cluster props interface" showLineNumbers
import type {
  Algorithm,
  Renderer,
  onClusterClickHandler,
} from "@googlemaps/markerclusterer";

export interface ClusterProps {
  algorithm?: Algorithm;
  markers?: google.maps.marker.AdvancedMarkerElement[];
  onClusterClick?: onClusterClickHandler;
  renderer?: Renderer;
  clusterKey?: string;
  mapKey?: string;
  options?: Record<string, unknown>;
}
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `algorithm` | `Algorithm` | `undefined` | MarkerClusterer algorithm implementation. |
| `markers` | `google.maps.marker.AdvancedMarkerElement[]` | `undefined` | Initial markers passed directly to the clusterer. Child `GmvMarker` components can also add themselves. |
| `onClusterClick` | `onClusterClickHandler` | `undefined` | Custom cluster click handler. |
| `renderer` | `Renderer` | `undefined` | Custom cluster renderer. |
| `clusterKey` | `string` | `undefined` | Promise key used by `useClusterPromise(key)` and by markers that join this cluster through `cluster-key`. |
| `mapKey` | `string` | `undefined` | Map promise key used when the cluster is not a direct descendant of `GmvMap`. |
| `options` | `Record<string, unknown>` | `undefined` | Fallback input for supported wrapper fields. The component currently forwards `markers`, `onClusterClick`, `algorithm`, and `renderer` to `MarkerClusterer`. |

## Map and marker resolution

When `mapKey` is provided, the component injects that map promise. Without `mapKey`, it finds the parent `GmvMap` instance.

`GmvMarker` can join a cluster in two ways:

1. as a child of `GmvCluster`, through parent discovery,
2. with a matching `cluster-key`, through the cluster promise registry.

Clustered markers are created without a map and then added to the clusterer.

## Events

`MarkerClusterer` emits a small event surface. Use `onClusterClick` when you need the original map click event together with the clicked cluster and map.

| Event | Payload | Description |
| --- | --- | --- |
| `clusteringbegin` | `MarkerClusterer` | Emitted when MarkerClusterer starts clustering. |
| `clusteringend` | `MarkerClusterer` | Emitted when MarkerClusterer finishes clustering. |
| `click` | `Cluster` | Emitted when a cluster is clicked. |

## Exposed properties

| Property | Type | Description |
| --- | --- | --- |
| `clusterPromise` | `Promise<MarkerClusterer \| undefined>` | Resolves to the underlying MarkerClusterer instance. |

```vue showLineNumbers
<script setup lang="ts">
import { Cluster } from "@gmap-vue/v3/components";
import { ref } from "vue";

const clusterRef = ref<InstanceType<typeof Cluster> | null>(null);

async function renderClusters() {
  const cluster = await clusterRef.value?.clusterPromise;
  cluster?.render();
}
</script>

<template>
  <GmvMap
    :center="{ lat: -34.6037, lng: -58.3816 }"
    :zoom="12"
    style="width: 100%; height: 500px"
  >
    <GmvCluster ref="clusterRef">
      <GmvMarker :position="{ lat: -34.5889, lng: -58.4306 }" />
    </GmvCluster>
  </GmvMap>

  <button @click="renderClusters">Render clusters</button>
</template>
```

## Composable access

Use `useClusterPromise(key?)` when direct component refs are inconvenient.

```ts showLineNumbers
import { useClusterPromise } from "@gmap-vue/v3/composables";

const clusterPromise = useClusterPromise("store-cluster");
```

## Lifecycle behavior

On unmount, `GmvCluster` clears clustered markers, detaches the clusterer from the map, and destroys the promise key. On component updates, it calls `cluster.render()`.

## Related APIs

- [`useClusterPromise`](/docs/vue-3-version/api/composables#useclusterpromise)
- [Cluster guide](/docs/vue-3-version/guide/components/cluster)
- [Marker API](/docs/vue-3-version/api/components/marker)
