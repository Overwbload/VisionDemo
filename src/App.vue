<template>
  <RouterView/>
</template>

<script>
export default {}
</script>

<style>
.logo {
  text-decoration: none; /* 去除下划线 */
  color: black; /* 设置颜色为黑色 */
}
.logo img {
  max-height: 50px;
}

.page-link {
  color: black; /* 设置分页数字的颜色 */
}
.page-link:hover {
  color: grey; /* 设置悬停时的颜色 */
}
span.page-link {
  background-color: #eeeeee;
  font-weight: bold; /* 可选：使当前页码加粗 */
}

/* 隱藏input type=number 原生的上下數字調整箭頭  可設置Class名稱*/
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

@media (max-width: 767px) {
  .swal-title{
    font-size: 20px;
  }
}

</style>
