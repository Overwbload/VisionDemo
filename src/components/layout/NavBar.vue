<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top w-100 z-99 top-0 bg-light">
    <div class="container">
      <RouterLink class="logo position-relative" to="/">
        <div class="d-flex align-items-center">
          <img class="" src="@/assets/images/layout/drone_logo.png">
          <img class="roll-tl position-absolute fa-spin" style="--fa-animation-duration: 0.5s;" src="@/assets/images/layout/propeller1.png">
          <img class="roll-tr position-absolute fa-spin" style="--fa-animation-duration: 0.5s;" src="@/assets/images/layout/propeller1.png">
          <img class="roll-bl position-absolute fa-spin" style="--fa-animation-duration: 0.5s;" src="@/assets/images/layout/propeller1.png">
          <img class="roll-br position-absolute fa-spin" style="--fa-animation-duration: 0.5s;" src="@/assets/images/layout/propeller1.png">
          <h1 class="mb-0 ms-1">VISION</h1>
        </div>
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div ref="navCollapse" class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav navbar-expand-lg">
          <RouterLink to="/" class="nav-link me-4">{{ $t('menu.home') }}</RouterLink>
          <RouterLink to="/products" class="nav-link me-4 ">{{ $t('menu.droneList') }}</RouterLink>
          <RouterLink to="/cart" class="nav-link position-relative me-4">{{ $t('menu.cart') }}
            <span class="fs-12 position-absolute badge rounded-pill bg-danger" style="top: -5px;"
              v-if="cart.carts.length !== 0">{{ cart?.carts?.length }}
            </span>
          </RouterLink>
          <RouterLink to="/backend/adminProduct" class="nav-link me-4">{{ $t('menu.backend') }}</RouterLink>
          <hr>
          <div class="btn-group">
            <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
              {{ $t('menu.selectLanguage') }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="defaultDropdown" style="cursor: pointer;">
              <li><a class="dropdown-item" @click="switchToChinese">{{ $t('menu.chinese') }}</a></li>
              <li><a class="dropdown-item" @click="switchToEnglish">{{ $t('menu.english') }}</a></li>
              <li><a class="dropdown-item" @click="switchToJapanese">{{ $t('menu.japanese') }}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import cartStore from '@/stores/cartStore'
import { mapState } from 'pinia'
import { Collapse } from 'bootstrap'
import { setLocale } from '@vee-validate/i18n'

export default {
  data () {
    return {
      bsCollapse: ''
    }
  },
  computed: {
    ...mapState(cartStore, ['cart'])
  },
  methods: {
    handleDocumentClick (event) {
      // 检查点击是否发生在导航栏外部
      if (this.$refs.navCollapse && !this.$refs.navCollapse.contains(event.target) && this.bsCollapse._isShown()) {
        this.bsCollapse.hide()
      }
    },
    switchToChinese () {
      this.$i18n.locale = 'zh-TW'
      setLocale('zh_TW')
      this.bsCollapse.hide()
    },
    switchToEnglish () {
      this.$i18n.locale = 'en'
      setLocale('en')
      this.bsCollapse.hide()
    },
    switchToJapanese () {
      this.$i18n.locale = 'jp'
      setLocale('jp')
      this.bsCollapse.hide()
    }
  },
  mounted () {
    this.bsCollapse = new Collapse(this.$refs.navCollapse, { toggle: false })
    cartStore().getCartList()
    // 添加全局点击事件监听器
    document.addEventListener('click', this.handleDocumentClick)
  },
  beforeUnmount () {
    // 移除全局点击事件监听器
    document.removeEventListener('click', this.handleDocumentClick)
  },
  watch: {
    '$route.query': {
      handler () {
        this.bsCollapse.hide()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.dropdown-menu{
  --bs-dropdown-link-active-bg: #cfd8dc;
}
.btn-outline-secondary{
  --bs-btn-hover-bg: #b0bec5;
}
@media (max-width: 992px) {
  .navbar-nav {
    justify-content: center;
  }
  .navbar-nav .nav-link {
    margin-right: 0px !important;
    text-align: center;
    width: 100%;
  }
  .navbar-nav .nav-link .badge {
    margin-left: 10px;
    top: 50% !important;
    transform: translateY(-50%);
  }

.btn-group {
    display: block;
    width: 100%;
    text-align: center;
  }
  .btn-group .dropdown-toggle {
    margin-bottom: 5px;
  }
  .btn-group .dropdown-menu {
    margin: 0 auto;
    width: 50%;
    text-align: center;
  }
}
@media (min-width: 767px){
  .roll-tl{
    top: 10%;
    left: 2%;
  }
  .roll-tr{
    top: 10%;
    left: 16%;
  }
  .roll-bl{
    top: 60%;
    left: 2%;
  }
  .roll-br{
    top: 60%;
    left: 16%;
  }
}

@media (max-width: 767px) {
    .roll-tl{
    top: 10%;
    left: 2%;
  }
  .roll-tr{
    top: 10%;
    left: 30px;
  }
  .roll-bl{
    top: 60%;
    left: 2%;
  }
  .roll-br{
    top: 60%;
    left: 19%;
  }
}
@media (max-width: 414px) {
  .roll-br{
    top: 60%;
    left: 20%;
  }
}
</style>
