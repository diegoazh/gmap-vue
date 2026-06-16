---
id: composables
sidebar_position: 4
sidebar_label: composables
---

# The exposed composables

:::info
**From versions above `v2.0.1`** all components have its own composable to get their promises.
:::

The plugin expose composables from the following path `@gmap-vue/v3/composables`. You can use in your application using the composition API.

You can use it in the following way

```ts showLineNumbers
import {
  useMapPromise,
  useResizeBus,
  useGoogleMapsApiPromiseLazy,
  useStreetViewPanoramaPromise,
  usePluginOptions,
} from "@gmap-vue/v3/composables";

const promise = useMapPromise("yourMapKey");
// ...
```

## `useGoogleMapsApiPromiseLazy`

This composable return the a promise that when it is resolved return the global `google` object, this mean the `window.google` object added to the `globalThis` object bye the Google Maps API.

You can use it in the following way

```ts showLineNumbers
import { useGoogleMapsApiPromiseLazy } from "@gmap-vue/v3/composables";

const googlePromise = useGoogleMapsApiPromiseLazy();

if (googlePromise) {
  const googleObject = await googlePromise;
}
```

:::warning
If the Google API was not loaded yet you will see a warning message in the console like this: `'$googleMapsApiPromiseLazy was not created yet...'` and the composable function should return `undefined`.
:::

### `useGoogleMapsApiPromiseLazy` API

```ts showLineNumbers
export function useGoogleMapsApiPromiseLazy():
  | Promise<GlobalGoogleObject | undefined>
  | undefined {
  if (!$googleMapsApiPromiseLazy) {
    globalThis.console.warn("$googleMapsApiPromiseLazy was not created yet...");
  }

  return $googleMapsApiPromiseLazy?.();
}
```

The plugin creates this promise during install and provides it through Vue app context. Components should call the composable from setup/lifecycle code so the app-scoped value is used. Deprecated module-level fallback behavior remains for compatibility, but it can return `undefined` before the plugin is installed.

:::info

