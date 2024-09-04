<template>
  <div class="container">
    <LoadingOverlay v-model:active="loadingStatus" :is-full-page="true"></LoadingOverlay>
    <h2 class="ms-1 mt-2">訂單列表</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>訂單編號</th>
          <th>購買時間</th>
          <th>購買項目</th>
          <th>應付金額</th>
          <th>付款狀態</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <!-- 訂單編號 -->
          <td style="width: 250px;">{{item.id}}</td>
          <!-- 購買時間 -->
          <td style="width: 250px;">{{ $dayjs.unix(item.create_at).format('YYYY/MM/DD HH:mm:ss') }}</td>
          <!-- 購買項目 -->
          <td>
            <ul>
              <li v-for="(product, key) in item.products" :key="key">
                {{ product.product.title }}  〔{{ product.qty }}〕
              </li>
            </ul>
          </td>
          <!-- 應付金額 -->
          <td>$ {{ $filters.currency(item.total)}}</td>
          <!-- 付款狀態 -->
          <td>
            <span class="text-success" v-if="item.is_paid">已付款</span>
            <span class="text-danger" v-else>未付款</span>
          </td>
          <!-- 編輯 -->
          <td>
            <div class="btn-group">
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="openModal('edit', item)">編輯</button>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete',item)">刪除</button>
              </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁元件 -->
    <PaginationComponent nationComponent :pages="pagination" @emit-pages="getOrder"></PaginationComponent>
    <!-- Modal -->
    <OrderModal  ref="orderModalComponent" :temp-Order="tempOrder" @confirm="confirmOrder" @paid="paid" :reset-Btn="resetBtn"></OrderModal>
    <DelOrderModal ref="delOrderModal" :temp-Order="tempOrder" @confirm-Del="confirmDel" :reset-Btn="resetBtn"></DelOrderModal>
  </div>
</template>

<script>
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import ordersStore from '@/stores/ordersStore'
import OrderModal from '@/components/adminOrdersList/OrderModal.vue'
import DelOrderModal from '@/components/adminOrdersList/DelOrderModal.vue'
import { mapActions, mapState } from 'pinia'
import { watchEffect } from 'vue'

export default {
  computed: {
    ...mapState(ordersStore, ['pagination', 'loadingStatus', 'status', 'orders', 'tempOrder', 'resetBtn'])
  },
  components: { PaginationComponent, LoadingOverlay, DelOrderModal, OrderModal },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(ordersStore, ['getOrder', 'openModal', 'confirmOrder', 'confirmDel', 'paid'])
  },
  mounted () {
    this.getOrder()
    watchEffect(() => {
      if (this.status === 'edit') {
        ordersStore().status = ''
        this.$refs.orderModalComponent.openModal()
      } else if (this.status === 'delete') {
        ordersStore().status = ''
        this.$refs.delOrderModal.delModalShow()
      } else if (this.status === 'closeModal') {
        ordersStore().status = ''
        this.$refs.orderModalComponent.closeModal()
        this.$refs.delOrderModal.delModalHide()
      }
    })
  }
}
</script>
