import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/task',
    method: 'get',
    params: query
  })
}

export function getDetail(id) {
  return request({
    url: '/task/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/task/add',
    method: 'post',
    data
  })
}

