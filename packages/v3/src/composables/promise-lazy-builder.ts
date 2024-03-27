import type { IGoogleMapsApiObject, IGmapVuePluginOptions } from '@/interfaces';
import type {
  GlobalGoogleObject,
  GoogleMapsAPIInitializerFn,
  LazyValueGetterFn,
  PromiseLazyCreatorFn,
} from '@/types';
import { getLazyValue } from './helpers';

let $finalOptions: IGmapVuePluginOptions;
let $googleMapsApiPromiseLazy: LazyValueGetterFn<GlobalGoogleObject>;

/**
 * This function is a factory of the promise lazy creator
 * it helps you to create the function that will call the
 * Google Maps API in an async way
 *
 * @param  {Function} googleMapsApiInitializer function that initialize the Google Maps API
 * @param  {Object} GoogleMapsApi Vue app instance that will help to know if the Google API object is ready
 * @returns {(options: IGmapVuePluginOptions) => LazyValueGetterFn}
 *
 * @internal
 */
export function usePromiseLazyBuilderFn(
  googleMapsApiInitializer: GoogleMapsAPIInitializerFn,
  GoogleMapsApi: IGoogleMapsApiObject
): PromiseLazyCreatorFn {
  return (
    options: IGmapVuePluginOptions
  ): LazyValueGetterFn<GlobalGoogleObject> => {
    /**
     * Things to do once the API is loaded
     *
     * @returns {Object} the Google Maps API object
     */
    function onMapsReady(): GlobalGoogleObject {
      GoogleMapsApi.isReady = true;
      return globalThis.google;
    }

    return getLazyValue(() =>
      createFinalPromise(options, googleMapsApiInitializer, onMapsReady)
    );
  };
}

/**
 * This function allow to autodetect an external load of the Google Maps API
 * or load it dynamically from our component.
 *
 * @param  {Function} resolveFn the function that indicates to the plugin that Google Maps is loaded
 *
 * @internal
 */
function createCallbackAndChecksIfMapIsLoaded(resolveFn: Function): void {
  let callbackExecuted = false;

  globalThis.GoogleMapsCallback = (): void => {
    try {
      resolveFn();
      callbackExecuted = true;
    } catch (error) {
      globalThis.console.error('Error executing the GoogleMapsCallback', error);
    }
  };

  let timeoutId: number | undefined = window.setTimeout(() => {
    let intervalId: number | undefined = window.setInterval(() => {
      if (timeoutId) {
        globalThis.clearTimeout(timeoutId);
        timeoutId = undefined;
      }

      if (window?.google?.maps != null && !callbackExecuted) {
        globalThis.GoogleMapsCallback();
        callbackExecuted = true; // TODO: check this, is possible it can be removed. Assigned in the callback function.
      }

      if (callbackExecuted) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
    }, 500);
  }, 1000);
}

/**
 * This function creates the final promise
 * and helps to define if the plugin should load
 * the Google Maps API or not
 *
 * @param  {IGmapVuePluginOptions} options
 * @param  {GoogleMapsAPIInitializerFn} googleMapsApiInitializer
 * @param  {()=>GlobalGoogleObject} onMapsReady
 *
 * @internal
 */
function createFinalPromise(
  options: IGmapVuePluginOptions,
  googleMapsApiInitializer: GoogleMapsAPIInitializerFn,
  onMapsReady: () => GlobalGoogleObject
): Promise<GlobalGoogleObject> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Do nothing if run from server-side
      return undefined;
    }

    try {
      createCallbackAndChecksIfMapIsLoaded(resolve);

      if (!options.dynamicLoad && options.load) {
        googleMapsApiInitializer(options.load, options?.loadCn);
      }
    } catch (err) {
      reject(err);
    }
  }).then(onMapsReady);
}

/**
 * This function helps to save the final options passed to the plugin and
 * the function to get the promise useful to wait until the Google Maps API
 * is loaded and ready to use it
 *
 * @param  {IGmapVuePluginOptions} finalOptions
 * @param  {LazyValueGetterFn} googleMapsApiPromiseLazy
 * @returns void
 *
 * @internal
 */
export function saveLazyPromiseAndFinalOptions(
  finalOptions: IGmapVuePluginOptions,
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

/**
 * This function returns the configuration passed to the plugin
 *
 * @returns IPluginOptions
 */
export function usePluginOptions(): IGmapVuePluginOptions {
  if (!$finalOptions) {
    globalThis.console.warn('$finalOptions was not defined yet...');
  }

  return $finalOptions;
}
