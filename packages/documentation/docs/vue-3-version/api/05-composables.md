---
id: composables
sidebar_position: 5
sidebar_label: composables
---
# The exposed composables

The plugin expose 6 composables from the following path `@gmap-vue/v3/composables`. You can use in your application using the composition API.

You can use it in the following way

```ts showLineNumbers
import {
  useMapPromise,
  useResizeBus,
  useGoogleMapsApiPromiseLazy,
  useStreetViewPanoramaPromise,
  usePluginOptions,
} from '@gmap-vue/v3/composables';

const promise = useMapPromise();
// ...
```

## `useMapPromise`

This composable returns a promise and, when it is resolved return the `GmvMap` component.

You can use it to be sure that the `GmvMap` component is ready.

```ts showLineNumbers
import { useMapPromise } from '@gmap-vue/v3/composables';

const promise = useMapPromise();

onMounted(async () => {
  await promise;

  // Do something when GmvMap component is ready
})
```

### `useMapPromise` API

```ts showLineNumbers
const mapPromiseDeferred: PromiseDeferred<google.maps.Map> = reactive({
  resolve: undefined,
  reject: undefined,
});
const promise: Promise<google.maps.Map | undefined> = new Promise(
  (resolve, reject) => {
    mapPromiseDeferred.resolve = resolve;
    mapPromiseDeferred.reject = reject;
  }
);

/**
 * This function returns a promise, when it is resolved returns the map-layer component
 * object
 *
 * @public
 * @returns {Promise}
 */
export function useMapPromise(): Promise<google.maps.Map | undefined> {
  return promise;
}
```

When the GmvMap component is initialized and the map is ready this promise is resolved

```ts title="map-layer.vue" showLineNumbers
//...

const mapPromiseDeferred = useMapPromiseDeferred();
mapPromiseDeferred.resolve(mapInstance);

// ...
```

## `useResizeBus`

This composable returns the `currentResizeBus`, `_resizeCallback`, `_delayedResizeCallback`. If you provide your own resize bus through the `GmvMap` component props, it should be assigned to the `currentResizeBus` otherwise the `defaultResizeBus` (a mitt object) should be assigned to it.

You can use it in the following way

```ts showLineNumbers
import { useResizeBus } from '@gmap-vue/v3/composables';

const { currentResizeBus, _resizeCallback, _delayedResizeCallback } = useResizeBus();

currentResizeBus.emit('foo', { a: 'b' });
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

## `useGoogleMapsApiPromiseLazy`

This composable return the a promise that when it is resolved return the global `google` object, this mean the `window.google` object added to the `globalThis` object bye the Google Maps API.

You can use it in the following way

```ts showLineNumbers
import { useGoogleMapsApiPromiseLazy } from '@gmap-vue/v3/composables';

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
let $googleMapsApiPromiseLazy: LazyValueGetterFn<GlobalGoogleObject>;

/**
 * This function helps to save the final options passed to the plugin and
 * the function to get the promise useful to wait until the Google Maps API
 * is loaded and ready to use it
 *
 * @param  {IPluginOptions} finalOptions
 * @param  {LazyValueGetterFn} googleMapsApiPromiseLazy
 * @returns void
 *
 * @internal
 */
export function saveLazyPromiseAndFinalOptions(
  finalOptions: IPluginOptions,
  googleMapsApiPromiseLazy: LazyValueGetterFn<GlobalGoogleObject>
): void {
  if (!$finalOptions) {
    $finalOptions = finalOptions;
  }

  if (!$googleMapsApiPromiseLazy) {
    $googleMapsApiPromiseLazy = googleMapsApiPromiseLazy;
  }
}

/**
 * This function returns a promise when is resolved returns the original Google
 * Maps API. With this promise you can wait until the Google Maps API is fully
 * loaded.
 *
 * @public
 * @returns {Promise<any>}
 */
export function useGoogleMapsApiPromiseLazy(): Promise<
  GlobalGoogleObject | undefined
> {
  if (!$googleMapsApiPromiseLazy) {
    globalThis.console.warn('$googleMapsApiPromiseLazy was not created yet...');
  }

  return $googleMapsApiPromiseLazy?.();
}
```

Like the plugin options this lazy promise is saved when the plugin is loaded

```ts title="main.ts" showLineNumbers
  /**
   * Use a lazy to only load the API when
   * a GMap component is loaded
   *
   * @constant
   * @type {Function} the promise lazy creator function
   */
  const promiseLazyCreator = usePromiseLazyBuilderFn(
    googleMapsApiInitializer,
    globalThis.GoogleMapsApi
  );
  /**
   * The googleMapsApiPromiseLazy function to can wait until Google Maps API is ready
   *
   * @constant
   * @type {Function}
   */
  const googleMapsApiPromiseLazy = promiseLazyCreator(finalOptions);
  saveLazyPromiseAndFinalOptions(finalOptions, googleMapsApiPromiseLazy);
