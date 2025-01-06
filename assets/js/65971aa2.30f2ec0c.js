"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2543],{4905:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>l,frontMatter:()=>r,metadata:()=>i,toc:()=>a});const i=JSON.parse('{"id":"vue-2-version/code/mixins/map-element","title":"map-element","description":"mapElementMixin","source":"@site/docs/vue-2-version/code/mixins/map-element.md","sourceDirName":"vue-2-version/code/mixins","slug":"/vue-2-version/code/mixins/map-element","permalink":"/gmap-vue/docs/vue-2-version/code/mixins/map-element","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-2-version/code/mixins/map-element.md","tags":[],"version":"current","frontMatter":{"title":"map-element"},"sidebar":"vue2Version","previous":{"title":"main","permalink":"/gmap-vue/docs/vue-2-version/code/main"},"next":{"title":"mountable","permalink":"/gmap-vue/docs/vue-2-version/code/mixins/mountable"}}');var o=t(6070),s=t(7252);const r={title:"map-element"},d="map-element",c={},a=[{value:"mapElementMixin",id:"mapelementmixin",level:2},{value:"The mixin code",id:"the-mixin-code",level:2}];function m(e){const n={br:"br",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"map-element",children:"map-element"})}),"\n",(0,o.jsx)("a",{name:"mapElementMixin"}),"\n",(0,o.jsx)(n.h2,{id:"mapelementmixin",children:"mapElementMixin"}),"\n",(0,o.jsx)(n.p,{children:"MapElementMixin"}),"\n",(0,o.jsx)(n.p,{children:"Add a inject object to inject $mapPromise and a provide function to the\ncomponent this function save the returned Google Maps object in the $map\nproperty after the $mapPromise is resolved."}),"\n",(0,o.jsx)(n.h2,{id:"the-mixin-code",children:"The mixin code"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",children:"  export default {\n    inject: {\n      $mapPromise: { default: 'abcdef' },\n    },\n    provide() {\n      this.$mapPromise.then((map) => {\n        this.$map = map;\n      });\n\n      return {};\n    },\n  };\n"})}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Kind"}),": global class",(0,o.jsx)(n.br,{}),"\n",(0,o.jsx)(n.strong,{children:"Properties"})]}),"\n",(0,o.jsxs)(n.table,{children:[(0,o.jsx)(n.thead,{children:(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.th,{children:"Name"}),(0,o.jsx)(n.th,{children:"Description"})]})}),(0,o.jsxs)(n.tbody,{children:[(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:"$mapPromise"}),(0,o.jsxs)(n.td,{children:["The map property that should return the ",(0,o.jsx)(n.code,{children:"$map"}),".",(0,o.jsx)("br",{}),"           ",(0,o.jsx)(n.strong,{children:"Note"}),': although this mixin is not "providing" anything,           components\' expect the ',(0,o.jsx)(n.code,{children:"$map"})," property to be present on the component.           In order for that to happen, this mixin must intercept the ",(0,o.jsx)(n.code,{children:"$mapPromise           .then(() => )"})," first before its component does so.           Since a ",(0,o.jsx)(n.code,{children:"provide()"})," on a mixin is executed before a ",(0,o.jsx)(n.code,{children:"provide()"})," on the           component, putting this code in ",(0,o.jsx)(n.code,{children:"provide()"})," ensures that the ",(0,o.jsx)(n.code,{children:"$map"})," is           already set by the time the component's ",(0,o.jsx)(n.code,{children:"provide()"})," is called."]})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:"$map"}),(0,o.jsxs)(n.td,{children:["The Google map (valid only after the promise (",(0,o.jsx)(n.code,{children:"$mapPromise"}),") returns)"]})]})]})]})]})}function l(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}},7252:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>d});var i=t(758);const o={},s=i.createContext(o);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);