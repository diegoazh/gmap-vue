<script lang="ts" setup>
import {
  getComponentEventsConfig,
  getComponentPropsConfig,
} from '@/composables/plugin-component-config';
import { inject, onUnmounted, provide, ref } from 'vue';
import { $mapPromise, $rectangleShapePromise } from '@/keys/gmap-vue.keys';
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getPropsValuesWithoutOptionsProp,
} from '@/composables/helpers';

/**
 * Rectangle component
 * @displayName GmvRectangle
 * @see [source code](/guide/rectangle.html#source-code)
 * @see [official docs](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#Rectangle)
 * @see [official reference](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#Rectangle)
 */

/*******************************************************************************
 * INTERFACES
 ******************************************************************************/
/**
 * Rectangle shape Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.bounds
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.clickable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.draggable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.editable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.fillColor
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.fillOpacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.strokeColor
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.strokeOpacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.strokePosition
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.strokeWeight
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.visible
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.zIndex
 */
interface IRectangleShapeVueComponentProps {
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
}

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(defineProps<IRectangleShapeVueComponentProps>(), {
  clickable: true,
  draggable: false,
  editable: false,
  strokePosition: google.maps.StrokePosition.CENTER,
  visible: true,
});

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits(getComponentEventsConfig('GmvRectangle'));

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);

/*******************************************************************************
 * RECTANGLE SHAPE
 ******************************************************************************/
const rectangleShapeInstance = ref<google.maps.Rectangle | undefined>();
const promise = mapPromise
  ?.then((mapInstance) => {
    if (!mapInstance) {
      throw new Error('the map instance was not created');
    }

    const rectangleOptions = {
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
      emits
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
 * FUNCTIONS
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
</script>
