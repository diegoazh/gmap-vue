import type { SinglePluginComponentConfig } from '@/types/gmap-vue.type';
import type {
  Algorithm,
  onClusterClickHandler,
  Renderer,
} from '@googlemaps/markerclusterer';
import type { Emitter, EventType } from 'mitt';

export interface IGoogleMapsApiObject {
  isReady: boolean;
}

/**
 * The object which contain all event names to and params that should be used to add listener to the Google Maps instance
 * @typedef {Object} LoadPluginOptions
 * @property {string} key - The Google Maps key
 * @property {string} libraries - The Google Maps libraries that should be loaded
 * @property {string?} v - The Google Maps version that should be loaded
 * @property {string?} callback - The callback name that should be called when Google Maps is ready
 * @property {string?} customCallback - The custom callback name that should be called when Google Maps is ready this overrides the callback property
 */
export interface ILoadPluginOptions {
  key: string;
  libraries: string;
  v?: string;
  callback?: string;
  customCallback?: string;
}

/**
 * @typedef {() => string[]} ExcludeEvents
 *
 *
 * The object which contain all event names to and params that should be used to add listener to the Google Maps instance
 * @typedef {object} PluginOptions - The options requred to configure the plugin
 * @property {boolean} [dynamicLoad=false] - The plugin should be loaded dynamically
 * @property {boolean} [installComponents=true] - The plugin should install all components
 * @property {LoadPluginOptions} [load] - All load plugin options
 * @property {boolean} [loadCn=false] - The plugin should be loaded using the cn url
 * @property {ExcludeEvents} [excludeEventsOnAllComponents] - A function that should return an array of events that should not be fired
 */
export interface IPluginOptions {
  dynamicLoad?: boolean;
  installComponents?: boolean;
  load?: ILoadPluginOptions;
  loadCn?: boolean;
  excludeEventsOnAllComponents?: () => string[];
}

export interface IVueProp {
  type?:
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | ArrayConstructor
    | ObjectConstructor
    | DateConstructor
    | FunctionConstructor
    | SymbolConstructor;
  required?: boolean;
  default?: () => undefined;
  validator?: () => boolean;
}

export interface IGoogleMapProp {
  twoWay?: boolean;
  noBind?: boolean;
  trackProperties?: string[];
}

export interface IGmapVueElementOptions {
  mappedProps: Omit<SinglePluginComponentConfig, 'events'>;
  props: { [key: string]: IVueProp };
  events: string[];
  name: string;
  ctr: () => any;
  ctrArgs: (
    options: { [key: string]: any },
    props: { [key: string]: IVueProp }
  ) => any[];
  beforeCreate: (options: { [key: string]: any }) => any;
  afterCreate: (mapElementInstance: { [key: string]: any }) => any;
}

export interface IMapPromiseFactory {
  $mapPromise: Promise<google.maps.Map | null>;
  $mapPromiseDeferred:
    | {
        resolve: Function;
        reject: Function;
      }
    | undefined;
}

export interface PromiseDeferred<T> {
  resolve: ((value: T | undefined) => void) | undefined;
  reject: ((reason?: any) => void) | undefined;
}

/**
 * Autocomplete input Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions.bounds
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions.componentRestrictions
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions.fields
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions.strictBounds
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions.types
 */
export interface IAutoCompleteInputVueComponentProps {
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  componentRestrictions?: google.maps.places.ComponentRestrictions;
  fields?: string[];
  strictBounds?: boolean;
  types?: string[];
  /**
   * Select the first result in the list when press enter keyboard
   * @values true, false
   */
  selectFirstOnEnter?: boolean;
  /**
   * the unique ref set to the component passed in the slot input
   */
  slotRef?: HTMLInputElement;
  /**
   * To avoid paying for data that you don't need,
   * be sure to use Autocomplete.setFields() to specify
   * only the place data that you will use.
   *
   * @see [Place information](https://developers.google.com/maps/documentation/javascript/places-autocomplete#get-place-information)
   * @see [setFields](https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete.setFields)
   * @see [PlaceResult](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult)
   */
  setFieldsTo?: string[];
  options?: Record<string, unknown>;
}

