import type {
  PluginComponentConfig,
  PluginComponentNames,
  SinglePluginComponentConfig,
} from '@/types/gmap-vue.types';

const componentConfigs: PluginComponentConfig = {
  GmapMap: {
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
  GmapMarker: {
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
        // 'dragend',
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
  GmapCluster: {
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
  GmapInfoWindow: {
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