import request from '../utils/request'
import config from '../configs/index'
const SERVICE_NAME = '/rpmprogram_service'

/**
 * 新增随访方案
 * @param {*} data 
 */
const createFollowUpPlan = (data) => {
    return request({
        url: SERVICE_NAME + "/program/doctor/add_visit",
        data,
        method:"post"
    })
}

/**
 * 编辑随访方案
 * @param {*} data 
 */
const updateFollowUpPlan = (data) => {
    return request({
        url: SERVICE_NAME + '/program/doctor/update_visit',
        data,
        method:"post"
    })
}

/**
 * 新增测量方案
 * @param {*} data 
 */
const createMeasurementPlan = (data) => {
    return request({
        url: SERVICE_NAME + "/program/doctor/add_measurement",
        data,
        method:"post"
    })
}

/**
 * 编辑测量方案
 * @param {*} data 
 */
const updateMeasurementPlan = (data) => {
    return request({
        url: SERVICE_NAME + '/program/doctor/update_publicity',
        data
    })
}

/**
 * 方案列表
 * @param {*} data 
 */
const planList = (data) => {
    return request({
        url: SERVICE_NAME + '/program/doctor/list',
        data,
        method: "post"
    })
}

/**
 * 方案明细
 * @param {*} programId 
 */
const planDetail = (programId) => {
    return request({
        url: SERVICE_NAME + '/program/doctor/program_info?programId=' + programId
    })
}

/**
 * 获取患者随访方案
 */
const getPatientPlan = (patientId,type) => {
    return request({
        url:SERVICE_NAME + '/program/doctor/user_program?patientId='+patientId+"&type="+type,
    })
}

export {
    createFollowUpPlan,
    updateFollowUpPlan,
    createMeasurementPlan,
    updateMeasurementPlan,
    planList,
    planDetail,
    getPatientPlan
}