import axios from 'axios'

const baseURL = 'http://1.95.116.204:8868'

const instance = axios.create({
  baseURL,
  timeout: 100000
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const userStr = localStorage.getItem('user')
    let token = ''
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        token = user.token || ''
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error)
      }
    }
    if (token) {
      config.headers.satoken = token
    }
    return config
  },
  error => Promise.reject(error)
)

export default instance
