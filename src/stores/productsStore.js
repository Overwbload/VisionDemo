import { defineStore } from 'pinia'
import axios from 'axios'
import cartStore from './cartStore'
import Swal from 'sweetalert2'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env

export default defineStore('productsStore', {
  state: () => ({
    products: [],
    product: [],
    pagination: {},
    currentPage: '',
    loadingStatus: '',
    loadingIcon: '',
    qty: 1,
    pageBack: false,
    category: [],
    currentCategory: '',
    searchText: ''
  }),
  actions: {
    renderProducts (category = '', page = 1) { // call API get產品資訊  默認頁碼設為1 當頁碼資料被傳入時page會被改變
      this.searchText = ''
      this.currentPage = page
      this.currentCategory = category
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/products?category=${category}&page=${page}`
      axios.get(url)
        .then(res => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.loadingStatus = false
          this.getCategory()
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: `${err.response.data.message}`
          })
        })
    },
    getDetail (id) {
      return new Promise((resolve, reject) => {
        this.pageBack = false
        this.product = [] // 會有短暫顯示上一個資料的問題 設置重置
        this.qty = 1
        this.loadingStatus = true
        const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/product/${id}`
        axios.get(url)
          .then(res => {
            this.product = res.data.product
            this.product.description = this.product.description.replace(/\n/g, '<br>')
            this.loadingStatus = false
          })
          .catch(err => {
            this.loadingStatus = false
            this.pageBack = true
            reject(err)
          })
      })
    },
    addToCart (productId, qty = 1) { // 加入購物車
      return new Promise((resolve, reject) => {
        this.loadingIcon = productId
        const tempCart = {
          product_id: productId,
          qty
        }
        const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart`
        axios.post(url, { data: tempCart })
          .then(res => {
            cartStore().getCartList()
            this.loadingIcon = ''
            resolve()
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: `${err.response.data.message}`
            })
          })
      })
    },
    validateQty () {
      if (this.qty < 1 || this.qty.toString().includes('.')) {
        this.qty = 1
      } else if (this.qty > 99) {
        this.qty = 99
      }
    },
    getCategory () {
      if (this.category.length === 0) {
        const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/products/all`
        axios.get(url)
          .then(res => {
            this.category = [...new Set(res.data.products.map(product => product.category))]
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: `${err.response.data.message}`
            })
          })
      }
    },
    search () {
      this.searchText = this.searchText.trim()
      if (this.searchText === '') {
        return
      }
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/products/all`
      axios.get(url)
        .then(res => {
          this.pagination = { total_pages: 1, current_page: 1, has_pre: false, has_next: false, category: '' }
          this.loadingStatus = false
          this.products = res.data.products.filter(item => {
            return item.title.toLowerCase().includes(this.searchText.toLowerCase())
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: `${err.response.data.message}`
          })
        })
    }
  }
})
