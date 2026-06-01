# Apply Progress: vue3-next-level-modernization

## Phase 2 — Runtime Quality Hardening

Status: complete
Mode: Strict TDD

### RED evidence

Added `packages/v3/tests/runtime-hardening.spec.ts` before implementation. The first run produced the intended runtime-hardening failures:

```text
$ cd packages/v3 && pnpm run test:ci -- tests/runtime-hardening.spec.ts
FAIL tests/runtime-hardening.spec.ts > imports the main entry without creating or overwriting GoogleMapsApi global state
  expected { isReady: false } to be { isReady: true }
FAIL tests/runtime-hardening.spec.ts > keeps deprecated module-level plugin options compatible with the latest install
  expected key "first" to equal key "second"
FAIL tests/runtime-hardening.spec.ts > settles the lazy Google Maps API promise safely when window is unavailable
  Test timed out in 5000ms
```

The same command also surfaced pre-existing package-surface failures because `dist/` was not built in the fresh worktree; those were resolved by running the build before the full suite.

### GREEN / refactor summary

- Removed import-time `globalThis.GoogleMapsApi = { isReady: false }` mutation from `packages/v3/src/main.ts`.
- Added install-time typed runtime state for each plugin install and kept `utilities.getGoogleMapsAPI` functional through controlled module state instead of import-time global mutation.
- Changed the promise lazy builder to use the provided per-install API state, settle safely with `undefined` when `window` is unavailable, and avoid invoking the Google Maps initializer in SSR/no-window mode.
- Changed deprecated module-level `saveLazyPromiseAndFinalOptions` compatibility behavior from first-write-wins to latest-install fallback so it no longer leaks the first app forever.
- Added timer cleanup around the Google Maps callback polling loop.
- Tightened targeted public typings for lazy values and `IGmapVueElementOptions` constructor arguments without changing public API names.

### Review blocker follow-up

A fresh review found that the first GREEN pass still let components read latest module-level fallback state, concurrent lazy builders could race through a shared callback, and `utilities.getGoogleMapsAPI` only tracked the latest install state. The follow-up fix:

- Added `$gmapApiPromiseLazy` injection key and provided app-scoped lazy/options from plugin install.
- Updated deprecated composables to prefer injected app context when called from components/lifecycle hooks, while preserving module-level latest-install fallback outside app context.
- Replaced per-lazy global callback overwrite with a dispatcher over pending ready callbacks; polling now resolves each lazy instance through its own callback and cleans its own timers.
- Changed `utilities.getGoogleMapsAPI` to inspect all installed runtime states plus legacy/global readiness instead of only the latest state.
- Updated aggregate composable typing so `useGoogleMapsApiPromiseLazy` can return `undefined` when the lazy fallback has not been created.

### Verification

```text
$ cd packages/v3 && pnpm exec vitest run tests/main.spec.ts tests/promise-lazy-builder.spec.ts tests/google-maps-api-initializer.spec.ts tests/runtime-hardening.spec.ts
4 files passed, 21 tests passed

$ cd packages/v3 && pnpm run test:ci
23 files passed, 105 tests passed

$ cd packages/v3 && pnpm run type-check
passed

$ cd packages/v3 && pnpm run build
passed

$ cd packages/v3 && pnpm exec eslint src/main.ts src/composables/promise-lazy-builder.ts src/interfaces/gmap-vue.interface.ts src/types/gmap-vue.type.ts src/keys/gmap-vue.keys.ts tests/main.spec.ts tests/promise-lazy-builder.spec.ts tests/runtime-hardening.spec.ts
passed
```

### Notes / risks

- Script injection remains a global loader singleton by design; app options/lazy runtime state are scoped per install with a latest-install deprecated fallback.
- Root `pnpm run lint`, root `pnpm run test`, and root `pnpm run test:e2e` were not run in this worker; e2e may require `packages/v3/cypress/runner/.env` with a Google API key.

## Phase 3 — Vue 3 Docs Relaunch

