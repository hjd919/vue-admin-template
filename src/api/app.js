import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/app',
    method: 'get',
    params: query
  })
}
