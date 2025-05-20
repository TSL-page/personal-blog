import request from '@/utils/request'
import { pa } from 'element-plus/es/locales.mjs'

// 获取文章列表
export const getArticleList = () => {
  return request.get('/articles/findAll',{
  })
}

// 删除文章
export const deleteArticle = (id) => {
  return request.delete('/articles/delete',{
    params: { id }
  })
}