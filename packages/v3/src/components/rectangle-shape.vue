<script lang="ts" setup>
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  findParentInstanceByName,
  getComponentEventsConfig,
  getComponentPropsConfig,
  getPropsValuesWithoutOptionsProp,
  useDestroyPromisesOnUnmounted,
  usePluginOptions,
  usePromise,
  usePromiseDeferred,
} from '@/composables';
import type { IRectangleShapeVueComponentProps } from '@/interfaces';
import { $rectangleShapePromise } from '@/keys';
import { inject, onUnmounted, provide } from 'vue';

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
    rectangleKey?: string;
    mapKey?: string;
    options?: Record<string, unknown>;
  }>(),
  {
    clickable: true,
    draggable: false,
    editable: false,
    strokePosition: globalThis?.google?.maps?.StrokePosition?.CENTER || 0.0,
    visible: true,
  },
);

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits<{
  bounds_changed: [];
  click: [value: google.maps.PolyMouseEvent];
  contextmenu: [value: google.maps.PolyMouseEvent];
  dblclick: [value: google.maps.PolyMouseEvent];
  drag: [value: google.maps.MapMouseEvent];
  dragend: [value: google.maps.MapMouseEvent];
  dragstart: [value: google.maps.MapMouseEvent];
  mousedown: [value: google.maps.PolyMouseEvent];
  mousemove: [value: google.maps.PolyMouseEvent];
  mouseout: [value: google.maps.PolyMouseEvent];
  mouseover: [value: google.maps.PolyMouseEvent];
  mouseup: [value: google.maps.PolyMouseEvent];
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
const rectanglePromiseDeferred = usePromiseDeferred(
  props.rectangleKey || $rectangleShapePromise,
);
const promise = usePromise(props.rectangleKey || $rectangleShapePromise);
provide(props.rectangleKey || $rectangleShapePromise, promise);

/*******************************************************************************
 * RECTANGLE SHAPE
 ******************************************************************************/
defineOptions({ name: 'rectangle-shape' });
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
let rectangleShapeInstance: google.maps.Rectangle | undefined;
mapPromise
  ?.then(async (mapInstance) => {
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

    const { Rectangle } = (await google.maps.importLibrary(
      'maps',
    )) as google.maps.MapsLibrary;
    rectangleShapeInstance = new Rectangle(rectangleOptions);

    const rectangleShapePropsConfig = getComponentPropsConfig('GmvRectangle');
    const rectangleShapeEventsConfig = getComponentEventsConfig(
      'GmvRectangle',
      'auto',
    );

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      rectangleShapePropsConfig,
      rectangleShapeInstance,
      emits as any,
      props,
    );
    bindGoogleMapsEventsToVueEventsOnSetup(
      rectangleShapeEventsConfig,
      rectangleShapeInstance,
      emits as any,
      excludedEvents,
    );

    if (!rectanglePromiseDeferred.resolve) {
      throw new Error('rectanglePromiseDeferred.resolve is undefined');
    }

    rectanglePromiseDeferred.resolve(rectangleShapeInstance);
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
onUnmounted(() => {
  if (rectangleShapeInstance) {
    rectangleShapeInstance.setMap(null);
  }

  useDestroyPromisesOnUnmounted(props.rectangleKey || $rectangleShapePromise);
});

/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ rectangleShapeInstance, rectangleShapePromise: promise });
</script>
