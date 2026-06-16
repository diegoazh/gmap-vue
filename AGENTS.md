# Repository Guidelines

## How to Use This Guide

- Start here for repository-wide norms. GmapVue is a pnpm monorepo with Vue 3, Vue 2 legacy, and Docusaurus packages.
- Use `.github/copilot-instructions.md` for detailed setup, CI behavior, known warnings, and validation commands.
- Package-specific guidance in this file applies when the changed files are under the matching package.
- If guidance conflicts, prefer the most specific package section, then `.github/copilot-instructions.md`, then this file.

## Available Skills

Use these project roles as on-demand skills when planning, implementing, reviewing, or validating work.

| Skill | Use When | Primary Paths |
| --- | --- | --- |
| `Vue3PluginExpert` | Vue 3 plugin, components, composables, TypeScript, Google Maps API wrappers | `packages/v3/` |
| `Vue2PluginExpert` | Vue 2 legacy plugin maintenance and compatibility | `packages/v2/` |
| `DocumentationExpert` | Docusaurus guides, API reference, homepage, navigation, docs build | `packages/documentation/` |
| `TestingExpert` | Vitest, Cypress, Google Maps mocks, e2e runner | `packages/v3/tests/`, `packages/v3/cypress/` |
| `BuildConfigExpert` | Vite/Rollup, package exports, declarations, bundle outputs | `packages/v3/vite.config.ts`, `packages/v2/rollup.config.js` |
| `ReleaseExpert` | semantic-release, Trusted Publishing, workflow publishing, commit scopes | `.github/workflows/`, `packages/*/.releaserc` |
| `MonorepoArchitect` | pnpm workspace, dependency policy, root scripts, cross-package changes | `package.json`, `pnpm-workspace.yaml`, `.npmrc` |

## Auto-Invoke Guidance

When performing these actions, load or apply the corresponding guidance first.

| Action | Guidance |
| --- | --- |
| Modify `packages/v3/src` | `Vue3PluginExpert` |
| Modify `packages/v2/src` | `Vue2PluginExpert` |
| Modify docs, sidebars, homepage, or Docusaurus config | `DocumentationExpert` |
| Add or change unit/e2e tests | `TestingExpert` |
| Change package exports, Vite, Rollup, or declaration output | `BuildConfigExpert` |
| Change release, publish, npm, or GitHub Actions release workflows | `ReleaseExpert` |
| Change workspace dependencies or root scripts | `MonorepoArchitect` |
| Create or update OpenSpec/Gentle AI artifacts | Use `.atl/skill-registry.md` and `openspec/` context |

## Project Overview

| Component | Location | Tech Stack | Status |
| --- | --- | --- | --- |
| Vue 3 plugin | `packages/v3/` | Vue 3, TypeScript, Vite, Vitest, Cypress | Active |
| Vue 2 plugin | `packages/v2/` | Vue 2, JavaScript, Rollup | Legacy maintenance |
| Documentation | `packages/documentation/` | Docusaurus 3, React, TypeScript | Active |
| OpenSpec / Gentle AI artifacts | `openspec/`, `.atl/` | SDD/OpenSpec, skill registry | Tracked project context |

## Development

```bash
pnpm install
```

Root commands:

```bash
pnpm run serve:docs   # Start documentation site
pnpm run build:all    # Build all workspace packages
pnpm run test         # Run all package test:ci scripts
pnpm run test:e2e     # Run all e2e CI scripts
pnpm run lint         # Run all lint scripts
```

Package commands:

```bash
# Vue 3
pnpm run --filter @gmap-vue/v3 build
pnpm run --filter @gmap-vue/v3 test:ci
pnpm run --filter @gmap-vue/v3 type-check
pnpm run --filter @gmap-vue/v3 test:e2e:ci

# Vue 2
pnpm run --filter @gmap-vue/v2 build
pnpm run --filter @gmap-vue/v2 lint

# Documentation
pnpm run --filter docs typecheck
pnpm run --filter docs build
```

## Vue 3 Package Guidelines

