<template>
  <!-- loading 圖示(自定義化) -->
  <LoadingOverlay class="vl-parent">
      <template #default>
        <img class="loader fa-spin mx-5 mb-1" src="../assets/images/layout/drone_logo3.png"
        style="--fa-animation-duration: 3s;" alt="">
        <div class="loader"></div>
      </template>
    </LoadingOverlay>
</template>

<style>
/* 自定義Loading的動畫CSS設定 */
.loader:not(img) {
  width: fit-content;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  background: linear-gradient(135deg,#0000 calc(50% - 0.1em),#000 0 calc(50% + 0.5em),#0000 0) right/300% 100%;
  animation: l22 2s infinite;
}
.loader::before {
  content: "Loading...";
  color: #0000;
  padding: 0 5px;
  background: inherit;
  background-image: linear-gradient(135deg,#000 calc(50% - 0.1em),#fff 0 calc(50% + 0.5em),#000 0);
  -webkit-background-clip:text;
          background-clip:text;
}

@keyframes l22{
  100%{background-position: left}
}
</style>
