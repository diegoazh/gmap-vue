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
  name: 'RectangleShape',
  mixins: [MapElementMixin],
  render() {
    return '';
  },
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

    const $rectanglePromise = this.$mapPromise
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

        bindProps(this, this.$rectangleObject, rectangleMappedProps);
        bindEvents(this, this.$rectangleObject, events);

        return this.$rectangleObject;
      })
      .catch((error) => {
        throw error;
      });

    this.$rectanglePromise = $rectanglePromise;
    return { $rectanglePromise };
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
      default: undefined,
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
      default: undefined,
    },
  },
  destroyed() {
    // Note: not all Google Maps components support maps
    if (this.$rectangleObject && this.$rectangleObject.setMap) {
      this.$rectangleObject.setMap(null);
    }
  },
};
</script>
