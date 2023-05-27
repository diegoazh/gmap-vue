import { reactive } from 'vue';
import type { PromiseDeferred } from '@/interfaces/gmap-vue.interface';

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

/**
 * INTERNAL
 *
 * @returns {Promise}
 */
export function useStreetViewPanoramaPromiseDeferred(): PromiseDeferred<google.maps.StreetViewPanorama> {
  return streetViewPanoramaPromiseDeferred;
}
