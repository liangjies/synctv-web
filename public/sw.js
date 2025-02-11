!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.HlsProxy=t():e.HlsProxy=t()}(this,(()=>(()=>{var e={558:function(e){!function(t){var r=/^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/,n=/^(?=([^\/?#]*))\1([^]*)$/,o=/(?:\/|^)\.(?=\/)/g,i=/(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g,s={buildAbsoluteURL:function(e,t,r){if(r=r||{},e=e.trim(),!(t=t.trim())){if(!r.alwaysNormalize)return e;var o=s.parseURL(e);if(!o)throw new Error("Error trying to parse base URL.");return o.path=s.normalizePath(o.path),s.buildURLFromParts(o)}var i=s.parseURL(t);if(!i)throw new Error("Error trying to parse relative URL.");if(i.scheme)return r.alwaysNormalize?(i.path=s.normalizePath(i.path),s.buildURLFromParts(i)):t;var a=s.parseURL(e);if(!a)throw new Error("Error trying to parse base URL.");if(!a.netLoc&&a.path&&"/"!==a.path[0]){var u=n.exec(a.path);a.netLoc=u[1],a.path=u[2]}a.netLoc&&!a.path&&(a.path="/");var f={scheme:a.scheme,netLoc:i.netLoc,path:null,params:i.params,query:i.query,fragment:i.fragment};if(!i.netLoc&&(f.netLoc=a.netLoc,"/"!==i.path[0]))if(i.path){var l=a.path,c=l.substring(0,l.lastIndexOf("/")+1)+i.path;f.path=s.normalizePath(c)}else f.path=a.path,i.params||(f.params=a.params,i.query||(f.query=a.query));return null===f.path&&(f.path=r.alwaysNormalize?s.normalizePath(i.path):i.path),s.buildURLFromParts(f)},parseURL:function(e){var t=r.exec(e);return t?{scheme:t[1]||"",netLoc:t[2]||"",path:t[3]||"",params:t[4]||"",query:t[5]||"",fragment:t[6]||""}:null},normalizePath:function(e){for(e=e.split("").reverse().join("").replace(o,"");e.length!==(e=e.replace(i,"")).length;);return e.split("").reverse().join("")},buildURLFromParts:function(e){return e.scheme+e.netLoc+e.path+e.params+e.query+e.fragment}};e.exports=s}()},424:(e,t)=>{"use strict";var r=2147483647;function n(e){if(e>r)throw new RangeError('The value "'+e+'" is invalid for option "size"');var t=new Uint8Array(e);return t.__proto__=o.prototype,t}function o(e,t,r){if("number"==typeof e){if("string"==typeof t)throw new TypeError('The "string" argument must be of type string. Received type number');return a(e)}return i(e,t,r)}function i(e,t,r){if("string"==typeof e)return function(e,t){"string"==typeof t&&""!==t||(t="utf8");if(!o.isEncoding(t))throw new TypeError("Unknown encoding: "+t);var r=0|l(e,t),i=n(r),s=i.write(e,t);s!==r&&(i=i.slice(0,s));return i}(e,t);if(ArrayBuffer.isView(e))return u(e);if(null==e)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(y(e,ArrayBuffer)||e&&y(e.buffer,ArrayBuffer))return function(e,t,r){if(t<0||e.byteLength<t)throw new RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(r||0))throw new RangeError('"length" is outside of buffer bounds');var n;n=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r);return n.__proto__=o.prototype,n}(e,t,r);if("number"==typeof e)throw new TypeError('The "value" argument must not be of type number. Received type number');var i=e.valueOf&&e.valueOf();if(null!=i&&i!==e)return o.from(i,t,r);var s=function(e){if(o.isBuffer(e)){var t=0|f(e.length),r=n(t);return 0===r.length||e.copy(r,0,0,t),r}if(void 0!==e.length)return"number"!=typeof e.length||_(e.length)?n(0):u(e);if("Buffer"===e.type&&Array.isArray(e.data))return u(e.data)}(e);if(s)return s;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return o.from(e[Symbol.toPrimitive]("string"),t,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function s(e){if("number"!=typeof e)throw new TypeError('"size" argument must be of type number');if(e<0)throw new RangeError('The value "'+e+'" is invalid for option "size"')}function a(e){return s(e),n(e<0?0:0|f(e))}function u(e){for(var t=e.length<0?0:0|f(e.length),r=n(t),o=0;o<t;o+=1)r[o]=255&e[o];return r}function f(e){if(e>=r)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+r.toString(16)+" bytes");return 0|e}function l(e,t){if(o.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||y(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);var r=e.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;for(var i=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return g(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;default:if(i)return n?-1:g(e).length;t=(""+t).toLowerCase(),i=!0}}function c(e,t,r,n){r=Number(r)||0;const o=e.length-r;n?(n=Number(n))>o&&(n=o):n=o;const i=t.length;let s;for(n>i/2&&(n=i/2),s=0;s<n;++s){const n=parseInt(t.substr(2*s,2),16);if(_(n))return s;e[r+s]=n}return s}function h(e,t,r,n){return d(g(t,e.length-r),e,r,n)}function p(e,t,r,n){return d(function(e){const t=[];for(let r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}(t),e,r,n)}function E(e,t,r,n){return d(function(e,t){let r,n,o;const i=[];for(let s=0;s<e.length&&!((t-=2)<0);++s)r=e.charCodeAt(s),n=r>>8,o=r%256,i.push(o),i.push(n);return i}(t,e.length-r),e,r,n)}function d(e,t,r,n){let o;for(o=0;o<n&&!(o+r>=t.length||o>=e.length);++o)t[o+r]=e[o];return o}function g(e,t){var r;t=t||1/0;for(var n=e.length,o=null,i=[],s=0;s<n;++s){if((r=e.charCodeAt(s))>55295&&r<57344){if(!o){if(r>56319){(t-=3)>-1&&i.push(239,191,189);continue}if(s+1===n){(t-=3)>-1&&i.push(239,191,189);continue}o=r;continue}if(r<56320){(t-=3)>-1&&i.push(239,191,189),o=r;continue}r=65536+(o-55296<<10|r-56320)}else o&&(t-=3)>-1&&i.push(239,191,189);if(o=null,r<128){if((t-=1)<0)break;i.push(r)}else if(r<2048){if((t-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return i}function y(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}function _(e){return e!=e}"undefined"!=typeof Symbol&&null!=Symbol.species&&o[Symbol.species]===o&&Object.defineProperty(o,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),o.from=function(e,t,r){return i(e,t,r)},o.prototype.__proto__=Uint8Array.prototype,o.__proto__=Uint8Array,o.alloc=function(e,t,r){return function(e,t,r){return s(e),e<=0?n(e):void 0!==t?"string"==typeof r?n(e).fill(t,r):n(e).fill(t):n(e)}(e,t,r)},o.allocUnsafe=function(e){return a(e)},o.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==o.prototype},o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return o.alloc(0);var r;if(void 0===t)for(t=0,r=0;r<e.length;++r)t+=e[r].length;var n=o.allocUnsafe(t),i=0;for(r=0;r<e.length;++r){var s=e[r];if(y(s,Uint8Array)&&(s=o.from(s)),!o.isBuffer(s))throw new TypeError('"list" argument must be an Array of Buffers');s.copy(n,i),i+=s.length}return n},o.byteLength=l,o.prototype._isBuffer=!0,o.prototype.copy=function(e,t,r,n){if(!o.isBuffer(e))throw new TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);var i=n-r;if(this===e&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(t,r,n);else if(this===e&&r<t&&t<n)for(var s=i-1;s>=0;--s)e[s+t]=this[s+r];else Uint8Array.prototype.set.call(e,this.subarray(r,n),t);return i},o.prototype.write=function(e,t,r,n){if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}const o=this.length-t;if((void 0===r||r>o)&&(r=o),e.length>0&&(r<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");let i=!1;for(;;)switch(n){case"hex":return c(this,e,t,r);case"utf8":case"utf-8":return h(this,e,t,r);case"ascii":case"latin1":case"binary":return p(this,e,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return E(this,e,t,r);default:if(i)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),i=!0}}}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var n={};return(()=>{"use strict";r.d(n,{default:()=>D});const e={DC_SIGNAL:"SIGNAL",DC_SIGNAL_BATCH:"SIGNAL_BATCH",DC_OPEN:"OPEN",DC_REQUEST:"REQUEST",DC_PIECE_NOT_FOUND:"PIECE_NOT_FOUND",DC_PIECE_ABORT:"PIECE_ABORT",DC_PIECE_CANCEL:"PIECE_CANCEL",DC_CLOSE:"CLOSE",DC_DISCONNECT:"DISCONNECT",DC_RESPONSE:"RESPONSE",DC_ERROR:"ERROR",DC_PIECE:"PIECE",DC_PIECE_DATA:"PIECE_DATA",DC_TIMEOUT:"TIMEOUT",DC_PIECE_ACK:"PIECE_ACK",DC_METADATA:"METADATA",DC_PLAT_ANDROID:"ANDROID",DC_PLAT_IOS:"IOS",DC_PLAT_WEB:"WEB",DC_CHOKE:"CHOKE",DC_UNCHOKE:"UNCHOKE",DC_HAVE:"HAVE",DC_HAVE_REVERSE:"HAVE_REVERSE",DC_LOST:"LOST",DC_GET_PEERS:"GET_PEERS",DC_PEERS:"PEERS",DC_STATS:"STATS",DC_PEER_SIGNAL:"PEER_SIGNAL",DC_PLAYLIST:"PLAYLIST",BM_LOST:"lost",BM_ADDED_SEG_:"BM_ADDED_SEG_",BM_ADDED_SN_:"BM_ADDED_SN_",BM_SEG_ADDED:"BM_SEG_ADDED",BM_FATAL_ERROR:"BM_FATAL_ERROR",FRAG_CHANGED:"FRAG_CHANGED",FRAG_LOADED:"FRAG_LOADED",FRAG_LOADING:"FRAG_LOADING",RESTART_P2P:"RESTART_P2P",EXCEPTION:"exception",SYN_OUTPUT:"SYN_OUTPUT",SYN_ERROR:"SYN_ERROR",SYN_PROGRESS:"SYN_PROGRESS",MEDIA_REBUFFER:"MEDIA_REBUFFER",SW_PLAYLIST:"SW_PLAYLIST",SW_GET_PLAYLIST:"SW_GET_PLAYLIST",SW_GET_MEDIA:"SW_GET_MEDIA",SW_DEBUG:"SW_DEBUG",LEVEL_LOADED:"LEVEL_LOADED",MANIFEST_PARSED:"MANIFEST_PARSED"};class t{static insertTimeOffsetTag(e,t){let r=e.split("\n");r=r.filter((e=>!e.startsWith("#EXT-X-START")));for(let e=0;e<r.length;e++)if(r[e].startsWith("#EXT-X-VERSION")){r[e]=`${r[e]}\n#EXT-X-START:TIME-OFFSET=${t}`;break}return r.join("\n")}}var o=r(558);const i="__PROXY_IDENTIFIER__";function s(e,t="."){const r=o.parseURL(e);return r.path.substring(r.path.lastIndexOf(t)+1)}r(424);function a(e,t){const r=new URL(e);return r.searchParams.get(t)?(r.searchParams.delete(t),r.href):""}const u="video/mp4",f={ts:"video/MP2T",m4s:u,mp4:u,fmp4:u};let l=["m3u8"];const c=3e3;let h=["ts","mp4","m4s","fmp4"];const p="#EXT-X-ENDLIST\n";let E=.01,d=".",g=15e3,y=!1;const _=new Map,m=new class{constructor(){this.sendMessageToClient=this.sendMessageToClient.bind(this)}async sendMessageToClient(t,r,n,o=[]){return t?new Promise(((i,s)=>{const a=new MessageChannel;let u;const f=(e,t)=>setTimeout((()=>{a.port1.close(),a.port2.close(),s(`MessageChannel ${t} timed out after ${e} ms`)}),e);a.port1.onmessage=function(e){const t=e.data;t?(clearTimeout(u),t.pong?u=f(n,`${r.action}-data`):i({data:t.data})):s("no data in event")},a.port1.onmessageerror=function(e){s(e)},t.postMessage(r,[a.port2].concat(o));const l=r.action===e.SW_GET_MEDIA?300:100;u=f(l,`${r.action}-pong`)})):Promise.reject("client is null")}};let R=!1;const A=new class{constructor(e=1){this._q=[],this.size=e}push(e){this._q.push(e),this._q.length>this.size&&this._q.shift()}contains(e){return this._q.includes(e)}}(10);let w,T=null,b=null,S=!1;const v={DEBUG:"debug",INFO:"info",WARN:"warn",ERROR:"error"};class D{constructor(e={}){T=e.httpHeadersForPlaylist||null,b=e.httpHeadersForMediaFile||null,!0===e.insertTimeOffsetTag?(S=!0,e.playlistTimeOffset&&(E=e.playlistTimeOffset)):S=!1,e.allowedMediaFiles&&e.allowedMediaFiles.length>0&&(h=[...e.allowedMediaFiles]),e.allowedPlaylistSuffix&&e.allowedPlaylistSuffix.length>0&&(l=[...e.allowedPlaylistSuffix]),e.mediaFileSeparator&&(d=e.mediaFileSeparator)}}function L(r){const{request:n,clientId:o}=r;if("GET"!==n.method)return;const{headers:u,url:D,mode:L}=n;if(D.includes(self.registration.scope+`${i}/keepalive/`))return new Response;if(A.contains(D)&&y)return void O(o,v.WARN,`bypassUrls contains ${D}, bypass proxy`);let P=s(D);if(l.includes(P)||D===w){let r;y&&O(o,v.DEBUG,`sw onFetch playlist ${D}`),T&&(r=new Headers,y&&O(o,v.INFO,`set additional header for ${D}`),T(D,r,u));const s=a(D,i);return s?r?fetch(new Request(s,{mode:"cors",headers:r})):void 0:async function(r,n,o){_.size>50&&_.clear();const{url:i}=r,s=await clients.get(n);if(!s)return C(i,o,s);try{const r=await m.sendMessageToClient(s,{action:e.SW_GET_PLAYLIST,data:{url:i,ver:"2.13.9"}},c),{data:a}=r;if(!a)return C(i,o,s);if(a.bypass)return A.push(i),C(i,o,s);if(a.text){if(y||(y=a.debug),!a.active)return y&&O(s,v.WARN,"window client is not active"),_.delete(n),C(i,r,s);_.set(n,s);let{text:e}=a;S&&!e.endsWith(p)&&(e=t.insertTimeOffsetTag(e,E));const r={"Content-Type":"application/vnd.apple.mpegurl"};return a.redirectedUrl&&(y&&O(s,v.INFO,`resp redirected to url ${w} `),w=a.redirectedUrl,r.set("Location",w)),new Response(e,{status:a.redirectedUrl?302:200,statusText:"OK",headers:r})}}catch(e){O(s,v.ERROR,e)}return C(i,o,s)}(n,o,r)}if("."!==d&&(P=s(D,d)),h.includes(P)||"*"===h[0]){let t;b&&(t=new Headers,y&&O(o,v.INFO,`set additional header for ${D}`),b(D,t,u));let r=u.get("Range")||void 0;r&&(t||(t=new Headers),t.set("Range",r));const n=a(D,i);if(n)return t?fetch(new Request(n,{mode:"cors",headers:t})):void 0;if(_.has(o)){let n,i;try{const{start:e,end:t}=function(e){if(!e)return{};const t=e.trim().toLowerCase();if(!t.startsWith("bytes="))throw new Error("unit-must-be-bytes",{normalizedRangeHeader:t});if(t.includes(","))throw new Error("single-range-only",{normalizedRangeHeader:t});const r=/(\d*)-(\d*)/.exec(t);if(!r||!r[1]&&!r[2])throw new Error("invalid-range-values",{normalizedRangeHeader:t});return{start:""===r[1]?0:Number(r[1]),end:""===r[2]?void 0:Number(r[2])}}(r);n=e,i=t}catch(e){return void O(o,v.ERROR,e)}if(i-n<=1)return;return y&&O(o,v.INFO,`sw onFetch media ${D} range ${r}`),async function(t,r,n,o,i,s,a){y&&R&&O(n,v.WARN,"hls proxy is loading");let u=!1;i||s?(i||s)&&(u=!0):(o=void 0,0===i&&void 0===s&&(y&&O(n,v.WARN,`request ${t} with range 0-`),u=!0));R=!0;try{const l=await m.sendMessageToClient(n,{action:e.SW_GET_MEDIA,data:{url:t,range:o}},g);if(R=!1,l&&l.data&&l.data.buffer){const{data:e}=l,{buffer:r}=e;if(u&&r.byteLength!==s-i+1)return O(n,v.ERROR,"buffer size is not equal to range length "+(s-i+1)),C(t,o,n);const o={"Accept-Ranges":"bytes","Content-Length":r.byteLength,"Access-Control-Allow-Origin":"*"},c=function(e){const t=f[e];return t||""}(a);c&&(o["Content-Type"]=c);const h={status:u?206:200,statusText:u?"Partial Content":"OK",headers:o};return u&&(h.headers["Content-Range"]=`bytes ${i}-${s}/${r.byteLength}`),new Response(r,h)}return C(t,r,n)}catch(e){return O(n,v.ERROR,e),R=!1,C(t,r,n)}}(D,t,_.get(o),r,n,i,P)}if(y&&O(o,v.WARN,"windowClient not exist when get media"),t)return fetch(new Request(D,{mode:L,headers:t}))}}function C(e,t,r){return fetch(new Request(e,{mode:"cors",headers:t})).catch((t=>{throw O(r,v.ERROR,t),A.push(e),t}))}async function O(t,r,n){console[r](n);const o="string"==typeof t?await clients.get(t):t;o&&o.postMessage({action:e.SW_DEBUG,data:{level:r,text:n}})}self.addEventListener("install",(e=>e.waitUntil(self.skipWaiting()))),self.addEventListener("activate",(e=>e.waitUntil(self.clients.claim()))),self.addEventListener("fetch",(async e=>{const t=L(e);t&&e.respondWith(t)})),self.addEventListener("message",(async function({data:e}){})),D.fileResponse=L,D.version="2.13.9"})(),n=n.default})()));