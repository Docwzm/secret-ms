import request from '../utils/request'
const SERVICE_NAME = ''

/**
 * 获取密语列表
 */
const getSecretList = () => {
    return request({
        url: SERVICE_NAME + '/admin/speech',
        method: 'get'
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
 * 保存背景图片
 * @param {*} id 
 */
const addBg = ({image_id,remark}) => {
    return request({
        url: SERVICE_NAME + '/admin/back-image',
        method: 'post'
    }) 
}


export {
    getSecretById,
    getSecretList,
    getSecretListByPhone,
    addSecret,
    updateSecret,
    deleteSecret,
    addBg
}