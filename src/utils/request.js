import axios from 'axios'
import { useUserStore } from '../stores/modules/user'

const baseURL = 'http://1.95.116.204:8868'

const instance = axios.create({
  baseURL,
  timeout: 100000
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 直接从 localStorage 读取 token
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).token
      : ''
      console.log('当前请求携带的token:', token)
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  error => Promise.reject(error)
)
export default instance
export { baseURL }