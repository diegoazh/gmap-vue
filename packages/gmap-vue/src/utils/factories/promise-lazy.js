import { getLazyValue } from '../helpers';

/**
 * This function is a factory of the promise lazy creator
 * it helps you creating the function that will call the
 * Google Maps API in an async way
 *
 * @param  {Function} googleMapsApiInitializer function that initialize the Google Maps API
 * @param  {Object} GoogleMapsApi Vue instance that will help to know if the google API object is ready
 * @returns {Function}
 */
function getPromiseLazyCreatorFn(googleMapsApiInitializer, GoogleMapsApi) {
  /**
   * The creator of the lazy promise
   *
   * @param  {Object|undefined} options=undefined configuration object to initialize the GmapVue plugin
   * @param  {boolean} options.installComponents=true install all components
   * @param  {boolean} options.autoBindAllEvents=false auto bind all Google Maps API events
   * @param  {Object|undefined} options.load=undefined options to configure the Google Maps API
   * @param  {string} options.load.key your Google Maps API key
   * @param  {string} options.load.libraries=places the Google Maps libraries that you will use eg: 'places,drawing,visualization'
   * @param  {string|undefined} options.load.v=undefined the Google Maps API version, default latest
   * @param  {string|undefined} options.load.callback=GoogleMapsCallback This must be ignored if have another callback that you need to run when Google Maps API is ready please use the `customCallback` option.
   * @param  {string|undefined} options.load.customCallback=undefined If you already have an script tag that loads Google Maps API and you want to use it set you callback in the `customCallback` option and our `GoogleMapsCallback` callback will execute your custom callback at the end; it must attached to the `window` object, is the only requirement.
   */
  const promiseLazyCreator = (options) => {
    /**
     * Things to do once the API is loaded
     *
     * @returns {Object} the Google Maps API object
     */
    function onMapsReady() {
      GoogleMapsApi.isReady = true;
      return window.google;
    }

    // If library should load the API
    if (options?.load?.key) {
      return getLazyValue(() => {
        // This will only be evaluated once
        if (typeof window === 'undefined') {
          // server side -- never resolve this promise
          return new Promise(() => {}).then(onMapsReady);
        }

        return new Promise((resolve, reject) => {
          try {
            window.GoogleMapsCallback = () => {
              resolve();
              window[options?.load?.customCallback]?.();
            };
            googleMapsApiInitializer(options.load, options.loadCn);
          } catch (err) {
            reject(err);
          }
        }).then(onMapsReady);
      });
    }

    // If library should not handle API, provide
    // end-users with the global `GoogleMapsCallback: () => undefined`
    // when the Google Maps API has been loaded
    const promise = new Promise((resolve) => {
      if (typeof window === 'undefined') {
        // Do nothing if run from server-side
        return;
      }
      window.GoogleMapsCallback = () => {
        resolve();
        window[options?.load?.customCallback]?.();
      };
    }).then(onMapsReady);

    return getLazyValue(() => promise);
  };

  return promiseLazyCreator;
}

export default getPromiseLazyCreatorFn;
