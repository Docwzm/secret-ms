import request from '../utils/request'
const SERVER_NAME = 'rpmsms_service'

/**
 * 图形验证码
 * @param {*} mobile 
 */
const getValidateCode = (mobile) => {
    return request({
        url: SERVER_NAME + "/verify/getValidateCode?mobile=" + mobile
    })
}


/**
 * 短信验证码
 * @param {*} data 
 */
const sendCode = (data) => {
    return request({
        url: SERVER_NAME + '/verify/send_code',
        data,
        method: "post"
    })
}

export {
    getValidateCode,
    sendCode
}