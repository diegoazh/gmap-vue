<template>
  <div>
    <slot :setDrawingMode="setDrawingMode" :deleteSelection="deleteSelection" />
  </div>
</template>

<script>
import MapElementMixin from '../mixins/map-element';
import { drawingManagerMappedProps } from '../utils/mapped-props-by-map-element';
import { bindProps, getPropsValues } from '../utils/helpers';

export default {
  mixins: [MapElementMixin],
  props: {
    circleOptions: {
      type: Object,
    },
    markerOptions: {
      type: Object,
    },
    polygonOptions: {
      type: Object,
    },
    polylineOptions: {
      type: Object,
    },
    rectangleOptions: {
      type: Object,
    },
    position: {
      type: String,
    },
    shapes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedShape: null,
      drawingModes: [],
      options: {
        drawingMode: null,
        drawingControl: true,
        drawingControlOptions: {},
      },
    };
  },
  async provide() {
    // Infowindow needs this to be immediately available
    this.$map = await this.$mapPromise;

    // Initialize the maps with the given options
    const initialOptions = {
      // TODO: analyze the below line because I think it can be removed
      ...this.options,
      map: this.$map,
      ...getPropsValues(this, drawingManagerMappedProps),
    };

    const { options: extraOptions, ...finalOptions } = initialOptions;

    this.drawingModes = Object.keys(finalOptions).reduce((modes, opt) => {
      const val = opt.split('Options');

      if (val.length > 1) {
        modes.push(val[0]);
      }

      return modes;
    }, []);

    const position =
      this.position && google.maps.ControlPosition[this.position]
        ? google.maps.ControlPosition[this.position]
        : google.maps.ControlPosition.TOP_LEFT;

    finalOptions.drawingMode = null;
    finalOptions.drawingControl = !this.$scopedSlots.default;
    finalOptions.drawingControlOptions = {
      drawingModes: this.drawingModes,
      position,
    };

    // https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
    this.$drawingManagerObject = new google.maps.drawing.DrawingManager(
      finalOptions
    );

    bindProps(this, this.$drawingManagerObject, drawingManagerMappedProps);

    this.$drawingManagerObject.addListener('overlaycomplete', (e) =>
      this.addShape(e)
    );

    this.$map.addListener('click', this.clearSelection);

    if (this.shapes.length) {
      this.drawAll();
    }

    // TODO: analyze the efects of only returns the instance and remove completely the promise
    this.$drawingManagerPromise = this.$drawingManagerObject;
    return { $drawingManagerPromise: this.$drawingManagerObject };
  },
  methods: {
    setDrawingMode(mode) {
      this.$drawingManagerObject.setDrawingMode(mode);
    },
    drawAll() {
      const shapeType = {
        circle: google.maps.Circle,
        marker: google.maps.Marker,
        polygon: google.maps.Polygon,
        polyline: google.maps.Polyline,
        rectangle: google.maps.Rectangle,
      };

      const self = this;
      this.shapes.forEach((shape) => {
        const shapeDrawing = new shapeType[shape.type](shape.overlay);
        shapeDrawing.setMap(this.$map);
        shape.overlay = shapeDrawing;
        google.maps.event.addListener(shapeDrawing, 'click', () => {
          self.setSelection(shape);
        });
      });
    },
    clearAll() {
      this.clearSelection();
      this.shapes.forEach((shape) => {
        shape.overlay.setMap(null);
      });
    },
    clearSelection() {
      if (this.selectedShape) {
        this.selectedShape.overlay.set('fillColor', '#777');
        this.selectedShape.overlay.set('strokeColor', '#999');
        this.selectedShape.overlay.setEditable(false);
        this.selectedShape.overlay.setDraggable(false);
        this.selectedShape = null;
      }
    },
    setSelection(shape) {
      this.clearSelection();
      this.selectedShape = shape;
      shape.overlay.setEditable(true);
      shape.overlay.setDraggable(true);
      this.selectedShape.overlay.set('fillColor', '#555');
      this.selectedShape.overlay.set('strokeColor', '#777');
    },
    deleteSelection() {
      if (this.selectedShape) {
        this.selectedShape.overlay.setMap(null);
        const index = this.shapes.indexOf(this.selectedShape);
        if (index > -1) {
          this.shapes.splice(index, 1);
        }
      }
    },
    addShape(shape) {
      this.setDrawingMode(null);
      this.shapes.push(shape);
      const self = this;
      google.maps.event.addListener(shape.overlay, 'click', () => {
        self.setSelection(shape);
      });
      google.maps.event.addListener(shape.overlay, 'rightclick', () => {
        self.deleteSelection()
      });
      this.setSelection(shape);
    },
  },
  watch: {
    position(position) {
      if (this.$drawingManagerObject) {
        const drawingControlOptions = {
          position:
            position && google.maps.ControlPosition[position]
              ? google.maps.ControlPosition[position]
              : google.maps.ControlPosition.TOP_LEFT,
          drawingModes: this.drawingModes,
        };
        this.$drawingManagerObject.setOptions({ drawingControlOptions });
      }
    },
    circleOptions(circleOptions) {
      if (this.$drawingManagerObject) {
        this.$drawingManagerObject.setOptions({ circleOptions });
      }
    },
    markerOptions(markerOptions) {
      if (this.$drawingManagerObject) {
        this.$drawingManagerObject.setOptions({ markerOptions });
      }
    },
    polygonOptions(polygonOptions) {
      if (this.$drawingManagerObject) {
        this.$drawingManagerObject.setOptions({ polygonOptions });
      }
    },
    polylineOptions(polylineOptions) {
      if (this.$drawingManagerObject) {
        this.$drawingManagerObject.setOptions({ polylineOptions });
      }
    },
    rectangleOptions(rectangleOptions) {
      if (this.$drawingManagerObject) {
        this.$drawingManagerObject.setOptions({ rectangleOptions });
      }
    },
  },
  destroyed() {
    this.clearAll();

    // Note: not all Google Maps components support maps
    if (this.$drawingManagerObject && this.$drawingManagerObject.setMap) {
      this.$drawingManagerObject.setMap(null);
    }
  },
};
</script>
