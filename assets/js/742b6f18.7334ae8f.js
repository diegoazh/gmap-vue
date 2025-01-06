"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8245],{7940:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>l,frontMatter:()=>s,metadata:()=>o,toc:()=>u});const o=JSON.parse('{"id":"vue-3-version/guide/basic-usage/plugin-component-builder","title":"Plugin component builder","description":"To build your own component you can use the pluginComponentBuilder function. You need to provide the following options to it","source":"@site/docs/vue-3-version/guide/basic-usage/plugin-component-builder.md","sourceDirName":"vue-3-version/guide/basic-usage","slug":"/vue-3-version/guide/basic-usage/plugin-component-builder","permalink":"/gmap-vue/docs/vue-3-version/guide/basic-usage/plugin-component-builder","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-3-version/guide/basic-usage/plugin-component-builder.md","tags":[],"version":"current","sidebarPosition":8,"frontMatter":{"id":"plugin-component-builder","sidebar_position":8,"sidebar_label":"Plugin component builder"},"sidebar":"vue3Version","previous":{"title":"Nuxt","permalink":"/gmap-vue/docs/vue-3-version/guide/basic-usage/nuxt"},"next":{"title":"Components","permalink":"/gmap-vue/docs/category/components"}}');var i=t(6070),r=t(7252);const s={id:"plugin-component-builder",sidebar_position:8,sidebar_label:"Plugin component builder"},a="Plugin component builder",c={},u=[{value:"How to use it",id:"how-to-use-it",level:2}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"plugin-component-builder",children:"Plugin component builder"})}),"\n",(0,i.jsxs)(n.p,{children:["To build your own component you can use the ",(0,i.jsx)(n.code,{children:"pluginComponentBuilder"})," function. You need to provide the following options to it"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="interfaces & types" showLineNumbers',children:"export type SinglePluginComponentConfig = {\n  noBind: string[];\n  twoWay: string[];\n  trackProperties: { [key: string]: string[] };\n  events: {\n    auto: string[];\n    manual: string[]; // TODO: try to improve this to be an object with specific keys that can be used in the code\n  };\n};\n\nexport interface IVueProp {\n  type?:\n    | StringConstructor\n    | NumberConstructor\n    | BooleanConstructor\n    | ArrayConstructor\n    | ObjectConstructor\n    | DateConstructor\n    | FunctionConstructor\n    | SymbolConstructor;\n  required?: boolean;\n  default?: () => undefined;\n  validator?: () => boolean;\n}\n\nexport interface IGmapVueElementOptions {\n  mappedProps: Omit<SinglePluginComponentConfig, 'events'>;\n  props: { [key: string]: IVueProp };\n  events: string[];\n  name: string;\n  ctr: () => any;\n  ctrArgs: (\n    options: { [key: string]: any },\n    props: { [key: string]: IVueProp },\n  ) => any[];\n  beforeCreate: (options: { [key: string]: any }) => any;\n  afterCreate: (mapElementInstance: { [key: string]: any }) => any;\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"how-to-use-it",children:"How to use it"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="DirectionsRenderer.ts" showLineNumbers',children:"import { helpers } from 'gmap-vue'\nconst { MapElementFactory } = helpers;\n\nexport default MapElementFactory({\n  name: 'directionsRenderer',\n  ctr: () => google.maps.DirectionsRenderer,\n  //// The following is optional, but necessary if the constructor takes multiple arguments\n  //// e.g. for GroundOverlay\n  // ctrArgs: (options, otherProps) => [options],\n  events: ['directions_changed'],\n\n  // Mapped Props will automatically set up\n  //   this.$watch('propertyName', (v) => instance.setPropertyName(v))\n  //\n  // If you specify `twoWay`, then it also sets up:\n  //   google.maps.event.addListener(instance, 'propertyName_changed', () => {\n  //     this.$emit('propertyName_changed', instance.getPropertyName())\n  //   })\n  //\n  // If you specify `noBind`, then neither will be set up. You should manually\n  // create your watchers in `afterCreate()`.\n  mappedProps: {\n    routeIndex: { type: Number },\n    options: { type: Object },\n    panel: { },\n    directions: { type: Object },\n    //// If you have a property that comes with a `_changed` event,\n    //// you can specify `twoWay` to automatically bind the event, e.g. Map's `zoom`:\n    // zoom: {type: Number, twoWay: true}\n  },\n  // Any other properties you want to bind. Note: Must be in Object notation\n  props: {},\n  // Actions you want to perform before creating the object instance using the\n  // provided constructor (for example, you can modify the `options` object).\n  // If you return a promise, execution will suspend until the promise resolves\n  beforeCreate (options) {},\n  // Actions to perform after creating the object instance.\n  afterCreate (directionsRendererInstance) {},\n})\n"})}),"\n",(0,i.jsx)(n.p,{children:"Thereafter, it's easy to use the newly-minted component!"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",metastring:'title="Options API" showLineNumbers',children:'<template>\n  <GmvMap :zoom="..." :center="...">\n    <DirectionsRenderer />\n  </GmvMap>\n</template>\n<script>\nimport DirectionsRenderer from \'./DirectionsRenderer.js\'\n\nexport default {\n  components: { DirectionsRenderer },\n}\n<\/script>\n'})}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Check the ",(0,i.jsxs)(n.a,{href:"/docs/vue-3-version/api/utilities#plugincomponentbuilder",children:[(0,i.jsx)(n.code,{children:"pluginComponentBuilder"})," API"]})]}),"\n"]})})]})}function l(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},7252:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>a});var o=t(758);const i={},r=o.createContext(i);function s(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);