import { $mapPromise } from '@/keys/gmap-vue.keys';
import { provide, reactive, ref } from 'vue';
const $mapObject = ref();
const $mapPromiseDeferred = reactive({
    resolve: undefined,
    reject: undefined,
});
const promise = new Promise((resolve, reject) => {
    $mapPromiseDeferred.resolve = resolve;
    $mapPromiseDeferred.reject = reject;
});
export function provideMapPromise() {
    provide($mapPromise, promise);
}
export function useMapObjectOrMapPromiseDeferred() {
    return { $mapObject, $mapPromiseDeferred };
}
