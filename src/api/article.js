import request from '@/utils/request'
import { pa } from 'element-plus/es/locales.mjs'

// 获取文章列表
export const getArticleList = (params) => {
  return request.get('/articles/findAll',{
    pa
  })
}