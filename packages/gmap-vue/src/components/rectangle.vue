<script>
import MapElementMixin from '../mixins/map-element';
import { bindProps, bindEvents, getPropsValues } from '../utils/helpers';
import { rectangleMappedProps } from '../utils/mapped-props-by-map-element';

/**
 * Rectangle component
 * @displayName GmapRectangle
 * @see [source code](/guide/rectangle.html#source-code)
 * @see [official docs](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#Rectangle)
 */
export default {
  mixins: [MapElementMixin],
  provide() {
    const events = [
      'click',
      'dblclick',
      'drag',
      'dragend',
      'dragstart',
      'mousedown',
      'mousemove',
      'mouseout',
      'mouseover',
      'mouseup',
      'rightclick',
    ];

    const promise = this.$mapPromise
      .then((map) => {
        this.$map = map;

        // Initialize the maps with the given options
        const initialOptions = {
          ...this.options,
          map,
          ...getPropsValues(this, rectangleMappedProps),
        };
        const { options: extraOptions, ...finalOptions } = initialOptions;

        this.$rectangleObject = new google.maps.Rectangle(finalOptions);

        bindProps(this, this.$circleObject, rectangleMappedProps);
        bindEvents(this, this.$circleObject, events);

        return this.$rectangleObject;
      })
      .catch((error) => {
        throw error;
      });

    this.$rectanglePromise = promise;
    return { $rectanglePromise: promise };
  },
  props: {
    /**
     * The bounds.
     * @value object
     * @type LatLngBounds|LatLngBoundsLiteral
     * @see [Rectangle bounds](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.bounds)
     */
    bounds: {
      type: Object,
    },
    /**
     * If set to true, the user can drag this rectangle over the map. Defaults to false.
     * @value boolean
     * @see [Rectangle draggable](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.draggable)
     */
    draggable: {
      type: Boolean,
      default: false,
    },
    /**
     * If set to true, the user can edit this rectangle by dragging the control points shown at the corners and on each edge. Defaults to false.
     * @value boolean
     * @see [Rectangle editable](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#RectangleOptions.editable)
     */
    editable: {
      type: Boolean,
      default: false,
    },
    /**
     * More options that you can pass to the component
     * @value boolean
     */
    options: {
      type: Object,
    },
  },
};
</script>
