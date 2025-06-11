<script setup>
import banner1 from '@/assets/frontlayout/banner1.png'
import banner2 from '@/assets/frontlayout/banner2.png'
import banner3 from '@/assets/frontlayout/banner3.png'
import banner4 from '@/assets/frontlayout/banner4.png'
import banner5 from '@/assets/frontlayout/banner5.png'
import banner6 from '@/assets/frontlayout/banner6.png'
const localImages = [banner1, banner2, banner3, banner4, banner5, banner6]
</script>

<template>
  <div class="banner-container">
    <el-carousel 
      height="400px" 
      autoplay 
      interval="2000"
      indicator-position="inside"
      arrow="always"
    >
      <el-carousel-item v-for="(item, index) in 6" :key="index">
        <img 
          :src="localImages[index]" 
          alt="轮播图" 
          class="carousel-img"
        >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="scss" scoped>
.banner-container {
  width: 80%;
  height: 45%;

}

.carousel-img {
  width: 100%;
  height: 90%;
  object-fit: cover;
}
</style>