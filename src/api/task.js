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
    url: '/task',
    method: 'post',
    data
  })
}

export function stopTask(id) {
  return request({
    url: '/task/stop?id=' + id,
    method: 'get'
  })
}

export function keywordSearch(q, channel) {
  return request({
    url: '/app/searchKeyword',
    method: 'get',
    params: { q, channel }
  })
}
