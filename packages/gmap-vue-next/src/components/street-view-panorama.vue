<template>
  <div class="gmv-street-view-panorama-container">
    <div
      ref="gmvStreetViewPanoramaContainer"
      class="gmv-street-view-panorama"
    ></div>
    <!-- @slot A default slot to render the street view panorama -->
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  defineEmits,
  defineProps,
  onMounted,
  provide,
  ref,
  watch,
  withDefaults,
} from 'vue';
import { $streetViewPanoramaPromise } from '@/keys/gmap-vue.keys';
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getPropsValuesWithoutOptionsProp,
  twoWayBindingWrapper,
  watchPrimitiveProperties,
} from '@/composables/helpers';
import {
  getComponentEventsConfig,
  getComponentPropsConfig,
} from '@/composables/plugin-component-config';
import { useGmapApiPromiseLazy } from '@/composables/promise-lazy-builder';
import {
  getStreetViewPanoramaPromise,
  getStreetViewPanoramaPromiseDeferred,
} from '@/composables/street-view-panorama-promise';

/**
 * Street View Panorama component
 * @displayName GmvStreetViewPanorama
 * @see [source code](/guide/street-view-panorama.html#source-code)
 * @see [official docs](https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanorama)
 */

/*******************************************************************************
 * INTERFACES
 ******************************************************************************/
/**
 * Street View Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.addressControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.addressControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.clickToGo
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.controlSize
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.disableDefaultUI
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.disableDoubleClickZoom
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.enableCloseButton
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.fullscreenControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.fullscreenControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.imageDateControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.linksControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.motionTracking
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.motionTrackingControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.motionTrackingControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.panControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.panControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.pano
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.position
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.pov
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.scrollwheel
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.showRoadLabels
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.visible
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.zoom
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.zoomControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.zoomControlOptions
 */
interface IStreetViewPanoramaVueComponentProps {
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
}

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(
  defineProps<IStreetViewPanoramaVueComponentProps>(),
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
const gmvStreetViewPanoramaContainer = ref<HTMLElement | null>(null);
const emits = defineEmits(getComponentEventsConfig('GmvStreetViewPanorama'));

/*******************************************************************************
 * STREET VIEW PANORAMA
 ******************************************************************************/
const streetViewPanoramaInstance = ref<
  google.maps.StreetViewPanorama | undefined
>();

/*******************************************************************************
 * PROVIDE
 ******************************************************************************/
const streetViewPanoramaPromiseDeferred =
  getStreetViewPanoramaPromiseDeferred();
const promise = getStreetViewPanoramaPromise();
provide($streetViewPanoramaPromise, promise);
// TODO: find a way to implement this in order to use with markers
// provide($mapPromise, promise); // so that we can use it with markers

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
 * FUNCTIONS
 ******************************************************************************/
function resize() {
  if (streetViewPanoramaInstance.value) {
    google.maps.event.trigger(streetViewPanoramaInstance.value, 'resize');
  }
}

/*******************************************************************************
 * WATCHERS
 ******************************************************************************/
watch(
  () => props.zoom,
  (newValue, oldValue) => {
    if (streetViewPanoramaInstance.value && newValue && newValue !== oldValue) {
      streetViewPanoramaInstance.value.setZoom(newValue);
    }
  }
);

/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onMounted(() => {
  useGmapApiPromiseLazy()
    .then(() => {
      if (!gmvStreetViewPanoramaContainer.value) {
        throw new Error(
          `we can find the template ref: 'gmvStreetViewPanoramaContainer'`
        );
      }

      const streetViewOptions = {
        ...getPropsValuesWithoutOptionsProp(props),
        ...props.options,
      };

      streetViewPanoramaInstance.value = new google.maps.StreetViewPanorama(
        gmvStreetViewPanoramaContainer.value,
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
        streetViewPanoramaInstance.value,
        props,
        streetViewPanoramaPropsConfig,
        emits
      );
      bindGoogleMapsEventsToVueEventsOnSetup(
        streetViewPanoramaEventsConfig,
        streetViewPanoramaInstance.value,
        emits
      );

      // manually trigger position
      twoWayBindingWrapper((increment, decrement, shouldUpdate) => {
        // Panos take a while to load
        increment();

        if (!streetViewPanoramaInstance.value) {
          throw new Error('the street view panorama instance was not created');
        }

        streetViewPanoramaInstance.value.addListener('position_changed', () => {
          if (shouldUpdate()) {
            if (!streetViewPanoramaInstance.value) {
              throw new Error(
                'the street view panorama instance was not created'
              );
            }

            emits(
              'position_changed',
              streetViewPanoramaInstance.value.getPosition()
            );
          }

          decrement();
        });

        const updateCenter = () => {
          increment();
          if (!streetViewPanoramaInstance.value) {
            throw new Error(
              'the street view panorama instance was not created'
            );
          }

          streetViewPanoramaInstance.value.setPosition(finalLatLng.value);
        };

        watchPrimitiveProperties(['finalLat', 'finalLng'], updateCenter);
      });

      if (!streetViewPanoramaPromiseDeferred.resolve) {
        throw new Error(
          'streetViewPanoramaPromiseDeferred.resolve is undefined'
        );
      }

      streetViewPanoramaPromiseDeferred.resolve(
        streetViewPanoramaInstance.value
      );

      return streetViewPanoramaInstance.value;
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
defineExpose({ resize });
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
