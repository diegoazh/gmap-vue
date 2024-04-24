<template>
  <div class="info-window-container">
    <div ref="gmvInfoWindow" class="info-window-content">
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
  findParentInstanceByName,
  getComponentEventsConfig,
  getComponentPropsConfig,
  getPropsValuesWithoutOptionsProp,
  useDestroyPromisesOnUnmounted,
  usePluginOptions,
  usePromise,
  usePromiseDeferred,
} from '@/composables';
import type { IInfoWindowVueComponentProps } from '@/interfaces';
import { $infoWindowPromise } from '@/keys';
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
    marker?: google.maps.marker.AdvancedMarkerElement;
    infoWindowKey?: string;
    markerKey?: string;
    mapKey?: string;
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
const emits = defineEmits<{
  close: [];
  closeclick: [];
  content_changed: [];
  domready: [];
  position_changed: [];
  visible: [];
  zindex_changed: [];
}>();

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = props.mapKey
  ? inject<Promise<google.maps.Map | undefined>>(props.mapKey)
  : (findParentInstanceByName('map-layer')?.exposed?.mapPromise as Promise<
      google.maps.Map | undefined
    >);

const markerPromise = props.markerKey
  ? inject<Promise<google.maps.marker.AdvancedMarkerElement | undefined>>(
      props.markerKey,
    )
  : undefined;

if (!mapPromise) {
  throw new Error('The map promise was not built');
}

/*******************************************************************************
 * PROVIDE
 ******************************************************************************/
const infoWindowPromiseDeferred = usePromiseDeferred(
  props.infoWindowKey || $infoWindowPromise,
);
const promise = usePromise(props.infoWindowKey || $infoWindowPromise);
provide(props.infoWindowKey || $infoWindowPromise, promise);

/*******************************************************************************
 * INFO WINDOW
 ******************************************************************************/
defineOptions({ name: 'info-window' });
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
let map: google.maps.Map | undefined;
let markerOwner: google.maps.marker.AdvancedMarkerElement | undefined;
mapPromise
  ?.then(async (mapInstance) => {
    if (!mapInstance) {
      throw new Error('the map instance is not defined');
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
    const infoWindowInstance = new InfoWindow({
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
      emits as any,
      props,
    );

    bindGoogleMapsEventsToVueEventsOnSetup(
      infoWindowEventsConfig,
      infoWindowInstance,
      emits as any,
      excludedEvents,
    );

    openInfoWindow();

    if (!infoWindowPromiseDeferred.resolve) {
      throw new Error('infoWindowPromiseDeferred.resolve is undefined');
    }

    infoWindowPromiseDeferred.resolve(infoWindowInstance);
  })
  .catch((error) => {
    throw error;
  });

/*******************************************************************************
 * COMPUTED
 ******************************************************************************/

/*******************************************************************************
 * METHODS
 ******************************************************************************/
const openInfoWindow = async (): Promise<void> => {
  const infoWindow = await promise;

  if (!infoWindow) {
    return console.error('the info window is not defined');
  }

  if (props.opened) {
    if (markerOwner) {
      infoWindow.open(map, markerOwner);
    } else if (props.marker) {
      infoWindow.open(map, props.marker);
    } else {
      infoWindow.open(map);
    }
  } else {
    infoWindow.close();
  }
};

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
  async (value, oldValue) => {
    const infoWindow = await promise;

    if (!infoWindow) {
      return console.error('the info window is not defined');
    }

    if (value && value !== oldValue) {
      infoWindow?.setPosition(value);
    }
  },
);
watch(
  () => props.content,
  async (value, oldValue) => {
    const infoWindow = await promise;

    if (!infoWindow) {
      return console.error('the info window is not defined');
    }

    if (value && value !== oldValue) {
      infoWindow?.setContent(value);
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

  useDestroyPromisesOnUnmounted(props.infoWindowKey || $infoWindowPromise);
});

/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ infoWindowPromise: promise });
</script>
