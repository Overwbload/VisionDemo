<template>
  <LoadingOverlay v-model:active="loadingStatus" :is-full-page="true"></LoadingOverlay>
  <div class="container">
    <div class="mt-3">
      <h3 class="mt-3 mb-4">{{ $t('cart.title') }}</h3>
      <div v-if="cart.carts.length === 0" class="alert alert-secondary text-center m-5">{{ $t('cart.empty') }}</div>
      <div class="row" v-else>
        <div class="col-lg-8">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="border-0 ps-0" width="35%">{{ $t('cart.name') }}</th>
                <th scope="col" class="border-0 text-center" width="20%">{{ $t('cart.quantity') }}</th>
                <th scope="col" class="border-0" width="25%">{{ $t('cart.price') }}</th>
                <th scope="col" class="border-0" width="15%">
                  <div>
                    <button class="btn p-0 border-0 delAll" type="button" @click="delAll"
                      :disabled="loadingIcon !== '' || cart.carts.length === 0">{{ $t('cart.clearCart') }}
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody v-if="cart.carts">
              <tr class="border-bottom border-top" v-for="item in cart.carts" :key="item.id">
                <th scope="row" class="border-0 px-0 font-weight-normal py-4">
                  <img :src="item.product.imageUrl" alt="" style="width: 72px; height: 72px; object-fit: cover;">
                  <div class="mb-0 fw-bold ms-3 d-inline-block product-title" style="font-size: 20px">
                    {{ item.product.title }}
                    <div class="text-success fs-14 coupon-title" v-if="item.coupon">
                      {{ $t('cart.couponApplied') }}-{{ item.coupon.title }}
                    </div>
                  </div>
                </th>
                <td class="border-0 align-middle ">
                  <div class="input-group ">
                    <div class="input-group-prepend">
                      <button class="btn btn-outline-dark border-0 py-2 m-none " type="button" id="button-addon1"
                        @click="decreaseQty(item)" :disabled="loadingIcon !== ''">
                        <i class="fas fa-minus"></i>
                      </button>
                    </div>
                    <input type="number" class="form-control border-0 text-center my-auto shadow-none" placeholder=""
                    aria-label="Example text with button addon" aria-describedby="button-addon1" value="1"
                    v-model.number="item.qty" :disabled="loadingIcon === item.id" @blur="updateQty(item)">
                    <div class="input-group-append">
                      <button class="btn btn-outline-dark border-0 py-2 m-none " type="button" id="button-addon2"
                      @click="increaseQty(item)" :disabled="loadingIcon !== ''">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </td>
                <td class="border-0 align-middle coupon-price" v-if="item.coupon">
                  <small class="text-success">{{ $t('cart.discountPrice') }}：</small>
                  <p class="mb-0 ms-auto">
                    NT$ {{ $filters.currency(item.final_total) }}
                  </p>
                </td>
                <td class="border-0 align-middle " v-else>
                  <p class="mb-0 ms-auto">NT$ {{ $filters.currency(item.product.price) }}</p>
                </td>
                <td class="border-0 align-middle">
                  <button type="button" class="btn ms-2 " @click="delProduct(item.id)" :disabled="loadingIcon === item.id">
                    <i class="fas fa-times" :disabled="loadingIcon === item.id"></i>
                    <i class="fas fa-spinner fa-pulse ms-2 loadingIcon" v-if="loadingIcon === item.id"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="input-group mb-3 w-50 couponInput">
            <input type="text" class="form-control rounded-0 border-bottom border-top-0 border-start-0
            border-end-0 shadow-none" :placeholder="enterCoupon" aria-label="Recipient's username"
            aria-describedby="button-addon2" v-model="coupon_code">
            <div class="input-group-append">
              <button class="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0
                rounded-0" type="button" id="button-addon2" @click="addCouponCode">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="border p-4 mb-4 bg-light">
            <h4 class="fw-bold mb-4">{{ $t('cart.orderDetails') }}</h4>
            <table class="table text-muted border-bottom">
              <tbody>
                <tr>
                  <th scope="row" class="border-0 px-0 pt-4 font-weight-normal bg-light">{{ $t('common.subtotal') }}</th>
                  <td class="text-end border-0 px-0 pt-4 bg-light">NT$ {{ $filters.currency(cart.total) }}</td>
                </tr>
                <tr>
                  <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal bg-light">{{ $t('cart.paymentMethod') }}</th>
                  <td class="text-end border-0 px-0 pt-0 pb-4 bg-light">ApplePay</td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-between mt-4">
              <p class="mb-0 h4 fw-bold">{{ $t('common.total') }}</p>
              <p class="mb-0 h4 fw-bold">NT$ {{ $filters.currency(cart.total) }}</p>
            </div>
            <div class="d-flex justify-content-between mt-4" v-if="cart.total !== cart.final_total">
              <p class="mb-0 h4 fw-bold text-success">{{ $t('common.discountPrice') }}</p>
              <p class="mb-0 h4 fw-bold text-success">NT$ {{ $filters.currency(cart.final_total) }}</p>
            </div>
            <RouterLink to="/checkOut" class="btn btn-dark w-100 mt-4">{{ $t('cart.checkout') }}</RouterLink>
          </div>
        </div>
      </div>
      <hr class="mt-5">
      <div>
        <h4>{{ $t('cart.moreRecommendations') }}</h4>
        <swiper class="cartSwiper my-4" :style="{
            '--swiper-pagination-color': '#fff',
          }"
          :slidesPerView="3"
          :spaceBetween="20"
          :freeMode="true"
          :pagination="{
            clickable: true,
          }"
          :modules="modules">
          <swiper-slide class="cartSwiper-slide row" v-for="(item, index) in recommend" :key=index>
            <RouterLink :to="`products/${item.id}`">
              <img :src="item.imageUrl" alt="">
            </RouterLink>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import cartStore from '@/stores/cartStore'
