import type { InjectionKey } from 'vue';

export const $mapPromise = Symbol('mapPromise') as InjectionKey<
  Promise<google.maps.Map | undefined>
>;
export const $clusterPromise = Symbol('clusterPromise') as InjectionKey<
  Promise<any | undefined> // TODO: type this any
>;
export const $markerPromise = Symbol('markerPromise') as InjectionKey<
  Promise<google.maps.Marker | undefined> // TODO: type this any
>;
// export const $map = Symbol() as InjectionKey<google.maps.Map | undefined>;
// export const $googleMapsAPIPromise = Symbol() as InjectionKey<Promise<void>>;
