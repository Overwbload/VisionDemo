<template>
  <NavBar></NavBar>
  <div class="pt-7">
    <RouterView></RouterView>
  </div>
  <BackTopBtn></BackTopBtn>
  <FooterBar></FooterBar>
</template>

<script>
import NavBar from '@/components/layout/NavBar.vue'
import FooterBar from '@/components/layout/FooterBar.vue'
import BackTopBtn from '@/components/layout/BackTopBtn.vue'

export default {
  components: { NavBar, FooterBar, BackTopBtn },
  mounted () {
  }
}
</script>
