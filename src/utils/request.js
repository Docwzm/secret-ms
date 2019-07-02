import axios from "axios"
import configs from '../configs/index'
import { notification,Modal } from 'antd'
import {delCookie,getCookie} from '../utils/index'
let showConfirm = false
function showPropsConfirm() {
  if(!showConfirm){
    showConfirm = true
    Modal.error({
      title: '提示信息',
      content: '您的账号已在其它地方登录',
      okText:"确定",
      onOk() {
        delCookie("_secret_token")
        delCookie("session")
        window.location.href = '/#/login'
      },
    });
  }
  
}

// axios.defaults.withCredentials = true;
// 创建axios实例
const request = axios.create({
  baseURL: configs.server,
  // timeout: 15000,
  headers: {
    'token':getCookie('_secret_token'),
    'Content-Type': 'application/json'
  }
})

// request拦截器
request.interceptors.request.use(
  config => {
    config.params = Object.assign({}, config.params)
    // config.headers = Object.assign({}, config.headers)
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
    if (res.code !== 0) {
      //登录失败的逻辑
      notification['error']({
        message: res.data
      })
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