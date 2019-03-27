import request from '../utils/request'
const SERVICE_NAME = '/rpmhealthdata_service'

/**
 * 患者测量数据按时间范围查询
 * @param {*} data 
 */
const getPatientData = (data) => {
    return request({
        url:SERVICE_NAME + '/alldata/getAllDataByDate',
        data,
        method:"post"
    })
}


/**
 * 查询患者数据明细，按时间倒叙查询条数；
 * @param {*} data 
 */
const getPatientDataByDateAndCount = (data) => {
    return request({
        url:SERVICE_NAME + '/alldata/getOneDataByDateAndCount',
        data,
        method:"post"
    })
}

export {
    getPatientData,
    getPatientDataByDateAndCount
}