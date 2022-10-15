import type { ILoadPluginOptions } from '@/interfaces/gmap-vue.interface';
import type { GoogleMapsAPIInitializerFn } from '@/types/gmap-vue.types';

/**
 * This function returns the initializer function, it is exported
 * in that way because we need to generate a closure to define a
 * private property called `isApiSetUp` to detect if the Google Maps
 * API was initializer in a previous execution.
 * The function that it exports is the function that we use inside
 * of promise-lazy file to initialize the Google Maps API if
 * it is required.
 *
 * @returns {Function} The initializer function
 */
function googleMapsAPIInitializerFactory(): GoogleMapsAPIInitializerFn {
  let isApiSetUp = false;

  /**
   * The initializer function, it adds into the head of the page the Google Maps API script tag to loads the library
   *
   * @param {Object|undefined} options=undefined The configuration Object. (@see https://developers.google.com/maps/documentation/javascript/url-params)
   *                         `libraries`.
   * @param  {string} options.key Your Google Maps API key
   * @param  {string} options.libraries=places The Google Maps libraries that you will use eg: 'places,drawing,visualization', can be given as an array too (@see https://developers.google.com/maps/documentation/javascript/libraries)
   * @param  {string|undefined} options.v=undefined The Google Maps API version, default latest
   * @param  {string|undefined} options.callback=GoogleMapsCallback This must be ignored if have another callback that you need to run when Google Maps API is ready please use the `customCallback` option.
   * @param  {string|undefined} options.customCallback=undefined DEPRECATED - This option was added on v3.0.0 but will be removed in the next major release. If you already have an script tag that loads Google Maps API and you want to use it set you callback in the `customCallback` option and our `GoogleMapsCallback` callback will execute your custom callback at the end; it must attached to the `window` object, is the only requirement.
   * @param {boolean} loadCn=false    Boolean. If set to true, the map will be loaded from google maps China
   *                  (@see https://developers.google.com/maps/documentation/javascript/basics#GoogleMapsChina)
   */
  const googleMapsAPIInitializerFn: GoogleMapsAPIInitializerFn = (
    options: ILoadPluginOptions,
    loadCn = false
  ): void => {
    /**
     * Allow options to be an object.
     * This is to support more esoteric means of loading Google Maps,
     * such as Google for business
     * https://developers.google.com/maps/documentation/javascript/get-api-key#premium-auth
     */
    if (Array.isArray(options) || typeof options !== 'object') {
      throw new Error('options should  be an object');
    }

    // Do nothing if run from server-side
    if (typeof document === 'undefined') {
      return;
    }

    const finalOptions = { ...options };
    const { libraries } = finalOptions;

    if (!isApiSetUp) {
      isApiSetUp = true;
      const baseUrl = loadCn
        ? 'https://maps.google.cn'
        : 'https://maps.googleapis.com';

      const googleMapScript = document.createElement('SCRIPT');

      // libraries
      if (Array.isArray(libraries)) {
        finalOptions.libraries = libraries.join(',');
      }

      finalOptions.callback = 'GoogleMapsCallback';

      const query = (
        Object.keys(finalOptions) as Array<keyof ILoadPluginOptions>
      )
        .map((key) => {
          if (finalOptions[key]) {
            return `${encodeURIComponent(key)}=${encodeURIComponent(
              finalOptions[key] as string
            )}`;
          }

          return '';
        })
        .join('&');

      const url = `${baseUrl}/maps/api/js?${query}`;

      googleMapScript.setAttribute('src', url);
      googleMapScript.setAttribute('async', '');
      googleMapScript.setAttribute('defer', '');
      document.head.appendChild(googleMapScript);
    } else {
      window.console.info('You already started the loading of google maps');
    }
  };

  return googleMapsAPIInitializerFn;
}

const googleMapsApiInitializer = googleMapsAPIInitializerFactory();

export { googleMapsApiInitializer };
