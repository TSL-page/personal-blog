<script setup>
import { ref, onMounted } from 'vue'
import { getArticleByViewCount } from '@/api/hot'
import dayjs from 'dayjs'

const userArticleList = ref([])

onMounted(async () => {
  try {
    const res = await getArticleByViewCount()
    userArticleList.value = res.data.data
  } catch (error) {
    console.error('获取热门文章失败:', error)
  }
})
</script>

<template>
  <div class="hot-container">
    <div class="article-box" v-for="item in userArticleList" :key="item.articleId">
      <h3 class="article-title">{{ item.title }}</h3>
      <div class="article-content" v-html="item.content"></div>
      <div class="article-meta">
        <span>阅读量：{{ item.viewCount }}次</span>
        <span>发布时间：{{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
    </div>
    <div v-if="!userArticleList.length" class="empty-tip">暂无热门文章数据</div>
  </div>
</template>

<style lang="scss" scoped>
.hot-container {
  padding: 20px;
  
  .article-box {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 18px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  .article-title {
    margin: 0 0 12px 0;
    color: #2c3e50;
    font-size: 1.2em;
  }

  .article-content {
    margin-bottom: 12px;
    color: #666;
    line-height: 1.6;
    min-height: 60px;
  }

  .article-meta {
    color: #999;
    font-size: 0.9em;
    display: flex;
    gap: 20px;
  }

  .empty-tip {
    text-align: center;
    color: #999;
    padding: 20px;
  }
}
</style>