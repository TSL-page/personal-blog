<script setup>
import { ref, onMounted } from 'vue'
import { getUserMessage, updateUserMessage } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatTime } from '@/utils/format'
const formModel = ref({})
const UserMessageList = async () => {
  const res = await getUserMessage()
  formModel.value = res.data.data || {}
}
const handleSubmit = async () => {
  try {
    if (!formModel.value) {
      ElMessage.error('用户信息未加载，请刷新页面')
      return
    }
    await ElMessageBox.confirm(
      '确认更新信息吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    const submitData = {
      username: formModel.value.username,
      password: formModel.value.password,
      email: formModel.value.email,
      avatar: formModel.value.avatar,
      real_name: formModel.value.realName
    }
    const res = await updateUserMessage(submitData)
    if (res.data?.code === '200') {
      formModel.value = { ...formModel.value, ...res.data.data }
      ElMessage.success('信息更新成功')
    } else {
      ElMessage.error(res.data?.message || '更新失败，请重试')
    }
  } catch (err) {
    if (err === 'cancel' || err === 'abort') {
      ElMessage.info('已取消更新')
    } else {
      ElMessage.error('网络请求失败，请检查网络连接')
    }
  }
} 

onMounted(() => {
  UserMessageList()
})
</script>

<template>
  <div class="stable">
    <el-form label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="formModel.username"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="formModel.realName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formModel.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formModel.password" type="password" placeholder="未设置密码"></el-input>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-input v-model="formModel.role" disabled></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-input :value="formatTime(formModel.registerTime)" disabled></el-input>
      </el-form-item>
      <el-form-item label="最后登录时间">
        <el-input :value="formatTime(formModel.lastLoginTime, 'YYYY-MM-DD HH:mm:ss')" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户状态">
        <el-input v-model="formModel.status" disabled></el-input>
      </el-form-item>
      <el-form-item>
       <el-button type="primary" @click="handleSubmit">修改信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.stable {
  padding: 20px;
  max-width: 600px;
  margin: 0 0;
}
</style>