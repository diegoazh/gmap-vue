---
id: autocomplete
sidebar_position: 1
sidebar_label: Autocomplete
---

# Autocomplete

`GmvAutocomplete` wraps the Google Maps Places Autocomplete widget. It renders an input, creates a `google.maps.places.Autocomplete` instance, and emits the selected `PlaceResult` through `place_changed`.

The component is exported as `Autocomplete` from `@gmap-vue/v3/components` and registered by the plugin as `GmvAutocomplete`.

## Enable the Places library

`GmvAutocomplete` calls `google.maps.importLibrary("places")`. The plugin defaults `load.libraries` to `"places"`; keeping `places` in your loader config is still useful when you want to make the dependency explicit or preload the library.

```ts title="main.ts excerpt" showLineNumbers
createGmapVuePlugin({
  load: {
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: "places",
  },
});
```

When preloading multiple libraries, use a comma-separated string:

```ts title="main.ts excerpt" showLineNumbers
libraries: "places,visualization";
```

## Basic usage

Use `@place_changed` to receive the `google.maps.places.PlaceResult` selected by the user.

```vue title="AutocompleteExample.vue" showLineNumbers
<script setup lang="ts">
function handlePlaceChanged(place: google.maps.places.PlaceResult) {
  console.log("selected place", place.name, place.geometry?.location?.toJSON());
}
</script>

<template>
  <GmvAutocomplete
    placeholder="Search for a place"
    :set-fields-to="['place_id', 'name', 'formatted_address', 'geometry']"
    @place_changed="handlePlaceChanged"
  />
</template>
```

:::tip
Request only the Place fields your screen needs. Broad field lists can increase Places data usage and billing. `set-fields-to` calls `autocomplete.setFields()` after the Google instance is created.
:::

## Restrict predictions

Pass the same option names used by the Google Maps Autocomplete widget.

```vue showLineNumbers
<template>
  <GmvAutocomplete
    placeholder="Search in Chile"
    :component-restrictions="{ country: 'cl' }"
    :types="['geocode']"
    :set-fields-to="['place_id', 'formatted_address', 'geometry']"
    @place_changed="handlePlaceChanged"
  />
</template>
```

Useful props include:

- `componentRestrictions`, restrict predictions to one or more countries.
- `types`, restrict prediction types.
- `bounds` and `strictBounds`, bias or restrict predictions by map bounds.
- `fields`, pass requested fields to the constructor.
- `setFieldsTo`, call `autocomplete.setFields()` after creation.

## Custom input

By default, `GmvAutocomplete` renders an `<input>` and forwards attributes such as `placeholder`, `class`, and `aria-label`. Prefer the default input unless you have tested a custom input in your app.

```vue title="DefaultAutocompleteInput.vue" showLineNumbers
<script setup lang="ts">
function handlePlaceChanged(place: google.maps.places.PlaceResult) {
  console.log(place);
}
</script>

<template>
  <GmvAutocomplete
    class="search-input"
    placeholder="Search for a place"
    aria-label="Search for a place"
    :set-fields-to="['place_id', 'name', 'geometry']"
    @place_changed="handlePlaceChanged"
  />
</template>
```

:::warning
Custom slots are advanced. The component needs a real `HTMLInputElement` through `slotRef` by the time `GmvAutocomplete` mounts. A normal parent template ref can be populated too late for this component's current mount flow. If you need a wrapped design-system input, verify it in your app before relying on it in production.
:::

## Access the Autocomplete instance

Use a component ref when the parent needs the Google `Autocomplete` instance.

```vue title="AutocompleteInstanceExample.vue" showLineNumbers
<script setup lang="ts">
import { Autocomplete } from "@gmap-vue/v3/components";
import { ref } from "vue";

const autocompleteRef = ref<InstanceType<typeof Autocomplete> | null>(null);

async function logAutocompleteBounds() {
  const autocomplete = await autocompleteRef.value?.autocompletePromise;
  console.log(autocomplete?.getBounds());
}
</script>

<template>
  <GmvAutocomplete ref="autocompleteRef" placeholder="Search" />
  <button @click="logAutocompleteBounds">Log bounds</button>
</template>
```

For descendants or shared promise access, use `autocompleteKey` with `useAutocompletePromise(key)`.

```vue showLineNumbers
<script setup lang="ts">
import { useAutocompletePromise } from "@gmap-vue/v3/composables";

const autocompleteKey = "header-search";
const autocompletePromise = useAutocompletePromise(autocompleteKey);
</script>

<template>
  <GmvAutocomplete :autocomplete-key="autocompleteKey" placeholder="Search" />
</template>
```

## Gotchas

- `GmvAutocomplete` does not implement `v-model` or emit `update:modelValue`.
- `place_changed` emits the result of `autocomplete.getPlace()`, not a DOM event.
- `selectFirstOnEnter` defaults to `true` and simulates selecting the first prediction when Enter is pressed.
- Use unique `autocompleteKey` values when coordinating promise access for multiple autocomplete instances.

## Related pages

- [Generated component API](/docs/vue-3-version/api/components/autocomplete)
- [Composables API](/docs/vue-3-version/api/composables)
- [Google Places Autocomplete guide](https://developers.google.com/maps/documentation/javascript/place-autocomplete)
