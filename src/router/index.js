import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import ArticleManage from '@/views/Layout/components/ArticleManage/index.vue'
import ArticleCategories from '@/views/Layout/components/ArticleCategories/index.vue'
import ArticleModeration from '@/views/Layout/components/ArticleModeration/index.vue'
import CommentManage from '@/views/Layout/components/CommentManage/index.vue'
import DataStatistics from '@/views/Layout/components/DataStatistics/index.vue'
import Avatar from '@/components/user/Avatar/index.vue'
import Password from '@/components/user/Password/index.vue'
import Profile from '@/components/user/Profile/index.vue'

import { useUserStore } from '@/stores'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: Login },
    { path: '/', redirect: '/login' },
    { path: '/layout', component: Layout,
      children: [
        { path: '/articlemanage', component: ArticleManage }, // 文章管理
        { path: '/articlecategories', component: ArticleCategories }, // 文章分类管理
        { path: '/articlemoderation', component: ArticleModeration }, // 文章审核管理
        { path: '/commentmanage', component: CommentManage }, // 评论管理
        { path: '/datastatistics', component: DataStatistics }, // 数据统计
        { path: '/avatar', component: Avatar }, // 更换头像
        { path: '/profile', component: Profile }, // 基本资料
        { path: '/password', component: Password } // 修改密码
      ]
    },
    { path: '/front-layout'}    
  ]
})

// 登录访问拦截 => 默认是直接放行的

router.beforeEach ( (to) => {
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login')
    return '/login'
})
export default router