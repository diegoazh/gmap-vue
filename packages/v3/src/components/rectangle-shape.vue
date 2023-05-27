<script lang="ts" setup>
import {
  getComponentEventsConfig,
  getComponentPropsConfig,
} from '@/composables';
import { inject, onUnmounted, provide, ref } from 'vue';
import { $mapPromise, $rectangleShapePromise } from '@/keys';
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getPropsValuesWithoutOptionsProp,
} from '@/composables';
import { usePluginOptions } from '@/composables';
import type { IRectangleShapeVueComponentProps } from '../interfaces/gmap-vue.interface';

/**
 * Rectangle component
 * @displayName GmvRectangle
 * @see [source code](/guide/rectangle.html#source-code)
 * @see [official docs](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#Rectangle)
 * @see [official reference](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#Rectangle)
 */

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(
  defineProps<{
    bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
    clickable?: boolean;
    draggable?: boolean;
    editable?: boolean;
    fillColor?: string;
    fillOpacity?: number;
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
const emits = defineEmits(getComponentEventsConfig('GmvRectangle'));

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);

if (!mapPromise) {
  throw new Error('The map promise was not built');
}

/*******************************************************************************
 * RECTANGLE SHAPE
 ******************************************************************************/
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
const rectangleShapeInstance = ref<google.maps.Rectangle | undefined>();
const promise = mapPromise
  ?.then((mapInstance) => {
    if (!mapInstance) {
      throw new Error('the map instance was not created');
    }

    const rectangleOptions: IRectangleShapeVueComponentProps & {
      map: google.maps.Map | undefined;
      [key: string]: any;
    } = {
      map: mapInstance,
      ...getPropsValuesWithoutOptionsProp(props),
      ...props.options,
    };

    rectangleShapeInstance.value = new google.maps.Rectangle(rectangleOptions);

    const rectangleShapePropsConfig = getComponentPropsConfig('GmvRectangle');
    const rectangleShapeEventsConfig = getComponentEventsConfig(
      'GmvRectangle',
      'auto'
    );

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      rectangleShapePropsConfig,
      rectangleShapeInstance.value,
      emits,
      props
    );
    bindGoogleMapsEventsToVueEventsOnSetup(
      rectangleShapeEventsConfig,
      rectangleShapeInstance.value,
      emits,
      excludedEvents
    );

    return rectangleShapeInstance.value;
  })
  .catch((error) => {
    throw error;
  });

provide($rectangleShapePromise, promise);

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
  if (rectangleShapeInstance.value) {
    rectangleShapeInstance.value.setMap(null);
  }
});

/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ rectangleShapeInstance });
</script>
