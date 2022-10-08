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
 * INTERNAL
 *
 * @returns void
 */
export function getStreetViewPanoramaPromise(): Promise<
  google.maps.StreetViewPanorama | undefined
> {
  return promise;
}

/**
 * INTERNAL
 *
 * @returns void
 */
export function getStreetViewPanoramaPromiseDeferred(): PromiseDeferred<google.maps.StreetViewPanorama> {
  return streetViewPanoramaPromiseDeferred;
}
