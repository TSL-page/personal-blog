<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { editArticle,addArticle,getArticleDetail } from '@/api/article'
import { ElMessage } from 'element-plus'
import channelSelect from  './channelSelect.vue'

// 控制抽屉的显示隐藏
const visiableDrawer = ref(false)

// 默认表单数据
const defaultForm = {
  title: '',
  articleId: '', 
  cover_img: '',
  content: '',
  artstatus: '' ,
  categoryId: ''
}

const formModel = ref({ ...defaultForm })
const editorRef = ref()

const open = async (row) => {
  visiableDrawer.value = true
  if (row && row.articleId) {
    // 编辑操作
    formModel.articleId = row.articleId
    try {
      const res = await getArticleDetail(row.articleId)
      if (res.data && res) {
        formModel.value = { ...defaultForm, ...res.data.data }
        imgUrl.value = baseURL + formModel.value.cover_img
        const file = await imageUrlToFileObject(imgUrl.value, formModel.value.cover_img)
        formModel.value.cover_img = file
      } else {
        console.error('No data received from editArticle')
      }
    } catch (error) {
      console.error('Error fetching article details:', error)
    }
    
  } else {
    // 添加操作
    formModel.value = { ...defaultForm }
    imgUrl.value = ''
  }
}


// 提交表单
const emit = defineEmits(['success'])
const onPublish = async (artstatus) => {
  formModel.value.artstatus = artstatus
  if (formModel.value.articleId) {
    // 编辑操作
    await editArticle({ ...formModel.value })
    ElMessage.success('编辑成功')
    visiableDrawer.value = false
    emit('success', 'edit')
  } else {
    // 添加操作
    await addArticle({ ...formModel.value })
    ElMessage.success('添加成功')
    visiableDrawer.value = false
    emit('success', 'add')
  }
}
defineExpose({
  open
})
</script>

<template>
  <el-drawer v-model="visiableDrawer" direction="rtl" size="50%" :title="formModel.articleId ? '编辑文章' : '添加文章'">
    <el-form>
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item v-model="formModel.categoryId" label="文章分类" prop="categoryId">
        <channel-select v-model="formModel.categoryId" width="100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章记录" prop="cover_img">
        <el-upload class="avatar-uploader" :show-file-list="false" :auto-upload="false" :on-change="onSelectFile">
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content" style="width:600px; height:150px;margin-bottom:71px">
        <quill-editor ref="editorRef" v-model:content="formModel.content" content-type="html" theme="snow"
          style="width:600px"></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">已发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
        <el-button type="info" @click="onPublish('待审核')">待审核</el-button>
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


</style>