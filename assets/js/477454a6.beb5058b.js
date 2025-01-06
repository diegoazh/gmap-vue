"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5651],{3780:(e,o,i)=>{i.r(o),i.d(o,{assets:()=>a,contentTitle:()=>l,default:()=>d,frontMatter:()=>r,metadata:()=>n,toc:()=>p});const n=JSON.parse('{"id":"vue-3-version/guide/global-properties","title":"Global Properties","description":"We have two main global properties","source":"@site/docs/vue-3-version/guide/global-properties.md","sourceDirName":"vue-3-version/guide","slug":"/vue-3-version/guide/global-properties","permalink":"/gmap-vue/docs/vue-3-version/guide/global-properties","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-3-version/guide/global-properties.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"id":"global-properties","sidebar_position":3,"sidebar_label":"Global properties"},"sidebar":"vue3Version","previous":{"title":"Install function","permalink":"/gmap-vue/docs/vue-3-version/guide/install-function"},"next":{"title":"Basic usage","permalink":"/gmap-vue/docs/category/basic-usage"}}');var s=i(6070),t=i(7252);const r={id:"global-properties",sidebar_position:3,sidebar_label:"Global properties"},l="Global Properties",a={},p=[{value:"Options API",id:"options-api",level:2},{value:"Composition API",id:"composition-api",level:2},{value:"Getting the plugin options with <code>inject</code>",id:"getting-the-plugin-options-with-inject",level:2}];function c(e){const o={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.header,{children:(0,s.jsx)(o.h1,{id:"global-properties",children:"Global Properties"})}),"\n",(0,s.jsx)(o.p,{children:"We have two main global properties"}),"\n",(0,s.jsxs)(o.ol,{children:["\n",(0,s.jsx)(o.li,{children:(0,s.jsx)(o.code,{children:"$gmapApiPromiseLazy"})}),"\n",(0,s.jsxs)(o.li,{children:[(0,s.jsx)(o.code,{children:"$gmapOptions"}),"."]}),"\n"]}),"\n",(0,s.jsx)(o.p,{children:"You can access these properties as follows"}),"\n",(0,s.jsx)(o.h2,{id:"options-api",children:"Options API"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-ts",metastring:'title="[your-component].vue" showLineNumbers {3,4}',children:"export default {\n  mounted() {\n    this.$gmapApiPromiseLazy().then(...).catch(...);\n    this.$gmapOptions;\n  }\n}\n"})}),"\n",(0,s.jsx)(o.h2,{id:"composition-api",children:"Composition API"}),"\n",(0,s.jsx)(o.p,{children:"You can use the following composables"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-ts",metastring:'title="[your-component].vue" showLineNumbers {3,4}',children:"import { usePluginOptions, useGoogleMapsApiPromiseLazy } from '@gmap-vue/v3/composables';\n\nconst options = usePluginOptions();\nconst googleMapsApiPromiseLazy = useGoogleMapsApiPromiseLazy();\n"})}),"\n",(0,s.jsxs)(o.h2,{id:"getting-the-plugin-options-with-inject",children:["Getting the plugin options with ",(0,s.jsx)(o.code,{children:"inject"})]}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-ts",metastring:'title="[your-component].vue" showLineNumbers {4}',children:"import { $gmapOptions } from '@gmap-vue/v3/keys';\nimport { inject } from 'vue';\n\nconst options = inject($gmapOptions);\n"})}),"\n",(0,s.jsx)(o.admonition,{type:"info",children:(0,s.jsxs)(o.ul,{children:["\n",(0,s.jsxs)(o.li,{children:["Check the ",(0,s.jsx)(o.code,{children:"useGoogleMapsApiPromiseLazy"})," object ",(0,s.jsx)(o.a,{href:"/docs/vue-3-version/api/composables#usegooglemapsapipromiselazy",children:"here"})]}),"\n",(0,s.jsxs)(o.li,{children:["Check the ",(0,s.jsx)(o.code,{children:"usePluginOptions"})," object ",(0,s.jsx)(o.a,{href:"/docs/vue-3-version/api/composables#usePluginOptions",children:"here"})]}),"\n"]})})]})}function d(e={}){const{wrapper:o}={...(0,t.R)(),...e.components};return o?(0,s.jsx)(o,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},7252:(e,o,i)=>{i.d(o,{R:()=>r,x:()=>l});var n=i(758);const s={},t=n.createContext(s);function r(e){const o=n.useContext(t);return n.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function l(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),n.createElement(t.Provider,{value:o},e.children)}}}]);