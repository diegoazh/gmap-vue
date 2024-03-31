<template>
  <div>
    <!-- @slot Used to set your cluster -->
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
  usePluginOptions,
} from '@/composables';
import type { IMarkerClusterVueComponentProps } from '@/interfaces';
import { $clusterPromise, $mapPromise } from '@/keys';
import {
  MarkerClusterer,
  type Algorithm,
  type Renderer,
  type onClusterClickHandler,
} from '@googlemaps/markerclusterer';
import { inject, onBeforeUnmount, onUnmounted, onUpdated, provide } from 'vue';

/**
 * Cluster component
 * @displayName GmvCluster
 * @see [source code](/guide/cluster.html#source-code)
 * @see [Official documentation](https://googlemaps.github.io/js-markerclusterer/modules.html)
 * @see [Marker clusterer](https://developers.google.com/maps/documentation/javascript/marker-clustering#maps_marker_clustering-javascript)
 */

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(
  defineProps<{
    algorithm?: Algorithm;
    markers?: google.maps.marker.AdvancedMarkerElement[];
    onClusterClick?: onClusterClickHandler;
    renderer?: Renderer;
    options?: Record<string, any>;
  }>(),
  {},
);

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits<{
  clusteringbegin: [];
  clusteringend: [];
  click: [value: google.maps.MapMouseEvent];
  rightclick: [value: google.maps.MapMouseEvent];
  dblclick: [value: google.maps.MapMouseEvent];
  drag: [value: google.maps.MapMouseEvent];
  dragend: [value: google.maps.MapMouseEvent];
  dragstart: [value: google.maps.MapMouseEvent];
  mousedown: [value: google.maps.MapMouseEvent];
  mouseout: [value: google.maps.MapMouseEvent];
  mouseover: [value: google.maps.MapMouseEvent];
  mouseup: [value: google.maps.MapMouseEvent];
}>();

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);

if (!mapPromise) {
  throw new Error('The map promise was not built');
}

/*******************************************************************************
 * MARKER CLUSTER
 ******************************************************************************/
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
let clusterInstance: MarkerClusterer | undefined;
const promise = mapPromise
  ?.then((mapInstance) => {
    if (!mapInstance) {
      throw new Error('the map instance was not created');
    }

    // Initialize the maps with the given options
    const initialOptions: IMarkerClusterVueComponentProps & {
      map: google.maps.Map | undefined;
      [key: string]: any;
    } = {
      map: mapInstance,
      ...getPropsValuesWithoutOptionsProp(props),
      ...props.options,
    };
    const { markers, onClusterClick, renderer, algorithm } = initialOptions;

    if (!MarkerClusterer && typeof MarkerClusterer !== 'function') {
      throw new Error(
        'MarkerClusterer is not installed! Import it or include it from https://cdnjs.cloudflare.com/ajax/libs/js-marker-clusterer/1.0.0/markerclusterer.js',
      );
    }

    clusterInstance = new MarkerClusterer({
      map: mapInstance,
      markers,
      onClusterClick,
      algorithm,
      renderer,
    });

    const clusterIconPropsConfig = getComponentPropsConfig('GmvCluster');
    const clusterIconEventsConfig = getComponentEventsConfig(
      'GmvCluster',
      'auto',
    );

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      clusterIconPropsConfig,
      clusterInstance,
      emits as any,
      props,
    );

    bindGoogleMapsEventsToVueEventsOnSetup(
      clusterIconEventsConfig,
      clusterInstance,
      emits as any,
      excludedEvents,
    );

    return clusterInstance;
  })
  .catch((error) => {
    throw error;
  });

provide($clusterPromise, promise);

/*******************************************************************************
 * COMPUTED
 ******************************************************************************/

/*******************************************************************************
 * METHODS
 ******************************************************************************/

/*******************************************************************************
 * WATCHERS
 ******************************************************************************/

/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onBeforeUnmount(() => {
  if (clusterInstance) {
    clusterInstance.clearMarkers();
  }
});

onUnmounted(() => {
  if (clusterInstance) {
    clusterInstance.setMap(null);
  }
});

onUpdated(() => {
  if (clusterInstance) {
    clusterInstance.render();
  }
});

/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ clusterInstance, clusterPromise: promise });
</script>
