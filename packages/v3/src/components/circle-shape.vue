<script lang="ts" setup>
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getComponentEventsConfig,
  getComponentPropsConfig,
  getPropsValuesWithoutOptionsProp,
  usePluginOptions,
} from '@/composables';
import type { ICircleShapeVueComponentProps } from '@/interfaces';
import { $circleShapePromise, $mapPromise } from '@/keys';
import { inject, onUnmounted, provide } from 'vue';

/**
 * Circle component
 * @displayName GmvCircle
 * @see [source code](/guide/circle.html#source-code)
 * @see [official reference](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#Circle)
 */

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(
  defineProps<{
    center?: google.maps.LatLng | google.maps.LatLngLiteral;
    clickable?: boolean;
    draggable?: boolean;
    editable?: boolean;
    fillColor?: string;
    fillOpacity?: number;
    radius?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokePosition?: google.maps.StrokePosition;
    strokeWeight?: number;
    visible?: boolean;
    zIndex?: number;
    options?: Record<string, unknown>;
  }>(),
  {
    clickable: true,
    draggable: false,
    editable: false,
    strokePosition: globalThis?.google?.maps?.StrokePosition?.CENTER || 0.0,
    visible: true,
  }
);

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits(getComponentEventsConfig('GmvCircle'));

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);

if (!mapPromise) {
  throw new Error('The map promise was not built');
}

/*******************************************************************************
 * CIRCLE SHAPE
 ******************************************************************************/
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
let circleShapeInstance: google.maps.Circle | undefined;

const promise = mapPromise
  ?.then((mapInstance) => {
    if (!mapInstance) {
      throw new Error('The map instance was not created');
    }

    const circleShapeOptions: ICircleShapeVueComponentProps & {
      map: google.maps.Map;
      [key: string]: any;
    } = {
      map: mapInstance,
      ...getPropsValuesWithoutOptionsProp(props),
      ...props.options,
    };

    circleShapeInstance = new google.maps.Circle(circleShapeOptions);

    const circleShapePropsConfig = getComponentPropsConfig('GmvCircle');
    const circleShapeEventsConfig = getComponentEventsConfig(
      'GmvCircle',
      'auto'
    );

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      circleShapePropsConfig,
      circleShapeInstance,
      emits,
      props
    );
    bindGoogleMapsEventsToVueEventsOnSetup(
      circleShapeEventsConfig,
      circleShapeInstance,
      emits,
      excludedEvents
    );

    return circleShapeInstance;
  })
  .catch((error) => {
    throw error;
  });

provide($circleShapePromise, promise);

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
  if (circleShapeInstance) {
    circleShapeInstance.setMap(null);
  }
});
/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ circleShapeInstance });
</script>
