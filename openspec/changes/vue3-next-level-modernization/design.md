# Design: Vue 3 Next-Level Modernization

## Technical Approach

Modernize `@gmap-vue/v3` without redesigning the wrapper: first lock the public package surface with smoke tests, then harden loader/global lifecycle behavior behind compatible contracts, then relaunch Vue 3 docs as the primary path. Specs were not present yet, so this design maps to the proposal capabilities: `vue3-package-surface`, `vue3-docs-relaunch`, and `vue3-quality-hardening`.

## Architecture Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Package surface | Treat `package.json` `exports` as the source of truth and align it with Vite entries: main, components, composables, keys, interfaces, types, CSS. | Keep legacy `main/module/browser` behavior as-is. | Current exports include a likely components path inversion (`import` points to CJS-like path and `require` to ES-like path). Import smoke tests prevent silent consumer breakage. |
| API evolution | Classify exports as public/internal/deprecated before changing names or removals. | Remove/rename questionable APIs immediately. | Proposal forbids breaking removals without approval; docs already mention removed/deprecated options inconsistently. |
| Loader state | Encapsulate Google Maps readiness and script loading in a typed internal loader state module while preserving `createGmapVuePlugin`, `utilities`, and existing composables. | Keep module-level globals in `main.ts` and `promise-lazy-builder.ts`. | Current `globalThis.GoogleMapsApi`, `GoogleMapsCallback`, `$finalOptions`, and `$googleMapsApiPromiseLazy` are shared across apps and tests; typed boundaries make SSR/multi-app behavior testable. |
| Script injection | Replace inline loader `innerHTML` assembly with a typed URL/script creation path only if specs approve behavior change; otherwise test and document the current Google bootstrap snippet. | Rewrite loading around `@googlemaps/js-api-loader`. | Inline script has CSP implications but Google’s dynamic import bootstrap is already embedded; dependency change may be larger than this modernization slice. |
| Delivery | Split into package/API, loader-quality, docs, and CI slices. | One broad modernization PR. | Proposal has high review-budget risk; each slice must be independently revertible. |

## Data Flow

```text
app.use(createGmapVuePlugin(options))
  -> normalize finalOptions
  -> create/provide app-scoped options + promise lazy
  -> loader initializes or detects Google Maps API
  -> components/composables resolve keyed promises
  -> docs and smoke tests verify published import paths
```

## File Changes

| File | Action | Description |
|---|---|---|
| `packages/v3/package.json` | Modify | Correct metadata (`description`, `engines`), exports, CDN fields, and files list. |
| `packages/v3/vite.config.ts` | Modify | Keep library entries aligned with exported subpaths and type declarations. |
| `packages/v3/src/main.ts` | Modify | Preserve public plugin API while moving global readiness setup behind typed internal state. |
| `packages/v3/src/composables/promise-lazy-builder.ts` | Modify | Reduce singleton leakage; type return contracts accurately. |
| `packages/v3/src/composables/google-maps-api-initializer.ts` | Modify | Harden SSR/CSP/script-loading behavior according to approved spec. |
| `packages/v3/src/interfaces/*`, `src/types/*` | Modify | Replace targeted `any` public contracts with explicit generics/unknown where safe. |
| `packages/v3/tests/*` | Modify/Create | Add tests before behavior changes: import smoke, SSR/no-window, multi-app, lifecycle cleanup. |
| `packages/documentation/docs/vue-3-version/**` | Modify/Create | Vue 3-first setup, security/API-key guidance, recipes, migration, API audit. |
| `packages/documentation/docusaurus.config.ts`, `sidebars.ts` | Modify | Make Vue 3 primary; mark Vue 2 as legacy. |
| `.github/workflows/*` | Modify | Add v3 build/typecheck/import smoke and docs build/typecheck gates where missing. |

## Interfaces / Contracts

```ts
type PublicSubpath = '.' | './components' | './composables' | './keys' | './interfaces' | './types' | './dist/style.css';

interface LoaderState {
  isReady: boolean;
  promiseLazy?: () => Promise<TGlobalGoogleObject>;
  finalOptions?: IGmapVuePluginOptions;
}
```

Contracts: `createGmapVuePlugin(options)` remains the install factory; documented subpaths must import in ESM and CJS smoke tests; SSR import must not require `window`/`document`; composables must keep current names unless a spec explicitly approves deprecation.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | option normalization, loader guard, singleton/multi-app behavior, lifecycle cleanup | Vitest first; mock `document`, `window.google`, timers, and console warnings. |
| Package | public subpath imports and generated declarations | Build then smoke-test ESM/CJS imports from a packed/emulated package. |
| Docs | examples and navigation | Docs typecheck/build; examples must use real exported paths. |
| E2E | critical map render with valid key | Keep Cypress optional for API-key-dependent validation. |

## Migration / Rollout

No data migration required. Roll out in chained PRs: package surface tests/fixes, loader-quality hardening, docs relaunch, CI gates. Publish only after v3 build, typecheck, tests, docs build/typecheck, and smoke tests pass.

## Open Questions

- [ ] Should CSP hardening replace inline bootstrap now, or only document the current nonce behavior?
- [ ] Which APIs are officially public beyond the existing exported subpaths?
- [ ] Should `@googlemaps/markerclusterer` remain a direct dependency or become peer/optional for consumers?
