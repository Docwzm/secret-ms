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

export {
    getPatientData
}