<script>
import mapElementMixin from '../mixins/map-element';
import { circleMappedProps } from '../utils/mapped-props-by-map-element';
import { bindEvents, getPropsValues, bindProps } from '../utils/helpers';

export default {
  mixins: [mapElementMixin],
  props: {
    center: {
      type: Object,
      required: true,
    },
    radius: {
      type: Number,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
    },
  },
  render() {
    return '';
  },
  async provide() {
    // events to bind with toWay
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

    // Infowindow needs this to be immediately available
    this.$map = await this.$mapPromise;

    // Initialize the maps with the given options
    const initialOptions = {
      ...this.options,
      map: this.$map,
      ...getPropsValues(this, circleMappedProps),
    };
    const { options: extraOptions, ...finalOptions } = initialOptions;
    this.$circleObject = new google.maps.Circle(finalOptions);
    bindProps(this, this.$circleObject, circleMappedProps);
    bindEvents(this, this.$circleObject, events);

    this.$circlePromise = this.$circleObject;
    return { $circlePromise: this.$circleObject };
  },
  destroyed() {
    // Note: not all Google Maps components support maps
    if (this.$circleObject && this.$circleObject.setMap) {
      this.$circleObject.setMap(null);
    }
  },
};
</script>
