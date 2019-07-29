import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/app/list',
    method: 'get',
    params: query
  })
}

export function fetchApp(id) {
  return request({
    url: '/app/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/app/pv',
    method: 'get',
    params: { pv }
  })
}

export function createOrEditApp(data) {
  return request({
    url: '/app/createOrEdit',
    method: 'post',
    data
  })
}

export function removeApp(id) {
  return request({
    url: '/app/remove',
    method: 'get',
    params: { id }
  })
}
