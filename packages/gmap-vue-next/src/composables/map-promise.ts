import { reactive } from 'vue';
import type { PromiseDeferred } from '@/interfaces/gmap-vue.interface';

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
export function getMapPromiseDeferred(): PromiseDeferred<google.maps.Map> {
  return mapPromiseDeferred;
}