/**
 * Circle shape Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.center
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.clickable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.draggable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.editable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.fillColor
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.fillOpacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.radius
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.strokeColor
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.strokeOpacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.strokePosition
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.strokeWeight
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.visible
 */
export interface ICircleShapeVueComponentProps {
  center?: google.maps.LatLng | google.maps.LatLngLiteral;
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  radius?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokePosition?: google.maps.StrokePosition;
  strokeWeight?: number;
  visible?: boolean;
  zIndex?: number;
  options?: Record<string, unknown>;
}

/**
 * Marker Clusterer documentation
 *
 * @see [algorithm](https://googlemaps.github.io/js-markerclusterer/interfaces/MarkerClustererOptions.html#algorithm)
 * @see [markers](https://googlemaps.github.io/js-markerclusterer/interfaces/MarkerClustererOptions.html#markers)
 * @see [onClusterClick](https://googlemaps.github.io/js-markerclusterer/interfaces/MarkerClustererOptions.html#onClusterClick)
 * @see [renderer](https://googlemaps.github.io/js-markerclusterer/interfaces/MarkerClustererOptions.html#renderer)
 */
export interface IMarkerClusterVueComponentProps {
  algorithm?: Algorithm;
  markers?: google.maps.Marker[];
  onClusterClick?: onClusterClickHandler;
  renderer?: Renderer;
  options?: Record<string, any>;
}

/**
 * Drawing manager Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.circleOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.drawingControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.drawingControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.drawingMode
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.markerOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.polygonOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.polylineOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.rectangleOptions
 */
export interface IDrawingManagerVueComponentProps
  extends Omit<google.maps.drawing.DrawingManagerOptions, 'map'> {
  circleOptions?: google.maps.CircleOptions;
  drawingControl?: boolean;
  drawingControlOptions?: google.maps.drawing.DrawingControlOptions;
  drawingMode?: google.maps.drawing.OverlayType | null;
  markerOptions?: google.maps.MarkerOptions;
  polygonOptions?: google.maps.PolygonOptions;
  polylineOptions?: google.maps.PolylineOptions;
  rectangleOptions?: google.maps.RectangleOptions;
  position?:
    | 'TOP_CENTER'
    | 'TOP_LEFT'
    | 'TOP_RIGHT'
    | 'LEFT_TOP'
    | 'RIGHT_TOP'
    | 'LEFT_CENTER'
    | 'RIGHT_CENTER'
    | 'LEFT_BOTTOM'
    | 'RIGHT_BOTTOM'
    | 'BOTTOM_CENTER'
    | 'BOTTOM_LEFT'
    | 'BOTTOM_RIGHT';
  drawingModes?: google.maps.drawing.OverlayType[];
  shapes?: google.maps.drawing.OverlayCompleteEvent[];
  options?: Record<string, unknown>;
}

/**
 * Heatmap Layer Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions.data
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions.dissipating
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions.gradient
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions.maxIntensity
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions.opacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions.radius
 */
export interface IHeatmapLayerVueComponentProps {
  data?:
    | google.maps.MVCArray<
        google.maps.LatLng | google.maps.visualization.WeightedLocation
      >
    | Array<google.maps.LatLng | google.maps.visualization.WeightedLocation>;
  dissipating?: boolean;
  gradient?: string[];
  maxIntensity?: number;
  opacity?: number;
  number?: number;
  options?: Record<string, unknown>;
}

/**
 * Info Window Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions.ariaLabel
 * @see https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions.content
 * @see https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions.disableAutoPan
 * @see https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions.maxWidth
 * @see https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions.minWidth
 * @see https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions.pixelOffset
 * @see https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions.position
 * @see https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions.zIndex
 */
