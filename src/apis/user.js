import request from '../utils/request'
<<<<<<< HEAD
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
=======

const login = (username, password, type = 4) => {
  return request({
    url: "/user-service/user_account/login",
    method: "post",
    data: {
      username,
      password,
      type
>>>>>>> chat
    }
  })
}

<<<<<<< HEAD
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
=======
//登出
const logout = () => {
  return request({
    url: '/user-service/user_account/login_out',
    method: "post"
>>>>>>> chat
  })
}

/**
 * 修改密码
 * @param {*} data 
 */
const changePassword = (data) => {
  return request({
<<<<<<< HEAD
    url: '/user-service/user_account/change_password',
    method: 'post',
=======
    url: "/user-service/user_account/change_password",
    method: "post",
>>>>>>> chat
    data
  })
}

export {
  login,
  logout,
<<<<<<< HEAD
  changePassword,
  getCaptcha
=======
  changePassword
>>>>>>> chat
}