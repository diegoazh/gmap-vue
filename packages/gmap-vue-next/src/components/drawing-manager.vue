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
import { inject, onUnmounted, provide, ref, useSlots, watch } from 'vue';
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

    const drawingManagerOptions = {
      map: mapInstance,
      ...getPropsValuesWithoutOptionsProp(props),
      ...props.options,
    };

    drawingManagerInstance.value = new google.maps.drawing.DrawingManager({
      ...drawingManagerOptions,
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
      emits
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

/*******************************************************************************
 * FUNCTIONS
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
    if (drawingManagerInstance.value && value && value !== oldValue) {
      drawingManagerInstance.value.setOptions({ drawingControlOptions: value });
    }
  }
);
watch(
  () => props.circleOptions,
  (value, oldValue) => {
    if (drawingManagerInstance.value && value && value !== oldValue) {
      drawingManagerInstance.value.setOptions({ circleOptions: value });
    }
  }
);
watch(
  () => props.markerOptions,
  (value, oldValue) => {
    if (drawingManagerInstance.value && value && value !== oldValue) {
      drawingManagerInstance.value.setOptions({ markerOptions: value });
    }
  }
);
watch(
  () => props.polygonOptions,
  (value, oldValue) => {
    if (drawingManagerInstance.value && value && value !== oldValue) {
      drawingManagerInstance.value.setOptions({ polygonOptions: value });
    }
  }
);
watch(
  () => props.polylineOptions,
  (value, oldValue) => {
    if (drawingManagerInstance.value && value && value !== oldValue) {
      drawingManagerInstance.value.setOptions({ polylineOptions: value });
    }
  }
);
watch(
  () => props.rectangleOptions,
  (value, oldValue) => {
    if (drawingManagerInstance.value && value && value !== oldValue) {
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
defineExpose({ setDrawingMode, deleteSelection, clearAll });
</script>
