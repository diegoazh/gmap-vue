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

`GmvAutocomplete` wraps the Google Maps Places Autocomplete widget. It creates a `google.maps.places.Autocomplete` instance for an input element and emits the selected `PlaceResult` through `place_changed`.

The component is exported as `Autocomplete` from `@gmap-vue/v3/components` and registered by the plugin as `GmvAutocomplete`.

## Required Google Maps library

The component imports the Places library internally:

```ts showLineNumbers
const { Autocomplete } = (await google.maps.importLibrary(
  "places",
)) as google.maps.PlacesLibrary;
```

The plugin defaults `load.libraries` to `"places"`, but if your app overrides `load.libraries`, keep `places` in the comma-separated list.

## Props

Official Google options are passed to the Google Autocomplete instance. Plugin-specific props handle the input slot and promise registry.

```ts title="Autocomplete props interface" showLineNumbers
export interface IAutoCompleteInputVueComponentProps {
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  componentRestrictions?: google.maps.places.ComponentRestrictions;
  fields?: string[];
  strictBounds?: boolean;
  types?: string[];
  selectFirstOnEnter?: boolean;
  slotRef?: HTMLInputElement;
  setFieldsTo?: string[];
  autocompleteKey?: string;
  options?: Record<string, unknown>;
}
```

| Prop | Type | Description |
| --- | --- | --- |
| `bounds` | `google.maps.LatLngBounds \| google.maps.LatLngBoundsLiteral` | Bias predictions toward a map bounds area. |
| `componentRestrictions` | `google.maps.places.ComponentRestrictions` | Restrict predictions by country or countries. |
| `fields` | `string[]` | Fields requested in the constructor options. |
| `strictBounds` | `boolean` | Restrict predictions to the configured bounds. |
| `types` | `string[]` | Restrict prediction types, such as `geocode`. |
| `selectFirstOnEnter` | `boolean` | Select the first prediction when the user presses Enter. Defaults to `true`. |
| `slotRef` | `HTMLInputElement` | Real input element to use when rendering a custom slot. |
| `setFieldsTo` | `string[]` | Calls `autocomplete.setFields()` after creation. Use it to request only the Place fields you need. |
| `autocompleteKey` | `string` | Promise key used by `useAutocompletePromise(key)`. Use unique keys for multiple instances. |
| `options` | `Record<string, unknown>` | Fallback for Google options not yet represented by explicit props. |

:::tip
Use `fields` or `setFieldsTo` to limit the returned Place data. Requesting broad field sets can increase Places data usage and billing.
:::

## Exposed properties

`GmvAutocomplete` exposes a promise for the Google instance.

| Property | Type | Description |
| --- | --- | --- |
| `autocompletePromise` | `Promise<google.maps.places.Autocomplete \| undefined>` | Resolves to the underlying Google Autocomplete instance. |

```vue showLineNumbers
<script setup lang="ts">
import { Autocomplete } from "@gmap-vue/v3/components";
import { ref } from "vue";

const autocompleteRef = ref<InstanceType<typeof Autocomplete> | null>(null);

async function readBounds() {
  const autocomplete = await autocompleteRef.value?.autocompletePromise;
  console.log(autocomplete?.getBounds());
}
</script>

<template>
  <GmvAutocomplete ref="autocompleteRef" placeholder="Search" />
  <button @click="readBounds">Read bounds</button>
</template>
```

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `place_changed` | `google.maps.places.PlaceResult` | Fired when the user selects a place. The payload is the result of `autocomplete.getPlace()`. |

If the user enters text that was not selected from predictions, the `PlaceResult` may contain only limited data, such as the user input in `name`.

## Slots

The default slot receives forwarded attributes and should render an actual input element. Prefer the built-in input unless you have tested a custom slot in your app.

```vue showLineNumbers
<template>
  <slot :attrs="$attrs">
    <input ref="gmvAutoCompleteInputRef" v-bind="$attrs" />
  </slot>
</template>
```

Custom slots are advanced because the component needs a real `HTMLInputElement` through `slotRef` by the time `GmvAutocomplete` mounts. A normal parent template ref can be populated too late for the current mount flow.

## Related APIs

- [`useAutocompletePromise`](/docs/vue-3-version/api/composables#useautocompletepromise)
- [User guide](/docs/vue-3-version/guide/components/autocomplete)
- [Google PlaceResult reference](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult)
