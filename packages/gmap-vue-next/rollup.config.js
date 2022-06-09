import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-css-only';
import { terser } from 'rollup-plugin-terser';
import ts from 'rollup-plugin-ts';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/main.ts',
  output: [
    {
      dir: 'dist/esm',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
      globals: {
        vue: 'Vue',
        '@googlemaps/markerclusterer': 'MarkerClusterer',
      },
    },
    {
      file: 'dist/main.js',
      format: 'umd',
      name: 'GmapVue',
      globals: {
        vue: 'Vue',
        '@googlemaps/markerclusterer': 'MarkerClusterer',
      },
    },
    {
      file: 'dist/gmap-vue.min.js',
      format: 'umd',
      name: 'GmapVue',
      plugins: [terser()],
      globals: {
        vue: 'Vue',
        '@googlemaps/markerclusterer': 'MarkerClusterer',
      },
    },
    {
      file: 'dist/gmap-vue.iife.js',
      format: 'iife',
      name: 'GmapVue',
      plugins: [terser()],
      globals: {
        vue: 'Vue',
        '@googlemaps/markerclusterer': 'MarkerClusterer',
      },
    },
  ],
  external: [
    vue,
    '@googlemaps/markerclusterer',
    'google.maps',
  ],
  plugins: [
    vue({ css: true, compileTemplate: true }),
    css(),
    ts({
      tsconfig: {
        target: 'ES6',
        lib: ['ES2020'],
        composite: true,
        baseUrl: '.',
        paths: {
          '@/*': ['./src/*'],
        },
        types: ['google.maps'],
        outDir: './build',
        declaration: true,
      },
    }),
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    json(),
    copy({
      targets: [
        { src: 'src/components/*', dest: 'dist/components' },
      ],
    }),
  ],
};
