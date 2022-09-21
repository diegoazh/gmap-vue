import type { Emitter, EventType } from 'mitt';
import type { App, Plugin } from 'vue';
// import Autocomplete from './components/autocomplete-input.vue';
// import Circle from './components/circle-shape.vue';
// import Cluster from './components/cluster-icon.vue';
// import DrawingManager from './components/drawing-manager.vue';
// import HeatmapLayer from './components/heatmap-layer.vue';
// import InfoWindow from './components/info-window.vue';
// import KmlLayer from "./components/kml-layer.vue";
import MapLayer from './components/map-layer.vue';
// import Marker from './components/marker-icon.vue';
// import Polygon from './components/polygon-shape.vue';
// import Polyline from './components/polyline-shape.vue';
// import Rectangle from './components/rectangle-shape.vue';
// import StreetViewPanorama from './components/street-view-panorama.vue';
import { googleMapsApiInitializer } from './composables/google-maps-api-initializer';
import { pluginMapComponentBuilder } from './composables/plugin-map-component-builder';
import { getPromiseLazyBuilderFn, saveLazyPromiseAndFinalOptions } from './composables/promise-lazy-builder';
import { getDefaultResizeBus } from './composables/resize-bus';
import type { IGoogleMapsApiObject, IPluginOptions } from './interfaces/gmap-vue.interface';
import type { GlobalGoogleObject } from './types/gmap-vue.types';
import composables from './composables';
import { $mapPromise } from './keys/gmap-vue.keys';

/**
 * Vue augmentations
 */
declare module 'vue' {
  interface ComponentCustomProperties {
    $gmapDefaultResizeBus: Emitter<Record<EventType, unknown>>;
    $gmapApiPromiseLazy: () => Promise<any>;
    $gmapOptions: IPluginOptions;
  }
}

declare global {
  // eslint-disable-next-line no-var
  var GoogleMapsApi: IGoogleMapsApiObject;
  // eslint-disable-next-line no-var
  var GoogleMapsCallback: () => void;

  // eslint-disable-next-line no-var

  interface Window {
    GoogleMapsApi: IGoogleMapsApiObject;
    GoogleMapsCallback: <T = unknown>() => T;
    google: GlobalGoogleObject;

    [key: string | number | symbol]: any;
  }
}

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
function getGoogleMapsAPI() {
  return globalThis.GoogleMapsApi.isReady && globalThis.google;
}

/**
 * Export all components and mixins
 * @constant
 * @type  {Object} components and mixins object
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
const components = {
  // HeatmapLayer,
  // KmlLayer,
  // Marker,
  // Polyline,
  // Polygon,
  // Circle,
  // Cluster,
  // Rectangle,
  // DrawingManager,
  // InfoWindow,
  MapLayer,
  // Autocomplete,
  // StreetViewPanorama,
};

/**
 * Export all helpers
 * @constant
 * @type  {Object} object containing all helpers
 * @property  {Function}  initGoogleMapsApi - function to initialize the Google Maps API
 * @property  {Function}  pluginMapComponentBuilder - function to initialize the Google Maps API
 * @property  {Function}  getGoogleMapsAPI - function to get the original Google Maps API
 */
const helpers = {
  googleMapsApiInitializer,
  pluginMapComponentBuilder,
  getGoogleMapsAPI,
};

