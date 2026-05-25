# Tasks: Vue 3 Next-Level Modernization

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 650-1100 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR1 package-surface/tests -> PR2 runtime-hardening -> PR3 docs/navigation -> PR4 CI gates |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Lock package surface + smoke tests | PR 1 | Base main; includes RED/GREEN/REFACTOR and build/type tests |
| 2 | Harden loader/global lifecycle safety | PR 2 | Base PR 1 or main; SSR/no-window + multi-app isolation |
| 3 | Relaunch Vue 3 docs as primary | PR 3 | Base PR 2 or main; Vue 2 legacy messaging kept reachable |
| 4 | Add/align CI quality gates | PR 4 | Base PR 3 or main; workflow checks only |
| 5 | Harden npm supply-chain posture | PR 5 | Final careful slice; apply `lirantal/npm-security-best-practices` selectively for pnpm 10 |

## Phase 1: Package Surface Contract (TDD-first)

- [x] 1.1 RED: Add failing smoke tests in `packages/v3/tests/` for `.` `./components` `./composables` `./keys` `./interfaces` `./types` and unsupported deep import rejection.
- [x] 1.2 GREEN: Update `packages/v3/package.json` exports/metadata/files/engines to match documented public subpaths.
- [x] 1.3 GREEN: Align `packages/v3/vite.config.ts` entries and declarations with exported subpaths.
- [x] 1.4 REFACTOR: Normalize test helpers/fixtures for import-resolution checks.

## Phase 2: Runtime Quality Hardening (TDD-first)

- [x] 2.1 RED: Add failing tests for SSR/no-window safety and no `window`/`document` requirement on import/install paths.
- [x] 2.2 RED: Add failing tests for multi-app isolation and cross-app global leakage.
- [x] 2.3 GREEN: Implement typed loader/state boundary in `packages/v3/src/main.ts` and relevant composables without changing public API names.
- [x] 2.4 GREEN: Add lifecycle cleanup behavior and keep deprecated behavior functional within policy.
- [x] 2.5 REFACTOR: Tighten targeted public typings in `packages/v3/src/interfaces/*` and `packages/v3/src/types/*`.

## Phase 3: Vue 3 Docs Relaunch

- [ ] 3.1 Update `packages/documentation/docusaurus.config.ts` and `sidebars.ts` so Vue 3 guide/API/recipes are first and Vue 2 is labeled legacy.
- [ ] 3.2 Update `packages/documentation/docs/vue-3-version/**` with secure API-key guidance, Composition API examples, and supported entrypoint imports.
- [ ] 3.3 Add Vue 2 migration/deprecation messaging in legacy docs navigation without removing access.

## Phase 4: CI Gates and Verification Wiring

- [ ] 4.1 Add/adjust `.github/workflows/*` gates for v3 build, `test:ci`, type-check, and package smoke-test checks.
- [ ] 4.2 Add/adjust docs workflow gates for `pnpm run --filter docs build` and `pnpm run --filter docs typecheck`.
- [ ] 4.3 Define pre-apply verification checklist in change notes (root lint/test/e2e deferred until user confirmation).

## Phase 5: npm Supply-Chain Security Hardening (careful final slice)

Reference: https://github.com/lirantal/npm-security-best-practices

- [ ] 5.1 RED/DISCOVERY: Audit current pnpm install/build-script behavior and identify dependencies that require lifecycle scripts.
- [ ] 5.2 GREEN: Add compatible pnpm 10 supply-chain settings to `pnpm-workspace.yaml`, including publish cooldown and exotic/git subdependency blocking where safe.
- [ ] 5.3 GREEN: Define explicit build-script allowlist with `allowBuilds` and enable `strictDepBuilds` only after required exceptions are known.
- [ ] 5.4 GREEN: Document security rationale, exceptions, and local/CI install workflow impact.
- [ ] 5.5 VERIFY: Run install/lockfile validation and CI-equivalent package checks to prove the hardening does not break contributors or releases.
