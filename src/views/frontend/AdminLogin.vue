<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="w-100 h-100 position-absolute" style="z-index: -1; top: 0;left: 0; background-image: url('https://images.unsplash.com/photo-1553136838-4daa421120b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
      background-size: cover; background-position: center center; opacity: 0.8;">
    </div>
    <div class="row justify-content-center w-100">
      <h1 class="h3 my-3 font-weight-normal text-center">
        {{ $t('login.adminLogin') }}
      </h1>
      <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="getLogin">
          <div class="form-floating my-3">
            <input type="email" class="form-control" v-model="user.username" placeholder="name@example.com"
            required autofocus>
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" v-model="user.password"    placeholder="Password" required>
            <label for="password">Password</label>
          </div>
          <button id="login" class="btn btn-lg btn-dark w-100 mt-3" type="submit">
            {{ $t('login.login') }}
          </button>
          <div class="text-center mt-3">
            <RouterLink to="./" >
              <button class="btn btn-secondary" type="button">{{ $t('common.backToHome') }}</button>
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_APP_API_URL } = import.meta.env

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    getLogin () {
      const url = `${VITE_APP_API_URL}/admin/signin`
      this.$http.post(url, this.user)
        .then((res) => {
          const { token, expired } = res.data // 取得API回傳的token&expired&message
          document.cookie = `jasonToken=${token}; expires=${new Date(expired)};` // 將token&expired儲存至cookie
          this.$swal({
            title: this.$t('login.loginSuccess'),
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          })
          this.$router.push('backend/adminProduct') // 頁面跳轉
        })
        .catch((err) => {
          this.$swal.fire({
            icon: 'error',
            title: `${err.response.data.message}`
          })
        })
    }
  },
  mounted () {
  }
}
</script>

<style scope>
h1 {
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
}
</style>