export interface IInfoWindowVueComponentProps {
  ariaLabel?: string;
  content?: string | Element | Text;
  disableAutoPan?: boolean;
  maxWidth?: number;
  minWidth?: number;
  pixelOffset?: google.maps.Size;
  position?: google.maps.LatLng | google.maps.LatLngLiteral;
  zIndex?: number;
  opened?: boolean;
  marker?: google.maps.Marker;
  options?: Record<string | number | symbol, unknown>;
}

/**
 * Kml layer Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.clickable
 * @see https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.preserveViewport
 * @see https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.screenOverlays
 * @see https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.suppressInfoWindows
 * @see https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.url
 */
export interface IKmlLayerVueComponentProps {
  clickable?: boolean;
  preserveViewport?: boolean;
  screenOverlays?: boolean;
  suppressInfoWindows?: boolean;
  url?: string;
  zIndex?: number;
  options?: Record<string, unknown>;
}

/**
 * MapOptions interface
 *
 * MapOptions object used to define the properties that can be set on a Map.
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.backgroundColor
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.center
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.clickableIcons
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.controlSize
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.disableDefaultUI
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.draggableCursor
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.draggingCursor
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.fullscreenControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.fullscreenControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.gestureHandling
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.heading
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.isFractionalZoomEnabled
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.keyboardShortcuts
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.mapTypeControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.mapTypeControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.mapTypeId
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.maxZoom
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.minZoom
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.noClear
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.panControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.panControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.restriction
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.rotateControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.rotateControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.scaleControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.scaleControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.streetView
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.streetViewControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.styles
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.tilt
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.zoom
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.zoomControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.zoomControlOptions
 */
export interface IMapLayerVueComponentProps {
  backgroundColor?: string;
  center: google.maps.LatLng | google.maps.LatLngLiteral;
  clickableIcons?: boolean;
  controlSize?: number;
  disableDefaultUI?: boolean;
  draggableCursor?: string;
  draggingCursor?: string;
  fullscreenControl?: boolean;
  fullscreenControlOptions?: google.maps.FullscreenControlOptions;
  gestureHandling?: 'cooperative' | 'greedy' | 'none' | 'auto';
  heading?: number;
  isFractionalZoomEnabled?: boolean;
  keyboardShortcuts?: boolean;
  mapTypeControl?: boolean;
  mapTypeControlOptions?: google.maps.MapTypeControlOptions;
  mapTypeId?: google.maps.MapTypeId;
  maxZoom?: number;
  minZoom?: number;
  noClear?: boolean;
  panControl?: boolean;
  panControlOptions?: google.maps.PanControlOptions;
  restriction?: google.maps.MapRestriction;
  rotateControl?: boolean;
  rotateControlOptions?: google.maps.RotateControlOptions;
  scaleControl?: boolean;
  scaleControlOptions?: google.maps.ScaleControlOptions;
  streetView?: google.maps.StreetViewPanorama;
  streetViewControl?: boolean;
  styles?: google.maps.MapTypeStyle[];
  tilt?: number;
  zoom?: number;
  zoomControl?: boolean;
  zoomControlOptions?: google.maps.ZoomControlOptions;
  resizeBus?: Emitter<Record<EventType, unknown>>;
  options?: { [key: string]: any };
}

/**
 * Marker Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.anchorPoint
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.animation
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.clickable
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.cursor
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.draggable
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.icon
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.label
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.opacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.position
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.shape
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.title
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.visible
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.zIndex
 */
export interface IMarkerIconVueComponentProps {
  anchorPoint?: google.maps.Point;
  animation?: google.maps.Animation;
  clickable?: boolean;
  crossOnDrag?: boolean;
  cursor?: string;
  draggable?: boolean;
  icon?: string | google.maps.Icon | google.maps.Symbol | null;
  label?: string | google.maps.MarkerLabel;
  opacity?: number;
  optimized?: boolean;
  position?: google.maps.LatLng | google.maps.LatLngLiteral;
  shape?: google.maps.MarkerShape;
  title?: string;
  visible?: boolean;
  zIndex?: number;
  options?: Record<string, unknown>;
  place?: Record<string, unknown>; // TODO: Define properties of this object
  /**
   *  This property was not found on the Googole Maps documentation, but it was defined in the previous version of this component. Any suggestion is welcome here.
   */
  attribution?: Record<string, unknown>; // TODO: Define properties of this object, or remove it if it's not used
}

