import request from '@/utils/request'

// 查询今日推荐管理 列表
export function listDailyRecommendation(query) {
  return request({
    url: '/system/dailyRecommendation/list',
    method: 'get',
    params: query
  })
}

// 查询今日推荐管理 详细
export function getDailyRecommendation(id) {
  return request({
    url: '/system/dailyRecommendation/' + id,
    method: 'get'
  })
}

// 新增今日推荐管理 
export function addDailyRecommendation(data) {
  return request({
    url: '/system/dailyRecommendation',
    method: 'post',
    data: data
  })
}

// 修改今日推荐管理 
export function updateDailyRecommendation(data) {
  return request({
    url: '/system/dailyRecommendation',
    method: 'put',
    data: data
  })
}

// 删除今日推荐管理 
export function delDailyRecommendation(id) {
  return request({
    url: '/system/dailyRecommendation/' + id,
    method: 'delete'
  })
}
