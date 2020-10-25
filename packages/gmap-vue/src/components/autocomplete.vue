<template>
  <span v-if="$scopedSlots['input']">
    <slot
      name="input"
      v-bind:attrs="$attrs"
      v-bind:listeners="$listeners"
      :ref="input"
    ></slot>
  </span>
  <input
    v-else-if="!$scopedSlots['input']"
    ref="input"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import {
  downArrowSimulator,
  getPropsValues,
  bindProps,
} from '../utils/helpers';
import { autocompleteMappedProps } from '../utils/mapped-props-by-map-element';

export default {
  props: {
    bounds: {
      type: Object,
    },
    componentRestrictions: {
      type: Object,
    },
    types: {
      type: Array,
      default() {
        return [];
      },
    },
    selectFirstOnEnter: {
      required: false,
      type: Boolean,
      default: false,
    },
    // the unique ref of the slot component
    slotRefName: {
      required: false,
      type: String,
      default: 'input',
    },
    // the name of the ref to obtain the input (if its a child  of component in the slot)
    childRefName: {
      required: false,
      type: String,
      default: 'input',
    },
    options: {
      type: Object,
    },
    fields: {
      required: false,
      type: Array,
      default: null,
    },
  },
  async mounted() {
    await this.$gmapApiPromiseLazy();

    let scopedInput = null;

    if (this.$scopedSlots.input) {
      scopedInput = this.$scopedSlots.input()[0].context.$refs[
        this.slotRefName
      ];

      if (scopedInput && scopedInput.$refs) {
        scopedInput = scopedInput.$refs[this.childRefName || 'input'];
      }

      if (scopedInput) {
        this.$refs.input = scopedInput;
      }
    }

    if (this.selectFirstOnEnter) {
      downArrowSimulator(this.$refs.input);
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
      this.$refs.input,
      autocompleteOptions
    );

    bindProps(this, this.$autocomplete, autocompleteMappedProps);

    // IMPORTANT: To avoid paying for data that you don't need,
    // be sure to use Autocomplete.setFields() to specify only the place data that you will use.
    if (this.fields) {
      this.$autocomplete.setFields(this.fields);
    }

    // Not using `bindEvents` because we also want
    // to return the result of `getPlace()`
    this.$autocomplete.addListener('place_changed', () => {
      this.$emit('place_changed', this.$autocomplete.getPlace());
    });
  },
  watch: {
    componentRestrictions(v) {
      if (v !== undefined) {
        this.$autocomplete.setComponentRestrictions(v);
      }
    },
  },
};
</script>
