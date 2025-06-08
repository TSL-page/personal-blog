<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleDetail } from '@/api/article'
import { getCommentByArticleId } from '@/api/comments'
const route = useRoute()
const articleId = route.query.id

// 文章数据响应式变量
const article = ref({
  title: '',
  author: '',
  createTime: '',
  content: ''
})

// 评论相关状态
const comments = ref([])  // 存储当前页评论
const totalComments = ref(0)  // 总评论数
const currentPage = ref(1)  // 当前页码
const pageSize = ref(10)  // 每页显示数量

// 获取文章详情
const fetchArticle = async () => {
  try {
    const res = await getArticleDetail(articleId)
    article.value = res.data.data
    console.log(res.data.data);
    
  } catch (err) {
    console.error('获取文章失败:', err)
  }
}

// 获取评论（携带分页参数）
const fetchComments = async (page = currentPage.value, size = pageSize.value) => {
  try {
    const res = await getCommentByArticleId(articleId, page, size)  // 假设API支持三个参数：文章ID、页码、每页数量
    comments.value = res.data.data.list
    totalComments.value = res.data.data.total  // 假设后端返回总数量
  } catch (err) {
    console.error('获取评论失败:', err)
    comments.value = []
  }
} 

// 分页切换事件
const handleCurrentChange = (page) => {
  currentPage.value = page
  fetchComments(page)
}

// 组件挂载后执行请求（初始页1，每页10条）
onMounted(() => {
  fetchArticle()
  fetchComments(1, 10)
})
</script>

<template>
  <div class="article-container">
    <h1 class="article-title">{{ article.title }}</h1>
    <div class="article-content" v-html="article.content"></div>

    <!-- 评论列表 -->
    <div class="comments-section" v-if="comments.length">
      <h3>评论（共{{ totalComments }}条）</h3>
      <div class="comment-item" v-for="comment in comments" :key="comment.id">
        <div class="comment-author">{{ comment.author }}</div>
        <div class="comment-content">{{ comment.content }}</div>
        <div class="comment-time">{{ comment.createTime }}</div>
      </div>
    </div>
    <div v-else class="no-comments">暂无评论</div>

    <!-- 分页组件 -->
    <el-pagination
      v-if="totalComments > pageSize"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalComments"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
    ></el-pagination>
  </div>
</template>

<style scoped>
.article-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.article-title {
  color: #2c3e50;
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.article-meta {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  display: flex;
  gap: 1.5rem;
}

.article-content {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #34495e;
}

.article-content p {
  margin-bottom: 1.5rem;
}

.comments-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e7e9eb;
}

.comment-status {
  margin-bottom: 1.2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.comment-author {
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.comment-content {
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 0.3rem;
}

.comment-time {
  color: #7f8c8d;
  font-size: 0.85rem;
}

.no-comments {
  color: #7f8c8d;
  text-align: center;
  padding: 1rem;
}
</style>