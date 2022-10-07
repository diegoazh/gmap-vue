<script lang="ts" setup>
import {
  defineEmits,
  defineProps,
  inject,
  onUnmounted,
  provide,
  ref,
  withDefaults,
} from 'vue';
import {
  getComponentEventsConfig,
  getComponentPropsConfig,
} from '@/composables/plugin-component-config';
import { $kmlLayerPromise, $mapPromise } from '@/keys/gmap-vue.keys';
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getPropsValuesWithoutOptionsProp,
} from '@/composables/helpers';

/**
 * KmlLayer component
 * @displayName GmvKmlLayer
 * @see [source code](/guide/kml-layer.html#source-code)
 * @see [Official documentation](https://developers.google.com/maps/documentation/javascript/kmllayer)
 * @see [Official reference](https://developers.google.com/maps/documentation/javascript/reference/kml)
 */

/*******************************************************************************
 * INTERFACES
 ******************************************************************************/
/**
 * Kml layer Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.clickable
 * @see https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.preserveViewport
 * @see https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.screenOverlays
 * @see https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.suppressInfoWindows
 * @see https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.url
 */
interface IKmlLayerVueComponentProps {
  clickable?: boolean;
  preserveViewport?: boolean;
  screenOverlays?: boolean;
  suppressInfoWindows?: boolean;
  url?: string;
  zIndex?: number;
  options?: Record<string, unknown>;
}

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(defineProps<IKmlLayerVueComponentProps>(), {
  clickable: true,
  preserveViewport: false,
  screenOverlays: true,
});

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits(getComponentEventsConfig('GmapKmlLayer'));

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);

/*******************************************************************************
 * KML LAYER
 ******************************************************************************/
const map = ref<google.maps.Map | undefined>();
const kmlLayerInstance = ref<google.maps.KmlLayer | undefined>();
const promise = mapPromise
  ?.then((mapInstance) => {
    map.value = mapInstance;

    const kmlLayerOptions = {
      map: mapInstance,
      ...getPropsValuesWithoutOptionsProp(props),
      ...props.options,
    };

    kmlLayerInstance.value = new google.maps.KmlLayer(kmlLayerOptions);

    const kmlLayerPropsConfig = getComponentPropsConfig('GmapKmlLayer');
    const kmlLayerEventsConig = getComponentEventsConfig(
      'GmapKmlLayer',
      'auto'
    );

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      kmlLayerInstance.value,
      props,
      kmlLayerPropsConfig,
      emits
    );
    bindGoogleMapsEventsToVueEventsOnSetup(
      kmlLayerEventsConig,
      kmlLayerInstance.value,
      emits
    );

    return kmlLayerInstance.value;
  })
  .catch((error) => {
    throw error;
  });

provide($kmlLayerPromise, promise);

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
onUnmounted(() => {
  if (kmlLayerInstance.value) {
    kmlLayerInstance.value.setMap(null);
  }
});
/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
</script>
