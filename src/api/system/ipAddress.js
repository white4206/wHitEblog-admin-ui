import request from '@/utils/request'

// 查询IP地址 列表
export function listIpAddress(query) {
  return request({
    url: '/system/ipAddress/list',
    method: 'get',
    params: query
  })
}

// 查询IP地址 详细
export function getIpAddress(id) {
  return request({
    url: '/system/ipAddress/' + id,
    method: 'get'
  })
}

// 新增IP地址 
export function addIpAddress(data) {
  return request({
    url: '/system/ipAddress',
    method: 'post',
    data: data
  })
}

// 修改IP地址 
export function updateIpAddress(data) {
  return request({
    url: '/system/ipAddress',
    method: 'put',
    data: data
  })
}

// 删除IP地址 
export function delIpAddress(id) {
  return request({
    url: '/system/ipAddress/' + id,
    method: 'delete'
  })
}