Status: complete
Mode: docs-only apply

### Summary

- Updated Docusaurus navigation/footer labels so Vue 3 is the primary path and Vue 2 is labeled legacy.
- Reordered sidebar config to list Vue 3 before Vue 2 and updated category metadata for Vue 3 and Vue 2 legacy docs.
- Reworked Vue 3 landing and quickstart docs around the happy path: install, stylesheet import, secure browser API-key setup, and supported package entrypoints.
- Replaced high-risk stale Vue 2 examples in the Vue 3 docs, including Nuxt, `pluginComponentBuilder`, `GmvMap`, global properties, dynamic loading, and region/language examples.
- Strengthened Vue 2 legacy messaging without removing routes or pages.

### Validation

```text
$ pnpm run --filter docs typecheck
passed

$ pnpm run --filter docs build
passed after adding a temporary pnpm `webpackbar: 7.0.0` override for the Docusaurus 3.9.0 / webpack 5.106+ ProgressPlugin compatibility issue.
```

### Review blocker follow-up

A fresh review found incorrect docs examples after the first Phase 3 pass. The follow-up fix:

- Updated Composition API examples to treat `useGoogleMapsApiPromiseLazy()` as the promise-returning composable API instead of calling the returned promise as a lazy function.
- Updated dynamic-load examples to pass `options.load` / `this.$gmapOptions.load` into `googleMapsApiInitializer`, matching the `ILoadPluginOptions` contract.
- Replaced malformed one-line install command fences with normal fenced shell blocks.
- Added a CDN caveat that browser-only ESM usage may require an import map or CDN endpoint that rewrites externals.
- Corrected the `pluginComponentBuilder` guide so Vue prop definitions live in `props` and `mappedProps` uses the public binding config shape (`noBind`, `twoWay`, `trackProperties`).

### Notes / risks

- The docs build still emits known legacy warnings for deprecated `onBrokenMarkdownLinks`, existing blog author metadata, missing blog truncation markers, Vue 2 broken links/anchors, and two pre-existing developer-page `regexr.com` links.
- The `webpackbar` override should be removed when Docusaurus is upgraded to a release that includes the webpack 5.106+ compatibility fix.

## Phase 4 — CI Gates and Verification Wiring

Status: complete
Mode: workflow-only apply

### Summary

- Updated CI build gates to run explicit v3 package build and type-check commands with workspace filters.
- Updated CI unit-test matrix to build `@gmap-vue/v3` in the same fresh job before running `test:ci`, so package-surface smoke tests have `packages/v3/dist` available.
- Kept e2e matrix behavior, but limited Cypress `.env` creation to the e2e path.
- Updated documentation publishing workflow to install dependencies from the repository root and run docs `typecheck` plus docs `build` via filters, preserving the root `webpackbar: 7.0.0` override.
- Updated manual release workflow to build, type-check, and run v3 `test:ci` explicitly before semantic-release.

### Pre-apply verification checklist

Required CI-equivalent checks for this slice:

```text
pnpm install --frozen-lockfile
pnpm run --filter @gmap-vue/v3 build
pnpm run --filter @gmap-vue/v3 type-check
pnpm run --filter @gmap-vue/v3 test:ci
pnpm run --filter docs typecheck
pnpm run --filter docs build
```

Full root validation remains available but deferred until user confirmation because e2e depends on `packages/v3/cypress/runner/.env` with `VITE_GOOGLE_API_KEY`:

```text
pnpm run lint
pnpm run test
pnpm run test:e2e
```

### Validation

```text
$ pnpm install --frozen-lockfile
passed

$ pnpm run --filter @gmap-vue/v3 build
passed; emits dist/style.css for the documented stylesheet export

$ pnpm run --filter @gmap-vue/v3 type-check
passed

$ pnpm run --filter @gmap-vue/v3 test:ci
passed; 23 files, 105 tests

$ pnpm run --filter docs typecheck
passed

$ pnpm run --filter docs build
passed with known legacy Docusaurus warnings

$ pnpm run lint
passed

$ pnpm run test
passed

$ pnpm run test:e2e
passed; 11 specs, 15 tests
```

