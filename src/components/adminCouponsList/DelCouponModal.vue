<template>
  <div id="delCouponModal" ref="delCouponModal" class="modal fade" tabindex="-1"
      aria-labelledby="delCouponModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delCouponModalLabel" class="modal-title">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除<strong class="text-danger">【{{this.tempCoupon.title}}】</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" :disabled="resetBtn === false" @click="confirmDel">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['tempCoupon', 'resetBtn'],
  data () {
    return {
      delModal: ''
    }
  },
  methods: {
    confirmDel () {
      this.$emit('delCoupon')
    },
    delModalShow () {
      this.delModal.show()
    },
    delModalHide () {
      this.delModal.hide()
    }

  },
  mounted () {
    this.delModal = new Modal(this.$refs.delCouponModal)
  }
}
</script>
