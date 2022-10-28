<template>
  <div>
    <!-- @slot Used to set your drawing manager -->
    <slot
      :delete-selection="deleteSelection"
      :set-drawing-mode="setDrawingMode"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  inject,
  onUnmounted,
  provide,
  ref,
  useSlots,
  watch,
} from 'vue';
import {
  getComponentEventsConfig,
  getComponentPropsConfig,
} from '@/composables/plugin-component-config';
import { $drawingManagerPromise, $mapPromise } from '@/keys/gmap-vue.keys';
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  getPropsValuesWithoutOptionsProp,
} from '@/composables/helpers';
import { usePluginOptions } from '@/composables/promise-lazy-builder';

/**
 * DrawingManager component
 * @displayName GmvDrawingManager
 * @see [source code](/guide/drawing-manager.html#source-code)
 * @see [Official documentation](https://developers.google.com/maps/documentation/javascript/drawinglayer)
 * @see [Official reference](https://developers.google.com/maps/documentation/javascript/reference/drawing)
 */

/*******************************************************************************
 * INTERFACES
 ******************************************************************************/
/**
 * Drawing manager Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.circleOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.drawingControl
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.drawingControlOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.drawingMode
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.markerOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.polygonOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.polylineOptions
 * @see https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions.rectangleOptions
 */
interface IDrawingManagerVueComponentProps {
  circleOptions?: google.maps.CircleOptions;
  drawingControl?: boolean;
  drawingControlOptions?: google.maps.drawing.DrawingControlOptions;
  drawingMode?: google.maps.drawing.OverlayType | null;
  markerOptions?: google.maps.MarkerOptions;
  polygonOptions?: google.maps.PolygonOptions;
  polylineOptions?: google.maps.PolylineOptions;
  rectangleOptions?: google.maps.RectangleOptions;
  position?:
    | 'TOP_CENTER'
    | 'TOP_LEFT'
    | 'TOP_RIGHT'
    | 'LEFT_TOP'
    | 'RIGHT_TOP'
    | 'LEFT_CENTER'
    | 'RIGHT_CENTER'
    | 'LEFT_BOTTOM'
    | 'RIGHT_BOTTOM'
    | 'BOTTOM_CENTER'
    | 'BOTTOM_LEFT'
    | 'BOTTOM_RIGHT';
  drawingModes?: google.maps.drawing.OverlayType[] | null;
  shapes?: google.maps.drawing.OverlayCompleteEvent[];
  options?: Record<string, unknown>;
}

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(defineProps<IDrawingManagerVueComponentProps>(), {
  drawingControl: true,
  drawingMode: null,
  // shapes: [] as any,
});

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const emits = defineEmits(getComponentEventsConfig('GmvDrawingManager'));
const $slots = useSlots();

/*******************************************************************************
 * INJECT
 ******************************************************************************/
const mapPromise = inject($mapPromise);

/*******************************************************************************
 * DRAWING MANAGER
 ******************************************************************************/
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
const drawingManagerInstance = ref<
  google.maps.drawing.DrawingManager | undefined
>();
const map = ref<google.maps.Map | undefined>();
const selectedShape = ref<
  google.maps.drawing.OverlayCompleteEvent | undefined
