<template>
  <div class="gmv-map-container">
    <div ref="gmvMap" class="gmv-map"></div>
    <div class="gmv-map-hidden">
      <!-- @slot The default slot is wrapped in a class that sets display: none; so by default any component you add to your map will be invisible. This is ok for most of the supplied components that interact directly with the Google map object, but it's not good if you want to bring up things like toolboxes, etc. -->
      <slot></slot>
    </div>
    <!-- @slot This slot must be used if you want to display content within the responsive wrapper for the map.  -->
    <slot name="visible"></slot>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  provide,
  ref,
  watch,
} from 'vue';
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getPropsValuesWithoutOptionsProp,
  twoWayBindingWrapper,
  watchPrimitiveProperties,
} from '@/composables/helpers';
import { useGmapApiPromiseLazy } from '@/composables/promise-lazy-builder';
import {
  onMountedResizeBusHook,
  onUnmountedResizeBusHook,
  useResizeBus,
} from '@/composables/resize-bus';
import { $mapPromise } from '@/keys/gmap-vue.keys';
import {
  getMapPromise,
  getMapPromiseDeferred,
} from '@/composables/map-promise';
import {
  getComponentEventsConfig,
  getComponentPropsConfig,
} from '@/composables/plugin-component-config';
import type { Emitter, EventType } from 'mitt';

/**
 * Map component
 * @displayName GmvMap
 * @see [source code](/guide/map.html#source-code)
 * @see [Official documentation](https://developers.google.com/maps/documentation/javascript/basics)
 * @see [Official reference](https://developers.google.com/maps/documentation/javascript/reference/map)
 */

/*******************************************************************************
 * INTERFACES
 ******************************************************************************/
/**
 * MapOptions interface
 *
 * MapOptions object used to define the properties that can be set on a Map.
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.backgroundColor
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.center
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.clickableIcons
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.controlSize
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.disableDefaultUI
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.draggableCursor
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.draggingCursor
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.fullscreenControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.fullscreenControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.gestureHandling
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.heading
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.isFractionalZoomEnabled
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.keyboardShortcuts
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.mapTypeControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.mapTypeControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.mapTypeId
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.maxZoom
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.minZoom
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.noClear
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.panControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.panControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.restriction
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.rotateControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.rotateControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.scaleControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.scaleControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.streetView
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.streetViewControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.styles
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.tilt
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.zoom
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.zoomControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.zoomControlOptions
 */
interface IMapLayerVueComponentProps {
  backgroundColor?: string;
  center: google.maps.LatLng | google.maps.LatLngLiteral;
  clickableIcons?: boolean;
  controlSize?: number;
  disableDefaultUI?: boolean;
  draggableCursor?: string;
  draggingCursor?: string;
  fullscreenControl?: boolean;
  fullscreenControlOptions?: google.maps.FullscreenControlOptions;
  gestureHandling?: 'cooperative' | 'greedy' | 'none' | 'auto';
  heading?: number;
  isFractionalZoomEnabled?: boolean;
  keyboardShortcuts?: boolean;
  mapTypeControl?: boolean;
  mapTypeControlOptions?: google.maps.MapTypeControlOptions;
  mapTypeId?: google.maps.MapTypeId;
  maxZoom?: number;
  minZoom?: number;
  noClear?: boolean;
  panControl?: boolean;
  panControlOptions?: google.maps.PanControlOptions;
  restriction?: google.maps.MapRestriction;
  rotateControl?: boolean;
  rotateControlOptions?: google.maps.RotateControlOptions;
  scaleControl?: boolean;
  scaleControlOptions?: google.maps.ScaleControlOptions;
  streetView?: google.maps.StreetViewPanorama;
  streetViewControl?: boolean;
  styles?: google.maps.MapTypeStyle[];
  tilt?: number;
  zoom?: number;
  zoomControl?: boolean;
  zoomControlOptions?: google.maps.ZoomControlOptions;
  resizeBus?: Emitter<Record<EventType, unknown>>;
  options?: { [key: string]: any };
}

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(defineProps<IMapLayerVueComponentProps>(), {
  mapTypeId: globalThis?.google?.maps?.MapTypeId?.ROADMAP || 'roadmap',
  clickableIcons: true,
  disableDefaultUI: false,
  fullscreenControl: true,
  gestureHandling: 'auto',
  keyboardShortcuts: true,
  mapTypeControl: true,
  panControl: true,
  rotateControl: true,
  scaleControl: true,
  streetViewControl: true,
  zoomControl: true,
});

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES AND EMITTERS
 ******************************************************************************/
