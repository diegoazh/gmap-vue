"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9023],{4577:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>t,metadata:()=>o,toc:()=>c});const o=JSON.parse('{"id":"vue-3-version/api/composables","title":"The exposed composables","description":"From versions above v2.0.1 all components have its own composable to get their promises.","source":"@site/docs/vue-3-version/api/04-composables.md","sourceDirName":"vue-3-version/api","slug":"/vue-3-version/api/composables","permalink":"/gmap-vue/docs/vue-3-version/api/composables","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-3-version/api/04-composables.md","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"id":"composables","sidebar_position":4,"sidebar_label":"composables"},"sidebar":"vue3Version","previous":{"title":"utilities","permalink":"/gmap-vue/docs/vue-3-version/api/utilities"},"next":{"title":"Components","permalink":"/gmap-vue/docs/category/components-1"}}');var i=s(6070),r=s(7252);const t={id:"composables",sidebar_position:4,sidebar_label:"composables"},a="The exposed composables",l={},c=[{value:"<code>useGoogleMapsApiPromiseLazy</code>",id:"usegooglemapsapipromiselazy",level:2},{value:"<code>useGoogleMapsApiPromiseLazy</code> API",id:"usegooglemapsapipromiselazy-api",level:3},{value:"<code>usePluginOptions</code>",id:"usepluginoptions",level:2},{value:"<code>usePluginOptions</code> API",id:"usepluginoptions-api",level:3},{value:"<code>useResizeBus</code>",id:"useresizebus",level:2},{value:"<code>useResizeBus</code> API",id:"useresizebus-api",level:3},{value:"<code>useMapPromise</code>",id:"usemappromise",level:2},{value:"<code>useStreetViewPanoramaPromise</code>",id:"usestreetviewpanoramapromise",level:2},{value:"<code>useMarkerPromise</code>",id:"usemarkerpromise",level:2},{value:"<code>useCirclePromise</code>",id:"usecirclepromise",level:2},{value:"<code>useClusterPromise</code>",id:"useclusterpromise",level:2},{value:"<code>useDrawingPromise</code>",id:"usedrawingpromise",level:2},{value:"<code>useHeatmapLayerPromise</code>",id:"useheatmaplayerpromise",level:2},{value:"<code>useInfoWindowPromise</code>",id:"useinfowindowpromise",level:2},{value:"<code>useKmlPromise</code>",id:"usekmlpromise",level:2},{value:"<code>usePolygonPromise</code>",id:"usepolygonpromise",level:2},{value:"<code>usePolylinePromise</code>",id:"usepolylinepromise",level:2},{value:"<code>useRectanglePromise</code>",id:"userectanglepromise",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"the-exposed-composables",children:"The exposed composables"})}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.p,{children:[(0,i.jsxs)(n.strong,{children:["From versions above ",(0,i.jsx)(n.code,{children:"v2.0.1"})]})," all components have its own composable to get their promises."]})}),"\n",(0,i.jsxs)(n.p,{children:["The plugin expose composables from the following path ",(0,i.jsx)(n.code,{children:"@gmap-vue/v3/composables"}),". You can use in your application using the composition API."]}),"\n",(0,i.jsx)(n.p,{children:"You can use it in the following way"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:"showLineNumbers",children:"import {\n  useMapPromise,\n  useResizeBus,\n  useGoogleMapsApiPromiseLazy,\n  useStreetViewPanoramaPromise,\n  usePluginOptions,\n} from '@gmap-vue/v3/composables';\n\nconst promise = useMapPromise('yourMapKey');\n// ...\n"})}),"\n",(0,i.jsx)(n.h2,{id:"usegooglemapsapipromiselazy",children:(0,i.jsx)(n.code,{children:"useGoogleMapsApiPromiseLazy"})}),"\n",(0,i.jsxs)(n.p,{children:["This composable return the a promise that when it is resolved return the global ",(0,i.jsx)(n.code,{children:"google"})," object, this mean the ",(0,i.jsx)(n.code,{children:"window.google"})," object added to the ",(0,i.jsx)(n.code,{children:"globalThis"})," object bye the Google Maps API."]}),"\n",(0,i.jsx)(n.p,{children:"You can use it in the following way"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:"showLineNumbers",children:"import { useGoogleMapsApiPromiseLazy } from '@gmap-vue/v3/composables';\n\nconst googlePromise = useGoogleMapsApiPromiseLazy();\n\nif (googlePromise) {\n  const googleObject = await googlePromise;\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["If the Google API was not loaded yet you will see a warning message in the console like this: ",(0,i.jsx)(n.code,{children:"'$googleMapsApiPromiseLazy was not created yet...'"})," and the composable function should return ",(0,i.jsx)(n.code,{children:"undefined"}),"."]})}),"\n",(0,i.jsxs)(n.h3,{id:"usegooglemapsapipromiselazy-api",children:[(0,i.jsx)(n.code,{children:"useGoogleMapsApiPromiseLazy"})," API"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:"showLineNumbers",children:"let $googleMapsApiPromiseLazy: LazyValueGetterFn<GlobalGoogleObject>;\n\n/**\n * This function helps to save the final options passed to the plugin and\n * the function to get the promise useful to wait until the Google Maps API\n * is loaded and ready to use it\n *\n * @param  {IPluginOptions} finalOptions\n * @param  {LazyValueGetterFn} googleMapsApiPromiseLazy\n * @returns void\n *\n * @internal\n */\nexport function saveLazyPromiseAndFinalOptions(\n  finalOptions: IPluginOptions,\n  googleMapsApiPromiseLazy: LazyValueGetterFn<GlobalGoogleObject>\n): void {\n  if (!$finalOptions) {\n    $finalOptions = finalOptions;\n  }\n\n  if (!$googleMapsApiPromiseLazy) {\n    $googleMapsApiPromiseLazy = googleMapsApiPromiseLazy;\n  }\n}\n\n/**\n * This function returns a promise when is resolved returns the original Google\n * Maps API. With this promise you can wait until the Google Maps API is fully\n * loaded.\n *\n * @public\n * @returns {Promise<any>}\n */\nexport function useGoogleMapsApiPromiseLazy(): Promise<\n  GlobalGoogleObject | undefined\n> {\n  if (!$googleMapsApiPromiseLazy) {\n    globalThis.console.warn('$googleMapsApiPromiseLazy was not created yet...');\n  }\n\n  return $googleMapsApiPromiseLazy?.();\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"Like the plugin options this lazy promise is saved when the plugin is loaded"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="main.ts" showLineNumbers',children:"  /**\n   * Use a lazy to only load the API when\n   * a GMap component is loaded\n   *\n   * @constant\n   * @type {Function} the promise lazy creator function\n   */\n  const promiseLazyCreator = usePromiseLazyBuilderFn(\n    googleMapsApiInitializer,\n    globalThis.GoogleMapsApi\n  );\n  /**\n   * The googleMapsApiPromiseLazy function to can wait until Google Maps API is ready\n   *\n   * @constant\n   * @type {Function}\n   */\n  const googleMapsApiPromiseLazy = promiseLazyCreator(finalOptions);\n  saveLazyPromiseAndFinalOptions(finalOptions, googleMapsApiPromiseLazy);\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Check the ",(0,i.jsx)(n.code,{children:"LazyValueGetterFn"})," type ",(0,i.jsx)(n.a,{href:"/docs/vue-3-version/api/types#lazyvaluegetterfn",children:"here"})]}),"\n",(0,i.jsxs)(n.li,{children:["Check the ",(0,i.jsx)(n.code,{children:"GlobalGoogleObject"})," type ",(0,i.jsx)(n.a,{href:"/docs/vue-3-version/api/types#GlobalGoogleObject",children:"here"})]}),"\n"]})}),"\n",(0,i.jsx)(n.h2,{id:"usepluginoptions",children:(0,i.jsx)(n.code,{children:"usePluginOptions"})}),"\n",(0,i.jsx)(n.p,{children:"This composable return the final options object used by the plugin when it was initialized."}),"\n",(0,i.jsx)(n.p,{children:"How to use it"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:"showLineNumbers",children:"import { usePluginOptions } from '@gmap-vue/v3/composables';\n\nconst options = usePluginOptions();\n\n// do something with the options\n"})}),"\n",(0,i.jsxs)(n.h3,{id:"usepluginoptions-api",children:[(0,i.jsx)(n.code,{children:"usePluginOptions"})," API"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Check the ",(0,i.jsx)(n.a,{href:"/docs/vue-3-version/api/gmap-vue-plugin#plugin-options",children:(0,i.jsx)(n.strong,{children:"Options Interface"})})]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"The options are saved when the plugin is load as we show below"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="main.ts" showLineNumbers',children:"  /**\n   * Use a lazy to only load the API when\n   * a GMap component is loaded\n   *\n   * @constant\n   * @type {Function} the promise lazy creator function\n   */\n  const promiseLazyCreator = usePromiseLazyBuilderFn(\n    googleMapsApiInitializer,\n    globalThis.GoogleMapsApi\n  );\n  /**\n   * The googleMapsApiPromiseLazy function to can wait until Google Maps API is ready\n   *\n   * @constant\n   * @type {Function}\n   */\n  const googleMapsApiPromiseLazy = promiseLazyCreator(finalOptions);\n  saveLazyPromiseAndFinalOptions(finalOptions, googleMapsApiPromiseLazy);\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The core API of this composable"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:"showLineNumbers",children:"let $finalOptions: IPluginOptions;\n\n/**\n * This function helps to save the final options passed to the plugin and\n * the function to get the promise useful to wait until the Google Maps API\n * is loaded and ready to use it\n *\n * @param  {IPluginOptions} finalOptions\n * @param  {LazyValueGetterFn} googleMapsApiPromiseLazy\n * @returns void\n *\n * @internal\n */\nexport function saveLazyPromiseAndFinalOptions(\n  finalOptions: IPluginOptions,\n  googleMapsApiPromiseLazy: LazyValueGetterFn<GlobalGoogleObject>\n): void {\n  if (!$finalOptions) {\n    $finalOptions = finalOptions;\n  }\n\n  if (!$googleMapsApiPromiseLazy) {\n    $googleMapsApiPromiseLazy = googleMapsApiPromiseLazy;\n  }\n}\n\n/**\n * This function returns the configuration passed to the plugin\n *\n * @returns IPluginOptions\n */\nexport function usePluginOptions(): IPluginOptions {\n  if (!$finalOptions) {\n    globalThis.console.warn('$finalOptions was not defined yet...');\n  }\n\n  return $finalOptions;\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"saveLazyPromiseAndFinalOptions"})," is internal and it is not exposed by the plugin"]})}),"\n",(0,i.jsx)(n.h2,{id:"useresizebus",children:(0,i.jsx)(n.code,{children:"useResizeBus"})}),"\n",(0,i.jsxs)(n.p,{children:["This composable returns the ",(0,i.jsx)(n.code,{children:"currentResizeBus"}),", ",(0,i.jsx)(n.code,{children:"_resizeCallback"}),", ",(0,i.jsx)(n.code,{children:"_delayedResizeCallback"}),". If you provide your own resize bus through the ",(0,i.jsx)(n.code,{children:"GmvMap"})," component props, it should be assigned to the ",(0,i.jsx)(n.code,{children:"currentResizeBus"})," otherwise the ",(0,i.jsx)(n.code,{children:"defaultResizeBus"})," (a mitt object) should be assigned to it."]}),"\n",(0,i.jsx)(n.p,{children:"You can use it in the following way"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:"showLineNumbers",children:"import { useResizeBus } from '@gmap-vue/v3/composables';\n\nconst { currentResizeBus, _resizeCallback, _delayedResizeCallback } = useResizeBus();\n\ncurrentResizeBus.emit('foo', { a: 'b' });\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"_resizeCallback"})," is a function used to preserve the map center when it is resized. The ",(0,i.jsx)(n.code,{children:"_delayedResizeCallback"})," use the ",(0,i.jsx)(n.code,{children:"nextTick"})," function to call the ",(0,i.jsx)(n.code,{children:"_resizeCallback"})," in the next change."]}),"\n",(0,i.jsxs)(n.h3,{id:"useresizebus-api",children:[(0,i.jsx)(n.code,{children:"useResizeBus"})," API"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:"showLineNumbers",children:"// this code is executed when the GmvMap component is initialized\n\nconst currentResizeBus = ref<Emitter<Record<EventType, unknown>> | undefined>();\nlet _resizeCallback: () => void;\nlet _delayedResizeCallback: () => Promise<void>;\n\n// ...\n\nif (!props.resizeBus) {\n  currentResizeBus.value = defaultResizeBus; // default resize bus is mitt();\n}\n\nif (props.resizeBus) {\n  currentResizeBus.value = props.resizeBus; // your custom resize bus\n}\n\n_resizeCallback = (): void => {\n  resizeFn();\n};\n\n_delayedResizeCallback = (): Promise<void> => {\n  return nextTick(() => _resizeCallback());\n};\n\n// ...\n\n/**\n * @typedef ResizeBus\n * @property {() => void} currentResizeBus\n * @property {() => void} _resizeCallback\n * @property {() => void} _delayedResizeCallback\n */\n/**\n * this function returns the rezise bus functions\n *\n * @public\n * @returns {ResizeBus}\n */\nexport function useResizeBus() {\n  return {\n    currentResizeBus,\n    _resizeCallback,\n    _delayedResizeCallback,\n  };\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"usemappromise",children:(0,i.jsx)(n.code,{children:"useMapPromise"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["From ",(0,i.jsx)(n.strong,{children:"v2.0.1 and below"})," we only use one instance of map, because in the previous implementation we always use the same promise to return the same map or we overwrite that promise with a new map instance. ",(0,i.jsx)(n.strong,{children:"From versions above v2.0.1"})," every map and component is saved in its own promise and is independent to other components."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsxs)(n.strong,{children:["We strongly recommend to set the ",(0,i.jsx)(n.code,{children:"mapKey"})," prop on each map"]}),", the old ",(0,i.jsx)(n.code,{children:"recycle"})," prop, we use that key to get the correct map instance and add marker, shapes, etc to the correct map instance."]}),"\n"]})}),"\n",(0,i.jsxs)(n.p,{children:["This composable returns a promise and, when it is resolved return the ",(0,i.jsx)(n.code,{children:"GmvMap"})," component."]}),"\n",(0,i.jsxs)(n.p,{children:["You can use it to be sure that the ",(0,i.jsx)(n.code,{children:"GmvMap"})," component is ready."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="How to use it" showLineNumbers',children:"/**\n * This function returns a promise, when it is resolved returns the Google Maps component instance\n *\n * @param  {string} key - the recycle prop of the map\n * @returns {Promise}\n * @public\n */\nexport function useMapPromise(\n  key: string | InjectionKey<Promise<google.maps.Map | undefined>>,\n): Promise<google.maps.Map | undefined> {\n  return usePromise<google.maps.Map>(key);\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"When the GmvMap component is initialized and the map is ready this promise is resolved"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="map-layer.vue" showLineNumbers',children:"//...\n\nconst mapPromiseDeferred = usePromiseDeferred(props.mapKey || $mapPromise);\npromiseDeferred.resolve(mapInstance);\n\n// ...\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["If the Map object was not loaded yet the composable function returns ",(0,i.jsx)(n.code,{children:"undefined"}),"."]})}),"\n",(0,i.jsx)(n.h2,{id:"usestreetviewpanoramapromise",children:(0,i.jsx)(n.code,{children:"useStreetViewPanoramaPromise"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["From ",(0,i.jsx)(n.strong,{children:"v2.0.1 and below"})," we only use one instance of street view panorama, because in the previous implementation we always use the same promise to return the same street view panorama or we overwrite that promise with a new street view panorama instance. ",(0,i.jsx)(n.strong,{children:"From versions above v2.0.1"})," every street view panorama and component is saved in its own promise and is independent to other components."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsxs)(n.strong,{children:["We strongly recommend to set the ",(0,i.jsx)(n.code,{children:"streetViewKey"})," prop on each street view panorama"]}),", we use this key to get the correct street view panorama instance."]}),"\n"]})}),"\n",(0,i.jsx)(n.p,{children:"This composable is similar to the previous above, the only difference is that it return the street view panorama object from the Google Maps API."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="How to use it" showLineNumbers',children:"/**\n * This function returns a promise, when it is resolved returns the Google Map StreetViewPanorama component instance\n *\n * @param  {string} key - the streetViewKey prop of the StreetViewPanorama\n * @returns {Promise}\n * @public\n */\nexport function useStreetViewPanoramaPromise(\n  key:\n    | string\n    | InjectionKey<Promise<google.maps.StreetViewPanorama | undefined>>,\n): Promise<google.maps.StreetViewPanorama | undefined> {\n  return usePromise<google.maps.StreetViewPanorama>(key);\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["If the Street View Panorama object was not loaded yet the composable function returns ",(0,i.jsx)(n.code,{children:"undefined"}),"."]})}),"\n",(0,i.jsx)(n.h2,{id:"usemarkerpromise",children:(0,i.jsx)(n.code,{children:"useMarkerPromise"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["From ",(0,i.jsx)(n.strong,{children:"v2.0.1 and below"})," we only use one instance of marker, because in the previous implementation we always use the same promise to return the same marker or we overwrite that promise with a new marker instance. ",(0,i.jsx)(n.strong,{children:"From versions above v2.0.1"})," every marker and component is saved in its own promise and is independent to other components."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsxs)(n.strong,{children:["We strongly recommend to set the ",(0,i.jsx)(n.code,{children:"markerKey"})," prop on each marker"]}),", we use this key to get the correct marker instance."]}),"\n"]})}),"\n",(0,i.jsx)(n.p,{children:"This composable is similar to the previous above, the only difference is that it return the marker object from the Google Maps API."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="How to use it" showLineNumbers',children:"/**\n * This function returns a promise, when it is resolved returns the Google Advanced Marker Element component instance\n *\n * @param  {string} key - the markerKey prop of the marker\n * @returns {Promise}\n * @public\n */\nexport function useMarkerPromise(\n  key:\n    | string\n    | InjectionKey<\n        Promise<google.maps.marker.AdvancedMarkerElement | undefined>\n      >,\n): Promise<google.maps.marker.AdvancedMarkerElement | undefined> {\n  return usePromise<google.maps.marker.AdvancedMarkerElement>(key);\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["If the marker object was not loaded yet the composable function returns ",(0,i.jsx)(n.code,{children:"undefined"}),"."]})}),"\n",(0,i.jsx)(n.h2,{id:"usecirclepromise",children:(0,i.jsx)(n.code,{children:"useCirclePromise"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["From ",(0,i.jsx)(n.strong,{children:"v2.0.1 and below"})," we only use one instance of circle, because in the previous implementation we always use the same promise to return the same circle or we overwrite that promise with a new circle instance. ",(0,i.jsx)(n.strong,{children:"From versions above v2.0.1"})," every circle and component is saved in its own promise and is independent to other components."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsxs)(n.strong,{children:["We strongly recommend to set the ",(0,i.jsx)(n.code,{children:"circleKey"})," prop on each circle"]}),", we use this key to get the correct circle instance."]}),"\n"]})}),"\n",(0,i.jsx)(n.p,{children:"This composable is similar to the previous above, the only difference is that it return the circle object from the Google Maps API."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="How to use it" showLineNumbers',children:"/**\n * This function returns a promise, when it is resolved returns the Google Circle component instance\n *\n * @param  {string} key - the circleKey prop of the CircleShape\n * @returns {Promise}\n * @public\n */\nexport function useCirclePromise(\n  key: string | InjectionKey<Promise<google.maps.Circle | undefined>>,\n): Promise<google.maps.Circle | undefined> {\n  return usePromise<google.maps.Circle>(key);\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["If the circle object was not loaded yet the composable function returns ",(0,i.jsx)(n.code,{children:"undefined"}),"."]})}),"\n",(0,i.jsx)(n.h2,{id:"useclusterpromise",children:(0,i.jsx)(n.code,{children:"useClusterPromise"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["From ",(0,i.jsx)(n.strong,{children:"v2.0.1 and below"})," we only use one instance of cluster, because in the previous implementation we always use the same promise to return the same cluster or we overwrite that promise with a new cluster instance. ",(0,i.jsx)(n.strong,{children:"From versions above v2.0.1"})," every cluster and component is saved in its own promise and is independent to other components."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsxs)(n.strong,{children:["We strongly recommend to set the ",(0,i.jsx)(n.code,{children:"clusterKey"})," prop on each cluster"]}),", we use this key to get the correct cluster instance."]}),"\n"]})}),"\n",(0,i.jsx)(n.p,{children:"This composable is similar to the previous above, the only difference is that it return the cluster object from the Google Maps API."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="How to use it" showLineNumbers',children:"/**\n * This function returns a promise, when it is resolved returns the Cluster component instance\n *\n * @param  {string} key - the clusterKey prop of the Cluster\n * @returns {Promise}\n * @public\n */\nexport function useClusterPromise(\n  key: string | InjectionKey<Promise<MarkerClusterer | undefined>>,\n): Promise<MarkerClusterer | undefined> {\n  return usePromise<MarkerClusterer>(key);\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["If the cluster object was not loaded yet the composable function returns ",(0,i.jsx)(n.code,{children:"undefined"}),"."]})}),"\n",(0,i.jsx)(n.h2,{id:"usedrawingpromise",children:(0,i.jsx)(n.code,{children:"useDrawingPromise"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["From ",(0,i.jsx)(n.strong,{children:"v2.0.1 and below"})," we only use one instance of drawing, because in the previous implementation we always use the same promise to return the same drawing or we overwrite that promise with a new drawing instance. ",(0,i.jsx)(n.strong,{children:"From versions above v2.0.1"})," every drawing and component is saved in its own promise and is independent to other components."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsxs)(n.strong,{children:["We strongly recommend to set the ",(0,i.jsx)(n.code,{children:"drawingKey"})," prop on each drawing"]}),", we use this key to get the correct drawing instance."]}),"\n"]})}),"\n",(0,i.jsx)(n.p,{children:"This composable is similar to the previous above, the only difference is that it return the drawing object from the Google Maps API."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="How to use it" showLineNumbers',children:"/**\n * This function returns a promise, when it is resolved returns the Google Map Drawing Manager component instance\n *\n * @param  {string} key - the drawingKey prop of the DrawingManager\n * @returns {Promise}\n * @public\n */\nexport function useDrawingPromise(\n  key:\n    | string\n    | InjectionKey<Promise<google.maps.drawing.DrawingManager | undefined>>,\n): Promise<google.maps.drawing.DrawingManager | undefined> {\n  return usePromise<google.maps.drawing.DrawingManager>(key);\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["If the drawing object was not loaded yet the composable function returns ",(0,i.jsx)(n.code,{children:"undefined"}),"."]})}),"\n",(0,i.jsx)(n.h2,{id:"useheatmaplayerpromise",children:(0,i.jsx)(n.code,{children:"useHeatmapLayerPromise"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["From ",(0,i.jsx)(n.strong,{children:"v2.0.1 and below"})," we only use one instance of heatmap, because in the previous implementation we always use the same promise to return the same heatmap or we overwrite that promise with a new heatmap instance. ",(0,i.jsx)(n.strong,{children:"From versions above v2.0.1"})," every heatmap and component is saved in its own promise and is independent to other components."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsxs)(n.strong,{children:["We strongly recommend to set the ",(0,i.jsx)(n.code,{children:"heatmapKey"})," prop on each heatmap"]}),", we use this key to get the correct heatmap instance."]}),"\n"]})}),"\n",(0,i.jsx)(n.p,{children:"This composable is similar to the previous above, the only difference is that it return the heatmap object from the Google Maps API."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="How to use it" showLineNumbers',children:"/**\n * This function returns a promise, when it is resolved returns the Google Map Heatmap Layer component instance\n *\n * @param  {string} key - the heatmapKey prop of the Heatmap Layer\n * @returns {Promise}\n * @public\n */\nexport function useHeatmapLayerPromise(\n  key:\n    | string\n    | InjectionKey<Promise<google.maps.visualization.HeatmapLayer | undefined>>,\n): Promise<google.maps.visualization.HeatmapLayer | undefined> {\n  return usePromise<google.maps.visualization.HeatmapLayer>(key);\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["If the heatmap object was not loaded yet the composable function returns ",(0,i.jsx)(n.code,{children:"undefined"}),"."]})}),"\n",(0,i.jsx)(n.h2,{id:"useinfowindowpromise",children:(0,i.jsx)(n.code,{children:"useInfoWindowPromise"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["From ",(0,i.jsx)(n.strong,{children:"v2.0.1 and below"})," we only use one instance of Info Window, because in the previous implementation we always use the same promise to return the same Info Window or we overwrite that promise with a new Info Window instance. ",(0,i.jsx)(n.strong,{children:"From versions above v2.0.1"})," every Info Window and component is saved in its own promise and is independent to other components."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsxs)(n.strong,{children:["We strongly recommend to set the ",(0,i.jsx)(n.code,{children:"infoWindowKey"})," prop on each Info Window"]}),", we use this key to get the correct Info Window instance."]}),"\n"]})}),"\n",(0,i.jsx)(n.p,{children:"This composable is similar to the previous above, the only difference is that it return the Info Window object from the Google Maps API."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="How to use it" showLineNumbers',children:"/**\n * This function returns a promise, when it is resolved returns the Google Map Info Window component instance\n *\n * @param  {string} key - the infoWindowKey prop of the Info Window\n * @returns {Promise}\n * @public\n */\nexport function useInfoWindowPromise(\n  key: string | InjectionKey<Promise<google.maps.InfoWindow | undefined>>,\n): Promise<google.maps.InfoWindow | undefined> {\n  return usePromise<google.maps.InfoWindow>(key);\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["If the Info Window object was not loaded yet the composable function returns ",(0,i.jsx)(n.code,{children:"undefined"}),"."]})}),"\n",(0,i.jsx)(n.h2,{id:"usekmlpromise",children:(0,i.jsx)(n.code,{children:"useKmlPromise"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["From ",(0,i.jsx)(n.strong,{children:"v2.0.1 and below"})," we only use one instance of Kml layer, because in the previous implementation we always use the same promise to return the same Kml layer or we overwrite that promise with a new Kml layer instance. ",(0,i.jsx)(n.strong,{children:"From versions above v2.0.1"})," every Kml layer and component is saved in its own promise and is independent to other components."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsxs)(n.strong,{children:["We strongly recommend to set the ",(0,i.jsx)(n.code,{children:"kmlKey"})," prop on each Kml layer"]}),", we use this key to get the correct Kml layer instance."]}),"\n"]})}),"\n",(0,i.jsx)(n.p,{children:"This composable is similar to the previous above, the only difference is that it return the Kml layer object from the Google Maps API."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="How to use it" showLineNumbers',children:"/**\n * This function returns a promise, when it is resolved returns the Google Map Kml Layer component instance\n *\n * @param  {string} key - the kmlKey prop of the Kml Layer\n * @returns {Promise}\n * @public\n */\nexport function useKmlPromise(\n  key: string | InjectionKey<Promise<google.maps.KmlLayer | undefined>>,\n): Promise<google.maps.KmlLayer | undefined> {\n  return usePromise<google.maps.KmlLayer>(key);\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["If the Kml layer object was not loaded yet the composable function returns ",(0,i.jsx)(n.code,{children:"undefined"}),"."]})}),"\n",(0,i.jsx)(n.h2,{id:"usepolygonpromise",children:(0,i.jsx)(n.code,{children:"usePolygonPromise"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["From ",(0,i.jsx)(n.strong,{children:"v2.0.1 and below"})," we only use one instance of polygon, because in the previous implementation we always use the same promise to return the same polygon or we overwrite that promise with a new polygon instance. ",(0,i.jsx)(n.strong,{children:"From versions above v2.0.1"})," every polygon and component is saved in its own promise and is independent to other components."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsxs)(n.strong,{children:["We strongly recommend to set the ",(0,i.jsx)(n.code,{children:"polygonKey"})," prop on each polygon"]}),", we use this key to get the correct polygon instance."]}),"\n"]})}),"\n",(0,i.jsx)(n.p,{children:"This composable is similar to the previous above, the only difference is that it return the polygon object from the Google Maps API."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="How to use it" showLineNumbers',children:"/**\n * This function returns a promise, when it is resolved returns the Google Map Polygon component instance\n *\n * @param  {string} key - the polygonKey prop of the Polygon\n * @returns {Promise}\n * @public\n */\nexport function usePolygonPromise(\n  key: string | InjectionKey<Promise<google.maps.Polygon | undefined>>,\n): Promise<google.maps.Polygon | undefined> {\n  return usePromise<google.maps.Polygon>(key);\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["If the polygon object was not loaded yet the composable function returns ",(0,i.jsx)(n.code,{children:"undefined"}),"."]})}),"\n",(0,i.jsx)(n.h2,{id:"usepolylinepromise",children:(0,i.jsx)(n.code,{children:"usePolylinePromise"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["From ",(0,i.jsx)(n.strong,{children:"v2.0.1 and below"})," we only use one instance of polyline, because in the previous implementation we always use the same promise to return the same polyline or we overwrite that promise with a new polyline instance. ",(0,i.jsx)(n.strong,{children:"From versions above v2.0.1"})," every polyline and component is saved in its own promise and is independent to other components."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsxs)(n.strong,{children:["We strongly recommend to set the ",(0,i.jsx)(n.code,{children:"polylineKey"})," prop on each polyline"]}),", we use this key to get the correct polyline instance."]}),"\n"]})}),"\n",(0,i.jsx)(n.p,{children:"This composable is similar to the previous above, the only difference is that it return the polyline object from the Google Maps API."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="How to use it" showLineNumbers',children:"/**\n * This function returns a promise, when it is resolved returns the Google Map Polyline component instance\n *\n * @param  {string} key - the polylineKey prop of the Polyline\n * @returns {Promise}\n * @public\n */\nexport function usePolylinePromise(\n  key: string | InjectionKey<Promise<google.maps.Polyline | undefined>>,\n): Promise<google.maps.Polyline | undefined> {\n  return usePromise<google.maps.Polyline>(key);\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["If the polyline object was not loaded yet the composable function returns ",(0,i.jsx)(n.code,{children:"undefined"}),"."]})}),"\n",(0,i.jsx)(n.h2,{id:"userectanglepromise",children:(0,i.jsx)(n.code,{children:"useRectanglePromise"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["From ",(0,i.jsx)(n.strong,{children:"v2.0.1 and below"})," we only use one instance of rectangle, because in the previous implementation we always use the same promise to return the same rectangle or we overwrite that promise with a new rectangle instance. ",(0,i.jsx)(n.strong,{children:"From versions above v2.0.1"})," every rectangle and component is saved in its own promise and is independent to other components."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsxs)(n.strong,{children:["We strongly recommend to set the ",(0,i.jsx)(n.code,{children:"rectangleKey"})," prop on each rectangle"]}),", we use this key to get the correct rectangle instance."]}),"\n"]})}),"\n",(0,i.jsx)(n.p,{children:"This composable is similar to the previous above, the only difference is that it return the rectangle object from the Google Maps API."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="How to use it" showLineNumbers',children:"/**\n * This function returns a promise, when it is resolved returns the Google Map Rectangle component instance\n *\n * @param  {string} key - the rectangleKey prop of the Rectangle\n * @returns {Promise}\n * @public\n */\nexport function useRectanglePromise(\n  key: string | InjectionKey<Promise<google.maps.Rectangle | undefined>>,\n): Promise<google.maps.Rectangle | undefined> {\n  return usePromise<google.maps.Rectangle>(key);\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["If the rectangle object was not loaded yet the composable function returns ",(0,i.jsx)(n.code,{children:"undefined"}),"."]})})]})}function p(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},7252:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>a});var o=s(758);const i={},r=o.createContext(i);function t(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);