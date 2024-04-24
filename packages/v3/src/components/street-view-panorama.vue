<template>
  <div class="gmv-street-view-panorama-container">
    <div ref="gmvStreetViewPanorama" class="gmv-street-view-panorama"></div>
    <!-- @slot A default slot to render the street view panorama -->
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getComponentEventsConfig,
  getComponentPropsConfig,
  getPropsValuesWithoutOptionsProp,
  twoWayBindingWrapper,
  useDestroyPromisesOnUnmounted,
  useGoogleMapsApiPromiseLazy,
  usePluginOptions,
  usePromise,
  usePromiseDeferred,
  useResizeBus,
  watchPrimitivePropertiesOnSetup,
} from '@/composables';
import type { IStreetViewPanoramaVueComponentProps } from '@/interfaces';
import { $streetViewPanoramaPromise } from '@/keys';
import isEqual from 'lodash.isequal';
import { computed, onMounted, onUnmounted, provide, ref, watch } from 'vue';

/**
 * Street View Panorama component
 * @displayName GmvStreetViewPanorama
 * @see [source code](/guide/street-view-panorama.html#source-code)
 * @see [official guide](https://developers.google.com/maps/documentation/javascript/streetview?hl=es)
 * @see [official reference](https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanorama)
 */

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(
  defineProps<{
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
    streetViewKey?: string;
    options?: Record<string, unknown>;
  }>(),
  {
    clickToGo: true,
    disableDoubleClickZoom: true,
    enableCloseButton: false,
    scrollwheel: true,
    showRoadLabels: true,
    visible: true,
  },
);

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const gmvStreetViewPanorama = ref<HTMLElement | null>(null);
const emits = defineEmits<{
  closeclick: [value: Event];
  pano_changed: [];
  position_changed: [value: google.maps.LatLng | null];
  pov_changed: [];
  resize: [];
  status_changed: [];
  visible_changed: [];
  zoom_changed: [];
}>();

/*******************************************************************************
 * STREET VIEW PANORAMA
 ******************************************************************************/
defineOptions({ name: 'street-view-panorama' });
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();

/*******************************************************************************
 * PROVIDE
 ******************************************************************************/
const streetViewPanoramaPromiseDeferred = usePromiseDeferred(
  props.streetViewKey || $streetViewPanoramaPromise,
);
const promise = usePromise(props.streetViewKey || $streetViewPanoramaPromise);
provide(props.streetViewKey || $streetViewPanoramaPromise, promise);

/*******************************************************************************
 * RESIZE BUS
 ******************************************************************************/
const { currentResizeBus, _delayedResizeCallback } = useResizeBus();
let { _resizeCallback } = useResizeBus();

/**
 * This method trigger the resize event of Google Maps
 * @method resize
 * @returns {void}
 * @public
 */
async function resize(): Promise<void> {
  const streetViewPanorama = await promise;

  if (streetViewPanorama) {
    google.maps.event.trigger(streetViewPanorama, 'resize');
  }
}

/**
 * Preserve the previous center when resize the map
 * @method resizePreserveCenter
 * @returns {void}
 * @public
 */
async function resizePreserveCenter(): Promise<void> {
  const streetViewPanorama = await promise;

  if (!streetViewPanorama) {
    return;
  }

  const oldCenter = streetViewPanorama.getPosition();
  google.maps.event.trigger(streetViewPanorama, 'resize');

  if (oldCenter) {
    streetViewPanorama.setPosition(oldCenter);
  }
}

/*******************************************************************************
 * COMPUTED
 ******************************************************************************/
const finalLat = computed(() => {
  if (!props.position) {
    return console.warn('position is not defined');
  }

  return typeof props.position.lat === 'function'
    ? props.position.lat()
    : props.position.lat;
});
const finalLng = computed(() => {
  if (!props.position) {
    return console.warn('position is not defined');
  }

  return typeof props.position.lng === 'function'
    ? props.position.lng()
    : props.position.lng;
});
const finalLatLng = computed(
  () =>
    ({ lat: finalLat.value, lng: finalLng.value }) as google.maps.LatLngLiteral,
);

