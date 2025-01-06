"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6618],{8783:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>r,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>p});const o=JSON.parse('{"id":"vue-2-version/guide/polygon","title":"polygon","description":"Description","source":"@site/docs/vue-2-version/guide/polygon.md","sourceDirName":"vue-2-version/guide","slug":"/vue-2-version/guide/polygon","permalink":"/gmap-vue/docs/vue-2-version/guide/polygon","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-2-version/guide/polygon.md","tags":[],"version":"current","frontMatter":{},"sidebar":"vue2Version","previous":{"title":"place-input","permalink":"/gmap-vue/docs/vue-2-version/guide/place-input"},"next":{"title":"polyline","permalink":"/gmap-vue/docs/vue-2-version/guide/polyline"}}');var s=t(6070),a=t(7252);const i={},l=void 0,r={},p=[{value:"Description",id:"description",level:2},{value:"Variables",id:"variables",level:2},{value:"Source code",id:"source-code",level:2},{value:"How to use it",id:"how-to-use-it",level:2},{value:"HTML examples",id:"html-examples",level:2},{value:"Test the component",id:"test-the-component",level:2}];function d(n){const e={a:"a",admonition:"admonition",code:"code",h2:"h2",mdxAdmonitionTitle:"mdxAdmonitionTitle",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h2,{id:"description",children:"Description"}),"\n",(0,s.jsx)(e.p,{children:"This component helps you to create a polygon on Google Maps API."}),"\n",(0,s.jsxs)(e.p,{children:["For more information read the Google Maps documentation\nfor ",(0,s.jsx)(e.a,{href:"https://developers.google.com/maps/documentation/javascript/examples/polygon-simple",children:"polygons"}),"."]}),"\n",(0,s.jsxs)(e.p,{children:["It is exported with the name ",(0,s.jsx)(e.code,{children:"GmapPolygon"}),"."]}),"\n",(0,s.jsx)(e.h2,{id:"variables",children:"Variables"}),"\n",(0,s.jsxs)(e.p,{children:["This component save the original polygon object provided by Google Maps in a property called ",(0,s.jsx)(e.code,{children:"$polygonObject"}),", as the\nexample below."]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-javascript",children:"this.$polygonObject = new google.maps.Polygon(...);\n"})}),"\n",(0,s.jsx)(e.h2,{id:"source-code",children:"Source code"}),"\n",(0,s.jsxs)(e.admonition,{type:"note",children:[(0,s.jsxs)(e.mdxAdmonitionTitle,{children:["Click to se the source code of ",(0,s.jsx)("code",{children:"polygon.vue"})," component"]}),(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-vue",children:"<script>\nimport MapElementMixin from '../mixins/map-element';\nimport { getPropsValues, bindEvents, bindProps } from '../utils/helpers';\nimport { polygonMappedProps } from '../utils/mapped-props-by-map-element';\n\nexport default {\n  mixins: [MapElementMixin],\n  props: {\n    deepWatch: {\n      type: Boolean,\n      default: false,\n    },\n    clickable: {\n      type: Boolean,\n      default: false,\n    },\n    draggable: {\n      type: Boolean,\n      default: false,\n    },\n    editable: {\n      type: Boolean,\n      default: false,\n    },\n    fillColor: {\n      type: String,\n      default: '',\n    },\n    fillOpacity: {\n      type: Number,\n      default: 1,\n    },\n    strokeColor: {\n      type: String,\n      default: '',\n    },\n    strokeOpacity: {\n      type: Number,\n      default: 1,\n    },\n    strokePosition: {\n      type: Number,\n      default: 0,\n    },\n    strokeWeight: {\n      type: Number,\n      default: 1,\n    },\n    visible: {\n      type: Boolean,\n      default: true,\n    },\n    options: {\n      type: Object,\n    },\n    path: {\n      type: Array,\n      noBind: true,\n    },\n    paths: {\n      type: Array,\n      noBind: true,\n    },\n  },\n  provide() {\n    const events = [\n      'click',\n      'dblclick',\n      'drag',\n      'dragend',\n      'dragstart',\n      'mousedown',\n      'mousemove',\n      'mouseout',\n      'mouseover',\n      'mouseup',\n      'rightclick',\n    ];\n\n    const promise = this.$mapPromise\n      .then((map) => {\n        this.$map = map;\n\n        const initialOptions = {\n          ...this.options,\n          map,\n          ...getPropsValues(this, polygonMappedProps),\n        };\n        const {\n          options: extraOptions,\n          path: optionPath,\n          paths: optionPaths,\n          ...finalOptions\n        } = initialOptions;\n\n        this.$polygonObject = new google.maps.Polygon(finalOptions);\n\n        bindProps(this, this.$polygonObject, polygonMappedProps);\n        bindEvents(this, this.$polygonObject, events);\n\n        let clearEvents = () => {};\n\n        this.$watch(\n          'paths',\n          (paths) => {\n            if (paths) {\n              clearEvents();\n\n              this.$polygonObject.setPaths(paths);\n\n              const updatePaths = () => {\n                this.$emit('paths_changed', this.$polygonObject.getPaths());\n              };\n              const eventListeners = [];\n\n              const mvcArray = this.$polygonObject.getPaths();\n              for (let i = 0; i < mvcArray.getLength(); i += 1) {\n                const mvcPath = mvcArray.getAt(i);\n                eventListeners.push([\n                  mvcPath,\n                  mvcPath.addListener('insert_at', updatePaths),\n                ]);\n                eventListeners.push([\n                  mvcPath,\n                  mvcPath.addListener('remove_at', updatePaths),\n                ]);\n                eventListeners.push([\n                  mvcPath,\n                  mvcPath.addListener('set_at', updatePaths),\n                ]);\n              }\n              eventListeners.push([\n                mvcArray,\n                mvcArray.addListener('insert_at', updatePaths),\n              ]);\n              eventListeners.push([\n                mvcArray,\n                mvcArray.addListener('remove_at', updatePaths),\n              ]);\n              eventListeners.push([\n                mvcArray,\n                mvcArray.addListener('set_at', updatePaths),\n              ]);\n\n              clearEvents = () => {\n                eventListeners.forEach(([, listenerHandle]) => {\n                  google.maps.event.removeListener(listenerHandle);\n                });\n              };\n            }\n          },\n          {\n            deep: this.deepWatch,\n            immediate: true,\n          }\n        );\n\n        this.$watch(\n          'path',\n          (path) => {\n            if (path) {\n              clearEvents();\n\n              this.$polygonObject.setPaths(path);\n\n              const mvcPath = this.$polygonObject.getPath();\n              const eventListeners = [];\n\n              const updatePaths = () => {\n                this.$emit('path_changed', this.$polygonObject.getPath());\n              };\n\n              eventListeners.push([\n                mvcPath,\n                mvcPath.addListener('insert_at', updatePaths),\n              ]);\n              eventListeners.push([\n                mvcPath,\n                mvcPath.addListener('remove_at', updatePaths),\n              ]);\n              eventListeners.push([\n                mvcPath,\n                mvcPath.addListener('set_at', updatePaths),\n              ]);\n\n              clearEvents = () => {\n                eventListeners.forEach(([, listenerHandle]) => {\n                  google.maps.event.removeListener(listenerHandle);\n                });\n              };\n            }\n          },\n          {\n            deep: this.deepWatch,\n            immediate: true,\n          }\n        );\n\n        return this.$polygonObject;\n      })\n      .catch((error) => {\n        throw error;\n      });\n\n    this.$polygonPromise = promise;\n    return { $polygonPromise: promise };\n  },\n};\n<\/script>\n"})})]}),"\n",(0,s.jsxs)(e.p,{children:["If you need to know what are ",(0,s.jsx)(e.code,{children:"mappedProps"})," please read the general concepts of this\napplication ",(0,s.jsx)(e.a,{href:"/code/utils/mapped-props-by-map-element.html#autocompletemappedprops",children:"here"}),"."]}),"\n",(0,s.jsxs)(e.admonition,{type:"note",children:[(0,s.jsxs)(e.mdxAdmonitionTitle,{children:["Mapped Props of ",(0,s.jsx)("code",{children:"GmapPolygon"})," component"]}),(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-javascript",children:"export const polygonMappedProps = {\n  clickable: {\n    type: Boolean,\n    noBind: true,\n  },\n  draggable: {\n    type: Boolean,\n  },\n  editable: {\n    type: Boolean,\n  },\n  fillColor: {\n    type: String,\n    noBind: true,\n  },\n  fillOpacity: {\n    type: Number,\n    noBind: true,\n  },\n  strokeColor: {\n    type: String,\n    noBind: true,\n  },\n  strokeOpacity: {\n    type: Number,\n    noBind: true,\n  },\n  strokePosition: {\n    type: Number,\n    noBind: true,\n  },\n  strokeWeight: {\n    type: Number,\n    noBind: true,\n  },\n  visible: {\n    type: Boolean,\n  },\n  options: {\n    type: Object,\n  },\n  path: {\n    type: Array,\n    twoWay: true,\n    noBind: true,\n  },\n  paths: {\n    type: Array,\n    twoWay: true,\n    noBind: true,\n  },\n};\n"})})]}),"\n",(0,s.jsxs)(e.admonition,{type:"note",children:[(0,s.jsxs)(e.mdxAdmonitionTitle,{children:["Events bound with to way on ",(0,s.jsx)("code",{children:"GmapPolygon"})]}),(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-javascript",children:"const events = [\n  'click',\n  'dblclick',\n  'drag',\n  'dragend',\n  'dragstart',\n  'mousedown',\n  'mousemove',\n  'mouseout',\n  'mouseover',\n  'mouseup',\n  'rightclick',\n];\n"})})]}),"\n",(0,s.jsx)(e.h2,{id:"how-to-use-it",children:"How to use it"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-vue",children:'<template>\n  <gmap-map\n    :center="{lat: 1.38, lng: 103.8}"\n    :zoom="12"\n    style="width: 100%; height: 500px">\n    <gmap-polygon\n      :paths="paths"\n      :editable="true"\n      @paths_changed="updateEdited($event)">\n    </gmap-polygon>\n  </gmap-map>\n</template>\n'})}),"\n",(0,s.jsxs)(e.p,{children:["If you need to know the ",(0,s.jsx)(e.strong,{children:"API of this component"})," please read it ",(0,s.jsx)(e.a,{href:"/code/components/polygon-shape.html",children:"here"}),"."]}),"\n",(0,s.jsx)(e.h2,{id:"html-examples",children:"HTML examples"}),"\n",(0,s.jsx)(e.admonition,{title:"Simple polygon example",type:"note",children:(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-html",children:'<body>\n  <div id="root">\n    <gmap-map :center="{lat: 1.38, lng: 103.8}" :zoom="12" style="width: 100%; height: 500px">\n      <gmap-polygon :paths="paths" :editable="true" @paths_changed="updateEdited($event)">\n      </gmap-polygon>\n    </gmap-map>\n\n    <ul v-if="edited" @click="edited = null">\n      <li v-for="path in edited">\n        <ol>\n          <li v-for="point in path">\n            {{point.lat}}, {{point.lng}}\n          </li>\n        </ol>\n      </li>\n    </ul>\n  </div>\n\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"><\/script>\n  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"><\/script>\n\n  <script>\n    Vue.use(GmapVue, {\n      load: {\n        key: \'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc\'\n      },\n    });\n\n    document.addEventListener(\'DOMContentLoaded\', function() {\n      window.XXX = new Vue({\n        el: \'#root\',\n        data: {\n          edited: null,\n          paths: [\n            [ {lat: 1.380, lng: 103.800}, {lat:1.380, lng: 103.810}, {lat: 1.390, lng: 103.810}, {lat: 1.390, lng: 103.800} ],\n            [ {lat: 1.382, lng: 103.802}, {lat:1.382, lng: 103.808}, {lat: 1.388, lng: 103.808}, {lat: 1.388, lng: 103.802} ],\n          ]\n        },\n        methods: {\n          updateEdited(mvcArray) {\n            let paths = [];\n            for (let i=0; i<mvcArray.getLength(); i++) {\n              let path = [];\n              for (let j=0; j<mvcArray.getAt(i).getLength(); j++) {\n                let point = mvcArray.getAt(i).getAt(j);\n                path.push({lat: point.lat(), lng: point.lng()});\n              }\n              paths.push(path);\n            }\n            this.edited = paths;\n          }\n        }\n      });\n    });\n  <\/script>\n</body>\n'})})}),"\n",(0,s.jsx)(e.admonition,{title:"Advanced polygon example",type:"note",children:(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-html",children:'<body>\n  <div id="root">\n    <label>\n      <strong>Start at:</strong>\n      <gmap-autocomplete @place_changed="updateCenter($event)" />\n    </label>\n\n    <br>\n    <br>\n\n    <gmap-map :center="center" :zoom="12" style="width: 100%; height: 500px" ref="map">\n      <gmap-polygon v-if="paths.length > 0" :paths="paths" :editable="true" @paths_changed="updateEdited($event)"\n          @rightclick="handleClickForDelete"\n          ref="polygon">\n      </gmap-polygon>\n    </gmap-map>\n\n    <div>\n      <button @click="addPath()">Add Path</button>\n      <button @click="removePath()">Remove Path</button>\n    </div>\n\n    <br>\n\n    <div>\n      <label for="geojson">\n        <strong>Paste your geojson here:</strong>\n      </label>\n      <textarea id="geojson" :value="polygonGeojson" style="width: 100%; height: 100px"\n        @input="readGeojson">\n      </textarea>\n      <div v-if="errorMessage">{{errorMessage}}</div>\n    </div>\n  </div>\n\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"><\/script>\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.js"><\/script>\n  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"><\/script>\n\n  <script>\n    Vue.use(GmapVue, {\n      load: {\n        key: \'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc\',\n        libraries: \'places\',\n      },\n    });\n\n    function closeLoop (path) {\n      return path.concat(path.slice(0, 1))\n    }\n\n    document.addEventListener(\'DOMContentLoaded\', function() {\n      window.XXX = new Vue({\n        el: \'#root\',\n        data: {\n          center: {lat: 1.38, lng: 103.8},\n          edited: null,\n          paths: [\n          ],\n          mvcPaths: null,\n          errorMessage: null,\n          polygonGeojson: \'\',\n        },\n        watch: {\n          polygonPaths: _.throttle(function (paths) {\n            if (paths) {\n              this.paths = paths\n              this.polygonGeojson = JSON.stringify({\n                type: \'Polygon\',\n                coordinates: this.paths.map(path => closeLoop(path.map(({lat, lng}) => [lng, lat])))\n              }, null, 2)\n            }\n          }, 1000)\n        },\n        computed: {\n          polygonPaths: function () {\n            if (!this.mvcPaths) return null\n\n            let paths = [];\n            for (let i=0; i < this.mvcPaths.getLength(); i++) {\n              let path = [];\n              for (let j=0; j<this.mvcPaths.getAt(i).getLength(); j++) {\n                let point = this.mvcPaths.getAt(i).getAt(j);\n                path.push({lat: point.lat(), lng: point.lng()});\n              }\n              paths.push(path);\n            }\n            return paths\n          },\n        },\n        methods: {\n          updateCenter: function (place) {\n            this.center = {\n              lat: place.geometry.location.lat(),\n              lng: place.geometry.location.lng(),\n            }\n          },\n          updateEdited: function (mvcPaths) {\n            this.mvcPaths = mvcPaths\n          },\n          addPath: function () {\n            // obtain the bounds, so we can guess how big the polygon should be\n            var bounds = this.$refs.map.$mapObject.getBounds()\n            var northEast = bounds.getNorthEast()\n            var southWest = bounds.getSouthWest()\n            var center = bounds.getCenter()\n            var degree = this.paths.length + 1;\n            var f = Math.pow(0.66, degree)\n\n            // Draw a triangle. Use f to control the size of the triangle.\n            // i.e., every time we add a path, we reduce the size of the triangle\n            var path = [\n              { lng: center.lng(), lat: (1-f) * center.lat() + (f) * northEast.lat() },\n              { lng: (1-f) * center.lng() + (f) * southWest.lng(), lat: (1-f) * center.lat() + (f) * southWest.lat() },\n              { lng: (1-f) * center.lng() + (f) * northEast.lng(), lat: (1-f) * center.lat() + (f) * southWest.lat() },\n            ]\n\n            this.paths.push(path)\n          },\n          removePath: function () {\n            this.paths.splice(this.paths.length - 1, 1)\n          },\n          handleClickForDelete($event) {\n            if ($event.vertex) {\n              this.$refs.polygon.$polygonObject.getPaths()\n                .getAt($event.path)\n                .removeAt($event.vertex)\n            }\n          },\n          readGeojson: function ($event) {\n            try {\n              this.polygonGeojson = $event.target.value\n\n              var v = JSON.parse($event.target.value);\n\n              this.paths = v.coordinates.map(linearRing =>\n                linearRing.slice(0, linearRing.length - 1)\n                .map(([lng, lat]) => ({lat, lng}))\n              )\n\n              this.errorMessage = null\n            } catch (err) {\n              this.errorMessage = err.message\n            }\n          }\n        }\n      });\n    });\n  <\/script>\n</body>\n'})})}),"\n",(0,s.jsx)(e.h2,{id:"test-the-component",children:"Test the component"}),"\n",(0,s.jsx)(e.admonition,{title:"Simple polygon",type:"note",children:(0,s.jsx)("eg-base",{children:(0,s.jsx)("eg-polygon-simple",{})})}),"\n",(0,s.jsx)(e.admonition,{title:"Advanced polygon",type:"note",children:(0,s.jsx)("eg-base",{children:(0,s.jsx)("eg-polygon-advanced",{})})})]})}function c(n={}){const{wrapper:e}={...(0,a.R)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(d,{...n})}):d(n)}},7252:(n,e,t)=>{t.d(e,{R:()=>i,x:()=>l});var o=t(758);const s={},a=o.createContext(s);function i(n){const e=o.useContext(a);return o.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:i(n.components),o.createElement(a.Provider,{value:e},n.children)}}}]);