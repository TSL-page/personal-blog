<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleDetail } from '@/api/article'
import { getCommentByArticleId, deleteComment, addComment } from '@/api/comments'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()
// 关键修改：使用 ref 包裹路由参数，保持响应性
const articleId = ref(route.query.id)

// 文章数据响应式变量
const article = ref({
  title: '',
  author: '',
  createTime: '',
  content: ''
})

// 评论相关状态
const comments = ref([])
const totalComments = ref(0)
const currentPage = ref(1)
const pageSize = ref(5)
const orderKey = ref(1)

// 获取文章详情
const fetchArticle = async () => {
  try {
    const res = await getArticleDetail(articleId.value)
    article.value = res.data.data
  } catch (err) {
    console.error('获取文章失败:', err)
  }
}

// 获取评论
const fetchComments = async (pageNum = currentPage.value, size = pageSize.value, key = orderKey.value) => {
  try {
    const res = await getCommentByArticleId(articleId.value, pageNum, size, key)
    comments.value = res.data.list || []
    // 关键修复：从接口响应中获取总评论数并赋值
    totalComments.value = res.data.total || 0  // 假设接口返回字段为 total
  } catch (err) {
    console.error('获取评论失败:', err)
    comments.value = []
    totalComments.value = 0  // 错误时重置总评论数
  }
} 

// 分页切换事件
const handleCurrentChange = (page) => {
  currentPage.value = page
  fetchComments(page)
}

// 组件挂载后执行请求（参数调整为pageNum=1, pageSize=5, order_key=3）
onMounted(() => {
  fetchArticle()
  fetchComments(1, 5, 3)
})

// 新增：时间格式化函数（将 ISO 时间转为 YYYY-MM-DD HH:MM）
const formatTime = (timeStr) => {
  const date = new Date(timeStr)
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-') + ' ' + [
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0')
  ].join(':')
}

const handleDelete = async (commentId) => {
  try {
    // 弹出确认框
    await ElMessageBox.confirm(
      '确定要删除这条评论吗？删除后无法恢复',
      '删除确认',
      { type: 'warning' }
    )
   const res =  await deleteComment(commentId)
    fetchComments(currentPage.value)
    if(res.data.code === "200") {
      ElMessage.success('删除成功')
    }
  } catch (err) {
    if (err.type !== 'cancel') {
      console.error('删除评论失败:', err)
      ElMessage.error('评论删除失败，请重试')
    }
  }
}

// 新增：评论表单数据
const commentForm = ref({
  content: '',
  parentId: 0,
  articleId: articleId.value
})

// 新增：提交评论方法
const submitComment = async () => {
  try {
    if (!commentForm.value.content.trim()) {
      ElMessage.warning('请输入评论内容')
      return
    }
    const res = await addComment(commentForm.value)
    if (res.data.code === '200') {
      ElMessage.success('评论发布成功')
      commentForm.value.content = ''
      fetchComments(currentPage.value)  // 刷新当前页评论
    } else {
      ElMessage.error(res.data.msg || '评论提交失败')
    }
  } catch (err) {
    console.error('新增评论失败:', err)
    ElMessage.error('网络请求失败，请重试')
  }
}
</script>

<template>
  <div class="article-container">
    <h1 class="article-title">{{ article.title }}</h1>
    <div class="article-content" v-html="article.content"></div>

    <!-- 新增评论表单 -->
    <div class="add-comment-section" style="margin: 2rem 0; padding: 1.5rem; border-top: 1px solid #e7e9eb;">
      <h3>发表评论</h3>
      <el-input 
        v-model="commentForm.content" 
        type="textarea" 
        rows="3" 
        placeholder="请输入评论内容"
        style="margin-bottom: 1rem;"
      ></el-input>
      <el-button type="primary" @click="submitComment">提交评论</el-button>
    </div>

    <!-- 评论列表 -->
    <div class="comments-section" v-if="comments.length">
      <div class="comment-item" v-for="comment in comments" :key="comment.commentId">
        <div class="comment-content">{{ comment.content }}</div>
        <div class="comment-createtime">发布时间：{{ formatTime(comment.createdAt) }}</div>
        <div class="comment-updatetime">更新时间：{{ formatTime(comment.updatedAt) }}</div>
        <el-button type="danger" size="large" @click="handleDelete(comment.commentId)" style="margin-top: 0.8rem;">
          删除评论
        </el-button>
      </div>
    </div>
    <div v-else class="no-comments">暂无评论</div>

    <!-- 分页组件 -->
    <el-pagination v-if="totalComments > pageSize" :current-page="currentPage" :page-size="pageSize"
      :total="totalComments" @current-change="handleCurrentChange" layout="prev, pager, next"></el-pagination>
  </div>
</template>

<style scoped>
.article-container {
  max-width: 1200px;
  margin: 30px auto;
  padding: 2rem 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background-image: url('../../../assets/frontlayout/myArticle.png');
    background-size: cover;
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

/* 流动边框样式 */
.comment-item {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  position: relative;
  border: 2px solid transparent; /* 透明原始边框 */
  background: linear-gradient(45deg, #4285f4, #ea4335, #fbbc05, #34a853) border-box; /* 渐变背景覆盖边框区域 */
  animation: borderFlow 3s linear infinite; /* 3秒循环动画 */
  background-size: 200% 200%; /* 扩大背景尺寸实现流动效果 */
}

/* 定义流动动画（背景位置循环移动） */
@keyframes borderFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 可选：鼠标悬停时暂停动画 */
.comment-item:hover {
  animation-play-state: paused;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.add-comment-section {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 1.5rem;
  margin: 2rem 0;
}
</style>

