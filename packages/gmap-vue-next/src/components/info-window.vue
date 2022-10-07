<template>
  <div>
    <div ref="gmvInfoWindow">
      <!-- so named because it will fly away to another component -->
      <!-- @slot Used to set your info window.  -->
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  defineProps,
  inject,
  onMounted,
  provide,
  ref,
  watch,
  withDefaults,
} from 'vue';
import {
  $infoWindowPromise,
  $mapPromise,
  $markerPromise,
} from '@/keys/gmap-vue.keys';
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getPropsValuesWithoutOptionsProp,
} from '@/composables/helpers';
import {
  getComponentEventsConfig,
  getComponentPropsConfig,
} from '@/composables/plugin-component-config';

/**
 * InfoWindow component
 * @displayName GmvInfoWindow
 * @see [source code](/guide/info-window.html#source-code)
 * @see [Official documentation](https://developers.google.com/maps/documentation/javascript/infowindows)
 * @see [Official reference](https://developers.google.com/maps/documentation/javascript/reference/info-window)
 */

/*******************************************************************************
 * INTERFACES
 ******************************************************************************/
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
interface IInfoWindowVueComponentProps {
  ariaLabel?: string;
  disableAutoPan?: boolean;
  maxWidth?: number;
  minWidth?: number;
  pixelOffset?: google.maps.Size;
  position?: google.maps.LatLng | google.maps.LatLngLiteral;
  zIndex?: number;
  opened?: boolean;
  options?: Record<string | number | symbol, unknown>;
}

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(defineProps<IInfoWindowVueComponentProps>(), {
  disableAutoPan: false,
});

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const gmvInfoWindow = ref<HTMLElement | null>(null);
const emits = defineEmits(getComponentEventsConfig('GmvInfoWindow'));

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);
const markerPromise = inject($markerPromise);
const markerOwner = ref<google.maps.Marker | undefined>();

/*******************************************************************************
 * INFO WINDOW
 ******************************************************************************/
let map: google.maps.Map | undefined;
const infoWindowInstance = ref<google.maps.InfoWindow | undefined>();
const promise = mapPromise
  ?.then((mapInstance) => {
    if (!mapInstance) {
      throw new Error('The GmapMap component is not defined or initialized');
    }

    map = mapInstance;

    const infoWindowOptions: Partial<IInfoWindowVueComponentProps> & {
      map: google.maps.Map | undefined;
    } = {
      map,
      ...getPropsValuesWithoutOptionsProp(props),
      ...props.options,
    };

    if (markerPromise) {
      markerPromise.then((markerInstance) => {
        markerOwner.value = markerInstance;
      });
    }

    infoWindowInstance.value = new google.maps.InfoWindow({
      ...infoWindowOptions,
      content: gmvInfoWindow.value,
    });

    const infoWindowPropsConfig = getComponentPropsConfig('GmvInfoWindow');
    const infoWindowEventsConfig = getComponentEventsConfig(
      'GmvInfoWindow',
      'auto'
    );

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      infoWindowInstance,
      props,
      infoWindowPropsConfig,
      emits
    );

    bindGoogleMapsEventsToVueEventsOnSetup(
      infoWindowEventsConfig,
      infoWindowInstance,
      emits
    );

    openInfoWindow();

    return infoWindowInstance.value;
  })
  .catch((error) => {
    throw error;
  });

provide($infoWindowPromise, promise);

/*******************************************************************************
 * COMPUTED
 ******************************************************************************/

/*******************************************************************************
 * FUNCTIONS
 ******************************************************************************/
function openInfoWindow(): void {
  if (props.opened) {
    if (markerOwner.value) {
      infoWindowInstance.value?.open(map, markerOwner.value);
    } else {
      infoWindowInstance.value?.open(map);
    }
  } else {
    infoWindowInstance.value?.close();
  }
}

/*******************************************************************************
 * WATCHERS
 ******************************************************************************/
watch(
  () => props.opened,
  () => {
    openInfoWindow();
  }
);

/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onMounted(() => {
  const el = gmvInfoWindow.value;

  if (el) {
    el?.parentNode?.removeChild(el);
  }
});

/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ infoWindowInstance });
</script>
