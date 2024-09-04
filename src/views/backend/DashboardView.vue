<template>
  <BackendNavbar></BackendNavbar>
  <RouterView v-if="checkSuccess"></RouterView>
</template>

<script>
import BackendNavbar from '@/components/layout/BackendNavbar.vue'
const { VITE_APP_API_URL } = import.meta.env

export default {
  components: { BackendNavbar },
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    checkLoginToken () {
      // 取得cookie中的token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)jasonToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) {
        // token夾在headers中
        this.$http.defaults.headers.common.Authorization = token
        const url = `${VITE_APP_API_URL}/api/user/check`
        this.$http.post(url, { api_token: this.token })
          .then(res => {
            this.checkSuccess = true
          })
          .catch(err => {
            this.$swal.fire(err.response.data.message)
            this.$router.push('/login')
          })
      } else {
        this.$swal(this.$t('login.notLoggedIn'))
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    this.checkLoginToken() // call登入驗證
  }
}
</script>

<style>
.custom-icon-size .swal2-icon {
  font-size: 10px; /* 自定义图标的大小 */
  line-height: 10px; /* 确保图标在容器中居中 */
}

.custom-icon-size .swal2-icon i {
  font-size: 10px; /* 确保图标的大小 */
}
</style>
