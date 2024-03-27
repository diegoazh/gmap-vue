import {
  Autocomplete,
  Circle,
  Cluster,
  DrawingManager,
  HeatmapLayer,
  InfoWindow,
  KmlLayer,
  MapLayer,
  Marker,
  Polygon,
  Polyline,
  Rectangle,
  StreetViewPanorama,
} from '@/components';
import {
  googleMapsApiInitializer,
  pluginComponentBuilder,
  saveLazyPromiseAndFinalOptions,
  sharedComposables,
  usePromiseLazyBuilderFn,
} from '@/composables';
import type { IGmapVuePluginOptions, IGoogleMapsApiObject } from '@/interfaces';
import type { GlobalGoogleObject, GmvComponents, GmvUtilities } from '@/types';
import type { Emitter, EventType } from 'mitt';
import type { App, FunctionPlugin, Plugin } from 'vue';

/**
 * Vue augmentations
 */
declare module 'vue' {
  interface ComponentCustomProperties {
    $gmapDefaultResizeBus: Emitter<Record<EventType, unknown>>;
    $gmapApiPromiseLazy: () => Promise<any>;
    $gmapOptions: IGmapVuePluginOptions;
  }
}

declare global {
  // eslint-disable-next-line no-var
  var GoogleMapsApi: IGoogleMapsApiObject;
  // eslint-disable-next-line no-var
  var GoogleMapsCallback: () => void;

  interface Window {
    GoogleMapsApi: IGoogleMapsApiObject;
    GoogleMapsCallback: <T = unknown>() => T;
    google: GlobalGoogleObject;

    [key: string | number | symbol]: any;
  }
}

// TODO: this should be removed if all works well
/**
 * HACK: Cluster should be loaded conditionally
 * However in the web version, it's not possible to write
 * `import 'gmap-vue/src/components/cluster'`, so we need to
 * import it anyway (but we don't have to register it)
 * Therefore we use babel-plugin-transform-inline-environment-variables to
 * set BUILD_DEV to truthy / falsy
 */
// const Cluster = ((s) => s.default || s)(
//   require('./components/cluster-icon.vue')
// );

/**
 * @var
 * @type {Object|undefined}
 *
 * An independent Vue instance that helps us to know when the Google Maps API is loaded.
 */
globalThis.GoogleMapsApi = { isReady: false };

/**
 * This function helps you to get the Google Maps API
 * when its ready on the window object
 * @function
 */
function getGoogleMapsAPI(): false | GlobalGoogleObject {
  return globalThis.GoogleMapsApi.isReady && globalThis.google;
}

/**
 * Export all components
 * @constant
 * @type  {Object} components object
 * @property  {Object}  HeatmapLayer - Vue component HeatmapLayer
 * @property  {Object}  KmlLayer - Vue component KmlLayer
 * @property  {Object}  Marker - Vue component Marker
 * @property  {Object}  Polyline - Vue component Polyline
 * @property  {Object}  Polygon - Vue component Polygon
 * @property  {Object}  Circle - Vue component Circle
 * @property  {Object}  Cluster - Vue component Cluster
 * @property  {Object}  Rectangle - Vue component Rectangle
 * @property  {Object}  DrawingManager - Vue component DrawingManager
 * @property  {Object}  InfoWindow - Vue component InfoWindow
 * @property  {Object}  MapLayer - Vue component MapLayer
 * @property  {Object}  PlaceInput - Vue component PlaceInput
 * @property  {Object}  Autocomplete - Vue component Autocomplete
 * @property  {Object}  StreetViewPanorama - Vue component StreetViewPanorama
 */
const components: GmvComponents = {
  Autocomplete,
  Circle,
  Cluster,
  DrawingManager,
  HeatmapLayer,
  InfoWindow,
  KmlLayer,
  MapLayer,
  Marker,
  Polyline,
  Polygon,
  Rectangle,
  StreetViewPanorama,
};

/**
 * Export all utilities
 *
 * @constant
 * @type  {Object} object containing all utilities
 * @property  {Function}  googleMapsApiInitializer - function to initialize the Google Maps API
 * @property  {Function}  pluginComponentBuilder - function to initialize the Google Maps API
 * @property  {Function}  getGoogleMapsAPI - function to get the original Google Maps API
 */
const utilities: GmvUtilities = {
  googleMapsApiInitializer,
  pluginComponentBuilder,
  getGoogleMapsAPI,
};

/**
 * GmapVue install function
 *
 * @param  {Object} app the vue app instance
 * @param  {IGmapVuePluginOptions} [options] configuration object to initialize the GmapVue plugin
 */
const pluginInstallFn: FunctionPlugin<IGmapVuePluginOptions> = (
  app: App,
  options?: IGmapVuePluginOptions
): void => {
  // see defaults
  const finalOptions: IGmapVuePluginOptions = {
    dynamicLoad: false,
    installComponents: true,
    ...options,
    load: {
      libraries: 'places',
      ...options?.load,
    } as any,
  };

  /**
   * Use a lazy to only load the API when
   * a GMap component is loaded
   *
   * @constant
   * @type {Function} the promise lazy creator function
   */
  const promiseLazyCreator = usePromiseLazyBuilderFn(
    googleMapsApiInitializer,
    globalThis.GoogleMapsApi
  );
  /**
   * The googleMapsApiPromiseLazy function to can wait until Google Maps API is ready
   *
   * @constant
   * @type {Function}
   */
  const googleMapsApiPromiseLazy = promiseLazyCreator(finalOptions);
  saveLazyPromiseAndFinalOptions(finalOptions, googleMapsApiPromiseLazy);

  /**
   * Static properties
   *
   * These properties are the same references that you can find in the instance,
   * but they are static because they are attached to the main Vue object.
   * app.config.globalProperties.$googleMapsApiPromiseLazy - function that you can use to wait until Google Maps API is ready
   * app.config.globalProperties.$gmapOptions - object with the final options passed to Google Maps API to configure it
   */
  app.config.globalProperties.$gmapApiPromiseLazy = googleMapsApiPromiseLazy;
  app.config.globalProperties.$gmapOptions = finalOptions;

  if (finalOptions.installComponents) {
    app
      .component('GmvMap', MapLayer)
      .component('GmvMarker', Marker)
      .component('GmvInfoWindow', InfoWindow)
      .component('GmvKmlLayer', KmlLayer)
      .component('GmvAutocomplete', Autocomplete)
      .component('GmvStreetViewPanorama', StreetViewPanorama)
      .component('GmvHeatmapLayer', HeatmapLayer)
      .component('GmvCircle', Circle)
      .component('GmvPolygon', Polygon)
      .component('GmvPolyline', Polyline)
      .component('GmvRectangle', Rectangle)
      .component('GmvDrawingManager', DrawingManager);
  }
};

/**
 * Export the default Vue object for plugins
 * Export for ESM modules
 *
 * @see pluginInstallFn
 * @type GmapVue
 * @property {FunctionPlugin} install function to install the plugin
 */
const GmapVuePlugin: Plugin<IGmapVuePluginOptions> = {
  install: pluginInstallFn,
};

export {
  GmapVuePlugin,
  components,
  sharedComposables as composables,
  utilities,
};
