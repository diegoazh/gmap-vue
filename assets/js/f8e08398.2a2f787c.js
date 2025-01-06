"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3998],{9022:(n,e,o)=>{o.r(e),o.d(e,{assets:()=>d,contentTitle:()=>a,default:()=>c,frontMatter:()=>r,metadata:()=>i,toc:()=>p});const i=JSON.parse('{"id":"vue-2-version/guide/info-window","title":"info-window","description":"Description","source":"@site/docs/vue-2-version/guide/info-window.md","sourceDirName":"vue-2-version/guide","slug":"/vue-2-version/guide/info-window","permalink":"/gmap-vue/docs/vue-2-version/guide/info-window","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-2-version/guide/info-window.md","tags":[],"version":"current","frontMatter":{},"sidebar":"vue2Version","previous":{"title":"heatmap-layer","permalink":"/gmap-vue/docs/vue-2-version/guide/heatmap-layer"},"next":{"title":"kml-layer","permalink":"/gmap-vue/docs/vue-2-version/guide/kml-layer"}}');var t=o(6070),s=o(7252);const r={},a=void 0,d={},p=[{value:"Description",id:"description",level:2},{value:"Variables",id:"variables",level:2},{value:"Source code",id:"source-code",level:2},{value:"How to use it",id:"how-to-use-it",level:2},{value:"HTML examples",id:"html-examples",level:2},{value:"Test the component",id:"test-the-component",level:2}];function l(n){const e={a:"a",admonition:"admonition",code:"code",h2:"h2",mdxAdmonitionTitle:"mdxAdmonitionTitle",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{id:"description",children:"Description"}),"\n",(0,t.jsx)(e.p,{children:"This component helps you to create a info window in a marker."}),"\n",(0,t.jsxs)(e.p,{children:["For more information read the Google Maps documentation\nfor ",(0,t.jsx)(e.a,{href:"https://developers.google.com/maps/documentation/javascript/infowindows",children:"info window"}),"."]}),"\n",(0,t.jsxs)(e.p,{children:["It is exported with the name ",(0,t.jsx)(e.code,{children:"GmapInfoWindow"}),"."]}),"\n",(0,t.jsx)(e.h2,{id:"variables",children:"Variables"}),"\n",(0,t.jsxs)(e.p,{children:["This component save the original Info-Window object provided by Google Maps in a property called ",(0,t.jsx)(e.code,{children:"$infoWindowObject"}),", as\nthe example below."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"  this.$infoWindowObject = new google.maps.InfoWindow(...);\n"})}),"\n",(0,t.jsx)(e.h2,{id:"source-code",children:"Source code"}),"\n",(0,t.jsxs)(e.admonition,{type:"note",children:[(0,t.jsxs)(e.mdxAdmonitionTitle,{children:["Click to se the source code of ",(0,t.jsx)("code",{children:"info-window.vue"})," component"]}),(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-vue",children:"<template>\n  <div>\n    <div ref=\"flyaway\">\n      \x3c!-- so named because it will fly away to another component --\x3e\n      \x3c!-- @slot Used to set your info window.  --\x3e\n      <slot></slot>\n    </div>\n  </div>\n</template>\n\n<script>\nimport MapElementMixin from '../mixins/map-element';\nimport { infoWindowMappedProps } from '../utils/mapped-props-by-map-element';\nimport { bindEvents, bindProps, getPropsValues } from '../utils/helpers';\n\nexport default {\n  mixins: [MapElementMixin],\n  props: {\n    content: {\n      type: [String, Object],\n      default: undefined,\n    },\n    opened: {\n      type: Boolean,\n      default: true,\n    },\n    options: {\n      type: Object,\n      required: false,\n      default: undefined,\n    },\n    position: {\n      type: Object,\n    },\n    zIndex: {\n      type: Number,\n    },\n  },\n  methods: {\n    _openInfoWindow() {\n      if (this.opened) {\n        if (this.$markerObject !== null) {\n          this.$infoWindowObject.open(this.$map, this.$markerObject);\n        } else {\n          this.$infoWindowObject.open(this.$map);\n        }\n      } else {\n        this.$infoWindowObject.close();\n      }\n    },\n  },\n  inject: {\n    $markerPromise: {\n      default: null,\n    },\n  },\n  provide() {\n    const events = ['domready', 'closeclick', 'content_changed'];\n\n    // Infowindow needs this to be immediately available\n    const promise = await this.$mapPromise\n      .then((map) => {\n        this.$map = map;\n\n        // Initialize the maps with the given options\n        const initialOptions = {\n          ...this.options,\n          map,\n          ...getPropsValues(this, infoWindowMappedProps),\n        };\n\n        const {\n          options: extraOptions,\n          position,\n          ...finalOptions\n        } = initialOptions;\n\n        this.beforeCreate(finalOptions);\n\n        this.$infoWindowObject = new google.maps.InfoWindow(finalOptions);\n\n        bindProps(this, this.$infoWindowObject, infoWindowMappedProps);\n        bindEvents(this, this.$infoWindowObject, events);\n\n        return this.$infoWindowObject;\n      })\n      .catch((error) => {\n        throw error;\n      });\n\n    this.$infoWindowPromise = promise;\n    return { $infoWindowPromise: promise };\n  },\n  beforeCreate(options) {\n    options.content = this.$refs.flyaway;\n\n    if (this.$markerPromise) {\n      return this.$markerPromise.then((mo) => {\n        this.$markerObject = mo;\n        return mo;\n      });\n    }\n\n    // this return is to follow the consistent-return rule of eslint, https://eslint.org/docs/rules/consistent-return\n    return undefined;\n  },\n  afterCreate() {\n    this._openInfoWindow();\n    this.$watch('opened', () => {\n      this._openInfoWindow();\n    });\n  },\n  mounted() {\n    const el = this.$refs.flyaway;\n    el.parentNode.removeChild(el);\n  },\n  destroyed() {\n    // Note: not all Google Maps components support maps\n    if (this.$infoWindowObject && this.$infoWindowObject.setMap) {\n      this.$infoWindowObject.setMap(null);\n    }\n  },\n};\n<\/script>\n\n"})})]}),"\n",(0,t.jsxs)(e.p,{children:["If you need to know what are ",(0,t.jsx)(e.code,{children:"mappedProps"})," please read the general concepts of this\napplication ",(0,t.jsx)(e.a,{href:"/code/utils/mapped-props-by-map-element.html#autocompletemappedprops",children:"here"}),"."]}),"\n",(0,t.jsxs)(e.admonition,{type:"note",children:[(0,t.jsxs)(e.mdxAdmonitionTitle,{children:["Mapped Props of ",(0,t.jsx)("code",{children:"GmapInfoWindow"})," component"]}),(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"export const infoWindowMappedProps = {\n  content: {\n    type: Object,\n    twoWay: true,\n  },\n  options: {\n    type: Object,\n    required: false,\n    default() {\n      return {};\n    },\n  },\n  position: {\n    type: Object,\n    twoWay: true,\n  },\n  zIndex: {\n    type: Number,\n    twoWay: true,\n  },\n};\n"})})]}),"\n",(0,t.jsxs)(e.admonition,{type:"note",children:[(0,t.jsxs)(e.mdxAdmonitionTitle,{children:["Events bound with to way on ",(0,t.jsx)("code",{children:"GmapInfoWindow"})]}),(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"const events = ['domready', 'closeclick', 'content_changed'];\n"})})]}),"\n",(0,t.jsx)(e.h2,{id:"how-to-use-it",children:"How to use it"}),"\n",(0,t.jsxs)(e.admonition,{type:"warning",children:[(0,t.jsxs)(e.p,{children:["If you only need to display a simple text, from ",(0,t.jsx)(e.strong,{children:"v3.4.3"}),", we added a new prop called ",(0,t.jsx)(e.code,{children:"content"})," and you can use it to\npass data to the ",(0,t.jsx)(e.code,{children:"InfoWindow"})," component, it accepts HTML too but take care about it because ",(0,t.jsx)(e.strong,{children:"it has precedence"})," over\nthe slot ",(0,t.jsx)(e.strong,{children:"use only one of both options"}),"."]}),(0,t.jsx)(e.p,{children:"If you need to pass an entire block of HTML is better and simplest to use the default slot for it and leave the content\nprop empty. Doing that you have more flexibility and control over your HTML content."})]}),"\n",(0,t.jsx)(e.p,{children:"From v3.4.3"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-vue",children:'<template>\n  <gmap-map :center="center" :zoom="15" style="width: 100%; height: 500px">\n    <gmap-info-window\n      content="This is my info window content"\n      :options="infoOptions"\n      :position="infoWindowPos"\n      :opened="infoWinOpen"\n      @closeclick="infoWinOpen=false"\n    />\n\n    <gmap-marker\n      :key="i"\n      v-for="(m,i) in markers"\n      :position="m.position"\n      :clickable="true"\n      @click="toggleInfoWindow(m,i)"\n    >\n    </gmap-marker>\n  </gmap-map>\n</template>\n'})}),"\n",(0,t.jsx)(e.p,{children:"or use the default slot as below"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-vue",children:'<template>\n  <gmap-map :center="center" :zoom="15" style="width: 100%; height: 500px">\n    <gmap-info-window\n      :options="infoOptions"\n      :position="infoWindowPos"\n      :opened="infoWinOpen"\n      @closeclick="infoWinOpen=false"\n    >\n    </gmap-info-window>\n\n    <gmap-marker\n      :key="i"\n      v-for="(m,i) in markers"\n      :position="m.position"\n      :clickable="true"\n      @click="toggleInfoWindow(m,i)"\n    >\n    </gmap-marker>\n  </gmap-map>\n</template>\n'})}),"\n",(0,t.jsxs)(e.p,{children:["If you need to know the ",(0,t.jsx)(e.strong,{children:"API of this component"})," please read it ",(0,t.jsx)(e.a,{href:"/code/components/info-window.html",children:"here"}),"."]}),"\n",(0,t.jsx)(e.h2,{id:"html-examples",children:"HTML examples"}),"\n",(0,t.jsx)(e.admonition,{title:"HTML example",type:"note",children:(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-html",children:'<body>\n  <div id="root">\n    A basic example of using a single infowindow for 3 markers.\n\n    <gmap-map :center="center" :zoom="15" style="width: 100%; height: 500px">\n      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">\n      </gmap-info-window>\n\n      <gmap-marker :key="i" v-for="(m,i) in markers" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,i)"></gmap-marker>\n    </gmap-map>\n  </div>\n\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"><\/script>\n  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"><\/script>\n\n  <script>\n    Vue.use(GmapVue, {\n      load: {\n        key: \'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc\'\n      },\n    });\n\n    document.addEventListener(\'DOMContentLoaded\', function() {\n      new Vue({\n        el: \'#root\',\n        data: {\n          center: {\n            lat: 47.376332,\n            lng: 8.547511\n          },\n          infoWindowPos: null,\n          infoWinOpen: false,\n          currentMidx: null,\n\n          infoOptions: {\n          content: \'\',\n            //optional: offset infowindow so it visually sits nicely on top of our marker\n            pixelOffset: {\n              width: 0,\n              height: -35\n            }\n          },\n          markers: [{\n            position: {\n              lat: 47.376332,\n              lng: 8.547511\n            },\n            infoText: \'<strong>Marker 1</strong>\'\n          }, {\n            position: {\n              lat: 47.374592,\n              lng: 8.548867\n            },\n            infoText: \'<strong>Marker 2</strong>\'\n          }, {\n            position: {\n              lat: 47.379592,\n              lng: 8.549867\n            },\n            infoText: \'<strong>Marker 3</strong>\'\n          }]\n        },\n        methods: {\n          toggleInfoWindow: function(marker, idx) {\n            this.infoWindowPos = marker.position;\n            this.infoOptions.content = marker.infoText;\n\n            //check if its the same marker that was selected if yes toggle\n            if (this.currentMidx == idx) {\n              this.infoWinOpen = !this.infoWinOpen;\n            }\n\n            //if different marker set infowindow to open and reset current marker index\n            else {\n              this.infoWinOpen = true;\n              this.currentMidx = idx;\n            }\n          }\n        }\n      });\n    });\n  <\/script>\n</body>\n'})})}),"\n",(0,t.jsx)(e.h2,{id:"test-the-component",children:"Test the component"}),"\n",(0,t.jsx)(e.admonition,{title:"Click to see the HTML example in action",type:"note",children:(0,t.jsx)("eg-base",{children:(0,t.jsx)("eg-info-window",{})})})]})}function c(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(l,{...n})}):l(n)}},7252:(n,e,o)=>{o.d(e,{R:()=>r,x:()=>a});var i=o(758);const t={},s=i.createContext(t);function r(n){const e=i.useContext(s);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:r(n.components),i.createElement(s.Provider,{value:e},n.children)}}}]);