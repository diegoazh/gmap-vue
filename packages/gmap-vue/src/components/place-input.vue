<template>
  <label>
    <span v-text="label"></span>
    <input
      ref="input"
      type="text"
      :placeholder="placeholder"
      :class="className"
    />
  </label>
</template>

<script>
import MapElementMixin from '../mixins/map-element';
import {
  bindProps,
  downArrowSimulator,
  getPropsValues,
} from '../utils/helpers';

/**
 * PlaceInput component
 * @deprecated
 * @displayName PlaceInput
 * @see [source code](/guide/place-input.html#source-code)
 * @see [Map Bounds](https://developers.google.com/maps/documentation/javascript/places-autocomplete#set-the-bounds-on-creation-of-the-autocomplete-object)
 */
export default {
  mixins: [MapElementMixin],
  props: {
    /**
     * Map bounds this is an LatLngBounds
     * object builded with
     * @value new google.maps.LatLngBounds(...)
     * @see [Map Bounds](https://developers.google.com/maps/documentation/javascript/places-autocomplete#set-the-bounds-on-creation-of-the-autocomplete-object)
     */
    bounds: {
      type: Object,
    },
    /**
     * A default value for the html input
     * @value string
     */
    defaultPlace: {
      type: String,
      default: '',
    },
    /**
     * Restrict the search to a specific country
     * @value `{[key: string]: string}`
     * @see [componentRestrictions](https://developers.google.com/maps/documentation/javascript/places-autocomplete#restrict-the-search-to-a-specific-country)
     */
    componentRestrictions: {
      type: Object,
      default: null,
    },
    /**
     * Map types this is an array of strings
     * @value string[]
     * @see [Map Bounds](https://developers.google.com/maps/documentation/javascript/places-autocomplete#set-the-bounds-on-creation-of-the-autocomplete-object)
     */
    types: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * A placeholder for the html input
     * @value string
     */
    placeholder: {
      required: false,
      type: String,
    },
    /**
     * A html class name for the html input
     * @value string
     */
    className: {
      required: false,
      type: String,
    },
    /**
     * A label for the html input
     * @value string
     */
    label: {
      required: false,
      type: String,
      default: null,
    },
    /**
     * If true the first element on the list will be selected
     * when you press enter in the html input.
     * @value boolean
     */
    selectFirstOnEnter: {
      require: false,
      type: Boolean,
      default: false,
    },
  },
  created() {
    window.console.warn(
      'The PlaceInput class is deprecated! Please consider using the Autocomplete input instead, it will be removed in the next major release of this plugin.'
    );
  },
  mounted() {
    const { input } = this.$refs;

    // Allow default place to be set
    input.value = this.defaultPlace;

    this.$watch('defaultPlace', () => {
      input.value = this.defaultPlace;
    });

    this.$gmapApiPromiseLazy().then(() => {
      const options = getPropsValues(this, this.props);

      if (this.selectFirstOnEnter) {
        downArrowSimulator(this.$refs.input);
      }

      if (typeof google.maps.places.Autocomplete !== 'function') {
        throw new Error(
          "google.maps.places.Autocomplete is undefined. Did you add 'places' to libraries when loading Google Maps?"
        );
      }

      this.autoCompleter = new google.maps.places.Autocomplete(
        this.$refs.input,
        options
      );

      const {
        placeholder,
        place,
        defaultPlace,
        className,
        label,
        selectFirstOnEnter,
        ...rest
      } = this.props;

      bindProps(this, this.autoCompleter, rest);

      this.autoCompleter.addListener('place_changed', () => {
        /**
         * Place change event
         * @event place_changed
         * @property {object} place `this.$autocomplete.getPlace()`
         * @see [Get place information](https://developers.google.com/maps/documentation/javascript/places-autocomplete#get-place-information)
         */
        this.$emit('place_changed', this.autoCompleter.getPlace());
      });
    });
  },
};
</script>
