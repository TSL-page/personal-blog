<script setup>
import { ref, onMounted } from 'vue'
import { getCommentCount, getArticleCount, getActiveUser, getNewArticleCount } from '@/api/dataView'

// 定义响应式变量存储评论总数
const commentCount = ref(0)
const articleCount = ref(0)
const activeUser = ref(0)

// 获取评论总数的函数
const getCommentCount1 = async () => {
  const res = await getCommentCount()
  commentCount.value = res.data.data
}

const getArticleCount1 = async () => {
  const res = await getArticleCount()
  articleCount.value = res.data.data
}

const getActiveUser1 = async () => {
  const res = await getActiveUser()
  activeUser.value = res.data.data
}


onMounted(async () => {
  getCommentCount1()
  getArticleCount1()
  getActiveUser1()
})
</script>

<template>
  <div class="container">
    <div class="content">
      <h3>总评论数</h3>
      <p class="number">{{ commentCount }}</p>
    </div>
    <div class="content">
      <h3>总文章数</h3>
      <p class="number">{{ articleCount }}</p>
    </div>
    <div class="content">
      <h3>总用户数</h3>
      <p class="number">{{ activeUser }}</p>
    </div>
  </div>
</template>

  <style scoped lang="scss">
    .container {
      display: flex;
      width: 90%;
      margin: 0 0 0 20px;
      .content {
        display: flex;
        margin:0 30px 0 20px ;
        h3 {
          font-size: 18px;
          color: white;
          margin-right: 10px;
        }

        .number {
          width: 50px;
          background-color: white;
          text-align: center;
        }
      }
    }
  </style>
