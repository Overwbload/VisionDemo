import{L as q}from"./LoadingOverlay-CyvWjPIX.js";import{p as v}from"./productsStore--OmSJxwq.js";import{g as B,i as V,e as Q,P as $,S as M,a as N}from"./pagination-fak68dQR.js";import{N as j,A as U,E as F}from"./effect-fade-B3VsJ1cQ.js";import{_ as H,m as z,k as G,y as J,r as P,o as y,c as x,b as _,a as i,w as b,t as p,h as K,l as R,i as W,d as T,F as A,j as L,q as D,p as X,f as Y}from"./index-BvKnXx66.js";import"./drone_logo3-B-egRVc4.js";import"./cartStore-Ddl3m-5j.js";function Z(r){let{swiper:e,extendParams:C,on:g}=r;C({thumbs:{swiper:null,multipleActiveThumbs:!0,autoScrollOffset:0,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-thumbs"}});let h=!1,o=!1;e.thumbs={swiper:null};function k(){const t=e.thumbs.swiper;if(!t||t.destroyed)return;const s=t.clickedIndex,a=t.clickedSlide;if(a&&a.classList.contains(e.params.thumbs.slideThumbActiveClass)||typeof s>"u"||s===null)return;let l;t.params.loop?l=parseInt(t.clickedSlide.getAttribute("data-swiper-slide-index"),10):l=s,e.params.loop?e.slideToLoop(l):e.slideTo(l)}function c(){const{thumbs:t}=e.params;if(h)return!1;h=!0;const s=e.constructor;if(t.swiper instanceof s)e.thumbs.swiper=t.swiper,Object.assign(e.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),Object.assign(e.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1}),e.thumbs.swiper.update();else if(V(t.swiper)){const a=Object.assign({},t.swiper);Object.assign(a,{watchSlidesProgress:!0,slideToClickedSlide:!1}),e.thumbs.swiper=new s(a),o=!0}return e.thumbs.swiper.el.classList.add(e.params.thumbs.thumbsContainerClass),e.thumbs.swiper.on("tap",k),!0}function m(t){const s=e.thumbs.swiper;if(!s||s.destroyed)return;const a=s.params.slidesPerView==="auto"?s.slidesPerViewDynamic():s.params.slidesPerView;let l=1;const u=e.params.thumbs.slideThumbActiveClass;if(e.params.slidesPerView>1&&!e.params.centeredSlides&&(l=e.params.slidesPerView),e.params.thumbs.multipleActiveThumbs||(l=1),l=Math.floor(l),s.slides.forEach(d=>d.classList.remove(u)),s.params.loop||s.params.virtual&&s.params.virtual.enabled)for(let d=0;d<l;d+=1)Q(s.slidesEl,`[data-swiper-slide-index="${e.realIndex+d}"]`).forEach(n=>{n.classList.add(u)});else for(let d=0;d<l;d+=1)s.slides[e.realIndex+d]&&s.slides[e.realIndex+d].classList.add(u);const f=e.params.thumbs.autoScrollOffset,S=f&&!s.params.loop;if(e.realIndex!==s.realIndex||S){const d=s.activeIndex;let n,I;if(s.params.loop){const E=s.slides.filter(O=>O.getAttribute("data-swiper-slide-index")===`${e.realIndex}`)[0];n=s.slides.indexOf(E),I=e.activeIndex>e.previousIndex?"next":"prev"}else n=e.realIndex,I=n>e.previousIndex?"next":"prev";S&&(n+=I==="next"?f:-1*f),s.visibleSlidesIndexes&&s.visibleSlidesIndexes.indexOf(n)<0&&(s.params.centeredSlides?n>d?n=n-Math.floor(a/2)+1:n=n+Math.floor(a/2)-1:n>d&&s.params.slidesPerGroup,s.slideTo(n,t?0:void 0))}}g("beforeInit",()=>{const{thumbs:t}=e.params;if(!(!t||!t.swiper))if(typeof t.swiper=="string"||t.swiper instanceof HTMLElement){const s=B(),a=()=>{const u=typeof t.swiper=="string"?s.querySelector(t.swiper):t.swiper;if(u&&u.swiper)t.swiper=u.swiper,c(),m(!0);else if(u){const f=S=>{t.swiper=S.detail[0],u.removeEventListener("init",f),c(),m(!0),t.swiper.update(),e.update()};u.addEventListener("init",f)}return u},l=()=>{if(e.destroyed)return;a()||requestAnimationFrame(l)};requestAnimationFrame(l)}else c(),m(!0)}),g("slideChange update resize observerUpdate",()=>{m()}),g("setTransition",(t,s)=>{const a=e.thumbs.swiper;!a||a.destroyed||a.setTransition(s)}),g("beforeDestroy",()=>{const t=e.thumbs.swiper;!t||t.destroyed||o&&t.destroy()}),Object.assign(e.thumbs,{init:c,update:m})}const ee={data(){return{loop:!0,thumbsSwiper:null,modules:[j,$,U,F,Z]}},computed:{...z(v,["product","loadingStatus","loadingIcon","pageBack"]),qty:{get(){return v().qty},set(r){v().qty=r}}},components:{LoadingOverlay:q,Swiper:M,SwiperSlide:N},methods:{...G(v,["getDetail","validateQty"]),increaseQty(){this.validateQty(),this.qty+=1},decreaseQty(){this.qty>1&&(this.qty-=1)},goBack(){this.$router.go(-1)},setThumbsSwiper(r){this.thumbsSwiper=r},addToCart(r,e){v().addToCart(r,e).then(C=>{this.$swal.fire({title:this.$t("productDetailPage.addedToCart"),icon:"success",showConfirmButton:!1,timer:1e3,customClass:{title:"swal-title"}})})}},mounted(){this.getDetail(this.$route.params.id).catch(()=>{this.$swal.fire({icon:"error",title:this.$t("productDetailPage.noContent"),customClass:{title:"swal-title"}})}),J(()=>{this.pageBack&&this.$router.go(-1)})}},w=r=>(X("data-v-cd2a9dc0"),r=r(),Y(),r),te={class:"container mt-3"},se={class:"row align-items-center"},ie={class:"col-lg-7"},re=["src"],oe=["src"],ae=["src"],le=["src"],ne={class:"col-lg-5"},de={class:"fw-bold h1 mb-1 product-title"},ue={class:"mb-0 text-muted text-end"},ce={class:"h4 fw-bold text-end"},pe={class:"row align-items-center"},me={class:"col-md-6"},he={class:"input-group my-3 bg-light rounded"},fe={class:"input-group-prepend"},be=w(()=>i("i",{class:"fas fa-minus"},null,-1)),we=[be],ge={class:"input-group-append"},ve=w(()=>i("i",{class:"fas fa-plus"},null,-1)),ye=[ve],_e={class:"col-md-6"},Se={class:"row my-5"},Te={class:"col-lg-5"},Ce=["innerHTML"],ke={class:"col-lg-5"},Ie={class:"text-muted"},Pe=w(()=>i("br",null,null,-1)),xe=w(()=>i("br",null,null,-1)),Ae=w(()=>i("br",null,null,-1)),Le=w(()=>i("br",null,null,-1)),De={class:"col-md-2"};function Ee(r,e,C,g,h,o){const k=P("LoadingOverlay"),c=P("swiper-slide"),m=P("swiper");return y(),x(A,null,[_(k,{active:r.loadingStatus,"onUpdate:active":e[0]||(e[0]=t=>r.loadingStatus=t),"is-full-page":!0},null,8,["active"]),i("div",te,[i("div",se,[i("div",ie,[_(m,{class:"detailSwiper2",style:{"--swiper-navigation-color":"#fff","--swiper-pagination-color":"#fff"},loop:!0,spaceBetween:10,navigation:!0,thumbs:{swiper:h.thumbsSwiper},modules:h.modules},{default:b(()=>[_(c,null,{default:b(()=>[i("img",{src:r.product.imageUrl},null,8,re)]),_:1}),(y(!0),x(A,null,L(r.product.imagesUrl,(t,s)=>(y(),D(c,{key:s},{default:b(()=>[i("img",{src:t},null,8,oe)]),_:2},1024))),128))]),_:1},8,["thumbs","modules"]),_(m,{class:"detailSwiper",onSwiper:o.setThumbsSwiper,loop:!0,spaceBetween:10,slidesPerView:3,freeMode:!0,watchSlidesProgress:!0,modules:h.modules},{default:b(()=>[_(c,{class:"swiper-slide2"},{default:b(()=>[i("img",{src:r.product.imageUrl},null,8,ae)]),_:1}),(y(!0),x(A,null,L(r.product.imagesUrl,(t,s)=>(y(),D(c,{class:"swiper-slide2",key:s},{default:b(()=>[i("img",{src:t},null,8,le)]),_:2},1024))),128))]),_:1},8,["onSwiper","modules"])]),i("div",ne,[i("h2",de,p(r.product.title),1),i("p",ue,[i("del",null,"NT$ "+p(r.$filters.currency(r.product.origin_price)),1)]),i("p",ce,"NT$ "+p(r.$filters.currency(r.product.price)),1),i("div",pe,[i("div",me,[i("div",he,[i("div",fe,[i("button",{class:"btn btn-outline-dark border-0 py-2",type:"button",id:"button-addon1",onClick:e[1]||(e[1]=(...t)=>o.decreaseQty&&o.decreaseQty(...t))},we)]),K(i("input",{type:"number",class:"form-control border-0 text-center my-auto shadow-none bg-light",placeholder:"","aria-label":"Example text with button addon","aria-describedby":"button-addon1","onUpdate:modelValue":e[2]||(e[2]=t=>o.qty=t),onInput:e[3]||(e[3]=(...t)=>r.validateQty&&r.validateQty(...t))},null,544),[[R,o.qty,void 0,{number:!0}]]),i("div",ge,[i("button",{class:"btn btn-outline-dark border-0 py-2",type:"button",id:"button-addon2",onClick:e[4]||(e[4]=(...t)=>o.increaseQty&&o.increaseQty(...t))},ye)])])]),i("div",_e,[i("a",{class:"text-nowrap btn btn-dark w-100 py-2",onClick:e[5]||(e[5]=W(t=>o.addToCart(r.product.id,o.qty),["prevent"]))},p(r.$t("common.buyNow")),1)])])])]),i("div",Se,[i("div",Te,[i("p",{innerHTML:r.product.description},null,8,Ce)]),i("div",ke,[i("p",Ie,[T(p(r.$t("productDetailPage.regulations")),1),Pe,T(" "+p(r.$t("productDetailPage.regulation1")),1),xe,T(" "+p(r.$t("productDetailPage.regulation2")),1),Ae,T(" "+p(r.$t("productDetailPage.regulation3")),1),Le])]),i("div",De,[i("button",{type:"button",class:"return-btn btn btn-outline-secondary",onClick:e[6]||(e[6]=(...t)=>o.goBack&&o.goBack(...t))},p(r.$t("productDetailPage.back")),1)])])])],64)}const Ne=H(ee,[["render",Ee],["__scopeId","data-v-cd2a9dc0"]]);export{Ne as default};