- Treat `packages/v3` as the primary package.
- Entry point: `packages/v3/src/main.ts`.
- Public package subpaths include root, `components`, `composables`, `keys`, `interfaces`, `types`, and `dist/style.css`.
- Components wrap Google Maps JavaScript API objects and expose keyed promises through composables.
- Use Vue 3 Composition API, strict TypeScript, and source-aligned docs/examples.
- Do not document unsupported deep imports as public API.
- E2E tests require `packages/v3/cypress/runner/.env` with `VITE_GOOGLE_API_KEY`.

## Vue 2 Package Guidelines

- Treat `packages/v2` as legacy maintenance.
- Preserve backwards compatibility and Vue 2 idioms.
- Check inline TODO/HACK comments before changing related code.
- Tests are placeholder-only, so validate with build/lint and careful manual reasoning.

## Documentation Guidelines

- Vue 3 is the primary user journey. Vue 2 is legacy but remains available.
- Prefer task-first guides before API reference pages.
- Examples must use documented package entrypoints and current source behavior.
- Be explicit about Google Maps API key security, billing-sensitive calls, and optional library loading.
- Avoid examples that trigger repeated paid Google Maps/Places requests from high-frequency map events.
- Docusaurus base URL is `/gmap-vue/`; use Docusaurus helpers for site assets when editing React pages.
- Validate docs with `pnpm run --filter docs typecheck` and `pnpm run --filter docs build`.

## Testing Guidelines

- Unit tests use Vitest in `packages/v3/tests`.
- E2E tests use Cypress in `packages/v3/cypress/e2e` with the Vite runner under `packages/v3/cypress/runner`.
- Mock `google.maps` for unit tests; use the real API only in e2e tests with a valid key.
- For behavior changes in Vue 3, prefer test-first evidence: RED, GREEN, REFACTOR.

## Build and Release Guidelines

- v3 builds with Vite and emits CJS, ESM, CSS, and declarations.
- v2 builds with Rollup and emits ESM/UMD/IIFE artifacts.
- Publishing uses semantic-release and npm Trusted Publishing where configured.
- Release tags:
  - v3: `gmv3_v${version}`
  - v2: `gmv2_v${version}`
- Do not commit generated `dist/` artifacts unless an explicit release process requires them.

## Commit and Pull Request Guidelines

Use conventional commits with required scopes:

```text
<type>(<scope>): <description>
```

Allowed types include `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, and `revert`.

Common scopes:

| Scope | Use For |
| --- | --- |
| `v3` | Vue 3 package changes |
| `v2` | Vue 2 package changes |
| `docs` | Documentation package or docs content |
| `root` | Root workspace/config changes |
| `all` | Cross-package changes |

Before opening a PR:

1. Keep the diff focused and reviewable.
2. Run relevant validation commands.
3. Include validation evidence and screenshots for UI/docs visual changes.
4. Mention known external blockers, such as missing Google Maps API key or billing issues.

## Validation Policy

For broad or cross-package changes, run this sequence before considering work complete:

```bash
pnpm run lint
pnpm run test
pnpm run test:e2e
```

If e2e cannot run because of missing credentials or external Google Cloud billing/API configuration, state that explicitly in the PR notes.

## OpenSpec and Gentle AI Artifacts

- Project SDD/OpenSpec artifacts are stored under `openspec/`.
- The project skill registry lives at `.atl/skill-registry.md`.
- Keep these files committed when they represent project decisions, specs, task plans, verification reports, or skill routing.
- Do not commit local agent runtime/session artifacts from `.pi/`, `.claude/`, or `.codex/` unless a future repo-level policy explicitly introduces a tracked file there.
- When adding a new substantial change, prefer an OpenSpec change folder with proposal, design, tasks, apply progress, and verification notes.

## Known External Constraints

- Google Maps e2e tests require a valid API key and enabled billing.
- `BillingNotEnabledMapError` indicates external Google Cloud billing setup, not necessarily a code failure.
- Legacy Vue 2 docs/code may contain old references; avoid broad cleanup unless it is the PR scope.
