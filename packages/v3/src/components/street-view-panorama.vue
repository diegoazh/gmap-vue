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
  useGoogleMapsApiPromiseLazy,
  useMapPromise,
  usePluginOptions,
  useResizeBus,
  useStreetViewPanoramaPromise,
  useStreetViewPanoramaPromiseDeferred,
  watchPrimitivePropertiesOnSetup,
} from '@/composables';
import type { IStreetViewPanoramaVueComponentProps } from '@/interfaces';
import { $streetViewPanoramaPromise } from '@/keys';
import isEqual from 'lodash.isequal';
import { computed, onMounted, provide, ref, watch } from 'vue';

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
    options: Record<string, unknown>;
  }>(),
  {
    clickToGo: true,
    disableDoubleClickZoom: true,
    enableCloseButton: false,
    scrollwheel: true,
    showRoadLabels: true,
  }
);

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const gmvStreetViewPanorama = ref<HTMLElement | null>(null);
const emits = defineEmits(getComponentEventsConfig('GmvStreetViewPanorama'));

/*******************************************************************************
 * STREET VIEW PANORAMA
 ******************************************************************************/
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
let streetViewPanoramaInstance: google.maps.StreetViewPanorama | undefined;

/*******************************************************************************
 * PROVIDE
 ******************************************************************************/
const streetViewPanoramaPromiseDeferred =
  useStreetViewPanoramaPromiseDeferred();
const promise = useStreetViewPanoramaPromise();
provide($streetViewPanoramaPromise, promise);
// TODO: find a way to implement this in order to use with markers
// provide($mapPromise, promise); // so that we can use it with markers

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
function resize(): void {
  if (streetViewPanoramaInstance) {
    google.maps.event.trigger(streetViewPanoramaInstance, 'resize');
  }
}

/**
 * Preserve the previous center when resize the map
 * @method resizePreserveCenter
 * @returns {void}
 * @public
 */
function resizePreserveCenter(): void {
  if (!streetViewPanoramaInstance) {
    return;
  }

  const oldCenter = streetViewPanoramaInstance.getPosition();
  google.maps.event.trigger(streetViewPanoramaInstance, 'resize');

  if (oldCenter) {
    streetViewPanoramaInstance.setPosition(oldCenter);
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
    ({ lat: finalLat.value, lng: finalLng.value } as google.maps.LatLngLiteral)
);

/*******************************************************************************
 * METHODS
 ******************************************************************************/

/*******************************************************************************
 * WATCHERS
 ******************************************************************************/
watch(
  () => props.zoom,
  (newValue, oldValue) => {
    if (
      streetViewPanoramaInstance &&
      newValue &&
      !isEqual(newValue, oldValue)
    ) {
      streetViewPanoramaInstance.setZoom(newValue);
    }
  }
);

watch(
  () => props.pov,
  (newValue, oldValue) => {
    if (
      streetViewPanoramaInstance &&
      newValue &&
      !isEqual(newValue, oldValue)
    ) {
      streetViewPanoramaInstance.setPov(newValue);
    }
  }
);

watch(
  () => props.pano,
  (newValue, oldValue) => {
    if (
      streetViewPanoramaInstance &&
      newValue &&
      !isEqual(newValue, oldValue)
    ) {
      streetViewPanoramaInstance.setPano(newValue);
    }
  }
);

/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onMounted(() => {
  useGoogleMapsApiPromiseLazy()
    .then(() => useMapPromise())
    .then((map) => {
      if (!gmvStreetViewPanorama.value) {
        throw new Error(
          `we can find the template ref: 'gmvStreetViewPanorama'`
        );
      }

      const streetViewOptions: Partial<IStreetViewPanoramaVueComponentProps> & {
        [key: string]: any;
      } = {
        ...getPropsValuesWithoutOptionsProp(props),
        ...props.options,
      };

      streetViewPanoramaInstance = new google.maps.StreetViewPanorama(
        gmvStreetViewPanorama.value,
        streetViewOptions
      );

      const streetViewPanoramaPropsConfig = getComponentPropsConfig(
        'GmvStreetViewPanorama'
      );
      const streetViewPanoramaEventsConfig = getComponentEventsConfig(
        'GmvStreetViewPanorama',
        'auto'
      );

      bindPropsWithGoogleMapsSettersAndGettersOnSetup(
        streetViewPanoramaPropsConfig,
        streetViewPanoramaInstance,
        emits,
        props
      );
      bindGoogleMapsEventsToVueEventsOnSetup(
        streetViewPanoramaEventsConfig,
        streetViewPanoramaInstance,
        emits,
        excludedEvents
      );

      // manually trigger position
      twoWayBindingWrapper((increment, decrement, shouldUpdate) => {
        // Panos take a while to load
        increment();

        if (!streetViewPanoramaInstance) {
          throw new Error('the street view panorama instance was not created');
        }

        streetViewPanoramaInstance.addListener('position_changed', () => {
          if (shouldUpdate()) {
            if (!streetViewPanoramaInstance) {
              throw new Error(
                'the street view panorama instance was not created'
              );
            }

            emits('position_changed', streetViewPanoramaInstance.getPosition());
          }

          decrement();
        });

        const updateCenter = () => {
          increment();
          if (!streetViewPanoramaInstance) {
            throw new Error(
              'the street view panorama instance was not created'
            );
          }

          streetViewPanoramaInstance.setPosition(finalLatLng.value);
        };

        watchPrimitivePropertiesOnSetup(
          ['finalLat', 'finalLng'],
          updateCenter,
          { finalLat, finalLng }
        );
      });

      if (!streetViewPanoramaPromiseDeferred.resolve) {
        throw new Error(
          'streetViewPanoramaPromiseDeferred.resolve is undefined'
        );
      }

      if (map) {
        map.setStreetView(streetViewPanoramaInstance);
      }

      streetViewPanoramaPromiseDeferred.resolve(streetViewPanoramaInstance);

      return streetViewPanoramaInstance;
    })
    .catch((error) => {
      throw error;
    });
});
/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({
  streetViewPanoramaInstance,
  currentResizeBus,
  _resizeCallback,
  _delayedResizeCallback,
  resize,
  resizePreserveCenter,
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
