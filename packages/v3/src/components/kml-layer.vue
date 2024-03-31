<script lang="ts" setup>
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getComponentEventsConfig,
  getComponentPropsConfig,
  getPropsValuesWithoutOptionsProp,
  usePluginOptions,
} from '@/composables';
import type { IKmlLayerVueComponentProps } from '@/interfaces';
import { $kmlLayerPromise, $mapPromise } from '@/keys';
import { inject, onUnmounted, provide } from 'vue';

/**
 * KmlLayer component
 * @displayName GmvKmlLayer
 * @see [source code](/guide/kml-layer.html#source-code)
 * @see [Official documentation](https://developers.google.com/maps/documentation/javascript/kmllayer)
 * @see [Official reference](https://developers.google.com/maps/documentation/javascript/reference/kml)
 */

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(
  defineProps<{
    clickable?: boolean;
    preserveViewport?: boolean;
    screenOverlays?: boolean;
    suppressInfoWindows?: boolean;
    url?: string;
    zIndex?: number;
    options?: Record<string, unknown>;
  }>(),
  {
    clickable: true,
    preserveViewport: false,
    screenOverlays: true,
  },
);

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits<{
  click: [value: google.maps.KmlMouseEvent];
  defaultviewport_changed: [];
  status_changed: [];
}>();

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);

if (!mapPromise) {
  throw new Error('The map promise was not built');
}

/*******************************************************************************
 * KML LAYER
 ******************************************************************************/
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
let kmlLayerInstance: google.maps.KmlLayer | undefined;
const promise = mapPromise
  ?.then(async (mapInstance) => {
    if (!mapInstance) {
      throw new Error('the map instance was not created');
    }

    const kmlLayerOptions: IKmlLayerVueComponentProps & {
      map: google.maps.Map;
      [key: string]: any;
    } = {
      map: mapInstance,
      ...getPropsValuesWithoutOptionsProp(props),
      ...props.options,
    };

    const { KmlLayer } = (await google.maps.importLibrary(
      'maps',
    )) as google.maps.MapsLibrary;
    kmlLayerInstance = new KmlLayer(kmlLayerOptions);

    const kmlLayerPropsConfig = getComponentPropsConfig('GmvKmlLayer');
    const kmlLayerEventsConig = getComponentEventsConfig('GmvKmlLayer', 'auto');

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      kmlLayerPropsConfig,
      kmlLayerInstance,
      emits as any,
      props,
    );
    bindGoogleMapsEventsToVueEventsOnSetup(
      kmlLayerEventsConig,
      kmlLayerInstance,
      emits as any,
      excludedEvents,
    );

    return kmlLayerInstance;
  })
  .catch((error) => {
    throw error;
  });

provide($kmlLayerPromise, promise);

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
onUnmounted(() => {
  if (kmlLayerInstance) {
    kmlLayerInstance.setMap(null);
  }
});
/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ kmlLayerInstance, kmlLayerPromise: promise });
</script>
