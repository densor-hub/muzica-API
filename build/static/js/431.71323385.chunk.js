"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[431],{3843:function(n,i,l){l.d(i,{Xc:function(){return e},go:function(){return o}});var e=function(n){if(!n||null===n||void 0===n)return""===n||" "===n?n.trim():n;var i,l=[];if(n.split(" ").length<2)return!1;for(var e=0;e<n.split(" ").length;e++)""!==n.split(" ")[e]&&l.push(n.split(" ")[e]);if(l.length<2)return!1;for(e=0;e<=l.length;e++){if(e!==l.length){var o=l[e];i=i+" "+(o.slice(0,1).toUpperCase()+o.slice(1,o.length).toLowerCase()).trim()}if(e===l.length)return i.split("undefined")[1].trim()}},o=function(n){return""===n||null===n||void 0===n?""===n||" "===n?n.trim():n:2===n.split("@").length&&(!t(n.split("@")[1])&&!t(n.split("@")[0])&&(!(n.split("@")[1].split(".").length<=1)&&(""!==n.split("@")[1].split(".")[1]&&""!==n.split("@")[1].split(".")[0]&&!n.endsWith("."))))},t=function(n){return!!(n.includes("~")||n.includes("!")||n.includes("#")||n.includes("$")||n.includes("%")||n.includes("^")||n.includes("&")||n.includes("*")||n.includes("(")||n.includes(")")||n.includes("_")||n.includes("=")||n.includes("+")||n.includes("?")||n.includes("/")||n.includes(">")||n.includes(",")||n.includes("<")||n.includes("|")||n.includes("@"))}},6638:function(n,i){i.Z=function(n,i){401===n?i("Unathorized..."):400===n?i("Bad request..."):405===n?i("Method not allowed..."):403===n?i("Error, request not allowed..."):404===n?i("Error, server rejected..."):409===n?i("Similar identity exists"):500===n&&i("Internal error...")}},2431:function(n,i,l){l.r(i),l.d(i,{default:function(){return N}});var e=l(4165),o=l(1413),t=l(5861),d=l(9439),s=l(4569),r=l.n(s),u=l(2791),a=l(5332),c=l(408),v=l(3465),h=l(6638),f=l(8781),p=l(7689),x=l(1087),m=l(3700),g=l(3843),j=l(978),w=l(9126),Z=l(8820),b=l(6355),k=l(3853),C=(l(6477),l(184)),N=function(){var n,i,l,s,N,y,E,S,I,D,A,B,L={error:"rgb(255, 71, 86)",valid:"white"},U=(0,v.Z)().auth,T=(0,p.s0)(),z=(0,u.useState)(""),M=(0,d.Z)(z,2),R=M[0],_=M[1],P=(0,u.useState)(""),V=(0,d.Z)(P,2),W=V[0],q=V[1],F=(0,u.useState)(""),G=(0,d.Z)(F,2),H=G[0],O=G[1],X=(0,u.useState)(""),$=(0,d.Z)(X,2),J=$[0],K=$[1],Q=(0,u.useState)({showloading:!1,showEditSocials:!1,toggle:!1,showEditBookings:!1}),Y=(0,d.Z)(Q,2),nn=Y[0],ln=Y[1],en=(0,u.useState)(),on=(0,d.Z)(en,2),tn=on[0],dn=on[1],sn="facebook",rn="twitter",un="instagram",an="tiktok",cn=(0,u.useRef)([]),vn=function(n){n&&!cn.current.includes(n)?cn.current.push(n):cn.current.pop(n)},hn=(0,u.useRef)([]),fn=function(n){var i,l,e;!n||null!==hn&&void 0!==hn&&null!==(i=hn.current)&&void 0!==i&&i.includes(n)?null===hn||void 0===hn||null===(l=hn.current)||void 0===l||l.pop(n):null===hn||void 0===hn||null===(e=hn.current)||void 0===e||e.push(n)},pn=function(){var n=(0,t.Z)((0,e.Z)().mark((function n(){var i,l,t,d,s,u,v,f,p,x,m,g;return(0,e.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(O(""),K(""),s=[],u=!1,v=0,f=[],null===(i=cn.current)||void 0===i||i.forEach((function(n){var i;if(v+=1,""!==(null===n||void 0===n?void 0:n.value))if(null!==n&&void 0!==n&&null!==(i=n.value)&&void 0!==i&&i.startsWith("https://")){try{var l,e,o,t;null===(l=new URL(null===n||void 0===n||null===(o=n.value)||void 0===o?void 0:o.trim()))||void 0===l||null===(e=l.origin)||void 0===e||e.toLowerCase().endsWith((null===n||void 0===n||null===(t=n.className)||void 0===t?void 0:t.toLowerCase())+".com")}catch(d){u=!0,O("Invalid ".concat(null===n||void 0===n?void 0:n.className," URL")),n.style.borderBottom="3px solid ".concat(null===L||void 0===L?void 0:L.error)}u||""!==(null===n||void 0===n?void 0:n.value)&&(n.style.borderBottom="3px solid ".concat(null===L||void 0===L?void 0:L.valid),null===f||void 0===f||f.push({id:Math.random()*(new Date).getMilliseconds(),socialmedia:null===n||void 0===n?void 0:n.className,profilelink:null===n||void 0===n?void 0:n.value}))}else u=!0,O("Invalid ".concat(null===n||void 0===n?void 0:n.className," URL")),n.style.borderBottom="3px solid ".concat(null===L||void 0===L?void 0:L.error)})),(null===s||void 0===s?void 0:s.length)!==(null===cn||void 0===cn||null===(l=cn.current)||void 0===l?void 0:l.length)){n.next=11;break}O("Submit at least one social media profile"),n.next=24;break;case 11:if((null===s||void 0===s?void 0:s.length)===(null===cn||void 0===cn||null===(t=cn.current)||void 0===t?void 0:t.length)||u||v!==(null===cn||void 0===cn||null===(d=cn.current)||void 0===d?void 0:d.length)||0===(null===f||void 0===f?void 0:f.length)){n.next=24;break}return n.prev=12,ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showloading:!0})})),n.next=16,r().post("".concat(c.C,"/save-social-media-platforms"),{platforms:f,not_current_content:!0},{withCredentials:!0});case 16:200===(p=n.sent).status?(mn(),xn().then((function(){ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showloading:!1,showEditSocials:!1})})),O("Saved successfully")}))):204===(null===p||void 0===p?void 0:p.status)&&(mn(),xn().then((function(){ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showloading:!1,showEditSocials:!1})})),O("No match found")}))),n.next=24;break;case 20:n.prev=20,n.t0=n.catch(12),console.log(n.t0),null!==n.t0&&void 0!==n.t0&&null!==(x=n.t0.response)&&void 0!==x&&x.data?401===(null===n.t0||void 0===n.t0||null===(m=n.t0.response)||void 0===m?void 0:m.status)?(0,a.Z)(U).then((function(n){var i,l;200===n.status?pn():T("/".concat(null===U||void 0===U||null===(i=U.stagenameInUrl)||void 0===i||null===(l=i.trim())||void 0===l?void 0:l.toLowerCase(),"/sign-out"))})):((0,h.Z)(null===n.t0||void 0===n.t0||null===(g=n.t0.response)||void 0===g?void 0:g.status,O),ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showloading:!1})}))):(ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showloading:!1})})),O("Network error..."));case 24:case"end":return n.stop()}}),n,null,[[12,20]])})));return function(){return n.apply(this,arguments)}}(),xn=(0,u.useCallback)((0,t.Z)((0,e.Z)().mark((function n(){var i,l,t,d,s,u,v;return(0,e.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showloading:!0})})),n.next=4,r().get("".concat(c.C,"/get-added-socialmedia"),{withCredentials:!0});case 4:200===(null===(i=n.sent)||void 0===i?void 0:i.status)?(_(null===i||void 0===i||null===(l=i.data)||void 0===l?void 0:l.addedItems[0]),q(null===i||void 0===i?void 0:i.data.bookings),dn(null===i||void 0===i||null===(t=i.data)||void 0===t||null===(d=t.bookings)||void 0===d?void 0:d.phone),ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showloading:!1})}))):204===(null===i||void 0===i?void 0:i.status)&&(_([]),ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showloading:!1})})),O("No contact info found...")),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(0),null!==n.t0&&void 0!==n.t0&&null!==(s=n.t0.response)&&void 0!==s&&s.data?401===(null===n.t0||void 0===n.t0||null===(u=n.t0.response)||void 0===u?void 0:u.status)?(0,a.Z)(U).then((function(n){var i,l;200===n.status?xn():T("/".concat(null===U||void 0===U||null===(i=U.stagenameInUrl)||void 0===i||null===(l=i.trim())||void 0===l?void 0:l.toLowerCase(),"/sign-out"))})):(ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showloading:!1})})),(0,h.Z)(null===n.t0||void 0===n.t0||null===(v=n.t0.response)||void 0===v?void 0:v.status,O)):O("Network challenges...");case 11:case"end":return n.stop()}}),n,null,[[0,8]])}))),[U,T]);(0,u.useEffect)((function(){xn()}),[xn]);var mn=function(){var n;_([]),null===cn||void 0===cn||null===(n=cn.current)||void 0===n||n.forEach((function(n){n.value="",n.style.borderBottom="3px solid ".concat(null===L||void 0===L?void 0:L.valid)}))},gn=function(){var n=(0,t.Z)((0,e.Z)().mark((function n(){var i,l,t,d,s,u,v,f,p,x;return(0,e.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(O(""),K(""),t=[],d=!0,s=!0,null===hn||void 0===hn||null===(i=hn.current)||void 0===i||i.forEach((function(n){var i;""!==(null===n||void 0===n?void 0:n.value)?("PhoneInputInput"===(null===n||void 0===n?void 0:n.className)&&((0,m.yf)(tn)||(K("Invalid phone number"),d=!1)),"email"===(null===n||void 0===n?void 0:n.className)&&((0,g.go)(null===n||void 0===n?void 0:n.value)||(K("Invalid email"),s=!1))):null===t||void 0===t||t.push(n),(null===t||void 0===t?void 0:t.length)===(null===hn||void 0===hn||null===(i=hn.current)||void 0===i?void 0:i.length)&&K("Enter at least one booking info")})),(null===t||void 0===t?void 0:t.length)===(null===hn||void 0===hn||null===(l=hn.current)||void 0===l?void 0:l.length)||!s||!d){n.next=18;break}return ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showloading:!0})})),n.prev=8,n.next=11,r().post("".concat(c.C,"/save-bookings"),{phone:tn,email:null===hn||void 0===hn||null===(u=hn.current[1])||void 0===u?void 0:u.value,not_current_content:!0},{withCredentials:!0});case 11:200===(null===(v=n.sent)||void 0===v?void 0:v.status)?xn().then((function(){ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showloading:!1,showEditBookings:!1})})),K("Saved successfully")})):204===(null===v||void 0===v?void 0:v.status)&&_([]),n.next=18;break;case 15:n.prev=15,n.t0=n.catch(8),null!==n.t0&&void 0!==n.t0&&null!==(f=n.t0.response)&&void 0!==f&&f.data?401===(null===n.t0||void 0===n.t0||null===(p=n.t0.response)||void 0===p?void 0:p.status)?(0,a.Z)(U).then((function(n){var i,l;200===n.status?gn():T("/".concat(null===U||void 0===U||null===(i=U.stagenameInUrl)||void 0===i||null===(l=i.trim())||void 0===l?void 0:l.toLowerCase(),"/sign-out"))})):(ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showloading:!1})})),(0,h.Z)(null===n.t0||void 0===n.t0||null===(x=n.t0.response)||void 0===x?void 0:x.status,O)):(ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showloading:!1})})),O("Network challenges..."));case 18:case"end":return n.stop()}}),n,null,[[8,15]])})));return function(){return n.apply(this,arguments)}}();return(0,u.useEffect)((function(){(H||J)&&setTimeout((function(){H&&O(""),J&&K("")}),3e3)}),[H,J]),(0,C.jsxs)(C.Fragment,{children:[(null===nn||void 0===nn?void 0:nn.showloading)&&(0,C.jsx)(f.Z,{}),(0,C.jsxs)("main",{children:[(0,C.jsxs)("div",{className:"page-heading",style:{paddingTop:"40px"},children:["ADDED ",(0,C.jsx)("i",{children:(0,C.jsx)("b",{children:"CONTACT"})})]}),(0,C.jsx)("div",{className:"feedback-container",style:H?{}:{backgroundColor:"transparent"},children:(0,C.jsxs)("div",{className:"feeback",children:[H,(0,C.jsx)("span",{style:{visibility:"hidden"},children:"."})]})}),0===(null===R||void 0===R?void 0:R.length)&&(0,C.jsx)("div",{style:{textAlign:"center",marginBottom:"15px"},children:(0,C.jsx)(x.rU,{to:"/".concat(null===U||void 0===U||null===(n=U.stagenameInUrl)||void 0===n||null===(i=n.trim())||void 0===i?void 0:i.toLowerCase(),"/createwebsite"),children:"Create website"})}),(0,C.jsx)("section",{className:"added-social-media",style:0===(null===R||void 0===R?void 0:R.length)?{borderTop:"1px solid white",width:"70vw",height:"1px",padding:"0px",overflow:"hidden"}:{},children:0===(null===R||void 0===R?void 0:R.length)||nn.showEditSocials?(0,C.jsx)("form",{children:(0,C.jsx)("table",{children:(0,C.jsxs)("tbody",{children:[void 0!==R&&(null===R||void 0===R||null===(E=R.platforms)||void 0===E||null===(S=E.platforms)||void 0===S?void 0:S.map((function(n){var i,l,e,o;return(0,C.jsxs)("tr",{children:[(0,C.jsx)("td",{children:(0,C.jsx)("label",{children:(null===n||void 0===n||null===(i=n.socialmedia[0])||void 0===i?void 0:i.toUpperCase())+(null===n||void 0===n||null===(l=n.socialmedia)||void 0===l||null===(e=l.slice(1,null===n||void 0===n||null===(o=n.socialmedia)||void 0===o?void 0:o.length))||void 0===e?void 0:e.toLowerCase())})}),(0,C.jsx)("td",{children:(0,C.jsx)("input",{className:"".concat(null===n||void 0===n?void 0:n.socialmedia),ref:vn,defaultValue:null===n||void 0===n?void 0:n.profilelink})})]},null===n||void 0===n?void 0:n.id)}))),void 0===(null===R||void 0===R||null===(I=R.platforms)||void 0===I?void 0:I.platforms.find((function(n){return n.socialmedia===sn})))&&(0,C.jsxs)("tr",{children:[(0,C.jsxs)("td",{children:[" ",(0,C.jsx)("label",{children:"Facebook"})]}),(0,C.jsx)("td",{children:(0,C.jsx)("input",{ref:vn,className:"facebook"})})]}),void 0===(null===R||void 0===R||null===(D=R.platforms)||void 0===D?void 0:D.platforms.find((function(n){return n.socialmedia===un})))&&(0,C.jsxs)("tr",{children:[(0,C.jsxs)("td",{children:[" ",(0,C.jsx)("label",{children:"Instagram"})]}),(0,C.jsx)("td",{children:(0,C.jsx)("input",{ref:vn,className:"instagram"})})]}),void 0===(null===R||void 0===R||null===(A=R.platforms)||void 0===A?void 0:A.platforms.find((function(n){return n.socialmedia===rn})))&&(0,C.jsxs)("tr",{children:[(0,C.jsxs)("td",{children:[" ",(0,C.jsx)("label",{children:"Twitter"})]}),(0,C.jsx)("td",{children:(0,C.jsx)("input",{ref:vn,className:"twitter"})})]}),void 0===(null===R||void 0===R||null===(B=R.platforms)||void 0===B?void 0:B.platforms.find((function(n){return n.socialmedia===an})))&&(0,C.jsxs)("tr",{children:[(0,C.jsxs)("td",{children:[" ",(0,C.jsx)("label",{children:"Tiktok"})]}),(0,C.jsx)("td",{children:(0,C.jsx)("input",{ref:vn,className:"tiktok"})})]}),(0,C.jsxs)("tr",{children:[(0,C.jsx)("td",{children:(0,C.jsx)("button",{onClick:function(n){n.preventDefault(),pn()},children:"Save"})}),(0,C.jsx)("td",{children:(0,C.jsx)("button",{onClick:function(n){n.preventDefault(),ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showEditSocials:!1})}))},children:"Cancel"})})]})]})})}):(0,C.jsxs)("div",{className:"added-socials-in-icons",children:[(0,C.jsx)("div",{className:"heading",children:"Added Social Media"}),(0,C.jsxs)("div",{className:"icons",children:[void 0!==R&&void 0!==(null===R||void 0===R||null===(l=R.platforms)||void 0===l?void 0:l.platforms.find((function(n){return n.socialmedia===sn})))&&(0,C.jsx)("span",{children:(0,C.jsx)(b.Am9,{size:"20px"})}),void 0!==R&&void 0!==(null===R||void 0===R||null===(s=R.platforms)||void 0===s?void 0:s.platforms.find((function(n){return n.socialmedia===un})))&&(0,C.jsx)("span",{children:(0,C.jsx)(w.Vs6,{size:"20px"})}),void 0!==R&&void 0!==(null===R||void 0===R||null===(N=R.platforms)||void 0===N?void 0:N.platforms.find((function(n){return n.socialmedia===rn})))&&(0,C.jsx)("span",{children:(0,C.jsx)(Z.h3E,{size:"20px"})}),void 0!==R&&void 0!==(null===R||void 0===R||null===(y=R.platforms)||void 0===y?void 0:y.platforms.find((function(n){return n.socialmedia===an})))&&(0,C.jsx)("span",{children:(0,C.jsx)(j.nP8,{size:"20px"})})]}),(0,C.jsx)("div",{className:"btn-container",children:(0,C.jsx)("button",{onClick:function(n){n.preventDefault(),ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showEditSocials:!0})}))},children:"Edit"})})]})}),0!==(null===R||void 0===R?void 0:R.length)&&(0,C.jsxs)("section",{children:[(0,C.jsx)("div",{className:"feedback-container",style:J?{}:{backgroundColor:"transparent"},children:(0,C.jsx)("div",{className:"feeback",children:!(null!==nn&&void 0!==nn&&nn.showDeleteModal)&&J})}),null===W||null!==nn&&void 0!==nn&&nn.showEditBookings?(0,C.jsxs)("section",{className:"bookings",children:[(0,C.jsx)("div",{className:"heading",children:"Add booking info"}),(0,C.jsx)("form",{children:(0,C.jsx)("table",{children:(0,C.jsxs)("tbody",{children:[(0,C.jsxs)("tr",{children:[(0,C.jsx)("td",{children:(0,C.jsx)("label",{children:"Phone"})}),(0,C.jsx)("td",{children:(0,C.jsx)(m.ZP,{type:"text",value:tn,onChange:dn,defaultCountry:"GH",className:"phone",ref:fn})})]}),(0,C.jsxs)("tr",{children:[(0,C.jsx)("td",{children:(0,C.jsx)("label",{children:"Email"})}),(0,C.jsx)("td",{children:(0,C.jsx)("input",{type:"text",className:"email",ref:fn,defaultValue:null===W||void 0===W?void 0:W.email})})]}),(0,C.jsxs)("tr",{children:[(0,C.jsx)("td",{children:(0,C.jsx)("button",{onClick:function(n){n.preventDefault(),gn()},children:"Save"})}),(0,C.jsx)("td",{children:(0,C.jsx)("button",{onClick:function(n){n.preventDefault(),ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showEditBookings:!1})}))},children:"Cancel"})})]})]})})})]}):(0,C.jsxs)("section",{className:"bookings",children:[(0,C.jsx)("div",{className:"heading",children:"Bookings Info"}),(0,C.jsx)("div",{style:{textAlign:"center"},children:(0,C.jsx)(k.CoD,{size:"20px"})}),(0,C.jsx)("div",{style:{textAlign:"center"},children:null===W||void 0===W?void 0:W.phone}),(0,C.jsx)("div",{style:{textAlign:"center"},children:(0,C.jsx)(Z.Dme,{size:"20px"})}),(0,C.jsx)("div",{style:{textAlign:"center"},children:null===W||void 0===W?void 0:W.email}),(0,C.jsx)("div",{className:"btn-container",style:{textAlign:"center",marginTop:"10px"},children:(0,C.jsx)("button",{onClick:function(n){n.preventDefault(),ln((function(n){return(0,o.Z)((0,o.Z)({},n),{},{showEditBookings:!0})}))},children:"Edit"})})]})]}),!(null!==nn&&void 0!==nn&&nn.showloading)&&0===(null===R||void 0===R?void 0:R.length)&&0===(null===W||void 0===W?void 0:W.length)&&(0,C.jsx)("div",{style:{textAlign:"center"},children:"No results found"})]})]})}}}]);
//# sourceMappingURL=431.71323385.chunk.js.map