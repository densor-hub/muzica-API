"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[112],{3495:function(e,n,l){l.d(n,{fX:function(){return t},qb:function(){return i}});var t=function(e){var n=null===e||void 0===e?void 0:e.trim();if(null===n||void 0===n)return!1;var l=n.split("-")[0],t=Number(n.split("-")[1])-1,r=n.split("-")[2],o="".concat((new Date).getFullYear()),d="".concat((new Date).getMonth()),u="".concat((new Date).getDate());if(!i(n))return!1;if(Number(l)>Number(o))return!0;if(Number(l)<Number(o))return!1;if(Number(l)===Number(o)){if(Number(t>Number(d)))return!0;if(Number(t<Number(d)))return!1;if(Number(t)===Number(d)){if(Number(r)>=Number(u))return!0;if(Number(r)<Number(u))return!1}}},i=function(e){var n,l,t,i=e.trim(),r=i.split("-")[0],o=i.split("-")[1],d=i.split("-")[2];return!(!Number(r)||!Number(o)||!Number(d)||4!==(null===r||void 0===r?void 0:r.length)||null!==(n=String(r))&&void 0!==n&&n.startsWith("0")||Number(o)>12||Number(o<=0)||2!==(null===(l=String(o))||void 0===l?void 0:l.length)||d>31||Number(d<=0)||2!==(null===(t=String(d))||void 0===t?void 0:t.length))}},6638:function(e,n){n.Z=function(e,n){401===e?n("Unathorized..."):400===e?n("Bad request..."):405===e?n("Method not allowed..."):403===e?n("Error, request not allowed..."):404===e?n("Error, server rejected..."):409===e?n("Similar identity exists"):500===e&&n("Internal error...")}},3112:function(e,n,l){l.r(n);var t=l(4165),i=l(1413),r=l(5861),o=l(9439),d=l(4569),u=l.n(d),s=l(2791),c=l(408),a=l(6638),v=l(5332),h=l(3465),f=l(8781),p=l(7689),x=l(3495),m=(l(4395),l(6477),l(184));n.default=function(){var e,n,l,d=(0,h.Z)().auth,j=(0,p.s0)(),b=(0,s.useState)(-1),N=(0,o.Z)(b,2),g=N[0],w=N[1],y=(0,s.useState)({}),Z=(0,o.Z)(y,2),k=Z[0],C=Z[1],D=(0,s.useMemo)((function(){return["New release","Tour","Event"]}),[]),E={valid:"white",error:"rgb(255, 71, 86)"},S=(0,s.useState)(""),L=(0,o.Z)(S,2),I=L[0],V=L[1],U=(0,s.useRef)(),M=(0,s.useState)(""),T=(0,o.Z)(M,2),B=T[0],Y=T[1],q=(0,s.useState)({showloading:!1}),A=(0,o.Z)(q,2),F=A[0],R=A[1],W=(0,s.useRef)([]),X=function(e){e&&!W.current.includes(e)?W.current.push(e):W.current.pop(e)},_=function(){var e=(0,r.Z)((0,t.Z)().mark((function e(){var n,l,r,o,s,h,f,p,m,b,N,g,w,y;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(C((function(e){var n,l,t,r;return(0,i.Z)((0,i.Z)({},e),{},{type:null===W||void 0===W||null===(n=W.current[0])||void 0===n?void 0:n.value,date:null===W||void 0===W||null===(l=W.current[1])||void 0===l?void 0:l.value,specifics:null===W||void 0===W||null===(t=W.current[2])||void 0===t?void 0:t.value,description:null===W||void 0===W||null===(r=W.current[3])||void 0===r?void 0:r.value})})),s={type:null===W||void 0===W||null===(n=W.current[0])||void 0===n?void 0:n.value,date:null===W||void 0===W||null===(l=W.current[1])||void 0===l?void 0:l.value,specifics:null===W||void 0===W||null===(r=W.current[2])||void 0===r?void 0:r.value,description:null===W||void 0===W||null===(o=W.current[3])||void 0===o?void 0:o.value,not_current_content:!0},h=!1,f=!1,p=!1,""!==I){e.next=19;break}if(null===(m=W.current)||void 0===m||m.forEach((function(e){if(""===(null===e||void 0===e?void 0:e.value))e.style.borderBottom="3px solid ".concat(E.error),Y("Enter all fields"),f=!0;else{var n,l;if(e.style.borderBottom="3px solid ".concat(E.valid),"typeInput"===(null===e||void 0===e?void 0:e.className))D.includes((null===e||void 0===e?void 0:e.value[0].toUpperCase())+(null===e||void 0===e||null===(n=e.value)||void 0===n?void 0:n.slice(1,null===e||void 0===e||null===(l=e.value)||void 0===l?void 0:l.length).toLowerCase()))&&(h=!0);"date"!==(null===e||void 0===e?void 0:e.type)&&"date"!==(null===e||void 0===e?void 0:e.className)&&"date"!==(null===e||void 0===e?void 0:e.id)||((0,x.fX)(String(null===e||void 0===e?void 0:e.value))?(p=!0,console.log("hererere")):(Y("Date must not be in the past"),e.style.borderBottom="3px solid ".concat(null===E||void 0===E?void 0:E.error)),(0,x.qb)(e.value)||(Y("Invalid date"),e.style.borderBottom="3px solid ".concat(null===E||void 0===E?void 0:E.error)))}})),f||!h||!p){e.next=19;break}return R((function(e){return(0,i.Z)((0,i.Z)({},e),{},{showloading:!0})})),e.prev=9,e.next=12,u().post("".concat(c.C,"/save-upcoming"),s,{withCredentials:!0});case 12:200===e.sent.status&&j("/".concat(null===d||void 0===d||null===(b=d.stagenameInUrl)||void 0===b||null===(N=b.trim())||void 0===N?void 0:N.toLowerCase(),"/added-upcoming")),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(9),null!==e.t0&&void 0!==e.t0&&null!==(g=e.t0.response)&&void 0!==g&&g.data?401===(null===e.t0||void 0===e.t0||null===(w=e.t0.response)||void 0===w?void 0:w.status)?(0,v.Z)(d).then((function(e){var n,l;200===e.status?_():j("/".concat(null===d||void 0===d||null===(n=d.stagenameInUrl)||void 0===n||null===(l=n.trim())||void 0===l?void 0:l.toLowerCase(),"/sign-out"))})):((0,a.Z)(null===e.t0||void 0===e.t0||null===(y=e.t0.response)||void 0===y?void 0:y.status,Y),R((function(e){return(0,i.Z)((0,i.Z)({},e),{},{showloading:!1})}))):(R((function(e){return(0,i.Z)((0,i.Z)({},e),{},{showloading:!1})})),Y("Network error..."));case 19:case"end":return e.stop()}}),e,null,[[9,16]])})));return function(){return e.apply(this,arguments)}}();return(0,s.useEffect)((function(){var e=function(e){U.current&&!U.current.contains(e.target)&&(R((function(e){return(0,i.Z)((0,i.Z)({},e),{},{showDropdown:!1})})),w(-1))};return document.addEventListener("click",e),function(){document.removeEventListener("click",e)}}),[U,F,R]),(0,s.useEffect)((function(){var e=function(e){if(null!==U&&void 0!==U&&U.current){if("ArrowUp"===e.key){var n,l,t,i,r,o,d,u,s,c,a,v,h,f;if(-1===g)null===(r=U.current)||void 0===r||null===(o=r.childNodes[0])||void 0===o||null===(d=o.lastChild)||void 0===d||null===(u=d.firstChild)||void 0===u||u.focus(),w((null===(s=U.current)||void 0===s||null===(c=s.childNodes[0])||void 0===c||null===(a=c.childNodes)||void 0===a?void 0:a.length)-1);else console.log(g),w((function(e){return e-1})),0===g&&w((null===(v=U.current)||void 0===v||null===(h=v.childNodes[0])||void 0===h||null===(f=h.childNodes)||void 0===f?void 0:f.length)-1);null===(n=U.current)||void 0===n||null===(l=n.childNodes[0])||void 0===l||null===(t=l.childNodes[g])||void 0===t||null===(i=t.firstChild)||void 0===i||i.focus()}if("ArrowDown"===e.key){var p,x,m,j,b,N,y,Z,k,C,D;if(-1===g)w(1),null===(b=U.current)||void 0===b||null===(N=b.childNodes[0])||void 0===N||null===(y=N.childNodes[0])||void 0===y||null===(Z=y.firstChild)||void 0===Z||Z.focus();else w((function(e){return e+1})),g===(null===(k=U.current)||void 0===k||null===(C=k.childNodes[0])||void 0===C||null===(D=C.childNodes)||void 0===D?void 0:D.length)-1&&w(0);null===(p=U.current)||void 0===p||null===(x=p.childNodes[0])||void 0===x||null===(m=x.childNodes[g])||void 0===m||null===(j=m.firstChild)||void 0===j||j.focus()}}};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[g,U]),(0,m.jsxs)(m.Fragment,{children:[F.showloading&&(0,m.jsx)(f.Z,{}),(0,m.jsxs)("main",{children:[(0,m.jsx)("div",{className:"feedback-container",style:B?{}:{backgroundColor:"transparent"},children:(0,m.jsxs)("div",{className:"feeback",children:[" ",(0,m.jsx)("span",{style:{visibility:"hidden"},children:"."}),B]})}),(0,m.jsxs)("div",{className:"page-heading",children:["ADDED NEW ",(0,m.jsx)("i",{children:(0,m.jsx)("b",{children:"UPCOMING"})})]}),(0,m.jsxs)("section",{className:"add-upcoming",children:[(0,m.jsx)("form",{className:"form1",children:(0,m.jsx)("table",{children:(0,m.jsxs)("tbody",{children:[(0,m.jsxs)("tr",{children:[(0,m.jsxs)("td",{className:"label",children:[(0,m.jsx)("label",{children:"Type"}),(0,m.jsx)("span",{children:"*"})]}),(0,m.jsx)("td",{children:(0,m.jsx)("input",{className:"typeInput",type:"text",ref:X,defaultValue:null===k||void 0===k?void 0:k.type,placeholder:"Select type",onClick:function(){R((function(e){return(0,i.Z)((0,i.Z)({},e),{},{showDropdown:!0})}))},onChange:function(){R((function(e){return(0,i.Z)((0,i.Z)({},e),{},{showDropdown:!0})}))}})})]}),(null===F||void 0===F?void 0:F.showDropdown)&&(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{}),(0,m.jsx)("td",{ref:U,children:(0,m.jsx)("div",{className:"type",ref:U,children:D.map((function(e,n){return(0,m.jsx)("div",{className:"individualType",children:(0,m.jsx)("button",{onClick:function(n){n.preventDefault(),W.current[0].value=e,R((function(e){return(0,i.Z)((0,i.Z)({},e),{},{showDropdown:!1})})),I&&V((function(n){return(0,i.Z)((0,i.Z)({},n),{},{type:e})}))},children:e})},n)}))})})]})]})})}),(0,m.jsx)("form",{className:"form2",children:(0,m.jsx)("table",{children:(0,m.jsxs)("tbody",{children:[(0,m.jsxs)("tr",{children:[(0,m.jsxs)("td",{className:"label",children:[" ",(0,m.jsx)("label",{children:"Date"}),(0,m.jsx)("span",{children:"*"})]}),(0,m.jsx)("td",{children:(0,m.jsx)("input",{type:"date",className:"date",id:"date",placeholder:"YYYY-MM-DD",ref:X,defaultValue:null===k||void 0===k?void 0:k.date})})]}),((null===W||void 0===W||null===(e=W.current[0])||void 0===e?void 0:e.value)===D[0]||I.type===D[0])&&(0,m.jsxs)("tr",{children:[(0,m.jsxs)("td",{className:"label",children:[(0,m.jsx)("label",{children:"Title"})," ",(0,m.jsx)("span",{children:"*"})]}),(0,m.jsx)("td",{children:(0,m.jsx)("input",{type:"text",ref:X,defaultValue:null===k||void 0===k?void 0:k.title,placeholder:"Title"})})]}),((null===W||void 0===W||null===(n=W.current[0])||void 0===n?void 0:n.value)===D[1]||I.type===D[1])&&(0,m.jsxs)("tr",{children:[(0,m.jsxs)("td",{className:"label",children:[(0,m.jsx)("label",{children:"Location"})," ",(0,m.jsx)("span",{children:"*"})]}),(0,m.jsx)("td",{children:(0,m.jsx)("input",{type:"text",ref:X,defaultValue:null===k||void 0===k?void 0:k.location,placeholder:"Location"})})]}),((null===W||void 0===W||null===(l=W.current[0])||void 0===l?void 0:l.value)===D[2]||I.type===D[2])&&(0,m.jsxs)("tr",{children:[(0,m.jsxs)("td",{className:"label",children:[(0,m.jsx)("label",{children:"Venue"})," ",(0,m.jsx)("span",{children:"*"})]}),(0,m.jsx)("td",{children:(0,m.jsx)("input",{type:"text",ref:X,defaultValue:null===k||void 0===k?void 0:k.venue,placeholder:"Venue"})})]}),(0,m.jsxs)("tr",{children:[(0,m.jsxs)("td",{className:"label",children:[(0,m.jsx)("label",{children:"Description"}),(0,m.jsx)("span",{className:"notForTooSmall",children:"*"})]}),(0,m.jsx)("td",{children:(0,m.jsx)("textarea",{type:"text",ref:X,defaultValue:null===k||void 0===k?void 0:k.description,placeholder:"Description"})})]}),(0,m.jsxs)("tr",{style:{textAlign:"center"},children:[(0,m.jsx)("td",{children:(0,m.jsx)("button",{onClick:function(e){e.preventDefault(),_()},children:"Save"})}),(0,m.jsx)("td",{children:(0,m.jsx)("button",{onClick:function(e){var n,l;e.preventDefault(),j("/".concat(null===d||void 0===d||null===(n=d.stagenameInUrl)||void 0===n||null===(l=n.trim())||void 0===l?void 0:l.toLowerCase(),"/added-upcoming"))},children:"Cancel"})})]})]})})})]})]})]})}},4395:function(){}}]);
//# sourceMappingURL=112.2d91ff38.chunk.js.map