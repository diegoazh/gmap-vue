import type { ILoadPluginOptions } from '@/interfaces/gmap-vue.interface';
import type { GoogleMapsAPIInitializerFn } from '@/types/gmap-vue.types';

/**
 * This function returns the initializer function, it is exported
 * in that way because we need to generate a closure to define a
 * private property called `isApiSetUp` to detect if the Google Maps
 * API was initializer in a previous execution.
 * The function that it exports is the function that we use inside
 * promise-lazy file to initialize the Google Maps API if it is required.
 *
 * @returns {(options: ILoadPluginOptions, loadCn?: boolean) => void} The initializer function
 */
function googleMapsAPIInitializerFactory(): GoogleMapsAPIInitializerFn {
  let isApiSetUp = false;

  return (options: ILoadPluginOptions, loadCn = false): void => {
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
}

const googleMapsApiInitializer = googleMapsAPIInitializerFactory();

export { googleMapsApiInitializer };
