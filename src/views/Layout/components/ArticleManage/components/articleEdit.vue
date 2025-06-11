<script setup>
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { editArticle,addArticle,getArticleDetail } from '@/api/article'
import { ElMessage } from 'element-plus'
import channelSelect from  './channelSelect.vue'


const visiableDrawer = ref(false)
const form = ref(null)

const defaultForm = {
  articleId: 0, 
  title: "",
  content: "",
  status: '',
  categoryId: 2,
  isTop: 1,
  viewCount: 500,
  userId: 2,
}

const formModel = ref({ ...defaultForm })
const editorRef = ref()
const emit = defineEmits(['success'])
const open = async (row) => {
  visiableDrawer.value = true;
  if (row && row.articleId) {
    const currentArticleId = row.articleId;
    try {
      const res = await getArticleDetail(currentArticleId);
      if (res.data.data && res) {
        const { status, comments, artstatus, ...validData } = res.data.data;
        formModel.value = {
          ...defaultForm,
          ...validData,
          articleId: currentArticleId, 
        };
      } else {
        console.error('No data received from editArticle');
      }
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  } else {
    formModel.value = { ...defaultForm };
  }
}

const rules = ref({
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
  ]
})
const onPublish = async (status) => {
  try {
    const validateResult = await form.value?.validate()
    if (!validateResult) return
    formModel.value.artstatus = status
    if (formModel.value.articleId) {
      await editArticle({ ...formModel.value });
      ElMessage.success('编辑成功');
    } else {
      await addArticle({ ...formModel.value });
      ElMessage.success('添加成功');
    }
    visiableDrawer.value = false;
    emit('success', formModel.value.articleId ? 'edit' : 'add');
  } catch (error) {
    ElMessage.error(`操作失败：${error.response?.data?.message || error.message}`);
  }
}
defineExpose({
  open
})
</script>

<template>
  <el-drawer v-model="visiableDrawer" direction="rtl" size="50%" :title="formModel.articleId ? '编辑文章' : '添加文章'">
    <el-form ref="form" :model="formModel" :rules="rules">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item v-model="formModel.categoryId" label="文章分类" prop="categoryId">
        <channel-select v-model="formModel.categoryId" width="100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章内容" prop="content" style="width:100%; height:300px;margin-bottom:20px">
        <quill-editor ref="editorRef" v-model:content="formModel.content" content-type="html" theme="snow" style="width:100%"></quill-editor>
      </el-form-item>
      <el-form-item class="bottom">
        <el-button type="primary" @click="onPublish('published')">通过</el-button>
        <el-button type="info" @click="onPublish('reject')">拒绝</el-button>
        <el-button type="info" @click="onPublish('pending')">搁置</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 200px;
  }
}

.bottom {
  margin: 100px 0 0 250px;
}


</style>