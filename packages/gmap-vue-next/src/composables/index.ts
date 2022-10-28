import { useMapPromise } from './map-promise';
import { useResizeBus } from './resize-bus';
import { useGoogleMapsApiPromiseLazy } from './promise-lazy-builder';
import { useStreetViewPanoramaPromise } from './street-view-panorama-promise';

/**
 * Export all composables
 *
 * @type  {Object} Composables
 * @property  {Function}  useMapPromise - Function that returns a promise when is resolved returns the map-layer component object
 * @property  {Function}  useResizeBus - Function that returns an object with the default resize buz and two helper functions
 * @property  {Function}  useGoogleMapsApiPromiseLazy - Function that returns a promise when is resolve returns the original Google Maps API
 * @property  {Function}  useStreetViewPanoramaPromise - Function that returns a promise when is resolved returns the street-view-panorama component object
 */
export default {
  getMapPromise: useMapPromise,
  useResizeBus,
  useGmapApiPromiseLazy: useGoogleMapsApiPromiseLazy,
  getStreetViewPanoramaPromise: useStreetViewPanoramaPromise,
};
