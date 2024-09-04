import { defineStore } from 'pinia'

export const useToastMessageStore = defineStore('toastMessage', {
  state: () => {
    return {
      messages: []
    }
  },
  actions: {
    toastShow () {
      setTimeout(() => {
        this.messages.shift()
      }, 6000)
    },
    clearToast (index) {
      this.messages.splice(index, 1)
    },
    pushMessage (message) {
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
      this.toastShow()
    }
  }
})
