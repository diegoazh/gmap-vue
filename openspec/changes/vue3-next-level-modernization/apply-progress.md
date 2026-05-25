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
