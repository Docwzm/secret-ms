import request from '../utils/request'
const SERVICE_NAME = ''

/**
 * 获取密语列表
 */
const getSecretList = ({page=1,pageSize=10} = {}) => {
    return request({
        url: SERVICE_NAME + '/admin/speech',
        method: 'get',
        params:{
            page,
            pageSize
        }
    })
}


/**
 * 获取密语详情
 */
const getSecretById = (id) => {
    return request({
        url:SERVICE_NAME + '/admin/speech/'+id,
        method: 'get'
    })
}


/**
 * 获取密语列表
 * @param {*} data 
 */
const getSecretListByPhone = (data) => {
    return request({
        url: SERVICE_NAME + '/common/speech',
        method: 'post',
        data: {
            ...data
        }
    })
}


/**
 * 添加密语
 * @param {*} data 
 */
const addSecret = (data) => {
    return request({
        url: SERVICE_NAME + '/api/speech',
        method: 'post',
        data
    }) 
}

/**
 * 更新密语
 * @param {*} id 
 * @param {*} data 
 */
const updateSecret = (id,data) => {
    return request({
        url: SERVICE_NAME + '/admin/speech/'+id,
        method: 'put',
        data
    }) 
}


/**
 * 删除密语
 * @param {*} id 
 */
const deleteSecret = (id) => {
    return request({
        url: SERVICE_NAME + '/admin/speech/'+id,
        method: 'delete'
    }) 
}



/**
 * 获取背景图片
 */
const getBgUrl = () => {
    return request({
      url: '/api/back-image',
      method: 'get'
    })
  }

/**
 * 保存背景图片
 * @param {*} id 
 */
const saveBg = ({image_id,remark},origin_id) => {
    let url = origin_id?SERVICE_NAME + '/admin/back-image/'+origin_id:SERVICE_NAME + '/admin/back-image';
    let method = origin_id?'put':'post'
    return request({
        url,
        method,
        data:{
            image_id,
            remark
        }
    }) 
}



/**
 * 获取验证码
 */
const getCodeUrl = () => {
    return request({
      url: '/captcha/api',
      method: 'get'
    })
  }

export {
    getSecretById,
    getSecretList,
    getSecretListByPhone,
    addSecret,
    updateSecret,
    deleteSecret,
    saveBg,
    getBgUrl,
    getCodeUrl
}