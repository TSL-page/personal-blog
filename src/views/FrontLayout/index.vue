<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' 
import banner from './components/banner.vue'
import { getUserMessage } from '@/api/user'
import { ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'
const router = useRouter()
const userStore = useUserStore()
const userInfo = ref({})

const handleMyArticleClick = () => {
  router.push('/myArticle')
}

// 时间格式化函数（转换为 YYYY-MM-DD HH:mm:ss 格式）
const formatTime = (timeStr) => {
  if (!timeStr) return '未设置'
  const date = new Date(timeStr)
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-') + ' ' + [
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0'),
    String(date.getSeconds()).padStart(2, '0')
  ].join(':')
}

onMounted(async () => {
    const res = await getUserMessage()
    userInfo.value = res.data.data
})

const logout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
    }).then(() => {
      userStore.removeToken()
      router.push('/login')
    }).catch(() => {
      console.log('取消退出登录')
    })
  }
</script>

<template>
  <banner></banner>
  <div class="info">
    <div class="avatar">
      <img :src="userInfo.avatar" alt="用户头像" />
    </div>
    <p>用户ID：{{ userInfo.userId }}</p>
    <p>用户名：{{ userInfo.username }}</p>
    <p>邮箱：{{ userInfo.email }}</p>
    <p>角色：{{ userInfo.role }}</p>
    <p>注册时间：{{ formatTime(userInfo.registerTime) }}</p>
    <p>最后登录：{{ formatTime(userInfo.lastLoginTime) }}</p>
    <p>真实姓名：{{ userInfo.realName || '未设置' }}</p>
  </div>
  <div class="footer">


    <div class="nav">
      <ElMenu mode="vertical" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <ElMenuItem index="1" @click="handleMyArticleClick">
          <template #title>
            <i class="el-icon-document"></i>
            <span>我的文章</span>
          </template>
        </ElMenuItem>
        <ElMenuItem index="2" @click="router.push('/editMessage')">
          <template #title>
            <i class="el-icon-document"></i>
            <span>编辑信息</span>
          </template>
        </ElMenuItem>
        <ElMenuItem index="3" @click="logout()">
          <template #title>
            <i class="el-icon-document"></i>
            <span>退出登录</span>
          </template>
        </ElMenuItem>
      </ElMenu>
    </div>
    <div class="contain">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .info {
    width: 17%;
    height: 330px;
    border: 1px solid #e5e7eb;
    position: absolute;
    top: -440px;
    left: 82%;
    padding: 10px 0 10px 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: relative; /* 关键：为伪元素定位 */
    overflow: hidden; 

    .avatar {
      margin-bottom: 40px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    p {
      margin: 15px 0;
      color: #2563eb;
      font-size: 16px;
    }
    /* 添加流动边框伪元素 */
    &::before {
      content: "";
      position: absolute;
      top: -2px; /* 覆盖原边框 */
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, #2196F3, #4CAF50, red, #4B0082);
      background-size: 300% 300%; /* 放大背景用于动画 */
      z-index: -1; /* 置于内容下方 */
      animation: borderFlow 2s linear infinite; /* 使用已有的动画 */
    }

    /* 添加内容背景层，防止文字被渐变覆盖 */
    &::after {
      content: "";
      position: absolute;
      top: 1px; /* 内缩1px避免遮挡流动边框 */
      left: 1px;
      right: 1px;
      bottom: 1px;
      background: #fff; /* 白色背景 */
      border-radius: 7px; /* 比原边框半径小1px，匹配圆角 */
      z-index: -1; /* 置于渐变层上方，内容下方 */
    }
  }

  .footer {
    display: flex;
    .nav {
        display: flex;
        height: 300px;
        margin-top: -27%;
        .el-menu {
          border-right: 0;
        }
      }
    .contain {
      position: absolute;
      top: 58%;
      left: 10%;
      width: 89%;
    }
  }

  /* 复用已有的流动动画（如果之前未定义需添加） */
  @keyframes borderFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
</style>