(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{48312:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(65153)}])},65153:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return J}});var r=t(85893),s=t(9008),i=t.n(s),o=t(74682),a=t.n(o),c=t(34051),u=t.n(c),l=t(67294),d=t(21581),p=t.n(d),m=t(77806),f=t(41008),h=t(24104),v=t.n(h);function y(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function x(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){y(e,n,t[n])}))}return e}var g=function(e){return e.map((function(e){var n=e.name,t=e.value,r=t.kind,s=t.type.typeClass,i={name:n,kind:r,typeClass:s,type:t.type};return x({},i,"struct"===s?{children:g(t.value)}:{value:t.value?t.value:t})}))},_="https://tx-insights.metaswap.codefi.network",j="".concat(_,"/fetch-project"),k="".concat(_,"/networks"),b=t(20640),w=t.n(b),N=function(e){var n=e.checksummedRecipientAddress,t=e.onRecipientClick,s=(e.addressOnly,e.recipientEns,e.recipientName,(0,l.useState)(!1)),i=s[0],o=s[1],a=n||"newContract";return(0,r.jsxs)("div",{className:"tx-insight tx-insight-component tx-insight-component-address",onClick:function(){w()(n),t&&t()},children:[(0,r.jsx)("div",{className:"tx-insight-component-address__sender-icon",children:"Identicon"}),(0,r.jsx)("div",{className:"address__name",onClick:function(){return o(!0)},children:a}),i?n:null]})};N.propTypes={checksummedRecipientAddress:p().string,recipientName:p().string,recipientEns:p().string,addressOnly:p().bool,onRecipientClick:p().func};var O=N;function S(e,n,t,r,s,i,o){try{var a=e[i](o),c=a.value}catch(u){return void t(u)}a.done?n(c):Promise.resolve(c).then(r,s)}function I(e){return function(){var n=this,t=arguments;return new Promise((function(r,s){var i=e.apply(n,t);function o(e){S(i,r,s,o,a,"next",e)}function a(e){S(i,r,s,o,a,"throw",e)}o(void 0)}))}}function C(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var R=t(29489);function E(e){return P.apply(this,arguments)}function P(){return(P=I(u().mark((function e(n){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch(n).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function q(e){var n=e.options,t=e.from,s=e.tx,i=e.network,o=s.toJSON(),a=o.to,c=o.data,d=(0,l.useState)(),p=d[0],h=d[1],y=(0,l.useState)(),x=y[0],_=y[1],b=(0,l.useState)(),w=b[0],N=b[1],S=(0,l.useState)(),P=S[0],q=S[1],H=(0,l.useState)(!1),T=H[0],A=H[1],D=(0,l.useState)(""),J=D[0],L=D[1];(0,l.useEffect)((function(){var e=v().provider(function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){C(e,n,t[n])}))}return e}({logging:{logger:{log:function(){}}}},n));I(u().mark((function n(){var r,o,l,d,f,v,y,b,O,S;return u().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,p){n.next=20;break}return n.next=4,E(k);case 4:if(n.sent.some((function(e){return e.active&&BigInt(e.chainId)===BigInt(i)}))){n.next=7;break}throw new Error("transactionDecodingUnsupportedNetworkError: "+i);case 7:return r="".concat(j,"?").concat(new URLSearchParams({to:a,"network-id":BigInt(i).toString()})),n.next=10,E(r);case 10:return o=n.sent,l=o.info,o.fetchedVia,o.address,n.next=14,(0,m.forAddress)(a,{provider:e,projectInfo:l});case 14:return d=n.sent,n.next=17,d.decodeTransaction({from:t,to:a,input:c,blockNumber:null});case 17:f=n.sent,v=g(null===f||void 0===f?void 0:f.arguments),h(v);case 20:if(x){n.next=37;break}return n.next=23,e.request({method:"eth_subscribe",params:["logs"]});case 23:return y=n.sent,e.on("message",(function(e){var n=w||[];n.push(e),N(n)})),e.on("ganache:vm:tx:step",(function(e){q(e.data.opcode)})),(b=s.toJSON()).from=t,n.next=30,e.request({method:"eth_sendTransaction",params:[b]});case 30:return O=n.sent,n.next=33,e.request({method:"eth_getTransactionReceipt",params:[O]});case 33:return S=n.sent,n.next=36,e.request({method:"eth_unsubscribe",params:[y]});case 36:_(S);case 37:n.next=43;break;case 39:n.prev=39,n.t0=n.catch(0),A(!0),(null===n.t0||void 0===n.t0?void 0:n.t0.message.match("400"))?L("txInsightsNotSupported"):L(null===n.t0||void 0===n.t0?void 0:n.t0.message);case 43:case"end":return n.stop()}}),n,null,[[0,39]])})))()}),[n,t,a,i,c]);var B=function(e){var n=e.name,t=e.kind,s=e.typeClass,i=e.value;if("error"===t)return(0,r.jsx)("span",{className:"sol-item solidity-error",children:(0,r.jsx)("span",{children:"malformedData"})});switch(s){case"int":return(0,r.jsx)("span",{className:"sol-item solidity-int",children:[i.asBN||i.asString].toString()});case"uint":return(0,r.jsx)("span",{className:"sol-item solidity-uint",children:[i.asBN||i.asString].toString()});case"bytes":return(0,r.jsx)("span",{className:"sol-item solidity-bytes",children:i.asHex});case"array":return(0,r.jsxs)("details",{children:[(0,r.jsxs)("summary",{className:"typography--color-black",children:[n,": "]}),(0,r.jsx)("ol",{children:i.map((function(e,n){var t,s;return(0,r.jsx)("li",{children:B({typeClass:null===(t=e.type)||void 0===t?void 0:t.typeClass,value:e.value,kind:e.kind})},"".concat(null===(s=e.type)||void 0===s?void 0:s.typeClass,"-").concat(n))}))})]});case"address":var o=null===i||void 0===i?void 0:i.asAddress;return(0,r.jsx)(O,{addressOnly:!0,checksummedRecipientAddress:o});default:return(0,r.jsx)("pre",{className:"sol-item solidity-raw",children:R(new f.Format.Utils.Inspect.ResultInspector(i))})}},U=function(e,n){var t=e.name,s=e.kind,i=e.typeClass,o=e.type,a=e.value,c=e.children;return c?(0,r.jsx)("li",{children:(0,r.jsxs)("details",{open:0===n,children:[(0,r.jsxs)("summary",{children:[t,": "]}),(0,r.jsx)("ol",{children:c.map(U)})]})},"".concat(i,"-").concat(n)):(0,r.jsx)("li",{className:"solidity-value",children:(0,r.jsxs)("div",{className:"solidity-named-item solidity-item",children:["array"===i||Array.isArray(a)?null:(0,r.jsxs)("span",{className:"param-name typography--color-black",children:[t,": "]}),(0,r.jsx)("span",{className:"sol-item solidity-uint",children:B({name:t,typeClass:i,type:o,value:a,kind:s})})]})},"".concat(i,"-").concat(n))};return(0,r.jsx)("div",{className:"tx-insight",children:T?(0,r.jsxs)("div",{className:"tx-insight-error",children:["Error: ",J]}):(0,r.jsxs)("div",{className:"tx-insight-content",children:[(0,r.jsx)("div",{children:P?JSON.stringify(P):""}),(0,r.jsx)("div",{children:w?JSON.stringify(w):""}),(0,r.jsx)("div",{children:JSON.stringify(x)}),(0,r.jsx)("div",{className:"tx-insight-content__tree-component",children:(0,r.jsx)("ol",{children:p?p.map(U):""})})]})})}q.propTypes={tx:p().object.isRequired,from:p().string.isRequired,network:p().number.isRequired,options:p().object.isRequired};var H=t(66052),T=t(11163),A=t(2832),D=t.n(A),J=function(){var e=(0,T.useRouter)();if(!e.isReady)return(0,r.jsx)("div",{className:a().container,children:"Loading... "});var n={view:null};try{var t=JSON.parse(e.query.tx);if(t){var s=new Set([1,3,4,5,42,11155111]),o=parseInt(e.query.chainId),c=parseInt(e.query.networkId),u=D().forCustomChain(s.has(o)?o:1,{name:"ganache-fork",defaultHardfork:"london",networkId:c,chainId:o,comment:"Local test network fork"});n.tx=H.TransactionFactory.fromTxData(t,{common:u}),n.from=t.from,n.networkId=c,n.options={fork:{url:e.query.rpcUrl,blockNumber:parseInt(e.query.blockNumber)},chain:{chainId:o,networkId:c},wallet:{unlockedAccounts:[t.from]}}}}catch(l){console.error(l)}return(0,r.jsxs)("div",{suppressHydrationWarning:!0,className:a().container,children:[(0,r.jsx)(i(),{children:(0,r.jsx)("title",{children:"Clairvoyance"})}),n.tx?(0,r.jsx)(q,{from:n.from,options:n.options,tx:n.tx,network:n.networkId}):(0,r.jsx)("div",{children:"TODO"})]})}},74682:function(e){e.exports={container:"Home_container__bCOhY",main:"Home_main__nLjiQ",footer:"Home_footer____T7K",title:"Home_title__T09hD",description:"Home_description__41Owk",code:"Home_code__suPER",grid:"Home_grid__GxQ85",card:"Home_card___LpL1",logo:"Home_logo__27_tb"}},49496:function(){},88677:function(){},62808:function(){},46601:function(){},89214:function(){},85568:function(){},52361:function(){},94616:function(){},87500:function(){}},function(e){e.O(0,[482,714,371,43,606,774,888,179],(function(){return n=48312,e(e.s=n);var n}));var n=e.O();_N_E=n}]);