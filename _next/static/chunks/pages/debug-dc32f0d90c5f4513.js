(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[94],{60467:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/debug",function(){return t(52388)}])},52388:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return Tn}});var r,i=t(34051),o=t.n(i),a=t(85893),s=t(68527),u=t(11163),c=t(3283),l=t.n(c),f=t(67294),d=t(41008),h=t(49293);function p(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function v(n,e,t,r,i,o,a){try{var s=n[o](a),u=s.value}catch(c){return void t(c)}s.done?e(u):Promise.resolve(u).then(r,i)}function b(n){return function(){var e=this,t=arguments;return new Promise((function(r,i){var o=n.apply(e,t);function a(n){v(o,r,i,a,s,"next",n)}function s(n){v(o,r,i,a,s,"throw",n)}a(void 0)}))}}function g(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,i,o=[],a=!0,s=!1;try{for(t=t.call(n);!(a=(r=t.next()).done)&&(o.push(r.value),!e||o.length!==e);a=!0);}catch(u){s=!0,i=u}finally{try{a||null==t.return||t.return()}finally{if(s)throw i}}return o}}(n,e)||function(n,e){if(!n)return;if("string"===typeof n)return p(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return p(n,e)}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}!function(n){n.Initializing="initializing",n.Fetching="fetching",n.Starting="starting",n.Ready="ready"}(r||(r={}));function m(n){return x.apply(this,arguments)}function x(){return(x=b(o().mark((function n(e){var t,r;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=e.transactionHash,r=e.provider,n.next=3,h.forTx(t,{provider:r,compilations:[],lightMode:!0});case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function y(n){return w.apply(this,arguments)}function w(){return(w=b(o().mark((function n(e){var t,r,i,a,s,u,c,l,f,h,p,v,b;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t=e.session,r=e.fetchCompilations,i=t.selectors,a=t.view(i.session.info.affectedInstances),s=Object.entries(a).filter((function(n){var e=g(n,2);e[0];return void 0===e[1].contractName})).map((function(n){var e=g(n,2),t=e[0];e[1];return t})),u=!0,c=!1,l=void 0,n.prev=5,f=s[Symbol.iterator]();case 7:if(u=(h=f.next()).done){n.next=19;break}return p=h.value,n.next=11,r(p);case 11:return v=n.sent,b=d.Compilations.Utils.shimCompilations(v,"externalFor(".concat(p,")Via(Etherscan)")),console.debug("shimmedCompilations %o",b),n.next=16,t.addExternalCompilations(b);case 16:u=!0,n.next=7;break;case 19:n.next=25;break;case 21:n.prev=21,n.t0=n.catch(5),c=!0,l=n.t0;case 25:n.prev=25,n.prev=26,u||null==f.return||f.return();case 28:if(n.prev=28,!c){n.next=31;break}throw l;case 31:return n.finish(28);case 32:return n.finish(25);case 33:case"end":return n.stop()}}),n,null,[[5,21,25,33],[26,,28,32]])})))).apply(this,arguments)}var j,P=t(1864),S=t.n(P),k=t(99839),O=t(29736),R=t(8100);function A(n,e,t,r,i,o,a){try{var s=n[o](a),u=s.value}catch(c){return void t(c)}s.done?e(u):Promise.resolve(u).then(r,i)}!function(n){n.Waiting="waiting",n.Pending="pending",n.Ready="ready",n.Failed="failed"}(j||(j={}));var I,E=function(n){var e,t=n.session,r=(0,R.ZP)("/sources",(e=o().mark((function n(){var e;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(console.debug("fetching sources"),t){n.next=3;break}return n.abrupt("return");case 3:return n.next=5,new Promise((function(n){return setTimeout(n,0)}));case 5:return e=t.view(h.selectors.sourcemapping.views.sources),console.debug("sources %o",Object.values(e).map((function(n){return n.sourcePath}))),n.abrupt("return",e);case 8:case"end":return n.stop()}}),n)})),function(){var n=this,t=arguments;return new Promise((function(r,i){var o=e.apply(n,t);function a(n){A(o,r,i,a,s,"next",n)}function s(n){A(o,r,i,a,s,"throw",n)}a(void 0)}))})),i=r.data,a=r.error,s=r.mutate;(0,f.useEffect)((function(){t&&s()}),[t,s]);var u=t?a?j.Failed:i?j.Ready:j.Pending:j.Waiting;return u===j.Ready?{sources:Object.values(i).flatMap((function(n){var e=n.id,t=n.sourcePath,r=n.source,i=n.language;return"Solidity"===i?[{id:e,sourcePath:t,contents:r,language:i}]:[]})),status:u}:{status:u}};function C(n,e,t,r,i,o,a){try{var s=n[o](a),u=s.value}catch(c){return void t(c)}s.done?e(u):Promise.resolve(u).then(r,i)}!function(n){n.Waiting="waiting",n.Pending="pending",n.Ready="ready",n.Failed="failed"}(I||(I={}));var T,_=function(n){var e,t=n.session,r=(0,R.ZP)("/currentSourceRange",(e=o().mark((function n(){var e,r,i,a,s,u;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t){n.next=2;break}return n.abrupt("return");case 2:return e=t.view(h.selectors.trace.index),r=t.view(h.selectors.sourcemapping.current.source).id,i=t.view(h.selectors.sourcemapping.current.sourceRange),a=i.lines,s=a.start,u=a.end,n.abrupt("return",{traceIndex:e,source:{id:r},start:s,end:u});case 6:case"end":return n.stop()}}),n)})),function(){var n=this,t=arguments;return new Promise((function(r,i){var o=e.apply(n,t);function a(n){C(o,r,i,a,s,"next",n)}function s(n){C(o,r,i,a,s,"throw",n)}a(void 0)}))})),i=r.data,a=r.error,s=r.mutate;(0,f.useEffect)((function(){t&&s()}),[t,s]);var u=t?a?I.Failed:i?I.Ready:I.Pending:I.Waiting;return u===I.Ready?{currentSourceRange:i,status:u}:{status:u}},F=t(18835),N=t.n(F),Z=t(63081),H=t(26912),W=t.n(H),z=t(96988),M=t.n(z),U=t(53918),L=function(n,e,t){return function(r){return"rgba(".concat(n,",").concat(e,",").concat(t,",").concat(r,")")}};!function(n){n.LIGHT="light",n.DARK="dark"}(T||(T={}));var D="#d60000",V="#47BAA7",J=(L(220,220,220),L(108,136,209),L(209,0,0),L(248,245,240),"#efe5dc");function X(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}function $(){var n=X(["\n  background: ",";\n/*border-color: ",";*/\n  border-width: 1px;\n  border-style: solid;\n  border-radius: 0.4rem;\n  width: fit-content;\n  min-width: 100%;\n\n  &:hover .fas.fa-dot-circle.faded {\n    color: ",";\n    opacity: 0.5;\n  }\n"]);return $=function(){return n},n}function B(){var n=X(['\n  font-family: "Ubuntu Mono", monospace;\n  white-space: pre;\n  padding-left: 0.2rem;\n  cursor: text;\n']);return B=function(){return n},n}function G(){var n=X(["\n  color: ",";\n  padding-left: 0.2rem;\n  cursor: pointer;\n"]);return G=function(){return n},n}function K(){var n=X(["\n  text-align: center;\n  display: inline-block;\n  color: ",";\n  cursor: pointer;\n  padding-left: 0.2rem;\n  width: 1.1rem;\n  height: 1rem;\n"]);return K=function(){return n},n}var Y=J,q=U.ZP.div($(),(function(n){var e=n.selected;return"".concat(e?"#fffbbc":Y)}),(function(n){var e=n.selected;return"".concat(e?"#fbbd7a":Y)}),D),Q=U.ZP.span(B()),nn=U.ZP.span(G(),"#c8c8c8"),en=(U.ZP.i(K(),(function(n){return n.isBreakpoint?D:J})),function(n){n.source;var e=n.lineContents,t=n.lineNumber,r=n.lineRef,i=n.selected,o=n.lineNumbersGutterWidth,s=(t+1).toString(),u="".concat(" ".repeat(o-s.length)).concat(s);return(0,a.jsx)(q,{selected:i,ref:r,children:(0,a.jsxs)(Q,{children:[(0,a.jsxs)(nn,{children:[u,"."," "]}),(0,a.jsx)("span",{dangerouslySetInnerHTML:{__html:e}})]})},"contract-source-".concat(t))});function tn(){var n,e,t=(n=["\n  .hljs-comment,\n  .hljs-quote {\n    color: ",";\n    font-style: italic;\n  }\n\n  .hljs-keyword,\n  .hljs-selector-tag,\n  .hljs-subst {\n    color: ",";\n    font-weight: bold;\n  }\n\n  .hljs-number,\n  .hljs-literal,\n  .hljs-variable,\n  .hljs-template-variable,\n  .hljs-tag .hljs-attr {\n    color: ",";\n  }\n\n  .hljs-string,\n  .hljs-doctag {\n    color: ",";\n  }\n\n  .hljs-title,\n  .hljs-section,\n  .hljs-selector-id {\n    color: ",";\n    font-weight: bold;\n  }\n\n  .hljs-subst {\n    font-weight: normal;\n  }\n\n  .hljs-type,\n  .hljs-class .hljs-title {\n    color: ",";\n    font-weight: bold;\n  }\n\n  .hljs-tag,\n  .hljs-name,\n  .hljs-attribute {\n    color: ",";\n    font-weight: normal;\n  }\n\n  .hljs-built_in,\n  .hljs-builtin-name {\n    color: ",";\n  }\n"],e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}})));return tn=function(){return t},t}var rn=U.ZP.div(tn(),"rgba(0, 0, 0, 0.5)","#ea1bc0","#b3004f","#e4a663",V,V,V,V);W().registerLanguage("solidity",M().solidity);var on=function(n){var e=n.source,t=n.currentSourceRange,r=e.id,i=e.sourcePath,o=e.contents,u=(0,f.useState)(0),c=(u[0],u[1],(0,f.useRef)(null),(0,f.useState)("")),l=c[0],d=c[1],h=(null===t||void 0===t?void 0:t.start.line)||0;(0,f.useEffect)((function(){Promise.resolve().then((function(){var n=N()().use(Z.Z);d(n.stringify({type:"root",children:W().highlight("solidity",o).value}).toString())}))}),[o]);var p=l.split("\n"),v=p.length.toString().length,b=p.map((function(n,e){return(0,f.createRef)()}));(0,f.useEffect)((function(){var n,e;null===(n=b[h])||void 0===n||null===(e=n.current)||void 0===e||e.scrollIntoView({block:"nearest",inline:"nearest"})}),[h]);var g=b.map((function(n,i){var o=p[i],s=!!t&&i>=t.start.line&&(null===t.end.line||i<=t.end.line);return(0,a.jsx)(en,{source:e,lineContents:o,lineNumber:i,selected:s,lineRef:n,lineNumbersGutterWidth:v},"".concat(r,"-line-").concat(i))}));return(0,a.jsxs)(s.xu,{height:"100%",children:[(0,a.jsx)(s.X6,{children:i}),(0,a.jsx)(s.xu,{height:"100%",overflow:"scroll",children:(0,a.jsx)(rn,{children:g})})]})};function an(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var sn,un=function(n){var e=n.session;window.bugger=e,window.mutate=(0,R.kY)().mutate;var t=E({session:e}),r=t.sources,i=t.status,o=_({session:e}),s=o.currentSourceRange,u=(o.status,e.view(h.selectors.trace.finished));console.debug("isFinished %o",u);var c=(r||[]).map((function(n,e){return an({},n.id,e)})).reduce((function(n,e){return function(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})))),r.forEach((function(e){an(n,e,t[e])}))}return n}({},n,e)}),{}),l=(0,f.useState)(0),d=l[0],p=l[1],v=(0,f.useState)(void 0),b=v[0],g=v[1],m=null===s||void 0===s?void 0:s.traceIndex,x=u||null===s||void 0===s?void 0:s.source.id,y=c[x||""]||0;return console.debug("currentTabIndex %s",y),(0,f.useEffect)((function(){x&&m!==b&&p(y)}),[x,y,m,b]),r?(0,a.jsxs)(k.mQ,{height:"100%",index:d,onChange:function(n){g(m),p(n)},children:[(0,a.jsx)(k.td,{overflowY:"hidden",sx:{scrollbarWidth:"none","::-webkit-scrollbar":{display:"none"}},children:r.map((function(n){var e=n.id,t=n.sourcePath;return e===x?(0,a.jsxs)(k.OK,{children:[(0,a.jsx)(O.XC,{}),S().basename(t)]},e):(0,a.jsx)(k.OK,{children:S().basename(t)},e)}))}),(0,a.jsx)(k.nP,{height:"100%",children:r.map((function(n){return(0,a.jsx)(k.x4,{height:"100%",children:s&&s.source.id===n.id?(0,a.jsx)(on,{source:n,currentSourceRange:s}):(0,a.jsx)(on,{source:n})},n.id)}))})]}):(0,a.jsxs)("p",{children:["Loading sources, status: ",i]})},cn=t(49770);function ln(n,e,t,r,i,o,a){try{var s=n[o](a),u=s.value}catch(c){return void t(c)}s.done?e(u):Promise.resolve(u).then(r,i)}!function(n){n.Waiting="waiting",n.Pending="pending",n.Ready="ready",n.Failed="failed"}(sn||(sn={}));var fn=function(n){var e,t=n.session,r=(0,cn.Z)("/variables",(e=o().mark((function n(){return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t){n.next=2;break}return n.abrupt("return");case 2:return n.next=4,new Promise((function(n){return setTimeout(n,0)}));case 4:return n.next=6,t.variables({indicateUnknown:!0});case 6:return n.abrupt("return",n.sent);case 7:case"end":return n.stop()}}),n)})),function(){var n=this,t=arguments;return new Promise((function(r,i){var o=e.apply(n,t);function a(n){ln(o,r,i,a,s,"next",n)}function s(n){ln(o,r,i,a,s,"throw",n)}a(void 0)}))})),i=r.data,a=r.error,s=r.mutate;(0,f.useEffect)((function(){t&&s()}),[t,s]);var u=t?a?sn.Failed:i?sn.Ready:sn.Pending:sn.Waiting;return u===sn.Ready?{variables:i,status:u}:{status:u}},dn=t(79042);function hn(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function pn(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,i,o=[],a=!0,s=!1;try{for(t=t.call(n);!(a=(r=t.next()).done)&&(o.push(r.value),!e||o.length!==e);a=!0);}catch(u){s=!0,i=u}finally{try{a||null==t.return||t.return()}finally{if(s)throw i}}return o}}(n,e)||function(n,e){if(!n)return;if("string"===typeof n)return hn(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return hn(n,e)}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var vn=t(29489),bn=function(n){var e=n.session,t=fn({session:e}),r=t.variables,i=t.status;return r?(0,a.jsx)(dn.xJ,{children:(0,a.jsxs)(dn.iA,{variant:"simple",children:[(0,a.jsx)(dn.hr,{children:(0,a.jsxs)(dn.Tr,{children:[(0,a.jsx)(dn.Th,{children:"Identifier"}),(0,a.jsx)(dn.Th,{children:"Value"})]})}),(0,a.jsx)(dn.p3,{children:Object.entries(r).map((function(n,e){var t=pn(n,2),r=t[0],i=t[1];return(0,a.jsxs)(dn.Tr,{children:[(0,a.jsx)(dn.Td,{children:r}),(0,a.jsx)(dn.Td,{children:vn(new d.Export.ResultInspector(i))})]},r)}))})]})}):(0,a.jsxs)("p",{children:["Loading variables, status: ",i]})},gn=t(10894),mn=t(86541),xn=t(15193),yn=t(49609),wn=t(5434);function jn(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function Pn(n,e,t,r,i,o,a){try{var s=n[o](a),u=s.value}catch(c){return void t(c)}s.done?e(u):Promise.resolve(u).then(r,i)}function Sn(n){return function(){var e=this,t=arguments;return new Promise((function(r,i){var o=n.apply(e,t);function a(n){Pn(o,r,i,a,s,"next",n)}function s(n){Pn(o,r,i,a,s,"throw",n)}a(void 0)}))}}function kn(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,i,o=[],a=!0,s=!1;try{for(t=t.call(n);!(a=(r=t.next()).done)&&(o.push(r.value),!e||o.length!==e);a=!0);}catch(u){s=!0,i=u}finally{try{a||null==t.return||t.return()}finally{if(s)throw i}}return o}}(n,e)||function(n,e){if(!n)return;if("string"===typeof n)return jn(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return jn(n,e)}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var On=function(n){var e=n.isStepping,t=n.isAtEnd;return e||t},Rn=function(n){var e=n.session,t=(0,f.useState)(!1),r=t[0],i=t[1],s=0===e.view(h.selectors.trace.index),u=e.view(h.selectors.trace.finished),c=(0,R.kY)().mutate,l=function(n){return{continue:{Icon:function(){return(0,a.jsx)(gn.JO,{as:wn.yV_})},label:"Continue until breakpoint",shouldDisable:On,step:Sn(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.continueUntilBreakpoint();case 2:case"end":return e.stop()}}),e)})))},next:{Icon:function(){return(0,a.jsx)(gn.JO,{as:wn.p0p})},label:"Step next",shouldDisable:On,step:Sn(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.stepNext();case 2:case"end":return e.stop()}}),e)})))},reset:{Icon:function(){return(0,a.jsx)(gn.JO,{as:wn.FVj})},label:"Reset to beginning",shouldDisable:function(n){var e=n.isStepping,t=n.isAtStart;return e||t},step:Sn(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.reset();case 2:case"end":return e.stop()}}),e)})))}}}(e),d=Object.entries(l).map((function(n){var e=kn(n,2),t=e[0],l=e[1],f=l.Icon,d=l.label,h=l.step,p=l.shouldDisable;return(0,a.jsx)(mn.u,{label:d,children:(0,a.jsx)(xn.hU,{"aria-label":d,icon:(0,a.jsx)(f,{}),disabled:p({isStepping:r,isAtStart:s,isAtEnd:u}),onClick:function(){i(!0),setTimeout(Sn(o().mark((function n(){return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,h();case 2:c("/variables"),c("/currentSourceRange"),i(!1);case 4:case"end":return n.stop()}}),n)}))),0)}})},t)})),p=r?(0,a.jsx)(yn.$,{}):(0,a.jsx)(a.Fragment,{});return(0,a.jsxs)(xn.hE,{children:[d,p]})},An=function(n){var e=function(n){var e=n.transactionHash,t=n.provider,i=n.fetchCompilations,a=(0,f.useState)(),s=a[0],u=a[1],c=(0,f.useState)(r.Initializing),l=c[0],d=c[1];if((0,f.useEffect)((function(){s||Promise.resolve().then(b(o().mark((function n(){var a;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return d(r.Initializing),n.next=3,m({transactionHash:e,provider:t});case 3:return a=n.sent,u(a),d(r.Fetching),n.next=8,y({session:a,fetchCompilations:i});case 8:return d(r.Starting),n.next=11,a.startFullMode();case 11:d(r.Ready);case 12:case"end":return n.stop()}}),n)}))))}),[s,t,e,i]),l===r.Ready){if(!s)throw new Error("Internal error: expected session to be defined");return{status:l,session:s}}return{status:l}}({provider:n.provider,transactionHash:n.transactionHash,fetchCompilations:n.fetchCompilations}),t=e.session;return e.status!==r.Ready?(0,a.jsx)("p",{children:"Loading debugger..."}):(0,a.jsx)(s.xu,{width:"100%",height:"100%",children:(0,a.jsxs)(s.kC,{height:"100%",children:[(0,a.jsxs)(s.xu,{width:"70%",height:"100%",children:[(0,a.jsx)(Rn,{session:t}),(0,a.jsx)(un,{session:t})]}),(0,a.jsx)(s.LZ,{}),(0,a.jsx)(s.xu,{width:"30%",children:(0,a.jsx)(bn,{session:t})})]})})},In=t(9669),En=t.n(In);function Cn(n,e,t,r,i,o,a){try{var s=n[o](a),u=s.value}catch(c){return void t(c)}s.done?e(u):Promise.resolve(u).then(r,i)}var Tn=function(){(0,u.useRouter)();var n=function(n){var e=n.url;return new(l().providers.HttpProvider)(e)}({url:"http://erigon.dappnode:8545"}),e=function(){var n,e=(n=o().mark((function n(e){var t,r,i;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,En().get("http://localhost:8080/address?address=".concat(e,"&network-id=1"));case 3:return t=n.sent,r=t.data,i=r.compileResult.compilations,n.abrupt("return",i);case 8:return n.prev=8,n.t0=n.catch(0),n.abrupt("return",[]);case 11:case"end":return n.stop()}}),n,null,[[0,8]])})),function(){var e=this,t=arguments;return new Promise((function(r,i){var o=n.apply(e,t);function a(n){Cn(o,r,i,a,s,"next",n)}function s(n){Cn(o,r,i,a,s,"throw",n)}a(void 0)}))});return function(n){return e.apply(this,arguments)}}();return(0,a.jsx)(s.xu,{width:"100vw",height:"70vh",children:(0,a.jsx)(An,{provider:n,transactionHash:"0x12a339d1cb4014974199fdd21f9474b1b6909035a4c3d208165f1f3ba433416f",fetchCompilations:e})})}},77696:function(){},10346:function(){},46601:function(){},89214:function(){},71922:function(){},2363:function(){},27790:function(){},52361:function(){},94616:function(){},6567:function(){}},function(n){n.O(0,[482,714,43,228,503,1,774,888,179],(function(){return e=60467,n(n.s=e);var e}));var e=n.O();_N_E=e}]);