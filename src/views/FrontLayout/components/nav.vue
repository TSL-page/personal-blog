<script setup>
import { ElMenu, ElSubMenu, ElMenuItem } from 'element-plus'
</script>

<template>
  <div class="stable">
    <!-- 垂直导航栏 -->
    <ElMenu mode="vertical" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" unique-opened>
      <!-- 一级菜单项 -->
      <ElMenuItem index="1">
        <i class="el-icon-house"></i>
        <span>首页</span>
      </ElMenuItem>

      <!-- 子菜单示例 -->
      <ElSubMenu index="2">
        <template #title>
          <i class="el-icon-document"></i>
          <span>文章</span>
        </template>
        <ElMenuItem index="2-1">技术分享</ElMenuItem>
        <ElMenuItem index="2-2">生活随笔</ElMenuItem>
        <ElMenuItem index="2-3">读书笔记</ElMenuItem>
      </ElSubMenu>

      <ElMenuItem index="3">
        <i class="el-icon-picture"></i>
        <span>相册</span>
      </ElMenuItem>
    </ElMenu>

    <banner></banner>
  </div>
</template>

<style lang="scss" scoped>
.stable {
  display: flex;
  min-height: 100vh;
  /* 占满视口高度 */

  /* 导航栏样式 */
  .el-menu {
    border-right: 0;
    /* 移除右侧边框 */
  }
}
</style>