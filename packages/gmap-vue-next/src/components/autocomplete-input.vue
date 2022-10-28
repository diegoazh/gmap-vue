<template>
  <div>
    <!--
				@slot Used to set your custom component for the input, eg: v-text-field.<br>
        It has two binding properties:<br>
        - `attrs`, it's type is `object`, it's all attributes passed to the component ([vm.$attrs](https://vuejs.org/v2/api/?#vm-attrs))<br>
        - `listeners`, it's type is `object`, it's all events passed to the component ([vm.$listeners](https://vuejs.org/v2/api/?#vm-listeners))
			-->
    <slot :attrs="$attrs">
      <input ref="gmvAutoCompleteInput" v-bind="$attrs" />
    </slot>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import {
  useGoogleMapsApiPromiseLazy,
  usePluginOptions,
} from '@/composables/promise-lazy-builder';
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  downArrowSimulator,
  getPropsValuesWithoutOptionsProp,
} from '@/composables/helpers';
import {
  getComponentEventsConfig,
  getComponentPropsConfig,
} from '@/composables/plugin-component-config';

/**
 * Autocomplete component
 * @displayName GmvAutocomplete
 * @see [source code](/guide/autocomplete.html#source-code)
 */

/*******************************************************************************
 * INTERFACES
 ******************************************************************************/
/**
 * Autocomplete input Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions.bounds
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions.componentRestrictions
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions.fields
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions.strictBounds
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions.types
 */
interface IAutoCompleteInputVueComponentProps {
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  componentRestrictions?: google.maps.places.ComponentRestrictions;
  fields?: string[];
  strictBounds?: boolean;
  types?: string[];
  /**
   * Select the first result in the list when press enter keyboard
   * @values true, false
   */
  selectFirstOnEnter?: boolean;
  /**
   * the unique ref set to the component passed in the slot input
   */
  slotRef?: HTMLInputElement;
  /**
   * To avoid paying for data that you don't need,
   * be sure to use Autocomplete.setFields() to specify
   * only the place data that you will use.
   *
   * @see [Place information](https://developers.google.com/maps/documentation/javascript/places-autocomplete#get-place-information)
   * @see [setFields](https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete.setFields)
   * @see [PlaceResult](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult)
   */
  setFieldsTo?: string[];
  options?: Record<string, unknown>;
}

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(defineProps<IAutoCompleteInputVueComponentProps>(), {
  selectFirstOnEnter: true,
});

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const gmvAutoCompleteInput = ref<HTMLInputElement | null>(null);
const emits = defineEmits(getComponentEventsConfig('GmvAutocomplete'));

/*******************************************************************************
 * INJECT
 ******************************************************************************/

/*******************************************************************************
 * AUTOCOMPLETE
 ******************************************************************************/
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
const autoCompleteInstance = ref<google.maps.places.Autocomplete | undefined>();

/*******************************************************************************
 * COMPUTED
 ******************************************************************************/

/*******************************************************************************
 * METHODS
 ******************************************************************************/

/*******************************************************************************
 * WATCHERS
 ******************************************************************************/
watch(
  () => props.componentRestrictions,
  (newValue, oldValue) => {
    if (newValue && newValue !== oldValue) {
      autoCompleteInstance.value?.setComponentRestrictions(newValue);
    }
  }
);

/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onMounted(() => {
  useGoogleMapsApiPromiseLazy()
    .then(() => {
      let scopedInput = props.slotRef
        ? props.slotRef
        : gmvAutoCompleteInput.value;

      if (!scopedInput) {
        throw new Error(
          `we can find the template ref: 'gmvAutoCompleteInput' or we can't use the slotRef prop`
        );
      }

      if (props.selectFirstOnEnter) {
        downArrowSimulator(scopedInput);
      }

      if (typeof google.maps.places.Autocomplete !== 'function') {
        throw new Error(
          "google.maps.places.Autocomplete is undefined. Did you add 'places' to libraries when loading Google Maps?"
        );
      }

      const autocompleteOptions: IAutoCompleteInputVueComponentProps & {
        [key: string]: any;
      } = {
        ...getPropsValuesWithoutOptionsProp(props),
        ...props.options,
      };

      autoCompleteInstance.value = new google.maps.places.Autocomplete(
        scopedInput,
        autocompleteOptions
      );

      const autoCompletePropsConfig =
        getComponentPropsConfig('GmvAutocomplete');
      const autoCompleteEventsConfig = getComponentEventsConfig(
        'GmvAutocomplete',
        'auto'
      );

      bindPropsWithGoogleMapsSettersAndGettersOnSetup(
        autoCompletePropsConfig,
        autoCompleteInstance.value,
        emits,
        props
      );

      bindGoogleMapsEventsToVueEventsOnSetup(
        autoCompleteEventsConfig,
        autoCompleteInstance.value,
        emits,
        excludedEvents
      );

      if (props.setFieldsTo) {
        autoCompleteInstance.value.setFields(props.setFieldsTo);
      }

      /**
       * Not using `bindEvents` because we also want
       * to return the result of `getPlace()`
       */
      autoCompleteInstance.value.addListener('place_changed', () => {
        if (autoCompleteInstance.value) {
          /**
           * Place change event
           * @event place_changed
           * @property {object} place `this.$autocomplete.getPlace()`
           * @see [Get place information](https://developers.google.com/maps/documentation/javascript/places-autocomplete#get-place-information)
           */
          emits('place_changed', autoCompleteInstance.value.getPlace());
        }
      });
    })
    .catch((error) => {
      throw error;
    });
});

/*******************************************************************************
 * RENDERS
 ******************************************************************************/

/*******************************************************************************
 * EXPOSE
 ******************************************************************************/
defineExpose({ autoCompleteInstance });
</script>
