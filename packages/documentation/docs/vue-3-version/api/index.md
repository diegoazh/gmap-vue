---
id: main.ts
sidebar_position: 1
sidebar_label: main.ts
---

# `main.ts`

The root entrypoint exposes the Vue plugin factory and runtime utilities.

```ts
export { createGmapVuePlugin, utilities } from "@gmap-vue/v3";
```

## Supported entrypoints

Import only from the documented package entrypoints. Deep imports into `src/`, generated `dist/` internals other than the stylesheet, or component implementation files are unsupported.

| Purpose                      | Entrypoint                    | Example                                                                 |
| ---------------------------- | ----------------------------- | ----------------------------------------------------------------------- |
| Plugin factory and utilities | `@gmap-vue/v3`                | `import { createGmapVuePlugin, utilities } from '@gmap-vue/v3';`        |
| Components                   | `@gmap-vue/v3/components`     | `import { MapLayer } from '@gmap-vue/v3/components';`                   |
| Composables                  | `@gmap-vue/v3/composables`    | `import { usePluginOptions } from '@gmap-vue/v3/composables';`          |
| Injection keys               | `@gmap-vue/v3/keys`           | `import { $gmapOptions } from '@gmap-vue/v3/keys';`                     |
| Interfaces                   | `@gmap-vue/v3/interfaces`     | `import type { IGmapVuePluginOptions } from '@gmap-vue/v3/interfaces';` |
| Types                        | `@gmap-vue/v3/types`          | `import type { TGlobalGoogleObject } from '@gmap-vue/v3/types';`        |
| Styles                       | `@gmap-vue/v3/dist/style.css` | `import '@gmap-vue/v3/dist/style.css';`                                 |

## Compatibility policy

These entrypoints are the public package surface for Vue 3. Undocumented deep imports can change without notice.
