import { $mapPromise } from '@/keys/gmap-vue.keys';
import { provide, reactive, ref, type Ref } from 'vue';

export interface MapPromiseDeferred {
  resolve: ((value: unknown) => void) | undefined;
  reject: ((reason?: any) => void) | undefined;
}

const $mapObject: Ref<google.maps.Map | undefined> = ref();
const $mapPromiseDeferred: MapPromiseDeferred = reactive({
  resolve: undefined,
  reject: undefined,
});

const promise = new Promise((resolve, reject) => {
  $mapPromiseDeferred.resolve = resolve;
  $mapPromiseDeferred.reject = reject;
});

export function provideMapPromise(): void {
  provide($mapPromise, promise);
}
export function useMapObjectOrMapPromiseDeferred(): {
  $mapObject: Ref<google.maps.Map | undefined>;
  $mapPromiseDeferred: MapPromiseDeferred;
} {
  return { $mapObject, $mapPromiseDeferred };
}
