import request from '../utils/request'

export function insertOneNotice (data) {
  return request({
    url: '/notices/add',
    method: 'post',
    data: data
  })
}

export function queryOne (params) {
  return request({
    url: '/notices/one',
    method: 'get',
    params: params
  })
}

export function queryAllNotices (data) {
  return request({
    url: '/notices/all',
    method: 'get',
    data: data
  })
}
export function deleteOneNotice (params) {
  return request({
    url: '/notices/delete',
    method: 'delete',
    params: params
  })
}
export function updateOneNotice (data) {
  return request({
    url: '/notices/update',
    method: 'put',
    data: data
  })
}

export function queryByPage (params) {
  return request({
    url: '/notices/list',
    method: 'get',
    params: params
  })
}
