<script setup>
import { ref } from 'vue'
import { editCategory, addCategory } from  '@/api/category'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  categoryName: '',
  categoryId: 8,
  description: '',
  parentId: null,
  sortOrder: null,
})

const emit = defineEmits(['success'])
const onSubmit = async () => {
  const isEdit = formModel.value.categoryId
  if (isEdit) {
    console.log(formModel.value.categoryId);
      await editCategory(formModel.value)
    ElMessage.success('编辑成功')
  }
  else {
    const addData = { ...formModel.value }
    delete addData.categoryId
    await addCategory(addData)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}


const open = (row = {}) => {
  dialogVisible.value = true
  formModel.value.categoryName = row.categoryName || ''
  formModel.value.categoryId = row.categoryId || ''
  formModel.value.description = row.description || ''
}
defineExpose({
  open
})

</script>

<template>
  <el-dialog v-model="dialogVisible" width="50%" :title="formModel.categoryId ? '编辑分类' : '添加分类'">
    <el-form ref="formRef" label-width="100px" style="padding-right: 30px; text-align: left;">
      <el-form-item label="分类名称" prop="categoryName">
        <el-input v-model="formModel.categoryName" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <!-- 添加 v-if 控制分类ID输入框仅编辑时显示 -->
      <el-form-item v-if="formModel.categoryId" label="分类Id" prop="categoryId">
        <el-input v-model="formModel.categoryId" placeholder="请输入分类Id"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="formModel.description" placeholder="请输入分类描述"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>