const gmvMap = ref<HTMLElement | null>(null);
const emits = defineEmits(getComponentEventsConfig('GmvMap'));

/*******************************************************************************
 * RECYCLE KEY
 ******************************************************************************/
const recyclePrefix = '__gmc__';

/**
 * Get the recycle key of the map
 * @method getRecycleKey
 * @returns {void}
 * @public
 */
function getRecycleKey(): string {
  return props?.options?.recycle
    ? `${recyclePrefix}${props?.options.recycle}`
    : recyclePrefix;
}

/*******************************************************************************
 * MAP
 ******************************************************************************/
const mapInstance = ref<google.maps.Map | undefined>();

/*******************************************************************************
 * PROVIDE
 ******************************************************************************/
const mapPromiseDeferred = getMapPromiseDeferred();
const promise = getMapPromise();
provide($mapPromise, promise);

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
  if (mapInstance.value) {
    google.maps.event.trigger(mapInstance.value, 'resize');
  }
}

/**
 * Preserve the previous center when resize the map
 * @method resizePreserveCenter
 * @returns {void}
 * @public
 */
function resizePreserveCenter(): void {
  if (!mapInstance.value) {
    return;
  }

  const oldCenter = mapInstance.value.getCenter();
  google.maps.event.trigger(mapInstance.value, 'resize');

  if (oldCenter) {
    mapInstance.value.setCenter(oldCenter);
  }
}

/*******************************************************************************
 * COMPUTED
 ******************************************************************************/
const finalLat = computed(() => {
  if (!props.center) {
    return console.warn('center is not defined');
  }

  return typeof props.center.lat === 'function'
    ? props.center.lat()
    : props.center.lat;
});
const finalLng = computed(() => {
  if (!props.center) {
    return console.warn('center is not defined');
  }

  return typeof props.center.lng === 'function'
    ? props.center.lng()
    : props.center.lng;
});
const finalLatLng = computed(
  () =>
    ({ lat: finalLat.value, lng: finalLng.value } as google.maps.LatLngLiteral)
);

/*******************************************************************************
 * FUNCTIONS
 ******************************************************************************/
/**
 * Changes the center of the map by the given distance in pixels. If the distance is less than both the width and height of the map, the transition will be smoothly animated. Note that the map coordinate system increases from west to east (for x values) and north to south (for y values).
 * @method panBy
 * @param {number} x - Number of pixels to move the map in the x direction.
 * @param {number} y - Number of pixels to move the map in the y direction.
 * @returns {void}
 * @public
 */
function panBy(x: number, y: number): void {
  if (mapInstance.value) {
    mapInstance.value.panBy(x, y);
  }
}

/**
 * Changes the center of the map to the given LatLng. If the change is less than both the width and height of the map, the transition will be smoothly animated.
 * @method panTo
 * @param {(LatLng|LatLngLiteral)} latLng - The new center latitude/longitude of the map. (types `LatLng|LatLngLiteral`)
 * @returns {void}
 * @public
 */
function panTo(latLng: google.maps.LatLng | google.maps.LatLngLiteral): void {
  if (mapInstance.value) {
    mapInstance.value.panTo(latLng);
  }
}

/**
 * Pans the map by the minimum amount necessary to contain the given LatLngBounds. It makes no guarantee where on the map the bounds will be, except that the map will be panned to show as much of the bounds as possible inside {currentMapSizeInPx} - {padding}. For both raster and vector maps, the map's zoom, tilt, and heading will not be changed.
 * @method panToBounds
 * @param {(LatLngBounds|LatLngBoundsLiteral)} latLngBounds - The bounds to pan the map to. (types: `LatLngBounds|LatLngBoundsLiteral`)
 * @param {(number|Padding)} [padding] - optional Padding in pixels. A number value will yield the same padding on all 4 sides. The default value is 0. (types: `number|Padding`)
 * @returns {void}
 * @public
 */
function panToBounds(
  latLngBounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
  padding: number | google.maps.Padding
): void {
  if (mapInstance.value) {
    mapInstance.value.panToBounds(latLngBounds, padding);
  }
}

/**
 * Sets the viewport to contain the given bounds.
 Note: When the map is set to display: none, the fitBounds function reads the map's size as 0x0, and therefore does not do anything. To change the viewport while the map is hidden, set the map to visibility: hidden, thereby ensuring the map div has an actual size. For vector maps, this method sets the map's tilt and heading to their default zero values.
 * @method fitBounds
 * @param {(LatLngBounds|LatLngBoundsLiteral)} bounds - Bounds to show. (types: `LatLngBounds|LatLngBoundsLiteral`)
 * @param {(number|Padding)} [padding] - optional Padding in pixels. The bounds will be fit in the part of the map that remains after padding is removed. A number value will yield the same padding on all 4 sides. Supply 0 here to make a fitBounds idempotent on the result of getBounds. (types: `number|Padding`)
 * @returns {void}
 * @public
 */