### Notes / risks

- Documentation CI failed because it removed `pnpm-workspace.yaml`, bypassing the root `webpackbar: 7.0.0` override and reinstalling the incompatible Docusaurus 3.9.0 / webpackbar 6 / webpack 5.106+ combination.
- The workflow fix intentionally keeps the root workspace visible and documents why the temporary override must remain until the Docusaurus compatibility issue is resolved upstream.
- CI still runs e2e only in the existing matrix path; local full e2e validation should be run only with a valid Google Maps API key.

## Phase 5 — npm Supply-Chain Security Hardening

Status: complete
Mode: audit-first hardening

### Discovery summary

- Plain workspace installs ran package lifecycle hooks, including root `prepare -> husky install` and legacy `packages/old-documentation prepare -> snyk protect`.
- pnpm dependency build-script approval does not suppress workspace package lifecycle hooks; CI must use `--ignore-scripts` for install steps that only need dependency materialization.
- Initial pnpm 10 build-script audit surfaced `core-js`, `core-js-pure`, `cypress`, `fsevents`, `highlight.js`, `snyk`, `vuepress`, and `esbuild` as dependencies with install-time hooks requiring classification.
- Cypress does not need postinstall because e2e commands call `cypress install` explicitly.
- `esbuild` is the only audited dependency allowed to run build scripts for cross-platform build compatibility; the rest are explicitly ignored.

### Summary

- Added pnpm 10 supply-chain policy in `pnpm-workspace.yaml`:
  - `minimumReleaseAge: 1440` to delay newly published versions during future dependency resolution.
  - `ignoredBuiltDependencies` for known unnecessary or legacy transitive lifecycle hooks.
  - `onlyBuiltDependencies` allowing only `esbuild`.
  - `strictDepBuilds: true` so future unclassified dependency build scripts fail loudly.
- Updated CI and documentation workflow installs to use `pnpm install --frozen-lockfile --ignore-scripts` where lifecycle hooks are not needed.
- Kept explicit runtime commands (`pnpm exec cypress install`, builds, tests, docs build) outside install-time scripts.

### Validation

```text
$ pnpm install --lockfile-only --ignore-scripts
passed; no lockfile changes required

$ pnpm config get minimumReleaseAge
1440

$ pnpm config get ignoredBuiltDependencies
core-js,core-js-pure,cypress,fsevents,highlight.js,snyk,vuepress

$ pnpm config get onlyBuiltDependencies
esbuild

$ pnpm config get strictDepBuilds
true

$ pnpm install --frozen-lockfile --ignore-scripts
passed

$ pnpm ignored-builds
reported no identifiable ignored builds in the current node_modules state

$ pnpm run --filter @gmap-vue/v3 build
passed

$ pnpm run --filter @gmap-vue/v3 type-check
passed

$ pnpm run --filter @gmap-vue/v3 test:ci
passed; 23 files, 105 tests

$ pnpm run --filter @gmap-vue/v3 test:e2e:build
passed

$ pnpm run --filter docs typecheck
passed

$ pnpm run --filter docs build
passed with known legacy Docusaurus warnings

$ pnpm run lint
passed

$ pnpm run test
passed

$ pnpm run test:e2e
passed; 11 specs, 15 tests
```

Full e2e remains available with a valid `packages/v3/cypress/runner/.env`:

```text
pnpm run --filter @gmap-vue/v3 test:e2e:ci
```

### Notes / risks

- `minimumReleaseAge` affects future dependency resolution, not frozen-lockfile CI installs.
- Avoided global `.npmrc ignore-scripts=true` because it would be too disruptive for contributors and hides intent; CI install flags are explicit instead.
- Did not change peer dependency policy or remove the legacy `old-documentation` Snyk prepare hook in this slice; the CI hardening prevents that hook from running in CI installs.
