<template>
  <LoadingOverlay v-model:active="loadingStatus" :is-full-page="true"></LoadingOverlay>
  <div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 400px;">
    <div class="position-absolute banner" style="z-index: -1; top: 0; bottom: 0; left: 0; right: 0; background-position: center calc(25%);
      opacity: 0.5; background-size: cover;">
      <video autoplay loop muted playsinline title="" class="slide-grid-content">
        <source src="https://videos.pexels.com/video-files/3577871/3577871-hd_1920_1080_25fps.mp4"
          type="video/mp4; codecs=avc1.4D401E, mp4a.40.2">
      </video>
    </div>
    <h2 class="fw-bold text-muted">{{ $t('productPage.vision') }}</h2>
  </div>
  <div class="container mt-md-5 mt-3 mb-7">
    <div class="row">
      <div class="col-md-2">
        <div class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
          <div class="input-group w-100 mt-md-0 my-3">
            <input type="text" class="form-control rounded-0 searchBar" style="height: 45px;" :placeholder="searchPlaceholder" @input="search()" v-model="searchText"/>
          </div>
          <h4><RouterLink class="py-2 d-block text-muted" to="/products" @click="resetSearch">{{ $t('productPage.allProducts') }}</RouterLink></h4>
          <div class="card border-0">
            <div class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              <div class="d-flex justify-content-between align-items-center pe-1" style="cursor: pointer;">
                <h4 class="mb-0">
                  {{ $t('productPage.expand') }}
                </h4>
                <i class="fas fa-chevron-down rotate-icon" data-bs-toggle="collapse" data-bs-target="#collapseOne"></i>
              </div>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li v-for="(item, index) in category" :key="index">
                    <RouterLink class="py-2 d-block text-muted" :to="`/products?category=${item}`">{{ item }}</RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-10">
        <div class="row">
          <div v-if="products.length === 0"><h2 class="text-center">{{ $t('productPage.noContent') }}</h2></div>
          <div class="col-md-6" v-for="item in products" :key="item.id">
            <div class="card border-0 mb-4 position-relative bg-light">
              <RouterLink :to="`products/${item.id}`">
                <div class="card-img">
                  <img :src="`${item.imageUrl}`" class="card-img-top rounded-2"  alt="..." data-aos="fade-up">
                </div>
              </RouterLink>
              <div class="card-body p-0 text-center" data-aos="fade-up">
                <h4 class="mb-0 mt-3">
                  <button type="button" class="btn btn-outline-dark fw-bold" @click="viewDetail(item.id)">
                  {{ item.title }}
                  </button>
                </h4>
                <span class="text-muted "><del>NT$ {{ $filters.currency(item.origin_price)}}</del></span>
                <h5 class="card-text mt-2 mb-0"> NT$ {{ $filters.currency(item.price)}}</h5>
                <p class="text-muted mt-3"></p>
              </div>
            </div>
          </div>
        </div>
        <nav class="d-flex justify-content-center">
          <PaginationBar v-if="products.length !== 0 " :pages="pagination" @emit-pages="changePage" :current-Category="currentCategory"></PaginationBar>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import PaginationBar from '@/components/userProductList/PaginationBar.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import productStore from '@/stores/productsStore'
import { mapActions, mapState } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation
})
export default {
  computed: {
    ...mapState(productStore, ['products', 'pagination', 'loadingStatus', 'loadingIcon', 'category', 'currentCategory', 'currentPage']),
    searchText: {
      get () {
        return productStore().searchText
      },
      set (newText) {
        productStore().searchText = newText
      }
    },
    searchPlaceholder () {
      return this.$t('productPage.search')
    }
  },
  components: { PaginationBar, LoadingOverlay },
  methods: {
    ...mapActions(productStore, ['renderProducts', 'addToCart', 'search']),
    viewDetail (id) { // 查看更多
      const existingProduct = this.products.find(item => item.id === id)
      if (existingProduct) {
        this.$router.push(`products/${id}`)
      }
    },
    changePage (category, page) {
      this.$router.push({
        path: '/products',
        query: {
          category: category || '',
          page: page || 1
        }
      })
    },
    resetSearch () {
      productStore().searchText = ''
      productStore().loadingStatus = true
      this.renderProducts('', 1)
    }
  },
  mounted () {
    this.renderProducts(this.currentCategory, this.currentPage) // 取得商品資料
  },
  watch: {
    '$route.query': {
      handler () {
        if (this.$route.query.category === undefined) {
          return
        }
        productStore().searchText = ''
        productStore().loadingStatus = true
        const { category, page } = this.$route.query
        this.renderProducts(category, page)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
/* card */
.card-img {
  overflow: hidden;
}
.card-img-top {
  display: block;
  max-width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}
.card-img:hover .card-img-top {
  transform: scale(1.25);
}
.card a {
  text-decoration: none;
  color: black;
}
/* card */
/* accordion */
.accordion ul li a,
.accordion h4 a {
  text-decoration: none;
}
.rotate-icon {
  transition: transform 0.3s ease;
}
.rotate-icon[aria-expanded="true"] {
  transform: rotate(0deg); /* 默认向下 */
}
.rotate-icon[aria-expanded="false"] {
  transform: rotate(180deg); /* 向上旋转 */
}
/* accordion */
.slide-grid-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 767px) {
  .searchBar {
    height: 50px !important;
  }
}

</style>
