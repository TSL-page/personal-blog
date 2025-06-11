<script setup>
import { ref, onMounted } from 'vue'
import { getUserMessage, updateUserMessage } from '@/api/user'
import { ElMessage } from 'element-plus'


const userInfo = ref({
  userId: '',
  username: '',
  password: '',
  email: '',
  role: '',
  realName: '',
  avatar: '' 
})



const handleSubmit = async() => {
  try {
    if (!userInfo.value) {
      ElMessage.error('用户信息未加载，请刷新页面')
      return
    }

    const submitData = {
      username: userInfo.value.username,
      password: userInfo.value.password,
      email: userInfo.value.email,
      avatar: userInfo.value.avatar,
      real_name: userInfo.value.realName
    }

    const res = await updateUserMessage(submitData)
    if (res.data?.code === '200') {
      userInfo.value = { ...userInfo.value, ...res.data.data }
      ElMessage.success('信息更新成功')
    } else {
      ElMessage.error(res.data?.message || '更新失败，请重试')
    }
  } catch (err) {
    ElMessage.error('网络请求失败，请检查网络连接')
    console.error('更新接口异常:', err)
  }
} 

onMounted(async () => {
  try {
    const res = await getUserMessage()
    if (res.data?.data) {
      userInfo.value = { 
        ...userInfo.value,
        ...res.data.data
      }
    } else {
      ElMessage.warning('用户信息为空，可能未登录')
    }
  } catch (err) {
    ElMessage.error('加载用户信息失败，请刷新页面')
    console.error('获取用户信息失败:', err)
  }
})
</script>

<template>
  <div class="info2">
    <div class="avatar">
      <img :src="userInfo.avatar" alt="用户头像" />
    </div>
    <div class="input-row">
      <span class="label">用户ID：</span>
      <el-input v-model="userInfo.userId" placeholder="请输入用户ID" readonly class="input-item"></el-input>
    </div>
    <div class="input-row">
      <span class="label">用户名：</span>
      <el-input v-model="userInfo.username" placeholder="请输入用户名" class="input-item"></el-input>
    </div>
    <div class="input-row">
      <span class="label">密码:</span>
      <el-input v-model="userInfo.password" show-password placeholder="请输入密码" class="input-item"></el-input>
    </div>
    <div class="input-row">
      <span class="label">邮箱：</span>
      <el-input v-model="userInfo.email" placeholder="请输入邮箱" class="input-item"></el-input>
    </div>

    <div class="input-row">
      <span class="label">角色：</span>
      <el-input v-model="userInfo.role" placeholder="请输入角色" readonly class="input-item"></el-input>
    </div>
    <div class="input-row">
      <span class="label">真实姓名：</span>
      <el-input v-model="userInfo.realName" placeholder="未设置" class="input-item"></el-input>
    </div>
    <el-button type="primary" @click="handleSubmit" class="submit-btn">保存修改</el-button>
  </div>
</template>

<style scoped lang="scss">
.info2 {
  width: 50%;
  height: 400px;
  border: 1px solid #e5e7eb;
  margin:40px 0 0 300px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 15px;
  background-image: url('../../../assets/frontlayout/myArticle.png');
    background-size: cover;
  .avatar {
    margin-bottom: 20px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .input-row {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }

  .label {
    width: 80px;
    color: #2563eb;
    font-size: 16px;
  }

  .input-item {
    flex: 1;
    --el-input-border-radius: 4px;
    --el-input-font-size: 16px;
    --el-input-text-color: #2563eb;
  }
}
.submit-btn {
  width: 50%;
  margin: 20px 200px;
}
</style>

<style lang="scss">
.info2 {
  background-color: #fff;
}
</style>