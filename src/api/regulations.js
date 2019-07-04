import request from '../utils/request'

export function insertOneRegulation (data) {
  return request({
    url: '/regulations/add',
    method: 'post',
    data: data
  })
}

export function queryOne (params) {
  return request({
    url: '/regulations/one',
    method: 'get',
    params: params
  })
}

export function queryAllRegulations (data) {
  return request({
    url: '/regulations/all',
    method: 'get',
    data: data
  })
}
export function deleteOneRegulations (params) {
  return request({
    url: '/regulations/delete',
    method: 'delete',
    params: params
  })
}
export function updateOneRegulation (data) {
  return request({
    url: '/regulations/update',
    method: 'put',
    data: data
  })
}

export function queryByPage (params) {
  return request({
    url: '/regulations/list',
    method: 'get',
    params: params
  })
}
