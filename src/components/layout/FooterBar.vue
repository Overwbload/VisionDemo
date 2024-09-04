<template>
  <div class="bg-dark py-5">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
        <RouterLink class="logo" to="/">
          <div class="d-flex align-items-center">
            <img class=""  src="@/assets/images/layout/drone_logo.png">
            <h1 class="mb-0 ms-1">VISION</h1>
          </div>
        </RouterLink>
        <ul class="d-flex list-unstyled mb-0 h4">
          <li><a href="#" class="text-white mx-3"><i class="fab fa-facebook"></i></a></li>
          <li><a href="#" class="text-white mx-3"><i class="fab fa-instagram"></i></a></li>
          <li><a href="#" class="text-white ms-3"><i class="fab fa-line"></i></a></li>
        </ul>
      </div>
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
        <div class="mb-md-0 mb-1">
          <p class="mb-0">02-3456-7890</p>
          <p class="mb-0">vision2024drone@gmail.com</p>
        </div>
        <p class="mb-0">© 2024 JasonFu {{$t('footer.credit')}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  h1{
    color:#F8F9FA
  }
</style>