>();
const promise = mapPromise
  ?.then((mapInstance) => {
    if (!mapInstance) {
      throw new Error('the map instance was not created');
    }

    map.value = mapInstance;

    const defaultDrawingControlOptions = {
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.POLYLINE,
        google.maps.drawing.OverlayType.RECTANGLE,
      ],
      position: google.maps.ControlPosition.TOP_CENTER,
    };

    const drawingManagerOptions: IDrawingManagerVueComponentProps & {
      map: google.maps.Map;
      [key: string]: unknown;
    } = {
      map: mapInstance,
      ...getPropsValuesWithoutOptionsProp(props),
      ...props.options,
    };

    drawingManagerInstance.value = new google.maps.drawing.DrawingManager({
      ...drawingManagerOptions,
      drawingControlOptions: {
        ...defaultDrawingControlOptions,
        ...drawingManagerOptions.drawingControlOptions,
      },
      drawingControl: !$slots.default,
    });

    const drawingManagerPropsConfig =
      getComponentPropsConfig('GmvDrawingManager');
    const drawingManagerEventsConfig = getComponentEventsConfig(
      'GmvDrawingManager',
      'auto'
    );

    bindPropsWithGoogleMapsSettersAndGettersOnSetup(
      drawingManagerPropsConfig,
      drawingManagerInstance.value,
      emits,
      props
    );
    bindGoogleMapsEventsToVueEventsOnSetup(
      drawingManagerEventsConfig,
      drawingManagerInstance.value,
      emits,
      excludedEvents
    );

    drawingManagerInstance.value.addListener(
      'overlaycomplete',
      (event: google.maps.drawing.OverlayCompleteEvent) => addShape(event)
    );

    // TODO: check this event if it is needed or is the expected or best behaviour for all common cases
    mapInstance.addListener('click', clearSelection);

    if (props.shapes?.length) {
      drawAll();
    }

    return drawingManagerInstance.value;
  })
  .catch((error) => {
    throw error;
  });

provide($drawingManagerPromise, promise);

/*******************************************************************************
 * COMPUTED
 ******************************************************************************/
const evaluatedPosition = computed(() => {
  switch (props.position) {
    case 'TOP_CENTER':
      return google.maps.ControlPosition.TOP_CENTER;
    case 'TOP_LEFT':
      return google.maps.ControlPosition.TOP_LEFT;
    case 'TOP_RIGHT':
      return google.maps.ControlPosition.TOP_RIGHT;
    case 'BOTTOM_CENTER':
      return google.maps.ControlPosition.BOTTOM_CENTER;
    case 'BOTTOM_LEFT':
      return google.maps.ControlPosition.BOTTOM_LEFT;
    case 'BOTTOM_RIGHT':
      return google.maps.ControlPosition.BOTTOM_RIGHT;
    case 'LEFT_BOTTOM':
      return google.maps.ControlPosition.LEFT_BOTTOM;
    case 'LEFT_CENTER':
      return google.maps.ControlPosition.LEFT_CENTER;
    case 'LEFT_TOP':
      return google.maps.ControlPosition.LEFT_TOP;
    case 'RIGHT_BOTTOM':
      return google.maps.ControlPosition.RIGHT_BOTTOM;
    case 'RIGHT_CENTER':
      return google.maps.ControlPosition.RIGHT_CENTER;
    case 'RIGHT_TOP':
      return google.maps.ControlPosition.RIGHT_TOP;
    default:
      return google.maps.ControlPosition.TOP_CENTER;
  }
});

/*******************************************************************************
 * METHODS
 ******************************************************************************/
const drawAll = () => {
  props.shapes?.forEach((shape) => {
    if (shape.overlay) {
      if (!map.value) {
        throw new Error('the map instance was not created');
      }

      shape.overlay.setMap(map.value);
      google.maps.event.addListener(shape.overlay, 'click', () => {
        setSelection(shape);
      });
    }
  });
};

const clearSelection = () => {
  if (selectedShape.value && selectedShape.value.overlay) {
    selectedShape.value.overlay.set('fillColor', '#777');
    selectedShape.value.overlay.set('strokeColor', '#999');
    selectedShape.value.overlay.setOptions({ editable: false });
    selectedShape.value.overlay.setDraggable(false);
    selectedShape.value = undefined;
  }
};

const setSelection = (shape: google.maps.drawing.OverlayCompleteEvent) => {
  if (shape.overlay) {
    clearSelection();

    shape.overlay.setOptions({ editable: true });
    shape.overlay.setDraggable(true);
    selectedShape.value = shape;

    if (selectedShape.value && selectedShape.value.overlay) {
      selectedShape.value.overlay.set('fillColor', '#555');
      selectedShape.value.overlay.set('strokeColor', '#777');
    }
  }
};

