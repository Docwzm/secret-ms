import request from '../utils/request'

const login = (username, password, type = 4) => {
  return request({
    url: "/user-service/user_account/login",
    method: "post",
    data: {
      username,
      password,
      type
    }
  })
}

//登出
const logout = () => {
  return request({
    url: '/user-service/user_account/login_out',
    method: "post"
  })
}

/**
 * 修改密码
 * @param {*} data 
 */
const changePassword = (data) => {
  return request({
    url: "/user-service/user_account/change_password",
    method: "post",
    data
  })
}

export {
  login,
  logout,
  changePassword
}