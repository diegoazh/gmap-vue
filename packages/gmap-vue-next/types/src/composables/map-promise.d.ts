/// <reference types="google.maps" />
import { type Ref } from 'vue';
export interface MapPromiseDeferred {
    resolve: ((value: unknown) => void) | undefined;
    reject: ((reason?: any) => void) | undefined;
}
export declare function provideMapPromise(): void;
export declare function useMapObjectOrMapPromiseDeferred(): {
    $mapObject: Ref<google.maps.Map | undefined>;
    $mapPromiseDeferred: MapPromiseDeferred;
};
