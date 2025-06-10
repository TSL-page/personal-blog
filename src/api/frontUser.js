import request from '@/utils/request'

// 获取用户文章
export const getUserArticle = () => {
  return request.get('articles/selectAll')
}

// 新增文章
export const addArticle = (data) => {
  return request.post('articles/add', data)
}

// 删除文章
export const deleteArticle = (id) => {
  return request.delete('articles/delete', 
    {params:{ id } }
  )
}

//编辑文章
export const articleUpdata = (data) => {
  return request.post('articles/update', data)
}
