import request from '../utils/request'
import config from '../configs/index'
const SERVICE_NAME = '/rpmprogram_service'

/**
 * 新增随访方案
 * @param {*} data 
 */
const createFollowUpPlan = (data) => {
    return request({
        url:SERVICE_NAME + "/program/doctor/add_visit",
        data
    })
}

export {
    createFollowUpPlan
}