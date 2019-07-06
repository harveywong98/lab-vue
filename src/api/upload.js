import request from '@/utils/fileRequest'

export function uploadPicture (formData) {
  return request({
    url: '/image',
    method: 'post',
    data: formData
  })
}

export function uploadCarousel (formData) {
  return request({
    url: '/image/for',
    method: 'post',
    data: formData
  })
}

export function uploadAvatar (formData) {
  return request({
    url: '/image/for',
    method: 'post',
    data: formData
  })
}
