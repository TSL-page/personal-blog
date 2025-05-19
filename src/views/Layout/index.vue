<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import {
  Document,
  Location,
  Setting,
  Menu as IconMenu,
  Open,
  Hide,
  View,
  PieChart
} from '@element-plus/icons-vue'

const isCollapse = ref(true)

// 头像路径
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    })

    // menu菜单
const menuList = [
  { index: '1', icon: IconMenu, title: '个人资料' },
  { index: '2', icon: Location, title: '文章管理' },
  { index: '3', icon: Setting, title: '文章类别管理' },
  { index: '4', icon: Document, title: '文章审核' },
  { index: '5', icon: Setting, title: '评论管理' },
  { index: '6', icon: PieChart, title: '数据统计' }
]
</script>
<template>
  <div class="stable">
    <div class="top">
      <div class="logo">
        Blog
      </div>
      <div class="control">
        <el-radio-group v-model="isCollapse" @click="isCollapse = !isCollapse" class="collapse">
          <el-radio-button :value="false" class="open">
            <el-icon>
              <open></open>
            </el-icon>
          </el-radio-button>
          <el-radio-button :value="true" class="close">
            <el-icon>
              <hide></hide>
            </el-icon>
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="top-right">
        <div class="avator">
          <el-avatar :size="50" :src="circleUrl" />
        </div>
        <div class="username">
          <span>小明惺惺惜惺惺ssxxsx圣贤书显示</span>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="left-nav" :class="{ collapse: isCollapse }">
        <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item v-for="item in menuList" :key="item.index" :index="item.index">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="contain">
        <div class="content">
          <!--二级路由出口 -->
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
  height: 500px;
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
        left: 85%;
        top: 3%;
        position: absolute;
        width: 10%;
        height: 10%;
      }
      .username {
        display: flex;
        position: absolute;
        left: 90%;
        top: 4%;
        width: 9%;
        height: 5%;
        font-size: 14px;
        float: right;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        align-items: center;  // 垂直居中
        justify-content: left; // 水平居中
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
      height: 73vh;
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
    }
  }
  .footer {
    width: 100%;
    height: 100px;
    background-image: url('@/assets/layout/animals.png');
    background-size: cover;
  }
}

</style>