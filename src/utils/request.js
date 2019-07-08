import axios from 'axios'
import store from '../store/index'
import {Message} from 'element-ui'
import { getCookie } from '@/utils/auth'

const request = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  headers: {
    'Content-type': 'application/json;charset=UTF-8'
  }
})

request.interceptors.request.use(config => {
  if (store.state.info.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers["Authorization"] = store.state.token;
    config.headers['Authorization'] = getCookie('USER_TOKEN')
  }
  return config
// eslint-disable-next-line handle-callback-err
}, err => {
  Message.error({message: '请求超时!'})
  // return Promise.resolve(err);
})

request.interceptors.response.use(data => {
  if (data.status && data.status === 200 && data.data.code === 500) {
    Message.error({message: data.data.message})
    return
  }
  // if (data.data.message) {
  //   Message.success({message: data.data.message})
  // }
  return data
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    Message.error({message: '服务器被吃了⊙﹏⊙∥'})
  } else if (err.response.status === 403) {
    Message.error({message: '权限不足,请联系管理员!'})
  } else if (err.response.status === 401) {
    Message.error({message: err.response.data.message})
  } else {
    if (err.response.data.message) {
      Message.error({message: err.response.data.message})
    } else {
      Message.error({message: '未知错误!'})
    }
  }
})

export default request
