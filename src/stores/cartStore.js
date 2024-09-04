import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env

export default defineStore('cart', {
  state: () => ({
    cart: {
      carts: []
    },
    comparisonCart: { // 用來比對用的購物車物件
      carts: []
    },
    loadingStatus: '',
    loadingIcon: '',
    form: {
      user: { // 顧客
        email: '',
        name: '',
        tel: '',
        address: ''
      },
      message: ''
    },
    resetUserForm: '',
    coupon_code: '',
    order: {},
    recommend: []
  }),
  actions: {
    getCartList () { // 取得購物車清單
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart`
      axios.get(url)
        .then(res => {
          this.cart = res.data.data
          this.comparisonCart = JSON.parse(JSON.stringify(res.data.data)) // 深拷貝同樣的資料以方便updateQty時進行比對
          this.loadingStatus = false
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: `${err.response.data.message}`
          })
        })
    },
    updateQty (item) { // 更改購買數量
      return new Promise((resolve, reject) => {
        const existingProduct = this.comparisonCart.carts.find(cart => cart.product_id === item.product_id)
        if (existingProduct && existingProduct.qty !== item.qty) { // 當函式觸發如果產品存在且數量不為原數量
          this.loadingIcon = item.id
          const tempCart = {
            product_id: item.product_id,
            qty: item.qty
          }
          const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart/${item.id}`
          axios.put(url, { data: tempCart })
            .then(res => {
              this.loadingIcon = ''
              this.getCartList()
              resolve()
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                title: `${err.response.data.message}`
              })
            })
        }
      })
    },
    delProduct (id) { // 刪除單一商品
      return new Promise((resolve, reject) => {
        this.loadingIcon = id
        const existingProduct = this.cart.carts.find(item => item.id === id)
        if (existingProduct) {
          const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart/${id}`
          axios.delete(url)
            .then(res => {
              this.getCartList()
              this.loadingIcon = ''
              resolve()
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                title: `${err.response.data.message}`
              })
            })
        }
      })
    },
    delAll () { // 刪除購物車內全部商品
      return new Promise((resolve, reject) => {
        this.loadingStatus = true
        const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/carts`
        axios.delete(url)
          .then(res => {
            this.getCartList()
            this.loadingStatus = false
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
    sendOrder () { // 送出訂單
      return new Promise((resolve, reject) => {
        this.resetUserForm = false
        const Order = this.form
        const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/order`
        axios.post(url, { data: Order })
          .then(res => {
            this.order = res.data
            this.resetUserForm = true
            this.getCartList()
            resolve()
          })
          .catch(err => {
            this.resetUserForm = true
            Swal.fire({
              icon: 'error',
              title: `${err.response.data.message}`
            })
          })
      })
    },
    addCouponCode () {
      return new Promise((resolve, reject) => {
        const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/coupon`
        const coupon = {
          code: this.coupon_code
        }
        axios.post(url, { data: coupon })
          .then(res => {
            this.getCartList()
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getRecommend () {
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/products/all`
      axios.get(url)
        .then(res => {
          this.recommend = res.data.products.sort(() => 0.5 - Math.random()).slice(0, 5)
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