/**
 * GmapVue install function
 *
 * @param  {Object} app the vue app instance
 * @param  {Object|undefined} options=undefined configuration object to initialize the GmapVue plugin
 * @param  {boolean} options.dynamicLoad=false load the Google Maps API dynamically, if you set this to `true` the plugin doesn't load the Google Maps API
 * @param  {boolean} options.installComponents=true install all components
 * @param  {boolean} options.autoBindAllEvents=false auto bind all Google Maps API events
 * @param  {Object|undefined} options.load=undefined options to configure the Google Maps API
 * @param  {string} options.load.key your Google Maps API key
 * @param  {string} options.load.libraries=places the Google Maps libraries that you will use eg: 'places,drawing,visualization'
 * @param  {string|undefined} options.load.v=undefined the Google Maps API version, default latest
 * @param  {string|undefined} options.load.callback=GoogleMapsCallback This must be ignored if have another callback that you need to run when Google Maps API is ready please use the `customCallback` option.
 * @param  {string|undefined} options.load.customCallback=undefined DEPRECATED - This option was added on v3.0.0 but will be removed in the next major release. If you already have an script tag that loads Google Maps API and you want to use it set you callback in the `customCallback` option and our `GoogleMapsCallback` callback will execute your custom callback at the end; it must attached to the `window` object, is the only requirement.
 * @param {boolean} loadCn=false    Boolean. If set to true, the map will be loaded from google maps China
 *                  (@see https://developers.google.com/maps/documentation/javascript/basics#GoogleMapsChina)
 */
function pluginInstallFn(app: App, options?: IPluginOptions): void {
  // see defaults
  const finalOptions: IPluginOptions = {
    dynamicLoad: false,
    installComponents: true,
    autoBindAllEvents: false,
    load: {
      libraries: 'places',
    } as any,
    ...options,
  };

  /**
   * Use a lazy to only load the API when
   * a GMap component is loaded
   *
   * @constant
   * @type {Function} the promise lazy creator function
   */
  const promiseLazyCreator = getPromiseLazyBuilderFn(
    googleMapsApiInitializer,
    globalThis.GoogleMapsApi
  );
  /**
   * The gmapApiPromiseLazy function to can wait until Google Maps API is ready
   *
   * @constant
   * @type {Function}
   */
  const gmapApiPromiseLazy = promiseLazyCreator(finalOptions);
  saveLazyPromiseAndFinalOptions(finalOptions, gmapApiPromiseLazy);

  /**
   * Static properties
   *
   * These properties are the same references that you can find in the instance,
   * but they are static because they are attached to the main Vue object.
   * app.config.globalProperties.$gmapDefaultResizeBus - function to use the default resize bus
   * app.config.globalProperties.$gmapApiPromiseLazy - function that you can use to wait until Google Maps API is ready
   * app.config.globalProperties.$gmapOptions - object with the final options passed to Google Maps API to configure it
   */
  app.config.globalProperties.$gmapDefaultResizeBus = getDefaultResizeBus();
  app.config.globalProperties.$gmapApiPromiseLazy = gmapApiPromiseLazy;
  app.config.globalProperties.$gmapOptions = finalOptions;

  if (finalOptions.installComponents) {
    app.component('GmapMap', MapLayer);
    // .component('GmapMarker', Marker)
    // .component('GmapInfoWindow', InfoWindow)
    // .component('GmapHeatmapLayer', HeatmapLayer)
    // .component('GmapKmlLayer', KmlLayer)
    // .component('GmapPolyline', Polyline)
    // .component('GmapPolygon', Polygon)
    // .component('GmapCircle', Circle)
    // .component('GmapRectangle', Rectangle)
    // .component('GmapDrawingManager', DrawingManager)
    // .component('GmapAutocomplete', Autocomplete)
    // .component('GmapStreetViewPanorama', StreetViewPanorama);
  }
}

/**
 * Export default of the default Vue object for plugins
 * Export for ESM modules
 *
 * @see pluginInstallFn
 * @type GmapVue
 * @property {Function} install function to install the plugin
 * @property {Function} getGoogleMapsAPI function to get the Google Maps API
 * @property {Object} components all exported components
 * @property {Composables} composables function to install the plugin
 * @property {Object} helpers all exported helpers
 * @property {Object} keys function to install the plugin
 */
export default {
  install: pluginInstallFn,
  getGoogleMapsAPI,
  components,
  composables,
  helpers,
  keys: {
    $mapPromise,
  },
} as Plugin;
