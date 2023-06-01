# GmapVue for Vue 3

[![Build Status](https://travis-ci.org/diegoazh/gmap-vue.svg?branch=master)](https://travis-ci.org/diegoazh/gmap-vue)
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/gmap-vue/badge)](https://www.jsdelivr.com/package/npm/gmap-vue)

## Documentation

Please follow next link to our [documentation](https://diegoazh.github.io/gmap-vue/).

## CONTRIBUTORS NEEDED

If you have time to contribute to a rather frequently used library, feel free to make a PR!
For more background, please refer to [this issue](https://github.com/xkjyeah/vue-google-maps/issues/514).

What's we needed are:

1. Better automated tests
2. Better integration tests with the popular frameworks, especially Nuxt and Vue template

The above three will go a long way to keeping the project maintainable and contributable, and will address many of the open issues.

## Migrating from version for Vue 2

In the new version of this plugin for Vue v3 we introduce many changes on the structure and also we tried to improve some names to be more intuitive. Please for more detail refer to our [documentation](/#).

## Installation

### npm

```shell
npm install @gmap-vue/v3 --save
```

### pnpm

```shell
pnpm add @gmap-vue/v3
```

### yarn

```shell
yarn add @gmap-vue/v3
```

### Manually

Just download `dist/gmap-vue.js` file and include it from your HTML.

```html
<script src="./gmap-vue.js"></script>
```

### jsdelivr

You can use a free CDN like [jsdelivr](https://www.jsdelivr.com) to include this plugin in your html file

```html
<script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>
```

### unpkg

You can use a free CDN like [unpkg](https://unpkg.com) to include this plugin in your html file

```html
<script src="https://unpkg.com/gmap-vue@1.2.2/dist/gmap-vue.js"></script>
```

::: warning
Be aware that if you use this method, you cannot use TitleCase for your components and your attributes.
That is, instead of writing `<GmapMap>`, you need to write `<gmap-map>`.
:::

[Live example](https://diegoazh.github.io/gmap-vue/guide/).
