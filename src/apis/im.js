import request from '../utils/request'
const IM_URL = '/im_service'

//登陆
export function login() {
    return request({
        url: `/im/tx_im_token`,
        method: "post"
    })
}

//获取用户好友列表
export function getFrendList() {
    return request({
        url: `/im/chat_user_list`,
        method: 'post',
    })
}

//获取私聊记录
export function getC2CHistoryMsg ({identifier,endTime,count}){
    return request({
        url: `/im/msg_history`,
        method: 'post',
        data: {
            identifier,
            endTime,
            count
        },
    })
}

//获取最近会话记录
export function  getRecentSess (identifiers){
    return request({
        url: `/im/last_msg_list`,
        method: 'post',
        data: {
            identifiers
        },
    })
}