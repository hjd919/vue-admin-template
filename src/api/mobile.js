import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/mobile',
    method: 'get',
    params: query
  })
}

export function getDetail(id) {
  return request({
    url: '/mobile/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/mobile/add',
    method: 'post',
    data
  })
}

