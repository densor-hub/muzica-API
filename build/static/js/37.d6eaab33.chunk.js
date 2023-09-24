"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[37],{6638:function(e,n){n.Z=function(e,n){401===e?n("Unathorized..."):400===e?n("Bad request..."):405===e?n("Method not allowed..."):403===e?n("Error, request not allowed..."):404===e?n("Error, server rejected..."):409===e?n("Similar identity exists"):500===e&&n("Internal error...")}},3037:function(e,n,t){t.r(n),t.d(n,{default:function(){return Z}});var i=t(4165),o=t(1413),l=t(5861),s=t(9439),d=t(4569),a=t.n(d),r=t(2791),u=t(5332),c=t(408),v=t(3465),h=t(6638),m=t(8781),f=t(1087),g=t(2642),x=t(7689),p=t(811),w=t(184),j=function(e){var n=e.setSelectedImage,t=e.ImageObject,i=e.Index,o=(0,v.Z)().auth;return(0,w.jsx)("img",{src:(0,p.Z)(t),alt:null===o||void 0===o?void 0:o.stagenameInUrl,onClick:function(){n({image:{_id:null===t||void 0===t?void 0:t._id},index:i})}})},Z=function(){var e,n,t,d,p=(0,v.Z)().auth,Z=(0,x.s0)(),b=(0,r.useState)([]),k=(0,s.Z)(b,2),I=k[0],C=k[1],N=(0,r.useState)(""),y=(0,s.Z)(N,2),D=y[0],S=y[1],E=(0,r.useState)({showloading:!1,showImageViewer:!1}),U=(0,s.Z)(E,2),B=U[0],L=U[1],A=(0,r.useState)(""),_=(0,s.Z)(A,2),F=_[0],M=_[1],P=(0,r.useCallback)((0,l.Z)((0,i.Z)().mark((function e(){var n,t,l,s,d;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return L((function(e){return(0,o.Z)((0,o.Z)({},e),{},{showloading:!0})})),e.prev=1,e.next=4,a().get("".concat(c.C,"/get-added-images"),{withCredentials:!0});case 4:200===(null===(n=e.sent)||void 0===n?void 0:n.status)?(C(null===n||void 0===n||null===(t=n.data)||void 0===t?void 0:t.addedItems),L((function(e){return(0,o.Z)((0,o.Z)({},e),{},{showloading:!1})}))):204===(null===n||void 0===n?void 0:n.status)&&(C([]),L((function(e){return(0,o.Z)((0,o.Z)({},e),{},{showloading:!1})})),S("No images found...")),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),null!==e.t0&&void 0!==e.t0&&null!==(l=e.t0.response)&&void 0!==l&&l.data?401===(null===e.t0||void 0===e.t0||null===(s=e.t0.response)||void 0===s?void 0:s.status)?(0,u.Z)(p).then((function(e){var n,t;200===e.status?P():Z("/".concat(null===p||void 0===p||null===(n=p.stagenameInUrl)||void 0===n||null===(t=n.trim())||void 0===t?void 0:t.toLowerCase(),"/sign-out"))})):(L((function(e){return(0,o.Z)((0,o.Z)({},e),{},{showloading:!1})})),(0,h.Z)(null===e.t0||void 0===e.t0||null===(d=e.t0.response)||void 0===d?void 0:d.status,S)):S("Network challenges...");case 11:case"end":return e.stop()}}),e,null,[[1,8]])}))),[p,Z]);return(0,r.useEffect)((function(){P()}),[P]),(0,r.useEffect)((function(){D&&setTimeout((function(){S("")}),3e3)}),[D]),(0,w.jsxs)(w.Fragment,{children:[(null===B||void 0===B?void 0:B.showloading)&&(0,w.jsx)(m.Z,{}),F&&(0,w.jsx)(g.Z,{getData:P,selectedImage:F,setSelectedImage:M,setBools:L,bools:B,addedImages:I,setParentFeedback:S,showDeleteButton:!0}),(0,w.jsxs)("main",{className:" added-images",style:{paddingTop:"40px"},children:[(0,w.jsxs)("div",{className:"page-heading",children:["ADDED"," ",(0,w.jsx)("i",{children:(0,w.jsx)("b",{children:"IMAGES"})})]}),(0,w.jsx)("div",{className:"feedback-container",style:D?{}:{backgroundColor:"transparent"},children:(0,w.jsxs)("div",{className:"feeback",children:[!(null!==B&&void 0!==B&&B.showDeleteModal)&&D,(0,w.jsx)("span",{style:{visibility:"hidden"},children:"."})]})}),(0,w.jsx)("div",{className:"add-new-button-container",style:{textAlign:"center",marginBottom:"15px"},children:null!==p&&void 0!==p&&p.websiteCreated?(0,w.jsx)(f.rU,{to:"/".concat(null===p||void 0===p||null===(e=p.stagenameInUrl)||void 0===e||null===(n=e.trim())||void 0===n?void 0:n.toLowerCase(),"/add-image"),children:"Add new"}):(0,w.jsx)(f.rU,{to:"/".concat(null===p||void 0===p||null===(t=p.stagenameInUrl)||void 0===t||null===(d=t.trim())||void 0===d?void 0:d.toLowerCase(),"/createwebsite"),children:"Create website"})}),(0,w.jsxs)("div",{children:[(0,w.jsx)("div",{className:"list-of-individual-items",style:0===(null===I||void 0===I?void 0:I.length)?{backgroundColor:"transparent",borderTop:"2px solid white",borderLeft:"0px",borderBottom:"0px",borderRight:"0px",overflow:"hidden",width:"70vw",margin:"0 auto"}:{},children:(null===I||void 0===I?void 0:I.length)>0&&(null===I||void 0===I?void 0:I.map((function(e,n){return(0,w.jsx)("div",{className:"indivial-item for-images",children:(0,w.jsx)("div",{className:"image-container",children:(0,w.jsx)("div",{children:(0,w.jsx)(j,{ImageObject:e,setSelectedImage:M,Index:n})})})},null===e||void 0===e?void 0:e._id)})))}),!B.showloading&&0===(null===I||void 0===I?void 0:I.length)&&(0,w.jsx)("div",{style:{textAlign:"center"},children:"No results found"})]})]})]})}},2642:function(e,n,t){t.d(n,{Z:function(){return p}});var i=t(4165),o=t(1413),l=t(5861),s=t(9439),d=t(2791),a=t(408),r=t(4569),u=t.n(r),c=t(5332),v=t(6638),h=t(3465),m=t(7689),f=t(8781),g=t(811),x=t(184),p=function(e){var n=e.addedImages,t=e.setSelectedImage,r=e.selectedImage,p=e.setParentFeedback,w=e.showDeleteButton,j=e.getData,Z=e.setBools,b=(0,m.s0)(),k=(0,h.Z)().auth,I=(0,d.useState)(null===r||void 0===r?void 0:r.index),C=(0,s.Z)(I,2),N=C[0],y=C[1],D=(0,d.useState)(!1),S=(0,s.Z)(D,2),E=S[0],U=S[1],B=(0,d.useState)(""),L=(0,s.Z)(B,2),A=L[0],_=L[1],F=(0,d.useRef)(),M=(0,d.useRef)(),P=(0,d.useCallback)((function(e){"Escape"===(null===e||void 0===e?void 0:e.key)&&t("")}),[t]);(0,d.useEffect)((function(){var e;return null===(e=document)||void 0===e||e.addEventListener("keydown",P),function(){var e;null===(e=document)||void 0===e||e.removeEventListener("keydown",P)}}),[t,P]);var R=function(){var e=(0,l.Z)((0,i.Z)().mark((function e(){var l,s,d,r,h,m;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,U(!0),e.next=4,u().put("".concat(a.C,"/delete-images:").concat(null===(l=n[N])||void 0===l?void 0:l._id),{selectedItem:null===n||void 0===n||null===(s=n[N])||void 0===s?void 0:s._id},{withCredentials:!0});case 4:200===(null===(d=e.sent)||void 0===d?void 0:d.status)?j().then((function(){Z((function(e){return(0,o.Z)((0,o.Z)({},e),{},{showDeleteModal:!1})})),p("Deleted successfully..."),t("")})):204===(null===d||void 0===d?void 0:d.status)&&(U(!1),_("Image already deleted..")),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0),null!==e.t0&&void 0!==e.t0&&null!==(r=e.t0.response)&&void 0!==r&&r.data?401===(null===e.t0||void 0===e.t0||null===(h=e.t0.response)||void 0===h?void 0:h.status)?(0,c.Z)(k).then((function(e){var n,t;200===(null===e||void 0===e?void 0:e.status)?R():b("/".concat(null===k||void 0===k||null===(n=k.stagenameInUrl)||void 0===n||null===(t=n.trim())||void 0===t?void 0:t.toLowerCase(),"/sign-out"))})):(U(!1),(0,v.Z)(null===e.t0||void 0===e.t0||null===(m=e.t0.response)||void 0===m?void 0:m.status,_)):(U(!1),_("Network challenges..."));case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();return(0,x.jsxs)(x.Fragment,{children:[E&&(0,x.jsx)(f.Z,{}),(0,x.jsxs)("main",{className:"image-viewer-container",children:[(0,x.jsx)("div",{className:"close-button-container",children:(0,x.jsx)("button",{onClick:function(e){e.preventDefault(),t("")},children:"X"})}),(0,x.jsx)("div",{className:"feedback-conatiner",children:(0,x.jsx)("div",{className:"feedback",style:{textAlign:"center"},children:A})}),(0,x.jsx)("div",{className:"image-container",children:(0,x.jsx)("img",{alt:null===k||void 0===k?void 0:k.stagenameInUrl,src:(0,g.Z)(n[N])})}),(0,x.jsxs)("div",{className:"navigation-buttons",children:[(0,x.jsx)("button",{onClick:function(e){e.preventDefault(),!!0||N<=0?(y((null===n||void 0===n?void 0:n.length)-1),!1):(y((function(e){return e-1})),!1)},ref:M,children:"Previous"}),w&&(0,x.jsx)("button",{onClick:function(e){e.preventDefault(),R()},children:"Delete"}),(0,x.jsx)("button",{onClick:function(e){e.preventDefault(),!0&&N!==(null===n||void 0===n?void 0:n.length)-1?(y((function(e){return e+1})),!1):(y(0),!1)},ref:F,children:"Next"})]})]})]})}}}]);
//# sourceMappingURL=37.d6eaab33.chunk.js.map