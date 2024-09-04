<template>
  <div class="container">
    <LoadingOverlay v-model:active="loadingStatus" :is-full-page="true"></LoadingOverlay>
    <div class="text-end mt-4">
      <button class="btn btn-dark" @click="openModal('new')">
        建立新的優惠券
      </button>
    </div>
    <table class="table table-hover mt-4">
    <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>優惠碼</th>
        <th>啟用狀態</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in coupons" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}%</td>
        <td>{{ $dayjs.unix(item.due_date).format('YYYY-MM-DD') }}</td>
        <td>{{ item.code }}</td>
        <td>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" :id="`coupon${item.id}`"
            v-model="item.is_enabled" :true-value="1" :false-value="0"
            @change="enabled(item)" :disabled="loadingIcon === item.id">
            <label class="form-check-label" :for="`coupon${item.id}`">
              <span v-if="item.is_enabled">已啟用</span>
              <span v-else>未啟用</span>
              <i class="fas fa-spinner fa-pulse ms-2"  v-if="loadingIcon === item.id"></i>
            </label>
          </div>
        </td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="openModal('edit', item)">編輯</button>
            <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete',item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- 分頁 -->
  <PaginationComponent nationComponent :pages="pagination" @emit-pages="getCoupon"></PaginationComponent>
  <!-- Modal -->
  <couponModal ref="couponModal" :temp-Coupon="tempCoupon" @confirm="confirmCoupon" :reset-Btn="resetBtn"></couponModal>
  <DelCouponModal ref="delCouponModal" :temp-coupon="tempCoupon" @del-coupon="confirmDel" :reset-Btn="resetBtn"></DelCouponModal>
  </div>
</template>
<script>
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import couponsStore from '@/stores/couponsStore.js'
import couponModal from '@/components/adminCouponsList/CouponModal.vue'
import DelCouponModal from '@/components/adminCouponsList/DelCouponModal.vue'
import { mapActions, mapState } from 'pinia'
import { watchEffect } from 'vue'

export default {
  computed: {
    ...mapState(couponsStore, ['pagination', 'coupons', 'loadingStatus', 'status', 'loadingIcon', 'tempCoupon', 'resetBtn'])
  },
  components: { LoadingOverlay, PaginationComponent, couponModal, DelCouponModal },
  methods: {
    ...mapActions(couponsStore, ['getCoupon', 'openModal', 'enabled', 'confirmDel', 'confirmCoupon'])
  },
  mounted () {
    this.getCoupon()
    watchEffect(() => {
      if (this.status === 'new' || this.status === 'edit') {
        couponsStore().status = ''
        this.$refs.couponModal.openModal()
      } else if (this.status === 'delete') {
        couponsStore().status = ''
        this.$refs.delCouponModal.delModalShow()
      } else if (this.status === 'closeModal') {
        couponsStore().status = ''
        this.$refs.couponModal.closeModal()
        this.$refs.delCouponModal.delModalHide()
      }
    })
  }
}
</script>
