import request from '../utils/request'
import config from '../configs/index'
const SERVICE_NAME = '/rpmaccount_service'

/**
 * 登录
 * @param {*} data 
 */
const login = (data) => {
  return request({
    url: SERVICE_NAME + '/common/login',
    method: 'post',
    data: {
      appType: config.appType,
      ...data
    }
  })
}

/**
 * 登出
 */
const logout = () => {
  return request({
    url: SERVICE_NAME + '/common/logout'
  })
}


const getMenu = (data) => {
  return request({
    url: SERVICE_NAME + '/common/login',
    method: 'post',
    data: {
      appType: config.appType,
      ...data
    }
  })
}

export {
  login,
  logout,
  getMenu
}