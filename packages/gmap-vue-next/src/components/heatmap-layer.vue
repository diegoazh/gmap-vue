<script lang="ts" setup>
import { inject, onUnmounted, provide, ref, watch } from 'vue';
import { $heatmapLayerPromise, $mapPromise } from '@/keys/gmap-vue.keys';
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getPropsValuesWithoutOptionsProp,
} from '@/composables/helpers';
import {
  getComponentEventsConfig,
  getComponentPropsConfig,
} from '@/composables/plugin-component-config';
import { usePluginOptions } from '@/composables/promise-lazy-builder';

/**
 * HeatmapLayer component
 * @displayName GmvHeatmapLayer
 * @see [source code](/guide/heatmap-layer.html#source-code)
 * @see [Official documentation](https://developers.google.com/maps/documentation/javascript/heatmaplayer)
 */

/*******************************************************************************
 * INTERFACES
 ******************************************************************************/
/**
 * Heatmap Layer Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions.data
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions.dissipating
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions.gradient
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions.maxIntensity
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions.opacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions.radius
 */
interface IHeatmapLayerVueComponentProps {
  data?:
    | google.maps.MVCArray<
        google.maps.LatLng | google.maps.visualization.WeightedLocation
      >
    | Array<google.maps.LatLng | google.maps.visualization.WeightedLocation>;
  dissipating?: boolean;
  gradient?: string[];
  maxIntensity?: number;
  opacity?: number;
  number?: number;
  options?: Record<string, unknown>;
}

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(defineProps<IHeatmapLayerVueComponentProps>(), {
  opacity: 0.6,
});

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits(getComponentEventsConfig('GmvHeatmapLayer'));

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);

/*******************************************************************************
 * HEATMAP
 ******************************************************************************/
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
const heatMapLayerInstance = ref<
  google.maps.visualization.HeatmapLayer | undefined
>();

const promise = mapPromise
  ?.then((mapInstance) => {
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

    heatMapLayerInstance.value = new google.maps.visualization.HeatmapLayer(
      heatmapLayerOptions
    );

    const heatmapLayerPropsConfig = getComponentPropsConfig('GmvHeatmapLayer');
    const heatmapLayerEventsConfig = getComponentEventsConfig(
      'GmvHeatmapLayer',
      'auto'
    );

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      heatmapLayerPropsConfig,
      heatMapLayerInstance.value,
      emits,
      props
    );

    bindGoogleMapsEventsToVueEventsOnSetup(
      heatmapLayerEventsConfig,
      heatMapLayerInstance.value,
      emits,
      excludedEvents
    );

    return heatMapLayerInstance.value;
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
    if (heatMapLayerInstance.value) {
      if (value && value !== oldValue) {
        heatMapLayerInstance.value.setData(value);
      }
    }
  }
);

/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onUnmounted(() => {
  if (heatMapLayerInstance.value) {
    heatMapLayerInstance.value.setMap(null);
  }
});
/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ heatMapLayerInstance });
</script>
