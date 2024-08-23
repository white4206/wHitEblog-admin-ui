import request from '@/utils/request'

// 查询身份标签列表
export function listIdentityTag(query) {
  return request({
    url: '/system/identityTag/list',
    method: 'get',
    params: query
  })
}

// 查询身份标签详细
export function getIdentityTag(id) {
  return request({
    url: '/system/identityTag/' + id,
    method: 'get'
  })
}

// 新增身份标签
export function addIdentityTag(data) {
  return request({
    url: '/system/identityTag',
    method: 'post',
    data: data
  })
}

// 修改身份标签
export function updateIdentityTag(data) {
  return request({
    url: '/system/identityTag',
    method: 'put',
    data: data
  })
}

// 删除身份标签
export function delIdentityTag(id) {
  return request({
    url: '/system/identityTag/' + id,
    method: 'delete'
  })
}
