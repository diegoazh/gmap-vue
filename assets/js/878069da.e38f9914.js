"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7350],{4123:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"vue-3-version/developers/README","title":"Contributing guide","description":"Commit convention","source":"@site/docs/vue-3-version/developers/README.md","sourceDirName":"vue-3-version/developers","slug":"/vue-3-version/developers/","permalink":"/gmap-vue/docs/vue-3-version/developers/","draft":false,"unlisted":false,"editUrl":"https://github.com/diegoazh/gmap-vue/docs/vue-3-version/developers/README.md","tags":[],"version":"current","frontMatter":{},"sidebar":"vue3Version","previous":{"title":"Developers","permalink":"/gmap-vue/docs/category/developers-1"},"next":{"title":"MIT License","permalink":"/gmap-vue/docs/vue-3-version/developers/license"}}');var o=n(6070),i=n(7252);const r={},a="Contributing guide",l={},d=[{value:"Commit convention",id:"commit-convention",level:2},{value:"Valid types",id:"valid-types",level:3},{value:"Valid scopes",id:"valid-scopes",level:3},{value:"Subject min and max length",id:"subject-min-and-max-length",level:3},{value:"Body",id:"body",level:3},{value:"Footer",id:"footer",level:3},{value:"Git flow and history",id:"git-flow-and-history",level:2},{value:"PR title (<strong>deprecated</strong>)",id:"pr-title-deprecated",level:2},{value:"Code style",id:"code-style",level:2},{value:"Tests",id:"tests",level:2},{value:"CONTRIBUTORS NEEDED",id:"contributors-needed",level:2}];function h(e){const t={a:"a",code:"code",del:"del",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"contributing-guide",children:"Contributing guide"})}),"\n",(0,o.jsx)(t.h2,{id:"commit-convention",children:"Commit convention"}),"\n",(0,o.jsxs)(t.p,{children:["We follow the ",(0,o.jsx)(t.a,{href:"https://www.conventionalcommits.org/en/v1.0.0/",children:"conventional commit style"})," to write our commits and can follow a semantic version of each package."]}),"\n",(0,o.jsx)(t.p,{children:"The commit structure is the follow for inline commits"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-sh",children:"type(scope): the message\n"})}),"\n",(0,o.jsx)(t.p,{children:"of the following when you want to add a body or a footer."}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-sh",children:"type(scope): the message\n\nbody\n\nfooter\n"})}),"\n",(0,o.jsx)(t.p,{children:"We use commitlint bot to ensure that all PRs follow this pattern, all PRs that not follow these rules will not be merged until the author fix all needed commits."}),"\n",(0,o.jsx)(t.h3,{id:"valid-types",children:"Valid types"}),"\n",(0,o.jsxs)(t.p,{children:["We follow the angular convention for types, some of the valid commit types are for example ",(0,o.jsx)(t.code,{children:"feat"}),", ",(0,o.jsx)(t.code,{children:"fix"}),", ",(0,o.jsx)(t.code,{children:"chore"}),", etc; if you want a more detailed explanation please read the valid types on the ",(0,o.jsx)(t.a,{href:"https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type",children:"angular contributing guide"}),"."]}),"\n",(0,o.jsx)(t.h3,{id:"valid-scopes",children:"Valid scopes"}),"\n",(0,o.jsxs)(t.p,{children:["In this project the scopes are ",(0,o.jsx)(t.strong,{children:"required"})," this is because Lerna needs it to determine when it should upgrade the version of a package in the mono repository."]}),"\n",(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:"Name"}),(0,o.jsx)(t.th,{children:"Description"})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"root"}),(0,o.jsx)(t.td,{children:"This is for changes that only affect the root monorepo managed by Lerna"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"all"}),(0,o.jsx)(t.td,{children:"This is for changes that affect all packages and the root monorepo"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"gmap-vue"}),(0,o.jsxs)(t.td,{children:["This is for changes that affect the ",(0,o.jsx)(t.code,{children:"gmap-vue"})," package (the plugin package)"]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"docs"}),(0,o.jsxs)(t.td,{children:["This is for changes that affect the ",(0,o.jsx)(t.code,{children:"documentation"})," package"]})]})]})]}),"\n",(0,o.jsxs)(t.p,{children:["If you have changes that affect ",(0,o.jsx)(t.code,{children:"gmap-vue"})," and ",(0,o.jsx)(t.code,{children:"documentation"})," packages you can use the scope that contains the main changes, but this situation is very rare and ",(0,o.jsx)(t.strong,{children:"you must commit the changes in different commits"})," and each of one must have the corresponding scope."]}),"\n",(0,o.jsx)(t.h3,{id:"subject-min-and-max-length",children:"Subject min and max length"}),"\n",(0,o.jsxs)(t.p,{children:["The subject should have ",(0,o.jsx)(t.strong,{children:"15"})," characters as a minimum and ",(0,o.jsx)(t.strong,{children:"75"})," as a maximum."]}),"\n",(0,o.jsx)(t.p,{children:"The subject should be a concise description of the changes."}),"\n",(0,o.jsx)(t.h3,{id:"body",children:"Body"}),"\n",(0,o.jsxs)(t.p,{children:["The body of the commit is optional, there you can explain in a more detailed way the changes that you will commit. The maximum length of the body should be ",(0,o.jsx)(t.strong,{children:"300"})," characters."]}),"\n",(0,o.jsx)(t.h3,{id:"footer",children:"Footer"}),"\n",(0,o.jsxs)(t.p,{children:["The footer of the commit is optional, there you should add the related issue if it exists, or a message if the commit close o resolve an issue. Also, you can put in this section the keyword ",(0,o.jsx)(t.code,{children:"BREAKING CHANGE: message"})," to inform that this commit inserts a breaking change on the API, another option to do that is adding the ",(0,o.jsx)(t.code,{children:"!"})," symbol after the ",(0,o.jsx)(t.code,{children:"type(scope)"})," section."]}),"\n",(0,o.jsx)(t.p,{children:"Footer examples:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-sh",children:"issue: #45\n"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-sh",children:"close: #45\n"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-sh",children:"resolve: #45\n"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-sh",children:"BREAKING CHANGE: This breaks the api that generate automatically all components.\n"})}),"\n",(0,o.jsx)(t.h2,{id:"git-flow-and-history",children:"Git flow and history"}),"\n",(0,o.jsxs)(t.p,{children:["At this moment we have one main branch ",(0,o.jsx)(t.code,{children:"master"})," when you fork the project you must work on that branch."]}),"\n",(0,o.jsxs)(t.p,{children:["This branch have a linear history and you should use the ",(0,o.jsx)(t.strong,{children:"rebase"})," strategy instead of ",(0,o.jsx)(t.del,{children:"merge"})," strategy to maintain the linear history of the commits."]}),"\n",(0,o.jsx)(t.p,{children:"After ensuring that all changes in your branch works as expected we will merge it on the master branch and all features and fixes added to the master branch will automatically be deployed to npm and the documentation site."}),"\n",(0,o.jsxs)(t.h2,{id:"pr-title-deprecated",children:["PR title (",(0,o.jsx)(t.strong,{children:"deprecated"}),")"]}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.del,{children:"A tricky point that you need to keep in mind is because of the GitHub behaviour when you make a PR the title of the PR should be similar to an inline commit style, in this way the title validator will approve you PR and will review it and merge it."})}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.del,{children:"The regex patter that validates the title for a PR is the following"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-js",children:"/^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\\()(deps|root|all|gmap-vue|documentation)(\\))(:)(\\s{1}[\\.\\/\\-\\_a-z0-9\\s]+)$/gm\n"})}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsxs)(t.del,{children:["You can test this regex expression following this link ",(0,o.jsx)(t.a,{href:"regexr.com/59fn0",children:"regexr.com/59fn0"}),"."]})}),"\n",(0,o.jsx)(t.h2,{id:"code-style",children:"Code style"}),"\n",(0,o.jsxs)(t.p,{children:["We follow the ",(0,o.jsx)(t.a,{href:"https://github.com/airbnb/javascript",children:"Airbnb"})," code style rules, if you have doubts, please read the explanation on his GitHub repository or the ",(0,o.jsx)(t.a,{href:"https://eslint.org/docs/rules/",children:"Eslint documentation"}),"."]}),"\n",(0,o.jsx)(t.p,{children:"Your changes must pass the linter before you can commit your changes, this is not optional and required to maintain the same style in the project."}),"\n",(0,o.jsx)(t.h2,{id:"tests",children:"Tests"}),"\n",(0,o.jsx)(t.p,{children:"We have a few tests in the project and they must pass before we can merge your PR into the project."}),"\n",(0,o.jsx)(t.p,{children:"We have planned to improve our tests adding jest and cypress to the project in the middle term."}),"\n",(0,o.jsx)(t.h2,{id:"contributors-needed",children:"CONTRIBUTORS NEEDED"}),"\n",(0,o.jsxs)(t.p,{children:["If you have time to contribute to a rather frequently used library, feel free to make a PR!\nFor more background, please refer to ",(0,o.jsx)(t.a,{href:"https://github.com/xkjyeah/vue-google-maps/issues/514",children:"this issue"}),"."]}),"\n",(0,o.jsx)(t.p,{children:"What's we needed are:"}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsx)(t.li,{children:"Better automated tests"}),"\n",(0,o.jsx)(t.li,{children:"Better integration tests with the popular frameworks, especially Nuxt and Vue template"}),"\n"]}),"\n",(0,o.jsx)(t.p,{children:"The above three will go a long way to keeping the project maintainable and contributable, and will address many of the open issues."})]})}function c(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},7252:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>a});var s=n(758);const o={},i=s.createContext(o);function r(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);