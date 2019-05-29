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
        method: "post"
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
        method: "post"
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
        method: "post"
    })
}

/**
 * 编辑测量方案
 * @param {*} data 
 */
const updateMeasurementPlan = (data) => {
    return request({
        url: SERVICE_NAME + '/program/doctor/update_measurement',
        method: 'post',
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
 * @param {*} patientId 
 * @param {*} type 
 */
const getPatientPlan = (patientId, doctorId, type) => {
    return request({
        url: SERVICE_NAME + '/program/doctor/user_program?patientId=' + patientId + "&type=" + type + "&doctorId=" + doctorId,
    })
}

//为用户新增方案
const addPlan = ({
    programId,
    patientId,
    beginTime
}) => {
    return request({
        url: SERVICE_NAME + '/program/doctor/add_user_program',
        method: "post",
        data: {
            programId,
            patientId,
            beginTime
        }
    })
}

/**
 * 查询下次随访
 * @param {*} patientId 
 */
const getNextPlan = (patientId,doctorId) =>{
    return request({
        url:'/rpmprogram_service/program/doctor/user_next_plan?patientId='+patientId+"&doctorId="+doctorId
    })
}

/**
 *修改随访时间
 */
const updateVisitTime = (data) =>{
    return request({
        url:'/rpmprogram_service/program/doctor/update_visit_time',
        method:'post',
        data
    })
}

/**
 * 新增随访节点
 */
const addNewNode = (data) =>{
    return request({
        url:"/rpmprogram_service/program/doctor/add_user_program_node_new",
        method:"post",
        data
    })
}

export {
    createFollowUpPlan,
    updateFollowUpPlan,
    createMeasurementPlan,
    updateMeasurementPlan,
    planList,
    planDetail,
    getPatientPlan,
    addPlan,
    getNextPlan,
    updateVisitTime,
    addNewNode
}