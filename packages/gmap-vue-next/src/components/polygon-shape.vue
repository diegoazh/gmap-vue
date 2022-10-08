<script lang="ts" setup>
import { inject, onUnmounted, provide, ref, watch } from 'vue';
import { $mapPromise, $polygonShapePromise } from '@/keys/gmap-vue.keys';
import {
  getComponentEventsConfig,
  getComponentPropsConfig,
} from '@/composables/plugin-component-config';
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getPropsValuesWithoutOptionsProp,
} from '@/composables/helpers';

/**
 * Polygon component
 * @displayName GmvPolygon
 * @see [source code](/guide/polygon.html#source-code)
 * @see [official docs](https://developers.google.com/maps/documentation/javascript/examples/polygon-arrays?hl=es)
 * @see [official reference](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#Polygon)
 */

/*******************************************************************************
 * INTERFACES
 ******************************************************************************/
/**
 * Polygon Shape Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.clickable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.draggable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.editable
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.fillColor
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.fillOpacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.geodesic
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.paths
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.strokeColor
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.strokeOpacity
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.strokePosition
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.strokeWeight
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.visible
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.zIndex
 */
interface IPolygonShapeVueComponentProps {
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  geodesic?: boolean;
  path?:
    | google.maps.MVCArray<google.maps.LatLng>
    | Array<google.maps.LatLng | google.maps.LatLngLiteral>;
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
}

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(defineProps<IPolygonShapeVueComponentProps>(), {
  clickable: true,
  draggable: false,
  editable: false,
  geodesic: false,
  strokePosition: google.maps.StrokePosition.CENTER,
  visible: true,
  deepWatch: false,
});

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits(getComponentEventsConfig('GmvPolygon'));

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);
/*******************************************************************************
 * POLYGON SHAPE
 ******************************************************************************/
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

    const {
      path: pathProp,
      paths: pathsProp,
      ...finalOptions
    } = polygonShapeOptions;

    polygonShapeInstance.value = new google.maps.Polygon(finalOptions);

    const polygonShapePropsConfig = getComponentPropsConfig('GmvPolygon');
    const polygonShapeEventsConfig = getComponentEventsConfig(
      'GmvPolygon',
      'auto'
    );

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      polygonShapeInstance.value,
      props,
      polygonShapePropsConfig,
      emits
    );
    bindGoogleMapsEventsToVueEventsOnSetup(
      polygonShapeEventsConfig,
      polygonShapeInstance.value,
      emits
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
 * FUNCTIONS
 ******************************************************************************/
function clearEvents(
  eventListeners: [
    (
      | google.maps.MVCArray<google.maps.LatLng>
      | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
    ),
    google.maps.MapsEventListener
  ][]
) {
  eventListeners.forEach(([, listenerHandle]) => {
    google.maps.event.removeListener(listenerHandle);
  });
}

function updatePathOrPaths<
  T extends 'paths_changed' | 'path_changed',
  U extends
    | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
    | google.maps.MVCArray<google.maps.LatLng> = T extends 'paths_changed'
    ? google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
    : google.maps.MVCArray<google.maps.LatLng>
>(eventName: T, fn: () => U): () => void {
  /**
   * An event to detect when a paths change
   * @property {array} paths `this.$polygonObject.getPaths()` |
   */
  return () => emits(eventName, fn());
}

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
const pathEventListeners: [
  google.maps.MVCArray<google.maps.LatLng>,
  google.maps.MapsEventListener
][] = [];

watch(
  () => props.paths,
  (newValue, oldValue) => {
    if (!polygonShapeInstance.value) {
      throw new Error('the polygon instance was not created');
    }

    if (props.paths && newValue && newValue !== oldValue) {
      clearEvents(pathsEventListeners);

      polygonShapeInstance.value.setPaths(props.paths);

      const mvcArray = polygonShapeInstance.value.getPaths();

      for (let i = 0; i < mvcArray.getLength(); i += 1) {
        const mvcPath = mvcArray.getAt(i);
        pathsEventListeners.push([
          mvcPath,
          mvcPath.addListener(
            'insert_at',
            updatePathOrPaths(
              'paths_changed',
              polygonShapeInstance.value.getPaths
            )
          ),
        ]);
        pathsEventListeners.push([
          mvcPath,
          mvcPath.addListener(
            'remove_at',
            updatePathOrPaths(
              'paths_changed',
              polygonShapeInstance.value.getPaths
            )
          ),
        ]);
        pathsEventListeners.push([
          mvcPath,
          mvcPath.addListener(
            'set_at',
            updatePathOrPaths(
              'paths_changed',
              polygonShapeInstance.value.getPaths
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
            polygonShapeInstance.value.getPaths
          )
        ),
      ]);
      pathsEventListeners.push([
        mvcArray,
        mvcArray.addListener(
          'remove_at',
          updatePathOrPaths(
            'paths_changed',
            polygonShapeInstance.value.getPaths
          )
        ),
      ]);
      pathsEventListeners.push([
        mvcArray,
        mvcArray.addListener(
          'set_at',
          updatePathOrPaths(
            'paths_changed',
            polygonShapeInstance.value.getPaths
          )
        ),
      ]);
    }
  },
  {
    deep: props.deepWatch,
    immediate: true,
  }
);

watch(
  () => props.path,
  (newValue, oldValue) => {
    if (!polygonShapeInstance.value) {
      throw new Error('the polygon instance was not created');
    }

    if (props.path && newValue && newValue !== oldValue) {
      clearEvents(pathEventListeners);

      polygonShapeInstance.value.setPaths(props.path);

      const mvcPath = polygonShapeInstance.value.getPath();

      pathEventListeners.push([
        mvcPath,
        mvcPath.addListener(
          'insert_at',
          updatePathOrPaths('path_changed', polygonShapeInstance.value.getPath)
        ),
      ]);
      pathEventListeners.push([
        mvcPath,
        mvcPath.addListener(
          'remove_at',
          updatePathOrPaths('path_changed', polygonShapeInstance.value.getPath)
        ),
      ]);
      pathEventListeners.push([
        mvcPath,
        mvcPath.addListener(
          'set_at',
          updatePathOrPaths('path_changed', polygonShapeInstance.value.getPath)
        ),
      ]);
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
</script>
