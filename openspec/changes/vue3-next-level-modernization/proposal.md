# Proposal: Vue 3 Next-Level Modernization

## Intent

Prepare `@gmap-vue/v3` for a professional relaunch by fixing release blockers, making Vue 3 docs primary, clarifying the public API, and hardening testability, security, performance, and maintainability. No implementation starts without user confirmation.

## Scope

### In Scope
- Harden v3 package metadata, exports, build alignment, and import smoke tests.
- Relaunch Vue 3 docs with secure setup, Composition API examples, recipes, migration notes, and Vue 2 legacy messaging.
- Specify API/deprecation audit, strict TypeScript reduction, loader/global-state risk handling, lifecycle cleanup, and CI gates.
- Keep implementation slices reviewable; chain work if the 400-line budget is at risk.

### Out of Scope
- Vue 2 code changes beyond deprecation/navigation docs.
- Full wrapper redesign or breaking removals without separate approval.
- Publishing, committing, or application/package code changes in this phase.

## Capabilities

### New Capabilities
- `vue3-package-surface`: package exports, metadata, CDN/build alignment, and smoke-test contract.
- `vue3-docs-relaunch`: Vue 3-first docs, security guidance, examples, recipes, and Vue 2 deprecation positioning.
- `vue3-quality-hardening`: API classification, type/lifecycle hardening, loader/global-state risks, and CI gates.

### Modified Capabilities
- None — no existing `openspec/specs/` capabilities were found.

## Approach

Stabilize and relaunch the current v3 API first; only include selective major-version cleanup for proven blockers. Specs should separate packaging, docs, and quality hardening so each can be approved and delivered independently.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `packages/v3/package.json`, `vite.config.ts` | Modified | Exports, metadata, engines, CDN/build output alignment. |
| `packages/v3/src/main.ts`, `src/composables` | Modified | Plugin state, loader, promise registry, deprecations, cleanup. |
| `packages/v3/tests` | Modified | Export, SSR/no-window, multi-app, lifecycle tests. |
| `packages/documentation/docs/vue-3-version` | Modified | Primary Vue 3 guides/API/recipes. |
| `packages/documentation/docusaurus.config.ts`, `sidebars.ts` | Modified | Vue 3 primary; Vue 2 legacy. |
| `.github/workflows` | Modified | CI/docs validation alignment if approved. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Subpath/CDN changes break consumers | Med | Smoke tests and migration notes before release. |
| Scope exceeds review budget | High | Split into chained packaging, docs, and quality slices. |
| Loader/CSP/global-state fixes become breaking | Med | Document first; change behavior only with explicit spec approval. |

## Rollback Plan

Revert each approved slice independently: package/export metadata, docs content/navigation, tests/CI, or internals. Do not publish until validations and user approval pass.

## Dependencies

- User confirmation before implementation.
- Valid Google Maps API setup for full e2e validation.

## Success Criteria

- [ ] v3 exports and docs examples match real build outputs.
- [ ] Vue 3 is the primary docs experience; Vue 2 is clearly legacy.
- [ ] New behavior is test-first with v3 build/test/typecheck passing.
- [ ] Docs build/typecheck passes.
- [ ] Work is split into reviewable slices with rollback paths.
