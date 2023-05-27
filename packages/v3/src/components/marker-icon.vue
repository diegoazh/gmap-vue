<script lang="tsx" setup>
import { h, inject, onUnmounted, provide, ref, useSlots } from 'vue';
import { $clusterPromise, $mapPromise, $markerPromise } from '@/keys';
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getPropsValuesWithoutOptionsProp,
} from '@/composables';
import {
  getComponentEventsConfig,
  getComponentPropsConfig,
} from '@/composables';
import type { MarkerClusterer } from '@googlemaps/markerclusterer';
import { usePluginOptions } from '@/composables';
import type { IMarkerIconVueComponentProps } from '../interfaces/gmap-vue.interface';

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
  }>(),
  {
    clickable: true,
    crossOnDrag: true,
    cursor: 'pointer',
    draggable: false,
    opacity: 1,
    optimized: false,
    visible: true,
  }
);

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits(getComponentEventsConfig('GmvMarker'));
const slots = useSlots();

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);
const clusterPromise = inject($clusterPromise, undefined);
const clusterOwner = ref<MarkerClusterer | undefined>();

if (!mapPromise) {
  throw new Error('The map promise was not built');
}

/*******************************************************************************
 * MARKER
 ******************************************************************************/
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
const markerInstance = ref<google.maps.Marker | undefined>();
const promise = mapPromise
  ?.then((mapInstance) => {
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

    markerInstance.value = new google.maps.Marker(markerIconOptions);

    const markerIconPropsConfig = getComponentPropsConfig('GmvMarker');
    const markerIconEventsConfig = getComponentEventsConfig(
      'GmvMarker',
      'auto'
    );

    // bind prop events of google maps
    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      markerIconPropsConfig,
      markerInstance.value,
      emits,
      props
    );

    // binding events
    bindGoogleMapsEventsToVueEventsOnSetup(
      markerIconEventsConfig,
      markerInstance.value,
      emits,
      excludedEvents
    );

    markerInstance.value?.addListener('dragend', () => {
      const newPosition = markerInstance.value?.getPosition();
      /**
       * An event to detect when a position changes
       * @property {Object} position Object with lat and lng values, eg: { lat: 10.0, lng: 10.0 }
       */
      emits('update:position', {
        lat: newPosition?.lat(),
        lng: newPosition?.lng(),
      });
    });

    if (clusterPromise) {
      clusterPromise.then((clusterInstance) => {
        clusterInstance?.addMarker(markerInstance.value!);
        clusterOwner.value = clusterInstance;
      });
    }

    return markerInstance.value;
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
  if (!markerInstance.value) {
    return;
  }

  if (clusterOwner.value) {
    // Repaint will be performed in `updated()` of cluster
    clusterOwner.value.removeMarker(markerInstance.value!, true);
    /* Performance optimization when destroying a large number of markers */
    clusterOwner.value = undefined;
  } else if (markerInstance.value) {
    markerInstance.value.setMap(null);
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
defineExpose({ VNodeMarkerIcon, markerInstance });
</script>
