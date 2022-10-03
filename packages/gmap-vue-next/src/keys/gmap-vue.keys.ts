import type { InjectionKey } from 'vue';
import type { MarkerClusterer } from '@googlemaps/markerclusterer';

export const $mapPromise = Symbol('mapPromise') as InjectionKey<
  Promise<google.maps.Map | undefined>
>;
export const $clusterPromise = Symbol('clusterPromise') as InjectionKey<
  Promise<MarkerClusterer | undefined>
>;
export const $markerPromise = Symbol('markerPromise') as InjectionKey<
  Promise<google.maps.Marker | undefined>
>;
export const $infoWindowPromise = Symbol('infoWindowPromise') as InjectionKey<
  Promise<google.maps.InfoWindow | undefined>
>;
// export const $map = Symbol() as InjectionKey<google.maps.Map | undefined>;
// export const $googleMapsAPIPromise = Symbol() as InjectionKey<Promise<void>>;
