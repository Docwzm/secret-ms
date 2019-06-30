import request from '../utils/request'
import config from '../configs/index'
const SERVICE_NAME = ''

/**
 * 登录
 * @param {*} data 
 */
const login = ({username,password}) => {
  return request({
    url: SERVICE_NAME + '/admin/auth',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

/**
 * 登出
 */
const logout = () => {
  return request({
    url: SERVICE_NAME + '/admin/logout'
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



/**
 * 获取账号列表
 */
const getUsertList = () => {
  return request({
      url: SERVICE_NAME + '/admin/account',
      method: 'get'
  })
}


/**
* 获取账号详情
*/
const getUserById = (id) => {
  return request({
      url:SERVICE_NAME + '/admin/account/'+id,
      method: 'get'
  })
}


/**
* 添加账号
* @param {*} data 
*/
const addUser = (data) => {
  return request({
      url: SERVICE_NAME + '/admin/account',
      method: 'post',
      data: {
          ...data
      }
  }) 
}

/**
* 更新账号
* @param {*} id 
* @param {*} data 
*/
const updateUser = (id,data) => {
  return request({
      url: SERVICE_NAME + '/admin/account/'+id,
      method: 'put',
      data: {
          ...data
      }
  }) 
}


/**
* 删除账号
* @param {*} id 
*/
const deleteUser = (id) => {
  return request({
      url: SERVICE_NAME + '/admin/account/'+id,
      method: 'delete'
  }) 
}





export {
  login,
  logout,
  getMenu,
  getUsertList,
  getUserById,
  addUser,
  updateUser,
  deleteUser
}