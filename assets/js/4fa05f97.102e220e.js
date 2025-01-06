"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[827],{9985:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>d,metadata:()=>t,toc:()=>i});const t=JSON.parse('{"id":"vue-2-version/code/components/kml-layer","title":"kml-layer","description":"KmlLayer component","source":"@site/docs/vue-2-version/code/components/kml-layer.mdx","sourceDirName":"vue-2-version/code/components","slug":"/vue-2-version/code/components/kml-layer","permalink":"/gmap-vue/docs/vue-2-version/code/components/kml-layer","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-2-version/code/components/kml-layer.mdx","tags":[],"version":"current","frontMatter":{"title":"kml-layer"},"sidebar":"vue2Version","previous":{"title":"info-window","permalink":"/gmap-vue/docs/vue-2-version/code/components/info-window"},"next":{"title":"map-layer","permalink":"/gmap-vue/docs/vue-2-version/code/components/map-layer"}}');var s=n(6070),o=n(7252);const d={title:"kml-layer"},c="Kml-Layer",l={},i=[{value:"Props",id:"props",level:2}];function a(e){const r={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.header,{children:(0,s.jsx)(r.h1,{id:"kml-layer",children:"Kml-Layer"})}),"\n",(0,s.jsxs)(r.blockquote,{children:["\n",(0,s.jsx)(r.p,{children:"KmlLayer component"}),"\n"]}),"\n",(0,s.jsxs)(r.p,{children:["[See](",(0,s.jsx)(r.a,{href:"/guide/kml-layer.html#source-code",children:"source code"}),")\n,[See](",(0,s.jsx)(r.a,{href:"https://developers.google.com/maps/documentation/javascript/kmllayer",children:"Official documentation"}),")\n,[See](",(0,s.jsx)(r.a,{href:"https://developers.google.com/maps/documentation/javascript/reference/kml",children:"Official reference"}),")"]}),"\n",(0,s.jsx)(r.h2,{id:"props",children:"Props"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Prop name"}),(0,s.jsx)(r.th,{children:"Description"}),(0,s.jsx)(r.th,{children:"Type"}),(0,s.jsx)(r.th,{children:"Values"}),(0,s.jsx)(r.th,{children:"Default"})]})}),(0,s.jsxs)(r.tbody,{children:[(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"clickable"}),(0,s.jsxs)(r.td,{children:["If true, the layer receives mouse events. Default value is true.",(0,s.jsx)("br",{}),(0,s.jsx)(r.code,{children:"@see"})," ",(0,s.jsx)(r.a,{href:"https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.clickable",children:"KmlLayerOptions interface"})]}),(0,s.jsx)(r.td,{children:"boolean"}),(0,s.jsx)(r.td,{children:"-"}),(0,s.jsx)(r.td,{children:"true"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"map"}),(0,s.jsxs)(r.td,{children:["Specifies the Map on which to render the KmlLayer. You can hide a KmlLayer by setting this value to null within the setMap() method",(0,s.jsx)("br",{}),(0,s.jsx)(r.code,{children:"@see"})," ",(0,s.jsx)(r.a,{href:"https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.map",children:"KmlLayerOptions interface"})]}),(0,s.jsx)(r.td,{children:"object"}),(0,s.jsx)(r.td,{children:"-"}),(0,s.jsx)(r.td,{children:"undefined"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"preserveViewport"}),(0,s.jsxs)(r.td,{children:["By default, the input map is centered and zoomed to the bounding box of the contents of the layer. If this option is set to true, the viewport is",(0,s.jsx)("br",{}),"left unchanged, unless the map's center and zoom were never set.",(0,s.jsx)("br",{}),(0,s.jsx)(r.code,{children:"@see"})," ",(0,s.jsx)(r.a,{href:"https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.preserveViewport",children:"KmlLayerOptions interface"})]}),(0,s.jsx)(r.td,{children:"boolean"}),(0,s.jsx)(r.td,{children:"-"}),(0,s.jsx)(r.td,{children:"false"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"screenOverlays"}),(0,s.jsxs)(r.td,{children:["Whether to render the screen overlays. Default true.",(0,s.jsx)("br",{}),(0,s.jsx)(r.code,{children:"@see"})," ",(0,s.jsx)(r.a,{href:"https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.screenOverlays",children:"KmlLayerOptions interface"})]}),(0,s.jsx)(r.td,{children:"boolean"}),(0,s.jsx)(r.td,{children:"-"}),(0,s.jsx)(r.td,{children:"false"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"suppressInfoWindows"}),(0,s.jsxs)(r.td,{children:["Suppress the rendering of info windows when layer features are clicked.",(0,s.jsx)("br",{}),(0,s.jsx)(r.code,{children:"@see"})," ",(0,s.jsx)(r.a,{href:"https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.suppressInfoWindows",children:"KmlLayerOptions interface"})]}),(0,s.jsx)(r.td,{children:"boolean"}),(0,s.jsx)(r.td,{children:"-"}),(0,s.jsx)(r.td,{children:"undefined"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"url"}),(0,s.jsxs)(r.td,{children:["The URL of the KML document to display.",(0,s.jsx)("br",{}),(0,s.jsx)(r.code,{children:"@see"})," ",(0,s.jsx)(r.a,{href:"https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.url",children:"KmlLayerOptions interface"})]}),(0,s.jsx)(r.td,{children:"string"}),(0,s.jsx)(r.td,{children:"-"}),(0,s.jsx)(r.td,{children:"''"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"zIndex"}),(0,s.jsxs)(r.td,{children:["The z-index of the layer.",(0,s.jsx)("br",{}),(0,s.jsx)(r.code,{children:"@see"})," ",(0,s.jsx)(r.a,{href:"https://developers.google.com/maps/documentation/javascript/reference/kml#KmlLayerOptions.zIndex",children:"KmlLayerOptions interface"})]}),(0,s.jsx)(r.td,{children:"number"}),(0,s.jsx)(r.td,{children:"-"}),(0,s.jsx)(r.td,{children:"undefined"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"options"}),(0,s.jsxs)(r.td,{children:["More options that you can pass to the component",(0,s.jsx)("br",{}),(0,s.jsx)(r.code,{children:"@value"})," boolean"]}),(0,s.jsx)(r.td,{children:"object"}),(0,s.jsx)(r.td,{children:"-"}),(0,s.jsx)(r.td,{children:"undefined"})]})]})]}),"\n",(0,s.jsx)(r.hr,{})]})}function h(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},7252:(e,r,n)=>{n.d(r,{R:()=>d,x:()=>c});var t=n(758);const s={},o=t.createContext(s);function d(e){const r=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),t.createElement(o.Provider,{value:r},e.children)}}}]);