import type { IGmapVuePluginOptions, IGoogleMapsApiObject } from '@/interfaces';
import { $gmapApiPromiseLazy, $gmapOptions } from '@/keys';
import type {
  TGlobalGoogleObject,
  TGoogleMapsAPIInitializerFn,
  TLazyValueGetterFn,
  TPromiseLazyCreatorFn,
} from '@/types';
import { getCurrentInstance, inject } from 'vue';
import { getLazyValue } from './helpers';

let $finalOptions: IGmapVuePluginOptions | undefined;
let $googleMapsApiPromiseLazy:
  | TLazyValueGetterFn<TGlobalGoogleObject | undefined>
  | undefined;

const googleMapsReadyCallbacks = new Set<() => void>();

function dispatchGoogleMapsReadyCallbacks(): void {
  for (const callback of Array.from(googleMapsReadyCallbacks)) {
    callback();
  }
}

function ensureGlobalGoogleMapsCallback(): void {
  globalThis.GoogleMapsCallback = dispatchGoogleMapsReadyCallbacks;
}

/**
 * This function is a factory of the promise lazy creator
 * it helps you to create the function that will call the
 * Google Maps API in an async way
 *
 * @param  {Function} googleMapsApiInitializer function that initialize the Google Maps API
 * @param  {Object} GoogleMapsApi Vue app instance that will help to know if the Google API object is ready
 * @returns {(options: IGmapVuePluginOptions) => TLazyValueGetterFn}
 *
 * @internal
 */
export function usePromiseLazyBuilderFn(
  googleMapsApiInitializer: TGoogleMapsAPIInitializerFn,
  GoogleMapsApi: IGoogleMapsApiObject,
): TPromiseLazyCreatorFn {
  return (
    options: IGmapVuePluginOptions,
  ): TLazyValueGetterFn<TGlobalGoogleObject | undefined> => {
    /**
     * Things to do once the API is loaded
     *
     * @returns {Object} the Google Maps API object
     */
    function onMapsReady(): TGlobalGoogleObject | undefined {
      GoogleMapsApi.isReady = true;
      return globalThis.google;
    }

    return getLazyValue(() => {
      if (typeof window === 'undefined') {
        return Promise.resolve(undefined);
      }

      return createFinalPromise(options, googleMapsApiInitializer).then(
        onMapsReady,
      );
    });
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
function createCallbackAndChecksIfMapIsLoaded(resolveFn: () => void): void {
  let callbackExecuted = false;
  let timeoutId: number | undefined;
  let intervalId: number | undefined;

  function cleanupTimers(): void {
    if (timeoutId !== undefined) {
      globalThis.clearTimeout(timeoutId);
      timeoutId = undefined;
    }

    if (intervalId !== undefined) {
      globalThis.clearInterval(intervalId);
      intervalId = undefined;
    }
  }

  function resolveCurrentCallback(): void {
    if (callbackExecuted) {
      return;
    }

    try {
      resolveFn();
    } catch (error) {
      globalThis.console.error('Error executing the GoogleMapsCallback', error);
    } finally {
      callbackExecuted = true;
      cleanupTimers();
      googleMapsReadyCallbacks.delete(resolveCurrentCallback);
    }
  }

  googleMapsReadyCallbacks.add(resolveCurrentCallback);
  ensureGlobalGoogleMapsCallback();

  timeoutId = window.setTimeout(() => {
    const runtimeWindow = window as Window & { google?: TGlobalGoogleObject };

    intervalId = window.setInterval(() => {
      if (runtimeWindow.google?.maps != null) {
        resolveCurrentCallback();
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
 * @param  {TGoogleMapsAPIInitializerFn} googleMapsApiInitializer
 * @internal
 */
function createFinalPromise(
  options: IGmapVuePluginOptions,
  googleMapsApiInitializer: TGoogleMapsAPIInitializerFn,
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      createCallbackAndChecksIfMapIsLoaded(resolve);

      if (!options.dynamicLoad && options.load) {
        googleMapsApiInitializer(options.load);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        reject(err);
      } else {
        global.console.error(JSON.stringify(err, null, 2));
        const error = new Error(
          'unknown error - check the console to see the original error',
        );
        reject(error);
      }
    }
  });
}

/**
 * This function helps to save the final options passed to the plugin and
 * the function to get the promise useful to wait until the Google Maps API
 * is loaded and ready to use it
 *
 * @param  {IGmapVuePluginOptions} finalOptions
 * @param  {TLazyValueGetterFn} googleMapsApiPromiseLazy
 * @returns void
 *
 * @internal
 */
export function saveLazyPromiseAndFinalOptions(
  finalOptions: IGmapVuePluginOptions,
  googleMapsApiPromiseLazy: TLazyValueGetterFn<TGlobalGoogleObject | undefined>,
): void {
  $finalOptions = finalOptions;
  $googleMapsApiPromiseLazy = googleMapsApiPromiseLazy;
}

function useInjectedGoogleMapsApiPromiseLazy():
  | TLazyValueGetterFn<TGlobalGoogleObject | undefined>
  | undefined {
  if (!getCurrentInstance()) {
    return undefined;
  }

  return inject($gmapApiPromiseLazy, undefined);
}

function useInjectedPluginOptions(): IGmapVuePluginOptions | undefined {
  if (!getCurrentInstance()) {
    return undefined;
  }

  return inject($gmapOptions, undefined);
}

/**
 * This function returns a promise when is resolved returns the original Google
 * Maps API. With this promise you can wait until the Google Maps API is fully
 * loaded.
 *
 * @public
 * @returns {Promise<any>}
 */
export function useGoogleMapsApiPromiseLazy():
  | Promise<TGlobalGoogleObject | undefined>
  | undefined {
  const googleMapsApiPromiseLazy =
    useInjectedGoogleMapsApiPromiseLazy() ?? $googleMapsApiPromiseLazy;

  if (!googleMapsApiPromiseLazy) {
    globalThis.console.warn('$googleMapsApiPromiseLazy was not created yet...');
  }

  return googleMapsApiPromiseLazy?.();
}

/**
 * This function returns the configuration passed to the plugin
 *
 * @public
 * @returns IPluginOptions
 */
export function usePluginOptions(): IGmapVuePluginOptions | undefined {
  const finalOptions = useInjectedPluginOptions() ?? $finalOptions;

  if (!finalOptions) {
    globalThis.console.warn('$finalOptions was not defined yet...');
  }

  return finalOptions;
}
