(function(){define("ophan/guid",[],function(){return{get:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n,t;return n=16*Math.random()|0,t="x"===e?n:3&n|8,t.toString(16)})}}})}).call(this),function(){var e={}.hasOwnProperty;define("ophan/transmit",["ophan/guid"],function(n){var t,o,r,i,a;return a=n.get(),r=function(e){return o("http://ophan.theguardian.com/i.gif?"+t(e))},i=function(n){var t,r,i;return JSON?(i=function(){var o;o=[];for(t in n)e.call(n,t)&&(r=n[t],null!=r&&o.push(""+encodeURIComponent(t)+"="+encodeURIComponent(JSON.stringify(r))));return o}(),o("http://ophan.theguardian.com/a.gif?viewId="+a+"&"+i.join("&"))):void 0},t=function(n){var t,o,r;return n.viewId=a,r=function(){var r;r=[];for(t in n)e.call(n,t)&&(o=n[t],null!=o&&r.push(""+encodeURIComponent(t)+"="+encodeURIComponent(o)));return r}(),r.join("&")},o=function(e){var n;return n=new Image,n.src=e},{sendInitial:r,sendMore:i,viewId:a}})}.call(this),function(){define("ophan/visibility",[],function(){return{state:function(){return document.visibilityState||document.webkitVisibilityState||document.mozVisibilityState||document.msVisibilityState},changeEvent:document.visibilityState?"visibilitychange":document.webkitVisibilityState?"webkitvisibilitychange":document.mozVisibilityState?"mozvisibilitychange":document.msVisibilityState?"msvisibilitychange":void 0}})}.call(this),function(){var e={}.hasOwnProperty;define("ophan/core",["ophan/transmit","ophan/visibility"],function(n,t){var o,r,i,a,u,d,c,l,s,f,p,m,h;return o=11,u=window.document,m=window.localStorage,l=m&&u.addEventListener&&"undefined"!=typeof JSON&&null!==JSON,c=function(e,n){return"prerender"!==t.state()?p(e,n):t.changeEvent?u.addEventListener(t.changeEvent,function(){return"visible"===t.state()?p(e,n):void 0},!1):void 0},p=function(e,t){var r;return r={v:o,platform:e,url:location.href,ref:u.referrer,visibilityState:u.visibilityState||u.webkitVisibilityState||u.mozVisibilityState||u.msVisibilityState,isModernBrowser:"undefined"!=typeof guardian&&null!==guardian?guardian.isModernBrowser:void 0},t&&(r.httpStatus=t),a(r),i(r),n.sendInitial(r)},f=[],d=!1,s=function(e){var t,o,i,a;if("complete"===document.readyState){i={},t=e();for(o in t)a=t[o],i[o]=a;return n.sendMore(i),r()}return f.push(e)},r=function(){var e;return"undefined"==typeof localStorage||null===localStorage||d||(d=!0,e=window.location.search.replace(/^(?:.*[&\?]heatmap(?:\=([^&]*))?)?.*$/,"$1"),e&&(localStorage.ophan_heatmap=e),"true"!==localStorage.ophan_heatmap)?void 0:u.body.appendChild(u.createElement("script")).src="//dashboard.ophan.co.uk/assets/js/heatmap-bookmarklet.js"},"function"==typeof window.addEventListener&&window.addEventListener("load",function(){var e,t,o,i,a,u,d;for(i={},u=0,d=f.length;d>u;u++){e=f[u],t=e();for(o in t)a=t[o],i[o]=a}return n.sendMore(i),r()},!1),a=function(n){var t,o,r;if(l){if(o=JSON.parse(m.getItem("ophan_follow")),null!=o)for(t in o)e.call(o,t)&&(r=o[t],n[t]=r);return m.removeItem("ophan_follow")}},i=function(e){var n,t,o,r,i,a,u;if(n=function(){var e,n,o,r;for(o=document.querySelectorAll("[data-component]"),r=[],e=0,n=o.length;n>e;e++)t=o[e],r.push(t.getAttribute("data-component"));return r}(),n.length>0){for(r={},a=0,u=n.length;u>a;a++)t=n[a],r[t]=1;return e.renderedComponents=function(){var e;e=[];for(o in r)i=r[o],e.push(o);return e}()}},h=function(n){var t,o,r;if(l){t=JSON.parse(m.getItem("ophan_follow"))||{};for(o in n)e.call(n,o)&&(r=n[o],t[o]=r);return m.setItem("ophan_follow",JSON.stringify(t))}},{init:c,storeDataToSendOnNextEvent:h,onLoadCapture:s}})}.call(this),function(){define("ophan/click-path-capture",["ophan/core"],function(e){var n,t,o,r;return r=function(e){var n;return n=e.nodeName.toLowerCase(),"a"===n?e:"body"!==n?r(e.parentNode):!1},n=function(e){return"body"===e.nodeName.toLowerCase()?null:e.getAttribute("data-component")||n(e.parentNode)},"function"==typeof document.addEventListener&&document.addEventListener("click",function(o){var i,a;return a=r(o.target),a?(i={from:[location.protocol,"//",location.host,location.pathname].join(""),to:a.href,sel:t(a),referringComponent:n(o.target)},e.storeDataToSendOnNextEvent(i)):void 0},!1),t=function(e,n){var r,i,a,u,d;if(null==n&&(n=""),"html"===e.nodeName.toLowerCase())return"html"+n;if(u=e.id)return"#"+u+n;if(d=e.nodeName.toLowerCase(),i=e.className,i&&(d+="."+i.trim().split(/[\s\n]+/).join(".")),o(e)){for(r=1,a=e;a=a.previousSibling;)1===a.nodeType&&r++;d+=":nth-child("+r+")"}return t(e.parentNode,">"+d+n)},o=function(e){var n,t;for(n=1,t=e.parentNode.firstChild;t;){if(t.nodeName===e.nodeName){if(n>1)return!0;n++}t=t.nextSibling}return!1}})}.call(this),function(){define("ophan/perf",["ophan/core"],function(e){var n;return n=function(){var e,n,t;return e=window.performance||window.msPerformance||window.webkitPerformance||window.mozPerformance,t=null!=e?e.timing:void 0,null!=t?(n={dns:t.domainLookupEnd-t.domainLookupStart,connection:t.connectEnd-t.connectStart,firstByte:t.responseStart-t.connectEnd,lastByte:t.responseEnd-t.responseStart,domContentLoadedEvent:t.domContentLoadedEventStart-t.responseEnd,loadEvent:t.loadEventStart-t.domContentLoadedEventStart,navType:e.navigation.type,redirectCount:e.navigation.redirectCount},{performance:n}):{}},e.onLoadCapture(n),{}})}.call(this),function(){define("ophan/campaign",["ophan/transmit"],function(e){var n,t,o,r,i,a,u,d,c,l;for(o=function(){return"undefined"!=typeof OAS_listpos&&null!==OAS_listpos},n=function(){var e,n,t,r,i,a,u,d,c,l;if(o()){for(u=OAS_listpos.split(","),c=[],t=0,i=u.length;i>t;t++)n=u[t],c.push(document.getElementById(n));return c}for(d="function"==typeof document.querySelectorAll?document.querySelectorAll(".ad-slot__oas"):void 0,l=[],r=0,a=d.length;a>r;r++)e=d[r],l.push(e);return l},t=function(e){return o()?e.id:e.parentElement.getAttribute("data-base")},r=function(e,n){var t,o;return t=["http://oas.guardian.co.uk","http://oas.theguardian.com","http://247realmedia.com"],o="*=",""+e+"["+n+o+"'"+t.join("'],"+e+"["+n+o+"'")+"']"},i=function(e){var n,t,o,i,a,u;return n=r("a","href"),i=r("img","src"),t=r("embed","src"),o=r("iframe","src"),a=[n,i,t,o].join(", "),"function"==typeof(u=e.parentElement).querySelector?u.querySelector(a):void 0},"undefined"!=typeof googletag&&null!==googletag&&googletag.cmd.push(function(){var n;return n=(new Date).getTime(),googletag.pubads().addEventListener("slotRenderEnded",function(t){return e.sendMore({ads:[{slot:t.slot.getSlotId().getDomId(),campaignId:t.isEmpty?"__empty__":t.lineItemId,creativeId:t.creativeId,timeToRenderEnded:(new Date).getTime()-n,adServer:"DFP"}]})})}),c=n(),l=[],u=0,d=c.length;d>u;u++)a=c[u],l.push(null!=a&&"function"==typeof a.addEventListener?a.addEventListener("ad-load",function(n){return setTimeout(function(){var o,r,a,u,d,c;return u=n.target,d=t(u),r=i(u),null!=r&&(c=r.getAttribute("href")||r.getAttribute("src"),a=/\/Guardian\/([^\/]+)\//.exec(c)),o=a?a[1]:null!=("function"==typeof u.querySelector?u.querySelector('iframe[src*="rubiconproject.com"]'):void 0)?"__rubicon__":null!=("function"==typeof u.querySelector?u.querySelector('img[src*="empty.gif"]'):void 0)?"__empty__":"__unknown__",e.sendMore({ads:[{slot:d,campaignId:o,adServer:"OAS"}]})},100)},!1):void 0);return l})}.call(this),function(){define("ophan/ng",["ophan/core","ophan/transmit","ophan/click-path-capture","ophan/perf","ophan/campaign"],function(e,n){return e.init("next-gen"),{record:n.sendMore,viewId:n.viewId}})}.call(this);
//# sourceMappingURL=ophan.ng.js.map