function fitBounds(
  bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
  padding: number | google.maps.Padding
): void {
  if (mapInstance.value) {
    mapInstance.value.fitBounds(bounds, padding);
  }
}

/*******************************************************************************
 * WATCHERS
 ******************************************************************************/
watch(
  () => props.zoom,
  (newVal, oldValue) => {
    if (mapInstance.value && newVal && newVal !== oldValue) {
      mapInstance.value.setZoom(newVal);
    }
  }
);

/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onMounted(() => {
  useGmapApiPromiseLazy()
    .then(() => {
      if (!gmvMap.value) {
        throw new Error(`we can find the template ref: 'gmvMap'`);
      }

      const mapLayerOptions: Partial<IMapLayerVueComponentProps> = {
        ...getPropsValuesWithoutOptionsProp(props),
        ...props.options,
      };

      const recycleKey = getRecycleKey();

      if (props?.options?.recycle && window[recycleKey]) {
        gmvMap.value.appendChild(window[recycleKey].div);
        mapInstance.value = window[recycleKey].map as google.maps.Map;
        mapInstance.value.setOptions(mapLayerOptions);
      } else {
        mapInstance.value = new google.maps.Map(gmvMap.value, mapLayerOptions);
        window[recycleKey] = { map: mapInstance.value };
      }

      onMountedResizeBusHook(mapInstance.value, props, resizePreserveCenter);

      const mapLayerPropsConfig = getComponentPropsConfig('GmvMap');
      const mapLayerEventsConfig = getComponentEventsConfig('GmvMap', 'auto');

      // binding properties (two and one way)
      bindPropsWithGoogleMapsSettersAndGettersOnSetup(
        mapLayerPropsConfig,
        mapInstance.value,
        emits,
        props
      );

      // Auto bind all events by default
      bindGoogleMapsEventsToVueEventsOnSetup(
        mapLayerEventsConfig,
        mapInstance.value,
        emits
      );

      // manually trigger center and zoom
      twoWayBindingWrapper(
        (
          increment: () => void,
          decrement: () => void,
          shouldUpdate: () => boolean
        ) => {
          mapInstance.value?.addListener('center_changed', () => {
            if (shouldUpdate()) {
              /**
               * This event is fired when the map center property changes. It sends the position displayed at the center of the map. If the center or bounds have not been set then the result is undefined. (types: `LatLng|undefined`)
               *
               * @event center_changed
               * @type {(LatLng|undefined)}
               */
              emits('center_changed', mapInstance.value?.getCenter());
            }

            decrement();
          });

          const updateCenter = () => {
            increment();

            mapInstance.value?.setCenter(finalLatLng.value);
          };

          watchPrimitiveProperties(['finalLat', 'finalLng'], updateCenter);
        }
      );

      mapInstance.value?.addListener('zoom_changed', () => {
        /**
         * This event is fired when the map zoom property changes. It sends the zoom of the map. If the zoom has not been set then the result is undefined. (types: `number|undefined`)
         *
         * @event zoom_changed
         * @type {(number|undefined)}
         */
        emits('zoom_changed', mapInstance.value?.getZoom());
      });
      mapInstance.value?.addListener('bounds_changed', () => {
        /**
         * This event is fired when the viewport bounds have changed. It sends The lat/lng bounds of the current viewport.
         *
         * @event bounds_changed
         * @type {LatLngBounds}
         */
        emits('bounds_changed', mapInstance.value?.getBounds());
      });

      if (!mapPromiseDeferred.resolve) {
        throw new Error('mapPromiseDeferred.resolve is undefined');
      }

      mapPromiseDeferred.resolve(mapInstance.value);
      return mapInstance.value;
    })
    .catch((error) => {
      throw error;
    });
});

onBeforeUnmount(() => {
  const recycleKey = getRecycleKey();
  if (window[recycleKey]) {
    window[recycleKey].div = mapInstance.value?.getDiv();
  }
});

onUnmounted(() => {
  onUnmountedResizeBusHook();
});

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({
  mapInstance,
  panBy,
  panTo,
  panToBounds,
  fitBounds,
  currentResizeBus,
  _resizeCallback,
  _delayedResizeCallback,
  resize,
  resizePreserveCenter,
  getRecycleKey,
});
</script>

<style lang="stylus" scoped>
.gmv-map-container {
  position: relative;

  .gmv-map {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
  }

  .gmv-map-hidden {
    display: none;
  }
}
</style>
