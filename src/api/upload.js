import axios from 'axios'

const request = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

export default function uploadPicture (formData) {
  return request({
    // url: '/image',
    url: '/upload',
    method: 'post',
    data: formData
  })
}
