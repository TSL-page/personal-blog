<script setup>
import bar from "./components/bar.vue"
import pie from "./components/pie.vue"
import commentCount from "./components/commentCount.vue"
import weekUser from "./components/weekUser.vue"
import weekArticle from "./components/weekArticle.vue"
</script>

<template>
  <div class="stable">
    <div class="total">
      <commentCount />
    </div>
    <div class="image">
      <bar />
      <pie />
    </div>
    <div class="week">
      <weekUser />
      <weekArticle />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stable {
  width: 100%;
  height: 100%;
  background-image: url('../../../../assets/databj.png');
  padding: 10px 0 10px 0;
  .image {
      display: flex;
  }
}

.week {
  display: flex;

}


</style>