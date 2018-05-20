/*!
 * element-resize-detector 1.1.14
 * Copyright (c) 2016 Lucas Wiener
 * https://github.com/wnr/element-resize-detector
 * Licensed under MIT
 */

!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.elementResizeDetectorMaker=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c||a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(){function a(a,b){b||(b=a,a=0),a>f?f=a:a<g&&(g=a),d[a]||(d[a]=[]),d[a].push(b),e++}function b(){for(var a=g;a<=f;a++)for(var b=d[a],c=0;c<b.length;c++){var e=b[c];e()}}function c(){return e}var d={},e=0,f=0,g=0;return{add:a,process:b,size:c}}var e=a("./utils");b.exports=function(a){function b(a,b){!o&&l&&k&&0===n.size()&&g(),n.add(a,b)}function c(){for(o=!0;n.size();){var a=n;n=d(),a.process()}o=!1}function f(a){o||(void 0===a&&(a=k),m&&(h(m),m=null),a?g():c())}function g(){m=i(c)}function h(a){return clearTimeout(a)}function i(a){return function(a){return setTimeout(a,0)}(a)}a=a||{};var j=a.reporter,k=e.getOption(a,"async",!0),l=e.getOption(a,"auto",!0);l&&!k&&(j&&j.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true."),k=!0);var m,n=d(),o=!1;return{add:b,force:f}}},{"./utils":2}],2:[function(a,b,c){"use strict";function d(a,b,c){var d=a[b];return void 0!==d&&null!==d||void 0===c?d:c}(b.exports={}).getOption=d},{}],3:[function(a,b,c){"use strict";var d=b.exports={};d.isIE=function(a){return!!function(){var a=navigator.userAgent.toLowerCase();return-1!==a.indexOf("msie")||-1!==a.indexOf("trident")||-1!==a.indexOf(" edge/")}()&&(!a||a===function(){var a=3,b=document.createElement("div"),c=b.getElementsByTagName("i");do{b.innerHTML="\x3c!--[if gt IE "+ ++a+"]><i></i><![endif]--\x3e"}while(c[0]);return a>4?a:void 0}())},d.isLegacyOpera=function(){return!!window.opera}},{}],4:[function(a,b,c){"use strict";(b.exports={}).forEach=function(a,b){for(var c=0;c<a.length;c++){var d=b(a[c]);if(d)return d}}},{}],5:[function(a,b,c){"use strict";var d=a("../browser-detector");b.exports=function(a){function b(a,b){function c(){b(a)}if(!e(a))throw new Error("Element is not detectable by this strategy.");if(d.isIE(8))i(a).object={proxy:c},a.attachEvent("onresize",c);else{e(a).contentDocument.defaultView.addEventListener("resize",c)}}function c(a,b,c){c||(c=b,b=a,a=null),a=a||{};a.debug;d.isIE(8)?c(b):function(a,b){function c(){function c(){if("static"===j.position){a.style.position="relative";var b=function(a,b,c,d){var e=c[d];"auto"!==e&&"0"!==function(a){return a.replace(/[^-\d\.]/g,"")}(e)&&(a.warn("An element that is positioned static has style."+d+"="+e+" which is ignored due to the static positioning. The element will need to be positioned relative, so the style."+d+" will be set to 0. Element: ",b),b.style[d]=0)};b(g,a,j,"top"),b(g,a,j,"right"),b(g,a,j,"bottom"),b(g,a,j,"left")}}function h(){function d(a,b){if(!a.contentDocument)return void setTimeout(function(){d(a,b)},100);b(a.contentDocument)}f||c(),d(this,function(c){b(a)})}""!==j.position&&(c(j),f=!0);var k=document.createElement("object");k.style.cssText=e,k.tabIndex=-1,k.type="text/html",k.onload=h,d.isIE()||(k.data="about:blank"),a.appendChild(k),i(a).object=k,d.isIE()&&(k.data="about:blank")}var e="display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; padding: 0; margin: 0; opacity: 0; z-index: -1000; pointer-events: none;",f=!1,j=window.getComputedStyle(a),k=a.offsetWidth,l=a.offsetHeight;i(a).startSize={width:k,height:l},h?h.add(c):c()}(b,c)}function e(a){return i(a).object}function f(a){d.isIE(8)?a.detachEvent("onresize",i(a).object.proxy):a.removeChild(e(a)),delete i(a).object}a=a||{};var g=a.reporter,h=a.batchProcessor,i=a.stateHandler.getState;if(!g)throw new Error("Missing required dependency: reporter.");return{makeDetectable:c,addListener:b,uninstall:f}}},{"../browser-detector":3}],6:[function(a,b,c){"use strict";var d=a("../collection-utils").forEach;b.exports=function(a){function b(a){a.className+=" "+p+"_animation_active"}function c(a,b,c){if(a.addEventListener)a.addEventListener(b,c);else{if(!a.attachEvent)return k.error("[scroll] Don't know how to add event listeners.");a.attachEvent("on"+b,c)}}function e(a,b,c){if(a.removeEventListener)a.removeEventListener(b,c);else{if(!a.detachEvent)return k.error("[scroll] Don't know how to remove event listeners.");a.detachEvent("on"+b,c)}}function f(a){return m(a).container.childNodes[0].childNodes[0].childNodes[0]}function g(a){return m(a).container.childNodes[0].childNodes[0].childNodes[1]}function h(a,b){if(!m(a).listeners.push)throw new Error("Cannot add listener to an element that is not detectable.");m(a).listeners.push(b)}function i(a,e,h){function i(){if(a.debug){var b=Array.prototype.slice.call(arguments);if(b.unshift(n.get(e),"Scroll: "),k.log.apply)k.log.apply(null,b);else for(var c=0;c<b.length;c++)k.log(b[c])}}function j(a){var b=m(a).container.childNodes[0],c=window.getComputedStyle(b);return!c.width||-1===c.width.indexOf("px")}function q(){var a=window.getComputedStyle(e),b={};return b.position=a.position,b.width=e.offsetWidth,b.height=e.offsetHeight,b.top=a.top,b.right=a.right,b.bottom=a.bottom,b.left=a.left,b.widthCSS=a.width,b.heightCSS=a.height,b}function r(){var a=q();m(e).startSize={width:a.width,height:a.height},i("Element start size",m(e).startSize)}function s(){m(e).listeners=[]}function t(){if(i("storeStyle invoked."),!m(e))return void i("Aborting because element has been uninstalled");var a=q();m(e).style=a}function u(a,b,c){m(a).lastWidth=b,m(a).lastHeight=c}function v(a){return f(a).childNodes[0]}function w(){return 2*o.width+1}function x(){return 2*o.height+1}function y(a){return a+10+w()}function z(a){return a+10+x()}function A(a){return 2*a+w()}function B(a){return 2*a+x()}function C(a,b,c){var d=f(a),e=g(a),h=y(b),i=z(c),j=A(b),k=B(c);d.scrollLeft=h,d.scrollTop=i,e.scrollLeft=j,e.scrollTop=k}function D(){var a=m(e).container;if(!a){a=document.createElement("div"),a.className=p,a.style.cssText="visibility: hidden; display: inline; width: 0px; height: 0px; z-index: -1; overflow: hidden; margin: 0; padding: 0;",m(e).container=a,b(a),e.appendChild(a);var d=function(){m(e).onRendered&&m(e).onRendered()};c(a,"animationstart",d),m(e).onAnimationStart=d}return a}function E(){function a(){m(e).onExpand&&m(e).onExpand()}function b(){m(e).onShrink&&m(e).onShrink()}if(i("Injecting elements"),!m(e))return void i("Aborting because element has been uninstalled");!function(){var a=m(e).style;if("static"===a.position){e.style.position="relative";var b=function(a,b,c,d){var e=c[d];"auto"!==e&&"0"!==function(a){return a.replace(/[^-\d\.]/g,"")}(e)&&(a.warn("An element that is positioned static has style."+d+"="+e+" which is ignored due to the static positioning. The element will need to be positioned relative, so the style."+d+" will be set to 0. Element: ",b),b.style[d]=0)};b(k,e,a,"top"),b(k,e,a,"right"),b(k,e,a,"bottom"),b(k,e,a,"left")}}();var d=m(e).container;d||(d=D());var f=o.width,g=o.height,h="position: absolute; flex: none; overflow: hidden; z-index: -1; visibility: hidden; "+function(a,b,c,d){return a=a?a+"px":"0",b=b?b+"px":"0",c=c?c+"px":"0",d=d?d+"px":"0","left: "+a+"; top: "+b+"; right: "+d+"; bottom: "+c+";"}(-(1+f),-(1+g),-g,-f),j=document.createElement("div"),l=document.createElement("div"),n=document.createElement("div"),q=document.createElement("div"),r=document.createElement("div"),s=document.createElement("div");j.dir="ltr",j.style.cssText="position: absolute; flex: none; overflow: hidden; z-index: -1; visibility: hidden; width: 100%; height: 100%; left: 0px; top: 0px;",j.className=p,l.className=p,l.style.cssText=h,n.style.cssText="position: absolute; flex: none; overflow: scroll; z-index: -1; visibility: hidden; width: 100%; height: 100%;",q.style.cssText="position: absolute; left: 0; top: 0;",r.style.cssText="position: absolute; flex: none; overflow: scroll; z-index: -1; visibility: hidden; width: 100%; height: 100%;",s.style.cssText="position: absolute; width: 200%; height: 200%;",n.appendChild(q),r.appendChild(s),l.appendChild(n),l.appendChild(r),j.appendChild(l),d.appendChild(j),c(n,"scroll",a),c(r,"scroll",b),m(e).onExpandScroll=a,m(e).onShrinkScroll=b}function F(){function b(a,b,c){var d=v(a),e=y(b),f=z(c);d.style.width=e+"px",d.style.height=f+"px"}function c(c){var d=e.offsetWidth,f=e.offsetHeight;i("Storing current size",d,f),u(e,d,f),l.add(0,function(){if(!m(e))return void i("Aborting because element has been uninstalled");if(!h())return void i("Aborting because element container has not been initialized");if(a.debug){var c=e.offsetWidth,g=e.offsetHeight;c===d&&g===f||k.warn(n.get(e),"Scroll: Size changed before updating detector elements.")}b(e,d,f)}),l.add(1,function(){return m(e)?h()?void C(e,d,f):void i("Aborting because element container has not been initialized"):void i("Aborting because element has been uninstalled")}),c&&l.add(2,function(){return m(e)?h()?void c():void i("Aborting because element container has not been initialized"):void i("Aborting because element has been uninstalled")})}function h(){return!!m(e).container}function o(){i("notifyListenersIfNeeded invoked");var a=m(e);return function(){return void 0===m(e).lastNotifiedWidth}()&&a.lastWidth===a.startSize.width&&a.lastHeight===a.startSize.height?i("Not notifying: Size is the same as the start size, and there has been no notification yet."):a.lastWidth===a.lastNotifiedWidth&&a.lastHeight===a.lastNotifiedHeight?i("Not notifying: Size already notified"):(i("Current size not notified, notifying..."),a.lastNotifiedWidth=a.lastWidth,a.lastNotifiedHeight=a.lastHeight,void d(m(e).listeners,function(a){a(e)}))}function p(){if(i("startanimation triggered."),j(e))return void i("Ignoring since element is still unrendered...");i("Element rendered.");var a=f(e),b=g(e);0!==a.scrollLeft&&0!==a.scrollTop&&0!==b.scrollLeft&&0!==b.scrollTop||(i("Scrollbars out of sync. Updating detector elements..."),c(o))}function q(){if(i("Scroll detected."),j(e))return void i("Scroll event fired while unrendered. Ignoring...");var a=e.offsetWidth,b=e.offsetHeight;a!==m(e).lastWidth||b!==m(e).lastHeight?(i("Element size changed."),c(o)):i("Element size has not changed ("+a+"x"+b+").")}if(i("registerListenersAndPositionElements invoked."),!m(e))return void i("Aborting because element has been uninstalled");m(e).onRendered=p,m(e).onExpand=q,m(e).onShrink=q;var r=m(e).style;b(e,r.width,r.height)}function G(){if(i("finalizeDomMutation invoked."),!m(e))return void i("Aborting because element has been uninstalled");var a=m(e).style;u(e,a.width,a.height),C(e,a.width,a.height)}function H(){h(e)}function I(){i("Installing..."),s(),r(),l.add(0,t),l.add(1,E),l.add(2,F),l.add(3,G),l.add(4,H)}h||(h=e,e=a,a=null),a=a||{},i("Making detectable..."),!function(a){return!function(a){return a===a.ownerDocument.body||a.ownerDocument.body.contains(a)}(a)||null===window.getComputedStyle(a)}(e)?I():(i("Element is detached"),D(),i("Waiting until element is attached..."),m(e).onRendered=function(){i("Element is now attached"),I()})}function j(a){var b=m(a);b&&(b.onExpandScroll&&e(f(a),"scroll",b.onExpandScroll),b.onShrinkScroll&&e(g(a),"scroll",b.onShrinkScroll),b.onAnimationStart&&e(b.container,"animationstart",b.onAnimationStart),b.container&&a.removeChild(b.container))}a=a||{};var k=a.reporter,l=a.batchProcessor,m=a.stateHandler.getState,n=(a.stateHandler.hasState,a.idHandler);if(!l)throw new Error("Missing required dependency: batchProcessor");if(!k)throw new Error("Missing required dependency: reporter.");var o=function(){var a=document.createElement("div");a.style.cssText="position: absolute; width: 1000px; height: 1000px; visibility: hidden; margin: 0; padding: 0;";var b=document.createElement("div");b.style.cssText="position: absolute; width: 500px; height: 500px; overflow: scroll; visibility: none; top: -1500px; left: -1500px; visibility: hidden; margin: 0; padding: 0;",b.appendChild(a),document.body.insertBefore(b,document.body.firstChild);var c=500-b.clientWidth,d=500-b.clientHeight;return document.body.removeChild(b),{width:c,height:d}}(),p="erd_scroll_detection_container";return function(a,b){if(!document.getElementById(a)){var c=b+"_animation",d=b+"_animation_active",e="/* Created by the element-resize-detector library. */\n";e+="."+b+" > div::-webkit-scrollbar { display: none; }\n\n",e+="."+d+" { -webkit-animation-duration: 0.1s; animation-duration: 0.1s; -webkit-animation-name: "+c+"; animation-name: "+c+"; }\n",e+="@-webkit-keyframes "+c+" { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n",e+="@keyframes "+c+" { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }",function(b,c){c=c||function(a){document.head.appendChild(a)};var d=document.createElement("style");d.innerHTML=b,d.id=a,c(d)}(e)}}("erd_scroll_detection_scrollbar_style",p),{makeDetectable:i,addListener:h,uninstall:j}}},{"../collection-utils":4}],7:[function(a,b,c){"use strict";function d(a){return Array.isArray(a)||void 0!==a.length}function e(a){if(Array.isArray(a))return a;var b=[];return h(a,function(a){b.push(a)}),b}function f(a){return a&&1===a.nodeType}function g(a,b,c){var d=a[b];return void 0!==d&&null!==d||void 0===c?d:c}var h=a("./collection-utils").forEach,i=a("./element-utils"),j=a("./listener-handler"),k=a("./id-generator"),l=a("./id-handler"),m=a("./reporter"),n=a("./browser-detector"),o=a("batch-processor"),p=a("./state-handler"),q=a("./detection-strategy/object.js"),r=a("./detection-strategy/scroll.js");b.exports=function(a){function b(a,b,c){function i(a){var b=z.get(a);h(b,function(b){b(a)})}function j(a,b,c){z.add(b,c),a&&c(b)}if(c||(c=b,b=a,a={}),!b)throw new Error("At least one element required.");if(!c)throw new Error("Listener required.");if(f(b))b=[b];else{if(!d(b))return v.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");b=e(b)}var k=0,l=g(a,"callOnAdd",x.callOnAdd),m=g(a,"onReady",function(){}),n=g(a,"debug",x.debug);h(b,function(a){p.getState(a)||(p.initState(a),s.set(a));var d=s.get(a);if(n&&v.log("Attaching listener to element",d,a),!A.isDetectable(a))return n&&v.log(d,"Not detectable."),A.isBusy(a)?(n&&v.log(d,"System busy making it detectable"),j(l,a,c),D[d]=D[d]||[],void D[d].push(function(){++k===b.length&&m()})):(n&&v.log(d,"Making detectable..."),A.markBusy(a,!0),y.makeDetectable({debug:n},a,function(a){if(n&&v.log(d,"onElementDetectable"),p.getState(a)){A.markAsDetectable(a),A.markBusy(a,!1),y.addListener(a,i),j(l,a,c);var e=p.getState(a);if(e&&e.startSize){var f=a.offsetWidth,g=a.offsetHeight;e.startSize.width===f&&e.startSize.height===g||i(a)}D[d]&&h(D[d],function(a){a()})}else n&&v.log(d,"Element uninstalled before being detectable.");delete D[d],++k===b.length&&m()}));n&&v.log(d,"Already detecable, adding listener."),j(l,a,c),k++}),k===b.length&&m()}function c(a){if(!a)return v.error("At least one element is required.");if(f(a))a=[a];else{if(!d(a))return v.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");a=e(a)}h(a,function(a){z.removeAllListeners(a),y.uninstall(a),p.cleanState(a)})}a=a||{};var s;if(a.idHandler)s={get:function(b){return a.idHandler.get(b,!0)},set:a.idHandler.set};else{var t=k(),u=l({idGenerator:t,stateHandler:p});s=u}var v=a.reporter;if(!v){v=m(!1===v)}var w=g(a,"batchProcessor",o({reporter:v})),x={};x.callOnAdd=!!g(a,"callOnAdd",!0),x.debug=!!g(a,"debug",!1);var y,z=j(s),A=i({stateHandler:p}),B=g(a,"strategy","object"),C={reporter:v,batchProcessor:w,stateHandler:p,idHandler:s};if("scroll"===B&&(n.isLegacyOpera()?(v.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy."),B="object"):n.isIE(9)&&(v.warn("Scroll strategy is not supported on IE9. Changing to object strategy."),B="object")),"scroll"===B)y=r(C);else{if("object"!==B)throw new Error("Invalid strategy name: "+B);y=q(C)}var D={};return{listenTo:b,removeListener:z.removeListener,removeAllListeners:z.removeAllListeners,uninstall:c}}},{"./browser-detector":3,"./collection-utils":4,"./detection-strategy/object.js":5,"./detection-strategy/scroll.js":6,"./element-utils":8,"./id-generator":9,"./id-handler":10,"./listener-handler":11,"./reporter":12,"./state-handler":13,"batch-processor":1}],8:[function(a,b,c){"use strict";b.exports=function(a){function b(a){var b=f(a);return b&&!!b.isDetectable}function c(a){f(a).isDetectable=!0}function d(a){return!!f(a).busy}function e(a,b){f(a).busy=!!b}var f=a.stateHandler.getState;return{isDetectable:b,markAsDetectable:c,isBusy:d,markBusy:e}}},{}],9:[function(a,b,c){"use strict";b.exports=function(){function a(){return b++}var b=1;return{generate:a}}},{}],10:[function(a,b,c){"use strict";b.exports=function(a){function b(a){var b=e(a);return b&&void 0!==b.id?b.id:null}function c(a){var b=e(a);if(!b)throw new Error("setId required the element to have a resize detection state.");var c=d.generate();return b.id=c,c}var d=a.idGenerator,e=a.stateHandler.getState;return{get:b,set:c}}},{}],11:[function(a,b,c){"use strict";b.exports=function(a){function b(b){var c=a.get(b);return void 0===c?[]:f[c]||[]}function c(b,c){var d=a.get(b);f[d]||(f[d]=[]),f[d].push(c)}function d(a,c){for(var d=b(a),e=0,f=d.length;e<f;++e)if(d[e]===c){d.splice(e,1);break}}function e(a){var c=b(a);c&&(c.length=0)}var f={};return{get:b,add:c,removeListener:d,removeAllListeners:e}}},{}],12:[function(a,b,c){"use strict";b.exports=function(a){function b(){}var c={log:b,warn:b,error:b};if(!a&&window.console){var d=function(a,b){a[b]=function(){var a=console[b];if(a.apply)a.apply(console,arguments);else for(var c=0;c<arguments.length;c++)a(arguments[c])}};d(c,"log"),d(c,"warn"),d(c,"error")}return c}},{}],13:[function(a,b,c){"use strict";function d(a){return a[g]={},e(a)}function e(a){return a[g]}function f(a){delete a[g]}var g="_erd";b.exports={initState:d,getState:e,cleanState:f}},{}]},{},[7])(7)});