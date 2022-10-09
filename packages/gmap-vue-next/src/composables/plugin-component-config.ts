import type {
  PluginComponentConfig,
  PluginComponentNames,
  SinglePluginComponentConfig,
} from '@/types/gmap-vue.types';

const componentConfigs: PluginComponentConfig = {
  GmvMap: {
    noBind: ['resizeBus', 'center', 'zoom', 'options'],
    twoWay: ['heading', 'mapTypeId', 'tilt'],
    trackProperties: {},
    events: {
      /**
       * @see https://developers.google.com/maps/documentation/javascript/reference/map#Map-Events
       */
      auto: [
        'click',
        'contextmenu',
        'dblclick',
        'drag',
        'dragend',
        'dragstart',
        'heading_changed',
        'idle',
        'isfractionalzoomenabled_changed',
        'maptypeid_changed',
        'mousemove',
        'mouseout',
        'mouseover',
        'projection_changed',
        'renderingtype_changed',
        'tilesloaded',
        'tilt_changed',
        'resize',
      ],
      manual: ['bounds_changed', 'center_changed', 'zoom_changed'],
    },
  },
  GmvMarker: {
    noBind: [],
    twoWay: [
      'animation',
      'clickable',
      'cursor',
      'draggable',
      'icon',
      'position',
      'shape',
      'title',
      'visible',
      'zIndex',
    ],
    trackProperties: {},
    events: {
      auto: [
        'animation_changed',
        'click',
        'clickable_changed',
        'contextmenu',
        'cursor_changed',
        'dblclick',
        'drag',
        'draggable_changed',
        'dragstart',
        'flat_changed',
        'icon_changed',
        'mousedown',
        'mouseout',
        'mouseover',
        'mouseup',
        'position_changed',
        'shape_changed',
        'title_changed',
        'visible_changed',
        'zindex_changed',
      ],
      manual: ['dragend', 'update:position'],
    },
  },
  GmvCluster: {
    noBind: [],
    twoWay: [],
    trackProperties: {},
    events: {
      auto: [
        'clusteringbegin',
        'clusteringend',
        'click',
        'rightclick',
        'dblclick',
        'drag',
        'dragstart',
        'dragend',
        'mouseup',
        'mousedown',
        'mouseover',
        'mouseout',
      ],
      manual: [],
    },
  },
  GmvInfoWindow: {
    noBind: ['ariaLabel', 'options'],
    twoWay: [
      'content',
      'disableAutoPan',
      'maxWidth',
      'minWidth',
      'pixelOffset',
      'position',
      'zIndex',
    ],
    trackProperties: {},
    events: {
      /**
       * @see https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow-Events
       */
      auto: [
        'closeclick',
        'content_changed',
        'domready',
        'position_changed',
        'visible',
        'zindex_changed',
      ],
      manual: [],
    },
  },
  GmvAutocomplete: {
    noBind: ['componentRestrictions'],
    twoWay: [],
    trackProperties: {},
    events: {
      auto: [],
      manual: ['place_changed'],
    },
  },
  GmvKmlLayer: {
    noBind: [
      'clickable',
      'preserveViewport',
      'screenOverlays',
      'suppressInfoWindows',
    ],
    twoWay: ['map', 'zIndex'],
    trackProperties: {},
    events: {
      auto: [
        'click',
        'rightclick',
        'dblclick',
        'mouseup',
        'mousedown',
        'mouseover',
        'mouseout',
      ],
      manual: [],
    },
  },
  GmvStreetViewPanorama: {
    noBind: ['position'],
    twoWay: ['pov', 'pano', 'visible'],
    trackProperties: {
      pov: ['pitch', 'heading'],
    },
    events: {
      auto: [
        'closeclick',
        'pano_changed',
        'pov_changed',
        'resize',
        'status_changed',
        'visible_changed',
        'zoom_changed',
      ],
      manual: ['position_changed'],
    },
  },
  GmvHeatmapLayer: {
    noBind: [],
    twoWay: ['data'],
    trackProperties: {},
    events: {
      auto: [],
      manual: [],
    },
  },
  GmvCircle: {
    noBind: [
      'clickable',
      'fillColor',
      'fillOpacity',
      'strokeColor',
      'strokeOpacity',
      'strokePosition',
      'strokeWeight',
      '',
    ],
    twoWay: ['center', 'radius'],
    trackProperties: {},
    events: {
      auto: [
        'center_changed',
        'click',
        'dblclick',
        'drag',
        'dragend',
        'dragstart',
        'mousedown',
        'mousemove',
        'mouseout',
        'mouseover',
        'mouseup',
        'radius_changed',
        'rightclick',
      ],
      manual: [],
    },
  },
  GmvPolygon: {
    noBind: [
      'clickable',
      'fillColor',
      'fillOpacity',
      'strokeColor',
      'strokeOpacity',
      'strokePosition',
      'strokeWeight',
      'path',
      'paths',
    ],
    twoWay: [],
    trackProperties: {},
    events: {
      auto: [
        'click',
        'contextmenu',
        'dblclick',
        'drag',
        'dragend',
        'dragstart',
        'mousedown',
        'mousemove',
        'mouseout',
        'mouseover',
        'mouseup',
      ],
      manual: [],
    },
  },
  GmvPolyline: {
    noBind: ['clickable', 'strokeColor', 'strokeOpacity', 'strokeWeight'],
    twoWay: ['path'],
    trackProperties: {},
    events: {
      /**
       * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#Polyline-Events
       */
      auto: [
        'click',
        'contextmenu',
        'dblclick',
        'drag',
        'dragend',
        'dragstart',
        'mousedown',
        'mousemove',
        'mouseout',
        'mouseover',
        'mouseup',
      ],
      manual: [],
    },
  },
};

/**
 * Return the configuration for props on every component
 *
 * @param {string} componentName - The name of the component that should be found
 */
export function getComponentPropsConfig(
  componentName: PluginComponentNames
): Omit<SinglePluginComponentConfig, 'events'> {
  const { events, ...config } = componentConfigs[componentName];
  return config;
}

/**
 * Return the map events attached to the Google Maps Instance
 *
 * @param {string} componentName - The name of the component that should be found
 * @param {'auto'|'manual'} type
 * @return {string[]}
 */
export function getComponentEventsConfig(
  componentName: PluginComponentNames,
  type?: 'auto' | 'manual'
): string[] {
  if (type) {
    return componentConfigs[componentName].events[type];
  }

  return [
    ...componentConfigs[componentName].events.auto,
    ...componentConfigs[componentName].events.manual,
  ];
}
