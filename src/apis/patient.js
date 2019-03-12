import request from '../utils/request'
const SERVICE_NAME = '/doctor_service'

/**
 * 创建分组
 * @param {*} data 
 */
const createGroup = (data) => {
    return request({
        url: SERVICE_NAME + '/admin/create_group',
        data,
        method: "post"
    })
}

/**
 * 查询分组
 */
const getGroup = () => {
    return request({
        url: SERVICE_NAME + '/admin/find_group',
        method: "post"
    })
}

/**
 * 编辑分组
 * @param {*} data 
 */
const updateGroup = (data) => {
    return request({
        url: SERVICE_NAME + '/admin/update_group',
        data,
        mrthod: "post"
    })
}

/**
 * 删除分组
 * @param {*} groupId 
 */
const deleteGroup = (groupId) => {
    return request({
        url: SERVICE_NAME + '/admin/delete_group',
        data: {
            groupId
        },
        method: "post"
    })
}

/**
 * 添加患者
 * @param {*} data 
 */
const createPatient = (data) => {
    return request({
        url: SERVICE_NAME + '/admin/create_patient',
        data,
        method: "post"
    })
}

export {
    createGroup,
    getGroup,
    updateGroup,
    deleteGroup,
    createPatient
}