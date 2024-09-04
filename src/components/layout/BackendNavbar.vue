<template>
  <nav class="navbar navbar-expand-lg navbar-light w-100 z-3 top-0 bg-light">
    <div class="container">
      <RouterLink class="logo" to="/backend/adminProduct">
        <div class="d-flex align-items-center">
          <img src="@/assets/images/layout/drone_logo3.png">
          <h1 class="mb-0 ms-1">VISION</h1>
        </div>
      </RouterLink>
      <h5 class="mb-0 ms-1">後台管理系統</h5>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink to="/" class="nav-link">回到前台</RouterLink>
          <span class="separator">|</span>
          <RouterLink to="/backend/adminProduct" class="nav-link">後台產品列表</RouterLink>
          <span class="separator">|</span>
          <RouterLink to="/backend/adminOrder" class="nav-link">後台訂單</RouterLink>
          <span class="separator">|</span>
          <RouterLink to="/backend/adminCoupons" class="nav-link">後台優惠券</RouterLink>
          <span class="separator">|</span>
          <RouterLink to="/login" class="nav-link" @click="signOut">登出</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    signOut () {
      document.cookie = 'jasonToken=;expires=;'
      this.$swal(this.$t('login.logoutSuccess'))
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.separator {
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
}
</style>
