import request from '@/utils/request'
// 获取文章分类
export const getCategoriesAll = () => {
  return request.get('/categories/findAll')
}