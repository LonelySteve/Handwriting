/*!
 * 
 * Handwriting v0.1.2
 * 
 * Copyright (c) 2021 JLoeve, https://github.com/LonelySteve/Handwriting
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 *         
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Handwriting=e():t.Handwriting=e()}(window,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),i=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(o,i){function u(t){try{c(r.next(t))}catch(t){i(t)}}function a(t){try{c(r.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(u,a)}c((r=r.apply(t,e||[])).next())}))},u=this&&this.__generator||function(t,e){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=e.call(t,u)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},a=this&&this.__read||function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),u=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)u.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return u},c=this&&this.__spreadArray||function(t,e){for(var n=0,r=e.length,o=t.length;n<r;n++,o++)t[o]=e[n];return t};Object.defineProperty(e,"__esModule",{value:!0});var s=n(2),f=n(3),l=n(5),p=n(6),v=function(t){function e(e){var n=t.call(this,"<"+e.tagName+"/> is empty element")||this;return n.element=e,n}return o(e,t),e}(Error);function h(t){var e=void 0;return"string"==typeof t&&(e=Array.prototype.slice.call(document.querySelectorAll(t))),t instanceof Array&&(e=t),e?{map:e.map.bind(e)}:{map:function(e){return t.map((function(t){return e(this,t)})).toArray()}}}var d=function(){function t(t,e,n){void 0===n&&(n={}),this.options=n,this.elements=new Map,this.service="string"==typeof e?p.getQQShuruService(e):e,this.mount(t)}return t.prototype.reset=function(){var t;null===(t=this.options.onBeforeReset)||void 0===t||t.call(this),this.unmount(c([],a(this.elements.keys())))},t.prototype.mount=function(t,e){var n=this;h(t).map((function(t){n._mount(t,e)}))},t.prototype.unmount=function(t){var e=this;h(t).map((function(t){e._unmount(t)}))},t.prototype.query=function(t,e){return void 0===e&&(e=!1),i(this,void 0,void 0,(function(){var n=this;return u(this,(function(r){return[2,Promise.all(h(t).map((function(t){return n._query(t,e)})))]}))}))},t.prototype._mount=function(t,e){var n=this;if(this.elements.has(t))return this.elements.get(t);this.ensureIsNotEmptyElement(t),e=Object.assign({},this.options,e);var r=[],o=this.createCanvasElement(e),i=o.getContext("2d");this.resetCanvasContext(e,i),this.updateCanvasSize(e,t,i);var u=this.bindListeners(e,r,t,i);u.forEach((function(t,e){return l.addEventListeners(e,t)}));var a=this.bindProperties(e,t);t.append(o);var c={data:r,canvasElement:o,listeners:u,properties:a,query:function(t){return void 0===t&&(t=!0),n.service(r).then((function(o){return t&&n.clearCanvasAndData(i,r,e),o}))},forceUpdateCanvasSize:function(){n.updateCanvasSize(e,t,i)}};return this.elements.set(t,c),c},t.prototype._unmount=function(t){if(!this.elements.has(t))return!1;var e=this.elements.get(t),n=e.properties,r=e.listeners,o=e.data,i=e.canvasElement;return o.length=0,n.forEach((function(t,e){return f(e,t)})),r.forEach((function(t,e){return l.removeEventListeners(e,t)})),this.elements.delete(t),i.remove(),!0},t.prototype._query=function(t,e){return void 0===e&&(e=!1),i(this,void 0,void 0,(function(){return u(this,(function(n){switch(n.label){case 0:if(!this.elements.has(t))throw new Error("no such element: "+t);return[4,this.elements.get(t).query(e)];case 1:return[2,n.sent()]}}))}))},t.prototype.ensureIsNotEmptyElement=function(t){var e=t.tagName.toUpperCase();if("AREA,BASE,BR,COL,COMMAND,EMBED,HR,IMG,INPUT,KEYGEN,LINK,META,PARAM,SOURCE,TRACK,WBR".includes(e)||"COLGROUP"===e&&t.hasAttribute("span"))throw new v(t)},t.prototype.clearCanvasAndData=function(t,e,n){t.canvas.width=t.canvas.width,e.length=0,this.resetCanvasContext(n,t)},t.prototype.bindProperties=function(t,e){var n={style:{position:e.style.position}};return e.style.position="relative",new Map([[e,n]])},t.prototype.bindListeners=function(t,e,n,r){var o=this,i=t.onStart,u=t.onEnd,a=t.dblclickClear,c=t.pressureFactor,f=t.autoSubmitInterval,l=t.autoSubmitWithClearCanvas,p=void 0===l||l,v=new Map;v.set(window,{resize:s((function(){o.updateCanvasSize(t,n,r)}),200)});var h,d=!1,y=s((function(){if(0!==e.length)var i=h=o.service(e).then((function(t){i===h&&!d&&u&&u.call(o,n,t)})).catch((function(t){i===h&&!d&&u&&u.call(o,n,null,t)})).finally((function(){i===h&&!d&&p&&o.clearCanvasAndData(r,e,t)}))}),f),b=function(){d=!1,r.closePath(),f>0&&y()};return v.set(r.canvas,{pointerdown:function(t){var u=t.offsetX,a=t.offsetY,c=t.pointerId;d=!0,y.cancel(),r.canvas.setPointerCapture(c),r.moveTo(u,a),r.beginPath(),e.push([[~~u,~~a]]),i&&i.call(o,n)},pointermove:function(t){var n=t.offsetX,o=t.offsetY,i=t.movementX,u=t.movementY,a=t.pressure;d&&(c&&(r.lineWidth=a*c),r.lineTo(n,o),r.stroke(),e.slice(-1)[0].push([~~i,~~u]))},pointerup:b,pointerleave:b,dblclick:function(){!a||f>0||(e.length=0,r.canvas.width=r.canvas.width,o.resetCanvasContext(t,r))}}),v},t.prototype.updateCanvasSize=function(t,e,n){var r=e.offsetHeight,o=e.offsetWidth;n.canvas.width=o,n.canvas.height=r,this.resetCanvasContext(t,n)},t.prototype.resetCanvasContext=function(t,e){var n=t.style,r=t.width;e.lineWidth=null!=r?r:1,e.strokeStyle=n,e.lineJoin="round",e.lineCap="round"},t.prototype.createCanvasElement=function(t){var e=t.zIndex,n=void 0===e?100:e,r=document.createElement("canvas");return r.style.position="absolute",r.style.zIndex=n.toString(),r.style.top=r.style.left=r.style.bottom=r.style.right=(0).toString(),r},t}();e.default=d},function(t,e,n){(function(e){var n=/^\s+|\s+$/g,r=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,i=/^0o[0-7]+$/i,u=parseInt,a="object"==typeof e&&e&&e.Object===Object&&e,c="object"==typeof self&&self&&self.Object===Object&&self,s=a||c||Function("return this")(),f=Object.prototype.toString,l=Math.max,p=Math.min,v=function(){return s.Date.now()};function h(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function d(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==f.call(t)}(t))return NaN;if(h(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=h(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(n,"");var a=o.test(t);return a||i.test(t)?u(t.slice(2),a?2:8):r.test(t)?NaN:+t}t.exports=function(t,e,n){var r,o,i,u,a,c,s=0,f=!1,y=!1,b=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function _(e){var n=r,i=o;return r=o=void 0,s=e,u=t.apply(i,n)}function m(t){return s=t,a=setTimeout(j,e),f?_(t):u}function g(t){var n=t-c;return void 0===c||n>=e||n<0||y&&t-s>=i}function j(){var t=v();if(g(t))return w(t);a=setTimeout(j,function(t){var n=e-(t-c);return y?p(n,i-(t-s)):n}(t))}function w(t){return a=void 0,b&&r?_(t):(r=o=void 0,u)}function O(){var t=v(),n=g(t);if(r=arguments,o=this,c=t,n){if(void 0===a)return m(c);if(y)return a=setTimeout(j,e),_(c)}return void 0===a&&(a=setTimeout(j,e)),u}return e=d(e)||0,h(n)&&(f=!!n.leading,i=(y="maxWait"in n)?l(d(n.maxWait)||0,e):i,b="trailing"in n?!!n.trailing:b),O.cancel=function(){void 0!==a&&clearTimeout(a),s=0,r=c=o=a=void 0},O.flush=function(){return void 0===a?u:w(v())},O}}).call(this,n(0))},function(t,e,n){(function(t,n){var r=/^\[object .+?Constructor\]$/,o=/^(?:0|[1-9]\d*)$/,i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1;var u="object"==typeof t&&t&&t.Object===Object&&t,a="object"==typeof self&&self&&self.Object===Object&&self,c=u||a||Function("return this")(),s=e&&!e.nodeType&&e,f=s&&"object"==typeof n&&n&&!n.nodeType&&n,l=f&&f.exports===s,p=l&&u.process,v=function(){try{var t=f&&f.require&&f.require("util").types;return t||p&&p.binding&&p.binding("util")}catch(t){}}(),h=v&&v.isTypedArray;function d(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)}var y,b,_,m=Array.prototype,g=Function.prototype,j=Object.prototype,w=c["__core-js_shared__"],O=g.toString,S=j.hasOwnProperty,x=(y=/[^.]+$/.exec(w&&w.keys&&w.keys.IE_PROTO||""))?"Symbol(src)_1."+y:"",E=j.toString,A=O.call(Object),C=RegExp("^"+O.call(S).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),P=l?c.Buffer:void 0,z=c.Symbol,T=c.Uint8Array,M=P?P.allocUnsafe:void 0,k=(b=Object.getPrototypeOf,_=Object,function(t){return b(_(t))}),L=Object.create,N=j.propertyIsEnumerable,I=m.splice,q=z?z.toStringTag:void 0,R=function(){try{var t=st(Object,"defineProperty");return t({},"",{}),t}catch(t){}}(),U=P?P.isBuffer:void 0,F=Math.max,$=Date.now,W=st(c,"Map"),B=st(Object,"create"),D=function(){function t(){}return function(e){if(!jt(e))return{};if(L)return L(e);t.prototype=e;var n=new t;return t.prototype=void 0,n}}();function Q(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function G(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function H(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function X(t){var e=this.__data__=new G(t);this.size=e.size}function Y(t,e){var n=yt(t),r=!n&&dt(t),o=!n&&!r&&_t(t),i=!n&&!r&&!o&&Ot(t),u=n||r||o||i,a=u?function(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}(t.length,String):[],c=a.length;for(var s in t)!e&&!S.call(t,s)||u&&("length"==s||o&&("offset"==s||"parent"==s)||i&&("buffer"==s||"byteLength"==s||"byteOffset"==s)||ft(s,c))||a.push(s);return a}function J(t,e,n){(void 0!==n&&!ht(t[e],n)||void 0===n&&!(e in t))&&Z(t,e,n)}function K(t,e,n){var r=t[e];S.call(t,e)&&ht(r,n)&&(void 0!==n||e in t)||Z(t,e,n)}function V(t,e){for(var n=t.length;n--;)if(ht(t[n][0],e))return n;return-1}function Z(t,e,n){"__proto__"==e&&R?R(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}Q.prototype.clear=function(){this.__data__=B?B(null):{},this.size=0},Q.prototype.delete=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},Q.prototype.get=function(t){var e=this.__data__;if(B){var n=e[t];return"__lodash_hash_undefined__"===n?void 0:n}return S.call(e,t)?e[t]:void 0},Q.prototype.has=function(t){var e=this.__data__;return B?void 0!==e[t]:S.call(e,t)},Q.prototype.set=function(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=B&&void 0===e?"__lodash_hash_undefined__":e,this},G.prototype.clear=function(){this.__data__=[],this.size=0},G.prototype.delete=function(t){var e=this.__data__,n=V(e,t);return!(n<0)&&(n==e.length-1?e.pop():I.call(e,n,1),--this.size,!0)},G.prototype.get=function(t){var e=this.__data__,n=V(e,t);return n<0?void 0:e[n][1]},G.prototype.has=function(t){return V(this.__data__,t)>-1},G.prototype.set=function(t,e){var n=this.__data__,r=V(n,t);return r<0?(++this.size,n.push([t,e])):n[r][1]=e,this},H.prototype.clear=function(){this.size=0,this.__data__={hash:new Q,map:new(W||G),string:new Q}},H.prototype.delete=function(t){var e=ct(this,t).delete(t);return this.size-=e?1:0,e},H.prototype.get=function(t){return ct(this,t).get(t)},H.prototype.has=function(t){return ct(this,t).has(t)},H.prototype.set=function(t,e){var n=ct(this,t),r=n.size;return n.set(t,e),this.size+=n.size==r?0:1,this},X.prototype.clear=function(){this.__data__=new G,this.size=0},X.prototype.delete=function(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n},X.prototype.get=function(t){return this.__data__.get(t)},X.prototype.has=function(t){return this.__data__.has(t)},X.prototype.set=function(t,e){var n=this.__data__;if(n instanceof G){var r=n.__data__;if(!W||r.length<199)return r.push([t,e]),this.size=++n.size,this;n=this.__data__=new H(r)}return n.set(t,e),this.size=n.size,this};var tt,et=function(t,e,n){for(var r=-1,o=Object(t),i=n(t),u=i.length;u--;){var a=i[tt?u:++r];if(!1===e(o[a],a,o))break}return t};function nt(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":q&&q in Object(t)?function(t){var e=S.call(t,q),n=t[q];try{t[q]=void 0;var r=!0}catch(t){}var o=E.call(t);r&&(e?t[q]=n:delete t[q]);return o}(t):function(t){return E.call(t)}(t)}function rt(t){return wt(t)&&"[object Arguments]"==nt(t)}function ot(t){return!(!jt(t)||function(t){return!!x&&x in t}(t))&&(mt(t)?C:r).test(function(t){if(null!=t){try{return O.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t))}function it(t){if(!jt(t))return function(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e}(t);var e=lt(t),n=[];for(var r in t)("constructor"!=r||!e&&S.call(t,r))&&n.push(r);return n}function ut(t,e,n,r,o){t!==e&&et(e,(function(i,u){if(o||(o=new X),jt(i))!function(t,e,n,r,o,i,u){var a=pt(t,n),c=pt(e,n),s=u.get(c);if(s)return void J(t,n,s);var f=i?i(a,c,n+"",t,e,u):void 0,l=void 0===f;if(l){var p=yt(c),v=!p&&_t(c),h=!p&&!v&&Ot(c);f=c,p||v||h?yt(a)?f=a:wt(m=a)&&bt(m)?f=function(t,e){var n=-1,r=t.length;e||(e=Array(r));for(;++n<r;)e[n]=t[n];return e}(a):v?(l=!1,f=function(t,e){if(e)return t.slice();var n=t.length,r=M?M(n):new t.constructor(n);return t.copy(r),r}(c,!0)):h?(l=!1,d=c,y=!0?(b=d.buffer,_=new b.constructor(b.byteLength),new T(_).set(new T(b)),_):d.buffer,f=new d.constructor(y,d.byteOffset,d.length)):f=[]:function(t){if(!wt(t)||"[object Object]"!=nt(t))return!1;var e=k(t);if(null===e)return!0;var n=S.call(e,"constructor")&&e.constructor;return"function"==typeof n&&n instanceof n&&O.call(n)==A}(c)||dt(c)?(f=a,dt(a)?f=function(t){return function(t,e,n,r){var o=!n;n||(n={});var i=-1,u=e.length;for(;++i<u;){var a=e[i],c=r?r(n[a],t[a],a,n,t):void 0;void 0===c&&(c=t[a]),o?Z(n,a,c):K(n,a,c)}return n}(t,St(t))}(a):jt(a)&&!mt(a)||(f=function(t){return"function"!=typeof t.constructor||lt(t)?{}:D(k(t))}(c))):l=!1}var d,y,b,_;var m;l&&(u.set(c,f),o(f,c,r,i,u),u.delete(c));J(t,n,f)}(t,e,u,n,ut,r,o);else{var a=r?r(pt(t,u),i,u+"",t,e,o):void 0;void 0===a&&(a=i),J(t,u,a)}}),St)}function at(t,e){return vt(function(t,e,n){return e=F(void 0===e?t.length-1:e,0),function(){for(var r=arguments,o=-1,i=F(r.length-e,0),u=Array(i);++o<i;)u[o]=r[e+o];o=-1;for(var a=Array(e+1);++o<e;)a[o]=r[o];return a[e]=n(u),d(t,this,a)}}(t,e,At),t+"")}function ct(t,e){var n,r,o=t.__data__;return("string"==(r=typeof(n=e))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?o["string"==typeof e?"string":"hash"]:o.map}function st(t,e){var n=function(t,e){return null==t?void 0:t[e]}(t,e);return ot(n)?n:void 0}function ft(t,e){var n=typeof t;return!!(e=null==e?9007199254740991:e)&&("number"==n||"symbol"!=n&&o.test(t))&&t>-1&&t%1==0&&t<e}function lt(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||j)}function pt(t,e){if(("constructor"!==e||"function"!=typeof t[e])&&"__proto__"!=e)return t[e]}var vt=function(t){var e=0,n=0;return function(){var r=$(),o=16-(r-n);if(n=r,o>0){if(++e>=800)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}(R?function(t,e){return R(t,"toString",{configurable:!0,enumerable:!1,value:(n=e,function(){return n}),writable:!0});var n}:At);function ht(t,e){return t===e||t!=t&&e!=e}var dt=rt(function(){return arguments}())?rt:function(t){return wt(t)&&S.call(t,"callee")&&!N.call(t,"callee")},yt=Array.isArray;function bt(t){return null!=t&&gt(t.length)&&!mt(t)}var _t=U||function(){return!1};function mt(t){if(!jt(t))return!1;var e=nt(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e}function gt(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}function jt(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}function wt(t){return null!=t&&"object"==typeof t}var Ot=h?function(t){return function(e){return t(e)}}(h):function(t){return wt(t)&&gt(t.length)&&!!i[nt(t)]};function St(t){return bt(t)?Y(t,!0):it(t)}var xt,Et=(xt=function(t,e,n){ut(t,e,n)},at((function(t,e){var n=-1,r=e.length,o=r>1?e[r-1]:void 0,i=r>2?e[2]:void 0;for(o=xt.length>3&&"function"==typeof o?(r--,o):void 0,i&&function(t,e,n){if(!jt(n))return!1;var r=typeof e;return!!("number"==r?bt(n)&&ft(e,n.length):"string"==r&&e in n)&&ht(n[e],t)}(e[0],e[1],i)&&(o=r<3?void 0:o,r=1),t=Object(t);++n<r;){var u=e[n];u&&xt(t,u,n,o)}return t})));function At(t){return t}n.exports=Et}).call(this,n(0),n(4)(t))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,n){"use strict";var r=this&&this.__values||function(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},o=this&&this.__read||function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),u=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)u.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return u};Object.defineProperty(e,"__esModule",{value:!0}),e.removeEventListeners=e.addEventListeners=void 0,e.addEventListeners=function(t,e){var n,i;try{for(var u=r(Object.entries(e)),a=u.next();!a.done;a=u.next()){var c=o(a.value,2),s=c[0],f=c[1];t.addEventListener(s,f)}}catch(t){n={error:t}}finally{try{a&&!a.done&&(i=u.return)&&i.call(u)}finally{if(n)throw n.error}}},e.removeEventListeners=function(t,e){var n,i;try{for(var u=r(Object.entries(e)),a=u.next();!a.done;a=u.next()){var c=o(a.value,2),s=c[0],f=c[1];t.removeEventListener(s,f)}}catch(t){n={error:t}}finally{try{a&&!a.done&&(i=u.return)&&i.call(u)}finally{if(n)throw n.error}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getQQShuruService=void 0;var r=/QQShuru\.HWPanel\.ajax_callback\((.*)\)/;e.getQQShuruService=function(t){return function(e){var n=new XMLHttpRequest,o=e.map((function(t){return t.flat().toString()})).join(",eb,");n.open("GET",t+"?track_str="+o+"&cmd=0",!0);var i=new Promise((function(t,e){n.onloadend=function(o){if(4===this.readyState&&200===this.status)try{var i=r.exec(this.responseText);if(!i){var u=JSON.parse(this.responseText);throw u.ret?new Error("qqShuru ret: "+u.ret):new Error("qqShuru response: "+u)}var a=JSON.parse(i[1]);t({characters:a.cand,assocWords:a.asso})}catch(t){e(t)}else e(n)}}));return n.send(),i}}}]).default}));