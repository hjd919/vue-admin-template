import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/app',
    method: 'get',
    params: query
  })
}

export function getDetail(id) {
  return request({
    url: '/app/detail',
    method: 'get',
    params: { id }
  })
}

export function createOrEditApp(data) {
  return request({
    url: '/app/createOrEdit',
    method: 'post',
    data
  })
}

export function getKeywordList(query) {
  return request({
    url: '/app/keyword',
    method: 'get',
    params: query
  })
}