/*******************************************************************************
 * METHODS
 ******************************************************************************/

/*******************************************************************************
 * WATCHERS
 ******************************************************************************/
watch(
  () => props.zoom,
  async (newValue, oldValue) => {
    const streetViewPanorama = await promise;

    if (streetViewPanorama && newValue && !isEqual(newValue, oldValue)) {
      streetViewPanorama.setZoom(newValue);
    }
  },
);

watch(
  () => props.pov,
  async (newValue, oldValue) => {
    const streetViewPanorama = await promise;

    if (streetViewPanorama && newValue && !isEqual(newValue, oldValue)) {
      streetViewPanorama.setPov(newValue);
    }
  },
);

watch(
  () => props.pano,
  async (newValue, oldValue) => {
    const streetViewPanorama = await promise;

    if (streetViewPanorama && newValue && !isEqual(newValue, oldValue)) {
      streetViewPanorama.setPano(newValue);
    }
  },
);

/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onMounted(() => {
  useGoogleMapsApiPromiseLazy()
    .then(async () => {
      if (!gmvStreetViewPanorama.value) {
        throw new Error(
          `we can find the template ref: 'gmvStreetViewPanorama'`,
        );
      }

      const streetViewOptions: Partial<IStreetViewPanoramaVueComponentProps> & {
        [key: string]: any;
      } = {
        ...getPropsValuesWithoutOptionsProp(props),
        ...props.options,
      };

      const { StreetViewPanorama } = (await google.maps.importLibrary(
        'streetView',
      )) as google.maps.StreetViewLibrary;
      const streetViewPanorama = new StreetViewPanorama(
        gmvStreetViewPanorama.value,
        streetViewOptions,
      );

      const streetViewPanoramaPropsConfig = getComponentPropsConfig(
        'GmvStreetViewPanorama',
      );
      const streetViewPanoramaEventsConfig = getComponentEventsConfig(
        'GmvStreetViewPanorama',
        'auto',
      );

      bindPropsWithGoogleMapsSettersAndGettersOnSetup(
        streetViewPanoramaPropsConfig,
        streetViewPanorama,
        emits as any,
        props,
      );
      bindGoogleMapsEventsToVueEventsOnSetup(
        streetViewPanoramaEventsConfig,
        streetViewPanorama,
        emits as any,
        excludedEvents,
      );

      // manually trigger position
      twoWayBindingWrapper((increment, decrement, shouldUpdate) => {
        // Panos take a while to load
        increment();

        if (!streetViewPanorama) {
          throw new Error('the street view panorama instance was not created');
        }

        streetViewPanorama.addListener('position_changed', () => {
          if (shouldUpdate()) {
            if (!streetViewPanorama) {
              throw new Error(
                'the street view panorama instance was not created',
              );
            }

            emits('position_changed', streetViewPanorama.getPosition());
          }

          decrement();
        });

        const updateCenter = () => {
          increment();
          if (!streetViewPanorama) {
            throw new Error(
              'the street view panorama instance was not created',
            );
          }

          streetViewPanorama.setPosition(finalLatLng.value);
        };

        watchPrimitivePropertiesOnSetup(
          ['finalLat', 'finalLng'],
          updateCenter,
          { finalLat, finalLng },
        );
      });

      if (!streetViewPanoramaPromiseDeferred.resolve) {
        throw new Error(
          'streetViewPanoramaPromiseDeferred.resolve is undefined',
        );
      }

      streetViewPanoramaPromiseDeferred.resolve(streetViewPanorama);
    })
    .catch((error) => {
      throw error;
    });
});

onUnmounted(() => {
  useDestroyPromisesOnUnmounted(
    props.streetViewKey || $streetViewPanoramaPromise,
  );
});
/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({
  currentResizeBus,
  _resizeCallback,
  _delayedResizeCallback,
  resize,
  resizePreserveCenter,
  streetViewPanoramaPromise: promise,
});
</script>

<style lang="css">
.gmv-street-view-panorama-container {
  position: relative;
}

.gmv-street-view-panorama-container .gmv-street-view-panorama {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
}
</style>
