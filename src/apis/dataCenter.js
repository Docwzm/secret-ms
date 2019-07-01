import request from '../utils/request'
const SERVICE_NAME = '/rpmaccount_service'

/**
 * 获取密语列表
 * @param {*} data 
 */
const getSecretList = (data) => {
    return request({
        url: SERVICE_NAME + '/common/login',
        method: 'post',
        data: {
            ...data
        }
    })
}


/**
 * 获取密语列表
 * @param {*} data 
 */
const getSecretListByPhone = (data) => {
    return request({
        url: SERVICE_NAME + '/common/login',
        method: 'post',
        data: {
            ...data
        }
    })
}



const addSecret = (data) => {
    return request({
        url: SERVICE_NAME + '/common/login',
        method: 'post',
        data: {
            ...data
        }
    }) 
}


const updateSecret = (data) => {
    return request({
        url: SERVICE_NAME + '/common/login',
        method: 'post',
        data: {
            ...data
        }
    }) 
}


const deleteSecret = (data) => {
    return request({
        url: SERVICE_NAME + '/common/login',
        method: 'post',
        data: {
            ...data
        }
    }) 
}



export {
    getSecretList,
    getSecretListByPhone,
    addSecret,
    updateSecret,
    deleteSecret
}