"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3030],{9180:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>t,toc:()=>u});const t=JSON.parse('{"id":"vue-2-version/guide/cdn","title":"cdn","description":"CDN example","source":"@site/docs/vue-2-version/guide/cdn.md","sourceDirName":"vue-2-version/guide","slug":"/vue-2-version/guide/cdn","permalink":"/gmap-vue/docs/vue-2-version/guide/cdn","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-2-version/guide/cdn.md","tags":[],"version":"current","frontMatter":{},"sidebar":"vue2Version","previous":{"title":"autocomplete","permalink":"/gmap-vue/docs/vue-2-version/guide/autocomplete"},"next":{"title":"circle","permalink":"/gmap-vue/docs/vue-2-version/guide/circle"}}');var s=o(6070),a=o(7252);const i={},r=void 0,c={},u=[{value:"CDN example",id:"cdn-example",level:3}];function d(e){const n={admonition:"admonition",code:"code",h3:"h3",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h3,{id:"cdn-example",children:"CDN example"}),"\n",(0,s.jsx)(n.p,{children:"If you want to use a CDN it is available on unpkg and jsdelivr, the above is an example using unpkg CDN"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:"<body>\n  <div id=\"root\">\n    <google-map :center=\"{lat: 1.38, lng: 103.8}\" :zoom=\"12\" style=\"width: 100%; height: 500px\">\n      <ground-overlay source=\"./overlay.png\" :bounds=\"{\n            north: 1.502,\n            south: 1.185,\n            east: 104.0262,\n            west: 103.5998,\n        }\" :opacity=\"0.5\">\n      </ground-overlay>\n    </google-map>\n  </div>\n\n  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js\"><\/script>\n  <script src=\"https://unpkg.com/gmap-vue@1.2.2/dist/gmap-vue.js\"><\/script>\n\n  <script>\n    Vue.use(GmapVue, {\n      load: {\n        key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc', // use a valid key\n        v: '3.26',\n      },\n      // Demonstrating how we can customize the name of the components\n      installComponents: false,\n    });\n\n    document.addEventListener('DOMContentLoaded', function() {\n      Vue.component('google-map', GmapVue.Map);\n      Vue.component('ground-overlay', GmapVue.MapElementFactory({\n        mappedProps: {\n          'opacity': {}\n        },\n        props: {\n          'source': {type: String},\n          'bounds': {type: Object},\n        },\n        events: ['click', 'dblclick'],\n        name: 'groundOverlay',\n        ctr: () => google.maps.GroundOverlay,\n        ctrArgs: (options, {source, bounds}) => [source, bounds, options],\n      }));\n\n      new Vue({\n        el: '#root',\n        data: {\n          place: '',\n        },\n      });\n    });\n  <\/script>\n</body>\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsx)(n.p,{children:"You can copy and paste this example in a html file and run it, but you shouldn't forget to provide a valid Google Map key"})})]})}function p(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},7252:(e,n,o)=>{o.d(n,{R:()=>i,x:()=>r});var t=o(758);const s={},a=t.createContext(s);function i(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);