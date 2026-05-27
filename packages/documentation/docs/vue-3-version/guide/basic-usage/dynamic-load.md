---
id: dynamic-load
sidebar_position: 1
sidebar_label: Dynamic load
---

# Dynamic load

Use `dynamicLoad` when your app must decide when to load the Google Maps JavaScript API. The plugin installs normally, but it does not inject the Google Maps script until you call `utilities.googleMapsApiInitializer`.

## Configure the plugin

```ts title="main.ts" showLineNumbers
import { createGmapVuePlugin } from "@gmap-vue/v3";
import { createApp } from "vue";
import App from "./App.vue";

createApp(App)
  .use(
    createGmapVuePlugin({
      dynamicLoad: true,
      load: {
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      },
    }),
  )
  .mount("#app");
```

## Load from a component

```ts title="[your-component].vue - Composition API" showLineNumbers
import { utilities } from "@gmap-vue/v3";
import { usePluginOptions } from "@gmap-vue/v3/composables";
import { onMounted } from "vue";

const { googleMapsApiInitializer } = utilities;
const options = usePluginOptions();

onMounted(() => {
  if (!options?.load) {
    return;
  }

  googleMapsApiInitializer(options.load);
});
```

## Options API

```ts title="[your-component].vue - Options API" showLineNumbers
import { utilities } from "@gmap-vue/v3";

const { googleMapsApiInitializer } = utilities;

export default {
  mounted() {
    if (!this.$gmapOptions?.load) {
      return;
    }

    googleMapsApiInitializer(this.$gmapOptions.load);
  },
};
```

:::warning
The key still runs in the browser. Restrict it by HTTP referrer and only enable the APIs you need.
:::

:::info

- Check the `googleMapsApiInitializer` API [here](/docs/vue-3-version/api/utilities#googlemapsapiinitializer).
- Check the plugin options interface [here](/docs/vue-3-version/api/gmap-vue-plugin#plugin-options).

:::
