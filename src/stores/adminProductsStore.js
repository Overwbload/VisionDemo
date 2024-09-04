import { defineStore } from 'pinia'
import axios from 'axios'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env

export default defineStore('adminProducts', {
  state: () => ({
    tempProduct: {},
    products: [],
    isNew: '',
    pagination: {},
    formData: '',
    loadingStatus: '',
    currentPage: '',
    resetBtn: true
  }),
  actions: {
    renderProducts (page = 1) { // call API get產品資訊  默認頁碼設為1 當頁碼資料被傳入時page會被改變
      this.currentPage = page
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/products?page=${page}`
      axios.get(url)
        .then(res => {
          this.loadingStatus = false
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    openModal (isNew, item) {
      this.isNew = isNew
      if (isNew === 'new') { // 開啟新增產品modal
        this.tempProduct = {
          imagesUrl: []
        }
      } else if (isNew === 'edit') { // 開啟編輯產品modal 深拷貝products的資料到tempProducts 因tempProduct有第二層屬性
        this.tempProduct = JSON.parse(JSON.stringify(item))
      } else if (isNew === 'delete') { // 開啟刪除產品modal
        this.tempProduct = { ...item }
      }
    },
    checkImagesArray () { // 檢查tempProduct的imagesUrl陣列不為空白
      if (this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = this.tempProduct.imagesUrl.filter(item => item !== '') // 篩選新增更多圖片的連結欄位不為空白
      }
    },
    confirmProduct () { // 在productModal 按下確認後call API post產品資訊
      this.resetBtn = false
      // 根據是否有 id 決定 API 路徑和 HTTP 方法
      const isNewProduct = !this.tempProduct.id
      const url = isNewProduct
        ? `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/product`
        : `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/product/${this.tempProduct.id}`
      const httpMethod = isNewProduct ? 'post' : 'put'

      // 檢查圖片 URL 陣列
      this.checkImagesArray()

      // 檢查是否有編輯內容
      if (!isNewProduct) {
        const existingProduct = this.products.find(item => item.id === this.tempProduct.id)
        if (existingProduct && JSON.stringify(existingProduct) === JSON.stringify(this.tempProduct)) {
          alert('No changes made!!')
          this.resetBtn = true
          return
        }
      }

      // 呼叫 API
      axios[httpMethod](url, { data: this.tempProduct })
        .then(res => {
          if (isNewProduct) {
            this.renderProducts() // 新增產品跳轉第一頁
          } else {
            this.renderProducts(this.currentPage) // 編輯產品跳轉當前頁
          }
          this.isNew = 'closeModal'
          this.resetBtn = true
          alert(res.data.message)
        })
        .catch(err => {
          this.resetBtn = true
          alert(err.response.data.message)
        })
    },
    confirmDel () { // 確認刪除產品
      this.resetBtn = false
      const delProduct = this.products.find(item => item.id === this.tempProduct.id)
      if (delProduct) {
        const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/product/${this.tempProduct.id}`
        axios.delete(url)
          .then(res => {
            // this.tempProduct = {}
            this.renderProducts(this.currentPage)
            this.isNew = 'closeModal'
            this.resetBtn = true
            alert(res.data.message)
          })
          .catch(err => {
            this.resetBtn = true
            alert(err.response.data.message)
          })
      }
    },
    createImages () { // 新增更多圖片
      if (!this.tempProduct.imagesUrl) { // 如果imagesUrl不存在 則幫他創建一個陣列
        this.tempProduct.imagesUrl = []
      }
      this.tempProduct.imagesUrl.push('') // 如果imagesUrl已經存在，則在陣列中push一個新的空白欄位供填入
    },
    delImages (index) { // 刪除圖片
      this.tempProduct.imagesUrl.splice(index, 1)
    },
    upload (file) { // 上傳圖片將資料儲存至formData
      this.formData = new FormData()
      this.formData.append('file-to-upload', file)
    },
    uploadApi () { // 將formData打包給API上傳
      if (!this.formData) {
        alert('No file to upload')
        return
      }
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/upload`
      axios.post(url, this.formData)
        .then(res => {
          alert('上傳成功')
          this.tempProduct.imageUrl = res.data.imageUrl
          this.formData = ''
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  }
})
