<script setup>
import { getCategoriesAll, deleteCategory } from '@/api/category'
import { ref, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import categoryEdit from './components/categoryEdit.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
const dialog = ref(false)

const categoryList = ref([])
const loading = ref(false)

const tableHeaders = [
  { title: '分类名称', span: 2 },
  { title: '分类ID', span: 2 },
  { title: '描述', span: 5 },
  { title: '创建时间', span: 5 },
  { title: '更新时间', span: 5 },
  { title: '操作', span: 4 }
]
const formatDate = (timeStr) => {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getCategoryList = async () => {
  loading.value = true
  try {
    const res = await getCategoriesAll()
    categoryList.value = res.data.data || []
  } catch (error) {
    console.error('获取文章分类失败:', error)
  } finally {
    loading.value = false
  }
}
// 删除
const handleDelete = async (row) => {
  await ElMessageBox.confirm('是否删除该分类?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteCategory(row.categoryId)
    getCategoryList()
  }).catch(() => {
    ElMessageBox.close()
  })
}

// 编辑按钮操作
const handleEdit = (row) => {
  dialog.value.open(row)
}

//  添加按钮操作
const handleAdd = () => {
  dialog.value.open()
}

onMounted(() => {
  getCategoryList()
})
</script>

<template>
  <div class="stable">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h4>文章类别管理</h4>
      <el-button type="primary" @click="handleAdd()">添加分类</el-button>
    </div>
    <div v-if="loading" class="loading-tip">加载中...</div>
    <div v-else class="category-list">
      <div v-if="!categoryList.length" class="empty-tip">暂无文章分类数据</div>
      <el-table v-else :data="categoryList" align="left" header-align="center" border
        style="width: 100%; margin-top: 15px;" :header-cell-style="{ background: '#f8f9fa', fontWeight: '600' }">
        <el-table-column v-for="(item, index) in tableHeaders" :key="index" :label="item.title" :width="index === 0 ? '150px' :  // 分类名称
          index === 1 ? '120px' :   // 分类ID
            index === 2 ? '340px' :  // 描述
              index === 3 ? '250px' :  // 创建时间
                index === 4 ? '250px' :  // 更新时间
                  '120px'">
          <template #default="{ row }">
            <template v-if="item.title === '操作'">
              <div class="operation-col">
                <el-tooltip content="编辑" placement="top">
                  <el-button :icon="Edit" circle plain type="primary" @click="handleEdit(row)"></el-button>
                </el-tooltip>
                <el-tooltip content="删除" placement="top">
                  <el-button :icon="Delete" circle plain type="danger" @click="handleDelete(row)"></el-button>
                </el-tooltip>
              </div>
            </template>
            <template v-else-if="item.title === '创建时间' || item.title === '更新时间'">
              {{ formatDate(row[item.title === '创建时间' ? 'createTime' : 'updateTime']) }}
            </template>
            <template v-else>
              {{ row[item.title === '分类名称' ? 'categoryName' : item.title === '分类ID' ? 'categoryId' : 'description'] ||
              '无描述信息' }}
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <categoryEdit ref="dialog" @success="getCategoryList" />
  </div>
</template>

<style lang="scss" scoped>
.loading-tip {
  padding: 20px;
  text-align: center;
  color: #666;
}

.empty-tip {
  padding: 20px;
  text-align: center;
  color: #999;
}

.operation-col {
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
}


.category-list {
  padding: 0;
}

.el-table {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
  box-sizing: border-box;

  .el-table__row {
    td {
      padding: 15px 0;
    }
  }
}
</style>