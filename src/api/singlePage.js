import request from '../utils/request'

export function getOne (params) {
  return request({
    url: '/function/one',
    method: 'get',
    params: params
  })
}

export function updateOne (data) {
  return request({
    url: '/function/update',
    method: 'put',
    data: data
  })
}
