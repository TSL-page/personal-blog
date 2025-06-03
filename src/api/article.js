import request from '@/utils/request'


// 获取所有文章
export const getArticleList = (params) => {
  return request.get('/articles/findAll1',{
    params
  })
}

// 删除文章
export const deleteArticle = (id) => {
  return request.delete('/articles/delete',{
    params: { id }
  })
}

// 获取文章详情
export const getArticleDetail = (id) => {
  return request.get('articles/selectArticle',{
    params: { id }
  })
}
// 编辑提交
export const editArticle = (data) => { 
  return request.post('/articles/update/admin1',data)
}

// 添加文章
export const addArticle = (data) => {
  return request.post('/articles/add',data)
}

// 获取文章分类
export const getArticleCategory = () => {
  return request.get('/categories/findAll')
}
