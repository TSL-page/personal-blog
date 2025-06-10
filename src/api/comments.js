import request from '@/utils/request'
// 根据id获取用户文章的评论（支持分页和排序）

// 删除评论
export const deleteComment = (commentId) => {
  return request.delete('/comments/delete', { params: { commentId } })
}

// 新增评论
export const addComment = (data) => {
  return request.post('/comments/add', data)
}

// 管理员根据id获取用户评论（支持分页和排序）
export const getCommentByUserId = (id, pageNum = 1, pageSize = 5, orderKey = 3) => {
  return request.get('/comments/selectByUserID2', {
    params: { id, pageNum, pageSize, order_key: orderKey }
  })
}

// 管理员根据文章id获取用户评论（支持分页和排序）
export const getCommentByArticleId = (id, pageNum = 1, pageSize = 5, orderKey = 3) => {
  return request.get('/comments/selectByArticleID', {
    params: { id, pageNum, pageSize, order_key: orderKey }
  })
}

// 评论审核
export const commentReview = (commentId, comstatus) => {
  return request.post('/comments/audit', { commentId, comstatus })
}