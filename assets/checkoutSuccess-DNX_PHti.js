import{c as n}from"./cartStore-CsfVgYjW.js";import{_ as d,m as l,r as u,o as p,c as m,a as e,t as s,d as i,b as h,w as f}from"./index-pTJ58GTf.js";const _={computed:{...l(n,["order"])},methods:{copyOrderId(){const t=this.$t("checkoutSuccess.orderCopied"),o=this.$t("checkoutSuccess.copyFailed");navigator.clipboard.writeText(this.order.orderId).then(()=>{this.$swal.fire({icon:"success",title:t,text:"",showConfirmButton:!1,timer:1e3,customClass:{title:"swal-title"}})}).catch(()=>{this.$swal.fire({icon:"error",title:o})})}},mounted(){}},v={class:"position-relative d-flex"},k={class:"container d-flex flex-column",style:{"min-height":"100vh"}},y={class:"row my-auto pb-7 justify-content-center"},b={class:"col-md-8 d-flex flex-column"},x={class:"my-auto text-center"},w={class:"fs-20"},$={class:"text-center"},S=e("div",{class:"w-100 h-100 position-absolute",style:{"z-index":"-1",top:"0",left:"0","background-size":"cover","background-position":"center center",opacity:"0.8"}},[e("video",{autoplay:"",loop:"",muted:"",playsinline:"",title:"",class:"w-100 h-100 object-fit-cover"},[e("source",{src:"https://videos.pexels.com/video-files/3643613/3643613-hd_1920_1080_24fps.mp4",type:"video/mp4; codecs=avc1.4D401E, mp4a.40.2"})])],-1);function g(t,o,C,I,B,c){const r=u("RouterLink");return p(),m("div",v,[e("div",k,[e("div",y,[e("div",b,[e("div",x,[e("h2",null,s(t.$t("checkoutSuccess.success")),1),e("div",null,[i(s(t.$t("checkoutSuccess.emailMessage"))+" ",1),e("span",w,s(t.order.orderId),1),e("button",{onClick:o[0]||(o[0]=(...a)=>c.copyOrderId&&c.copyOrderId(...a)),class:"btn btn-sm btn-outline-dark ms-2"},s(t.$t("checkoutSuccess.copy")),1)]),e("div",$,[h(r,{to:"/",class:"btn btn-outline-dark rounded-1 mt-4 px-5"},{default:f(()=>[i(s(t.$t("common.backToHome")),1)]),_:1})])])])])]),S])}const O=d(_,[["render",g]]);export{O as default};
