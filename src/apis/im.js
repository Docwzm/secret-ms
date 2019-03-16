import request from '../utils/request'
import { getLocal } from '../utils'
const IM_URL = '/rpmim_service'

//登陆
export function login() {
    let user = getLocal('user')
    let userId = ''
    if (user) {
        userId = JSON.parse(user).userId
    }
    return request({
        url: `${IM_URL}/im/tx_im_token`,
        method: "post",
        data: {
            userId
        }
    })
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve({
    //             data: {
    //                 identifier: 'f4614ff88ff14663bbd94c6436608fac',
    //                 token: 'eJxFkF1PgzAYhf8L18a19AMw8QK10elwE7cRuSFAW1JwrEKHkMX-LhIWb8-znrznnLO1Xb1fp1ornqQmQQ23bixgXU2y6LVqRJJKI5pRhoQQG4AL7UTTqmM9AhtAAm0EwD9UXNRGSTUZJaYQS*m6UkJMKcoy7uGcYkQpcGWaz55WFeNxwHb3S0Y2W5KzODxEfeGX6**geCxfqm4NPoLXUDLnyfmKn9-iTQR9xfyTIK2u2qh37zJv0YXDg5afsV*HfDmsCGOLXVMWTqT2fXV7ecarZKr9VwyPwSGiDp2hUQcxFcbQI2RMOetpnh9PtUnMoMW0088vaWZe9g__',
    //             }
    //         })
    //     }, 1000)
    // })
}

//更新用户消息未读数
export function updateReadTime(readIdentifier,sendIdentifier) {
    return request({
        url: `${IM_URL}/im/update_read_time`,
        method: 'post',
        data:{
            readIdentifier,
            sendIdentifier
        }
    })
}

//获取用户好友列表
export function getFrendList() {
    let user = getLocal('user')
    let userId = ''
    if (user) {
        userId = JSON.parse(user).userId
    }
    return request({
        url: `/rpmrelation_service/findPatients`,
        method: 'post',
        data:{
            doctorId:userId
        }
    })
}

//获取私聊记录
export function getC2CHistoryMsg({ identifier, endTime, count }) {
    let user = getLocal('user')
    let userId = ''
    if (user) {
        userId = JSON.parse(user).userId
    }
    return request({
        url: `${IM_URL}/im/msg_history`,
        method: 'post',
        data: {
            identifier,
            endTime,
            count,
            userId
        }
    })
}

//获取最近会话记录
export function getRecentSess(identifiers) {
    let user = getLocal('user')
    let userId = ''
    if (user) {
        userId = JSON.parse(user).userId
    }
    return request({
        url: `${IM_URL}/im/last_msg_list`,
        method: 'post',
        data: {
            identifiers,
            userId
        },
    })
}
