<script lang="ts" setup>
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getComponentEventsConfig,
  getComponentPropsConfig,
  getPropsValuesWithoutOptionsProp,
  usePluginOptions,
  useShapesHelpers,
} from '@/composables';
import type { IPolygonShapeVueComponentProps } from '@/interfaces';
import { $mapPromise, $polygonShapePromise } from '@/keys';
import { inject, onUnmounted, provide, ref, watch } from 'vue';

/**
 * Polygon component
 * @displayName GmvPolygon
 * @see [source code](/guide/polygon.html#source-code)
 * @see [official docs](https://developers.google.com/maps/documentation/javascript/examples/polygon-arrays?hl=es)
 * @see [official reference](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#Polygon)
 */

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(
  defineProps<{
    clickable?: boolean;
    draggable?: boolean;
    editable?: boolean;
    fillColor?: string;
    fillOpacity?: number;
    geodesic?: boolean;
    paths?:
      | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
      | google.maps.MVCArray<google.maps.LatLng>
      | Array<Array<google.maps.LatLng | google.maps.LatLngLiteral>>
      | Array<google.maps.LatLng | google.maps.LatLngLiteral>;
    strokeColor?: string;
    strokeOpacity?: number;
    strokePosition?: google.maps.StrokePosition;
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
    strokePosition: globalThis?.google?.maps?.StrokePosition?.CENTER || 0.0,
    visible: true,
    deepWatch: false,
  }
);

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits(getComponentEventsConfig('GmvPolygon'));

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);

if (!mapPromise) {
  throw new Error('The map promise was not built');
}

/*******************************************************************************
 * POLYGON SHAPE
 ******************************************************************************/
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
const polygonShapeInstance = ref<google.maps.Polygon | undefined>();
const promise = mapPromise
  ?.then((mapInstance) => {
    if (!mapInstance) {
      throw new Error('the map instance was not created');
    }

    const polygonShapeOptions: IPolygonShapeVueComponentProps & {
      map: google.maps.Map;
      [key: string]: any;
    } = {
      map: mapInstance,
      ...getPropsValuesWithoutOptionsProp(props),
      ...props.options,
    };

    polygonShapeInstance.value = new google.maps.Polygon(polygonShapeOptions);

    const polygonShapePropsConfig = getComponentPropsConfig('GmvPolygon');
    const polygonShapeEventsConfig = getComponentEventsConfig(
      'GmvPolygon',
      'auto'
    );

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      polygonShapePropsConfig,
      polygonShapeInstance.value,
      emits,
      props
    );
    bindGoogleMapsEventsToVueEventsOnSetup(
      polygonShapeEventsConfig,
      polygonShapeInstance.value,
      emits,
      excludedEvents
    );

    return polygonShapeInstance.value;
  })
  .catch((error) => {
    throw error;
  });

provide($polygonShapePromise, promise);

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
const pathsEventListeners: [
  (
    | google.maps.MVCArray<google.maps.LatLng>
    | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
  ),
  google.maps.MapsEventListener
][] = [];

watch(
  () => props.paths,
  (newValue, oldValue) => {
    if (polygonShapeInstance.value) {
      if (props.paths && newValue && newValue !== oldValue) {
        clearEvents(pathsEventListeners);

        polygonShapeInstance.value.setPaths(newValue);

        const mvcArray = polygonShapeInstance.value.getPaths();

        for (let i = 0; i < mvcArray.getLength(); i += 1) {
          const mvcPath = mvcArray.getAt(i);
          pathsEventListeners.push([
            mvcPath,
            mvcPath.addListener(
              'insert_at',
              updatePathOrPaths(
                'paths_changed',
                polygonShapeInstance.value.getPaths,
                emits
              )
            ),
          ]);
          pathsEventListeners.push([
            mvcPath,
            mvcPath.addListener(
              'remove_at',
              updatePathOrPaths(
                'paths_changed',
                polygonShapeInstance.value.getPaths,
                emits
              )
            ),
          ]);
          pathsEventListeners.push([
            mvcPath,
            mvcPath.addListener(
              'set_at',
              updatePathOrPaths(
                'paths_changed',
                polygonShapeInstance.value.getPaths,
                emits
              )
            ),
          ]);
        }

        pathsEventListeners.push([
          mvcArray,
          mvcArray.addListener(
            'insert_at',
            updatePathOrPaths(
              'paths_changed',
              polygonShapeInstance.value.getPaths,
              emits
            )
          ),
        ]);
        pathsEventListeners.push([
          mvcArray,
          mvcArray.addListener(
            'remove_at',
            updatePathOrPaths(
              'paths_changed',
              polygonShapeInstance.value.getPaths,
              emits
            )
          ),
        ]);
        pathsEventListeners.push([
          mvcArray,
          mvcArray.addListener(
            'set_at',
            updatePathOrPaths(
              'paths_changed',
              polygonShapeInstance.value.getPaths,
              emits
            )
          ),
        ]);
      }
    }
  },
  {
    deep: props.deepWatch,
    immediate: true,
  }
);

/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onUnmounted(() => {
  if (polygonShapeInstance.value) {
    polygonShapeInstance.value.setMap(null);
  }
});

/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ polygonShapeInstance });
</script>
