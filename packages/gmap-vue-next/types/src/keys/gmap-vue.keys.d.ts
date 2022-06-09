/// <reference types="google.maps" />
import type { InjectionKey } from 'vue';
export declare const $map: InjectionKey<google.maps.Map | undefined>;
export declare const $mapPromise: InjectionKey<Promise<google.maps.Map | undefined>>;
