import request from '@/utils/request.js'

// 查询博客文章标签列表
export function listBlogArticleTag(query) {
  return request({
    url: '/system/blogArticleTag/list',
    method: 'get',
    params: query
  })
}

// 查询博客文章标签详细
export function getBlogArticleTag(id) {
  return request({
    url: '/system/blogArticleTag/' + id,
    method: 'get'
  })
}

// 新增博客文章标签
export function addBlogArticleTag(data) {
  return request({
    url: '/system/blogArticleTag',
    method: 'post',
    data: data
  })
}

// 修改博客文章标签
export function updateBlogArticleTag(data) {
  return request({
    url: '/system/blogArticleTag',
    method: 'put',
    data: data
  })
}

// 删除博客文章标签
export function delBlogArticleTag(id) {
  return request({
    url: '/system/blogArticleTag/' + id,
    method: 'delete'
  })
}
