import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import  Layout from '@/views/Layout/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: Login },
    { path: '/', redirect: '/login' },
    { path: '/layout', component: Layout},    
  ]
})
export default router