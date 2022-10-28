import type { Emitter, EventType } from 'mitt';
import type { App, Plugin } from 'vue';
import Autocomplete from './components/autocomplete-input.vue';
import Circle from './components/circle-shape.vue';
import Cluster from './components/cluster-icon.vue';
import DrawingManager from './components/drawing-manager.vue';
import HeatmapLayer from './components/heatmap-layer.vue';
import InfoWindow from './components/info-window.vue';
import KmlLayer from './components/kml-layer.vue';
import MapLayer from './components/map-layer.vue';
import Marker from './components/marker-icon.vue';
import Polygon from './components/polygon-shape.vue';
import Polyline from './components/polyline-shape.vue';
import Rectangle from './components/rectangle-shape.vue';
import StreetViewPanorama from './components/street-view-panorama.vue';
import { googleMapsApiInitializer } from './composables/google-maps-api-initializer';
import { pluginComponentBuilder } from './composables/plugin-component-builder';
import {
  saveLazyPromiseAndFinalOptions,
  usePromiseLazyBuilderFn,
} from './composables/promise-lazy-builder';
import { useDefaultResizeBus } from './composables/resize-bus';
import type {
  IGoogleMapsApiObject,
  IPluginOptions,
} from './interfaces/gmap-vue.interface';
import type { GlobalGoogleObject } from './types/gmap-vue.types';
import composables from './composables';

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
 * Export all helpers
 * @constant
 * @type  {Object} object containing all helpers
 * @property  {Function}  googleMapsApiInitializer - function to initialize the Google Maps API
 * @property  {Function}  pluginComponentBuilder - function to initialize the Google Maps API
 * @property  {Function}  getGoogleMapsAPI - function to get the original Google Maps API
 */
const helpers = {
  googleMapsApiInitializer,
  pluginComponentBuilder,
  getGoogleMapsAPI,
};

/**
 * GmapVue install function
 *
 * @param  {Object} app the vue app instance
 * @param  {PluginOptions} [options] configuration object to initialize the GmapVue plugin
 */
function pluginInstallFn(app: App, options?: IPluginOptions): void {
  // see defaults
  const finalOptions: IPluginOptions = {
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
   * app.config.globalProperties.$gmapDefaultResizeBus - function to use the default resize bus
   * app.config.globalProperties.$googleMapsApiPromiseLazy - function that you can use to wait until Google Maps API is ready
   * app.config.globalProperties.$gmapOptions - object with the final options passed to Google Maps API to configure it
   */
  app.config.globalProperties.$gmapDefaultResizeBus = useDefaultResizeBus();
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
 */
export default {
  install: pluginInstallFn,
  getGoogleMapsAPI,
  components,
  composables,
  helpers,
} as Plugin;
