import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/req',
    method: 'get',
    params: query
  })
}
