"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3664],{626:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>M,contentTitle:()=>A,default:()=>D,frontMatter:()=>N,metadata:()=>r,toc:()=>C});const r=JSON.parse('{"id":"vue-3-version/introduction","title":"Welcome","description":"This documentation is under development, it contains the main points and examples but we continue working on it. Please if you find a bug or something that is not correct, feel free to report it or send a PR to improve it. Thank you.","source":"@site/docs/vue-3-version/index.mdx","sourceDirName":"vue-3-version","slug":"/vue-3-version/","permalink":"/gmap-vue/docs/vue-3-version/","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-3-version/index.mdx","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"id":"introduction","title":"Welcome","type":"link","sidebar_position":1,"sidebar_label":"Introduction"},"sidebar":"vue3Version","next":{"title":"Guide","permalink":"/gmap-vue/docs/category/guide-1"}}');var i=t(6070),a=t(7252),s=t(758),l=t(3526),o=t(6305),c=t(5557),d=t(5080),u=t(1866),p=t(8451),h=t(2294);function m(e){return s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function f(e){const{values:n,children:t}=e;return(0,s.useMemo)((()=>{const e=n??function(e){return m(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:i}}=e;return{value:n,label:t,attributes:r,default:i}}))}(t);return function(e){const n=(0,p.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function g(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function v(e){let{queryString:n=!1,groupId:t}=e;const r=(0,c.W6)(),i=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,u.aZ)(i),(0,s.useCallback)((e=>{if(!i)return;const n=new URLSearchParams(r.location.search);n.set(i,e),r.replace({...r.location,search:n.toString()})}),[i,r])]}function x(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,i=f(e),[a,l]=(0,s.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!g({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:i}))),[o,c]=v({queryString:t,groupId:r}),[u,p]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,i]=(0,h.Dv)(t);return[r,(0,s.useCallback)((e=>{t&&i.set(e)}),[t,i])]}({groupId:r}),m=(()=>{const e=o??u;return g({value:e,tabValues:i})?e:null})();(0,d.A)((()=>{m&&l(m)}),[m]);return{selectedValue:a,selectValue:(0,s.useCallback)((e=>{if(!g({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);l(e),c(e),p(e)}),[c,p,i]),tabValues:i}}var j=t(8884);const b={tabList:"tabList_jMMe",tabItem:"tabItem_DKOd"};function y(e){let{className:n,block:t,selectedValue:r,selectValue:a,tabValues:s}=e;const c=[],{blockElementScrollPositionUntilNextRender:d}=(0,o.a_)(),u=e=>{const n=e.currentTarget,t=c.indexOf(n),i=s[t].value;i!==r&&(d(n),a(i))},p=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=c.indexOf(e.currentTarget)+1;n=c[t]??c[0];break}case"ArrowLeft":{const t=c.indexOf(e.currentTarget)-1;n=c[t]??c[c.length-1];break}}n?.focus()};return(0,i.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.A)("tabs",{"tabs--block":t},n),children:s.map((e=>{let{value:n,label:t,attributes:a}=e;return(0,i.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>c.push(e),onKeyDown:p,onClick:u,...a,className:(0,l.A)("tabs__item",b.tabItem,a?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function w(e){let{lazy:n,children:t,selectedValue:r}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===r));return e?(0,s.cloneElement)(e,{className:(0,l.A)("margin-top--md",e.props.className)}):null}return(0,i.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,s.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function k(e){const n=x(e);return(0,i.jsxs)("div",{className:(0,l.A)("tabs-container",b.tabList),children:[(0,i.jsx)(y,{...n,...e}),(0,i.jsx)(w,{...n,...e})]})}function T(e){const n=(0,j.A)();return(0,i.jsx)(k,{...e,children:m(e.children)},String(n))}const I={tabItem:"tabItem_eydU"};function V(e){let{children:n,hidden:t,className:r}=e;return(0,i.jsx)("div",{role:"tabpanel",className:(0,l.A)(I.tabItem,r),hidden:t,children:n})}const N={id:"introduction",title:"Welcome",type:"link",sidebar_position:1,sidebar_label:"Introduction"},A="GmapVue for Vue 3",M={},C=[{value:"Installation",id:"installation",level:2},{value:"Using a CDN",id:"using-a-cdn",level:3},{value:"Global styles",id:"global-styles",level:2},{value:"Dynamic Library Import",id:"dynamic-library-import",level:2},{value:"Migrating from version for Vue 2",id:"migrating-from-version-for-vue-2",level:2}];function P(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"gmapvue-for-vue-3",children:"GmapVue for Vue 3"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://www.jsdelivr.com/package/npm/@gmap-vue/v3",children:(0,i.jsx)(n.img,{src:"https://data.jsdelivr.com/v1/package/npm/@gmap-vue/v3/badge",alt:""})})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"This documentation is under development"}),", it contains the main points and examples but we continue working on it. Please if you find a bug or something that is not correct, feel free to report it or send a PR to improve it. Thank you."]})}),"\n",(0,i.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsxs)(T,{children:[(0,i.jsx)(V,{value:"npm",label:"NPM",default:!0,children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"npm install @gmap-vue/v3 --save\n"})})}),(0,i.jsx)(V,{value:"yarn",label:"Yarn",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"yarn add @gmap-vue/v3\n"})})}),(0,i.jsx)(V,{value:"pnpm",label:"PNPM",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"pnpm add @gmap-vue/v3\n"})})}),(0,i.jsxs)(V,{value:"manual",label:"Manually",children:[(0,i.jsxs)(n.p,{children:["Just download ",(0,i.jsx)(n.code,{children:"dist/main.umd.js"})," file and include it from your HTML."]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<script src="./main.umd.js"><\/script>\n'})})]})]}),"\n",(0,i.jsx)(n.h3,{id:"using-a-cdn",children:"Using a CDN"}),"\n",(0,i.jsxs)(T,{children:[(0,i.jsxs)(V,{value:"jsdelivr",label:"jsdelivr",default:!0,children:[(0,i.jsxs)(n.p,{children:["You can use a free CDN like ",(0,i.jsx)(n.a,{href:"https://www.jsdelivr.com",children:"jsdelivr"})," to include this plugin in your html file"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<script src="https://cdn.jsdelivr.net/npm/@gmap-vue/v3/dist/main.umd.js"><\/script>\n'})})]}),(0,i.jsxs)(V,{value:"unpkg",label:"unpkg",children:[(0,i.jsxs)(n.p,{children:["You can use a free CDN like ",(0,i.jsx)(n.a,{href:"https://unpkg.com",children:"unpkg"})," to include this plugin in your html file"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<script src="https://unpkg.com/@gmap-vue/v3/dist/main.umd.js"><\/script>\n'})})]})]}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["Be aware that if you use this method, you cannot use TitleCase for your components and your attributes.\nThat is, instead of writing ",(0,i.jsx)(n.code,{children:"<GmvMap>"}),", you need to write ",(0,i.jsx)(n.code,{children:"<gmv-map>"}),"."]})}),"\n",(0,i.jsx)(n.h2,{id:"global-styles",children:"Global styles"}),"\n",(0,i.jsxs)(n.p,{children:["The plugin exports a simple ",(0,i.jsx)(n.code,{children:"css"})," file to add minimum styles to the main ",(0,i.jsx)(n.code,{children:"GmvMap"})," component."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="main.ts" showLineNumbers {3}',children:"import { createGmapVuePlugin } from '@gmap-vue/v3';\nimport { createApp } from 'vue';\nimport '@gmap-vue/v3/dist/style.css';\nimport App from './App.vue';\nimport './style.css';\n\nconst app = createApp(App);\napp.use(createGmapVuePlugin({\n  load: { key: '...' },\n}));\napp.mount('#app');\n"})}),"\n",(0,i.jsx)(n.h2,{id:"dynamic-library-import",children:"Dynamic Library Import"}),"\n",(0,i.jsxs)(n.p,{children:["We follow the recommendation of the Google Maps team, who encourages to tuse the dynamic load of the library. For more information please follow this ",(0,i.jsx)(n.a,{href:"https://developers.google.com/maps/documentation/javascript/load-maps-js-api#dynamic-library-import",children:"link"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"migrating-from-version-for-vue-2",children:"Migrating from version for Vue 2"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["You can import the package from ",(0,i.jsx)(n.code,{children:"'@gmap-vue/v3'"})," instead of ",(0,i.jsx)(n.code,{children:"'gmap-vue'"})]}),"\n",(0,i.jsx)(n.li,{children:"The install fucntion of the plugin now is not exported by default, it is exported by name as we show below"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { createGmapVuePlugin } from '@gmap-vue/v3';\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["All components now are lazy loaded, that means if you don't use it in your code they are not include in your final bundle. This change makes the ",(0,i.jsx)(n.code,{children:"installComponents"})," property unuseful."]}),"\n",(0,i.jsxs)(n.li,{children:["The config proerty ",(0,i.jsx)(n.code,{children:"installComponents"})," was removed."]}),"\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"$gmapDefaultResizeBus"})," global property was removed."]}),"\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"customCallback"})," option is deprecated"]}),"\n",(0,i.jsxs)(n.li,{children:["We add a new global property ",(0,i.jsx)(n.code,{children:"$gmapOptions"})," it contains the final options object received by the plugin."]}),"\n",(0,i.jsxs)(n.li,{children:["All components now are prefixed with ",(0,i.jsx)(n.code,{children:"Gmv"}),", eg: ",(0,i.jsx)(n.code,{children:"GmvMap"})," in the case of the Map component."]}),"\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"initGoogleMapsApi"})," now is called ",(0,i.jsx)(n.code,{children:"googleMapsApiInitializer"})]}),"\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"MapElementFactory"})," now is called ",(0,i.jsx)(n.code,{children:"pluginComponentBuilder"})]}),"\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"GoogleMapsApi"})," now is only a global variable attached to the ",(0,i.jsx)(n.code,{children:"window"})," object"]}),"\n",(0,i.jsx)(n.li,{children:"All mixins were removed, now they are composable functions"}),"\n",(0,i.jsx)(n.li,{children:"Many of the old factories and helpers now are internal composable functions and they are not exposed by the plugin because, is not intended to be used."}),"\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"createGoogleMapsAPIInitializer"})," now is called ",(0,i.jsx)(n.code,{children:"googleMapsAPIInitializerFactory"}),", and it is an internal function of the plugin."]}),"\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"mapped-props"})," concept was removed from the plugin and now every component has its props defined on it."]}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"If we missed some of the bracking changes, feel free to open a PR to add them to this list."})})]})}function D(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(P,{...e})}):P(e)}},7252:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>l});var r=t(758);const i={},a=r.createContext(i);function s(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);