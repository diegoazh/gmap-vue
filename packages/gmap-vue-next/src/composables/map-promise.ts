import { $mapPromise } from '@/keys/gmap-vue.keys';
import { inject, reactive, ref, type Ref } from 'vue';

interface MapPromiseDeferred {
  resolve: ((value: google.maps.Map | undefined) => void) | undefined;
  reject: ((reason?: any) => void) | undefined;
}

const map: Ref<google.maps.Map | undefined> = ref();
const mapPromiseDeferred: MapPromiseDeferred = reactive({
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
 * INTERNAL
 *
 * @returns Ref
 */
export function getMap(): Ref<google.maps.Map | undefined> {
  return map;
}

/**
 * INTERNAL
 *
 * @returns void
 */
export function getMapPromise(): Promise<google.maps.Map | undefined> {
  return promise;
}

/**
 * INTERNAL
 *
 * @returns void
 */
export function getMapPromiseDeferred(): MapPromiseDeferred {
  return mapPromiseDeferred;
}

/**
 * EXPOSED
 *
 * @returns Promise
 */
export async function injectMapPromise(): Promise<google.maps.Map | undefined> {
  return inject($mapPromise);
}
