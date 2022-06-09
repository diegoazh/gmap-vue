import type { IGoogleMapsApiObject } from '@/interfaces/gmap-vue.interface';
import type { GoogleMapsAPIInitializerFn, PromiseLazyCreatorFn } from '@/types/gmap-vue.types';
/**
 * This function is a factory of the promise lazy creator
 * it helps you creating the function that will call the
 * Google Maps API in an async way
 *
 * @param  {Function} googleMapsApiInitializer function that initialize the Google Maps API
 * @param  {Object} GoogleMapsApi Vue app instance that will help to know if the google API object is ready
 * @returns {Function}
 */
declare function getPromiseLazyCreatorFn(googleMapsApiInitializer: GoogleMapsAPIInitializerFn, GoogleMapsApi: IGoogleMapsApiObject): PromiseLazyCreatorFn;
export default getPromiseLazyCreatorFn;
