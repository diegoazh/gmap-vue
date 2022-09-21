<template>
  <div class="vue-map-container">
    <div ref="vueMap" class="vue-map"></div>
    <div class="vue-map-hidden">
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
  defineEmits,
  defineProps,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
  useAttrs,
  watch,
  withDefaults
} from 'vue';
import {
  bindPropsOnSetup,
  getPropsValues,
  twoWayBindingWrapper,
  watchPrimitiveProperties
} from '@/composables/helpers';
import { pluginOptions, useGmapApiPromiseLazy } from '@/composables/promise-lazy-builder';
import { onMountedResizeBusHook, onUnmountedResizeBusHook, useResizeBus } from '@/composables/resize-bus';
import { $mapPromise } from '@/keys/gmap-vue.keys';
import { getMap } from '@/composables/google-maps-promise';
import { Emitter, EventType } from 'mitt';
import { getMapLayerEvents, getMapLayerProps } from '@/composables/map-layer-props';

/**
 * Interfaces
 */
interface IMapLayerData {
  recyclePrefix: string;
}

interface IMapLayerData {
  recyclePrefix: string;
}

interface MapPromiseDeferred {
  resolve: ((value: google.maps.Map | undefined) => void) | undefined;
  reject: ((reason?: any) => void) | undefined;
}

/**
 * The initial Map center.
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
 *
 * The initial Map zoom level. Valid values: Integers between zero, and up to the supported maximum zoom level.
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
 *
 * The heading for aerial imagery in degrees measured clockwise from cardinal direction North. Headings are snapped to the nearest available angle for which imagery is available.
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
 *
 * The initial Map mapTypeId. Defaults to ROADMAP.
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
 *
 * For vector maps, sets the angle of incidence of the map. The allowed values are restricted depending on the zoom level of the map. For raster maps, controls the automatic switching behavior for the angle of incidence of the map. The only allowed values are 0 and 45. The value 0 causes the map to always use a 0° overhead view regardless of the zoom level and viewport. The value 45 causes the tilt angle to automatically switch to 45 whenever 45° imagery is available for the current zoom level and viewport, and switch back to 0 whenever 45° imagery is not available (this is the default behavior). 45° imagery is only available for satellite and hybrid map types, within some locations, and at some zoom levels. Note: getTilt returns the current tilt angle, not the value specified by this option. Because getTilt and this option refer to different things, do not bind() the tilt property; doing so may yield unpredictable effects.
 * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
 */
interface IMapLayerVueComponentProps {
  resizeBus?: Emitter<Record<EventType, unknown>>;
  center: google.maps.LatLng | google.maps.LatLngLiteral;
  zoom?: number;
  heading?: number;
  mapTypeId?: google.maps.MapTypeId;
  tilt?: number;
  options?: { [key: string]: any };
}

/**
 * Data
 */
const mapPromiseDeferred: MapPromiseDeferred = reactive({
  resolve: undefined,
  reject: undefined
});
const promise: Promise<google.maps.Map | undefined> = new Promise(
  (resolve, reject) => {
    mapPromiseDeferred.resolve = resolve;
    mapPromiseDeferred.reject = reject;
  }
);
const recyclePrefix = '__gmc__';
const map = getMap();

/**
 * Provide $mapPromise to all children
 */
provide($mapPromise, promise);

/**
 * Define component props
 */
const props = withDefaults(defineProps<IMapLayerVueComponentProps>(), {
  mapTypeId: globalThis?.google?.maps?.MapTypeId?.ROADMAP || 'roadmap'
});

/**
 * Define resize bus
 */
const { currentResizeBus, _delayedResizeCallback } = useResizeBus();
let { _resizeCallback } = useResizeBus();

/**
 * Computed
 */
const finalLat = computed(() => {
  if (!props.center) {
    throw new Error('center is not defined');
  }

  return typeof props.center.lat === 'function'
    ? props.center.lat()
    : props.center.lat;
});
const finalLng = computed(() => {
  if (!props.center) {
    throw new Error('center is not defined');
  }

  return typeof props.center.lng === 'function'
    ? props.center.lng()
    : props.center.lng;
});
const finalLatLng = computed(() => {
  return { lat: finalLat.value, lng: finalLng.value };
});

/**
 * Changes the center of the map by the given distance in pixels. If the distance is less than both the width and height of the map, the transition will be smoothly animated. Note that the map coordinate system increases from west to east (for x values) and north to south (for y values).
 * @method panBy
 * @param {number} x - Number of pixels to move the map in the x direction.
 * @param {number} y - Number of pixels to move the map in the y direction.
 * @returns {void}
 * @public
 */
function panBy(...args: [number, number]): void {
  if (map.value) {
    map.value.panBy(...args);
  }
}

/**
 * Changes the center of the map to the given LatLng. If the change is less than both the width and height of the map, the transition will be smoothly animated.
 * @method panTo
 * @param {(LatLng|LatLngLiteral)} latLng - The new center latitude/longitude of the map. (types `LatLng|LatLngLiteral`)
 * @returns {void}
 * @public
 */
