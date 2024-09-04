<template>
  <LoadingOverlay v-model:active="loadingStatus" :is-full-page="true"></LoadingOverlay>
  <div class="container mt-3">
    <div class="row align-items-center">
      <div class="col-lg-7">
        <swiper class="detailSwiper2" :style="{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }" :loop="true" :spaceBetween="10" :navigation="true" :thumbs="{ swiper: thumbsSwiper  }" :modules="modules"
          >
          <swiper-slide><img :src="product.imageUrl"/></swiper-slide>
          <swiper-slide v-for=" (item, index) in product.imagesUrl" :key="index"><img :src="item" /></swiper-slide>
        </swiper>
        <swiper class="detailSwiper" @swiper="setThumbsSwiper" :loop="true" :spaceBetween="10" :slidesPerView="3" :freeMode="true"
          :watchSlidesProgress="true" :modules="modules">
          <swiper-slide class="swiper-slide2"><img :src="product.imageUrl"/></swiper-slide>
          <swiper-slide class="swiper-slide2" v-for=" (item, index) in product.imagesUrl" :key="index"><img :src="item" /></swiper-slide>
        </swiper>
      </div>
      <div class="col-lg-5">
        <h2 class="fw-bold h1 mb-1 product-title">{{ product.title }}</h2>
        <p class="mb-0 text-muted text-end"><del>NT$ {{ $filters.currency(product.origin_price)}}</del></p>
        <p class="h4 fw-bold text-end">NT$ {{ $filters.currency(product.price)}}</p>
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="input-group my-3 bg-light rounded">
              <div class="input-group-prepend">
                <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1" @click="decreaseQty">
                  <i class="fas fa-minus"></i>
                </button>
              </div>
              <input type="number" class="form-control border-0 text-center my-auto shadow-none bg-light" placeholder=""
              aria-label="Example text with button addon" aria-describedby="button-addon1" v-model.number="qty"
              @input="validateQty">
              <div class="input-group-append">
                <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2" @click="increaseQty">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <button type="btn" class="text-nowrap btn btn-dark w-100 py-2" :disabled="loadingIcon === product.id"
              @click.prevent="addToCart(product.id, qty)">{{ $t('common.buyNow') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-5">
      <div class="col-lg-5">
        <p v-html="product.description"></p>
      </div>
      <div class="col-lg-5">
        <p class="text-muted">
          {{ $t('productDetailPage.regulations') }}<br>
          {{ $t('productDetailPage.regulation1') }}<br>
          {{ $t('productDetailPage.regulation2') }}<br>
          {{ $t('productDetailPage.regulation3') }}<br>
        </p>
      </div>
      <div class="col-md-2">
        <button type="button" class="return-btn btn btn-outline-secondary" @click="goBack">{{ $t('productDetailPage.back') }}</button>
      </div>
    </div>
  </div>
</template>

<script scope>
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import productStore from '@/stores/productsStore.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css' // 引入 Swiper 的樣式
import { Navigation, Pagination, Autoplay, EffectFade, Thumbs } from 'swiper/modules'
import { watchEffect } from 'vue'
import { mapActions, mapState } from 'pinia'

export default {
  data () {
    return {
      loop: true,
      thumbsSwiper: null,
      modules: [Navigation, Pagination, Autoplay, EffectFade, Thumbs]
    }
  },
  computed: {
    ...mapState(productStore, ['product', 'loadingStatus', 'loadingIcon', 'pageBack']),
    qty: {
      get () {
        return productStore().qty
      },
      set (newQty) {
        productStore().qty = newQty
      }
    }
  },
  components: { LoadingOverlay, Swiper, SwiperSlide },
  methods: {
    ...mapActions(productStore, ['getDetail', 'validateQty']),
    increaseQty () {
      this.validateQty()
      this.qty += 1
    },
    decreaseQty () {
      if (this.qty > 1) {
        this.qty -= 1
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    setThumbsSwiper (swiper) {
      this.thumbsSwiper = swiper
    },
    addToCart (id, qty) {
      productStore().addToCart(id, qty)
        .then(res => {
          this.$swal.fire({
            title: this.$t('productDetailPage.addedToCart'),
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
            customClass: {
              title: 'swal-title'
            }
          })
        })
    }
  },
  mounted () {
    this.getDetail(this.$route.params.id)
      .catch(() => {
        this.$swal.fire({
          icon: 'error',
          title: this.$t('productDetailPage.noContent'),
          customClass: {
            title: 'swal-title'
          }
        })
      })
    watchEffect(() => {
      if (this.pageBack) {
        this.$router.go(-1)
      }
    })
  }
}
</script>

<style scoped>
/* Swiper */
.detailSwiper2, .detailSwiper {
  max-width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.detailSwiper2 img, .detailSwiper img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detailSwiper2 {
  height: 70vh;
}

.detailSwiper {
  height: 15vh;
  box-sizing: border-box;
  padding: 10px 0;
}

.detailSwiper .swiper-slide2 {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.detailSwiper .swiper-slide-thumb-active {
  opacity: 1;
}
/* Swiper */
.return-btn{
    display: block;
    margin: 10px auto;
    width: 100%; /* 根据需要调整宽度 */
    height: auto; /* 根据需要调整高度 */
  }

@media (max-width: 1000px) {
  .product-title {
    font-size: 34px;
  }
}
@media (max-width: 767px) {
  .product-title {
    margin-top: 10px;
  }
  .return-btn{
    display: block;
    margin: 10px auto;
    width: 50%; /* 根据需要调整宽度 */
    height: auto; /* 根据需要调整高度 */
  }
}

</style>
