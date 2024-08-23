import request from '@/utils/request'

// 查询相关链接管理列表
export function listRelatedLink(query) {
  return request({
    url: '/system/relatedLink/list',
    method: 'get',
    params: query
  })
}

// 查询相关链接管理详细
export function getRelatedLink(id) {
  return request({
    url: '/system/relatedLink/' + id,
    method: 'get'
  })
}

// 新增相关链接管理
export function addRelatedLink(data) {
  return request({
    url: '/system/relatedLink',
    method: 'post',
    data: data
  })
}

// 修改相关链接管理
export function updateRelatedLink(data) {
  return request({
    url: '/system/relatedLink',
    method: 'put',
    data: data
  })
}

// 删除相关链接管理
export function delRelatedLink(id) {
  return request({
    url: '/system/relatedLink/' + id,
    method: 'delete'
  })
}
