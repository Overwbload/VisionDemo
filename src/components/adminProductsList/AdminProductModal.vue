<template>
  <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span v-if="!tempProduct.id">新增產品</span>
              <span v-else>編輯產品</span>
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">主要圖片</label>
                    <input id="imageUrl" type="text" class="form-control" placeholder="請輸入圖片連結"
                    v-model="localProduct.imageUrl">
                    <form>
                    <input type="file"  class="form-control my-2" id="file" placeholder="請選擇要上傳的圖片"
                    @change="upload" ref="fileInput">
                    <button type="submit" @click.prevent="uploadApi">
                      Upload<i class="fas fa-spinner fa-pulse p-2" v-if="loadingIcon" ></i>
                    </button>
                    </form>
                  </div>
                  <img class="img-fluid" :src="localProduct.imageUrl" alt="">
                  <span v-for="(picture,index) in localProduct.imagesUrl" v-bind:key="index">
                    <label :for="'imagesUrl'+index" class="form-label mx-4">輸入圖片網址</label>
                    <input :id="'imagesUrl'+index" type="text" class="form-control" placeholder="請輸入圖片連結" v-model="localProduct.imagesUrl[index]">
                    <img v-bind:src="picture" alt="" class="img-fluid  my-2">
                    <div>
                      <button class="btn btn-outline-danger btn-sm d-block my-2 w-100" @click="delImages(index)">刪除圖片</button>
                    </div>
                  </span>
                  <div>
                    <button class="btn btn-outline-secondary btn-sm d-block  my-2 w-100" @click="createImages">新增更多圖片</button>
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="localProduct.title">
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                      v-model="localProduct.category">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="unit" class="form-label">單位</label>
                    <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="localProduct.unit">
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"
                      v-model.number="localProduct.origin_price">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                      v-model.number="localProduct.price">
                  </div>
                </div>
                <hr>

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                    v-model="localProduct.description">
                    </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea id="content" type="text" class="form-control" placeholder="請輸入說明內容"
                    v-model="localProduct.content">
                    </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0"
                      v-model="localProduct.is_enabled">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-dark" :disabled="resetBtn === false" @click="confirmProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['tempProduct', 'resetBtn'],
  data () {
    return {
      localProduct: { ...this.tempProduct },
      bsModal: '',
      loadingIcon: ''
    }
  },
  methods: {
    confirmProduct () {
      this.$emit('confirm')
    },
    createImages () {
      this.$emit('createImg')
    },
    delImages (id) {
      this.$emit('delImg', id)
    },
    openModal () {
      this.bsModal.show()
    },
    closeModal () {
      this.bsModal.hide()
    },
    upload () {
      const file = this.$refs.fileInput.files[0]
      this.$emit('uploadImg', file)
    },
    uploadApi () {
      this.loadingIcon = true
      if (this.$refs.fileInput.files[0] === undefined) {
        this.loadingIcon = false
      }
      this.$emit('callUploadApi')
      this.$refs.fileInput.value = ''
    }
  },
  mounted () {
    this.bsModal = new Modal(this.$refs.productModal)
  },
  watch: {
    // 监听 tempProduct 的变化
    tempProduct: {
      handler (newVal) {
        this.loadingIcon = false
        this.localProduct = newVal
      },
      deep: true
    }
  }

}
</script>
