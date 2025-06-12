<script setup>
import { useRouter } from 'vue-router' 
const router = useRouter()
import { ref, onMounted, onUnmounted } from "vue"
import { getUserArticle, addArticle, deleteArticle, articleUpdata } from "@/api/frontUser"
import { getUserMessage } from '@/api/user'
import { getArticleDetail } from '@/api/article'
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from "dayjs"
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
const userArticleList = ref([])
const isAddDialogVisible = ref(false)
const userInfo = ref({})
const currentTime = ref('')
const articleFormRef = ref(null)
const articleForm = ref({
  title: '',
  content: '',
  userId: 1,
  isTop: 0,
  categoryId: 2,
  artstatus: 'pending',
})
const editMode = ref('add')
const currentEditArticle = ref(null)
let timeTimer = null
// 获取用户文章
const getArticle = async() => {
    const res = await getUserArticle()
    userArticleList.value = res.data.data
}

// 保存
const handleSaveArticle = async() => {
    try {
      articleForm.value.userId = userInfo.value.userId
      let res
      if(editMode.value === 'edit') {
        res = await articleUpdata(articleForm.value)
      } else {
        const { title, content, userId, isTop, categoryId, artstatus } = articleForm.value
        res = await addArticle({ title, content, userId, isTop, categoryId, artstatus })
      }
      if (res.data.code === "200") {
        ElMessage.success('保存成功')
        await getArticle()
        articleForm.value = {
          title: '',
          content: '',
          userId: 1,
          isTop: 0,
          categoryId: 2,
          artstatus: 'pending'
        }
        isAddDialogVisible.value = false
        editMode.value = 'add'
      } else {
        ElMessage.error('保存失败：' + res.data.message)
      }
    } catch (error) {
      ElMessage.error('保存失败：' + (error.response?.data?.message || error.message))
    }
}

// 编辑
const handleEditArticle = async(articleId) => { 
  editMode.value = 'edit'
  isAddDialogVisible.value = true
  const res = await getArticleDetail(articleId)
  currentEditArticle.value = res.data.data
  articleForm.value = {
    title: res.data.data.title,
    content: res.data.data.content,
    articleId: res.data.data.articleId,
    isTop: res.data.data.isTop,
    categoryId: res.data.data.categoryId,
    artstatus: res.data.data.artstatus,
  }
}

// 删除
const handleDeleteArticle = async(articleId) => {
    try {
      await ElMessageBox.confirm('确定要删除该文章吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      const res = await deleteArticle(articleId)
      if(res.data.code === "200") {
        ElMessage.success('删除文章成功')
        await getArticle()
      }
    } catch (error) {
      console.error('删除文章失败：', error)
    }
}

onMounted( async () => {
  const message = await getUserMessage()
  userInfo.value = message.data.data
  getArticle()
  timeTimer = setInterval(() => {
    currentTime.value = dayjs().format('YYYY-MM-DD dddd HH:mm:ss')
  }, 1000)
})

onUnmounted(() => {
  if (timeTimer) clearInterval(timeTimer)
})
</script>

<template>
  <div class="info">
    <div class="time">{{ currentTime }}</div>
    <el-button class="add" type="primary" @click="() => {
      isAddDialogVisible = true
      editMode = 'add'
      articleForm.value = {
        title: '',
        content: '',
        userId: 1,
        isTop: 0,
        categoryId: 2,
        artstatus: 'pending'
      };
    }">发布文章</el-button>
  </div>
  <div class="content">
    <el-dialog v-model="isAddDialogVisible" :title="editMode ==='add' ? '新增文章' : '编辑文章' " :width="600"
      :before-close="(done) => { isAddDialogVisible = false; done() }">
      <div class="dialog-content">
        <el-form ref="articleFormRef" :rules="rules" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="articleForm.title" placeholder="请输入文章标题"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input type="textarea" v-model="articleForm.content" placeholder="请输入文章内容" rows="8"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isAddDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveArticle">保存</el-button>
        </span>
      </template>
    </el-dialog>
    <div class="article-container" v-for="item in userArticleList" :key="item.articleId">
      <div class="button" style="margin-left: 48%;">
        <el-button @click="handleEditArticle(item.articleId)" type="primary">编辑</el-button>
        <el-button @click="handleDeleteArticle(item.articleId)" type="danger">删除</el-button>
        <el-button type="primary"
          @click="router.push({ path: '/frontLayout/articleDetail', query: { id: item.articleId } })">查看详情</el-button>
      </div>
      <div class="control" v-if="item.artstatus === 'published'">
        <h3>{{ item.title }}</h3>
        <div class="article-content">
          <p v-html="item.content"></p>
        </div>
        <div class="article-meta">
          <span>发布时间：{{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
          <span>更新时间：{{ dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
          <span>阅读量：{{ item.viewCount }}次</span>
        </div>
      </div>
      <div class="control" v-if="item.artstatus === 'reject'" style="margin-top: 60px; color: red;">
        抱歉，您发布文章的审核未通过,请检查文章是否符合发布要求......
      </div>
      <div class="control" v-if="item.artstatus === 'pending'" style="margin-top: 60px; color: blue;">
        您发布的文章正在审核中......请耐心等待审核结果
      </div>
    </div>
    <div v-if=" !userArticleList.length" class="empty-tip">暂无文章数据</div>
    </div>
</template>

<style lang="scss" scoped>
.info {
  display: flex;
  .time {
    width: 1200px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    background-image: linear-gradient(90deg, #2196F3, #4CAF50, #ff0000, #4B0082); 
    background-size: 400% 400%;
    -webkit-background-clip: text; 
    background-clip: text;
    color: transparent;
    animation: textFlow 3s linear infinite;
  }
}

@keyframes textFlow {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.content {
  display: flex;
  flex-wrap: wrap;
  background-image: url('../../../assets/frontlayout/myArticle.png');
  background-size: cover;
  
  .add {
    position: absolute;
    top: 50%;
    right: 50px;
    z-index: 999;
  }
}

.article-container {
  padding: 10px 5px;
  width: 37%;
  border-radius: 5px;
  margin: 1% 3% 2% 6%;
  position: relative;
  overflow: hidden;
  z-index: 999;

  h3 {
   font-size: 20px;
   color: #2196F3;
  }
}

.article-container::before {
  content: "";
  position: absolute;
  top: -1px; 
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(45deg, #2196F3, #4CAF50, red,#4B0082); /* 更鲜明的蓝绿渐变 */
  background-size: 500% 500%;
  z-index: -1;
  animation: borderFlow 2s linear infinite; 
}

@keyframes borderFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.article-container::after {
  content: "";
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  background: #fff;
  border-radius: 4px;
  z-index: -1;
}

.article-meta {
  color: #D2691E;
  font-size: 0.9em;
  margin: 10px 0;
}

.article-meta span {
  margin-right: 20px;
}

.article-content {
  line-height: 1.8;
  color: #333;
  margin-top: 15px;
  word-wrap: break-word;
  word-break: break-all;
}

.empty-tip {
  text-align: center;
  color: #999;
  padding: 20px;
}
</style>