import { mapActions, mapState } from 'pinia'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode, Pagination } from 'swiper/modules'

export default {
  data () {
    return {
      modules: [FreeMode, Pagination]
    }
  },
  computed: {
    ...mapState(cartStore, ['cart', 'loadingStatus', 'loadingIcon', 'form', 'resetUserForm', 'recommend']),
    coupon_code: {
      get () {
        return ''
      },
      set (val) {
        cartStore().coupon_code = val
      }
    },
    enterCoupon () {
      return this.$t('cart.enterCoupon')
    }
  },
  components: { LoadingOverlay, Swiper, SwiperSlide },
  methods: {
    ...mapActions(cartStore, ['getCartList', 'getRecommend']),
    increaseQty (item) {
      item.qty += 1
      this.updateQty(item)
    },
    decreaseQty (item) {
      item.qty -= 1
      this.updateQty(item)
    },
    updateQty (item) {
      if (item.qty <= 0 || item.qty > 99) {
        this.$swal.fire({
          icon: 'error',
          title: this.$t('cart.enterQuantityRange'),
          customClass: {
            title: 'swal-title'
          }
        })
        item.qty = 1
        return
      } else if (item.qty.toString().includes('.')) {
        this.$swal.fire({
          icon: 'error',
          title: this.$t('cart.noDecimalAllowed'),
          customClass: {
            title: 'swal-title'
          }
        })
        item.qty = 1
        return
      }
      cartStore().updateQty(item)
        .then(res => {
          this.$swal.fire({
            title: this.$t('cart.cartUpdated'),
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
            customClass: {
              title: 'swal-title'
            }
          })
        })
    },
    delProduct (id) {
      cartStore().delProduct(id)
        .then(res => {
          this.$swal.fire({
            title: this.$t('cart.deleted'),
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
            customClass: {
              title: 'swal-title'
            }
          })
        })
    },
    delAll () {
      cartStore().delAll()
        .then(res => {
          this.$swal.fire({
            title: this.$t('cart.deleted'),
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
            customClass: {
              title: 'swal-title'
            }
          })
        })
    },
    addCouponCode () {
      cartStore().addCouponCode()
        .then(res => {
          this.$swal.fire({
            title: this.$t('cart.couponApplied'),
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
            customClass: {
              title: 'swal-title'
            }
          })
        })
        .catch(() => {
          this.$swal.fire({
            icon: 'error',
            title: this.$t('cart.couponNotFound'),
            customClass: {
              title: 'swal-title'
            }
          })
        })
    }

  },
  mounted () {
    // this.getCartList() // 取得購物車資料
    this.getRecommend()
  },
  watch: {
    resetUserForm () {
      this.$refs.form.resetForm()
    }
  }
}
</script>

<style scoped>
.table{
  max-width: 100%;
}
/* Swiper */
.cartSwiper {
  max-width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.cartSwiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cartSwiper-slide img:hover {
  opacity: 0.7; /* 透明度值可以根据需要进行调整 */
  transition: opacity 0.3s ease; /* 添加过渡效果，使透明度变化更加平滑 */
}
/* Swiper */
@media (max-width: 767px) {
  .cartSwiper{
    height: 280px;
  }
  .table tbody tr th img {
    width: 100% !important;
  }
  .couponInput{
    width: 80% !important;
  }
  .m-none {
    display: none;
  }
  .loadingIcon {
    margin-left: 3px !important;
  }
}

@media (max-width: 414px) {
  .cartSwiper{
    height: 230px;
  }
  .product-title {
    font-size: 16px !important;
  }
  .coupon-title{
    font-size: 12px !important;
  }
  .coupon-price {
    font-size: 16px !important;
  }
  .loadingIcon {
    margin-left: 0px !important;
  }
}
</style>
