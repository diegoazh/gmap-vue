"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5184],{9832:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"vue-3-version/api/utilities","title":"Utilities","description":"We have three main utilities googleMapsApiInitializer, pluginComponentBuilder, and getGoogleMapsAPI.","source":"@site/docs/vue-3-version/api/03-utilities.md","sourceDirName":"vue-3-version/api","slug":"/vue-3-version/api/utilities","permalink":"/gmap-vue/docs/vue-3-version/api/utilities","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-3-version/api/03-utilities.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"id":"utilities","sidebar_position":3,"sidebar_label":"utilities"},"sidebar":"vue3Version","previous":{"title":"GmapVuePlugin","permalink":"/gmap-vue/docs/vue-3-version/api/gmap-vue-plugin"},"next":{"title":"composables","permalink":"/gmap-vue/docs/vue-3-version/api/composables"}}');var i=o(6070),s=o(7252);const r={id:"utilities",sidebar_position:3,sidebar_label:"utilities"},a="Utilities",p={},l=[{value:"<code>googleMapsApiInitializer</code>",id:"googlemapsapiinitializer",level:2},{value:"<code>googleMapsApiInitializer</code> API",id:"googlemapsapiinitializer-api",level:3},{value:"<code>pluginComponentBuilder</code>",id:"plugincomponentbuilder",level:2},{value:"<code>pluginComponentBuilder</code> API",id:"plugincomponentbuilder-api",level:3},{value:"<code>getGoogleMapsAPI</code>",id:"getgooglemapsapi",level:2},{value:"<code>getGoogleMapsAPI</code> API",id:"getgooglemapsapi-api",level:3}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"utilities",children:"Utilities"})}),"\n",(0,i.jsxs)(n.p,{children:["We have three main utilities ",(0,i.jsx)(n.code,{children:"googleMapsApiInitializer"}),", ",(0,i.jsx)(n.code,{children:"pluginComponentBuilder"}),", and ",(0,i.jsx)(n.code,{children:"getGoogleMapsAPI"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"googlemapsapiinitializer",children:(0,i.jsx)(n.code,{children:"googleMapsApiInitializer"})}),"\n",(0,i.jsxs)(n.p,{children:["This function load the Google Maps API into your page creating the ",(0,i.jsx)(n.code,{children:"<script><\/script>"})," tag in the head of your page to load the Maps script from ",(0,i.jsx)(n.code,{children:"https://maps.google.cn"})," or ",(0,i.jsx)(n.code,{children:"https://maps.googleapis.com"})," depending on your preference and the options you passed into the plugin."]}),"\n",(0,i.jsxs)(n.h3,{id:"googlemapsapiinitializer-api",children:[(0,i.jsx)(n.code,{children:"googleMapsApiInitializer"})," API"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:"showLineNumbers",children:"(options: ILoadPluginOptions): void => {\n  /**\n   * Allow options to be an object.\n   * This is to support more esoteric means of loading Google Maps,\n   * such as Google for business\n   * https://developers.google.com/maps/documentation/javascript/get-api-key#premium-auth\n   */\n  if (Array.isArray(options) || typeof options !== 'object') {\n    throw new Error('options should  be an object');\n  }\n\n  // Do nothing if run from server-side\n  if (typeof document === 'undefined') {\n    return;\n  }\n\n  const finalOptions = { ...options };\n  const { libraries } = finalOptions;\n  finalOptions.callback = 'GoogleMapsCallback';\n\n  // libraries\n  if (Array.isArray(libraries)) {\n    finalOptions.libraries = libraries.join(',');\n  }\n\n  if (!isApiSetUp) {\n    isApiSetUp = true;\n\n    const googleMapScript = document.createElement('script');\n    googleMapScript.setAttribute('type', 'text/javascript');\n    googleMapScript.innerHTML = `\n    ((g) => {\n      var h,\n        a,\n        k,\n        p = 'The Google Maps JavaScript API',\n        c = 'google',\n        l = 'importLibrary',\n        q = '__ib__',\n        m = document,\n        b = window;\n      b = b[c] || (b[c] = {});\n      var d = b.maps || (b.maps = {}),\n        r = new Set(),\n        e = new URLSearchParams(),\n        u = () =>\n          h ||\n          (h = new Promise(async (f, n) => {\n            await (a = m.createElement('script'));\n            e.set('libraries', [...r] + '');\n            for (k in g)\n              e.set(\n                k.replace(/[A-Z]/g, (t) => '_' + t[0].toLowerCase()),\n                g[k]\n              );\n            e.set('callback', c + '.maps.' + q);\n            a.src = \\`https://maps.\\${c}apis.com/maps/api/js?\\` + e;\n            d[q] = f;\n            a.onerror = () => (h = n(Error(p + ' could not load.')));\n            a.nonce = m.querySelector('script[nonce]')?.nonce || '';\n            m.head.append(a);\n          }));\n      d[l]\n        ? console.warn(p + ' only loads once. Ignoring:', g)\n        : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));\n    })(${JSON.stringify(finalOptions)});`;\n    document.head.appendChild(googleMapScript);\n  } else {\n    window.console.info('You already started the loading of google maps');\n  }\n};\n"})}),"\n",(0,i.jsx)(n.h2,{id:"plugincomponentbuilder",children:(0,i.jsx)(n.code,{children:"pluginComponentBuilder"})}),"\n",(0,i.jsx)(n.p,{children:"This function helps you to build your own components if it does not exist in the plugin, you can pass a set of options and the function will return a new vue component to be used in your application."}),"\n",(0,i.jsxs)(n.h3,{id:"plugincomponentbuilder-api",children:[(0,i.jsx)(n.code,{children:"pluginComponentBuilder"})," API"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:"showLineNumbers",children:"/**\n * A helper to build your own component for the plugin\n *\n * @param {Object} providedOptions\n * @param {Object} providedOptions.mappedProps - Definitions of props\n * @param {Object} providedOptions.mappedProps.PROP.type - Value type\n * @param {Boolean} providedOptions.mappedProps.PROP.twoWay\n *  - Whether the prop has a corresponding PROP_changed\n *   event\n * @param {Boolean} providedOptions.mappedProps.PROP.noBind\n *  - If true, do not apply the default bindProps / bindEvents.\n * However it will still be added to the list of component props\n * @param {Object} providedOptions.props - Regular Vue-style props.\n *  Note: must be in the Object form because it will be\n *  merged with the `mappedProps`\n *\n * @param {Object} providedOptions.events - Google Maps API events\n *  that are not bound to a corresponding prop\n * @param {String} providedOptions.name - e.g. `polyline`\n * @param {Function} providedOptions.ctr - constructor, e.g.\n *  `google.maps.Polyline`. However, since this is not\n *  generally available during library load, this becomes\n *  a function instead, e.g. () => google.maps.Polyline\n *  which will be called only after the API has been loaded\n *\n *  default: () => String\n *\n * @param {Function} providedOptions.ctrArgs -\n *   If the constructor in `ctr` needs to be called with\n *   arguments other than a single `options` object, e.g. for\n *   GroundOverlay, we call `new GroundOverlay(url, bounds, options)`\n *   then pass in a function that returns the argument list as an array\n *\n *   default: (MappedProps, OtherVueProps) => Array\n *\n * Otherwise, the constructor will be called with an `options` object,\n *   with property and values merged from:\n *\n *   1. the `options` property, if any\n *   2. a `map` property with the Google Maps\n *   3. all the properties passed to the component in `mappedProps`\n * @param {Function} providedOptions.beforeCreate -\n *  Hook to modify the options passed to the initializer\n *\n *  default: (Object) => Any\n *\n * @param {Function} providedOptions.afterCreate -\n *  Hook called when\n *\n *  default: (options.ctr, Object) => Any\n *\n * @returns {Object} A component object that should be exported by default from a Vue component\n */\nexport function pluginComponentBuilder(\n  providedOptions: IGmapVueElementOptions\n): ComponentOptions {\n  const {\n    mappedProps,\n    name,\n    ctr,\n    ctrArgs,\n    events,\n    beforeCreate,\n    afterCreate,\n    props,\n    ...rest\n  } = providedOptions;\n\n  const promiseName = `$${name}Promise`;\n  const instanceName = `$${name}Object`;\n\n  _assert(!(props instanceof Array), '`props` should be an object, not Array');\n\n  return {\n    props: {\n      ...props,\n    },\n    async setup() {},\n    render() {\n      return '';\n    },\n    provide() {\n      const promise = useMapPromise()\n        ?.then((map) => {\n          if (!map) {\n            throw new Error('the map instance was not created');\n          }\n\n          // Infowindow needs this to be immediately available\n          this.$map = map;\n\n          // Initialize the maps with the given options\n          const options = {\n            map,\n            ...getPropsValuesWithoutOptionsProp(props, this),\n            ...this.options,\n          };\n          // don't use delete keyword in order to create a more predictable code for the engine\n\n          if (beforeCreate) {\n            const result = beforeCreate.bind(this)(options);\n\n            if (result instanceof Promise) {\n              return result.then(() => ({ options }));\n            }\n          }\n          return { options };\n        })\n        .then(({ options }: { options: { [key: string]: any } }) => {\n          const ConstructorObject = ctr();\n          // https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible\n          this[instanceName] = ctrArgs\n            ? new (Function.prototype.bind.call(\n                ConstructorObject,\n                null,\n                ...ctrArgs(\n                  options,\n                  getPropsValuesWithoutOptionsProp(props || {}, this)\n                )\n              ))()\n            : new ConstructorObject(options);\n\n          bindProps(mappedProps, this[instanceName], this);\n          bindEvents(events, this[instanceName], this);\n\n          if (afterCreate) {\n            afterCreate.bind(this)(this[instanceName]);\n          }\n          return this[instanceName];\n        });\n\n      this[promiseName] = promise;\n      return { [promiseName]: promise };\n    },\n    destroyed() {\n      // Note: not all Google Maps components support maps\n      if (this[instanceName] && this[instanceName].setMap) {\n        this[instanceName].setMap(null);\n      }\n    },\n    ...rest,\n  };\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"Below you can see the interface of the options object that it receives"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:"showLineNumbers",children:"export interface IVueProp {\n  type?:\n    | StringConstructor\n    | NumberConstructor\n    | BooleanConstructor\n    | ArrayConstructor\n    | ObjectConstructor\n    | DateConstructor\n    | FunctionConstructor\n    | SymbolConstructor;\n  required?: boolean;\n  default?: () => undefined;\n  validator?: () => boolean;\n}\n\nexport interface IGmapVueElementOptions {\n  mappedProps: Omit<SinglePluginComponentConfig, 'events'>;\n  props: { [key: string]: IVueProp };\n  events: string[];\n  name: string;\n  ctr: () => any;\n  ctrArgs: (\n    options: { [key: string]: any },\n    props: { [key: string]: IVueProp }\n  ) => any[];\n  beforeCreate: (options: { [key: string]: any }) => any;\n  afterCreate: (mapElementInstance: { [key: string]: any }) => any;\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.p,{children:["You can check the ",(0,i.jsx)(n.code,{children:"SinglePluginComponentConfig"})," type ",(0,i.jsx)(n.a,{href:"/docs/vue-3-version/api/types#singleplugincomponentconfig",children:"here"})]})}),"\n",(0,i.jsx)(n.h2,{id:"getgooglemapsapi",children:(0,i.jsx)(n.code,{children:"getGoogleMapsAPI"})}),"\n",(0,i.jsxs)(n.p,{children:["This functions helps you to get the global ",(0,i.jsx)(n.code,{children:"google"})," object if it is available on your page."]}),"\n",(0,i.jsxs)(n.h3,{id:"getgooglemapsapi-api",children:[(0,i.jsx)(n.code,{children:"getGoogleMapsAPI"})," API"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:"showLineNumbers",children:"/**\n * This function helps you to get the Google Maps API\n * when its ready on the window object\n * @function\n */\nfunction getGoogleMapsAPI(): false | GlobalGoogleObject {\n  return globalThis.GoogleMapsApi.isReady && globalThis.google;\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.p,{children:["Check the ",(0,i.jsx)(n.code,{children:"GlobalGoogleObject"})," type ",(0,i.jsx)(n.a,{href:"/docs/vue-3-version/api/types",children:"here"})]})})]})}function d(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},7252:(e,n,o)=>{o.d(n,{R:()=>r,x:()=>a});var t=o(758);const i={},s=t.createContext(i);function r(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);