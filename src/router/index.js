import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import  Layout from '@/views/Layout/index.vue'
import { useUserStore } from '@/stores'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: Login },
    { path: '/', redirect: '/login' },
    { path: '/layout', component: Layout},    
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