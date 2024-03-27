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
import type {
  IGmapVueElementOptions,
  IGoogleMapProp,
  ILoadPluginOptions,
  IGmapVuePluginOptions,
  IVueProp,
} from '@/interfaces';
import type { Emitter, EventType } from 'mitt';
import type { ComponentOptions, Ref } from 'vue';

/** @internal */
export type PluginComponentNames =
  | 'GmvMap'
  | 'GmvMarker'
  | 'GmvCluster'
  | 'GmvInfoWindow'
  | 'GmvAutocomplete'
  | 'GmvKmlLayer'
  | 'GmvStreetViewPanorama'
  | 'GmvHeatmapLayer'
  | 'GmvCircle'
  | 'GmvPolygon'
  | 'GmvPolyline'
  | 'GmvRectangle'
  | 'GmvDrawingManager';

/**
 * @typedef {Object} SinglePluginComponentConfigWithoutEvents
 * @property {string[]} noBind - Props with should not be bind to Google Maps. Has precedence over twoWay
 * @property {string[]} twoWay - Props that should be bind in two-way data binding
 * @property {Object} trackProperties - Object with nested properties of a prop that should be watched
 * @property {string} trackProperties.key - Should be a string
 * @property {string[]} trackProperties.value - Should be an array of nested properties of the prop that should be watched
 */
/**
 * @typedef {Object} SinglePluginComponentConfig
 * @property {string[]} noBind - Props with should not be bind to Google Maps. Has precedence over twoWay
 * @property {string[]} twoWay - Props that should be bind in two-way data binding
 * @property {Object} trackProperties - Object with nested properties of a prop that should be watched
 * @property {string} trackProperties.key - Should be a string
 * @property {string[]} trackProperties.value - Should be an array of nested properties of the prop that should be watched
 * @property {Object} events - Events should be bind on the component
 * @property {string[]} events.auto - Events of the Google Maps component instance that should be bind
 * @property {string[]} events.manual - Manual events that should emit or bind
 */
/** @internal */
export type SinglePluginComponentConfig = {
  noBind: string[];
  twoWay: string[];
  trackProperties: { [key: string]: string[] };
  events: {
    auto: string[];
    manual: string[]; // TODO: try to improve this to be an object with specific keys that can be used in the code
  };
};

/** @internal */
export type PluginComponentConfig = {
  [key in PluginComponentNames]: SinglePluginComponentConfig;
};

/** @internal */
export type GlobalGoogleObject = typeof google;

export type GoogleMapsAPIInitializerFn = (
  options: ILoadPluginOptions,
  loadCn?: boolean
) => void;

/** @internal */
export type LazyValueGetterFn<T> = () => Promise<T>;

/** @internal */
export type PromiseLazyCreatorFn = (
  options: IGmapVuePluginOptions
) => LazyValueGetterFn<GlobalGoogleObject>;

/** @internal */
export type OldHtmlInputElement = HTMLInputElement & {
  attachEvent: (type: string, listener: () => any) => void;
};

/** @internal */
export type GmapVuePluginProps = { [key: string]: IVueProp & IGoogleMapProp };

export type GmvComponents = {
  Autocomplete: typeof Autocomplete;
  Circle: typeof Circle;
  Cluster: typeof Cluster;
  DrawingManager: typeof DrawingManager;
  HeatmapLayer: typeof HeatmapLayer;
  InfoWindow: typeof InfoWindow;
  KmlLayer: typeof KmlLayer;
  MapLayer: typeof MapLayer;
  Marker: typeof Marker;
  Polyline: typeof Polyline;
  Polygon: typeof Polygon;
  Rectangle: typeof Rectangle;
  StreetViewPanorama: typeof StreetViewPanorama;
};

export type GmvSharedComposables = {
  useMapPromise: () => Promise<google.maps.Map | undefined>;
  useResizeBus: () => {
    currentResizeBus: Ref<Emitter<Record<EventType, unknown>> | undefined>;
    _resizeCallback: () => void;
    _delayedResizeCallback: () => Promise<void>;
  };
  useGoogleMapsApiPromiseLazy: () => Promise<any>;
  useStreetViewPanoramaPromise: () => Promise<
    google.maps.StreetViewPanorama | undefined
  >;
  usePluginOptions: () => IGmapVuePluginOptions;
};

export type GmvUtilities = {
  googleMapsApiInitializer: GoogleMapsAPIInitializerFn;
  pluginComponentBuilder: (
    providedOptions: IGmapVueElementOptions
  ) => ComponentOptions;
  getGoogleMapsAPI: () => false | GlobalGoogleObject;
};
