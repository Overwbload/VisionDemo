<template>
  <div class="position-relative">
    <Swiper class="homePage-Swiper" :slides-per-view="1" :space-between="50" :modules="modules" loop
      :autoplay="{ delay: 10000, disableOnInteraction: false }" effect="fade">
      <SwiperSlide>
        <div class="slide-content" style="background-image: url('https://images.unsplash.com/photo-1488263590619-bc1fff43b6c1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');"></div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="slide-content" style="background-image: url('https://images.pexels.com/photos/319968/pexels-photo-319968.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1278&dpr=1');"></div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="slide-content" style="background-image: url('https://cdn.pixabay.com/photo/2017/06/11/17/13/drone-2392925_1280.jpg');"></div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="slide-content" style="background-image: url('https://images.unsplash.com/photo-1515405969538-5642ed9d0cc4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');"></div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="slide-content" style="background-image: url('https://images.unsplash.com/photo-1622048982661-af7d1bdff6c3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');"></div>
      </SwiperSlide>
      <div class="container overlay-content position-absolute">
        <div data-aos="zoom-in">
          <h1>{{ $t('home.slogan') }}</h1>
          <p class="text-muted mb-0">{{ $t('home.tech') }}</p>
          <RouterLink to="/products" class="btn btn-outline-dark rounded-1 mt-3">{{ $t('common.buyNow') }}</RouterLink>
        </div>
      </div>
      <div class="mask position-absolute"></div>
    </Swiper>
  </div>
  <div class="container">
    <div class="row mt-3">
      <div class="col-md-4 mt-md-4">
        <div class="card border-0 mb-4">
          <div class="card-img">
            <img src="@/assets/images/homepage/card1.jpg" class="card-img-top rounded-0" alt="..." data-aos="fade-up"/>
          </div>
          <div class="card-body text-center mt-2" data-aos="zoom-in">
            <h4>{{ $t('features.record') }}</h4>
            <div class="d-flex justify-content-between">
              <p class="card-text text-muted mb-0 text-start">
                {{ $t('features.recordDesc') }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mt-md-4">
        <div class="card border-0 mb-4">
          <div class="card-img">
            <img src="@/assets/images/homepage/card2.jpg" class="card-img-top rounded-0" alt="..." data-aos="fade-up"/>
          </div>
          <div class="card-body text-center mt-2" data-aos="zoom-in">
            <h4>{{ $t('features.agriculture') }}</h4>
            <div class="d-flex justify-content-between">
              <p class="card-text text-muted mb-0 text-start">
                {{ $t('features.agricultureDesc') }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mt-md-4">
        <div class="card border-0 mb-4">
          <div class="card-img">
            <img src="@/assets/images/homepage/card3.jpg" class="card-img-top rounded-0" alt="..." data-aos="fade-up"/>
          </div>
          <div class="card-body text-center mt-2" data-aos="zoom-in">
            <h4>{{ $t('features.rescue') }}</h4>
            <div class="d-flex justify-content-between">
              <p class="card-text text-muted mb-0 text-start">
                {{ $t('features.rescueDesc') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-light mt-3" style="background: linear-gradient(to right, #eceff1, #cfd8dc);">
    <div class="container">
      <div class="row justify-content-center py-5">
        <div class="col-md-6 text-center" data-aos="flip-left">
          <h3>{{ $t('features.app') }}</h3>
          <p class="my-5">“ {{ $t('features.appDesc') }} ”</p>
          <a href="https://www.apple.com/app-store/" type="button" class="btn btn-outline-secondary" target="_blank">
            {{ $t('features.appStore') }} <i class="fa-brands fa-app-store"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <div class="feature row">
      <div class="col-md-6 overflow-hidden p-0">
        <div class="img-container">
          <img src="@/assets/images/homepage/feature1.jpg" alt="" class="img-fluid" data-aos="flip-left">
        </div>
      </div>
      <div class="col-md-4 m-auto" data-aos="flip-left">
        <h4 class="my-4 text-center">{{ $t('features.patrolSystem') }}
          <img src="@/assets/images/layout/new.png" alt="" class="new img-fluid">
        </h4>
        <p class="text-muted text-start">{{ $t('features.patrolSystemDesc') }}</p>
      </div>
    </div>
    <div class="feature row flex-row-reverse mt-4">
      <div class="col-md-6 overflow-hidden p-0">
        <div class="img-container">
          <img src="@/assets/images/homepage/feature2.jpg" alt="" class="img-fluid" data-aos="flip-left">
        </div>
      </div>
      <div class="col-md-4 m-auto" data-aos="flip-left">
        <h4 class="my-4 text-center">{{ $t('features.transportNetwork') }}</h4>
        <p class="text-muted text-start">{{ $t('features.transportNetworkDesc') }}</p>
      </div>
    </div>
  </div>
  <div class="container my-5 position-relative">
    <Swiper class="homePage-Swiper" :slides-per-view="1" :space-between="50" :modules="modules" loop
      navigation :pagination="{ clickable: true }"
      :autoplay="{ delay: 10000, disableOnInteraction: false }" effect="fade">
      <SwiperSlide>
          <video autoplay loop muted playsinline title="" class="slide-grid-content">
            <source
              src="https://cdn.pixabay.com/video/2023/09/24/182082-867762198_large.mp4"
              type="video/mp4; codecs=avc1.4D401E, mp4a.40.2">
          </video>
      </SwiperSlide>
      <SwiperSlide>
          <video autoplay loop muted playsinline title="" class="slide-grid-content">
            <source src="https://cdn.pixabay.com/video/2023/10/12/184734-873923034_large.mp4"
              type="video/mp4; codecs=avc1.4D401E, mp4a.40.2">
          </video>
      </SwiperSlide>
      <SwiperSlide>
          <video autoplay loop muted playsinline title="" class="slide-grid-content">
            <source src="https://videos.pexels.com/video-files/3147227/3147227-uhd_2560_1440_30fps.mp4"
              type="video/mp4; codecs=avc1.4D401E, mp4a.40.2">
          </video>
      </SwiperSlide>
    </Swiper>
    <div class="video-content position-absolute">
      <h2 class="fs-1">{{ $t('features.capture') }}</h2>
      <RouterLink to="/products" class="btn btn-outline-light rounded-1 mt-3">{{ $t('common.buyNow') }}</RouterLink>
    </div>
    <div class="d-flex justify-content-center pt-2">
      <audio controls>
        <source src="@/assets/audio/371.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 80, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 800, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation
})
export default {
  components: { Swiper, SwiperSlide },
  data () {
    return {
      loop: true,
      modules: [Autoplay, EffectFade, Navigation, Pagination]
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

/* Swiper */
.homePage-Swiper {
  max-width: 100%;
  height: 80vh;
  --swiper-navigation-color: #cfd8dc;
  --swiper-pagination-color: #cfd8dc;
}
.slide-content {
  background-size: cover;
  background-position: center;
  /* position: relative; */
  height: 100%;
}
.overlay-content {
  padding: 1%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
}
.mask {
  top: 5%;
  left: 2%;
  right: 2%;
  bottom: 5%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.08);
}
/* Swiper */
/* Video-Swiper */
.slide-grid-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video-content {
  padding: 1%;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  color: #cfd8dc;
}
/* Video-Swiper */
/* card */
.card-img {
  overflow: hidden;
}
.card-img-top {
  display: block;
  max-width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}
.card:hover .card-img-top {
  transform: scale(1.25);
}
/* card */
/* feature */
.overflow-hidden {
  overflow: hidden;
}
.img-container {
  position: relative;
}
.feature img {
  transition: transform 0.3s ease-in-out;
}
.feature img:hover {
  transform: scale(1.25);
}
/* feature */

@media (max-width: 767px) {
  .homePage-Swiper {
    height: 65vh;
  }
  .overlay-content {
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}
  .video-content h2{
    font-size: 21px !important;
  }
  .card{
    margin-top: 1%;
  }
}

</style>
