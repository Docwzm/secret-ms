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

/**
 * 图形验证码
 */
const getCaptcha = () => {
  return request({
    url: SERVICE_NAME + '/common/getimagecheckcode'
  })
}

/**
 * 获取短信验证码
 * @param {*} data 
 */
const getMobileCode = (data) => {
  return request({
    url: SERVICE_NAME + '/common/getmobilecode',
    data,
    method: "post"
  })
}

/**
 * 校验短信验证码
 * @param {*} data 
 */
const checkMobileCode = (data) => {
  return request({
    url: SERVICE_NAME + '/common/checkmobilecode',
    data,
    method: "post"
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

/**
 * 用户信息
 */
const userInfo = () => {
  return request({
    url: SERVICE_NAME + "/common/getDoctorUserInfo",
    method: "post"
  })
}

/**
 * 修改用户信息
 * @param {*} data 
 */
const updateUserInfo = (data) => {
  return request({
    url: SERVICE_NAME + "/common/updateuserinfo",
    data,
    method: "post"
  })
}


/**
 * 修改用户帐号
 * @param {*} data 
 */
const updateUserAccount = (data) => {
  return request({
    url: SERVICE_NAME + "/common/updateaccount",
    data,
    method: "post"
  })
}

/**
 * 登录后台修改密码
 * @param {*} data 
 */
const updateUserPassword = (data) => {
  return request({
    url:SERVICE_NAME + '/common/updatepassword',
    data,
    method:"post"
  })
}

/**
 * 更新医生基本信息
 * @param {*} data 
 */
const updateDoctorUserInfo = (data) => {
  return request({
    url:SERVICE_NAME + "/common/updateDoctorUserInfo",
    data,
    method:"post"
  })
}



export {
  login,
  logout,
  changePassword,
  getCaptcha,
  userInfo,
  getMobileCode,
  updateUserInfo,
  updateUserAccount,
  checkMobileCode,
  updateUserPassword,
  updateDoctorUserInfo
}