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
  useShapesHelpers,
} from '@/composables';
import type { IPolygonShapeVueComponentProps } from '@/interfaces';
import { $polygonShapePromise } from '@/keys';
import { inject, onUnmounted, provide, watch } from 'vue';

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
    polygonKey?: string;
    mapKey?: string;
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
  },
);

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits<{
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
  paths_changed: [
    value: google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>,
  ];
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
const polygonPromiseDeferred = usePromiseDeferred(
  props.polygonKey || $polygonShapePromise,
);
const promise = usePromise(props.polygonKey || $polygonShapePromise);
provide(props.polygonKey || $polygonShapePromise, promise);

/*******************************************************************************
 * POLYGON SHAPE
 ******************************************************************************/
defineOptions({ name: 'polygon-shape' });
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
mapPromise
  ?.then(async (mapInstance) => {
    if (!mapInstance) {
      throw new Error('the map instance is not defined');
    }

    const polygonShapeOptions: IPolygonShapeVueComponentProps & {
      map: google.maps.Map;
      [key: string]: any;
    } = {
      map: mapInstance,
      ...getPropsValuesWithoutOptionsProp(props),
      ...props.options,
    };

    const { Polygon } = (await google.maps.importLibrary(
      'maps',
    )) as google.maps.MapsLibrary;
    const polygonShape = new Polygon(polygonShapeOptions);

    const polygonShapePropsConfig = getComponentPropsConfig('GmvPolygon');
    const polygonShapeEventsConfig = getComponentEventsConfig(
      'GmvPolygon',
      'auto',
    );

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      polygonShapePropsConfig,
      polygonShape,
      emits as any,
      props,
    );
    bindGoogleMapsEventsToVueEventsOnSetup(
      polygonShapeEventsConfig,
      polygonShape,
      emits as any,
      excludedEvents,
    );

    if (!polygonPromiseDeferred.resolve) {
      throw new Error('polygonPromiseDeferred.resolve is undefined');
    }

    polygonPromiseDeferred.resolve(polygonShape);
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
const { clearEvents, updatePathOrPaths } = useShapesHelpers();

/*******************************************************************************
 * WATCHERS
 ******************************************************************************/
const pathsEventListeners: [
  (
    | google.maps.MVCArray<google.maps.LatLng>
    | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
  ),
  google.maps.MapsEventListener,
][] = [];

watch(
  () => props.paths,
  async (newValue, oldValue) => {
    const polygonShape = await promise;

    if (!polygonShape) {
      return console.error('polygon was not defined');
    }

    if (props.paths && newValue && newValue !== oldValue) {
      clearEvents(pathsEventListeners);

      polygonShape.setPaths(newValue);

      const mvcArray = polygonShape.getPaths();
      const getPathsFn = () => polygonShape.getPaths();

      for (let i = 0; i < mvcArray.getLength(); i += 1) {
        const mvcPath = mvcArray.getAt(i);
        pathsEventListeners.push([
          mvcPath,
          mvcPath.addListener(
            'insert_at',
            updatePathOrPaths('paths_changed', getPathsFn, emits),
          ),
        ]);
        pathsEventListeners.push([
          mvcPath,
          mvcPath.addListener(
            'remove_at',
            updatePathOrPaths('paths_changed', getPathsFn, emits),
          ),
        ]);
        pathsEventListeners.push([
          mvcPath,
          mvcPath.addListener(
            'set_at',
            updatePathOrPaths('paths_changed', getPathsFn, emits),
          ),
        ]);
      }

      pathsEventListeners.push([
        mvcArray,
        mvcArray.addListener(
          'insert_at',
          updatePathOrPaths('paths_changed', getPathsFn, emits),
        ),
      ]);
      pathsEventListeners.push([
        mvcArray,
        mvcArray.addListener(
          'remove_at',
          updatePathOrPaths('paths_changed', getPathsFn, emits),
        ),
      ]);
      pathsEventListeners.push([
        mvcArray,
        mvcArray.addListener(
          'set_at',
          updatePathOrPaths('paths_changed', getPathsFn, emits),
        ),
      ]);
    }
  },
  {
    deep: props.deepWatch,
    immediate: true,
  },
);

/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onUnmounted(async () => {
  const polygonShape = await promise;

  if (polygonShape) {
    polygonShape.setMap(null);
  }

  useDestroyPromisesOnUnmounted(props.polygonKey || $polygonShapePromise);
});

/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ polygonShapePromise: promise });
</script>
