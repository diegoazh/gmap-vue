"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2205],{3562:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"vue-2-version/code/mixins/mountable","title":"mountable","description":"mountableMixin","source":"@site/docs/vue-2-version/code/mixins/mountable.md","sourceDirName":"vue-2-version/code/mixins","slug":"/vue-2-version/code/mixins/mountable","permalink":"/gmap-vue/docs/vue-2-version/code/mixins/mountable","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-2-version/code/mixins/mountable.md","tags":[],"version":"current","frontMatter":{"title":"mountable"},"sidebar":"vue2Version","previous":{"title":"map-element","permalink":"/gmap-vue/docs/vue-2-version/code/mixins/map-element"},"next":{"title":"map-element","permalink":"/gmap-vue/docs/vue-2-version/code/utils/factories/map-element"}}');var i=s(6070),a=s(7252);const o={title:"mountable"},r="mountable",l={},d=[{value:"mountableMixin",id:"mountablemixin",level:2},{value:"The mixin code:",id:"the-mixin-code",level:2}];function c(e){const n={br:"br",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"mountable",children:"mountable"})}),"\n",(0,i.jsx)("a",{name:"mountableMixin"}),"\n",(0,i.jsx)(n.h2,{id:"mountablemixin",children:"mountableMixin"}),"\n",(0,i.jsx)(n.p,{children:"MountableMixin"}),"\n",(0,i.jsx)(n.p,{children:"Mixin for objects that are mounted by Google Maps Javascript API."}),"\n",(0,i.jsx)(n.p,{children:"These are objects that are sensitive to element resize  operations\nso it exposes a property which accepts a bus"}),"\n",(0,i.jsx)(n.h2,{id:"the-mixin-code",children:"The mixin code:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"  export default {\n    props: ['resizeBus'],\n\n    data() {\n      return {\n        _actualResizeBus: null,\n      };\n    },\n\n    created() {\n      if (typeof this.resizeBus === 'undefined') {\n        this.$data._actualResizeBus = this.$gmapDefaultResizeBus;\n      } else {\n        this.$data._actualResizeBus = this.resizeBus;\n      }\n    },\n\n    methods: {\n      _resizeCallback() {\n        this.resize();\n      },\n      _delayedResizeCallback() {\n        this.$nextTick(() => this._resizeCallback());\n      },\n    },\n\n    watch: {\n      resizeBus(newVal) {\n        this.$data._actualResizeBus = newVal;\n      },\n      '$data._actualResizeBus': function actualResizeBus(newVal, oldVal) {\n        if (oldVal) {\n          oldVal.$off('resize', this._delayedResizeCallback);\n        }\n        if (newVal) {\n          newVal.$on('resize', this._delayedResizeCallback);\n        }\n      },\n    },\n\n    destroyed() {\n      if (this.$data._actualResizeBus) {\n        this.$data._actualResizeBus.$off('resize', this._delayedResizeCallback);\n      }\n    },\n  };\n"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Kind"}),": global class",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.strong,{children:"Properties"})]}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Name"}),(0,i.jsx)(n.th,{children:"Type"}),(0,i.jsx)(n.th,{children:"Description"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"resizeBus"}),(0,i.jsxs)(n.td,{children:[(0,i.jsx)("code",{children:"function"})," | ",(0,i.jsx)("code",{children:"undefined"})]}),(0,i.jsxs)(n.td,{children:["Vue props to set your custom resize bus function, otherwise it takes the default ",(0,i.jsx)(n.code,{children:"$gmapDefaultResizeBus"})]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"_actualResizeBus"}),(0,i.jsxs)(n.td,{children:[(0,i.jsx)("code",{children:"function"})," | ",(0,i.jsx)("code",{children:"undefined"})]}),(0,i.jsxs)(n.td,{children:["The current default resize bus function, ",(0,i.jsx)(n.strong,{children:"this should not be used outside of this mixin"})]})]})]})]})]})}function u(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},7252:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>r});var t=s(758);const i={},a=t.createContext(i);function o(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);