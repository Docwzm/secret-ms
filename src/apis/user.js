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
      rpmAppType: config.appType,
      ...data
    }
  })
}

/**
 * 登出
 */
const logout = () => {
  return request({
    url: SERVICE_NAME + '/common/logout',
    method: 'post'
  })
}

const getCaptcha = () => {
  return request({
    url:SERVICE_NAME + '/common/getimagecheckcode'
  })
}

/**
 * 修改密码
 * @param {*} data 
 */
const changePassword = (data) => {
  return request({
    url: '/user-service/user_account/change_password',
    method: 'post',
    data
  })
}

export {
  login,
  logout,
  changePassword,
  getCaptcha
}