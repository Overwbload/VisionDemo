import { defineStore } from 'pinia'
import axios from 'axios'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env

export default defineStore('orderStore', {
  state: () => ({
    orders: [],
    pagination: {},
    loadingStatus: '',
    tempOrder: {},
    status: '',
    currentPage: '',
    resetBtn: true
  }),
  actions: {
    getOrder (page = 1) {
      this.currentPage = page
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/orders?page=${page}`
      axios.get(url)
        .then(res => {
          this.loadingStatus = false
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        })
        .catch(err => {
          alert(err.message)
        })
    },
    openModal (status, item) {
      this.status = status
      if (status === 'edit') {
        this.tempOrder = JSON.parse(JSON.stringify(item))
      } else if (status === 'delete') { // 開啟刪除產品modal
        this.tempOrder = JSON.parse(JSON.stringify(item))
      }
    },
    paid () {
      this.tempOrder.is_paid = true
    },
    confirmOrder () {
      this.resetBtn = false
      const existingProduct = this.orders.find(item => item.id === this.tempOrder.id)
      if (existingProduct && JSON.stringify(existingProduct) === JSON.stringify(this.tempOrder)) {
        alert('No changes made!!')
        this.resetBtn = true
        return
      }

      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/order/${this.tempOrder.id}`
      axios.put(url, { data: this.tempOrder })
        .then(res => {
          this.getOrder(this.currentPage)
          this.status = 'closeModal'
          this.resetBtn = true
          alert(res.data.message)
        })
        .catch(err => {
          this.resetBtn = true
          alert(err.response.data.message)
        })
    },
    confirmDel () {
      this.resetBtn = false
      const delOrder = this.orders.find(item => item.id === this.tempOrder.id)
      if (delOrder) {
        const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/order/${this.tempOrder.id}`
        axios.delete(url)
          .then(res => {
            this.getOrder(this.currentPage)
            this.status = 'closeModal'
            this.resetBtn = true
            alert(res.data.message)
          })
          .catch(err => {
            this.resetBtn = true
            alert(err.response.data.message)
          })
      }
    }
  }
})
