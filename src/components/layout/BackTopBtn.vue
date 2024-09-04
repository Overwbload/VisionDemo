<template>
  <button v-show="showButton" @click="scrollToTop" class="back-to-top">
    <i class="bi bi-arrow-bar-up"></i>
  </button>
</template>

<script>
export default {
  data () {
    return {
      showButton: false
    }
  },
  methods: {
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    handleScroll () {
      this.showButton = window.scrollY > 300
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
/* back to top */
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #b0bec5;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  z-index: 1000;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.back-to-top:hover {
  background-color: #cfd8dc;
  transform: scale(1.1);
}
/* back to top */
</style>
