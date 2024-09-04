import{p as c}from"./productsStore-BMDEfdlW.js";import{_ as C,o,c as r,a as e,n as P,i as h,F as g,j as b,t as i,m as S,k as T,r as _,b as p,h as O,l as N,w as m,e as k,q as B,d as $,p as D,f as L}from"./index-BzxHaZdx.js";import{L as E}from"./LoadingOverlay-DCSfDU47.js";import{A as I}from"./aos-DkQ8pS_b.js";import"./cartStore-BdgHitej.js";import"./drone_logo3-B-egRVc4.js";const q={props:["pages","currentCategory"],data(){return{}},methods:{emitPages(t){const s=this.currentCategory||"";c().loadingStatus=!0,this.$emit("emit-pages",s,t),window.scrollTo(0,500)}}},V={"aria-label":"Page navigation example"},j={class:"pagination"},M=e("span",{"aria-hidden":"true"},"«",-1),z=[M],A={key:0,class:"page-link"},U=["onClick"],F=e("span",{"aria-hidden":"true"},"»",-1),R=[F];function G(t,s,n,x,w,d){return o(),r("nav",V,[e("ul",j,[e("li",{class:P(["page-item",{disabled:n.pages.current_page===1}])},[e("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:s[0]||(s[0]=h(l=>d.emitPages(n.pages.current_page-1),["prevent"]))},z)],2),(o(!0),r(g,null,b(n.pages.total_pages,(l,u)=>(o(),r("li",{class:"page-item",key:u},[l===n.pages.current_page?(o(),r("span",A,i(l),1)):(o(),r("a",{key:1,class:"page-link",href:"#",onClick:h(y=>d.emitPages(l),["prevent"])},i(l),9,U))]))),128)),e("li",{class:P(["page-item",{disabled:n.pages.current_page===n.pages.total_pages}])},[e("a",{class:"page-link",href:"#","aria-label":"Next",onClick:s[1]||(s[1]=h(l=>d.emitPages(n.pages.current_page+1),["prevent"]))},R)],2)])])}const H=C(q,[["render",G]]);I.init({disable:!1,startEvent:"DOMContentLoaded",initClassName:"aos-init",animatedClassName:"aos-animate",useClassNames:!1,disableMutationObserver:!1,debounceDelay:50,throttleDelay:99,offset:120,delay:0,duration:400,easing:"ease",once:!1,mirror:!1,anchorPlacement:"top-bottom"});const J={computed:{...S(c,["products","pagination","loadingStatus","loadingIcon","category","currentCategory","currentPage"]),searchText:{get(){return c().searchText},set(t){c().searchText=t}},searchPlaceholder(){return this.$t("productPage.search")}},components:{PaginationBar:H,LoadingOverlay:E},methods:{...T(c,["renderProducts","addToCart","search"]),viewDetail(t){this.products.find(n=>n.id===t)&&this.$router.push(`products/${t}`)},changePage(t,s){this.$router.push({path:"/products",query:{category:t||"",page:s||1}})},resetSearch(){c().searchText="",c().loadingStatus=!0,this.renderProducts("",1)}},mounted(){this.renderProducts(this.currentCategory,this.currentPage)},watch:{"$route.query":{handler(){if(this.$route.query.category===void 0)return;c().searchText="",c().loadingStatus=!0;const{category:t,page:s}=this.$route.query;this.renderProducts(t,s)},deep:!0}}},v=t=>(D("data-v-0011aab9"),t=t(),L(),t),K={class:"position-relative d-flex align-items-center justify-content-center",style:{"min-height":"400px"}},Q=v(()=>e("div",{class:"position-absolute banner",style:{"z-index":"-1",top:"0",bottom:"0",left:"0",right:"0","background-position":"center calc(25%)",opacity:"0.5","background-size":"cover"}},[e("video",{autoplay:"",loop:"",muted:"",playsinline:"",title:"",class:"slide-grid-content"},[e("source",{src:"https://videos.pexels.com/video-files/3577871/3577871-hd_1920_1080_25fps.mp4",type:"video/mp4; codecs=avc1.4D401E, mp4a.40.2"})])],-1)),W={class:"fw-bold text-muted"},X={class:"container mt-md-5 mt-3 mb-7"},Y={class:"row"},Z={class:"col-md-2"},ee={class:"accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3",id:"accordionExample"},te={class:"input-group w-100 mt-md-0 my-3"},se=["placeholder"],ae={class:"card border-0"},oe={class:"card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0",id:"headingOne","data-bs-toggle":"collapse","data-bs-target":"#collapseOne"},re={class:"d-flex justify-content-between align-items-center pe-1",style:{cursor:"pointer"}},ne={class:"mb-0"},de=v(()=>e("i",{class:"fas fa-chevron-down rotate-icon","data-bs-toggle":"collapse","data-bs-target":"#collapseOne"},null,-1)),ie={id:"collapseOne",class:"collapse show","aria-labelledby":"headingOne","data-bs-parent":"#accordionExample"},ce={class:"card-body py-0"},le={class:"list-unstyled"},ue={class:"col-md-10"},pe={class:"row"},ge={key:0},he={class:"text-center"},_e={class:"card border-0 mb-4 position-relative bg-light"},me={class:"card-img"},be=["src"],ve={class:"card-body p-0 text-center","data-aos":"fade-up"},ye={class:"mb-0 mt-3"},fe=["onClick"],Pe={class:"text-muted"},ke={class:"card-text mt-2 mb-0"},$e=v(()=>e("p",{class:"text-muted mt-3"},null,-1)),Ce={class:"d-flex justify-content-center"};function xe(t,s,n,x,w,d){const l=_("LoadingOverlay"),u=_("RouterLink"),y=_("PaginationBar");return o(),r(g,null,[p(l,{active:t.loadingStatus,"onUpdate:active":s[0]||(s[0]=a=>t.loadingStatus=a),"is-full-page":!0},null,8,["active"]),e("div",K,[Q,e("h2",W,i(t.$t("productPage.vision")),1)]),e("div",X,[e("div",Y,[e("div",Z,[e("div",ee,[e("div",te,[O(e("input",{type:"text",class:"form-control rounded-0 searchBar",style:{height:"45px"},placeholder:d.searchPlaceholder,onInput:s[1]||(s[1]=a=>t.search()),"onUpdate:modelValue":s[2]||(s[2]=a=>d.searchText=a)},null,40,se),[[N,d.searchText]])]),e("h4",null,[p(u,{class:"py-2 d-block text-muted",to:"/products",onClick:d.resetSearch},{default:m(()=>[$(i(t.$t("productPage.allProducts")),1)]),_:1},8,["onClick"])]),e("div",ae,[e("div",oe,[e("div",re,[e("h4",ne,i(t.$t("productPage.expand")),1),de])]),e("div",ie,[e("div",ce,[e("ul",le,[(o(!0),r(g,null,b(t.category,(a,f)=>(o(),r("li",{key:f},[p(u,{class:"py-2 d-block text-muted",to:`/products?category=${a}`},{default:m(()=>[$(i(a),1)]),_:2},1032,["to"])]))),128))])])])])])]),e("div",ue,[e("div",pe,[t.products.length===0?(o(),r("div",ge,[e("h2",he,i(t.$t("productPage.noContent")),1)])):k("",!0),(o(!0),r(g,null,b(t.products,a=>(o(),r("div",{class:"col-md-6",key:a.id},[e("div",_e,[p(u,{to:`products/${a.id}`},{default:m(()=>[e("div",me,[e("img",{src:`${a.imageUrl}`,class:"card-img-top rounded-2",alt:"...","data-aos":"fade-up"},null,8,be)])]),_:2},1032,["to"]),e("div",ve,[e("h4",ye,[e("button",{type:"button",class:"btn btn-outline-dark fw-bold",onClick:f=>d.viewDetail(a.id)},i(a.title),9,fe)]),e("span",Pe,[e("del",null,"NT$ "+i(t.$filters.currency(a.origin_price)),1)]),e("h5",ke," NT$ "+i(t.$filters.currency(a.price)),1),$e])])]))),128))]),e("nav",Ce,[t.products.length!==0?(o(),B(y,{key:0,pages:t.pagination,onEmitPages:d.changePage,"current-Category":t.currentCategory},null,8,["pages","onEmitPages","current-Category"])):k("",!0)])])])])],64)}const De=C(J,[["render",xe],["__scopeId","data-v-0011aab9"]]);export{De as default};
