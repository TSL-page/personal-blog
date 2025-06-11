<script setup>
import { ref, onMounted } from 'vue'
import { getCommentByUserId, getCommentByArticleId, deleteComment, commentReview } from '@/api/comments'  // 新增导入文章ID查询API
import { formatTime } from '@/utils/format.js'
import { ElMessage, ElMessageBox } from 'element-plus'


const searchParams = ref({
  targetUserId: '',
  pagenum: 1,
  pagesize: 5,
  order_key: 1
})
const commentList = ref([])
const total = ref(0)
const loading = ref(false)

const showAuditDialog = ref(false)
const currentAuditComment = ref(null)
// 获取评论数据
const fetchComments = async () => {
  const { targetUserId, articleId } = searchParams.value
  if (!targetUserId && !articleId) {
    ElMessage.warning('请输入目标用户ID或文章ID')
    return
  }
  
  loading.value = true
  try {
    let res
    if (articleId) {
      res = await getCommentByArticleId(
        articleId, 
        searchParams.value.pagenum, 
        searchParams.value.pagesize, 
        searchParams.value.order_key
      )
    } else {
      res = await getCommentByUserId(
        targetUserId, 
        searchParams.value.pagenum, 
        searchParams.value.pagesize, 
        searchParams.value.order_key
      )
    }
    commentList.value = res.data.list.length ? res.data.list : [{ content: '无匹配评论', commentId: '-', articleId: '-', comstatus: '-', createdAt: '-' }]
    total.value = res.data.total
  } catch (err) {
    ElMessage.error('查询失败，请检查输入是否正确')
    commentList.value = []
  } finally {
    loading.value = false
  }
}

// 搜索操作
const onSearch = () => {
  searchParams.value.pagenum = 1
  fetchComments()
}

// 重置搜索
const resetSearch = () => {
  searchParams.value.targetUserId = ''
  searchParams.value.articleId = '' 
  searchParams.value.pagenum = 1   
  commentList.value = []  
}

// 删除操作
const handleDelete = async(row) => {
  try {
    await ElMessageBox.confirm('确定要删除这条评论吗？删除后无法恢复', '删除确认', { type: 'warning' })
    await deleteComment(row.commentId)
    ElMessage.success('删除成功')
    fetchComments()
  } catch (err) {
    if (err === 'cancel') {
      return
    }
    ElMessage.error('删除失败')
  }
}
// 分页事件
const onSizeChange = (size) => {
  searchParams.value.pagesize = size
  fetchComments()
}
const onCurrentChange = (page) => {
  searchParams.value.pagenum = page
  fetchComments()
}

onMounted(() => {  })



const handleAudit = (row) => {
  currentAuditComment.value = { ...row }
  showAuditDialog.value = true
}


const handleAuditSave = async() => {
  if (!currentAuditComment.value?.commentId) return
  try {
    await commentReview(currentAuditComment.value.commentId, currentAuditComment.value.comstatus)
    ElMessage.success('审核状态更新成功')
    showAuditDialog.value = false
    fetchComments()
  } catch (err) {
    ElMessage.error('审核状态更新失败')
  }
}
</script>

<template>
  <div class="container">
    <div class="title">
      <h4>评论管理</h4>
    </div>

    <el-form inline class="search-form">
      <el-form-item label="文章ID">
        <el-input v-model="searchParams.articleId" placeholder="请输入需要查询的文章ID"></el-input>
      </el-form-item>
      <el-form-item label="目标用户ID">
        <el-input v-model="searchParams.targetUserId" placeholder="请输入要查询的用户ID"></el-input> <!-- 启用输入 -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button> <!-- 启用点击 -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetSearch">重置</el-button> <!-- 启用点击 -->
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="commentList" border style="margin-top: 20px;">
      <el-table-column label="评论内容" prop="content" align="left"></el-table-column>
      <el-table-column label="评论编号" prop="commentId" align="center"></el-table-column>
      <el-table-column label="所属文章编号" prop="articleId" align="center"></el-table-column>
      <el-table-column label="评论状态" prop="comstatus" align="center">
        <template #default="{ row }">
          {{ row.comstatus || '未' }}
        </template>
      </el-table-column>
      <el-table-column label="评论时间" align="center">
        <template #default="{ row }">
          {{ formatTime(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="primary" @click="handleAudit(row)">审核</el-button>
          <el-button type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页组件（仅当有数据时显示） -->
    <el-pagination v-if="total > 0" v-model:current-page="searchParams.pagenum"
      v-model:page-size="searchParams.pagesize" :total="total" @size-change="onSizeChange"
      @current-change="onCurrentChange" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[5, 10, 15]"
      style="margin-top: 20px;"></el-pagination>
    <el-dialog v-model="showAuditDialog" title="评论审核" width="50%">
      <el-form :model="currentAuditComment" label-width="80px">
        <el-form-item label="评论内容">
          <el-input v-model="currentAuditComment.content" disabled />
        </el-form-item>
        <el-form-item label="评论状态">
          <el-select v-model="currentAuditComment.comstatus" placeholder="请选择审核状态">
            <el-option label="approved" value="approved" />
            <el-option label="rejected" value="rejected" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAuditDialog = false">取消</el-button>
          <el-button type="primary" @click="handleAuditSave">保存审核</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
  
  .search-form {
    margin-bottom: 20px;
    padding: 15px;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
}
</style>