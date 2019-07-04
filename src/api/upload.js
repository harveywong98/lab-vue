import request from '@/utils/fileRequest'

export default function uploadPicture (formData) {
  return request({
    url: '/image',
    // url: '/upload',
    method: 'post',
    data: formData
  })
}
