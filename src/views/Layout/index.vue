<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import router from '@/router'
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()
import {
  Document,
  Location,
  Setting,
  Menu as IconMenu,
  Open,
  Hide,
  PieChart,
  CaretBottom,
  User,
  Crop,
  EditPen,
  SwitchButton
} from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

const isCollapse = ref(true)

// 头像路径
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    })

    // menu菜单
const menuList = [
  { index: '1', icon: IconMenu, title: '个人资料',
    children: [
      { index: '1-1', icon: User, title: '基本资料', route: '/profile' },
      { index: '1-2', icon: Crop, title: '更换头像', route: '/avatar' },
      { index: '1-3', icon: EditPen, title: '重置密码', route: '/password' },
    ]
   },
  { index: '2', icon: Location, title: '文章管理', route: '/articlemanage' },
  { index: '3', icon: Setting, title: '文章类别管理', route: '/articlecategories' },
  { index: '4', icon: Document, title: '文章审核', route: '/articlemoderation' },
  { index: '5', icon: Setting, title: '评论管理', route: '/articlemanage' },
  { index: '6', icon: PieChart, title: '数据统计', route: '/datastatistics' }
]


// 跳转方法
const handleMenuClick = (item) => {
  if (item.route) {
    console.log("xxxx");
    
    router.push(item.route)
  }
}

// 下拉菜单点击事件
const handleCommand = (command) => {
  if (command === 'profile') {
    router.push('/profile')
  } else if (command === 'avatar') {
    router.push('/avatar')
  } else if (command === 'password') {
    router.push('/password')
  } else if (command === 'logout') {
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
}
</script>

<template>
  <div class="stable">
    <div class="top">
      <div class="logo">
        Blog
      </div>
      <div class="control">
        <el-radio-group v-model="isCollapse" @click="isCollapse = !isCollapse" class="collapse">
          <el-radio-button :value="false">
            <el-icon>
              <open></open>
            </el-icon>
          </el-radio-button>
          <el-radio-button :value="true">
            <el-icon>
              <hide></hide>
            </el-icon>
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="top-right">
        <div class="username">
          <span>爱吃香菜</span>
          <!-- {{ username.length > 8 ? username.slice(0,8) + '...' : username}}-->
        </div>
        <el-dropdown placement="bottom-end" @command="handleCommand" class="avator">
          <!-- 展示给用户，默认看到的 -->
          <span class="el-dropdown__box">
            <el-avatar :src="circleUrl" />
            <el-icon class="el-dropdown__icon">
              <CaretBottom />
            </el-icon>
          </span>
          <!-- 下拉菜单折叠的部分-->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

    </div>
    <div class="middle">
      <div class="left-nav" :class="{ collapse: isCollapse }">
        <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
          <template v-for="item in menuList" :key="item.index">
            <el-sub-menu v-if="item.children" :index="item.index">
              <template #title>
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item v-for="child in item.children" :key="child.index" :index="child.index"
                @click="handleMenuClick(child)">
                {{ child.title }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="item.index" @click="handleMenuClick(item)">
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <template #title>{{ item.title }}</template>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="contain">
        <div class="content">
          <router-view />
        </div>
      </div>
    </div>
    <div class="footer">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  height: 99%;
  background-color: #F5F5DC;
}
.stable {
  width: 100%;
  .top {
    width: 100%;
    height: 100%;
    background-color: #F5F5DC;
    .control {
      margin: 1% 0 0 11.19%;
      .collapse {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        padding: 2% 0 0 0;
        }
    }
    .top-right {
      width: 100%;
      height: 100%;
      display: flex;
      .avator {
        margin: -3.5% 0 0 95.5%;
        width: 10%;
        height: 10%;
        display: flex;
        align-items: center;
      }
      .username {
        left: 90%;
        top: 4%;
        position: absolute;
        display: flex;
        position: absolute;
        right: 0;
        width: 5.5%;
        height: 5%;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        align-items: center;  // 垂直居中
        justify-content: left; 
      }
      .el-dropdown__box {
        border: none !important;
        box-shadow: none !important;
        outline: none !important;
      }
    }
    .logo {
      width: 5%;
      height: 5%;
      position: absolute;
      top: 4%;
      left: 2.5%;
      font-size: 20px;
      font-weight: bold;
      color: #000;
      display: flex;
      align-items: center;  // 垂直居中
      justify-content: left;
      font-style: italic; // 斜体
    }
  }
  .middle {
    display: flex;
    .left-nav {
      transition: all 0.3s;
      height: 80vh;
      width: 200px;
      min-width: 200px;
      max-width: 200px;
      &.collapse {
        width: 64px;
        min-width: 64px;
        max-width: 64px;
      }
    }
    .contain {
      flex: 1;
      height: 100%;
      .content {
        width: 96%;
        height: 520px;
        margin: 2% 2% 0 2%;
        border-radius: 5px;
        background-color: #F5F5F5;
        overflow: auto;         // 超出部分出现滚动条
        box-sizing: border-box; 
      }
    }
  }
  .footer {
    width: 100%;
    height: 58px;
    background-image: url('@/assets/layout/animals.png');
    background-size: contain;
    background-position: center;
    margin: 0 -2%;
  }
}

</style>