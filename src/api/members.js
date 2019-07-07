import request from '../utils/request'

export function insertOneMember (data) {
  return request({
    url: '/member/add',
    method: 'post',
    data: data
  })
}

export function queryOne (params) {
  return request({
    url: '/member/one',
    method: 'get',
    params: params
  })
}

export function queryAllMembers (data) {
  return request({
    url: '/member/all',
    method: 'get',
    data: data
  })
}
export function deleteOneMember (params) {
  return request({
    url: '/member/delete',
    method: 'delete',
    params: params
  })
}
export function updateOneMember (data) {
  return request({
    url: '/member/update',
    method: 'put',
    data: data
  })
}

export function queryByPage (params) {
  return request({
    url: '/member/list',
    method: 'get',
    params: params
  })
}
