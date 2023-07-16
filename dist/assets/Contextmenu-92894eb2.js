import{d as t,r as e,h as n,o,i,b as r,w as l,e as s,a,n as c,f,v as u,g as d,I as p,T as m,j as g,p as h,k as y,_ as w}from"./index-715a2a44.js";import{A as x}from"./arrow-right-up-0222d3d7.js";function v(t){return t.split("-")[1]}function b(t){return"y"===t?"height":"width"}function R(t){return t.split("-")[0]}function T(t){return["top","bottom"].includes(R(t))?"x":"y"}function C(t,e,n){let{reference:o,floating:i}=t;const r=o.x+o.width/2-i.width/2,l=o.y+o.height/2-i.height/2,s=T(e),a=b(s),c=o[a]/2-i[a]/2,f="x"===s;let u;switch(R(e)){case"top":u={x:r,y:o.y-i.height};break;case"bottom":u={x:r,y:o.y+o.height};break;case"right":u={x:o.x+o.width,y:l};break;case"left":u={x:o.x-i.width,y:l};break;default:u={x:o.x,y:o.y}}switch(v(e)){case"start":u[s]-=c*(n&&f?-1:1);break;case"end":u[s]+=c*(n&&f?-1:1)}return u}function L(t,e){return"function"==typeof t?t(e):t}function k(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}async function E(t,e){var n;void 0===e&&(e={});const{x:o,y:i,platform:r,rects:l,elements:s,strategy:a}=t,{boundary:c="clippingAncestors",rootBoundary:f="viewport",elementContext:u="floating",altBoundary:d=!1,padding:p=0}=L(e,t),m=function(t){return"number"!=typeof t?(e=t,{top:0,right:0,bottom:0,left:0,...e}):{top:t,right:t,bottom:t,left:t};var e}(p),g=s[d?"floating"===u?"reference":"floating":u],h=k(await r.getClippingRect({element:null==(n=await(null==r.isElement?void 0:r.isElement(g)))||n?g:g.contextElement||await(null==r.getDocumentElement?void 0:r.getDocumentElement(s.floating)),boundary:c,rootBoundary:f,strategy:a})),y="floating"===u?{...l.floating,x:o,y:i}:l.reference,w=await(null==r.getOffsetParent?void 0:r.getOffsetParent(s.floating)),x=await(null==r.isElement?void 0:r.isElement(w))&&await(null==r.getScale?void 0:r.getScale(w))||{x:1,y:1},v=k(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({rect:y,offsetParent:w,strategy:a}):y);return{top:(h.top-v.top+m.top)/x.y,bottom:(v.bottom-h.bottom+m.bottom)/x.y,left:(h.left-v.left+m.left)/x.x,right:(v.right-h.right+m.right)/x.x}}const S=Math.min,D=Math.max;function W(t,e,n){return D(t,S(e,n))}["top","right","bottom","left"].reduce(((t,e)=>t.concat(e,e+"-start",e+"-end")),[]);const P={left:"right",right:"left",bottom:"top",top:"bottom"};function O(t){return t.replace(/left|right|bottom|top/g,(t=>P[t]))}const A={start:"end",end:"start"};function F(t){return t.replace(/start|end/g,(t=>A[t]))}const _=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var n;const{placement:o,middlewareData:i,rects:r,initialPlacement:l,platform:s,elements:a}=e,{mainAxis:c=!0,crossAxis:f=!0,fallbackPlacements:u,fallbackStrategy:d="bestFit",fallbackAxisSideDirection:p="none",flipAlignment:m=!0,...g}=L(t,e),h=R(o),y=R(l)===l,w=await(null==s.isRTL?void 0:s.isRTL(a.floating)),x=u||(y||!m?[O(l)]:function(t){const e=O(t);return[F(t),e,F(e)]}(l));u||"none"===p||x.push(...function(t,e,n,o){const i=v(t);let r=function(t,e,n){const o=["left","right"],i=["right","left"],r=["top","bottom"],l=["bottom","top"];switch(t){case"top":case"bottom":return n?e?i:o:e?o:i;case"left":case"right":return e?r:l;default:return[]}}(R(t),"start"===n,o);return i&&(r=r.map((t=>t+"-"+i)),e&&(r=r.concat(r.map(F)))),r}(l,m,p,w));const C=[l,...x],k=await E(e,g),S=[];let D=(null==(n=i.flip)?void 0:n.overflows)||[];if(c&&S.push(k[h]),f){const{main:t,cross:e}=function(t,e,n){void 0===n&&(n=!1);const o=v(t),i=T(t),r=b(i);let l="x"===i?o===(n?"end":"start")?"right":"left":"start"===o?"bottom":"top";return e.reference[r]>e.floating[r]&&(l=O(l)),{main:l,cross:O(l)}}(o,r,w);S.push(k[t],k[e])}if(D=[...D,{placement:o,overflows:S}],!S.every((t=>t<=0))){var W,P;const t=((null==(W=i.flip)?void 0:W.index)||0)+1,e=C[t];if(e)return{data:{index:t,overflows:D},reset:{placement:e}};let n=null==(P=D.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:P.placement;if(!n)switch(d){case"bestFit":{var A;const t=null==(A=D.map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:A[0];t&&(n=t);break}case"initialPlacement":n=l}if(o!==n)return{reset:{placement:n}}}return{}}}};function H(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function V(t){return H(t).getComputedStyle(t)}function B(t){return t instanceof H(t).Node}function M(t){return B(t)?(t.nodeName||"").toLowerCase():"#document"}function N(t){return t instanceof HTMLElement||t instanceof H(t).HTMLElement}function j(t){return"undefined"!=typeof ShadowRoot&&(t instanceof H(t).ShadowRoot||t instanceof ShadowRoot)}function $(t){const{overflow:e,overflowX:n,overflowY:o,display:i}=V(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!["inline","contents"].includes(i)}function q(t){return["table","td","th"].includes(M(t))}function I(t){const e=X(),n=V(t);return"none"!==n.transform||"none"!==n.perspective||!!n.containerType&&"normal"!==n.containerType||!e&&!!n.backdropFilter&&"none"!==n.backdropFilter||!e&&!!n.filter&&"none"!==n.filter||["transform","perspective","filter"].some((t=>(n.willChange||"").includes(t)))||["paint","layout","strict","content"].some((t=>(n.contain||"").includes(t)))}function X(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function Y(t){return["html","body","#document"].includes(M(t))}const z=Math.min,G=Math.max,J=Math.round,K=t=>({x:t,y:t});function Q(t){const e=V(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const i=N(t),r=i?t.offsetWidth:n,l=i?t.offsetHeight:o,s=J(n)!==r||J(o)!==l;return s&&(n=r,o=l),{width:n,height:o,$:s}}function U(t){return t instanceof Element||t instanceof H(t).Element}function Z(t){return U(t)?t:t.contextElement}function tt(t){const e=Z(t);if(!N(e))return K(1);const n=e.getBoundingClientRect(),{width:o,height:i,$:r}=Q(e);let l=(r?J(n.width):n.width)/o,s=(r?J(n.height):n.height)/i;return l&&Number.isFinite(l)||(l=1),s&&Number.isFinite(s)||(s=1),{x:l,y:s}}const et=K(0);function nt(t){const e=H(t);return X()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:et}function ot(t,e,n,o){void 0===e&&(e=!1),void 0===n&&(n=!1);const i=t.getBoundingClientRect(),r=Z(t);let l=K(1);e&&(o?U(o)&&(l=tt(o)):l=tt(t));const s=(a=r,void 0===(c=n)&&(c=!1),!(f=o)||c&&f!==H(a)||!c?K(0):nt(r));var a,c,f;let u=(i.left+s.x)/l.x,d=(i.top+s.y)/l.y,p=i.width/l.x,m=i.height/l.y;if(r){const t=H(r),e=o&&U(o)?H(o):o;let n=t.frameElement;for(;n&&o&&e!==t;){const t=tt(n),e=n.getBoundingClientRect(),o=getComputedStyle(n),i=e.left+(n.clientLeft+parseFloat(o.paddingLeft))*t.x,r=e.top+(n.clientTop+parseFloat(o.paddingTop))*t.y;u*=t.x,d*=t.y,p*=t.x,m*=t.y,u+=i,d+=r,n=H(n).frameElement}}return k({width:p,height:m,x:u,y:d})}function it(t){return U(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function rt(t){var e;return null==(e=(B(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function lt(t){return ot(rt(t)).left+it(t).scrollLeft}function st(t){if("html"===M(t))return t;const e=t.assignedSlot||t.parentNode||j(t)&&t.host||rt(t);return j(e)?e.host:e}function at(t){const e=st(t);return Y(e)?t.ownerDocument?t.ownerDocument.body:t.body:N(e)&&$(e)?e:at(e)}function ct(t,e){var n;void 0===e&&(e=[]);const o=at(t),i=o===(null==(n=t.ownerDocument)?void 0:n.body),r=H(o);return i?e.concat(r,r.visualViewport||[],$(o)?o:[]):e.concat(o,ct(o))}function ft(t,e,n){let o;if("viewport"===e)o=function(t,e){const n=H(t),o=rt(t),i=n.visualViewport;let r=o.clientWidth,l=o.clientHeight,s=0,a=0;if(i){r=i.width,l=i.height;const t=X();(!t||t&&"fixed"===e)&&(s=i.offsetLeft,a=i.offsetTop)}return{width:r,height:l,x:s,y:a}}(t,n);else if("document"===e)o=function(t){const e=rt(t),n=it(t),o=t.ownerDocument.body,i=G(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),r=G(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let l=-n.scrollLeft+lt(t);const s=-n.scrollTop;return"rtl"===V(o).direction&&(l+=G(e.clientWidth,o.clientWidth)-i),{width:i,height:r,x:l,y:s}}(rt(t));else if(U(e))o=function(t,e){const n=ot(t,!0,"fixed"===e),o=n.top+t.clientTop,i=n.left+t.clientLeft,r=N(t)?tt(t):K(1);return{width:t.clientWidth*r.x,height:t.clientHeight*r.y,x:i*r.x,y:o*r.y}}(e,n);else{const n=nt(t);o={...e,x:e.x-n.x,y:e.y-n.y}}return k(o)}function ut(t,e){const n=st(t);return!(n===e||!U(n)||Y(n))&&("fixed"===V(n).position||ut(n,e))}function dt(t,e,n){const o=N(e),i=rt(e),r="fixed"===n,l=ot(t,!0,r,e);let s={scrollLeft:0,scrollTop:0};const a=K(0);if(o||!o&&!r)if(("body"!==M(e)||$(i))&&(s=it(e)),N(e)){const t=ot(e,!0,r,e);a.x=t.x+e.clientLeft,a.y=t.y+e.clientTop}else i&&(a.x=lt(i));return{x:l.left+s.scrollLeft-a.x,y:l.top+s.scrollTop-a.y,width:l.width,height:l.height}}function pt(t,e){return N(t)&&"fixed"!==V(t).position?e?e(t):t.offsetParent:null}function mt(t,e){const n=H(t);if(!N(t))return n;let o=pt(t,e);for(;o&&q(o)&&"static"===V(o).position;)o=pt(o,e);return o&&("html"===M(o)||"body"===M(o)&&"static"===V(o).position&&!I(o))?n:o||function(t){let e=st(t);for(;N(e)&&!Y(e);){if(I(e))return e;e=st(e)}return null}(t)||n}const gt={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:n,strategy:o}=t;const i=N(n),r=rt(n);if(n===r)return e;let l={scrollLeft:0,scrollTop:0},s=K(1);const a=K(0);if((i||!i&&"fixed"!==o)&&(("body"!==M(n)||$(r))&&(l=it(n)),N(n))){const t=ot(n);s=tt(n),a.x=t.x+n.clientLeft,a.y=t.y+n.clientTop}return{width:e.width*s.x,height:e.height*s.y,x:e.x*s.x-l.scrollLeft*s.x+a.x,y:e.y*s.y-l.scrollTop*s.y+a.y}},getDocumentElement:rt,getClippingRect:function(t){let{element:e,boundary:n,rootBoundary:o,strategy:i}=t;const r=[..."clippingAncestors"===n?function(t,e){const n=e.get(t);if(n)return n;let o=ct(t).filter((t=>U(t)&&"body"!==M(t))),i=null;const r="fixed"===V(t).position;let l=r?st(t):t;for(;U(l)&&!Y(l);){const e=V(l),n=I(l);n||"fixed"!==e.position||(i=null),(r?!n&&!i:!n&&"static"===e.position&&i&&["absolute","fixed"].includes(i.position)||$(l)&&!n&&ut(t,l))?o=o.filter((t=>t!==l)):i=e,l=st(l)}return e.set(t,o),o}(e,this._c):[].concat(n),o],l=r[0],s=r.reduce(((t,n)=>{const o=ft(e,n,i);return t.top=G(o.top,t.top),t.right=z(o.right,t.right),t.bottom=z(o.bottom,t.bottom),t.left=G(o.left,t.left),t}),ft(e,l,i));return{width:s.right-s.left,height:s.bottom-s.top,x:s.left,y:s.top}},getOffsetParent:mt,getElementRects:async function(t){let{reference:e,floating:n,strategy:o}=t;const i=this.getOffsetParent||mt,r=this.getDimensions;return{reference:dt(e,await i(n),o),floating:{x:0,y:0,...await r(n)}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){return Q(t)},getScale:tt,isElement:U,isRTL:function(t){return"rtl"===getComputedStyle(t).direction}},ht=(t,e,n)=>{const o=new Map,i={platform:gt,...n},r={...i.platform,_c:o};return(async(t,e,n)=>{const{placement:o="bottom",strategy:i="absolute",middleware:r=[],platform:l}=n,s=r.filter(Boolean),a=await(null==l.isRTL?void 0:l.isRTL(e));let c=await l.getElementRects({reference:t,floating:e,strategy:i}),{x:f,y:u}=C(c,o,a),d=o,p={},m=0;for(let g=0;g<s.length;g++){const{name:n,fn:r}=s[g],{x:h,y:y,data:w,reset:x}=await r({x:f,y:u,initialPlacement:o,placement:d,strategy:i,middlewareData:p,rects:c,platform:l,elements:{reference:t,floating:e}});f=null!=h?h:f,u=null!=y?y:u,p={...p,[n]:{...p[n],...w}},x&&m<=50&&(m++,"object"==typeof x&&(x.placement&&(d=x.placement),x.rects&&(c=!0===x.rects?await l.getElementRects({reference:t,floating:e,strategy:i}):x.rects),({x:f,y:u}=C(c,d,a))),g=-1)}return{x:f,y:u,placement:d,strategy:i,middlewareData:p}})(t,e,{...i,platform:r})},yt={class:"separator"},wt={class:"separator"},xt=(t=>(h("data-v-5638faa0"),t=t(),y(),t))((()=>a("span",null,"问题反馈",-1))),vt=w(t({__name:"Contextmenu",emits:["addWidget","settings","delWidget","about","wallpaper","editWidget","close"],setup(t,{expose:h,emit:y}){const w=e(""),v=e({}),b=e(),C=e(!1),k=()=>{C.value=!1,window.open("https://support.qq.com/products/592621/")};n(b,(()=>{C.value=!1,y("close")}));h({show:(t,e)=>{w.value=t,(async t=>{C.value=!0;const e={widget:{placement:"right-start",transformOrigin:"0% 0%"},settings:{placement:"bottom-end",transformOrigin:"90% 0%"}}[w.value],{x:n,y:o}=await ht(t,b.value,{placement:e.placement,middleware:[_(),(void 0===i&&(i={}),{name:"shift",options:i,async fn(t){const{x:e,y:n,placement:o}=t,{mainAxis:r=!0,crossAxis:l=!1,limiter:s={fn:t=>{let{x:e,y:n}=t;return{x:e,y:n}}},...a}=L(i,t),c={x:e,y:n},f=await E(t,a),u=T(R(o)),d=function(t){return"x"===t?"y":"x"}(u);let p=c[u],m=c[d];if(r){const t="y"===u?"bottom":"right";p=W(p+f["y"===u?"top":"left"],p,p-f[t])}if(l){const t="y"===d?"bottom":"right";m=W(m+f["y"===d?"top":"left"],m,m-f[t])}const g=s.fn({...t,[u]:p,[d]:m});return{...g,data:{x:g.x-e,y:g.y-n}}}})],strategy:"fixed"});var i;v.value={left:`${n}px`,top:`${o}px`,transformOrigin:e.transformOrigin}})(e)}});const S=(t,e)=>{C.value=!1,y(t,e)};return(t,e)=>(o(),i(g,{to:"body"},[r(m,{name:"fade"},{default:l((()=>[s(a("ul",{ref_key:"floatingRef",ref:b,style:c(f(v))},[s(a("li",{class:"item",onClick:e[0]||(e[0]=t=>S("settings"))}," 常规设置 ",512),[[u,"settings"===f(w)]]),s(a("li",{class:"item",onClick:e[1]||(e[1]=t=>S("wallpaper"))}," 壁纸偏好 ",512),[[u,"settings"===f(w)]]),s(a("li",yt,null,512),[[u,"settings"===f(w)]]),a("li",{class:"item",onClick:e[2]||(e[2]=t=>S("addWidget"))},"添加小组件"),a("li",{class:"item",onClick:e[3]||(e[3]=t=>S("editWidget"))},"编辑小组件"),s(a("li",{class:"item delete",onClick:e[4]||(e[4]=t=>S("delWidget"))}," 删除此小组件 ",512),[[u,"widget"===f(w)]]),s(a("li",wt,null,512),[[u,"settings"===f(w)]]),s(a("li",{class:"item",onClick:k},[xt,d(),r(p,{color:"rgba(60, 60, 60, .33)"},{default:l((()=>[r(f(x))])),_:1})],512),[[u,"settings"===f(w)]]),s(a("li",{class:"item",onClick:e[5]||(e[5]=t=>S("about"))}," 关于 ",512),[[u,"settings"===f(w)]])],4),[[u,f(C)]])])),_:1})]))}}),[["__scopeId","data-v-5638faa0"]]);export{vt as default};