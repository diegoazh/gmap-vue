<template>
  <div>
    <!--
				@slot Used to set your custom component for the input, eg: v-text-field.<br>
        It has two binding properties:<br>
        - `attrs`, it's type is `object`, it's all attributes passed to the component ([vm.$attrs](https://vuejs.org/v2/api/?#vm-attrs))<br>
        - `listeners`, it's type is `object`, it's all events passed to the component ([vm.$listeners](https://vuejs.org/v2/api/?#vm-listeners))
			-->
    <slot :attrs="$attrs">
      <input ref="input" v-bind="$attrs" />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import {
  bindProps,
  downArrowSimulator,
  getPropsValues,
} from '../composables/helpers';
import { autocompleteMappedProps } from '../props/mapped-props-by-map-element';
import type { AutocompleteHtmlInput } from '../types/gmap-vue.types';

export interface IAutocompleteData {
  $autocomplete: google.maps.places.Autocomplete | undefined;
}

/**
 * Autocomplete component
 * @displayName GmapAutocomplete
 * @see [source code](/guide/autocomplete.html#source-code)
 */
export default defineComponent({
  name: 'AutocompleteInput',
  props: {
    /**
     * Map bounds this is an LatLngBounds
     * object builded with
     * @value new google.maps.LatLngBounds(...)
     * @see [Map Bounds](https://developers.google.com/maps/documentation/javascript/places-autocomplete#set-the-bounds-on-creation-of-the-autocomplete-object)
     */
    bounds: {
      type: Object,
      default: undefined,
    },
    /**
     * Restrict the search to a specific country
     * @value `{[key: string]: string}`
     * @see [componentRestrictions](https://developers.google.com/maps/documentation/javascript/places-autocomplete#restrict-the-search-to-a-specific-country)
     */
    componentRestrictions: {
      type: Object,
      default: undefined,
    },
    /**
     * Map types this is an array of strings
     * @value string[]
     * @see [Map Bounds](https://developers.google.com/maps/documentation/javascript/places-autocomplete#set-the-bounds-on-creation-of-the-autocomplete-object)
     */
    types: {
      type: Array,
      default: undefined,
    },
    /**
     * Select the first result in the list when press enter keyboard
     * @values true, false
     */
    selectFirstOnEnter: {
      required: false,
      type: Boolean,
      default: false,
    },
    /**
     * the unique ref set to the component passed in the slot input
     */
    slotRef: {
      required: false,
      type: Object as PropType<HTMLInputElement>,
    },
    /**
     * Other options that you can pass to the Google Mapas
     * Autocomplete API
     * @values geocode, address, regions
     * @see [Options](https://developers.google.com/maps/documentation/javascript/places-autocomplete#add-autocomplete)
     */
    options: {
      type: Object,
      default: undefined,
    },
    /**
     * To avoid paying for data that you don't need,
     * be sure to use Autocomplete.setFields() to specify
     * only the place data that you will use.
     *
     * @see [Place information](https://developers.google.com/maps/documentation/javascript/places-autocomplete#get-place-information)
     * @see [setFields](https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete.setFields)
     * @see [PlaceResult](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult)
     */
    setFieldsTo: {
      required: false,
      type: Array as PropType<string[]>,
      default: null,
    },
  },
  data(): IAutocompleteData {
    return {
      $autocomplete: undefined,
    };
  },
  async mounted() {
    await this.$gmapApiPromiseLazy();

    let scopedInput = this.slotRef
      ? this.slotRef
      : (this.$refs.input as HTMLInputElement);

    if (this.selectFirstOnEnter) {
      downArrowSimulator(this.$refs.input as AutocompleteHtmlInput);
    }

    if (typeof google.maps.places.Autocomplete !== 'function') {
      throw new Error(
        "google.maps.places.Autocomplete is undefined. Did you add 'places' to libraries when loading Google Maps?"
      );
    }

    const autocompleteOptions = {
      ...getPropsValues(this, autocompleteMappedProps),
      ...this.options,
    };

    this.$autocomplete = new google.maps.places.Autocomplete(
      scopedInput,
      autocompleteOptions
    );

    bindProps(this, this.$autocomplete, autocompleteMappedProps);

    if (this.setFieldsTo) {
      this.$autocomplete.setFields(this.setFieldsTo);
    }

    // Not using `bindEvents` because we also want
    // to return the result of `getPlace()`
    this.$autocomplete.addListener('place_changed', () => {
      if (this.$autocomplete) {
        /**
         * Place change event
         * @event place_changed
         * @property {object} place `this.$autocomplete.getPlace()`
         * @see [Get place information](https://developers.google.com/maps/documentation/javascript/places-autocomplete#get-place-information)
         */
        this.$emit('place_changed', this.$autocomplete.getPlace());
      }
    });
  },
  unmounted() {
    // Note: not all Google Maps components support maps
    // TODO: with typescript we can know which objects have setMap method, maybe this is not necessary anymore
    if (this.$autocomplete && (this.$autocomplete as any)?.setMap) {
      (this.$autocomplete as any)?.setMap(null);
    }
  },
  watch: {
    /**
     * This watcher is incharge to update
     * the component restrictions when is
     * changed from the parent
     */
    componentRestrictions(v) {
      if (v !== undefined) {
        if (this.$autocomplete) {
          this.$autocomplete.setComponentRestrictions(v);
        }
      }
    },
  },
});
</script>
