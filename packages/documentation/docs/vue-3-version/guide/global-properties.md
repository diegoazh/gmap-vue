---
id: global-properties
sidebar_position: 3
sidebar_label: Global properties
---

# Global properties and composables

The plugin provides the final options object and the lazy Google Maps API promise to each Vue app. In Vue 3, prefer the Composition API helpers inside components.

## Composition API

```ts title="[your-component].vue" showLineNumbers
import {
  useGoogleMapsApiPromiseLazy,
  usePluginOptions,
} from "@gmap-vue/v3/composables";

const options = usePluginOptions();
const google = await useGoogleMapsApiPromiseLazy();

if (google) {
  console.log(options);
  console.log(google.maps);
}
```

## Injection keys

Use the exported keys if you need direct Vue `inject` access.

```ts title="[your-component].vue" showLineNumbers
import { $gmapApiPromiseLazy, $gmapOptions } from "@gmap-vue/v3/keys";
import { inject } from "vue";

const options = inject($gmapOptions);
const googleMapsApiPromiseLazy = inject($gmapApiPromiseLazy);
```

## Options API

The plugin also exposes app global properties for Options API components.

```ts title="[your-component].vue" showLineNumbers
export default {
  async mounted() {
    await this.$gmapApiPromiseLazy?.();
    console.log(this.$gmapOptions);
  },
};
```

:::info

- Check the `useGoogleMapsApiPromiseLazy` API [here](/docs/vue-3-version/api/composables#usegooglemapsapipromiselazy).
- Check the `usePluginOptions` API [here](/docs/vue-3-version/api/composables#usepluginoptions).

:::