```

:::info

- Check the `LazyValueGetterFn` type [here](/docs/vue-3-version/api/types#lazyvaluegetterfn)
- Check the `GlobalGoogleObject` type [here](/docs/vue-3-version/api/types#GlobalGoogleObject)

:::

## `useStreetViewPanoramaPromise`

This composable is similar to the previous above, the only difference is that it return the street view panorama object from the Google Maps API.

How to use it

```ts showLineNumbers
import { useStreetViewPanoramaPromise } from '@gmap-vue/v3/composables';

const streetPromise = useStreetViewPanoramaPromise();

if (streetPromise) {
  const googleObject = await streetPromise; // this is Promise<google.maps.StreetViewPanorama | undefined>
}
```

:::warning
If the Street View Panorama object was not loaded yet the composable function returns `undefined`.
:::

### `useStreetViewPanoramaPromise` API

```ts showLineNumbers
const streetViewPanoramaPromiseDeferred: PromiseDeferred<google.maps.StreetViewPanorama> =
  reactive({
    resolve: undefined,
    reject: undefined,
  });
const promise: Promise<google.maps.StreetViewPanorama | undefined> =
  new Promise((resolve, reject) => {
    streetViewPanoramaPromiseDeferred.resolve = resolve;
    streetViewPanoramaPromiseDeferred.reject = reject;
  });

/**
 * This function returns a promise when resolved returns the street-view-panorama
 * component object
 *
 * @public
 * @returns {Promise}
 */
export function useStreetViewPanoramaPromise(): Promise<
  google.maps.StreetViewPanorama | undefined
> {
  return promise;
}
```

:::warning
This promise is resolved when the Google Street View Panorama object is loaded by the `GmvStreetViewPanorama` component
:::

## `usePluginOptions`

This composable return the final options object used by the plugin when it was initialized.

How to use it

```ts showLineNumbers
import { usePluginOptions } from '@gmap-vue/v3/composables';

const options = usePluginOptions();

// do something with the options
```

### `usePluginOptions` API

- Check the [**Options Interface**](/docs/vue-3-version/api/gmap-vue-plugin#plugin-options)

- The options are saved when the plugin is load as we show below

```ts title="main.ts" showLineNumbers
  /**
   * Use a lazy to only load the API when
   * a GMap component is loaded
   *
   * @constant
   * @type {Function} the promise lazy creator function
   */
  const promiseLazyCreator = usePromiseLazyBuilderFn(
    googleMapsApiInitializer,
    globalThis.GoogleMapsApi
  );
  /**
   * The googleMapsApiPromiseLazy function to can wait until Google Maps API is ready
   *
   * @constant
   * @type {Function}
   */
  const googleMapsApiPromiseLazy = promiseLazyCreator(finalOptions);
  saveLazyPromiseAndFinalOptions(finalOptions, googleMapsApiPromiseLazy);
```

- The core API of this composable

```ts showLineNumbers
let $finalOptions: IPluginOptions;

/**
 * This function helps to save the final options passed to the plugin and
 * the function to get the promise useful to wait until the Google Maps API
 * is loaded and ready to use it
 *
 * @param  {IPluginOptions} finalOptions
 * @param  {LazyValueGetterFn} googleMapsApiPromiseLazy
 * @returns void
 *
 * @internal
 */
export function saveLazyPromiseAndFinalOptions(
  finalOptions: IPluginOptions,
  googleMapsApiPromiseLazy: LazyValueGetterFn<GlobalGoogleObject>
): void {
  if (!$finalOptions) {
    $finalOptions = finalOptions;
  }

  if (!$googleMapsApiPromiseLazy) {
    $googleMapsApiPromiseLazy = googleMapsApiPromiseLazy;
  }
}

/**
 * This function returns the configuration passed to the plugin
 *
 * @returns IPluginOptions
 */
export function usePluginOptions(): IPluginOptions {
  if (!$finalOptions) {
    globalThis.console.warn('$finalOptions was not defined yet...');
  }

  return $finalOptions;
}
```

:::warning
The `saveLazyPromiseAndFinalOptions` is internal and it is not exposed by the plugin
:::
