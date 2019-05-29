import axios from "axios"
import uuid from 'uuid'
import configs from '../configs/index'
import { notification,Modal } from 'antd'
import {delCookie} from '../utils/index'
let confirm = Modal.confirm;
let showConfirm = false
function showPropsConfirm() {
  if(!showConfirm){
    showConfirm = true
    confirm({
      title: '您的账号已在其它地方登录',
      okText: '确认',
      cancelText:null,
      onOk() {
        delCookie("accessToken")
        delCookie("session")
        window.location.href = '/rpm/#/login'
      },
      onCancel() {
        console.log('Cancel');
        showConfirm = false
      },
    });
  }
  
}

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
        showPropsConfirm()
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