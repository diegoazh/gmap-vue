/**
 * @param options   Object. (@see https://developers.google.com/maps/documentation/javascript/url-params)
 *                  `libraries` can be given as an array. (@see https://developers.google.com/maps/documentation/javascript/libraries)
 *                  `callback` is ignored/overwritten.
 * @param loadCn    Boolean. If set to true, the map will be loaded from google maps China
 *                  (@see https://developers.google.com/maps/documentation/javascript/basics#GoogleMapsChina)
 */

export default (() => {
  let isApiSetUp = false;

  return (options, loadCn) => {
    // Allow options to be an object.
    // This is to support more esoteric means of loading Google Maps,
    // such as Google for business
    // https://developers.google.com/maps/documentation/javascript/get-api-key#premium-auth
    if (typeof options !== 'object') {
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
      const baseUrl =
        typeof loadCn === 'boolean' && loadCn
          ? 'https://maps.google.cn'
          : 'https://maps.googleapis.com';

      const googleMapScript = document.createElement('SCRIPT');

      // libraries
      if (Array.isArray(libraries)) {
        finalOptions.libraries = libraries.join(',');
      }

      finalOptions.callback = 'vueGoogleMapsInit';

      const query = Object.keys(finalOptions)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              finalOptions[key]
            )}`
        )
        .join('&');

      const url = `${baseUrl}/maps/api/js?${query}`;

      googleMapScript.setAttribute('src', url);
      googleMapScript.setAttribute('async', '');
      googleMapScript.setAttribute('defer', '');
      document.head.appendChild(googleMapScript);
    } else {
      throw new Error('You already started the loading of google maps');
    }
  };
})();