- Check the `LazyValueGetterFn` type [here](/docs/vue-3-version/api/types#lazyvaluegetterfn)
- Check the `GlobalGoogleObject` type [here](/docs/vue-3-version/api/types#globalgoogleobject)

:::

## `usePluginOptions`

This composable return the final options object used by the plugin when it was initialized.

How to use it

```ts showLineNumbers
import { usePluginOptions } from "@gmap-vue/v3/composables";

const options = usePluginOptions();

// do something with the options
```

### `usePluginOptions` API

- Check the [**Options Interface**](/docs/vue-3-version/api/gmap-vue-plugin#plugin-options)

- The plugin options are provided through Vue app context during install. Outside app context, the deprecated module-level fallback can return `undefined` before the plugin is installed.

- The core public shape of this composable is:

```ts showLineNumbers
export function usePluginOptions(): IGmapVuePluginOptions | undefined {
  const finalOptions = useInjectedPluginOptions() ?? $finalOptions;

  if (!finalOptions) {
    globalThis.console.warn("$finalOptions was not defined yet...");
  }

  return finalOptions;
}
```

:::warning
The `saveLazyPromiseAndFinalOptions` is internal and it is not exposed by the plugin
:::

## `useResizeBus`

This composable returns the `currentResizeBus`, `_resizeCallback`, `_delayedResizeCallback`. If you provide your own resize bus through the `GmvMap` component props, it should be assigned to the `currentResizeBus` otherwise the `defaultResizeBus` (a mitt object) should be assigned to it.

You can use it in the following way

```ts showLineNumbers
import { useResizeBus } from "@gmap-vue/v3/composables";

const { currentResizeBus, _resizeCallback, _delayedResizeCallback } =
  useResizeBus();

currentResizeBus.emit("foo", { a: "b" });
```

The `_resizeCallback` is a function used to preserve the map center when it is resized. The `_delayedResizeCallback` use the `nextTick` function to call the `_resizeCallback` in the next change.

### `useResizeBus` API

```ts showLineNumbers
// this code is executed when the GmvMap component is initialized

const currentResizeBus = ref<Emitter<Record<EventType, unknown>> | undefined>();
let _resizeCallback: () => void;
let _delayedResizeCallback: () => Promise<void>;

// ...

if (!props.resizeBus) {
  currentResizeBus.value = defaultResizeBus; // default resize bus is mitt();
}

if (props.resizeBus) {
  currentResizeBus.value = props.resizeBus; // your custom resize bus
}

_resizeCallback = (): void => {
  resizeFn();
};

_delayedResizeCallback = (): Promise<void> => {
  return nextTick(() => _resizeCallback());
};

// ...

/**
 * @typedef ResizeBus
 * @property {() => void} currentResizeBus
 * @property {() => void} _resizeCallback
 * @property {() => void} _delayedResizeCallback
 */
/**
 * this function returns the rezise bus functions
 *
 * @public
 * @returns {ResizeBus}
 */
export function useResizeBus() {
  return {
    currentResizeBus,
    _resizeCallback,
    _delayedResizeCallback,
  };
}
```

## `useMapPromise`

:::warning

- From **v2.0.1 and below** we only use one instance of map, because in the previous implementation we always use the same promise to return the same map or we overwrite that promise with a new map instance. **From versions above v2.0.1** every map and component is saved in its own promise and is independent to other components.
- **We strongly recommend to set the `mapKey` prop on each map**, the old `recycle` prop, we use that key to get the correct map instance and add marker, shapes, etc to the correct map instance.

:::

This composable returns a promise and, when it is resolved return the `GmvMap` component.

You can use it to be sure that the `GmvMap` component is ready.

```ts title="How to use it" showLineNumbers
/**
 * This function returns a promise, when it is resolved returns the Google Maps component instance
 *
 * @param  {string} key - the recycle prop of the map
 * @returns {Promise}
 * @public
 */
export function useMapPromise(
  key: string | InjectionKey<Promise<google.maps.Map | undefined>>,
): Promise<google.maps.Map | undefined> {
  return usePromise<google.maps.Map>(key);
}
```

When the GmvMap component is initialized and the map is ready this promise is resolved

```ts title="map-layer.vue" showLineNumbers
//...

const mapPromiseDeferred = usePromiseDeferred(props.mapKey || $mapPromise);
promiseDeferred.resolve(mapInstance);

// ...
```

:::warning
If the Map object was not loaded yet the composable function returns `undefined`.
:::

## `useAutocompletePromise`

This composable returns a promise that resolves to the underlying `google.maps.places.Autocomplete` instance for a `GmvAutocomplete` component.

For one autocomplete instance, you can call it without arguments. When coordinating multiple instances, use the same key that you pass to the component's `autocomplete-key` prop.

```vue title="AutocompletePromiseExample.vue" showLineNumbers
<script setup lang="ts">
import { useAutocompletePromise } from "@gmap-vue/v3/composables";

const autocompleteKey = "header-search";
const autocompletePromise = useAutocompletePromise(autocompleteKey);

async function readBounds() {
  const autocomplete = await autocompletePromise;
  console.log(autocomplete?.getBounds());
}
</script>

<template>
  <GmvAutocomplete :autocomplete-key="autocompleteKey" placeholder="Search" />
  <button @click="readBounds">Read bounds</button>
</template>
```

```ts title="How to use it" showLineNumbers
export function useAutocompletePromise(
  key: string | InjectionKey<Promise<google.maps.places.Autocomplete | undefined>> = $autocompletePromise,
): Promise<google.maps.places.Autocomplete | undefined> {
  return usePromise<google.maps.places.Autocomplete>(key);
}
```

## `useStreetViewPanoramaPromise`

This composable returns a promise that resolves to the underlying `google.maps.StreetViewPanorama` instance for a `GmvStreetViewPanorama` component.

For one panorama, you can call it without arguments. For multiple simultaneously mounted panoramas, always use a unique key for each instance and pass the same key to the component's `street-view-key` prop.

```vue title="StreetViewPanoramaPromiseExample.vue" showLineNumbers
<script setup lang="ts">
import { useStreetViewPanoramaPromise } from "@gmap-vue/v3/composables";

const streetViewKey = "main-street-view";
const streetViewPanoramaPromise = useStreetViewPanoramaPromise(streetViewKey);

async function readPov() {
  const panorama = await streetViewPanoramaPromise;
  console.log(panorama?.getPov());
}
</script>

<template>
  <GmvStreetViewPanorama
    style="position: relative; width: 100%; height: 500px"
    :street-view-key="streetViewKey"
    :position="{ lat: 40.758, lng: -73.9855 }"
  />

  <button @click="readPov">Read POV</button>
</template>
```

```ts title="How to use it" showLineNumbers
export function useStreetViewPanoramaPromise(
  key:
    | string
    | InjectionKey<
        Promise<google.maps.StreetViewPanorama | undefined>
      > = $streetViewPanoramaPromise,
): Promise<google.maps.StreetViewPanorama | undefined> {
  return usePromise<google.maps.StreetViewPanorama>(key);
}
```

## `useMarkerPromise`

:::warning

- From **v2.0.1 and below** we only use one instance of marker, because in the previous implementation we always use the same promise to return the same marker or we overwrite that promise with a new marker instance. **From versions above v2.0.1** every marker and component is saved in its own promise and is independent to other components.
- **We strongly recommend to set the `markerKey` prop on each marker**, we use this key to get the correct marker instance.

:::

This composable is similar to the previous above, the only difference is that it return the marker object from the Google Maps API.

```ts title="How to use it" showLineNumbers
/**
 * This function returns a promise, when it is resolved returns the Google Advanced Marker Element component instance
 *
 * @param  {string} key - the markerKey prop of the marker
 * @returns {Promise}
 * @public
 */
export function useMarkerPromise(
  key:
    | string
    | InjectionKey<
        Promise<google.maps.marker.AdvancedMarkerElement | undefined>
      >,
): Promise<google.maps.marker.AdvancedMarkerElement | undefined> {
  return usePromise<google.maps.marker.AdvancedMarkerElement>(key);
}
```

:::warning
If the marker object was not loaded yet the composable function returns `undefined`.
:::

## `useCirclePromise`

:::warning

- From **v2.0.1 and below** we only use one instance of circle, because in the previous implementation we always use the same promise to return the same circle or we overwrite that promise with a new circle instance. **From versions above v2.0.1** every circle and component is saved in its own promise and is independent to other components.
- **We strongly recommend to set the `circleKey` prop on each circle**, we use this key to get the correct circle instance.

:::

This composable is similar to the previous above, the only difference is that it return the circle object from the Google Maps API.

```ts title="How to use it" showLineNumbers
/**
 * This function returns a promise, when it is resolved returns the Google Circle component instance
 *
 * @param  {string} key - the circleKey prop of the CircleShape
 * @returns {Promise}
 * @public
 */
export function useCirclePromise(
  key: string | InjectionKey<Promise<google.maps.Circle | undefined>> = $circleShapePromise,
): Promise<google.maps.Circle | undefined> {
  return usePromise<google.maps.Circle>(key);
}
```

:::warning
If the circle object was not loaded yet the composable function returns `undefined`.
:::

## `useClusterPromise`

:::warning

- From **v2.0.1 and below** we only use one instance of cluster, because in the previous implementation we always use the same promise to return the same cluster or we overwrite that promise with a new cluster instance. **From versions above v2.0.1** every cluster and component is saved in its own promise and is independent to other components.
- **We strongly recommend to set the `clusterKey` prop on each cluster**, we use this key to get the correct cluster instance.

:::

This composable is similar to the previous above, the only difference is that it return the cluster object from the Google Maps API.

```ts title="How to use it" showLineNumbers
/**
 * This function returns a promise, when it is resolved returns the Cluster component instance
 *
 * @param  {string} key - the clusterKey prop of the Cluster
 * @returns {Promise}
 * @public
 */
export function useClusterPromise(
  key: string | InjectionKey<Promise<MarkerClusterer | undefined>> = $clusterPromise,
): Promise<MarkerClusterer | undefined> {
  return usePromise<MarkerClusterer>(key);
}
```

:::warning
If the cluster object was not loaded yet the composable function returns `undefined`.
:::

## `useDrawingPromise`

:::danger Legacy and version-dependent

`useDrawingPromise` resolves a `GmvDrawingManager` instance only in environments where Google still serves the removed Drawing Library. Maps JavaScript API v3.65+ no longer provides `DrawingManager`.

:::

This composable returns a promise that resolves to the underlying `google.maps.drawing.DrawingManager` instance for a `GmvDrawingManager` component.

For one drawing manager, you can call it without arguments. For multiple simultaneously mounted drawing managers, use a unique key for each instance and pass the same key to the component's `drawing-key` prop.

```ts title="How to use it" showLineNumbers
export function useDrawingPromise(
  key:
    | string
    | InjectionKey<
        Promise<google.maps.drawing.DrawingManager | undefined>
      > = $drawingManagerPromise,
): Promise<google.maps.drawing.DrawingManager | undefined> {
  return usePromise<google.maps.drawing.DrawingManager>(key);
}
```

:::warning
If the drawing manager was not loaded yet the composable function returns `undefined`. If the Drawing Library is unavailable, the component promise rejects with `GmapVueDrawingLibraryUnavailableError`.
:::

## `useHeatmapLayerPromise`

This composable returns a promise that resolves to the underlying `google.maps.visualization.HeatmapLayer` instance for a `GmvHeatmapLayer` component.

For one heatmap layer, you can call it without arguments. For multiple simultaneously mounted heatmap layers, use a unique key for each instance and pass the same key to the component's `heatmap-key` prop.

```ts title="How to use it" showLineNumbers
export function useHeatmapLayerPromise(
  key:
    | string
    | InjectionKey<
        Promise<google.maps.visualization.HeatmapLayer | undefined>
      > = $heatmapLayerPromise,
): Promise<google.maps.visualization.HeatmapLayer | undefined> {
  return usePromise<google.maps.visualization.HeatmapLayer>(key);
}
```

## `useInfoWindowPromise`

:::warning

- From **v2.0.1 and below** we only use one instance of Info Window, because in the previous implementation we always use the same promise to return the same Info Window or we overwrite that promise with a new Info Window instance. **From versions above v2.0.1** every Info Window and component is saved in its own promise and is independent to other components.
- **We strongly recommend to set the `infoWindowKey` prop on each Info Window**, we use this key to get the correct Info Window instance.

:::

This composable is similar to the previous above, the only difference is that it return the Info Window object from the Google Maps API.

```ts title="How to use it" showLineNumbers
/**
 * This function returns a promise, when it is resolved returns the Google Map Info Window component instance
 *
 * @param  {string} key - the infoWindowKey prop of the Info Window
 * @returns {Promise}
 * @public
 */
export function useInfoWindowPromise(
  key: string | InjectionKey<Promise<google.maps.InfoWindow | undefined>>,
): Promise<google.maps.InfoWindow | undefined> {
  return usePromise<google.maps.InfoWindow>(key);
}
```

:::warning
If the Info Window object was not loaded yet the composable function returns `undefined`.
:::

## `useKmlPromise`

This composable returns a promise that resolves to the underlying `google.maps.KmlLayer` instance for a `GmvKmlLayer` component.

For one KML layer, you can call it without arguments. For multiple simultaneously mounted KML layers, use a unique key for each instance and pass the same key to the component's `kml-key` prop.

```ts title="How to use it" showLineNumbers
export function useKmlPromise(
  key:
    | string
    | InjectionKey<Promise<google.maps.KmlLayer | undefined>> = $kmlLayerPromise,
): Promise<google.maps.KmlLayer | undefined> {
  return usePromise<google.maps.KmlLayer>(key);
}
```

## `usePolygonPromise`

:::warning

- From **v2.0.1 and below** we only use one instance of polygon, because in the previous implementation we always use the same promise to return the same polygon or we overwrite that promise with a new polygon instance. **From versions above v2.0.1** every polygon and component is saved in its own promise and is independent to other components.
- **We strongly recommend to set the `polygonKey` prop on each polygon**, we use this key to get the correct polygon instance.

:::

This composable is similar to the previous above, the only difference is that it return the polygon object from the Google Maps API.

```ts title="How to use it" showLineNumbers
/**
 * This function returns a promise, when it is resolved returns the Google Map Polygon component instance
 *
 * @param  {string} key - the polygonKey prop of the Polygon
 * @returns {Promise}
 * @public
 */
export function usePolygonPromise(
  key: string | InjectionKey<Promise<google.maps.Polygon | undefined>> = $polygonShapePromise,
): Promise<google.maps.Polygon | undefined> {
  return usePromise<google.maps.Polygon>(key);
}
```

:::warning
If the polygon object was not loaded yet the composable function returns `undefined`.
:::

## `usePolylinePromise`

:::warning

- From **v2.0.1 and below** we only use one instance of polyline, because in the previous implementation we always use the same promise to return the same polyline or we overwrite that promise with a new polyline instance. **From versions above v2.0.1** every polyline and component is saved in its own promise and is independent to other components.
- **We strongly recommend to set the `polylineKey` prop on each polyline**, we use this key to get the correct polyline instance.

:::

This composable is similar to the previous above, the only difference is that it return the polyline object from the Google Maps API.

```ts title="How to use it" showLineNumbers
/**
 * This function returns a promise, when it is resolved returns the Google Map Polyline component instance
 *
 * @param  {string} key - the polylineKey prop of the Polyline
 * @returns {Promise}
 * @public
 */
export function usePolylinePromise(
  key: string | InjectionKey<Promise<google.maps.Polyline | undefined>> = $polylineShapePromise,
): Promise<google.maps.Polyline | undefined> {
  return usePromise<google.maps.Polyline>(key);
}
```

:::warning
If the polyline object was not loaded yet the composable function returns `undefined`.
:::

## `useRectanglePromise`

:::warning

- From **v2.0.1 and below** we only use one instance of rectangle, because in the previous implementation we always use the same promise to return the same rectangle or we overwrite that promise with a new rectangle instance. **From versions above v2.0.1** every rectangle and component is saved in its own promise and is independent to other components.
- **We strongly recommend to set the `rectangleKey` prop on each rectangle**, we use this key to get the correct rectangle instance.

:::

This composable is similar to the previous above, the only difference is that it return the rectangle object from the Google Maps API.

```ts title="How to use it" showLineNumbers
/**
 * This function returns a promise, when it is resolved returns the Google Map Rectangle component instance
 *
 * @param  {string} key - the rectangleKey prop of the Rectangle
 * @returns {Promise}
 * @public
 */
export function useRectanglePromise(
  key: string | InjectionKey<Promise<google.maps.Rectangle | undefined>> = $rectangleShapePromise,
): Promise<google.maps.Rectangle | undefined> {
  return usePromise<google.maps.Rectangle>(key);
}
```

:::warning
If the rectangle object was not loaded yet the composable function returns `undefined`.
:::
