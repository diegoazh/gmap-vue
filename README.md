# GmapVue

<p align="center">
  <img src="packages/documentation/static/img/logo.svg" alt="gmap-vue logo" width="260" />
</p>

<p align="center">
  Google Maps components and composables for Vue 3. The Vue 2 package is frozen and kept only for existing applications.
</p>

<p align="center">
  <a href="https://github.com/diegoazh/gmap-vue/actions/workflows/ci.yml"><img src="https://github.com/diegoazh/gmap-vue/actions/workflows/ci.yml/badge.svg" alt="CI workflow status" /></a>
  <a href="https://github.com/diegoazh/gmap-vue/actions?query=workflow%3Adocumentation"><img src="https://github.com/diegoazh/gmap-vue/workflows/documentation/badge.svg" alt="Documentation workflow status" /></a>
</p>

## Overview

GmapVue is a pnpm monorepo that provides Vue wrappers for the Google Maps JavaScript API.

- **Vue 3 package:** `@gmap-vue/v3`, the actively developed package.
- **Vue 2 package:** `gmap-vue`, frozen and no longer actively maintained. Existing Vue 2 apps can keep using it, but migration to Vue 3 is recommended.
- **Documentation:** Docusaurus site published at <https://diegoazh.github.io/gmap-vue/>.

The project is a maintained fork of `vue2-google-maps`, updated to support modern Vue, typed package entrypoints, and component-level access to Google Maps instances.

## Documentation

Start with the published docs:

- [Vue 3 documentation](https://diegoazh.github.io/gmap-vue/docs/vue-3-version/)
- [Vue 2 legacy documentation](https://diegoazh.github.io/gmap-vue/docs/vue-2-version/)
- [Component API reference](https://diegoazh.github.io/gmap-vue/docs/vue-3-version/api/components/)

## Packages

| Package | Location | Status | Purpose |
| --- | --- | --- | --- |
| `@gmap-vue/v3` | `packages/v3` | Active | Vue 3 plugin, components, composables, keys, interfaces, and types. |
| `gmap-vue` | `packages/v2` | Frozen legacy | Vue 2 plugin kept for existing applications. No active maintenance; migrate to `@gmap-vue/v3` when possible. |
| `docs` | `packages/documentation` | Active | Docusaurus documentation site. |

## Install

```bash
pnpm add @gmap-vue/v3
```

Peer/runtime dependencies are resolved by your app, including Vue and the Google Maps JavaScript API types used by your tooling.

## Vue 3 quick start

```ts title="main.ts"
import { createApp } from 'vue';
import { createGmapVuePlugin } from '@gmap-vue/v3';
import '@gmap-vue/v3/dist/style.css';
import App from './App.vue';

createApp(App)
  .use(
    createGmapVuePlugin({
      load: {
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      },
    }),
  )
  .mount('#app');
```

```vue title="MapExample.vue"
<template>
  <GmvMap
    :center="{ lat: -34.6037, lng: -58.3816 }"
    :zoom="12"
    style="width: 100%; height: 500px"
  />
</template>
```

For production apps, restrict browser API keys in Google Cloud Console by HTTP referrer and by required APIs.

## Development

This repository uses pnpm workspaces.

```bash
pnpm install
```

Common root commands:

```bash
pnpm run serve:docs   # Start the Docusaurus site
pnpm run build:all    # Build workspace packages
pnpm run test         # Run package test:ci scripts
pnpm run test:e2e     # Run package e2e CI scripts
pnpm run lint         # Run workspace lint scripts
```

Package-specific examples:

```bash
pnpm run --filter @gmap-vue/v3 build
pnpm run --filter @gmap-vue/v3 test:ci
pnpm run --filter @gmap-vue/v3 type-check
pnpm run --filter docs build
pnpm run --filter docs typecheck
```

## Validation before opening a PR

Run the checks that match your change. For broad changes, use the full root validation path:

```bash
pnpm run lint
pnpm run test
pnpm run test:e2e
```

E2E tests require `packages/v3/cypress/runner/.env` with `VITE_GOOGLE_API_KEY`. If Google Cloud billing or API key restrictions are not correctly configured, e2e tests can fail with Google Maps runtime errors.

## Contributing

Contributions are welcome. Before opening a PR:

1. Read [`AGENTS.md`](AGENTS.md) and [`.github/copilot-instructions.md`](.github/copilot-instructions.md).
2. Keep changes scoped and reviewable.
3. Use conventional commits with a required scope, for example `docs(docs): improve vue 3 guide`.
4. Include validation evidence in the PR description.

## License

MIT. See package-level license files where applicable.
