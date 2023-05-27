<script lang="ts" setup>
import {
  getComponentEventsConfig,
  getComponentPropsConfig,
} from '@/composables/plugin-component-config';
import { inject, onUnmounted, provide, ref, watch } from 'vue';
import { $mapPromise, $polylineShapePromise } from '@/keys/gmap-vue.keys';
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getPropsValuesWithoutOptionsProp,
} from '@/composables/helpers';
import { useShapesHelpers } from '@/composables/shapes-helper';
import { usePluginOptions } from '@/composables/promise-lazy-builder';
import type { IPolylineShapeVueComponentProps } from '../interfaces/gmap-vue.interface';

/**
 * PolyLine component
 * @displayName GmvPolyline
 * @see [source code](/guide/polyline.html#source-code)
 * @see [official docs](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#Polyline)
 * @see [official reference](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#Polyline)
 */

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(
  defineProps<{
    clickable?: boolean;
    draggable?: boolean;
    editable?: boolean;
    geodesic?: boolean;
    icons?: Array<google.maps.IconSequence>;
    path?:
      | google.maps.MVCArray<google.maps.LatLng>
      | Array<google.maps.LatLng | google.maps.LatLngLiteral>;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    visible?: boolean;
    zIndex?: number;
    deepWatch?: boolean;
    options?: Record<string, unknown>;
  }>(),
  {
    clickable: true,
    draggable: false,
    editable: false,
    geodesic: false,
    visible: true,
    deepWatch: false,
  }
);

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits(getComponentEventsConfig('GmvPolyline'));

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);

if (!mapPromise) {
  throw new Error('The map promise was not built');
}

/*******************************************************************************
 * POLYLINE SHAPE
 ******************************************************************************/
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
const polylineShapeInstance = ref<google.maps.Polyline | undefined>();
const promise = mapPromise
  ?.then((mapInstance) => {
    if (!mapInstance) {
      throw new Error('the map instance was not created');
    }

    const polylineOptions: IPolylineShapeVueComponentProps & {
      map: google.maps.Map | undefined;
      [key: string]: any;
    } = {
      map: mapInstance,
      ...getPropsValuesWithoutOptionsProp(props),
      ...props.options,
    };

    polylineShapeInstance.value = new google.maps.Polyline(polylineOptions);

    const polylineShapePropsConfig = getComponentPropsConfig('GmvPolyline');
    const polylineShapeEventsConfig = getComponentEventsConfig(
      'GmvPolyline',
      'auto'
    );

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      polylineShapePropsConfig,
      polylineShapeInstance.value,
      emits,
      props
    );
    bindGoogleMapsEventsToVueEventsOnSetup(
      polylineShapeEventsConfig,
      polylineShapeInstance.value,
      emits,
      excludedEvents
    );

    return polylineShapeInstance.value;
  })
  .catch((error) => {
    throw error;
  });

provide($polylineShapePromise, promise);

/*******************************************************************************
 * COMPUTED
 ******************************************************************************/

/*******************************************************************************
 * METHODS
 ******************************************************************************/
const { clearEvents, updatePathOrPaths } = useShapesHelpers();

/*******************************************************************************
 * WATCHERS
 ******************************************************************************/
const pathEventListeners: [
  google.maps.MVCArray<google.maps.LatLng>,
  google.maps.MapsEventListener
][] = [];

watch(
  () => props.path,
  (newValue, oldValue) => {
    if (polylineShapeInstance.value) {
      if (props.path && newValue && newValue !== oldValue) {
        clearEvents(pathEventListeners);

        polylineShapeInstance.value.setPath(newValue);

        const mvcPath = polylineShapeInstance.value.getPath();

        pathEventListeners.push([
          mvcPath,
          mvcPath.addListener(
            'insert_at',
            updatePathOrPaths(
              'path_changed',
              polylineShapeInstance.value.getPath,
              emits
            )
          ),
        ]);
        pathEventListeners.push([
          mvcPath,
          mvcPath.addListener(
            'remove_at',
            updatePathOrPaths(
              'path_changed',
              polylineShapeInstance.value.getPath,
              emits
            )
          ),
        ]);
        pathEventListeners.push([
          mvcPath,
          mvcPath.addListener(
            'set_at',
            updatePathOrPaths(
              'path_changed',
              polylineShapeInstance.value.getPath,
              emits
            )
          ),
        ]);
      }
    }
  },
  { deep: props.deepWatch, immediate: true }
);
/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onUnmounted(() => {
  if (polylineShapeInstance.value) {
    polylineShapeInstance.value.setMap(null);
  }
});

/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ polylineShapeInstance });
</script>
