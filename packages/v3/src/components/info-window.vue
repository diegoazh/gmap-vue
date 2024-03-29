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
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getComponentEventsConfig,
  getComponentPropsConfig,
  getPropsValuesWithoutOptionsProp,
  usePluginOptions,
} from '@/composables';
import type { IInfoWindowVueComponentProps } from '@/interfaces';
import { $infoWindowPromise, $mapPromise, $markerPromise } from '@/keys';
import { inject, onMounted, provide, ref, watch } from 'vue';

/**
 * InfoWindow component
 * @displayName GmvInfoWindow
 * @see [source code](/guide/info-window.html#source-code)
 * @see [Official documentation](https://developers.google.com/maps/documentation/javascript/infowindows)
 * @see [Official reference](https://developers.google.com/maps/documentation/javascript/reference/info-window)
 */

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(
  defineProps<{
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
  }>(),
  {
    disableAutoPan: false,
  },
);

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const gmvInfoWindow = ref<HTMLElement | null>(null);
const emits = defineEmits(getComponentEventsConfig('GmvInfoWindow'));

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);
const markerPromise = inject($markerPromise, undefined);

if (!mapPromise) {
  throw new Error('The map promise was not built');
}

/*******************************************************************************
 * INFO WINDOW
 ******************************************************************************/
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
let map: google.maps.Map | undefined;
let markerOwner: google.maps.marker.AdvancedMarkerElement | undefined;
let infoWindowInstance: google.maps.InfoWindow | undefined;
const promise = mapPromise
  ?.then(async (mapInstance) => {
    if (!mapInstance) {
      throw new Error('the map instance was not created');
    }

    map = mapInstance;

    const infoWindowOptions: Partial<IInfoWindowVueComponentProps> & {
      map: google.maps.Map | undefined;
      [key: string]: any;
    } = {
      map: mapInstance,
      ...getPropsValuesWithoutOptionsProp(props),
      ...props.options,
    };

    if (markerPromise) {
      markerPromise.then((markerInstance) => {
        markerOwner = markerInstance;
      });
    }

    const { InfoWindow } = (await google.maps.importLibrary(
      'maps',
    )) as google.maps.MapsLibrary;
    infoWindowInstance = new InfoWindow({
      ...infoWindowOptions,
      content: gmvInfoWindow.value,
    });

    const infoWindowPropsConfig = getComponentPropsConfig('GmvInfoWindow');
    const infoWindowEventsConfig = getComponentEventsConfig(
      'GmvInfoWindow',
      'auto',
    );

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      infoWindowPropsConfig,
      infoWindowInstance,
      emits,
      props,
    );

    bindGoogleMapsEventsToVueEventsOnSetup(
      infoWindowEventsConfig,
      infoWindowInstance,
      emits,
      excludedEvents,
    );

    openInfoWindow();

    return infoWindowInstance;
  })
  .catch((error) => {
    throw error;
  });

provide($infoWindowPromise, promise);

/*******************************************************************************
 * COMPUTED
 ******************************************************************************/

/*******************************************************************************
 * METHODS
 ******************************************************************************/
function openInfoWindow(): void {
  if (props.opened) {
    if (markerOwner) {
      infoWindowInstance?.open(map, markerOwner);
    } else if (props.marker) {
      infoWindowInstance?.open(map, props.marker);
    } else {
      infoWindowInstance?.open(map);
    }
  } else {
    infoWindowInstance?.close();
  }
}

/*******************************************************************************
 * WATCHERS
 ******************************************************************************/
watch(
  () => props.opened,
  () => {
    openInfoWindow();
  },
);

watch(
  () => props.position,
  (value, oldValue) => {
    if (value && value !== oldValue) {
      infoWindowInstance?.setPosition(value);
    }
  },
);
watch(
  () => props.content,
  (value, oldValue) => {
    if (value && value !== oldValue) {
      infoWindowInstance?.setContent(value);
    }
  },
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
defineExpose({ infoWindowInstance, infoWindowPromise: promise });
</script>
