<script lang="tsx" setup>
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getComponentEventsConfig,
  getComponentPropsConfig,
  getPropsValuesWithoutOptionsProp,
  usePluginOptions,
} from '@/composables';
import type { IMarkerIconVueComponentProps } from '@/interfaces';
import { $clusterPromise, $mapPromise, $markerPromise } from '@/keys';
import type { MarkerClusterer } from '@googlemaps/markerclusterer';
import { h, inject, onUnmounted, provide, useSlots } from 'vue';

/**
 * Marker component
 * @displayName GmvMarker
 * @see [source code](/guide/marker.html#source-code)
 * @see [Official documentation](https://developers.google.com/maps/documentation/javascript/markers)
 * @see [Official reference](https://developers.google.com/maps/documentation/javascript/reference/marker)
 */

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(
  defineProps<{
    collisionBehavior?: google.maps.CollisionBehavior;
    content?: HTMLElement;
    gmpClickable?: boolean; // Notice: Available only in the v=beta channel.
    gmpDraggable?: boolean;
    position?:
      | google.maps.LatLng
      | google.maps.LatLngLiteral
      | google.maps.LatLngAltitude
      | google.maps.LatLngAltitudeLiteral;
    title?: string;
    zIndex?: number;
    options?: Record<string, unknown>;
  }>(),
  {
    gmpClickable: true,
    gmpDraggable: false,
  },
);

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits<{
  click: [value: google.maps.MapMouseEvent];
  drag: [value: google.maps.MapMouseEvent];
  dragend: [value: google.maps.MapMouseEvent];
  dragstart: [value: google.maps.MapMouseEvent];
  'gmp-click': [value: google.maps.marker.AdvancedMarkerClickEvent];
  'update:position': [value: { lat?: number; lng?: number }];
}>();
const slots = useSlots();

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);
const clusterPromise = inject($clusterPromise, undefined);
let clusterOwner: MarkerClusterer | undefined;

if (!mapPromise) {
  throw new Error('The map promise was not built');
}

/*******************************************************************************
 * MARKER
 ******************************************************************************/
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
let markerInstance: google.maps.marker.AdvancedMarkerElement | undefined;
const promise = mapPromise
  ?.then(async (mapInstance) => {
    if (!mapInstance) {
      throw new Error('the map instance was not created');
    }

    // Initialize the maps with the given options
    const markerIconOptions: Partial<IMarkerIconVueComponentProps> & {
      map: google.maps.Map | undefined;
      [key: string]: any;
    } = {
      map: mapInstance,
      ...getPropsValuesWithoutOptionsProp(props),
      ...props.options,
    };

    if (clusterPromise) {
      markerIconOptions.map = undefined;
    }

    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker',
    )) as google.maps.MarkerLibrary;
    markerInstance = new AdvancedMarkerElement(markerIconOptions);

    const markerIconPropsConfig = getComponentPropsConfig('GmvMarker');
    const markerIconEventsConfig = getComponentEventsConfig(
      'GmvMarker',
      'auto',
    );

    // bind prop events of google maps
    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      markerIconPropsConfig,
      markerInstance,
      emits as any,
      props,
    );

    // binding events
    bindGoogleMapsEventsToVueEventsOnSetup(
      markerIconEventsConfig,
      markerInstance,
      emits as any,
      excludedEvents,
    );

    markerInstance?.addListener('dragend', () => {
      const newPosition = markerInstance?.position;
      /**
       * An event to detect when a position changes
       * @property {Object} position Object with lat and lng values, eg: { lat: 10.0, lng: 10.0 }
       */
      emits('update:position', {
        lat:
          typeof newPosition?.lat === 'number'
            ? newPosition.lat
            : newPosition?.lat?.(),
        lng:
          typeof newPosition?.lng === 'number'
            ? newPosition.lng
            : newPosition?.lng?.(),
      });
    });

    if (clusterPromise) {
      clusterPromise.then((clusterInstance) => {
        clusterInstance?.addMarker(markerInstance!);
        clusterOwner = clusterInstance;
      });
    }

    return markerInstance;
  })
  .catch((reason) => {
    throw reason;
  });

provide($markerPromise, promise);

/*******************************************************************************
 * COMPUTED
 ******************************************************************************/

/*******************************************************************************
 * METHODS
 ******************************************************************************/

/*******************************************************************************
 * WATCHERS
 ******************************************************************************/

/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onUnmounted(() => {
  if (!markerInstance) {
    return;
  }

  if (clusterOwner) {
    // Repaint will be performed in `updated()` of cluster
    clusterOwner.removeMarker(markerInstance!, true);
    /* Performance optimization when destroying a large number of markers */
    clusterOwner = undefined;
  } else if (markerInstance) {
    markerInstance.map = null;
  }
});

/*******************************************************************************
 * RENDERS
 ******************************************************************************/
/**
 * @slot Default slot of the component.
 */
let VNodeMarkerIcon = h('div', null, slots?.default?.());

if (
  slots.default &&
  typeof slots.default === 'function' &&
  slots.default?.().length
) {
  if (slots.default().length === 1) {
    // So that infowindows can have a marker parent
    VNodeMarkerIcon = slots.default()[0];
  }
}

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ VNodeMarkerIcon, markerInstance, markerPromise: promise });
</script>
