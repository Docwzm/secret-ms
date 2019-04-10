import axios from "axios"
import uuid from 'uuid'
import configs from '../configs/index'
import { notification } from 'antd'
import {delCookie} from '../utils/index'


axios.defaults.withCredentials = true;
// 创建axios实例
const request = axios.create({
  baseURL: configs.server,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// request拦截器
request.interceptors.request.use(
  config => {
    config.params = Object.assign({}, config.params, { appType: configs.appType, requestId: uuid.v1().replace(/-/g, '') })
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// respone拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      //登录失败的逻辑
      if (res.code === 401) {
        delCookie("accessToken")
        delCookie("session")
        window.location.href = '/rpm/#/login'
      }
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    //message.error(error.message);
    notification['error']({
      message: error.msg
    })
    return Promise.reject(error)
  }
)

export default request