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
  findParentInstanceByName,
  getComponentEventsConfig,
  getComponentPropsConfig,
  getPropsValuesWithoutOptionsProp,
  useComponentPromiseFactory,
  useDestroyPromisesOnUnmounted,
  usePluginOptions,
} from '@/composables';
import type { IMarkerClusterVueComponentProps } from '@/interfaces';
import { $clusterPromise } from '@/keys';
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
    clusterKey?: string;
    mapKey?: string;
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
const mapPromise = props.mapKey
  ? inject<Promise<google.maps.Map | undefined>>(props.mapKey)
  : (findParentInstanceByName('map-layer')?.exposed?.mapPromise as Promise<
      google.maps.Map | undefined
    >);

if (!mapPromise) {
  throw new Error('The map promise was not built');
}

/*******************************************************************************
 * PROVIDE
 ******************************************************************************/
const { promiseDeferred: clusterPromiseDeferred, promise } =
  useComponentPromiseFactory(props.clusterKey || $clusterPromise);
provide(props?.clusterKey || $clusterPromise, promise);

/*******************************************************************************
 * MARKER CLUSTER
 ******************************************************************************/
defineOptions({ name: 'cluster-icon' });
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
mapPromise
  ?.then((mapInstance) => {
    if (!mapInstance) {
      throw new Error('the map instance is not defined');
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

    const cluster = new MarkerClusterer({
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
      cluster,
      emits as any,
      props,
    );

    bindGoogleMapsEventsToVueEventsOnSetup(
      clusterIconEventsConfig,
      cluster,
      emits as any,
      excludedEvents,
    );

    if (!clusterPromiseDeferred.resolve) {
      throw new Error('clusterPromiseDeferred.resolve is undefined');
    }

    clusterPromiseDeferred.resolve(cluster);
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

/*******************************************************************************
 * WATCHERS
 ******************************************************************************/

/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onBeforeUnmount(async () => {
  const cluster = await promise;

  if (cluster) {
    cluster.clearMarkers();
  }
});

onUnmounted(async () => {
  const cluster = await promise;

  if (cluster) {
    cluster.setMap(null);
  }

  useDestroyPromisesOnUnmounted(props.clusterKey || $clusterPromise);
});

onUpdated(async () => {
  const cluster = await promise;

  if (cluster) {
    cluster.render();
  }
});

/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ clusterPromise: promise });
</script>
