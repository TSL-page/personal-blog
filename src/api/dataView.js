import request from '@/utils/request'

//浏览量前十的文章（柱状图）

export const ViewCountSort10 = () => {
  return request.get('display/getViewCountSort10')
}

// 获取文章分类及其数量（构建饼图）
export const getArticleCategoryCount = () => {
  return request.get('display/getCategorysCount')
}

// 获取评论总数
export const getCommentCount = () => {
  return request.get('display/getCommentCount')
}

// 获取文章总数
export const getArticleCount = () => {
  return request.get('display/getArticleCount')
}

// 获取系统活跃用户
export const getActiveUser = () => {
  return request.get('display/getUserCount')
}

// 获取近一周的每日新增文章数量
export const getNewArticleCount = () => {
  return request.get('display/getNewAddArticle')
}

// 获取近一周的每日注册用户数量
export const getNewUserCount = () => {
  return request.get('display/getRegisterCount')
}