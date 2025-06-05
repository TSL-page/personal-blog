import request from '@/utils/request'
// 获取文章分类
export const getCategoriesAll = () => {
  return request.get('/categories/findAll')
}

// 删除文章分类
export const deleteCategory = (id) => {
  return request.delete('categories/delete', { params: { id } })
}

// 编辑文章分类
export const editCategory = (data) => {
  return request.post('categories/update', data)
}

// 新增文章分类
export const addCategory = (data) => {
  return request.post('categories/add', data)
}