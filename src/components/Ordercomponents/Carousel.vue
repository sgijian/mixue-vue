<!-- Carousel.vue -->
<template>
    <div class="carousel">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" alt="carousel image" class="carousel-image" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [
          require('../../../public/t11.jpg'),
          require('../../../public/t12.jpg'),
          require('../../../public/t14.jpg'),
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .carousel {
    margin-bottom: 16px;
  }
  
  .carousel-image {
    width: 100%;
    height: auto;
    display: block;
  }
  </style>