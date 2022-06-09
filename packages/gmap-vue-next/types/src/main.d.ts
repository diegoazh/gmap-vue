import 'google.maps';
import type { Emitter, EventType } from 'mitt';
import type { App, Plugin } from 'vue';
import type { IGoogleMapsApiObject, IPluginOptions } from './interfaces/gmap-vue.interface';
import type { GlobalGoogleObject } from './types/gmap-vue.types';
import MapElementFactory from './utils/factories/map-element';
declare global {
    var GoogleMapsApi: IGoogleMapsApiObject;
    var GoogleMapsCallback: () => void;
    interface Window {
        GoogleMapsApi: IGoogleMapsApiObject;
        GoogleMapsCallback: <T = unknown>() => T;
        google: GlobalGoogleObject;
        [key: string | number | symbol]: any;
    }
}
/**
 * This function helps you to get the Google Maps API
 * when its ready on the window object
 * @function
 */
declare function getGoogleMapsAPI(): false | typeof google;
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
 * @property  {Object}  MapElementMixin - Vue component MapElementMixin
 * @property  {Object}  MountableMixin - Vue component MountableMixin
 */
declare const components: {
    HeatmapLayer: any;
    KmlLayer: any;
    Marker: any;
    Polyline: any;
    Polygon: any;
    Circle: any;
    Cluster: any;
    Rectangle: any;
    DrawingManager: any;
    InfoWindow: any;
    MapLayer: any;
    Autocomplete: any;
    StreetViewPanorama: any;
    mapElementComposable: {
        useMapElement: typeof import("./composables/map-element").useMapElement;
    };
    resizeBusComposable: {
        defaultResizeBus: Emitter<Record<EventType, unknown>>;
        useDefaultResizeBus: typeof import("./composables/resize-bus").useDefaultResizeBus;
        useResizeBus: typeof import("./composables/resize-bus").useResizeBus;
    };
};
/**
 * Export all helpers
 * @constant
 * @type  {Object} object containing all helpers
 * @property  {Function}  initGoogleMapsApi - function to initialize the Google Maps API
 * @property  {Function}  MapElementFactory - function to initialize the Google Maps API
 */
declare const helpers: {
    googleMapsApiInitializer: import("./types/gmap-vue.types").GoogleMapsAPIInitializerFn;
    MapElementFactory: typeof MapElementFactory;
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
declare function gmapVuePluginInstallFn(app: App, options?: IPluginOptions): void;
/**
 * Export objects and install function for ESM and UMD modules
 *
 * @property {Function} getGoogleMapsAPI function to get the Google Maps API
 * @property {Object} components all exported components
 * @property {Object} helpers all exported helpers
 * @property {Function} install function to install the plugin
 * @see gmapVuePluginInstallFn
 */
export { getGoogleMapsAPI, components, helpers, gmapVuePluginInstallFn as install, };
/**
 * Export default of the default Vue object for plugins
 * Export for ESM modules
 *
 * @property {Function} install function to install the plugin
 * @see gmapVuePluginInstallFn
 */
declare const _default: Plugin;
export default _default;
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
