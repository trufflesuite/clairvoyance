(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[399],{3581:function(n,e,t){"use strict";var r=t(34051),i=t.n(r),s=t(85893),o=t(67294),a=t(8100),c=t(10894),u=t(86541),l=t(15193),f=t(96356),d=t(49609),h=t(68527),p=t(5434),v=t(49293);function x(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function g(n,e,t,r,i,s,o){try{var a=n[s](o),c=a.value}catch(u){return void t(u)}a.done?e(c):Promise.resolve(c).then(r,i)}function b(n){return function(){var e=this,t=arguments;return new Promise((function(r,i){var s=n.apply(e,t);function o(n){g(s,r,i,o,a,"next",n)}function a(n){g(s,r,i,o,a,"throw",n)}o(void 0)}))}}function m(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,i,s=[],o=!0,a=!1;try{for(t=t.call(n);!(o=(r=t.next()).done)&&(s.push(r.value),!e||s.length!==e);o=!0);}catch(c){a=!0,i=c}finally{try{o||null==t.return||t.return()}finally{if(a)throw i}}return s}}(n,e)||function(n,e){if(!n)return;if("string"===typeof n)return x(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return x(n,e)}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var j=function(n){var e=n.isStepping,t=n.isAtEnd;return e||t};e.Z=function(n){var e=n.session,t=(0,o.useState)(!1),r=t[0],x=t[1],g=0===e.view(v.selectors.trace.index),y=e.view(v.selectors.trace.finished),w=(0,a.kY)().mutate,S=function(n){return{continue:{Icon:function(){return(0,s.jsx)(c.JO,{as:p.yV_})},label:"Continue until breakpoint",shouldDisable:j,step:b(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.continueUntilBreakpoint();case 2:case"end":return e.stop()}}),e)})))},next:{Icon:function(){return(0,s.jsx)(c.JO,{as:p.p0p})},label:"Step next",shouldDisable:j,step:b(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.stepNext();case 2:case"end":return e.stop()}}),e)})))},over:{Icon:function(){return(0,s.jsx)(c.JO,{as:p.H$B})},label:"Step over",shouldDisable:j,step:b(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.stepOver();case 2:case"end":return e.stop()}}),e)})))},into:{Icon:function(){return(0,s.jsx)(c.JO,{as:p.uKn})},label:"Step into",shouldDisable:j,step:b(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.stepInto();case 2:case"end":return e.stop()}}),e)})))},out:{Icon:function(){return(0,s.jsx)(c.JO,{as:p.Ap8})},label:"Step out",shouldDisable:j,step:b(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.stepOut();case 2:case"end":return e.stop()}}),e)})))},reset:{Icon:function(){return(0,s.jsx)(c.JO,{as:p.FVj})},label:"Reset to beginning",shouldDisable:function(n){var e=n.isStepping,t=n.isAtStart;return e||t},step:b(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.reset();case 2:case"end":return e.stop()}}),e)})))}}}(e),O=Object.entries(S).map((function(n){var e=m(n,2),t=e[0],o=e[1],a=o.Icon,c=o.label,f=o.step,d=o.shouldDisable;return(0,s.jsx)(u.u,{label:c,children:(0,s.jsx)(l.hU,{"aria-label":c,icon:(0,s.jsx)(a,{}),disabled:d({isStepping:r,isAtStart:g,isAtEnd:y}),onClick:function(){x(!0),setTimeout(b(i().mark((function n(){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,f();case 2:w("/variables"),w("/currentSourceRange"),x(!1);case 4:case"end":return n.stop()}}),n)}))),0)}})},t)})),P=r?(0,s.jsxs)(f.Vp,{colorScheme:"orange",size:"sm",children:[(0,s.jsx)(d.$,{size:"sm"}),(0,s.jsx)(h.xv,{children:"\xa0Stepping..."})]}):y?(0,s.jsx)(f.Vp,{colorScheme:"teal",variant:"solid",size:"sm",children:(0,s.jsx)(h.xv,{children:"Transaction ended."})}):(0,s.jsx)(s.Fragment,{});return(0,s.jsxs)(l.hE,{children:[O,P]})}},7444:function(n,e,t){"use strict";t.d(e,{Z:function(){return ln}});var r,i=t(85893),s=t(67294),o=t(68527),a=t(49609),c=t(7983),u=t(38152),l=t(7630),f=t(1864),d=t.n(f),h=t(99839),p=t(29736),v=t(8100),x=t(34051),g=t.n(x),b=t(49293);function m(n,e,t,r,i,s,o){try{var a=n[s](o),c=a.value}catch(u){return void t(u)}a.done?e(c):Promise.resolve(c).then(r,i)}!function(n){n.Waiting="waiting",n.Pending="pending",n.Ready="ready",n.Failed="failed"}(r||(r={}));var j,y=function(n){var e,t=n.session,i=(0,v.ZP)("/sources",(e=g().mark((function n(){var e;return g().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(console.debug("fetching sources"),t){n.next=3;break}return n.abrupt("return");case 3:return n.next=5,new Promise((function(n){return setTimeout(n,0)}));case 5:return e=t.view(b.selectors.sourcemapping.views.sources),console.debug("sources %o",Object.values(e).map((function(n){return n.sourcePath}))),n.abrupt("return",e);case 8:case"end":return n.stop()}}),n)})),function(){var n=this,t=arguments;return new Promise((function(r,i){var s=e.apply(n,t);function o(n){m(s,r,i,o,a,"next",n)}function a(n){m(s,r,i,o,a,"throw",n)}o(void 0)}))})),o=i.data,a=i.error,c=i.mutate;(0,s.useEffect)((function(){t&&c()}),[t,c]);var u=t?a?r.Failed:o?r.Ready:r.Pending:r.Waiting;return u===r.Ready?{sources:Object.values(o).flatMap((function(n){var e=n.id,t=n.sourcePath,r=n.source,i=n.language;return"Solidity"===i?[{id:e,sourcePath:t,contents:r,language:i}]:[]})),status:u}:{status:u}};function w(n,e,t,r,i,s,o){try{var a=n[s](o),c=a.value}catch(u){return void t(u)}a.done?e(c):Promise.resolve(c).then(r,i)}!function(n){n.Waiting="waiting",n.Pending="pending",n.Ready="ready",n.Failed="failed"}(j||(j={}));var S,O=function(n){var e,t=n.session,r=(0,v.ZP)("/currentSourceRange",(e=g().mark((function n(){var e,r,i,s,o,a;return g().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t){n.next=2;break}return n.abrupt("return");case 2:return e=t.view(b.selectors.trace.index),r=t.view(b.selectors.sourcemapping.current.source).id,i=t.view(b.selectors.sourcemapping.current.sourceRange),s=i.lines,o=s.start,a=s.end,n.abrupt("return",{traceIndex:e,source:{id:r},start:o,end:a});case 6:case"end":return n.stop()}}),n)})),function(){var n=this,t=arguments;return new Promise((function(r,i){var s=e.apply(n,t);function o(n){w(s,r,i,o,a,"next",n)}function a(n){w(s,r,i,o,a,"throw",n)}o(void 0)}))})),i=r.data,o=r.error,a=r.mutate;(0,s.useEffect)((function(){t&&a()}),[t,a]);var c=t?o?j.Failed:i?j.Ready:j.Pending:j.Waiting;return c===j.Ready?{currentSourceRange:i,status:c}:{status:c}},P=t(18835),k=t.n(P),I=t(63081),A=t(26912),R=t.n(A),C=t(96988),E=t.n(C),T=t(53918),F=function(n,e,t){return function(r){return"rgba(".concat(n,",").concat(e,",").concat(t,",").concat(r,")")}};!function(n){n.LIGHT="light",n.DARK="dark"}(S||(S={}));var Z="#d60000",z="#47BAA7",D=(F(220,220,220),F(108,136,209),F(209,0,0),F(248,245,240),"#efe5dc");function q(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}function M(){var n=q(["\n  background: ",";\n/*border-color: ",";*/\n  border-width: 1px;\n  border-style: solid;\n  border-radius: 0.4rem;\n  width: fit-content;\n  min-width: 100%;\n\n  &:hover .fas.fa-dot-circle.faded {\n    color: ",";\n    opacity: 0.5;\n  }\n"]);return M=function(){return n},n}function W(){var n=q(['\n  font-family: "Ubuntu Mono", monospace;\n  white-space: pre;\n  padding-left: 0.2rem;\n  cursor: text;\n']);return W=function(){return n},n}function H(){var n=q(["\n  color: ",";\n  padding-left: 0.2rem;\n  cursor: pointer;\n"]);return H=function(){return n},n}function N(){var n=q(["\n  text-align: center;\n  display: inline-block;\n  color: ",";\n  cursor: pointer;\n  padding-left: 0.2rem;\n  width: 1.1rem;\n  height: 1rem;\n"]);return N=function(){return n},n}var U=D,V=T.ZP.div(M(),(function(n){var e=n.selected;return"".concat(e?"#fffbbc":U)}),(function(n){var e=n.selected;return"".concat(e?"#fbbd7a":U)}),Z),_=T.ZP.span(W()),J=T.ZP.span(H(),"#c8c8c8"),K=(T.ZP.i(N(),(function(n){return n.isBreakpoint?Z:D})),function(n){n.source;var e=n.lineContents,t=n.lineNumber,r=n.lineRef,s=n.selected,o=n.lineNumbersGutterWidth,a=(t+1).toString(),c="".concat(" ".repeat(o-a.length)).concat(a);return(0,i.jsx)(V,{selected:s,ref:r,children:(0,i.jsxs)(_,{children:[(0,i.jsxs)(J,{children:[c,"."," "]}),(0,i.jsx)("span",{dangerouslySetInnerHTML:{__html:e}})]})},"contract-source-".concat(t))});function $(){var n,e,t=(n=["\n  .hljs-comment,\n  .hljs-quote {\n    color: ",";\n    font-style: italic;\n  }\n\n  .hljs-keyword,\n  .hljs-selector-tag,\n  .hljs-subst {\n    color: ",";\n    font-weight: bold;\n  }\n\n  .hljs-number,\n  .hljs-literal,\n  .hljs-variable,\n  .hljs-template-variable,\n  .hljs-tag .hljs-attr {\n    color: ",";\n  }\n\n  .hljs-string,\n  .hljs-doctag {\n    color: ",";\n  }\n\n  .hljs-title,\n  .hljs-section,\n  .hljs-selector-id {\n    color: ",";\n    font-weight: bold;\n  }\n\n  .hljs-subst {\n    font-weight: normal;\n  }\n\n  .hljs-type,\n  .hljs-class .hljs-title {\n    color: ",";\n    font-weight: bold;\n  }\n\n  .hljs-tag,\n  .hljs-name,\n  .hljs-attribute {\n    color: ",";\n    font-weight: normal;\n  }\n\n  .hljs-built_in,\n  .hljs-builtin-name {\n    color: ",";\n  }\n"],e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}})));return $=function(){return t},t}var L=T.ZP.div($(),"rgba(0, 0, 0, 0.5)","#ea1bc0","#b3004f","#e4a663",z,z,z,z);R().registerLanguage("solidity",E().solidity);var X=function(n){var e=n.source,t=n.currentSourceRange,r=e.id,a=e.sourcePath,c=e.contents,u=(0,s.useState)(0),l=(u[0],u[1],(0,s.useRef)(null),(0,s.useState)("")),f=l[0],d=l[1],h=(null===t||void 0===t?void 0:t.start.line)||0;(0,s.useEffect)((function(){Promise.resolve().then((function(){var n=k()().use(I.Z);d(n.stringify({type:"root",children:R().highlight("solidity",c).value}).toString())}))}),[c]);var p=f.split("\n"),v=p.length.toString().length,x=p.map((function(n,e){return(0,s.createRef)()}));(0,s.useEffect)((function(){var n,e;null===(n=x[h])||void 0===n||null===(e=n.current)||void 0===e||e.scrollIntoView({block:"center",inline:"nearest"})}),[h,x]);var g=x.map((function(n,s){var o=p[s],a=!!t&&s>=t.start.line&&(null===t.end.line||null===t.end.column||0===t.end.column&&s<t.end.line||t.end.column>0&&s<=t.end.line);return(0,i.jsx)(K,{source:e,lineContents:o,lineNumber:s,selected:a,lineRef:n,lineNumbersGutterWidth:v},"".concat(r,"-line-").concat(s))}));return(0,i.jsxs)(o.xu,{children:[(0,i.jsx)(o.X6,{children:a}),(0,i.jsx)(o.xu,{height:"65vh",overflow:"scroll",children:(0,i.jsx)(L,{children:g})})]})};function B(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var G,Y=function(n){var e=n.session;window.bugger=e,window.mutate=(0,v.kY)().mutate;var t=y({session:e}),r=t.sources,o=t.status,a=O({session:e}),c=a.currentSourceRange,u=(a.status,(r||[]).map((function(n,e){return B({},n.id,e)})).reduce((function(n,e){return function(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})))),r.forEach((function(e){B(n,e,t[e])}))}return n}({},n,e)}),{})),l=(0,s.useState)(0),f=l[0],x=l[1],g=(0,s.useState)(void 0),b=g[0],m=g[1],j=null===c||void 0===c?void 0:c.traceIndex,w=null===c||void 0===c?void 0:c.source.id,S=u[w||""]||0;return console.debug("currentTabIndex %s",S),(0,s.useEffect)((function(){w&&j!==b&&x(S)}),[w,S,j,b]),r?(0,i.jsxs)(h.mQ,{index:f,onChange:function(n){m(j),x(n)},children:[(0,i.jsx)(h.td,{overflowY:"hidden",sx:{scrollbarWidth:"none","::-webkit-scrollbar":{display:"none"}},children:r.map((function(n){var e=n.id,t=n.sourcePath;return e===w?(0,i.jsxs)(h.OK,{children:[(0,i.jsx)(p.XC,{}),d().basename(t)]},e):(0,i.jsx)(h.OK,{children:d().basename(t)},e)}))}),(0,i.jsx)(h.nP,{children:r.map((function(n){return(0,i.jsx)(h.x4,{children:c&&c.source.id===n.id?(0,i.jsx)(X,{source:n,currentSourceRange:c}):(0,i.jsx)(X,{source:n})},n.id)}))})]}):(0,i.jsxs)("p",{children:["Loading sources, status: ",o]})},Q=t(49770);function nn(n,e,t,r,i,s,o){try{var a=n[s](o),c=a.value}catch(u){return void t(u)}a.done?e(c):Promise.resolve(c).then(r,i)}!function(n){n.Waiting="waiting",n.Pending="pending",n.Ready="ready",n.Failed="failed"}(G||(G={}));var en=function(n){var e,t=n.session,r=(0,Q.Z)("/variables",(e=g().mark((function n(){return g().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t){n.next=2;break}return n.abrupt("return");case 2:return n.next=4,new Promise((function(n){return setTimeout(n,0)}));case 4:return n.next=6,t.variables({indicateUnknown:!0});case 6:return n.abrupt("return",n.sent);case 7:case"end":return n.stop()}}),n)})),function(){var n=this,t=arguments;return new Promise((function(r,i){var s=e.apply(n,t);function o(n){nn(s,r,i,o,a,"next",n)}function a(n){nn(s,r,i,o,a,"throw",n)}o(void 0)}))})),i=r.data,o=r.error,a=r.mutate;(0,s.useEffect)((function(){t&&a()}),[t,a]);var c=t?o?G.Failed:i?G.Ready:G.Pending:G.Waiting;return c===G.Ready?{variables:i,status:c}:{status:c}},tn=t(79042),rn=t(41008);function sn(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function on(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,i,s=[],o=!0,a=!1;try{for(t=t.call(n);!(o=(r=t.next()).done)&&(s.push(r.value),!e||s.length!==e);o=!0);}catch(c){a=!0,i=c}finally{try{o||null==t.return||t.return()}finally{if(a)throw i}}return s}}(n,e)||function(n,e){if(!n)return;if("string"===typeof n)return sn(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return sn(n,e)}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var an=t(29489),cn=function(n){var e=n.session,t=en({session:e}),r=t.variables,s=t.status;return r?(0,i.jsxs)(o.xu,{children:[(0,i.jsx)(o.X6,{children:"Variables"}),(0,i.jsx)(tn.xJ,{children:(0,i.jsxs)(tn.iA,{variant:"simple",children:[(0,i.jsx)(tn.hr,{children:(0,i.jsxs)(tn.Tr,{children:[(0,i.jsx)(tn.Th,{children:"Identifier"}),(0,i.jsx)(tn.Th,{children:"Value"})]})}),(0,i.jsx)(tn.p3,{children:Object.entries(r).map((function(n,e){var t=on(n,2),r=t[0],s=t[1];return(0,i.jsxs)(tn.Tr,{children:[(0,i.jsx)(tn.Td,{children:r}),(0,i.jsx)(tn.Td,{children:an(new rn.Export.ResultInspector(s))})]},r)}))})]})})]}):(0,i.jsxs)("p",{children:["Loading variables, status: ",s]})},un=t(3581),ln=function(n){var e=n.provider,t=n.transactionHash,r=n.fetchCompilations,s=(0,l.Z)({provider:e,transactionHash:t,fetchCompilations:r}),f=s.session,d=s.status,h=s.fetchProgress;switch(d){case l.q.Initializing:return(0,i.jsxs)(o.xu,{children:[(0,i.jsxs)(o.X6,{children:[(0,i.jsx)(a.$,{}),(0,i.jsx)(o.xv,{children:"Preparing to start debugger..."})]}),(0,i.jsxs)(o.Kq,{children:[(0,i.jsx)(c.Od,{height:"20px"}),(0,i.jsx)(c.Od,{height:"20px"}),(0,i.jsx)(c.Od,{height:"20px"})]})]});case l.q.Fetching:return(0,i.jsxs)(o.xu,{children:[(0,i.jsxs)(o.X6,{children:[(0,i.jsx)(u.D8,{value:h}),(0,i.jsx)(o.xv,{children:"Fetching verified sources..."})]}),(0,i.jsxs)(o.Kq,{children:[(0,i.jsx)(c.Od,{height:"20px"}),(0,i.jsx)(c.Od,{height:"20px"}),(0,i.jsx)(c.Od,{height:"20px"})]})]});case l.q.Starting:return(0,i.jsxs)(o.xu,{children:[(0,i.jsxs)(o.X6,{children:[(0,i.jsx)(a.$,{}),(0,i.jsx)(o.xv,{children:"Starting debugger..."})]}),(0,i.jsxs)(o.Kq,{children:[(0,i.jsx)(c.Od,{height:"20px"}),(0,i.jsx)(c.Od,{height:"20px"}),(0,i.jsx)(c.Od,{height:"20px"})]})]});case l.q.Ready:return(0,i.jsx)(o.xu,{width:"100%",children:(0,i.jsxs)(o.kC,{children:[(0,i.jsxs)(o.xu,{width:"70%",children:[(0,i.jsx)(un.Z,{session:f}),(0,i.jsx)(Y,{session:f})]}),(0,i.jsx)(o.LZ,{}),(0,i.jsx)(o.xu,{width:"30%",marginTop:"6rem",children:(0,i.jsx)(cn,{session:f})})]})})}}},7630:function(n,e,t){"use strict";t.d(e,{Z:function(){return h},q:function(){return r}});var r,i=t(34051),s=t.n(i),o=t(67294),a=t(41008),c=t(49293);function u(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function l(n,e,t,r,i,s,o){try{var a=n[s](o),c=a.value}catch(u){return void t(u)}a.done?e(c):Promise.resolve(c).then(r,i)}function f(n){return function(){var e=this,t=arguments;return new Promise((function(r,i){var s=n.apply(e,t);function o(n){l(s,r,i,o,a,"next",n)}function a(n){l(s,r,i,o,a,"throw",n)}o(void 0)}))}}function d(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,i,s=[],o=!0,a=!1;try{for(t=t.call(n);!(o=(r=t.next()).done)&&(s.push(r.value),!e||s.length!==e);o=!0);}catch(c){a=!0,i=c}finally{try{o||null==t.return||t.return()}finally{if(a)throw i}}return s}}(n,e)||function(n,e){if(!n)return;if("string"===typeof n)return u(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return u(n,e)}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}!function(n){n.Initializing="initializing",n.Fetching="fetching",n.Starting="starting",n.Ready="ready"}(r||(r={}));var h=function(n){var e=n.transactionHash,t=n.provider,i=n.fetchCompilations,a=(0,o.useState)(),c=a[0],u=a[1],l=(0,o.useState)(r.Initializing),d=l[0],h=l[1],v=(0,o.useState)(0),g=v[0],b=v[1];switch((0,o.useEffect)((function(){c||Promise.resolve().then(f(s().mark((function n(){var o;return s().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return h(r.Initializing),n.next=3,p({transactionHash:e,provider:t});case 3:return o=n.sent,u(o),h(r.Fetching),n.next=8,x({session:o,fetchCompilations:i,setFetchProgress:b});case 8:return h(r.Starting),n.next=11,o.startFullMode();case 11:h(r.Ready);case 12:case"end":return n.stop()}}),n)}))))}),[c,t,e,i]),d){case r.Ready:if(!c)throw new Error("Internal error: expected session to be defined");return{status:d,session:c};case r.Fetching:return{status:d,fetchProgress:g};default:return{status:d}}};function p(n){return v.apply(this,arguments)}function v(){return(v=f(s().mark((function n(e){var t,r;return s().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=e.transactionHash,r=e.provider,n.next=3,c.forTx(t,{provider:r,compilations:[],lightMode:!0});case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function x(n){return g.apply(this,arguments)}function g(){return(g=f(s().mark((function n(e){var t,r,i,o,c,u,l,f,h,p,v,x,g,b,m,j;return s().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t=e.session,r=e.fetchCompilations,i=e.setFetchProgress,o=t.selectors,c=t.view(o.session.info.affectedInstances),u=Object.entries(c).filter((function(n){var e=d(n,2);e[0];return void 0===e[1].contractName})).map((function(n){var e=d(n,2),t=e[0];e[1];return t})),l=!0,f=!1,h=void 0,n.prev=5,p=u.entries()[Symbol.iterator]();case 7:if(l=(v=p.next()).done){n.next=20;break}return x=d(v.value,2),g=x[0],b=x[1],n.next=11,r(b);case 11:return m=n.sent,j=a.Compilations.Utils.shimCompilations(m,"externalFor(".concat(b,")Via(Etherscan)")),console.debug("shimmedCompilations %o",j),n.next=16,t.addExternalCompilations(j);case 16:i((function(n){return Math.max(n,100*(g+1)/u.length)}));case 17:l=!0,n.next=7;break;case 20:n.next=26;break;case 22:n.prev=22,n.t0=n.catch(5),f=!0,h=n.t0;case 26:n.prev=26,n.prev=27,l||null==p.return||p.return();case 29:if(n.prev=29,!f){n.next=32;break}throw h;case 32:return n.finish(29);case 33:return n.finish(26);case 34:case"end":return n.stop()}}),n,null,[[5,22,26,34],[27,,29,33]])})))).apply(this,arguments)}},77696:function(){},10346:function(){},46601:function(){},89214:function(){},71922:function(){},2363:function(){},27790:function(){},52361:function(){},94616:function(){},6567:function(){}}]);