import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import ArticleManage from '@/views/Layout/components/ArticleManage/index.vue'
import ArticleCategories from '@/views/Layout/components/ArticleCategories/index.vue'
import CommentManage from '@/views/Layout/components/CommentManage/index.vue'
import DataStatistics from '@/views/Layout/components/DataStatistics/index.vue'
import Profile from '@/components/user/Profile/index.vue'
import FrontLayout from '@/views/FrontLayout/index.vue'
import MyArticle from '@/views/FrontLayout/components/myArticle.vue'
import articleDetail from '@/views/FrontLayout/components/articleDetail.vue'
import editMessage from '@/views/FrontLayout/components/editMessage.vue'
import hot from '@/views/FrontLayout/components/hot.vue'
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
        { path: '/commentmanage', component: CommentManage }, // 评论管理
        { path: '/datastatistics', component: DataStatistics }, // 数据统计
        { path: '/profile', component: Profile }, // 基本资料
      ]
    },
    { path: '/frontLayout', component: FrontLayout,
      children: [
        { path: '/myArticle', component: MyArticle},
        { path: '/frontLayout/articleDetail', component: articleDetail},
        { path: '/myArticle', redirect: '/myArticle' },
        { path: '/editMessage', component: editMessage},
        { path: '/hot', component: hot},
      ]
     }, 
  ]
})

router.beforeEach ( (to) => {
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login')
    return '/login'
})
export default router