import type { Emitter, EventType } from 'mitt';
import type { PropType } from 'vue';

export function getMapLayerProps() {
  return {
    resizeBus: {
      type: Object as PropType<Emitter<Record<EventType, unknown>>>,
      required: false,
    },
    /**
     * The initial Map center.
     * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
     */
    center: {
      type: Object as PropType<google.maps.LatLng | google.maps.LatLngLiteral>,
      required: true,
      twoWay: true,
      noBind: true,
    },
    /**
     * The initial Map zoom level. Valid values: Integers between zero, and up to the supported maximum zoom level.
     * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
     */
    zoom: {
      type: Number,
      required: false,
      default: undefined,
      twoWay: true,
      noBind: true,
    },
    /**
     * The heading for aerial imagery in degrees measured clockwise from cardinal direction North. Headings are snapped to the nearest available angle for which imagery is available.
     * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
     */
    heading: {
      type: Number,
      default: undefined,
      twoWay: true,
    },
    /**
     * The initial Map mapTypeId. Defaults to ROADMAP.
     * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
     */
    mapTypeId: {
      type: String as PropType<google.maps.MapTypeId>,
      default: google.maps.MapTypeId.ROADMAP,
      twoWay: true,
    },
    /**
     * For vector maps, sets the angle of incidence of the map. The allowed values are restricted depending on the zoom level of the map. For raster maps, controls the automatic switching behavior for the angle of incidence of the map. The only allowed values are 0 and 45. The value 0 causes the map to always use a 0° overhead view regardless of the zoom level and viewport. The value 45 causes the tilt angle to automatically switch to 45 whenever 45° imagery is available for the current zoom level and viewport, and switch back to 0 whenever 45° imagery is not available (this is the default behavior). 45° imagery is only available for satellite and hybrid map types, within some locations, and at some zoom levels. Note: getTilt returns the current tilt angle, not the value specified by this option. Because getTilt and this option refer to different things, do not bind() the tilt property; doing so may yield unpredictable effects.
     * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
     */
    tilt: {
      type: Number,
      default: undefined,
      twoWay: true,
    },
    /**
     * Extra options that you want pass to the component
     */
    options: {
      type: Object as PropType<{ [key: string]: any }>,
      default: undefined,
    },
  } as const;
}

export function getMapLayerEvents(
  type?: 'events' | 'manual' | 'props'
): string[] {
  const events = [
    'bounds_changed',
    'click',
    'dblclick',
    'drag',
    'dragend',
    'dragstart',
    'idle',
    'mousemove',
    'mouseout',
    'mouseover',
    'resize',
    'rightclick',
    'tilesloaded',
  ];
  const manual = ['center_changed', 'zoom_changed', 'bounds_changed'];
  const props = [
    'setCenter',
    'getCenter',
    'setZoom',
    'getZoom',
    'setHeading',
    'getHeading',
    'setMapTypeId',
    'getMapTypeId',
    'setTilt',
    'getTilt',
    'setOptions',
    'getOptions',
  ];

  switch (type) {
    case 'events':
      return events;
    case 'manual':
      return manual;
    case 'props':
      return props;
    default:
      return [...events, ...manual, ...props];
  }
}
