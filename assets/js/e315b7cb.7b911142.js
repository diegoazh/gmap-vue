"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6411],{6065:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>r,default:()=>c,frontMatter:()=>s,metadata:()=>a,toc:()=>l});const a=JSON.parse('{"id":"vue-2-version/guide/heatmap-layer","title":"heatmap-layer","description":"Description","source":"@site/docs/vue-2-version/guide/heatmap-layer.md","sourceDirName":"vue-2-version/guide","slug":"/vue-2-version/guide/heatmap-layer","permalink":"/gmap-vue/docs/vue-2-version/guide/heatmap-layer","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-2-version/guide/heatmap-layer.md","tags":[],"version":"current","frontMatter":{},"sidebar":"vue2Version","previous":{"title":"extra-examples","permalink":"/gmap-vue/docs/vue-2-version/guide/extra-examples"},"next":{"title":"info-window","permalink":"/gmap-vue/docs/vue-2-version/guide/info-window"}}');var o=t(6070),i=t(7252);const s={},r=void 0,p={},l=[{value:"Description",id:"description",level:2},{value:"Variables",id:"variables",level:2},{value:"Source code",id:"source-code",level:2},{value:"How to use it",id:"how-to-use-it",level:2},{value:"HTML examples",id:"html-examples",level:2},{value:"Test the component",id:"test-the-component",level:2}];function m(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",mdxAdmonitionTitle:"mdxAdmonitionTitle",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,o.jsx)(n.p,{children:"This components helps you to set a heat zone over the map."}),"\n",(0,o.jsxs)(n.p,{children:["For more information read the Google Maps documentation\nfor ",(0,o.jsx)(n.a,{href:"https://developers.google.com/maps/documentation/javascript/heatmaplayer",children:"heatmaplayer"})]}),"\n",(0,o.jsxs)(n.p,{children:["It is exported with the name ",(0,o.jsx)(n.code,{children:"GmapHeatmapLayer"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"variables",children:"Variables"}),"\n",(0,o.jsxs)(n.p,{children:["This component save the original heat map layer object provided by Google Maps in a property\ncalled ",(0,o.jsx)(n.code,{children:"$heatmapLayerObject"}),", as the example below."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:"  this.$heatmapLayerObject = new google.maps.visualization.HeatmapLayer(...);\n"})}),"\n",(0,o.jsx)(n.h2,{id:"source-code",children:"Source code"}),"\n",(0,o.jsxs)(n.admonition,{type:"note",children:[(0,o.jsxs)(n.mdxAdmonitionTitle,{children:["Click to se the source code of ",(0,o.jsx)("code",{children:"heatmap-layer.vue"})," component"]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-vue",children:"<script>\nimport MapElementMixin from '../mixins/map-element';\nimport { heatMapLayerMappedProps } from '../utils/mapped-props-by-map-element';\nimport { bindProps, getPropsValues, bindEvents } from '../utils/helpers';\n\nexport default {\n  mixins: [MapElementMixin],\n  props: {\n    options: {\n      type: Object,\n      default: () => {},\n    },\n    data: {\n      type: Array,\n    },\n  },\n  provide() {\n    const events = [];\n\n    // Infowindow needs this to be immediately available\n    const promise = await this.$mapPromise\n      .then((map) => {\n        this.$map = map;\n\n        // Initialize the maps with the given options\n        const initialOptions = {\n          ...this.options,\n          map: this.$map,\n          ...getPropsValues(this, heatMapLayerMappedProps),\n        };\n\n        const { options: extraOptions, ...finalOptions } = initialOptions;\n\n        this.$heatmapLayerObject = new google.maps.visualization.HeatmapLayer(\n          finalOptions\n        );\n\n        bindProps(this, this.$heatmapLayerObject, heatMapLayerMappedProps);\n        bindEvents(this, this.$heatmapLayerObject, events);\n\n        return this.$heatmapLayerObject;\n      })\n      .catch((error) => {\n        throw error;\n      });\n\n    this.$heatmapLayerPromise = promise;\n    return { $heatmapLayerPromise: promise };\n  },\n  destroyed() {\n    // Note: not all Google Maps components support maps\n    if (this.$heatmapLayerObject && this.$heatmapLayerObject.setMap) {\n      this.$heatmapLayerObject.setMap(null);\n    }\n  },\n};\n<\/script>\n\n"})})]}),"\n",(0,o.jsxs)(n.p,{children:["If you need to know what are ",(0,o.jsx)(n.code,{children:"mappedProps"})," please read the general concepts of this\napplication ",(0,o.jsx)(n.a,{href:"/code/utils/mapped-props-by-map-element.html#autocompletemappedprops",children:"here"}),"."]}),"\n",(0,o.jsxs)(n.admonition,{type:"note",children:[(0,o.jsxs)(n.mdxAdmonitionTitle,{children:["Mapped Props of ",(0,o.jsx)("code",{children:"GmapHeatmapLayer"})," component"]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:"\nexport const heatMapLayerMappedProps = {\n  options: {\n    type: Object,\n    twoWay: false,\n    default: () => {},\n  },\n  data: {\n    type: Array,\n    twoWay: true,\n  },\n};\n\n"})})]}),"\n",(0,o.jsx)(n.h2,{id:"how-to-use-it",children:"How to use it"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-vue",children:'<template>\n  <gmap-map\n    ref="mapRef"\n    :zoom="7"\n    :center="center"\n    map-type-id="roadmap"\n    style="width: 100%; height: 500px;"\n  >\n    <gmap-heatmap-layer\n      :data="[new google.maps.LatLng(37.782, -122.447)]"\n      :options="{maxIntensity: 120, dissipating: false}"\n    />\n  </gmap-map>\n</template>\n'})}),"\n",(0,o.jsx)(n.p,{children:"You also can use a computed property like below"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-vue",children:'<template>\n  <gmap-map\n    ref="mapRef"\n    :zoom="7"\n    :center="center"\n    map-type-id="roadmap"\n    style="width: 100%; height: 500px;"\n  >\n    <gmap-marker\n      v-for="(m, index) in markers"\n      :key="index"\n      :position="m.location"\n      :clickable="true"\n      :draggable="true"\n      @click="center=m.location"\n    />\n    <gmap-heatmap-layer\n      :data="markers"\n      :options="{maxIntensity: 120, dissipating: false}"\n    />\n  </gmap-map>\n</template>\n<script>\n  import { gmapApi } from \'gmap-vue\';\n\n  export default {\n    computed: {\n      google: gmapApi,\n      markers() {\n        if (this.google) {\n          return [\n            { location: new google.maps.LatLng({ lat: 3, lng: 101 }), weight: 100 },\n            { location: new google.maps.LatLng({ lat: 5, lng: 99 }), weight: 50  },\n            { location: new google.maps.LatLng({ lat: 6, lng: 97 }), weight: 80 }\n          ];\n        }\n        return [];\n      },\n    },\n  };\n<\/script>\n'})}),"\n",(0,o.jsx)(n.admonition,{type:"warning",children:(0,o.jsxs)(n.p,{children:["This component is one of the few components where you must use the Google ",(0,o.jsx)(n.code,{children:"LatLng"})," object to create the markers, you\ncan't use a generic object like ",(0,o.jsx)(n.code,{children:"{ lat: 0, lng: 0 }"})," to generate them."]})}),"\n",(0,o.jsxs)(n.p,{children:["If you need to know the ",(0,o.jsx)(n.strong,{children:"API of this component"})," please read it ",(0,o.jsx)(n.a,{href:"/code/components/heatmap-layer.html",children:"here"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"html-examples",children:"HTML examples"}),"\n",(0,o.jsx)(n.admonition,{title:"HTML example",type:"note",children:(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-html",children:'<body>\n  <div id="root">\n    <gmap-map\n      ref="mapRef"\n      :zoom="7"\n      :center="center"\n      map-type-id="roadmap"\n      style="width: 100%; height: 500px;"\n    >\n      <gmap-marker\n        v-for="(m, index) in markers"\n        :key="index"\n        :position="m.location"\n        :clickable="true"\n        :draggable="true"\n        @click="center=m.location"\n      />\n      <gmap-heatmap-layer\n        :data="markers"\n        :options="{maxIntensity: 120, dissipating: false}"\n      />\n    </gmap-map>\n  </div>\n\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"><\/script>\n  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"><\/script>\n\n  <script>\n    Vue.use(GmapVue, {\n      load: {\n        key: \'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc\',\n        libraries: \'visualization\'\n      }\n    });\n\n    document.addEventListener(\'DOMContentLoaded\', function() {\n      new Vue({\n        el: \'#root\',\n        data: {\n          center: { lat: 4.5, lng: 99 },\n          markers: [],\n        },\n        async mounted() {\n          await this.$gmapApiPromiseLazy();\n          this.markers = [\n            {\n              location: new google.maps.LatLng({ lat: 3, lng: 101 }),\n              weight: 100\n            },\n            {\n              location: new google.maps.LatLng({ lat: 5, lng: 99 }),\n              weight: 50\n            },\n            {\n              location: new google.maps.LatLng({ lat: 6, lng: 97 }),\n              weight: 80\n            }\n          ];\n        }\n      });\n    });\n  <\/script>\n</body>\n'})})}),"\n",(0,o.jsx)(n.h2,{id:"test-the-component",children:"Test the component"}),"\n",(0,o.jsx)(n.admonition,{title:"Click to see the HTML example in action",type:"note",children:(0,o.jsx)("eg-base",{libraries:"visualization",children:(0,o.jsx)("eg-heat-map-layer",{})})})]})}function c(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}},7252:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>r});var a=t(758);const o={},i=a.createContext(o);function s(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);