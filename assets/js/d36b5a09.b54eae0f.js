"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3215],{563:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>d,frontMatter:()=>s,metadata:()=>i,toc:()=>a});const i=JSON.parse('{"id":"vue-2-version/guide/circle","title":"circle","description":"Description","source":"@site/docs/vue-2-version/guide/circle.md","sourceDirName":"vue-2-version/guide","slug":"/vue-2-version/guide/circle","permalink":"/gmap-vue/docs/vue-2-version/guide/circle","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-2-version/guide/circle.md","tags":[],"version":"current","frontMatter":{},"sidebar":"vue2Version","previous":{"title":"cdn","permalink":"/gmap-vue/docs/vue-2-version/guide/cdn"},"next":{"title":"cluster","permalink":"/gmap-vue/docs/vue-2-version/guide/cluster"}}');var o=t(6070),r=t(7252);const s={},c=void 0,l={},a=[{value:"Description",id:"description",level:2},{value:"Variables",id:"variables",level:2},{value:"Source code",id:"source-code",level:2},{value:"How to use it",id:"how-to-use-it",level:2},{value:"HTML examples",id:"html-examples",level:2},{value:"Test the component",id:"test-the-component",level:2}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",mdxAdmonitionTitle:"mdxAdmonitionTitle",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,o.jsx)(n.p,{children:"This component helps you to create a circle on Google Maps API."}),"\n",(0,o.jsxs)(n.p,{children:["For more information read the Google Maps documentation\nfor ",(0,o.jsx)(n.a,{href:"https://developers.google.com/maps/documentation/javascript/examples/circle-simple#maps_circle_simple-javascript",children:"circles"}),"\n."]}),"\n",(0,o.jsxs)(n.p,{children:["It is exported with the name ",(0,o.jsx)(n.code,{children:"GmapCircle"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"variables",children:"Variables"}),"\n",(0,o.jsxs)(n.p,{children:["This component save the original circle object provided by Google Maps in a property called ",(0,o.jsx)(n.code,{children:"$circleObject"}),", as the\nexample below."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:"this.$circleObject = new google.maps.Circle(...);\n"})}),"\n",(0,o.jsx)(n.h2,{id:"source-code",children:"Source code"}),"\n",(0,o.jsxs)(n.admonition,{type:"note",children:[(0,o.jsxs)(n.mdxAdmonitionTitle,{children:["Click to se the source code of ",(0,o.jsx)("code",{children:"circle.vue"})," component"]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-vue",children:"<script>\nimport mapElementMixin from '../mixins/map-element';\nimport { circleMappedProps } from '../utils/mapped-props-by-map-element';\nimport { bindEvents, getPropsValues, bindProps } from '../utils/helpers';\n\nexport default {\n  mixins: [mapElementMixin],\n  props: {\n    center: {\n      type: Object,\n      required: true,\n    },\n    radius: {\n      type: Number,\n      default: 10,\n    },\n    clickable: {\n      type: Boolean,\n      default: false,\n    },\n    draggable: {\n      type: Boolean,\n      default: false,\n    },\n    editable: {\n      type: Boolean,\n      default: false,\n    },\n    fillColor: {\n      type: String,\n      default: '',\n    },\n    fillOpacity: {\n      type: Number,\n      default: 1,\n    },\n    strokeColor: {\n      type: String,\n      default: '',\n    },\n    strokeOpacity: {\n      type: Number,\n      default: 1,\n    },\n    strokePosition: {\n      type: Number,\n      default: 0,\n    },\n    strokeWeight: {\n      type: Number,\n      default: 1,\n    },\n    visible: {\n      type: Boolean,\n      default: true,\n    },\n    options: {\n      type: Object,\n    },\n  },\n  render() {\n    return '';\n  },\n  async provide() {\n    // events to bind with toWay\n    const events = [\n      'click',\n      'dblclick',\n      'drag',\n      'dragend',\n      'dragstart',\n      'mousedown',\n      'mousemove',\n      'mouseout',\n      'mouseover',\n      'mouseup',\n      'rightclick',\n    ];\n\n    // Infowindow needs this to be immediately available\n    const promise = this.$mapPromise\n      .then((map) => {\n        this.$map = map;\n\n        // Initialize the maps with the given options\n        const initialOptions = {\n          ...this.options,\n          map,\n          ...getPropsValues(this, circleMappedProps),\n        };\n        const { options: extraOptions, ...finalOptions } = initialOptions;\n        this.$circleObject = new google.maps.Circle(finalOptions);\n        bindProps(this, this.$circleObject, circleMappedProps);\n        bindEvents(this, this.$circleObject, events);\n\n        return this.$circleObject;\n      })\n      .catch((error) => {\n        throw error;\n      });\n\n    this.$circlePromise = promise;\n    return { $circlePromise: promise };\n  },\n  destroyed() {\n    // Note: not all Google Maps components support maps\n    if (this.$circleObject && this.$circleObject.setMap) {\n      this.$circleObject.setMap(null);\n    }\n  },\n};\n<\/script>\n\n"})})]}),"\n",(0,o.jsxs)(n.p,{children:["If you need to know what are ",(0,o.jsx)(n.code,{children:"mappedProps"})," please read the general concepts of this\napplication ",(0,o.jsx)(n.a,{href:"/code/utils/mapped-props-by-map-element.html#autocompletemappedprops",children:"here"}),"."]}),"\n",(0,o.jsxs)(n.admonition,{type:"note",children:[(0,o.jsxs)(n.mdxAdmonitionTitle,{children:["Mapped Props of ",(0,o.jsx)("code",{children:"GmapCircle"})," component"]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:"export const circleMappedProps = {\n  center: {\n    type: Object,\n    twoWay: true,\n    required: true,\n  },\n  radius: {\n    type: Number,\n    twoWay: true,\n  },\n  clickable: {\n    type: Boolean,\n    noBind: true,\n  },\n  draggable: {\n    type: Boolean,\n    default: false,\n  },\n  editable: {\n    type: Boolean,\n    default: false,\n  },\n  fillColor: {\n    type: String,\n    noBind: true,\n  },\n  fillOpacity: {\n    type: Number,\n    noBind: true,\n  },\n  strokeColor: {\n    type: String,\n    noBind: true,\n  },\n  strokeOpacity: {\n    type: Number,\n    noBind: true,\n  },\n  strokePosition: {\n    type: Number,\n    noBind: true,\n  },\n  strokeWeight: {\n    type: Number,\n    noBind: true,\n  },\n  visible: {\n    type: Boolean,\n  },\n  options: {\n    type: Object,\n    twoWay: false,\n  },\n};\n"})})]}),"\n",(0,o.jsxs)(n.admonition,{type:"note",children:[(0,o.jsxs)(n.mdxAdmonitionTitle,{children:["Events bound with to way on ",(0,o.jsx)("code",{children:"GmapCircle"})]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-javascript",children:"const events = [\n  'click',\n  'dblclick',\n  'drag',\n  'dragend',\n  'dragstart',\n  'mousedown',\n  'mousemove',\n  'mouseout',\n  'mouseover',\n  'mouseup',\n  'rightclick',\n];\n"})})]}),"\n",(0,o.jsx)(n.h2,{id:"how-to-use-it",children:"How to use it"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-vue",children:'<template>\n  <gmap-map :center="center" :zoom="7" style="width: 100%; height: 500px">\n    \x3c!-- you can use the auto close form if you want --\x3e\n    <gmap-circle />\n  </gmap-map>\n</template>\n'})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-vue",children:'<template>\n  <gmap-map :center="center" :zoom="7" style="width: 100%; height: 500px">\n    \x3c!-- or --\x3e\n    <gmap-circle></gmap-circle>\n  </gmap-map>\n</template>\n'})}),"\n",(0,o.jsxs)(n.p,{children:["If you need to know the ",(0,o.jsx)(n.strong,{children:"API of this component"})," please read it ",(0,o.jsx)(n.a,{href:"/code/components/circle-shape.html",children:"here"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"html-examples",children:"HTML examples"}),"\n",(0,o.jsxs)(n.admonition,{title:"Simple circle example",type:"note",children:[(0,o.jsxs)(n.p,{children:["We use the following ",(0,o.jsx)(n.a,{href:"https://developers.google.com/maps/documentation/javascript/examples/circle-simple?hl=en",children:"example"}),"\nof the google documentation."]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-html",children:'<body>\n  <div id="root">\n    <gmap-map\n      :center="center"\n      :zoom="4"\n      style="width: 100%; height: 500px"\n      ref="map"\n    >\n      <gmap-circle\n        v-if="radius"\n        :editable="editable"\n        :draggable="draggable"\n        :radius="radius"\n        :center="circleCenter"\n        :options="options"\n        ref="circle"\n      >\n      </gmap-circle>\n    </gmap-map>\n  </div>\n\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"><\/script>\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.js"><\/script>\n  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"><\/script>\n\n  <script>\n    Vue.use(GmapVue, {\n      load: {\n        key: \'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc\',\n        libraries: \'places\',\n      },\n    });\n\n    document.addEventListener(\'DOMContentLoaded\', function() {\n      window.rectangleExample = new Vue({\n        el: \'#root\',\n        data: {\n          center: { lat: 40.714, lng: -74.005 },\n          editable: true,\n          draggable: true,\n          population: 8405837,\n          circleCenter: { lat: 40.714, lng: -74.005 },\n          options: {\n            strokeColor: "#FF0000",\n            strokeOpacity: 0.8,\n            strokeWeight: 2,\n            fillColor: "#FF0000",\n            fillOpacity: 0.35,\n          },\n        },\n        computed: {\n          radius() {\n            return Math.sqrt(this.population) * 100;\n          },\n        },\n      });\n    });\n  <\/script>\n</body>\n'})})]}),"\n",(0,o.jsx)(n.h2,{id:"test-the-component",children:"Test the component"}),"\n",(0,o.jsx)("eg-base",{children:(0,o.jsx)("eg-circle",{})})]})}function d(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},7252:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>c});var i=t(758);const o={},r=i.createContext(o);function s(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);