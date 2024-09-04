<template>
  <LoadingOverlay v-model:active="loadingStatus" :is-full-page="true"></LoadingOverlay>
  <div class="container">
    <!-- 產品列表 -->
    <div class="d-flex justify-content-between mt-4">
    <div>
      <h2>產品列表</h2>
    </div>
    <div>
      <button class="btn btn-dark" @click="openModal('new')">
          建立新的產品
      </button>
    </div>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{item.category}}</td>
        <td>{{item.title}}</td>
        <td class="text-start">{{item.origin_price}}</td>
        <td class="text-start">{{item.price}}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled === 1">啟用</span>
          <span v-else>未啟用</span>
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
  <Pagination :pages="pagination" @emit-pages="renderProducts"></Pagination>
  </div>
  <!-- Modal -->
  <AdminProductModal ref="productModalComponent" :temp-product="tempProduct" @confirm="confirmProduct"
  @create-img="createImages" @del-img="delImages" @upload-img="upload" @call-upload-api="uploadApi" :reset-Btn="resetBtn">
  </AdminProductModal>
  <AdminDelProductModal ref="delProductModalComponent" :temp-product="tempProduct" @del-product="confirmDel" :reset-Btn="resetBtn"></AdminDelProductModal>
  <!-- Modal -->
</template>

<script>
import Pagination from '@/components/PaginationComponent.vue'
import AdminProductModal from '@/components/adminProductsList/AdminProductModal.vue'
import AdminDelProductModal from '@/components/adminProductsList/AdminDelProductModal.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import adminProductsStore from '@/stores/adminProductsStore.js'
import { mapActions, mapState } from 'pinia'
import { watchEffect } from 'vue'

export default {
  computed: {
    ...mapState(adminProductsStore, ['products', 'tempProduct', 'isNew', 'pagination', 'formData', 'loadingStatus', 'resetBtn'])
  },
  components: { Pagination, AdminProductModal, AdminDelProductModal, LoadingOverlay },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(adminProductsStore, ['renderProducts', 'openModal', 'checkImagesArray', 'confirmProduct',
      'confirmDel', 'createImages', 'delImages', 'upload', 'uploadApi'])
  },
  mounted () {
    this.renderProducts()
    watchEffect(() => {
      if (this.isNew === 'new' || this.isNew === 'edit') {
        adminProductsStore().isNew = '' // 因程式先後順序 當進到這裡時 isNew已可以進行重置 以便重複開啟同一個modal
        this.$refs.productModalComponent.openModal()
        this.$refs.productModalComponent.$refs.fileInput.value = ''
      } else if (this.isNew === 'delete') {
        adminProductsStore().isNew = ''
        this.$refs.delProductModalComponent.delModalShow()
      } else if (this.isNew === 'closeModal') {
        adminProductsStore().isNew = ''
        this.$refs.productModalComponent.closeModal()
        this.$refs.delProductModalComponent.delModalHide()
      }
    })
  }
}
</script>