/**
 * Polygon Shape Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.clickable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.draggable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.editable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.fillColor
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.fillOpacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.geodesic
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.paths
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.strokeColor
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.strokeOpacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.strokePosition
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.strokeWeight
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.visible
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.zIndex
 */
export interface IPolygonShapeVueComponentProps {
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  geodesic?: boolean;
  paths?:
    | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
    | google.maps.MVCArray<google.maps.LatLng>
    | Array<Array<google.maps.LatLng | google.maps.LatLngLiteral>>
    | Array<google.maps.LatLng | google.maps.LatLngLiteral>;
  strokeColor?: string;
  strokeOpacity?: number;
  strokePosition?: google.maps.StrokePosition;
  strokeWeight?: number;
  visible?: boolean;
  zIndex?: number;
  deepWatch?: boolean;
  options?: Record<string, unknown>;
}

/**
 * Marker Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.clickable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.draggable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.editable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.geodesic
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.icons
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.path
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.strokeColor
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.strokeOpacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.strokeWeight
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.visible
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.zIndex
 */
export interface IPolylineShapeVueComponentProps {
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  geodesic?: boolean;
  icons?: Array<google.maps.IconSequence>;
  path?:
    | google.maps.MVCArray<google.maps.LatLng>
    | Array<google.maps.LatLng | google.maps.LatLngLiteral>;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
  visible?: boolean;
  zIndex?: number;
  deepWatch?: boolean;
  options?: Record<string, unknown>;
}

/**
 * Rectangle shape Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.bounds
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.clickable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.draggable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.editable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.fillColor
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.fillOpacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.strokeColor
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.strokeOpacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.strokePosition
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.strokeWeight
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.visible
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.zIndex
 */
export interface IRectangleShapeVueComponentProps {
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokePosition?: google.maps.StrokePosition;
  strokeWeight?: number;
  visible?: boolean;
  zIndex?: number;
  options?: Record<string, unknown>;
}

/**
 * Street View Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.addressControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.addressControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.clickToGo
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.controlSize
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.disableDefaultUI
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.disableDoubleClickZoom
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.enableCloseButton
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.fullscreenControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.fullscreenControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.imageDateControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.linksControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.motionTracking
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.motionTrackingControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.motionTrackingControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.panControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.panControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.pano
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.position
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.pov
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.scrollwheel
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.showRoadLabels
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.visible
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.zoom
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.zoomControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.zoomControlOptions
 */
export interface IStreetViewPanoramaVueComponentProps {
  addressControl?: boolean;
  addressControlOptions?: google.maps.StreetViewAddressControlOptions;
  clickToGo?: boolean;
  controlSize?: number;
  disableDefaultUI?: boolean;
  disableDoubleClickZoom?: boolean;
  enableCloseButton?: boolean;
  fullscreenControl?: boolean;
  fullscreenControlOptions?: google.maps.FullscreenControlOptions;
  imageDateControl?: boolean;
  linksControl?: boolean;
  motionTracking?: boolean;
  motionTrackingControl?: boolean;
  motionTrackingControlOptions?: google.maps.MotionTrackingControlOptions;
  panControl?: boolean;
  panControlOptions?: google.maps.PanControlOptions;
  pano?: string;
  position?: google.maps.LatLng | google.maps.LatLngLiteral;
  pov?: google.maps.StreetViewPov;
  scrollwheel?: boolean;
  showRoadLabels?: boolean;
  visible?: boolean;
  zoom?: number;
  zoomControl?: boolean;
  zoomControlOptions?: google.maps.ZoomControlOptions;
  options: Record<string, unknown>;
}
