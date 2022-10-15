import { getMapPromise } from './map-promise';
import { useResizeBus } from './resize-bus';
import { useGmapApiPromiseLazy } from './promise-lazy-builder';
import { getStreetViewPanoramaPromise } from './street-view-panorama-promise';

/**
 * Export all composables
 *
 * @type  {Object} Composables
 * @property  {Function}  getMapPromise - Function that returns a promise when is resolved returns the map-layer component object
 * @property  {Function}  useResizeBus - Function that returns an object with the default resize buz and two helper functions
 * @property  {Function}  useGmapApiPromiseLazy - Function that returns a promise when is resolve returns the original Google Maps API
 * @property  {Function}  getStreetViewPanoramaPromise - Function that returns a promise when is resolved returns the street-view-panorama component object
 */
export default {
  getMapPromise,
  useResizeBus,
  useGmapApiPromiseLazy,
  getStreetViewPanoramaPromise,
};
