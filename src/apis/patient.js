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

/**
 * 患者列表
 */
const findPatientList = (data) => {
    return request({
        url:SERVICE_NAME + '/admin/find_patient',
        method:"post",
        data
    })
}

/**
 * 查询患者信息
 * @param {*} 
 */
const getPatientInfo = () => {
    return request({
        url:'',
        data:{

        },
        method:'post'
    })
}

/**
 * 查询某个患者是否在课题内
 * @param {*}  patientId 患者id
 */
const checkPatientInTopic = (patientId) => {
    return request({
        url:'/rpmrelation_service/checkPatientInTopic',
        method:'post',
        data:{
            patientId
        }
    })
}

export {
    createGroup,
    getGroup,
    updateGroup,
    deleteGroup,
    createPatient,
    getPatientInfo,
    findPatientList,
    checkPatientInTopic
}