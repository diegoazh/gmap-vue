import { useMapPromise } from './map-promise';
import { useGoogleMapsApiPromiseLazy } from './promise-lazy-builder';
import { useResizeBus } from './resize-bus';
import { useStreetViewPanoramaPromise } from './street-view-panorama-promise';

export * from './google-maps-api-initializer';
export * from './helpers';
export * from './map-promise';
export * from './plugin-component-builder';
export * from './plugin-component-config';
export * from './promise-lazy-builder';
export * from './resize-bus';
export * from './shapes-helper';
export * from './street-view-panorama-promise';

/**
 * Export all shared composables
 *
 * @type  {Object} Composables
 * @property  {Function}  useMapPromise - Function that returns a promise when is resolved returns the map-layer component object
 * @property  {Function}  useResizeBus - Function that returns an object with the default resize buz and two helper functions
 * @property  {Function}  useGoogleMapsApiPromiseLazy - Function that returns a promise when is resolve returns the original Google Maps API
 * @property  {Function}  useStreetViewPanoramaPromise - Function that returns a promise when is resolved returns the street-view-panorama component object
 */
export const sharedComposables = {
  useMapPromise,
  useResizeBus,
  useGoogleMapsApiPromiseLazy,
  useStreetViewPanoramaPromise,
};
