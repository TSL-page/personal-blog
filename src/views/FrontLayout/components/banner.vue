<script setup>
</script>

<template>
  <div class="banner-container">
    <el-carousel 
      height="400px" 
      autoplay 
      interval="3000"
      indicator-position="outside"
      arrow="always"
    >
      <el-carousel-item v-for="(item, index) in 3" :key="index">
        <img 
          :src="`https://picsum.photos/1920/400?random=${index}`" 
          alt="轮播图" 
          class="carousel-img"
        >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="scss" scoped>
.banner-container {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover; // 确保图片填满容器
}
</style>