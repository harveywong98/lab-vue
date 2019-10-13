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

export function getCarousel () {
  return request({
    url: '/image/for',
    method: 'get'
  })
}

export function deleteCarousel (params) {
  return request({
    url: '/image/for',
    method: 'delete',
    params: params
  })
}

export function updateCarouselDescription (data) {
  return request({
    url: '/image/for',
    method: 'put',
    data: data
  })
}
