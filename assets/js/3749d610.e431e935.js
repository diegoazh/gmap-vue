"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7277],{6219:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>o,toc:()=>c});const o=JSON.parse('{"id":"vue-2-version/guide/marker","title":"marker","description":"Description","source":"@site/docs/vue-2-version/guide/marker.md","sourceDirName":"vue-2-version/guide","slug":"/vue-2-version/guide/marker","permalink":"/gmap-vue/docs/vue-2-version/guide/marker","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-2-version/guide/marker.md","tags":[],"version":"current","frontMatter":{},"sidebar":"vue2Version","previous":{"title":"map","permalink":"/gmap-vue/docs/vue-2-version/guide/map"},"next":{"title":"place-input","permalink":"/gmap-vue/docs/vue-2-version/guide/place-input"}}');var r=t(6070),i=t(7252);const s={},a=void 0,l={},c=[{value:"Description",id:"description",level:2},{value:"Variables",id:"variables",level:2},{value:"Source code",id:"source-code",level:2},{value:"<code>update:position</code> event (from v3.1.0)",id:"updateposition-event-from-v310",level:3},{value:"How to use it",id:"how-to-use-it",level:2},{value:"HTML examples",id:"html-examples",level:2},{value:"Test the component",id:"test-the-component",level:2}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",mdxAdmonitionTitle:"mdxAdmonitionTitle",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,r.jsx)(n.p,{children:"This component helps you to create a marker in the map."}),"\n",(0,r.jsxs)(n.p,{children:["For more information read the Google Maps documentation\nfor ",(0,r.jsx)(n.a,{href:"https://developers.google.com/maps/documentation/javascript/markers",children:"markers"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["It is exported with the name ",(0,r.jsx)(n.code,{children:"GmapMarker"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"variables",children:"Variables"}),"\n",(0,r.jsxs)(n.p,{children:["This component save the original marker object provided by Google Maps in a property called ",(0,r.jsx)(n.code,{children:"$kmlLayerObject"}),", as the\nexample below."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"  this.$markerObject = new google.maps.Marker(...);\n"})}),"\n",(0,r.jsx)(n.h2,{id:"source-code",children:"Source code"}),"\n",(0,r.jsxs)(n.admonition,{type:"note",children:[(0,r.jsxs)(n.mdxAdmonitionTitle,{children:["Click to se the source code of ",(0,r.jsx)("code",{children:"marker-icon.vue"})," component"]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-vue",children:"<script>\nimport MapElementMixin from '../mixins/map-element';\nimport { getPropsValues, bindEvents, bindProps } from '../utils/helpers';\nimport { markerMappedProps } from '../utils/mapped-props-by-map-element';\n\nexport default {\n  name: 'MarkerIcon',\n  mixins: [MapElementMixin],\n  inject: {\n    $clusterPromise: {\n      default: null,\n    },\n  },\n  provide() {\n    const events = [\n      'click',\n      'rightclick',\n      'dblclick',\n      'drag',\n      'dragstart',\n      'dragend',\n      'mouseup',\n      'mousedown',\n      'mouseover',\n      'mouseout',\n    ];\n\n    const promise = this.$mapPromise\n      .then((map) => {\n        this.$map = map;\n\n        // Initialize the maps with the given options\n        const initialOptions = {\n          // TODO: analyze the below line because I think it can be removed\n          ...this.options,\n          map,\n          ...getPropsValues(this, markerMappedProps),\n        };\n\n        const { options: extraOptions, ...finalOptions } = initialOptions;\n\n        if (this.$clusterPromise) {\n          finalOptions.map = null;\n        }\n\n        this.$markerObject = new google.maps.Marker(finalOptions);\n\n        bindProps(this, this.$markerObject, markerMappedProps);\n        bindEvents(this, this.$markerObject, events);\n\n        // From v3.1.0\n        this.$markerObject.addListener('dragend', () => {\n          const newPosition = this.$markerObject.getPosition();\n\n          this.$emit('update:position', {\n            lat: newPosition.lat(),\n            lng: newPosition.lng(),\n          });\n        });\n\n        if (this.$clusterPromise) {\n          this.$clusterPromise.then((clusterObject) => {\n            clusterObject.addMarker(this.$markerObject);\n            this.$clusterObject = clusterObject;\n          });\n        }\n\n        return this.$markerObject;\n      })\n      .catch((error) => {\n        throw error;\n      });\n\n    this.$markerPromise = promise;\n    return { $markerPromise: promise };\n  },\n  props: {\n    animation: {\n      type: Number,\n      default: undefined,\n    },\n    attribution: {\n      type: Object,\n      default: undefined,\n    },\n    clickable: {\n      type: Boolean,\n      default: true,\n    },\n    cursor: {\n      type: String,\n      default: undefined,\n    },\n    draggable: {\n      type: Boolean,\n      default: false,\n    },\n    icon: {\n      type: [String, Object],\n      default: undefined,\n    },\n    label: {\n      type: [String, Object],\n      default: undefined,\n    },\n    opacity: {\n      type: Number,\n      default: 1,\n    },\n    options: {\n      type: Object,\n      default: undefined,\n    },\n    place: {\n      type: Object,\n      default: undefined,\n    },\n    position: {\n      type: Object,\n      default: undefined,\n    },\n    shape: {\n      type: Object,\n      default: undefined,\n    },\n    title: {\n      type: String,\n      default: undefined,\n    },\n    visible: {\n      type: Boolean,\n      default: true,\n    },\n    zIndex: {\n      type: Number,\n      default: undefined,\n    },\n  },\n  destroyed() {\n    if (!this.$markerObject) {\n      return;\n    }\n\n    if (this.$clusterObject) {\n      // Repaint will be performed in `updated()` of cluster\n      this.$clusterObject.removeMarker(this.$markerObject, true);\n    } else if (this.$markerObject && this.$markerObject.setMap) {\n      this.$markerObject.setMap(null);\n    }\n  },\n  render(h) {\n    if (!this.$slots.default || this.$slots.default.length === 0) {\n      return '';\n    }\n    if (this.$slots.default.length === 1) {\n      // So that infowindows can have a marker parent\n      return this.$slots.default[0];\n    }\n\n    /**\n     * @slot Default slot of the component.\n     */\n    return h('div', this.$slots.default);\n  },\n};\n<\/script>\n"})})]}),"\n",(0,r.jsxs)(n.p,{children:["If you need to know what are ",(0,r.jsx)(n.code,{children:"mappedProps"})," please read the general concepts of this\napplication ",(0,r.jsx)(n.a,{href:"/code/utils/mapped-props-by-map-element.html#autocompletemappedprops",children:"here"}),"."]}),"\n",(0,r.jsxs)(n.admonition,{type:"note",children:[(0,r.jsxs)(n.mdxAdmonitionTitle,{children:["Mapped Props of ",(0,r.jsx)("code",{children:"GmapMarker"})," component"]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"export const markerMappedProps = {\n  animation: {\n    twoWay: true,\n    type: Number,\n  },\n  attribution: {\n    type: Object,\n  },\n  clickable: {\n    type: Boolean,\n    twoWay: true,\n    default: true,\n  },\n  cursor: {\n    type: String,\n    twoWay: true,\n  },\n  draggable: {\n    type: Boolean,\n    twoWay: true,\n    default: false,\n  },\n  icon: {\n    twoWay: true,\n  },\n  label: {},\n  opacity: {\n    type: Number,\n    default: 1,\n  },\n  options: {\n    type: Object,\n  },\n  place: {\n    type: Object,\n  },\n  position: {\n    type: Object,\n    twoWay: true,\n  },\n  shape: {\n    type: Object,\n    twoWay: true,\n  },\n  title: {\n    type: String,\n    twoWay: true,\n  },\n  zIndex: {\n    type: Number,\n    twoWay: true,\n  },\n  visible: {\n    twoWay: true,\n    default: true,\n  },\n};\n"})})]}),"\n",(0,r.jsxs)(n.admonition,{type:"note",children:[(0,r.jsxs)(n.mdxAdmonitionTitle,{children:["Events bound with to way on ",(0,r.jsx)("code",{children:"GmapMarker"})]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"const events = [\n  'click',\n  'rightclick',\n  'dblclick',\n  'drag',\n  'dragstart',\n  'dragend',\n  'mouseup',\n  'mousedown',\n  'mouseover',\n  'mouseout',\n];\n"})}),(0,r.jsxs)(n.h3,{id:"updateposition-event-from-v310",children:[(0,r.jsx)(n.code,{children:"update:position"})," event (from v3.1.0)"]}),(0,r.jsxs)(n.p,{children:["From version 3.1.0 we emit the ",(0,r.jsx)(n.code,{children:"update:position"})," when the Google Maps API fires the ",(0,r.jsx)(n.code,{children:"dragend"})," event, it returns an\nobject in the form ",(0,r.jsx)(n.code,{children:"{ lat: 10, lng: 10 }"}),", in this way we start preparing the plugin to migrate to Vue v3 in a near\nfuture and can use ",(0,r.jsx)(n.strong,{children:"v-model"})," on the ",(0,r.jsx)(n.strong,{children:"position"})," prop."]})]}),"\n",(0,r.jsx)(n.h2,{id:"how-to-use-it",children:"How to use it"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-vue",children:'<template>\n  <gmap-map :center="center" :zoom="7" style="width: 100%; height: 500px">\n    <gmap-marker\n      v-for="m in markers"\n      :position="m.position"\n      :clickable="true"\n      :draggable="true"\n      @click="center=m.position"\n    >\n    </gmap-marker>\n  </gmap-map>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      markers: [{\n        position: {\n          lat: 10.0,\n          lng: 10.0\n        }\n      }],\n    }\n  }\n}\n<\/script>\n'})}),"\n",(0,r.jsxs)(n.p,{children:["If you need to know the ",(0,r.jsx)(n.strong,{children:"API of this component"})," please read it ",(0,r.jsx)(n.a,{href:"/code/components/marker-icon.html",children:"here"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"html-examples",children:"HTML examples"}),"\n",(0,r.jsx)(n.admonition,{title:"Basic marker HTML example",type:"note",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-html",children:'<body>\n  <div id="root">\n    <gmap-map :center="center" :zoom="7" style="width: 100%; height: 500px">\n      <gmap-marker v-for="m in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>\n    </gmap-map>\n  </div>\n\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"><\/script>\n  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"><\/script>\n\n  <script>\n    Vue.use(GmapVue, {\n      load: {\n        key: \'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc\'\n      },\n      // Demonstrating how we can customize the name of the components\n      installComponents: false,\n    });\n\n    document.addEventListener(\'DOMContentLoaded\', function() {\n      Vue.component(\'google-map\', GmapVue.Map);\n      Vue.component(\'google-marker\', GmapVue.Marker);\n\n      new Vue({\n        el: \'#root\',\n        data: {\n          center: {\n            lat: 10.0,\n            lng: 10.0\n          },\n          markers: [{\n            position: {\n              lat: 10.0,\n              lng: 10.0\n            }\n          }, {\n            position: {\n              lat: 11.0,\n              lng: 11.0\n            }\n          }]\n        },\n      });\n    });\n  <\/script>\n</body>\n'})})}),"\n",(0,r.jsx)(n.admonition,{title:"Shape marker HTML example",type:"note",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-html",children:'<body>\n  <div id="root">\n    <p>Only the dark dots in the middle of the marker are clickable</p>\n\n    <google-map :center="center" :zoom="7" style="width: 100%; height: 500px">\n      <google-marker v-for="m in markers" :position="m.position" :clickable="true"\n      :draggable="true" @click="center=m.position" :shape="shape"></google-marker>\n    </google-map>\n  </div>\n\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"><\/script>\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.js"><\/script>\n  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"><\/script>\n\n  <script>\n    Vue.use(GmapVue, {\n      load: {\n        key: \'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc\'\n      },\n      // Demonstrating how we can customize the name of the components\n      installComponents: false,\n    });\n\n    document.addEventListener(\'DOMContentLoaded\', function() {\n      Vue.component(\'google-map\', GmapVue.Map);\n      Vue.component(\'google-marker\', GmapVue.Marker);\n\n      new Vue({\n        el: \'#root\',\n        data: {\n          center: {\n            lat: 10.0,\n            lng: 10.0\n          },\n          markers: [{\n            position: {\n              lat: 10.0,\n              lng: 10.0\n            }\n          }, {\n            position: {\n              lat: 11.0,\n              lng: 11.0\n            }\n          }],\n          shape: {\n            coords: [10, 10, 10, 15, 15, 15, 15, 10],\n            type: \'poly\'\n          },\n        },\n      });\n    });\n  <\/script>\n</body>\n'})})}),"\n",(0,r.jsx)(n.h2,{id:"test-the-component",children:"Test the component"}),"\n",(0,r.jsx)(n.admonition,{title:"Click to see the basic marker HTML example in action",type:"note",children:(0,r.jsx)("eg-base",{children:(0,r.jsx)("eg-marker",{})})}),"\n",(0,r.jsx)(n.admonition,{title:"Click to see the shape marker HTML example in action",type:"note",children:(0,r.jsx)("eg-base",{children:(0,r.jsx)("eg-basic-marker-shape",{})})})]})}function d(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},7252:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>a});var o=t(758);const r={},i=o.createContext(r);function s(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);