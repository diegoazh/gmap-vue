"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4279],{1171:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>i,contentTitle:()=>r,default:()=>a,frontMatter:()=>d,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"vue-2-version/code/components/autocomplete-input","title":"autocomplete-input","description":"Autocomplete component","source":"@site/docs/vue-2-version/code/components/autocomplete-input.mdx","sourceDirName":"vue-2-version/code/components","slug":"/vue-2-version/code/components/autocomplete-input","permalink":"/gmap-vue/docs/vue-2-version/code/components/autocomplete-input","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-2-version/code/components/autocomplete-input.mdx","tags":[],"version":"current","frontMatter":{"title":"autocomplete-input"},"sidebar":"vue2Version","previous":{"title":"Introduction","permalink":"/gmap-vue/docs/vue-2-version/code/"},"next":{"title":"circle-shape","permalink":"/gmap-vue/docs/vue-2-version/code/components/circle-shape"}}');var o=s(6070),c=s(7252);const d={title:"autocomplete-input"},r="GmapAutocomplete",i={},l=[{value:"Props",id:"props",level:2},{value:"Events",id:"events",level:2},{value:"Slots",id:"slots",level:2}];function h(e){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,c.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"gmapautocomplete",children:"GmapAutocomplete"})}),"\n",(0,o.jsxs)(t.blockquote,{children:["\n",(0,o.jsx)(t.p,{children:"Autocomplete component"}),"\n"]}),"\n",(0,o.jsxs)(t.p,{children:["[See](",(0,o.jsx)(t.a,{href:"/guide/autocomplete.html#source-code",children:"source code"}),")"]}),"\n",(0,o.jsx)(t.h2,{id:"props",children:"Props"}),"\n",(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:"Prop name"}),(0,o.jsx)(t.th,{children:"Description"}),(0,o.jsx)(t.th,{children:"Type"}),(0,o.jsx)(t.th,{children:"Values"}),(0,o.jsx)(t.th,{children:"Default"})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"bounds"}),(0,o.jsxs)(t.td,{children:["Map bounds this is an LatLngBounds",(0,o.jsx)("br",{}),"object builded with",(0,o.jsx)("br",{}),(0,o.jsx)(t.code,{children:"@value"})," new google.maps.LatLngBounds(...)",(0,o.jsx)("br",{}),(0,o.jsx)(t.code,{children:"@see"})," ",(0,o.jsx)(t.a,{href:"https://developers.google.com/maps/documentation/javascript/places-autocomplete#set-the-bounds-on-creation-of-the-autocomplete-object",children:"Map Bounds"})]}),(0,o.jsx)(t.td,{children:"object"}),(0,o.jsx)(t.td,{children:"-"}),(0,o.jsx)(t.td,{children:"undefined"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"componentRestrictions"}),(0,o.jsxs)(t.td,{children:["Restrict the search to a specific country",(0,o.jsx)("br",{}),(0,o.jsx)(t.code,{children:"@value"})," ",(0,o.jsx)(t.code,{children:"\\{[key: string]: string\\}"}),(0,o.jsx)("br",{}),(0,o.jsx)(t.code,{children:"@see"})," ",(0,o.jsx)(t.a,{href:"https://developers.google.com/maps/documentation/javascript/places-autocomplete#restrict-the-search-to-a-specific-country",children:"componentRestrictions"})]}),(0,o.jsx)(t.td,{children:"object"}),(0,o.jsx)(t.td,{children:"-"}),(0,o.jsx)(t.td,{children:"undefined"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"types"}),(0,o.jsxs)(t.td,{children:["Map types this is an array of strings",(0,o.jsx)("br",{}),(0,o.jsx)(t.code,{children:"@value"})," string[]",(0,o.jsx)("br",{}),(0,o.jsx)(t.code,{children:"@see"})," ",(0,o.jsx)(t.a,{href:"https://developers.google.com/maps/documentation/javascript/places-autocomplete#set-the-bounds-on-creation-of-the-autocomplete-object",children:"Map Bounds"})]}),(0,o.jsx)(t.td,{children:"array"}),(0,o.jsx)(t.td,{children:"-"}),(0,o.jsx)(t.td,{children:"undefined"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"selectFirstOnEnter"}),(0,o.jsx)(t.td,{children:"Select the first result in the list when press enter keyboard"}),(0,o.jsx)(t.td,{children:"boolean"}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:"true"}),", ",(0,o.jsx)(t.code,{children:"false"})]}),(0,o.jsx)(t.td,{children:"false"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"slotRefName"}),(0,o.jsx)(t.td,{children:"the unique ref set to the component passed in the slot input"}),(0,o.jsx)(t.td,{children:"string"}),(0,o.jsx)(t.td,{children:"-"}),(0,o.jsx)(t.td,{children:"'input'"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"childRefName"}),(0,o.jsxs)(t.td,{children:["The name of the ref to obtain the html input element",(0,o.jsx)("br",{}),"if its a child  of component in the slot input",(0,o.jsx)("br",{}),"very useful whe we use a component like v-text-field of vuetify",(0,o.jsx)("br",{}),"that has a 'input' ref pointing to the final html input element"]}),(0,o.jsx)(t.td,{children:"string"}),(0,o.jsx)(t.td,{children:"-"}),(0,o.jsx)(t.td,{children:"'input'"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"options"}),(0,o.jsxs)(t.td,{children:["Other options that you can pass to the Google Mapas",(0,o.jsx)("br",{}),"Autocomplete API",(0,o.jsx)("br",{}),(0,o.jsx)(t.code,{children:"@see"})," ",(0,o.jsx)(t.a,{href:"https://developers.google.com/maps/documentation/javascript/places-autocomplete#add-autocomplete",children:"Options"})]}),(0,o.jsx)(t.td,{children:"object"}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:"geocode"}),", ",(0,o.jsx)(t.code,{children:"address"}),", ",(0,o.jsx)(t.code,{children:"regions"})]}),(0,o.jsx)(t.td,{children:"undefined"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"setFieldsTo"}),(0,o.jsxs)(t.td,{children:["To avoid paying for data that you don't need,",(0,o.jsx)("br",{}),"be sure to use Autocomplete.setFields() to specify",(0,o.jsx)("br",{}),"only the place data that you will use.",(0,o.jsx)("br",{}),(0,o.jsx)(t.code,{children:"@see"})," ",(0,o.jsx)(t.a,{href:"https://developers.google.com/maps/documentation/javascript/places-autocomplete#get-place-information",children:"Place information"}),(0,o.jsx)("br",{}),(0,o.jsx)(t.code,{children:"@see"})," ",(0,o.jsx)(t.a,{href:"https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete.setFields",children:"setFields"}),(0,o.jsx)("br",{}),(0,o.jsx)(t.code,{children:"@see"})," ",(0,o.jsx)(t.a,{href:"https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult",children:"PlaceResult"})]}),(0,o.jsx)(t.td,{children:"array"}),(0,o.jsx)(t.td,{children:"-"}),(0,o.jsx)(t.td,{children:"null"})]})]})]}),"\n",(0,o.jsx)(t.h2,{id:"events",children:"Events"}),"\n",(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:"Event name"}),(0,o.jsx)(t.th,{children:"Properties"}),(0,o.jsx)(t.th,{children:"Description"})]})}),(0,o.jsx)(t.tbody,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"place_changed"}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.strong,{children:"place"})," ",(0,o.jsx)(t.code,{children:"object"})," - ",(0,o.jsx)(t.code,{children:"this.$autocomplete.getPlace()"})]}),(0,o.jsx)(t.td,{children:"Place change event"})]})})]}),"\n",(0,o.jsx)(t.h2,{id:"slots",children:"Slots"}),"\n",(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:"Name"}),(0,o.jsx)(t.th,{children:"Description"}),(0,o.jsx)(t.th,{children:"Bindings"})]})}),(0,o.jsx)(t.tbody,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"default"}),(0,o.jsxs)(t.td,{children:["Used to set your custom component for the input, eg: v-text-field.",(0,o.jsx)("br",{})]}),(0,o.jsx)(t.td,{children:(0,o.jsx)("br",{})})]})})]}),"\n",(0,o.jsx)(t.hr,{})]})}function a(e={}){const{wrapper:t}={...(0,c.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},7252:(e,t,s)=>{s.d(t,{R:()=>d,x:()=>r});var n=s(758);const o={},c=n.createContext(o);function d(e){const t=n.useContext(c);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:d(e.components),n.createElement(c.Provider,{value:t},e.children)}}}]);