<script lang="ts" setup>
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getComponentEventsConfig,
  getComponentPropsConfig,
  getPropsValuesWithoutOptionsProp,
  usePluginOptions,
} from '@/composables';
import type { IHeatmapLayerVueComponentProps } from '@/interfaces';
import { $heatmapLayerPromise, $mapPromise } from '@/keys';
import { inject, onUnmounted, provide, watch } from 'vue';

/**
 * HeatmapLayer component
 * @displayName GmvHeatmapLayer
 * @see [source code](/guide/heatmap-layer.html#source-code)
 * @see [Official documentation](https://developers.google.com/maps/documentation/javascript/heatmaplayer)
 * @see [Official reference](https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayer)
 */

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(
  defineProps<{
    data?:
      | Array<google.maps.LatLng | google.maps.visualization.WeightedLocation>
      | google.maps.MVCArray<
          google.maps.LatLng | google.maps.visualization.WeightedLocation
        >;
    dissipating?: boolean;
    gradient?: string[];
    maxIntensity?: number;
    opacity?: number;
    number?: number;
    options?: Record<string, unknown>;
  }>(),
  {
    opacity: 0.6,
  },
);

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits<{
  data_changed: [
    value:
      | google.maps.MVCArray<
          google.maps.LatLng | google.maps.visualization.WeightedLocation
        >
      | (google.maps.LatLng | google.maps.visualization.WeightedLocation)[],
  ];
}>();

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);

if (!mapPromise) {
  throw new Error('The map promise was not built');
}

/*******************************************************************************
 * HEATMAP
 ******************************************************************************/
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
let heatMapLayerInstance: google.maps.visualization.HeatmapLayer | undefined;

const promise = mapPromise
  ?.then(async (mapInstance) => {
    if (!mapInstance) {
      throw new Error('the map instance was not created');
    }

    const heatmapLayerOptions: IHeatmapLayerVueComponentProps & {
      map: google.maps.Map;
      [key: string]: any;
    } = {
      map: mapInstance,
      ...getPropsValuesWithoutOptionsProp(props),
      ...props.options,
    };

    const { HeatmapLayer } = (await google.maps.importLibrary(
      'visualization',
    )) as google.maps.VisualizationLibrary;
    heatMapLayerInstance = new HeatmapLayer(heatmapLayerOptions);

    const heatmapLayerPropsConfig = getComponentPropsConfig('GmvHeatmapLayer');
    const heatmapLayerEventsConfig = getComponentEventsConfig(
      'GmvHeatmapLayer',
      'auto',
    );

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      heatmapLayerPropsConfig,
      heatMapLayerInstance,
      emits as any,
      props,
    );

    bindGoogleMapsEventsToVueEventsOnSetup(
      heatmapLayerEventsConfig,
      heatMapLayerInstance,
      emits as any,
      excludedEvents,
    );

    return heatMapLayerInstance;
  })
  .catch((error) => {
    throw error;
  });

provide($heatmapLayerPromise, promise);
/*******************************************************************************
 * COMPUTED
 ******************************************************************************/

/*******************************************************************************
 * METHODS
 ******************************************************************************/

/*******************************************************************************
 * WATCHERS
 ******************************************************************************/
watch(
  () => props.data,
  (value, oldValue) => {
    if (heatMapLayerInstance) {
      if (value && value !== oldValue) {
        heatMapLayerInstance.setData(value);
        emits('data_changed', value);
      }
    }
  },
);

/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onUnmounted(() => {
  if (heatMapLayerInstance) {
    heatMapLayerInstance.setMap(null);
  }
});
/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ heatMapLayerInstance, heatmapLayerPromise: promise });
</script>
