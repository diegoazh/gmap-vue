<script lang="ts" setup>
import { inject, onUnmounted, provide, ref } from 'vue';
import { $circleShapePromise, $mapPromise } from '@/keys/gmap-vue.keys';
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getPropsValuesWithoutOptionsProp,
} from '@/composables/helpers';
import {
  getComponentEventsConfig,
  getComponentPropsConfig,
} from '@/composables/plugin-component-config';

/**
 * Circle component
 * @displayName GmvCircle
 * @see [source code](/guide/circle.html#source-code)
 * @see [official reference](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#Circle)
 */

/*******************************************************************************
 * INTERFACES
 ******************************************************************************/
/**
 * Circle shape Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.center
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.clickable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.draggable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.editable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.fillColor
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.fillOpacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.radius
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.strokeColor
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.strokeOpacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.strokePosition
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.strokeWeight
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#CircleOptions.visible
 */
interface ICircleShapeVueComponentProps {
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
}

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(defineProps<ICircleShapeVueComponentProps>(), {
  clickable: true,
  draggable: false,
  editable: false,
  strokePosition: google.maps.StrokePosition.CENTER,
  visible: true,
});

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits(getComponentEventsConfig('GmvCircle'));

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);

/*******************************************************************************
 * CIRCLE SHAPE
 ******************************************************************************/
const circleShapeInstance = ref<google.maps.Circle | undefined>();

const promise = mapPromise
  ?.then((mapInstance) => {
    if (!mapInstance) {
      throw new Error('the map instance was not created');
    }

    const circleShapeOptions: ICircleShapeVueComponentProps & {
      map: google.maps.Map;
      [key: string]: any;
    } = {
      map: mapInstance,
      ...getPropsValuesWithoutOptionsProp(props),
      ...props.options,
    };

    circleShapeInstance.value = new google.maps.Circle(circleShapeOptions);

    const circleShapePropsConfig = getComponentPropsConfig('GmvCircle');
    const circleShapeEventsConfig = getComponentEventsConfig(
      'GmvCircle',
      'auto'
    );

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      circleShapeInstance.value,
      props,
      circleShapePropsConfig,
      emits
    );
    bindGoogleMapsEventsToVueEventsOnSetup(
      circleShapeEventsConfig,
      circleShapeInstance.value,
      emits
    );

    return circleShapeInstance.value;
  })
  .catch((error) => {
    throw error;
  });

provide($circleShapePromise, promise);

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
  if (circleShapeInstance.value) {
    circleShapeInstance.value.setMap(null);
  }
});
/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
</script>
