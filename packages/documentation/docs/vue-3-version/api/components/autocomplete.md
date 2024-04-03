---
id: autocomplete
sidebar_position: 2
sidebar_label: Autocomplete
---

# Autocomplete

:::info Official sources

- [Reference](https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete)
- [Guide](https://developers.google.com/maps/documentation/javascript/place-autocomplete)

:::

This component is a wrapper of the Google Autocomplete class.

:::note From the authors
> Autocomplete is a feature of the Places library in the Maps JavaScript API. You can use autocomplete to give your applications the type-ahead-search behavior of the Google Maps search field. The autocomplete service can match on full words and substrings, resolving place names, addresses, and plus codes. Applications can therefore send queries as the user types, to provide on-the-fly place predictions. [reference](https://developers.google.com/maps/documentation/javascript/place-autocomplete#introduction)
:::

## Props

:::note
The highlighted lines are the official props
:::

```ts title="Autocomplete props interface" showLineNumbers {11-15}
/**
 * Autocomplete input Google Maps properties documentation
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions.bounds
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions.componentRestrictions
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions.fields
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions.strictBounds
 * @see https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions.types
 */
export interface IAutoCompleteInputVueComponentProps {
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
```

- **bound**:
  - _type_: [`google.maps.LatLngBounds`](https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBounds) | [`google.maps.LatLngBoundsLiteral`](https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBoundsLiteral)
  - _description_: The area in which to search for places.
- **componentRestrictions**:
  - _type_: [`google.maps.places.ComponentRestrictions`](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#ComponentRestrictions)
  - _description_: The component restrictions. Component restrictions are used to restrict predictions to only those within the parent component. For example, the country.
- **fields**:
  - _type_: `string[]`
  - _description_: Fields to be included for the Place in the details response when the details are successfully retrieved, which will be billed for. If ['ALL'] is passed in, all available fields will be returned and billed for (this is not recommended for production deployments). For a list of fields see PlaceResult. Nested fields can be specified with dot-paths (for example, "geometry.location"). The default is ['ALL'].
- **strictBounds**:
  - _type_: `boolean`
  - _description_: A boolean value, indicating that the Autocomplete widget should only return those places that are inside the bounds of the Autocomplete widget at the time the query is sent. Setting strictBounds to false (which is the default) will make the results biased towards, but not restricted to, places contained within the bounds.
- **types**:
  - _type_: `string[]`
  - _description_: The types of predictions to be returned. For supported types, see the developer's guide. If no types are specified, all types will be returned.
- **selectFirstOnEnter**:
  - _type_: `boolean`
  - _description_: Select the first result in the list when press enter keyboard
- **slotRef**:
  - _type_: `HTMLInputElement`
  - _description_: the unique ref set to the component passed in the slot input
- **setFieldsTo**: To avoid paying for data that you don't need, be sure to use Autocomplete.setFields() to specify only the place data that you will use.
- **options**:
  - _type_: `Record<string, unknown>`
  - _description_: We use this prop as a guard, if the official Autocomplete API changes and add new props you can use the options prop to use these new props until we update our API to use it explicitly.

## Methods

:::note
We only document the exposed methods of the component
:::

- **autoCompleteInstance**:
  - _type_: [`InstanceType<google.maps.places.Autocomplete>`](https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete)
  - _description_: Is an instance of the Autocomplete class.

  ```ts showLineNumbers {8}
  //...
    const { Autocomplete } = (await google.maps.importLibrary(
    'places',
  )) as google.maps.PlacesLibrary;

  // ...

  autoCompleteInstance = new Autocomplete(scopedInput, autocompleteOptions);
  //...
  ```

## Events

- **place_changed**:
  - _type_: [`google.maps.places.PlaceResult`](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult)
  - _description_: This event is fired when a PlaceResult is made available for a Place the user has selected.
If the user enters the name of a Place that was not suggested by the control and presses the Enter key, or if a Place Details request fails, the PlaceResult contains the user input in the name property, with no other properties defined.

## Slots

- **default**: It provides a fallback content if you don't provide a slot content

```html showLineNumbers {3-5}
<template>
  <div>
    <slot :attrs="$attrs">
      <input ref="gmvAutoCompleteInput" v-bind="$attrs" />
    </slot>
  </div>
</template>
```

## Source code

<details>
  <summary>`Autocomplete.vue` source code</summary>

```ts
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

<script lang="ts" setup>
import {
  bindGoogleMapsEventsToVueEventsOnSetup,
  bindPropsWithGoogleMapsSettersAndGettersOnSetup,
  downArrowSimulator,
  getComponentEventsConfig,
  getComponentPropsConfig,
  getPropsValuesWithoutOptionsProp,
  useGoogleMapsApiPromiseLazy,
  usePluginOptions,
} from '@/composables';
import type { IAutoCompleteInputVueComponentProps } from '@/interfaces';
import { onMounted, ref, watch } from 'vue';

/**
 * Autocomplete component
 * @displayName GmvAutocomplete
 * @see [official guide](https://developers.google.com/maps/documentation/javascript/place-autocomplete)
 * @see [official reference](https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete)
 * @see [source code](https://diegoazh.github.io/gmap-vue/docs/vue-3-version/api/components/autocomplete)
 */

/*******************************************************************************
 * DEFINE COMPONENT PROPS
 ******************************************************************************/
const props = withDefaults(
  defineProps<{
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
  }>(),
  {
    selectFirstOnEnter: true,
  },
);

/*******************************************************************************
 * TEMPLATE REF, ATTRIBUTES, EMITTERS AND SLOTS
 ******************************************************************************/
const gmvAutoCompleteInput = ref<HTMLInputElement | null>(null);
const emits = defineEmits<{
  place_changed: [value: google.maps.places.PlaceResult];
}>();

/*******************************************************************************
 * INJECT
 ******************************************************************************/

/*******************************************************************************
 * AUTOCOMPLETE
 ******************************************************************************/
const excludedEvents = usePluginOptions()?.excludeEventsOnAllComponents?.();
let autoCompleteInstance: google.maps.places.Autocomplete | undefined;

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
      autoCompleteInstance?.setComponentRestrictions(newValue);
    }
  },
);

/*******************************************************************************
 * HOOKS
 ******************************************************************************/
onMounted(() => {
  useGoogleMapsApiPromiseLazy()
    .then(async () => {
      let scopedInput = props.slotRef
        ? props.slotRef
        : gmvAutoCompleteInput.value;

      if (!scopedInput) {
        throw new Error(
          `we can find the template ref: 'gmvAutoCompleteInput' or we can't use the slotRef prop`,
        );
      }

      if (props.selectFirstOnEnter) {
        downArrowSimulator(scopedInput);
      }

      const autocompleteOptions: IAutoCompleteInputVueComponentProps & {
        [key: string]: any;
      } = {
        ...getPropsValuesWithoutOptionsProp(props),
        ...props.options,
      };

      const { Autocomplete } = (await google.maps.importLibrary(
        'places',
      )) as google.maps.PlacesLibrary;

      if (typeof Autocomplete !== 'function') {
        throw new Error(
          "google.maps.places.Autocomplete is undefined. Did you add 'places' to libraries when loading Google Maps?",
        );
      }

      autoCompleteInstance = new Autocomplete(scopedInput, autocompleteOptions);

      const autoCompletePropsConfig =
        getComponentPropsConfig('GmvAutocomplete');
      const autoCompleteEventsConfig = getComponentEventsConfig(
        'GmvAutocomplete',
        'auto',
      );

      bindPropsWithGoogleMapsSettersAndGettersOnSetup(
        autoCompletePropsConfig,
        autoCompleteInstance,
        emits as any,
        props,
      );

      bindGoogleMapsEventsToVueEventsOnSetup(
        autoCompleteEventsConfig,
        autoCompleteInstance,
        emits as any,
        excludedEvents,
      );

      if (props.setFieldsTo) {
        autoCompleteInstance.setFields(props.setFieldsTo);
      }

      /**
       * Not using `bindEvents` because we also want
       * to return the result of `getPlace()`
       */
      autoCompleteInstance.addListener('place_changed', () => {
        if (autoCompleteInstance) {
          /**
           * Place change event
           * @event place_changed
           * @property {object} place `this.$autocomplete.getPlace()`
           * @see [Get place information](https://developers.google.com/maps/documentation/javascript/places-autocomplete#get-place-information)
           */
          emits('place_changed', autoCompleteInstance.getPlace());
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
```

</details>
