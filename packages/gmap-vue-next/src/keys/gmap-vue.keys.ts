import type { InjectionKey } from 'vue';
import type { MarkerClusterer } from '@googlemaps/markerclusterer';

export const $mapPromise = Symbol('mapPromise') as InjectionKey<
  Promise<google.maps.Map | undefined>
>;
export const $streetViewPanoramaPromise = Symbol(
  'streetViewPanoramaPromise'
) as InjectionKey<Promise<google.maps.StreetViewPanorama | undefined>>;
export const $clusterPromise = Symbol('clusterPromise') as InjectionKey<
  Promise<MarkerClusterer | undefined>
>;
export const $markerPromise = Symbol('markerPromise') as InjectionKey<
  Promise<google.maps.Marker | undefined>
>;
export const $infoWindowPromise = Symbol('infoWindowPromise') as InjectionKey<
  Promise<google.maps.InfoWindow | undefined>
>;
export const $kmlLayerPromise = Symbol('kmlLayerPromise') as InjectionKey<
  Promise<google.maps.KmlLayer | undefined>
>;
export const $heatmapLayerPromise = Symbol(
  'heatmapLayerPromise'
) as InjectionKey<Promise<google.maps.visualization.HeatmapLayer | undefined>>;
export const $circleShapePromise = Symbol('circleShapePromise') as InjectionKey<
  Promise<google.maps.Circle | undefined>
>;
