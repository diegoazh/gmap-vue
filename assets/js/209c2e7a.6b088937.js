"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1758],{5395:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>t,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"vue-2-version/code/introduction","title":"GmapVue","description":"Documentation","source":"@site/docs/vue-2-version/code/README.md","sourceDirName":"vue-2-version/code","slug":"/vue-2-version/code/","permalink":"/gmap-vue/docs/vue-2-version/code/","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-2-version/code/README.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"id":"introduction","sidebar_position":1,"sidebar_label":"Introduction"},"sidebar":"vue2Version","previous":{"title":"API","permalink":"/gmap-vue/docs/category/api"},"next":{"title":"autocomplete-input","permalink":"/gmap-vue/docs/vue-2-version/code/components/autocomplete-input"}}');var l=i(6070),o=i(7252);const t={id:"introduction",sidebar_position:1,sidebar_label:"Introduction"},r="GmapVue",a={},d=[{value:"Documentation",id:"documentation",level:2},{value:"Vue-2 port of vue-google-maps",id:"vue-2-port-of-vue-google-maps",level:2},{value:"CONTRIBUTORS NEEDED!",id:"contributors-needed",level:2},{value:"Breaking changes",id:"breaking-changes",level:2},{value:"v3.0.0",id:"v300",level:3},{value:"v2.0.0",id:"v200",level:3},{value:"Installation",id:"installation",level:2},{value:"npm",id:"npm",level:3},{value:"yarn",id:"yarn",level:3},{value:"Manually",id:"manually",level:3},{value:"jsdelivr",id:"jsdelivr",level:3},{value:"unpkg",id:"unpkg",level:3}];function c(e){const n={a:"a",admonition:"admonition",code:"code",del:"del",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"gmapvue",children:"GmapVue"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{href:"https://www.jsdelivr.com/package/npm/gmap-vue",children:(0,l.jsx)(n.img,{src:"https://data.jsdelivr.com/v1/package/npm/gmap-vue/badge",alt:""})})}),"\n",(0,l.jsx)(n.h2,{id:"documentation",children:"Documentation"}),"\n",(0,l.jsx)(n.p,{children:"The new documentation page is ready and it contains all examples for any component in the plugin."}),"\n",(0,l.jsx)(n.p,{children:"You can use your own gmap key in order to test it in the live example section."}),"\n",(0,l.jsx)(n.p,{children:"We have planed improve and grow all required documentation about the plugin."}),"\n",(0,l.jsxs)(n.p,{children:["Please follow next link to our ",(0,l.jsx)(n.a,{href:"https://diegoazh.github.io/gmap-vue/",children:"documentation"}),"."]}),"\n",(0,l.jsx)(n.h2,{id:"vue-2-port-of-vue-google-maps",children:"Vue-2 port of vue-google-maps"}),"\n",(0,l.jsx)(n.p,{children:"This is a fork of the popular vue2-google-maps. As the author of the library no longer commit to maintain the project, we forked it to develop and maintain the project."}),"\n",(0,l.jsx)(n.h2,{id:"contributors-needed",children:"CONTRIBUTORS NEEDED!"}),"\n",(0,l.jsxs)(n.p,{children:["If you have time to contribute to a rather frequently used library, feel free to make a PR!\nFor more background, please refer to ",(0,l.jsx)(n.a,{href:"https://github.com/xkjyeah/vue-google-maps/issues/514",children:"this issue"}),"."]}),"\n",(0,l.jsx)(n.p,{children:"What's urgently needed are:"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsx)(n.li,{children:"Better automated tests"}),"\n",(0,l.jsx)(n.li,{children:"Better integration tests with the popular frameworks, especially Nuxt and Vue template"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.del,{children:"Better documentation (examples, recommendations)"})}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"The above three will go a long way to keeping the project maintainable and contributable, and will address many of the open issues."}),"\n",(0,l.jsx)(n.h2,{id:"breaking-changes",children:"Breaking changes"}),"\n",(0,l.jsx)(n.h3,{id:"v300",children:"v3.0.0"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"autobindAllEvents"})," config option was renamed to ",(0,l.jsx)(n.code,{children:"autoBindAllEvents"})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"vueGoogleMapsInit"})," name was renamed to ",(0,l.jsx)(n.code,{children:"GoogleMapsCallback"})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"gmapApi"})," function was renamed to ",(0,l.jsx)(n.code,{children:"getGoogleMapsAPI"})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"MapElementMixin"})," now is exported from ",(0,l.jsx)(n.code,{children:"components"})," object instead of ",(0,l.jsx)(n.code,{children:"helpers"})," object"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"customCallback"})," config option was added to reuse existing Google Maps API that already loaded, eg from an HTML file"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"v200",children:"v2.0.0"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:["All components were rewriting in SFC (",(0,l.jsx)(n.code,{children:".vue"}),")"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"MarkerCluster"})," was renamed to ",(0,l.jsx)(n.code,{children:"Cluster"})]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"@google/markerclustererplus"})," was replace for ",(0,l.jsx)(n.code,{children:"@googlemaps/markerclusterer"})]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"The plugin exports two main objects:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"components"}),": it has all components and mountable mixin)"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"helpers"}),": it has promise lazy factory function, gmapApi function and map element mixin"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"The plugin now exports by default the install function, this means that you can do the following"}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:["From ",(0,l.jsx)(n.strong,{children:"v2.0.0"})," and above, the ",(0,l.jsx)(n.code,{children:"autocomplete"})," component uses the ",(0,l.jsx)(n.code,{children:"default"})," slot instead of the named ",(0,l.jsx)(n.code,{children:"input"})," slot, from v1.5.0 the ",(0,l.jsx)(n.code,{children:"input"})," slot on the autocomplete component still works."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:"import GmapVue from 'gmap-vue';\n"})}),"\n",(0,l.jsx)(n.p,{children:"instead of"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:"import * as GmapVue from 'gmap-vue';\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,l.jsx)(n.h3,{id:"npm",children:"npm"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-shell",children:"npm install gmap-vue --save\n"})}),"\n",(0,l.jsx)(n.h3,{id:"yarn",children:"yarn"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-shell",children:"yarn add gmap-vue\n"})}),"\n",(0,l.jsx)(n.h3,{id:"manually",children:"Manually"}),"\n",(0,l.jsxs)(n.p,{children:["Just download ",(0,l.jsx)(n.code,{children:"dist/gmap-vue.js"})," file and include it from your HTML."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'<script src="./gmap-vue.js"><\/script>\n'})}),"\n",(0,l.jsx)(n.h3,{id:"jsdelivr",children:"jsdelivr"}),"\n",(0,l.jsxs)(n.p,{children:["You can use a free CDN like ",(0,l.jsx)(n.a,{href:"https://www.jsdelivr.com",children:"jsdelivr"})," to include this plugin in your html file"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'<script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"><\/script>\n'})}),"\n",(0,l.jsx)(n.h3,{id:"unpkg",children:"unpkg"}),"\n",(0,l.jsxs)(n.p,{children:["You can use a free CDN like ",(0,l.jsx)(n.a,{href:"https://unpkg.com",children:"unpkg"})," to include this plugin in your html file"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'<script src="https://unpkg.com/gmap-vue@1.2.2/dist/gmap-vue.js"><\/script>\n'})}),"\n",(0,l.jsx)(n.admonition,{type:"warning",children:(0,l.jsxs)(n.p,{children:["Be aware that if you use this method, you cannot use TitleCase for your components and your attributes.\nThat is, instead of writing ",(0,l.jsx)(n.code,{children:"<GmapMap>"}),", you need to write ",(0,l.jsx)(n.code,{children:"<gmap-map>"}),"."]})}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.a,{href:"https://diegoazh.github.io/gmap-vue/guide/",children:"Live example"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(c,{...e})}):c(e)}},7252:(e,n,i)=>{i.d(n,{R:()=>t,x:()=>r});var s=i(758);const l={},o=s.createContext(l);function t(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:t(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);