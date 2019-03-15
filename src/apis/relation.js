import request from '../utils/request'
const SERVICE_NAME = '/rpmrelation_service'

/**
 * 绑定患者
 * @param {*} data 
 */
const bindPatient = (data) => {
    return request({
        url: SERVICE_NAME + "/bindPatient",
        data,
        method: "post"
    })
}

/**
 * 查询医生分组
 */
const findGroup = () => {
    return request({
        url: SERVICE_NAME + '/findGroups',
        method: "post"
    })
}

/**
 * 创建医生分组
 * @param {*} data 
 */
const createGroup = (data) => {
    return request({
        url: SERVICE_NAME + '/createGroup',
        method: "post",
        data
    })
}

/**
 *修改分组
 */
const updateGroup = (data) => {
    return request({
        url: SERVICE_NAME + '/updateGroup',
        method: "post",
        data
    })
}

/**
 * 删除分组
 * @param {*} data 
 */
const deleteGroup = (data) => {
    return request({
        url: SERVICE_NAME + '/deleteGroup',
        method: "post",
        data
    })
}

export {
    bindPatient,
    findGroup,
    createGroup,
    updateGroup,
    deleteGroup
}