<template>
  <div id="couponModal" ref="couponModal" class="modal fade" tabindex="-1" aria-labelledby="couponModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-md">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="couponModalLabel" class="modal-title">
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                  v-model="localCoupon.title">
                </div>
                <div class="mb-3">
                  <label for="code" class="form-label">優惠碼</label>
                  <input id="code" type="text" class="form-control" placeholder="請輸入優惠碼"
                  v-model="localCoupon.code">
                </div>
                <div class="mb-3">
                  <label for="due_date" class="form-label">到期日</label>
                  <input id="due_date" type="date" class="form-control" placeholder="請輸入到期日"
                  v-model="temp_due_date">
                </div>
                <div class="mb-3">
                  <label for="percent" class="form-label">折扣百分比</label>
                  <div class="input-group">
                    <input id="percent" type="number" class="form-control" placeholder="請輸入折扣百分比 ex: 90"
                    min="0" v-model="localCoupon.percent">
                    <span class="input-group-text">%</span>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0"
                    v-model="localCoupon.is_enabled">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-dark" :disabled="resetBtn === false" @click="confirmCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['tempCoupon', 'resetBtn'],
  computed: {
    temp_due_date: {
      get () {
        return this.tempCoupon.due_date
          ? this.$dayjs.unix(this.tempCoupon.due_date).format('YYYY-MM-DD')
          : this.$dayjs().format('YYYY-MM-DD')
      },
      set (val) {
        this.localCoupon.due_date = this.$dayjs(val).unix()
      }
    }
  },
  data () {
    return {
      localCoupon: { ...this.tempCoupon },
      bsModal: '',
      loadingIcon: ''
    }
  },
  methods: {
    confirmCoupon () {
      this.$emit('confirm')
    },
    openModal () {
      this.bsModal.show()
    },
    closeModal () {
      this.bsModal.hide()
    }
  },
  mounted () {
    this.bsModal = new Modal(this.$refs.couponModal)
  },
  watch: {
    tempCoupon: {
      handler (newVal) {
        this.localCoupon = newVal
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
