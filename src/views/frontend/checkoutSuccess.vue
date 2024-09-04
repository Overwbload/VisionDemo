<template>
  <div class="position-relative d-flex">
    <div class="container d-flex flex-column " style="min-height: 100vh;">
      <div class="row my-auto pb-7 justify-content-center">
        <div class="col-md-8 d-flex flex-column">
          <div class="my-auto text-center">
            <h2> {{ $t('checkoutSuccess.success') }}</h2>
            <div>{{ $t('checkoutSuccess.emailMessage') }} <span class="fs-20">{{ order.orderId }}</span>
              <button @click="copyOrderId" class="btn btn-sm btn-outline-secondary ms-2">{{ $t('checkoutSuccess.copy') }}</button>
            </div>
            <div class="text-center">
              <RouterLink to="/" class="btn btn-outline-dark rounded-1 mt-4 px-5">{{ $t('common.backToHome') }}</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-100 h-100 position-absolute" style="z-index: -1; top: 0;left: 0;
    background-size: cover; background-position: center center; opacity: 0.8;">
      <video autoplay loop muted title="" class="w-100 h-100 object-fit-cover">
        <source src="https://videos.pexels.com/video-files/3643613/3643613-hd_1920_1080_24fps.mp4"
          type="video/mp4; codecs=avc1.4D401E, mp4a.40.2">
      </video>
    </div>
  </div>
</template>

<script>
import cartStore from '@/stores/cartStore'
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(cartStore, ['order'])
  },
  methods: {
    copyOrderId () {
      const successMessage = this.$t('checkoutSuccess.orderCopied')
      const failureMessage = this.$t('checkoutSuccess.copyFailed')
      navigator.clipboard.writeText(this.order.orderId)
        .then(() => {
          this.$swal.fire({
            icon: 'success',
            title: successMessage,
            text: '',
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
            title: failureMessage
          })
        })
    }
  },
  mounted () {
  }
}
</script>
