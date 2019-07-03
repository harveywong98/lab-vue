import request from '../utils/request'

export function insertOneNews (data) {
  return request({
    url: '/news/add',
    method: 'post',
    data: data
  })
}

export function queryOne (params) {
  return request({
    url: '/news/one',
    method: 'get',
    params: params
  })
}

export function queryAllNews (data) {
  return request({
    url: '/news/all',
    method: 'get',
    data: data
  })
}
export function deleteOneNews (params) {
  return request({
    url: '/news/delete',
    method: 'delete',
    params: params
  })
}
export function updateOneNews (data) {
  return request({
    url: '/news/update',
    method: 'put',
    data: data
  })
}

export function queryByPage (params) {
  return request({
    url: '/news/list',
    method: 'get',
    params: params
  })
}
