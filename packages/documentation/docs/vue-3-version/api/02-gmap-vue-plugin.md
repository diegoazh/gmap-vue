---
id: gmap-vue-plugin
sidebar_position: 2
sidebar_label: Plugin factory
---

# Plugin factory

Use `createGmapVuePlugin` from `@gmap-vue/v3` to install GmapVue into a Vue 3 application.

```ts
import { createGmapVuePlugin } from "@gmap-vue/v3";
```

## Plugin options

```ts showLineNumbers
export interface ILoadPluginOptions {
  key?: string;
  callback?: string;
  v?: string;
  libraries?: string;
  language?: string;
  region?: string;
  authReferrerPolicy?: string;
  mapIds?: string[];
  channel?: string;
  solutionChannel?: string;
}

export interface IGmapVuePluginOptions {
  dynamicLoad?: boolean;
  load?: ILoadPluginOptions;
  excludeEventsOnAllComponents?: () => string[];
}
```

| Option                          | Purpose                                                                                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `dynamicLoad`                   | Install the plugin without immediately loading the Google Maps JavaScript API.                                                              |
| `load.key`                      | Browser Google Maps API key. Restrict it by HTTP referrer.                                                                                  |
| `load.libraries`                | Extra Google Maps libraries such as `places` or `visualization`. The `drawing` library was removed by Google in Maps JavaScript API v3.65+. |
| `load.language` / `load.region` | Localize Google Maps controls and service responses.                                                                                        |
| `excludeEventsOnAllComponents`  | Prevent selected Google Maps events from being emitted by all components.                                                                   |

:::warning
The browser API key is public. Do not commit unrestricted keys; use environment configuration for convenience and enforce restrictions in Google Cloud Console.
:::

:::warning Drawing Library removal
Google deprecated the Maps JavaScript API Drawing Library and removed `google.maps.drawing.DrawingManager` in Maps JavaScript API v3.65+. `GmvDrawingManager` is kept only for legacy API versions where Google still serves the Drawing Library. For current Maps API versions, build drawing workflows with editable shapes, the Data layer/GeoJSON, or a third-party drawing library such as Terra Draw.
:::

## Install example

```ts title="main.ts" showLineNumbers
import { createGmapVuePlugin } from "@gmap-vue/v3";
import "@gmap-vue/v3/dist/style.css";
import { createApp } from "vue";
import App from "./App.vue";

createApp(App)
  .use(
    createGmapVuePlugin({
      load: {
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: "places",
      },
    }),
  )
  .mount("#app");
```

## Runtime behavior

- The plugin provides app-scoped options and lazy Google Maps API access to components.
- `dynamicLoad: true` lets you call `utilities.googleMapsApiInitializer` later.
- Deprecated global fallbacks remain for compatibility, but new component code should use the provided composables and injection keys.

## Deprecated behavior

`customCallback` is no longer supported. Use the documented `load` options and plugin lifecycle instead.