const addShape = (shape: google.maps.drawing.OverlayCompleteEvent) => {
  setDrawingMode(null);
  emits('added:shape', shape);
  emits('update:shapes', [
    ...(props.shapes?.length ? props.shapes : []),
    shape,
  ]);

  if (shape.overlay) {
    google.maps.event.addListener(shape.overlay, 'click', () => {
      setSelection(shape);
    });
    google.maps.event.addListener(shape.overlay, 'rightclick', () => {
      deleteSelection();
    });

    setSelection(shape);
  }
};

/**
 * The setDrawingMode method is binded into the default component slot
 *
 * @method setDrawingMode
 * @param {string} mode - mode - Possible values 'marker', 'circle', 'polygon', 'polyline', 'rectangle', null
 * @returns {void}
 * @public
 */
const setDrawingMode = (mode: google.maps.drawing.OverlayType | null) => {
  drawingManagerInstance.value?.setDrawingMode(mode);
};

/**
 * The deleteSelection method is bound into the default component slot
 *
 * @method deleteSelection
 * @returns {void}
 * @public
 */
const deleteSelection = () => {
  if (selectedShape.value && selectedShape.value.overlay) {
    selectedShape.value.overlay.setMap(null);
    const index = props.shapes?.indexOf(selectedShape.value);
    if (index) {
      const oldShapes = [...(props.shapes?.length ? props.shapes : [])];
      const [shape] = oldShapes.splice(index, 1);
      emits('removed:shape', shape);
      emits('update:shapes', oldShapes);
    }
  }
};

/**
 * The clearAll method set map to null in all shapes inside shapes prop
 *
 * @method clearAll
 * @returns {void}
 * @public
 */
const clearAll = () => {
  clearSelection();

  props.shapes?.forEach((shape) => {
    if (shape.overlay) {
      shape.overlay.setMap(null);
    }
  });
};

/*******************************************************************************
 * WATCHERS
 ******************************************************************************/
watch(
  () => props.drawingControlOptions,
  (value, oldValue) => {
    if (drawingManagerInstance.value) {
      if (value && value !== oldValue) {
        drawingManagerInstance.value.setOptions({
          drawingControlOptions: { ...oldValue, ...value },
        });
      }
    }
  }
);

watch(
  () => props.position,
  (value, oldValue) => {
    if (drawingManagerInstance.value) {
      if (value && value !== oldValue) {
        drawingManagerInstance.value.setOptions({
          drawingControlOptions: { position: evaluatedPosition.value },
        });
      }
    }
  }
);

watch(
  () => props.drawingModes,
  (value, oldValue) => {
    if (drawingManagerInstance.value) {
      if (value && value !== oldValue) {
        drawingManagerInstance.value.setOptions({
          drawingControlOptions: { drawingModes: value },
        });
      }
    }
  }
);

watch(
  () => props.drawingControlOptions,
  (value) => {
    if (drawingManagerInstance.value && value) {
      drawingManagerInstance.value.setOptions({ drawingControlOptions: value });
    }
  }
);
watch(
  () => props.circleOptions,
  (value) => {
    if (drawingManagerInstance.value && value) {
      drawingManagerInstance.value.setOptions({ circleOptions: value });
    }
  }
);
watch(
  () => props.markerOptions,
  (value) => {
    if (drawingManagerInstance.value && value) {
      drawingManagerInstance.value.setOptions({ markerOptions: value });
    }
  }
);
watch(
  () => props.polygonOptions,
  (value) => {
    if (drawingManagerInstance.value && value) {
      drawingManagerInstance.value.setOptions({ polygonOptions: value });
    }
  }
);
watch(
  () => props.polylineOptions,
  (value) => {
    if (drawingManagerInstance.value && value) {
      drawingManagerInstance.value.setOptions({ polylineOptions: value });
    }
  }
);
watch(
  () => props.rectangleOptions,
  (value) => {
    if (drawingManagerInstance.value && value) {
      drawingManagerInstance.value.setOptions({ rectangleOptions: value });
    }
  }
);
/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onUnmounted(() => {
  if (drawingManagerInstance.value) {
    drawingManagerInstance.value.setMap(null);
  }
});

/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({
  setDrawingMode,
  deleteSelection,
  clearAll,
  drawingManagerInstance,
});
</script>