function panTo(args: google.maps.LatLng | google.maps.LatLngLiteral): void {
  if (map.value) {
    map.value.panTo(args);
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
  ...args: [
      google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
      number | google.maps.Padding
  ]
): void {
  if (map.value) {
    map.value.panToBounds(...args);
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
  ...args: [
      google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
      number | google.maps.Padding
  ]
): void {
  if (map.value) {
    map.value.fitBounds(...args);
  }
}

/**
 * Get the recycle key of the map
 * @method getRecycleKey
 * @param {undefined}
 * @returns {void}
 * @public
 */
function getRecycleKey(): string {
  return props?.options?.recycle
    ? `${recyclePrefix}${props?.options.recycle}`
    : recyclePrefix;
}

/**
 * This method trigger the resize event of Google Maps
 * @method resize
 * @param {undefined}
 * @returns {void}
 * @public
 */
function resize(): void {
  if (map.value) {
    google.maps.event.trigger(map.value, 'resize');
  }
}

/**
 * Preserve the previous center when resize the map
 * @method resizePreserveCenter
 * @param {undefined}
 * @returns {void}
 * @public
 */
function resizePreserveCenter(): void {
  if (!map.value) {
    return;
  }

  const oldCenter = map.value.getCenter();
  google.maps.event.trigger(map.value, 'resize');

  if (oldCenter) {
    map.value.setCenter(oldCenter);
  }
}

// Override composable resizeBus::_resizeCallback
// because resizePreserveCenter is usually the
// expected behaviour
_resizeCallback = () => {
  resizePreserveCenter();
};

/**
 * Watchers
 */
watch(
  () => props.zoom,
  (newVal) => {
    if (map.value && newVal) {
      map.value.setZoom(newVal);
    }
  }
);

/**
 * Template refs
 */
const vueMap = ref<HTMLElement | null>(null);

/**
 * Get attributes
 */
const $attrs = useAttrs();

/**
 * Define events emitted by this component
 */
const emits = defineEmits(getMapLayerEvents());

/**
 * Expose local variables
 */
defineExpose({ vueMap });

/**
 * Hooks
 */
onMounted(() => {
  useGmapApiPromiseLazy()
    .then(() => {
      if (!vueMap.value) {
        throw new Error(`we can find the template ref: 'vueMap'`);
      }

      const initialOptions = {
        ...props.options,
        ...getPropsValues(props)
      };

      const { options: extraOptions, ...finalOptions } = initialOptions;

      const recycleKey = getRecycleKey();

      if (props?.options?.recycle && window[recycleKey]) {
        vueMap.value.appendChild(window[recycleKey].div);
        map.value = window[recycleKey].map as google.maps.Map;
        map.value.setOptions(finalOptions);
      } else {
        map.value = new google.maps.Map(vueMap.value, finalOptions);
        window[recycleKey] = { map: map.value };
      }

      onMountedResizeBusHook(map.value, props, resize);

      const mapLayerProps = getMapLayerProps();
      const mapLayerEvents = getMapLayerEvents('events');
      const $gmapOptions = pluginOptions();

      // binding properties (two and one way)
      const propsEvents = bindPropsOnSetup(
        map,
        mapLayerProps as any,
        $gmapOptions,
        $attrs
      );

      // bind prop events of google maps
      propsEvents.emitParams.forEach((emitParam) => {
        map.value?.addListener(emitParam[0], () => {
          emits(emitParam[0] as any, emitParam[1]());
        });
      });

      // binding events
      mapLayerEvents.forEach((eventName) => {
        if ($gmapOptions.autoBindAllEvents || $attrs[eventName]) {
          map.value?.addListener(eventName, (ev: any) => {
            emits(eventName as any, ev);
          });
        }
      });

      // manually trigger center and zoom
      twoWayBindingWrapper(
        (
          increment: () => void,
          decrement: () => void,
          shouldUpdate: () => boolean
        ) => {
          map.value?.addListener('center_changed', () => {
            if (shouldUpdate()) {
              /**
               * This event is fired when the map center property changes. It sends the position displayed at the center of the map. If the center or bounds have not been set then the result is undefined. (types: `LatLng|undefined`)
               *
               * @event center_changed
               * @type {(LatLng|undefined)}
               */
              emits('center_changed', map.value?.getCenter());
            }

            decrement();
          });

          const updateCenter = () => {
            increment();

            map.value?.setCenter(finalLatLng.value);
          };

          watchPrimitiveProperties(['finalLat', 'finalLng'], updateCenter);
        }
      );

      map.value?.addListener('zoom_changed', () => {
        /**
         * This event is fired when the map zoom property changes. It sends the zoom of the map. If the zoom has not been set then the result is undefined. (types: `number|undefined`)
         *
         * @event zoom_changed
         * @type {(number|undefined)}
         */
        emits('zoom_changed', map.value?.getZoom());
      });
      map.value?.addListener('bounds_changed', () => {
        /**
         * This event is fired when the viewport bounds have changed. It sends The lat/lng bounds of the current viewport.
         *
         * @event bounds_changed
         * @type {LatLngBounds}
         */
        emits('bounds_changed', map.value?.getBounds());
      });

      if (!mapPromiseDeferred.resolve) {
        throw new Error('$mapPromiseDeferred.resolve is undefined');
      }

      mapPromiseDeferred.resolve(map.value);
      return map.value;
    })
    .catch((error) => {
      throw error;
    });
});

onBeforeUnmount(() => {
  const recycleKey = getRecycleKey();
  if (window[recycleKey]) {
    window[recycleKey].div = map.value?.getDiv();
  }
});

onUnmounted(() => {
  onUnmountedResizeBusHook();

  // Note: not all Google Maps components support maps
  if (map.value && (map.value as any)?.setMap) {
    (map.value as any).setMap(null);
  }
});
</script>

<style lang="stylus" scoped>
body {
  .vue-map-container {
    position: relative;

    .vue-map {
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      position: absolute;
    }

    .vue-map-hidden {
      display: none;
    }
  }
}
</style>
