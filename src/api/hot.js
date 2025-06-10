import request from '@/utils/request'

export const getArticleByViewCount = () => {
  return request.get('/articles/selectArticleByViewCount')

}