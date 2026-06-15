# GmapVue documentation site

This package contains the Docusaurus documentation site published at `https://diegoazh.github.io/gmap-vue/`.

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

## Validate docs changes

Run these before opening a documentation PR:

```bash
pnpm run --filter docs typecheck
pnpm run --filter docs build
```

The build output is generated under `packages/documentation/build/` and should not be edited manually.

## Content direction

Vue 3 is the primary documentation path for new users. Vue 2 remains available as legacy documentation.

When adding or changing docs:

1. Start with the user task and happy path.
2. Keep API reference pages behind guide pages.
3. Avoid Docusaurus starter content, placeholder examples, or generic community links.
4. Prefer working Vue 3 examples with documented package entrypoints.
