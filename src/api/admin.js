import request from '../utils/request'

export default function updatePasword (data) {
  return request({
    url: '/',
    method: 'put',
    data: data
  })
}
