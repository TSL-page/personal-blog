<script setup>
import { ref, watch, onMounted } from 'vue'
import { getUserMessage } from '@/api/user'
import { ElForm, ElFormItem, ElInput } from 'element-plus' // 按需引入表单组件

// 表单数据模型
const formModel = ref({})

// 用户数据获取
const UserMessageList = async () => {
  const res = await getUserMessage()
  // 假设返回单条用户数据（根据实际接口返回结构调整）
  formModel.value = res.data.data || {}
  console.log('用户数据:', formModel.value)
}

onMounted(() => {
  UserMessageList()
})
</script>

<template>
  <div class="stable">
    <el-form label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="formModel.username" disabled></el-input>
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
        <el-input v-model="formModel.registerTime" disabled></el-input>
      </el-form-item>
      <el-form-item label="最后登录时间">
        <el-input v-model="formModel.lastLoginTime" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户状态">
        <el-input v-model="formModel.status" disabled></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
/* 可选：添加表单样式 */
.stable {
  padding: 20px;
  max-width: 600px;
  margin: 0 0;
}
</style>