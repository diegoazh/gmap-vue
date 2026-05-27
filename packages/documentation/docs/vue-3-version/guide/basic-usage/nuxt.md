---
id: nuxt
sidebar_position: 7
sidebar_label: Nuxt
---

# Nuxt

Use `@gmap-vue/v3` from a client-only Nuxt plugin because Google Maps depends on browser APIs.

## Client plugin

Create a client plugin such as `plugins/gmap-vue.client.ts`:

```ts title="plugins/gmap-vue.client.ts" showLineNumbers
import { createGmapVuePlugin } from "@gmap-vue/v3";
import "@gmap-vue/v3/dist/style.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    createGmapVuePlugin({
      load: {
        key: useRuntimeConfig().public.googleMapsApiKey,
        libraries: "places",
      },
    }),
  );
});
```

Add the public runtime config value in `nuxt.config.ts`:

```ts title="nuxt.config.ts" showLineNumbers
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
  },
});
```

:::warning
`runtimeConfig.public` values are sent to the browser. Restrict the Google Maps key by HTTP referrer and enable only the APIs used by your Nuxt app.
:::

## Transpilation

If your Nuxt build needs explicit transpilation, add the package name rather than importing from `node_modules` directly:

```ts title="nuxt.config.ts"
export default defineNuxtConfig({
  build: {
    transpile: ["@gmap-vue/v3"],
  },
});
```
