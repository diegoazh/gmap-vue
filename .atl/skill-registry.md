# Skill Registry — gmap-vue

Generated during SDD init on 2026-05-17.

## Project instruction sources

- `AGENTS.md` — project-specific agent contracts for v3, v2, docs, testing, build, release, and monorepo work.
- `.github/copilot-instructions.md` — validated repository setup, build/test/lint commands, CI behavior, known warnings, and mandatory validation flow.
- `commitlint.config.js` — enforced Conventional Commit rules with required scopes.

## Project domain contracts

### Vue3PluginExpert

**Trigger**: Work in `packages/v3/`, Vue 3 components, composables, TypeScript, Google Maps JavaScript API integration.

- Treat `packages/v3` as the primary active package.
- Entry point is `packages/v3/src/main.ts`; components, composables, interfaces, keys, and types are exported from `src/`.
- Use Vue 3 Composition API and strict TypeScript patterns.
- Validate with `pnpm run --filter @gmap-vue/v3 build`, `pnpm run --filter @gmap-vue/v3 test:ci`, `pnpm run --filter @gmap-vue/v3 type-check`, plus root validation when changes are complete.
- E2E requires `packages/v3/cypress/runner/.env` with `VITE_GOOGLE_API_KEY`.
- Use commit scope `(v3)` for v3-only commits.

### Vue2PluginExpert

**Trigger**: Work in `packages/v2/`, legacy Vue 2 plugin, Options API, mixins, JavaScript.

- Preserve backward compatibility and Vue 2 idioms.
- Entry point is `packages/v2/src/main.js`; key areas are `components/`, `mixins/`, and `utils/`.
- Build with Rollup via `pnpm run --filter @gmap-vue/v2 build`.
- Tests are placeholder-only (`echo 'not implemented yet'`), so rely on build/lint plus targeted manual reasoning.
- Check inline TODO/HACK comments before modifying related legacy code.
- Use commit scope `(v2)` for v2-only commits.

### DocumentationExpert

**Trigger**: Work in `packages/documentation/`, Docusaurus docs, guides, API reference, blog, release notes.

- Docusaurus 3.6.3 site lives under `packages/documentation` with base URL `/gmap-vue/`.
- Use `docs/vue-2-version/` and `docs/vue-3-version/` for versioned user docs.
- Validate docs with `pnpm run --filter docs build` and `pnpm run --filter docs typecheck` when relevant.
- Expected docs warnings include missing blog author/truncation markers and known broken anchors.
- Use commit scope `(docs)` for docs-only commits.

### TestingExpert

**Trigger**: Unit or E2E tests for `packages/v3`, Vitest, Cypress, Google Maps mocks.

- Unit tests live in `packages/v3/tests` and run with `pnpm run --filter @gmap-vue/v3 test:ci`.
- E2E tests live in `packages/v3/cypress/e2e` and run with `pnpm run --filter @gmap-vue/v3 test:e2e:ci`.
- Coverage is available via `pnpm run --filter @gmap-vue/v3 coverage` using Vitest v8 coverage.
- Mock `google.maps` in unit tests; use the real API only in Cypress with a valid API key.
- New v3 behavior should include tests first because SDD strict TDD is enabled.

### BuildConfigExpert

**Trigger**: Vite, Rollup, TypeScript declarations, package exports, bundle formats, external dependencies.

- v3 uses Vite with library entry points `main`, `components`, `composables`, and `keys`.
- v3 external dependencies are `vue`, `@googlemaps/markerclusterer`, and `google.maps`.
- v2 uses Rollup and emits ESM, UMD, UMD minified, and IIFE minified bundles.
- v3 declaration output is generated via `vite-plugin-dts` into `dist/types`.
- Use `tsconfig.eslint.json` for v3 ESLint type-aware linting.

### ReleaseExpert

**Trigger**: Versioning, semantic-release, changelog, publish workflow, commit format.

- Commits MUST use `type(scope): subject`; scope is required and limited to `v2`, `v3`, `next`, `docs`, `root`, `all`.
- Subject must be lowercase and at least 15 characters.
- v3 release tags use `gmv3_v${version}` and v2 release tags use `gmv2_v${version}`.
- Main publish workflow builds/tests/publishes v3; documentation deploys through a separate workflow.
- Never add AI attribution or `Co-Authored-By` trailers.

