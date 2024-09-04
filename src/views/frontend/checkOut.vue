<template>
  <LoadingOverlay v-model:active="loadingStatus" :is-full-page="true"></LoadingOverlay>
  <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
          <h3 class="fw-bold mb-4 pt-4">{{ $t('checkout.title') }}</h3>
        </div>
      </div>
      <div class="row flex-row-reverse justify-content-center pb-5">
        <div class="col-md-6">
          <div class="border p-4 mb-4 bg-light">
            <div class="d-flex mb-2" v-for="item in cart.carts" :key="item.id">
              <img :src="item.product.imageUrl" alt="" class="me-2" style="width: 48px; height: 48px; object-fit: cover">
              <div class="w-100">
                <div class="d-flex justify-content-between">
                  <div class="mb-0 fw-bold ms-3 d-inline-block">{{ item.product.title }} x {{ item.qty}}
                    <div class="text-success fs-12" v-if="item.coupon">{{ $t('checkout.coupon') }}-{{ item.coupon.title }}</div>
                  </div>
                  <p class="mb-0">NT$ {{ $filters.currency(item.product.price) }}</p>
                </div>
              </div>
            </div>
            <table class="table mt-4 border-top border-bottom text-muted">
              <tbody>
                <tr>
                  <th scope="row" class="border-0 px-0 pt-4 font-weight-normal bg-light">{{ $t('common.subtotal') }}</th>
                  <td class="text-end border-0 px-0 pt-4 bg-light">NT$ {{ $filters.currency(cart.total) }}</td>
                </tr>
                <tr>
                  <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal bg-light">{{ $t('checkout.paymentMethod') }}</th>
                  <td class="text-end border-0 px-0 pt-0 pb-4 bg-light">ApplePay</td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-between mt-4">
              <p class="mb-0 h4 fw-bold">{{ $filters.currency(cart.total) }}</p>
              <p class="mb-0 h4 fw-bold">NT$ {{ $filters.currency(cart.total) }}</p>
            </div>
            <div class="d-flex justify-content-between mt-4" v-if="cart.total !== cart.final_total">
              <p class="mb-0 h4 fw-bold text-success">{{ $t('common.discountPrice') }}</p>
              <p class="mb-0 h4 fw-bold text-success">NT$ {{ $filters.currency(cart.final_total) }}</p>
            </div>
          </div>
        </div>
        <v-form class="col-md-6" ref="form" v-slot="{ errors }" @submit="sendOrder">
          <div>
            <p>{{ $t('checkout.contactInfo') }}</p>
            <div class="mb-2">
              <label for="ContactMail" class="text-muted mb-0 form-label">Email</label>
              <v-field id="ContactMail" name="email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="example@gmail.com"
              :class="{ 'is-invalid': errors['email'] }" rules="required|email" v-model="form.user.email"></v-field>
              <error-message name="email" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-2">
              <label for="ContactAddress" class="text-muted mb-0 form-label">{{ $t('checkout.address') }}</label>
              <v-field id="ContactAddress" :name="address" type="text" class="form-control" :placeholder="enterAddress"
              :class="{ 'is-invalid': errors[address] }" rules="required" v-model="form.user.address"></v-field>
              <error-message :name="address" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-2">
              <label for="ContactName" class="text-muted mb-0 form-label">{{ $t('checkout.name') }}</label>
              <v-field id="ContactName" :name="name" type="text" class="form-control" :placeholder="enterName"
              :class="{ 'is-invalid': errors[name] }" rules="required"  v-model="form.user.name"></v-field>
              <error-message :name="name" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-2">
              <label for="ContactPhone" class="text-muted mb-0 form-label">{{ $t('checkout.phone') }}</label>
              <v-field id="ContactPhone" :name="phone" type="text" class="form-control"  :placeholder="enterPhone"
              :class="{ 'is-invalid': errors[phone] }" rules="required|regex:^(09)[0-9]{8}$" v-model="form.user.tel"></v-field>
              <error-message :name="phone" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-2">
              <label for="ContactMessage" class="text-muted mb-0 form-label">{{ $t('checkout.message') }}</label>
              <v-field id="ContactMessage"  name="留言" as="textarea" class="form-control" rows="3" placeholder="message ... "
              rules="" :class="{ 'is-invalid': errors['留言'] }" v-model="form.message"></v-field>
            </div>
          </div>
          <div class="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
            <RouterLink to="/cart" class="text-dark mt-md-0 mt-3"><i class="fas fa-chevron-left me-2"></i>{{ $t('checkout.backToCart') }}</RouterLink>
            <button type="submit"  class="btn btn-dark py-3 px-7">{{ $t('checkout.submitOrder') }}</button>
          </div>
        </v-form>
      </div>
    </div>
</template>

<script>
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import cartStore from '@/stores/cartStore'
import { mapActions, mapState } from 'pinia'

export default {
  computed: {
    ...mapState(cartStore, ['cart', 'loadingStatus', 'loadingIcon', 'form', 'resetUserForm']),
    address () {
      return this.$t('checkout.address')
    },
    enterAddress () {
      return this.$t('checkout.enterAddress')
    },
    name () {
      return this.$t('checkout.name')
    },
    enterName () {
      return this.$t('checkout.enterName')
    },
    phone () {
      return this.$t('checkout.phone')
    },
    enterPhone () {
      return this.$t('checkout.enterPhone')
    }
  },
  components: { LoadingOverlay },
  methods: {
    ...mapActions(cartStore, ['getCartList']),
    sendOrder () {
      cartStore().sendOrder()
        .then(res => {
          this.$swal.fire({
            title: this.$t('cart.orderCreated'),
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

  },
  watch: {
    resetUserForm (status) {
      if (status === true) {
        this.$refs.form.resetForm()
        this.$router.push('/checkoutSuccess')
      }
    }
  }
}
</script>
