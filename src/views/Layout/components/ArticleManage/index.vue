<script setup>
import { ref, watch} from "vue";
import { getArticleList, deleteArticle } from "@/api/article.js";
import { formatTime } from "@/utils/format.js"; // 时间格式化
import { ElMessageBox } from 'element-plus'
import ArticleEdit from "./components/articleEdit.vue";
import channelSelect from "./components/channelSelect.vue";
import { 
  Edit, 
  Delete 
} from "@element-plus/icons-vue";
// 分页
const loading = ref(false) // loading状态
const allArticles = ref([])   // 所有文章
const articleList = ref([])   // 当前页显示的文章
const total = ref(0) // 文章总条数

const articleEditRef = ref(null);
// 定义请求参数对象
const params = ref({
  pagenum: 1, // 当前页
  pagesize: 5, // 当前生效的每页条数
})

// 排序规则
const order_key = ref('1')
// 获取所有文章列表
const getAllArticles = async() => {
  loading.value = true
  const res = await getArticleList({
    order_key:order_key.value
  })
  allArticles.value = res.data.data
  total.value = allArticles.value.length
  setPageData()
  loading.value = false
}
// 每一页
const setPageData = () => {
  const start = (params.value.pagenum - 1) * params.value.pagesize
  const end = params.value.pagenum * params.value.pagesize
  articleList.value = allArticles.value.slice(start, end)
}
// 分页逻辑
const onSizeChange = (size) => {
  // 每页条数变化了，重新渲染
  params.value.pagenum = 1
  params.value.pagesize = size
  setPageData()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  setPageData()
}
getAllArticles()


// 编辑
const onEditarticle = (row) => {
  articleEditRef.value.open(row)
}

// 添加逻辑
const onAddarticle = () => {
  articleEditRef.value.open()
}

// 添加或者编辑的回调
const onSuccess = (type) => {
  if (type === "add") {
    const lastPage = Math.ceil(allArticles.value.length / params.value.pagesize)
    params.value.pagenum = lastPage
    getAllArticles()
  } else {
    setPageData()
  }
}
// 删除
const onDeletearticle = async(row) => {
  await ElMessageBox.confirm('是否删除该文章?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async() => {
    await deleteArticle(row.articleId)
    getAllArticles()
  }).catch(() => {
    ElMessageBox.close()
  })
}

// 监听排序规则变化
watch(order_key, () => {
  getAllArticles()
})



</script>

<template>
  <pageContainer class="container">
    <div class="title">
      <p>文章管理</p>
      <el-button type="primary" class="button" @click="onAddarticle()">添加文章</el-button>
    </div>
    <el-form inline class="top">
      <el-form-item label="文章分类">
        <channelSelect style="width: 240px"></channelSelect>
      </el-form-item>
      <el-form-item label="文章状态">
        <el-select class="select">
          <el-option label="xxx" value="xxx" style="width:240px"></el-option>
          <el-option label="已发布" value="已发布"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="right">
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
      <el-form-item label="排序规则">
        <el-select style="width:110px" v-model="order_key">
          <el-option label=" 时间逆序" value="1"></el-option>
          <el-option label="时间顺序" value="2"></el-option>
          <el-option label="点击次数" value="3"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table class="table" v-loading="loading" :data="articleList" align="center">
      <el-table-column label="文章标题" align="center">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="文章分类" prop="categoryId" align="center"></el-table-column>
      <el-table-column label="发布时间" prop="createdAt" align="center">
        <template #default="{ row }">
          {{ formatTime(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template #default="{ row }">
          {{ formatTime(row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column label="文章状态" prop="artstatus" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-tooltip content="编辑" placement="top">
            <el-button circle plain type="primary" :icon="Edit" @click="onEditarticle(row)"></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button circle plain type="danger" :icon="Delete" @click="onDeletearticle(row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="params.pagenum" v-model:page-size="params.pagesize" @size-change="onSizeChange"
      @current-change="onCurrentChange" :total="total" class="pagination" background="true"
      layout="total, sizes, prev, pager, next, jumper" :page-sizes="[3, 5, 7, 10]"
      style="margin-top: 20px; jusify-content: flex-end;">
    </el-pagination>
    <!--编辑按钮抽屉 -->
    <ArticleEdit ref="articleEditRef" @success="onSuccess"></ArticleEdit>
  </pageContainer>
</template>

<style lang="scss" scoped>
  .container {
    background-color: #F5F5F5;
    .title {
      width: 100%;
      display: flex;
      padding: 2% 0;
      margin: 0 0 2% 0;
      border-bottom: 1px solid #ccc;
      p {
        margin: 0 2%;
      }
      .button {
        margin-left: auto;
        margin-right: 2%;
      }
    }
    .top {
      width: 100%;
      margin: 2% 0 2% 2%;
      border-bottom: 1px solid #ccc;
      .select {
        width: 200px;
        margin: 0 2% 0 0; 
      }
      .right {
        margin: -2% 9% 0 9%;
      }
    }
    .table {
      width: 95%;
      margin: 0 2% ;
    }
    .pagination {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
</style>