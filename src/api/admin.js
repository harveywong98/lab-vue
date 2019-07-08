import request from '../utils/request'

export default function updatePasword (data, params) {
  return request({
    url: '/admins/update',
    method: 'put',
    data: data,
    params: params
  })
}