### MonorepoArchitect

**Trigger**: Workspace scripts, dependency management, package coordination, root-level validation.

- Repo is a pnpm workspace over `packages/**`, excluding `packages/**/dist/**`.
- Real root package manager currently declares `pnpm@10.32.1`.
- Root scripts: `build:all`, `test`, `test:e2e`, `lint`, `serve:docs`, `clean`.
- After code changes, project instructions require root `pnpm run lint`, `pnpm run test`, then `pnpm run test:e2e` in that order.
- `.node-version` is `24`; CI currently uses Node 20, 22, and 24 for tests.

## User skills selected for this repository

### typescript

**Path**: `/Users/diegoalbertozapatahantsch/.config/opencode/skills/typescript/SKILL.md`

**Trigger**: TypeScript code, interfaces, generics, strict mode.

- Prefer const objects plus derived types for finite value sets.
- Keep interfaces flat; move nested object shapes into named interfaces.
- Do not use `any`; prefer `unknown`, generics, or typed guards.
- Use type-only imports/exports where applicable; v3 ESLint enforces consistent type imports and exports.

### cognitive-doc-design

**Path**: `/Users/diegoalbertozapatahantsch/.config/opencode/skills/cognitive-doc-design/SKILL.md`

**Trigger**: Guides, READMEs, architecture docs, onboarding docs, review-facing docs.

- Lead with the answer, then progressively disclose details.
- Use headings, tables, checklists, and examples to reduce recall burden.
- State review path and out-of-scope areas for PR-facing docs.
- Keep docs short, scannable, and outcome-oriented.

### work-unit-commits

**Path**: `/Users/diegoalbertozapatahantsch/.config/opencode/skills/work-unit-commits/SKILL.md`

**Trigger**: Implementation planning, commit splitting, chained PRs, reviewable work units.

- Commit by deliverable behavior, fix, migration, or docs unit, not by file type.
- Keep tests with the code they verify and docs with user-visible changes.
- If a change approaches or exceeds 400 changed lines, split into reviewable slices.
- Each work unit should be independently understandable and reasonably rollbackable.

### branch-pr

**Path**: `/Users/diegoalbertozapatahantsch/.config/opencode/skills/branch-pr/SKILL.md`

**Trigger**: Creating or preparing pull requests.

- Verify issue linkage and approval before PR creation when the workflow requires it.
- Branch names should follow `type/description` with lowercase URL-safe text.
- PR bodies should include linked issue, summary, changes, and test plan.
- Add exactly one `type:*` label when that repository workflow is active.

### issue-creation

**Path**: `/Users/diegoalbertozapatahantsch/.config/opencode/skills/issue-creation/SKILL.md`

**Trigger**: Creating GitHub issues, bug reports, or feature requests.

- Search for duplicates before creating an issue.
- Use the project issue templates and fill required fields.
- New implementation work should have an approved issue before PR work when the workflow requires it.

### pr-review

**Path**: `/Users/diegoalbertozapatahantsch/.config/opencode/skills/pr-review/SKILL.md`

**Trigger**: Reviewing open PRs/issues or auditing contribution backlog.

- Gather PR/issue metadata and diffs before judging.
- Read current code around changed files before review comments.
- Flag red issues such as committed debug files, secrets, broken syntax, missing tests, or breaking changes without migration path.
- Match review comment language to the author/thread.

### comment-writer

**Path**: `/Users/diegoalbertozapatahantsch/.config/opencode/skills/comment-writer/SKILL.md`

**Trigger**: Writing human-facing PR, issue, review, or async comments.

- Be useful fast; start with the actionable point.
- Be warm and direct; explain the technical why when asking for a change.
- Prefer one high-value comment over many low-value nits.
- Match the user's language; Spanish comments should use natural Rioplatense voseo.

## Explicit non-selection notes

- No project-level skills were found under `.claude/skills`, `.gemini/skills`, `.agent/skills`, or `skills/`.
- SDD skills, `_shared`, and `skill-registry` were intentionally excluded from this registry per SDD init scan rules.
- No Vue-specific runtime skill exists in the installed skill set; project Vue rules come from `AGENTS.md` and `.github/copilot-instructions.md`.
- No Cypress-specific installed skill exists; Cypress test rules come from project conventions and detected config.
