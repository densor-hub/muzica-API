"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[586],{6638:function(e,n){n.Z=function(e,n){401===e?n("Unathorized..."):400===e?n("Bad request..."):405===e?n("Method not allowed..."):403===e?n("Error, request not allowed..."):404===e?n("Error, server rejected..."):409===e?n("Similar identity exists"):500===e&&n("Internal error...")}},8586:function(e,n,t){t.r(n);var o=t(4165),l=t(1413),r=t(5861),i=t(9439),a=t(2791),s=t(408),d=t(5332),u=t(6638),c=t(3465),v=t(4569),h=t.n(v),p=t(8781),f=t(7689),x=(t(6155),t(6477),t(184));n.default=function(){var e=(0,c.Z)().auth,n=(0,f.s0)(),t={error:"rgb(255, 71, 86)",valid:"white"},v=(0,a.useState)({showloading:!1}),g=(0,i.Z)(v,2),w=g[0],b=g[1],j=(0,a.useRef)([]),Z=(0,a.useState)(""),m=(0,i.Z)(Z,2),k=m[0],C=m[1],y=(0,a.useState)(""),I=(0,i.Z)(y,2),N=I[0],E=I[1],B=function(){var i=(0,r.Z)((0,o.Z)().mark((function r(){var i,a,c,v,p,f,x,g,w,Z;return(0,o.Z)().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(j.current[0].style.borderBottom="3px solid ".concat(null===t||void 0===t?void 0:t.error),C(j.current[0].value),a={biography:null===(i=j.current[0])||void 0===i?void 0:i.value,not_current_content:!0},""!==j.current[0].value){o.next=7;break}E("Enter all fields"),o.next=24;break;case 7:if(!((null===(c=j.current[0])||void 0===c||null===(v=c.value)||void 0===v?void 0:v.length)<100)){o.next=11;break}E("Enter at least 100 characters"),o.next=24;break;case 11:return j.current[0].style.borderBottom="3px solid ".concat(null===t||void 0===t?void 0:t.valid),b((function(e){return(0,l.Z)((0,l.Z)({},e),{},{showloading:!0})})),o.prev=13,o.next=16,h().post("".concat(s.C,"/save-biography"),a,{withCredentials:!0});case 16:200!==(p=o.sent).status&&204!==(null===p||void 0===p?void 0:p.status)||n("/".concat(null===e||void 0===e||null===(f=e.stagenameInUrl)||void 0===f||null===(x=f.trim())||void 0===x?void 0:x.toLowerCase(),"/added-biography")),o.next=24;break;case 20:o.prev=20,o.t0=o.catch(13),console.log(o.t0),null!==o.t0&&void 0!==o.t0&&null!==(g=o.t0.response)&&void 0!==g&&g.data?401===(null===o.t0||void 0===o.t0||null===(w=o.t0.response)||void 0===w?void 0:w.status)?(0,d.Z)(e).then((function(t){var o,l;200===t.status?B():n("/".concat(null===e||void 0===e||null===(o=e.stagenameInUrl)||void 0===o||null===(l=o.trim())||void 0===l?void 0:l.toLowerCase(),"/sign-out"))})):((0,u.Z)(null===o.t0||void 0===o.t0||null===(Z=o.t0.response)||void 0===Z?void 0:Z.status,E),b((function(e){return(0,l.Z)((0,l.Z)({},e),{},{showloading:!1})}))):(b((function(e){return(0,l.Z)((0,l.Z)({},e),{},{showloading:!1})})),E("Network error..."));case 24:case"end":return o.stop()}}),r,null,[[13,20]])})));return function(){return i.apply(this,arguments)}}(),S=(0,a.useCallback)((0,r.Z)((0,o.Z)().mark((function t(){var r,i,a,c,v,p,f;return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,h().get("".concat(s.C,"/get-biography:").concat(null===(r=window.location.pathname)||void 0===r?void 0:r.split("/")[(null===(i=window.location.pathname)||void 0===i?void 0:i.split("/").length)-1]),{withCredentials:!0});case 3:200===(null===(a=t.sent)||void 0===a?void 0:a.status)&&C(null===a||void 0===a||null===(c=a.data)||void 0===c?void 0:c.results),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0),null!==t.t0&&void 0!==t.t0&&null!==(v=t.t0.response)&&void 0!==v&&v.data?401===(null===t.t0||void 0===t.t0||null===(p=t.t0.response)||void 0===p?void 0:p.status)?(0,d.Z)(e).then((function(t){var o,l;200===t.status?S():n("/".concat(null===e||void 0===e||null===(o=e.stagenameInUrl)||void 0===o||null===(l=o.trim())||void 0===l?void 0:l.toLowerCase(),"/sign-out"))})):(b((function(e){return(0,l.Z)((0,l.Z)({},e),{},{showloading:!1})})),(0,u.Z)(null===t.t0||void 0===t.t0||null===(f=t.t0.response)||void 0===f?void 0:f.status,E)):E("Network challenges...");case 11:case"end":return t.stop()}}),t,null,[[0,7]])}))),[e,n]);return(0,a.useEffect)((function(){S()}),[S]),(0,x.jsxs)(x.Fragment,{children:[(null===w||void 0===w?void 0:w.showloading)&&(0,x.jsx)(p.Z,{}),(0,x.jsxs)("main",{children:[(0,x.jsx)("div",{className:"feedback-container",style:N?{}:{backgroundColor:"transparent"},children:(0,x.jsx)("div",{className:"feeback",children:!(null!==w&&void 0!==w&&w.showDeleteModal)&&N})}),(0,x.jsxs)("div",{className:"page-heading",children:["EDIT"," ",(0,x.jsx)("i",{children:(0,x.jsx)("b",{children:"BIO"})})]}),(0,x.jsx)("section",{className:"add-news",children:(0,x.jsx)("form",{children:(0,x.jsx)("table",{children:(0,x.jsxs)("tbody",{children:[(0,x.jsxs)("tr",{children:[(0,x.jsxs)("td",{className:"label",children:[(0,x.jsx)("label",{children:"Biography"})," ",(0,x.jsx)("span",{children:"*"})]}),(0,x.jsx)("td",{children:(0,x.jsx)("textarea",{ref:function(e){e&&!j.current.includes(e)?j.current.push(e):j.current.pop(e)},defaultValue:null===k||void 0===k?void 0:k.biography})})]}),(0,x.jsxs)("tr",{children:[(0,x.jsx)("td",{children:(0,x.jsx)("button",{onClick:function(e){e.preventDefault(),B()},children:"Save"})}),(0,x.jsx)("td",{children:(0,x.jsx)("button",{onClick:function(t){var o,l;t.preventDefault(),n("/".concat(null===e||void 0===e||null===(o=e.stagenameInUrl)||void 0===o||null===(l=o.trim())||void 0===l?void 0:l.toLowerCase(),"/added-biography"))},children:"Cancel"})})]})]})})})})]})]})}},6155:function(){}}]);
//# sourceMappingURL=586.bcae231b.chunk.js.map