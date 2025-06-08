import request from '@/utils/request'

// 根据id获取用户文章的评论（支持分页和排序）
export const getCommentByArticleId = (id, pageNum = 1, pageSize = 5, orderKey = 3) => {
  return request.get('/comments/selectByArticleID', {
    params: { 
      id, 
      pageNum, 
      pageSize, 
      order_key: orderKey
    }
  })
}