<script lang="tsx" setup>
import {
  defineProps,
  h,
  inject,
  onUnmounted,
  provide,
  type Ref,
  ref,
  type RendererElement,
  type RendererNode,
  useAttrs,
  useSlots,
  type VNode,
  withDefaults
} from 'vue';
import { $clusterPromise, $markerPromise } from '@/keys/gmap-vue.keys';
import { getMarkerIconEvents, getMarkerIconProps } from '@/composables/marker-icon-props';
import { getMapPromise } from '@/composables/google-maps-promise';
import { bindPropsOnSetup, getPropsValues } from '@/composables/helpers';
import { getPluginOptions } from '@/composables/promise-lazy-builder';

/*******************************************************************************
 * INTERFACES
 ******************************************************************************/
/**
 * Marker Google Maps properties documentation
 *
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
interface IMarkerIconVueComponentProps {
  animation?: number | google.maps.Animation;
  /**
   *  This property was not found on the Googole Maps documentation, but it was defined in the previous version of this component. Any suggestion is welcome here.
   */
  attribution?: Record<string, unknown>; // TODO: Define properties of this object.
  clickable?: boolean;
  cursor?: string;
  draggable?: boolean;
  icon?: string | symbol | google.maps.Icon;
  label?: string | google.maps.MarkerLabel;
  opacity?: number;
  options?: Record<string, unknown>;
  place?: Record<string, unknown>; // TODO: Define properties of this object
  position?: google.maps.LatLng | google.maps.LatLngLiteral;
  shape?: google.maps.MarkerShape;
  title?: string;
  visible?: boolean;
  zIndex?: number;
}

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(defineProps<IMarkerIconVueComponentProps>(), {
  clickable: true,
  cursor: 'pointer',
  draggable: false,
  opacity: 1,
  visible: true
});

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits(getMarkerIconEvents());
const attrs = useAttrs();
const slots = useSlots();

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const clusterPromise = inject($clusterPromise);
const clusterOwner: Ref<any | undefined> = ref(); // TODO: add types for this any

/*******************************************************************************
 * MARKER
 ******************************************************************************/
let map: google.maps.Map | undefined;
const markerInstance: Ref<google.maps.Marker | undefined> = ref();
const promise = getMapPromise().then((mapInstance) => {
  map = mapInstance;
  // Initialize the maps with the given options
  const initialOptions: { [key: string]: any } = {
    ...props.options,
    map,
    ...getPropsValues(props)
  };
  const { options: extraOptions, ...finalOptions } = initialOptions;

  if (clusterPromise) {
    finalOptions.map = null;
  }

  markerInstance.value = new google.maps.Marker(finalOptions);

  const pluginOptions = getPluginOptions();
  const markerIconProps = getMarkerIconProps();
  const markerIconEvents = getMarkerIconEvents('events');

  const propsEvents = bindPropsOnSetup(markerInstance, markerIconProps, pluginOptions, attrs);

  // bind prop events of google maps
  propsEvents.emitParams.forEach((emitParam) => {
    markerInstance.value?.addListener(emitParam[0], () => {
      emits(emitParam[0], emitParam[1]());
    });
  });

  // binding events
  markerIconEvents.forEach((eventName) => {
    if (pluginOptions.autoBindAllEvents || attrs[eventName]) {
      markerInstance.value?.addListener(eventName, (ev: any) => {
        emits(eventName, ev);
      });
    }
  });

  markerInstance.value?.addListener('dragend', () => {
    const newPosition = markerInstance.value?.getPosition();
    /**
     * An event to detect when a position changes
     * @property {Object} position Object with lat and lng values, eg: { lat: 10.0, lng: 10.0 }
     */
    emits('update:position', {
      lat: newPosition?.lat(),
      lng: newPosition?.lng()
    });
  });

  if (clusterPromise) {
    clusterPromise.then((clusterInstance) => {
      clusterInstance.addMarker(markerInstance.value!);
      clusterOwner.value = clusterInstance;
    });
  }

  return markerInstance.value;
}).catch((reason) => {
  throw reason;
});

provide($markerPromise, promise);

/*******************************************************************************
 * COMPUTED
 ******************************************************************************/

/*******************************************************************************
 * FUNCTIONS
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
  } else if (markerInstance.value && (markerInstance.value as any).setMap) {
    (markerInstance.value as any).setMap(null);
  }
});

/*******************************************************************************
 * RENDERS
 ******************************************************************************/
let VNodeMarkerIcon: VNode<RendererNode, RendererElement, { [p: string]: any }>;

if (slots.default && typeof slots.default === 'function' && slots.default?.().length) {
  if (slots.default().length === 1) {
    // So that infowindows can have a marker parent
    VNodeMarkerIcon = slots.default()[0];
  } else {
    /**
     * @slot Default slot of the component.
     */
    VNodeMarkerIcon = h('div', slots.default());
  }
}

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
</script>

<template>
  <VNodeMarkerIcon />
</template>
