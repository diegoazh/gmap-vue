---
id: autocomplete
sidebar_position: 1
sidebar_label: Autocomplete
---

# Autocomplete

This component helps you to find and select a place on Google Maps API. For more information read the Google Maps documentation for [autocomplete](https://developers.google.com/maps/documentation/javascript/places-autocomplete).

It is exported with the name `Autocomplete`, it is registered as `GmvAutocomplete`.

## Autocomplete instance

This component save the original autocomplete object provided by Google Maps in a property called `autoCompleteInstance`, as the example below.

```ts
// ...

const { Autocomplete } = (await google.maps.importLibrary(
  'places'
)) as google.maps.PlacesLibrary;
autoCompleteInstance = new Autocomplete(scopedInput, autocompleteOptions);

// ...
```

## Source code

<details>
  <summary>Click to se the source code of `autocomplete-input.vue` component</summary>

:::note
You can see this on github [here](https://github.com/diegoazh/gmv-vue/blob/master/packages/v3/src/components/autocomplete-input.vue)
:::

```html showLineNumbers showLineNumbers
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
   * @see [source code](/guide/autocomplete.html#source-code)
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
    }
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
    }
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
            `we can find the template ref: 'gmvAutoCompleteInput' or we can't use the slotRef prop`
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
          'places'
        )) as google.maps.PlacesLibrary;

        if (typeof Autocomplete !== 'function') {
          throw new Error(
            "google.maps.places.Autocomplete is undefined. Did you add 'places' to libraries when loading Google Maps?"
          );
        }

        autoCompleteInstance = new Autocomplete(
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
          autoCompleteInstance,
          emits as any,
          props
        );

        bindGoogleMapsEventsToVueEventsOnSetup(
          autoCompleteEventsConfig,
          autoCompleteInstance,
          emits as any,
          excludedEvents
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

## How to use it

```html showLineNumbers
<template>
  <!-- you can use the auto close form if you don't use the slot -->
  <gmv-autocomplete />
  <!-- <gmv-autocomplete></gmv-autocomplete> -->

  <gmv-map :center="center" :zoom="7" style="width: 100%; height: 500px">
  </gmv-map>
</template>
```

```html showLineNumbers
<template>
  <!-- or use it with a slot -->
  <GmvAutocomplete></GmvAutocomplete>
  <!-- <GmvAutocomplete /> -->

  <gmv-map :center="center" :zoom="7" style="width: 100%; height: 500px">
  </gmv-map>
</template>
```

## Customizing your text field

:::tip
The autocomplete supports custom text field via scoped slot

```html showLineNumbers
<gmv-autocomplete class="introInput">
  <template v-slot:default="slotProps">
    <v-text-field
      outlined
      prepend-inner-icon="place"
      placeholder="Location Of Event"
      ref="input"
      v-bind:attrs="slotProps.attrs"
    >
    </v-text-field>
  </template>
</gmv-autocomplete>
```

The ref on the element must be unique. If you create more than one autocomplete, each one should have a unique ref and it must be mentioned in the slot-ref-name prop. Like this:

```html showLineNumbers
<gmv-autocomplete class="introInput">
  <template v-slot:default="slotProps">
    <v-text-field
      outlined
      prepend-inner-icon="place"
      placeholder="Location Of Event"
      ref="input"
      v-bind:attrs="slotProps.attrs"
    >
    </v-text-field>
  </template>
</gmv-autocomplete>
<gmv-autocomplete class="introInput" slot-ref-name="input2">
  <template v-slot:default="slotProps">
    <v-text-field
      outlined
      prepend-inner-icon="place"
      placeholder="Location Of Event"
      ref="input2"
      v-bind:attrs="slotProps.attrs"
    >
    </v-text-field>
  </template>
</gmv-autocomplete>
```

If the element in the slot is a vue component then it must have a child ref called input (like in vuetify text-field) or specify a custom name via the child-ref-name prop (only works one level deep into a component).

The v-bind:attrs is required.
:::

## Examples
