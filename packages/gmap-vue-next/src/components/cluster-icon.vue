<template>
  <div>
    <!-- @slot Used to set your cluster -->
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import {
  defineProps,
  inject,
  onBeforeUnmount,
  onUnmounted,
  onUpdated,
  provide,
  ref,
  Ref,
  withDefaults,
} from 'vue';
import type {
  Algorithm,
  onClusterClickHandler,
  Renderer,
} from '@googlemaps/markerclusterer';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import {
  getComponentEventsConfig,
  getComponentPropsConfig,
} from '@/composables/plugin-component-config';
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getPropsValues,
} from '@/composables/helpers';
import { $clusterPromise, $mapPromise } from '@/keys/gmap-vue.keys';

/**
 * Cluster component
 * @displayName GmapCluster
 * @see [source code](/guide/cluster.html#source-code)
 * @see [Official documentation](https://googlemaps.github.io/js-markerclusterer/modules.html)
 * @see [Marker clusterer](https://developers.google.com/maps/documentation/javascript/marker-clustering#maps_marker_clustering-javascript)
 */
/*******************************************************************************
 * INTERFACES
 ******************************************************************************/
/**
 * Marker Google Maps properties documentation
 *
 * @see [algorithm](https://googlemaps.github.io/js-markerclusterer/interfaces/MarkerClustererOptions.html#algorithm)
 * @see [markers](https://googlemaps.github.io/js-markerclusterer/interfaces/MarkerClustererOptions.html#markers)
 * @see [onClusterClick](https://googlemaps.github.io/js-markerclusterer/interfaces/MarkerClustererOptions.html#onClusterClick)
 * @see [renderer](https://googlemaps.github.io/js-markerclusterer/interfaces/MarkerClustererOptions.html#renderer)
 */
interface IMarkerClusterVueComponentProps {
  algorithm?: Algorithm;
  markers?: google.maps.Marker[];
  onClusterClick?: onClusterClickHandler;
  renderer?: Renderer;
  options?: Record<string, any>;
}

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(defineProps<IMarkerClusterVueComponentProps>(), {});

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits(getComponentEventsConfig('GmapCluster'));

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);

/*******************************************************************************
 * MARKER CLUSTER
 ******************************************************************************/
let map: google.maps.Map | undefined;
const clusterInstance: Ref<MarkerClusterer | undefined> = ref();
const promise = mapPromise
  ?.then((mapInstance) => {
    if (!mapInstance) {
      throw new Error('The GmapMap component is not defined or initialized');
    }

    map = mapInstance;

    // Initialize the maps with the given options
    const initialOptions: IMarkerClusterVueComponentProps & {
      map: google.maps.Map | undefined;
      [key: string]: any;
    } = {
      ...props.options,
      map,
      ...getPropsValues(props),
    };
    const { markers, onClusterClick, renderer, algorithm } = initialOptions;

    if (!MarkerClusterer && typeof MarkerClusterer !== 'function') {
      throw new Error(
        'MarkerClusterer is not installed! Import it or include it from https://cdnjs.cloudflare.com/ajax/libs/js-marker-clusterer/1.0.0/markerclusterer.js'
      );
    }

    clusterInstance.value = new MarkerClusterer({
      map,
      markers,
      onClusterClick,
      algorithm,
      renderer,
    });

    const componentConfig = getComponentPropsConfig('GmapCluster');
    const clusterEvents = getComponentEventsConfig('GmapCluster', 'auto');

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      clusterInstance.value,
      props,
      componentConfig,
      emits
    );

    bindGoogleMapsEventsToVueEventsOnSetup(
      clusterEvents,
      clusterInstance.value,
      emits
    );

    return clusterInstance.value;
  })
  .catch((error) => {
    throw error;
  });

provide($clusterPromise, promise);

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
onBeforeUnmount(() => {
  if (clusterInstance.value) {
    clusterInstance.value.clearMarkers();
  }
});

onUnmounted(() => {
  // Note: not all Google Maps components support maps
  if (clusterInstance.value && clusterInstance.value.setMap) {
    clusterInstance.value.setMap(null);
  }
});

onUpdated(() => {
  if (clusterInstance.value) {
    clusterInstance.value.render();
  }
});

/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ clusterInstance });
</script>
