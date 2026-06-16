# GmapVue documentation

This package contains the Docusaurus 3 site for GmapVue, published at <https://diegoazh.github.io/gmap-vue/>.

The docs site is part of the root pnpm workspace and should be developed from the repository root whenever possible so workspace dependency policy stays consistent.

## Structure

```text
packages/documentation/
├── docs/
│   ├── vue-2-version/      # Legacy Vue 2 documentation
│   └── vue-3-version/      # Primary Vue 3 documentation
├── src/                    # Docusaurus React components, CSS, and pages
├── static/                 # Static assets served by Docusaurus
├── docusaurus.config.ts    # Site configuration
└── sidebars.ts             # Sidebar navigation
```

## Local development

From the repository root:

```bash
pnpm run serve:docs
```

Or from this package:

```bash
cd packages/documentation
pnpm run start
```

The site runs at <http://localhost:3000/gmap-vue/>.

## Validation

Run these before opening or updating a documentation PR:

```bash
pnpm run --filter docs typecheck
pnpm run --filter docs build
```

For broad repository changes, also follow the root validation guidance in `../../AGENTS.md`.

The production build is generated under `packages/documentation/build/`. Do not edit generated files manually.

## Content direction

Vue 3 is the primary documentation path for new users. Vue 2 remains available as legacy documentation.

When adding or changing docs:

1. Start with the user task and happy path.
2. Keep API reference pages behind guide pages.
3. Avoid Docusaurus starter content, placeholder examples, or generic community links.
4. Prefer working Vue 3 examples with documented package entrypoints.
5. Keep examples aligned with source behavior, not intended future behavior.
6. Be explicit about Google Maps API key restrictions, enabled APIs, billing, and optional library loading.
7. Avoid examples that call paid Google Maps or Places APIs from high-frequency events such as `tilesloaded`.

## Navigation

- Use `sidebars.ts` for curated Vue 3 navigation.
- Keep Vue 2 navigation legacy-friendly and avoid large unrelated cleanups unless that is the PR scope.
- Add new component guides near related guides, then add matching API pages when the public API needs explicit reference material.

## Deployment

The `documentation` GitHub Actions workflow builds the docs with:

```bash
pnpm run --filter docs typecheck
pnpm run --filter docs build
```

It deploys `packages/documentation/build/` to the `gh-pages` branch. The site uses Docusaurus `baseUrl: '/gmap-vue/'`, so links and assets must work under that subpath.
