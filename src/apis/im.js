import request from '../utils/request'
const IM_URL = '/im_service'

//登陆
export function login() {
    // return request({
    //     url: `/im/tx_im_token`,
    //     method: "post"
    // })

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data: {
                    identifier: 'f4614ff88ff14663bbd94c6436608fac',
                    token: 'eJxFkF1PgzAYhf8L18a19AMw8QK10elwE7cRuSFAW1JwrEKHkMX-LhIWb8-znrznnLO1Xb1fp1ornqQmQQ23bixgXU2y6LVqRJJKI5pRhoQQG4AL7UTTqmM9AhtAAm0EwD9UXNRGSTUZJaYQS*m6UkJMKcoy7uGcYkQpcGWaz55WFeNxwHb3S0Y2W5KzODxEfeGX6**geCxfqm4NPoLXUDLnyfmKn9-iTQR9xfyTIK2u2qh37zJv0YXDg5afsV*HfDmsCGOLXVMWTqT2fXV7ecarZKr9VwyPwSGiDp2hUQcxFcbQI2RMOetpnh9PtUnMoMW0088vaWZe9g__'
                }
            })
        }, 1000)
    })
}

//获取用户好友列表
export function getFrendList() {
    // return request({
    //     url: `/im/chat_user_list`,
    //     method: 'post',
    // })
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data: [{
                    id: 889333,
                    identifier: "aeb3dacdb6a44fd49149684e884d8869",
                    name: '欣怡',
                    headUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    id: 889333,
                    identifier: "55589f4c0960411d917a4f5232736085",
                    name: '潭坚',
                    headUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                }]
            })
        }, 200)
    })


}

//获取私聊记录
export function getC2CHistoryMsg({ identifier, endTime, count }) {
    // return request({
    //     url: `/im/msg_history`,
    //     method: 'post',
    //     data: {
    //         identifier,
    //         endTime,
    //         count
    //     },
    // })

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data: [{
                    sendTime: 1551687234546,
                    callbackCommand: "Group.CallbackAfterSendMsg",
                    msgId: "xxxxx",
                    msgUniqueId: "xxxxx",
                    fromAccount: "aeb3dacdb6a44fd49149684e884d8869",
                    toAccount: "f2a23d2da4bd44ac953344bf761f8216",
                    msgType: 2,
                    msgContent: {
                        UUID: "10685_BF00B89EDCB10A9A34205EA8AE8CC74C",
                        imageFormat: 255,
                        imageInfoArray: [{
                            type: 1,
                            width: 500,
                            height: 375,
                            URL: "https://files.lifesense.com/im/20190305/503acdb7cbc64cec884d761e3693db6b",
                            size: 10685
                        }, {
                            type: 2,
                            width: 500,
                            height: 375,
                            URL: "https://files.lifesense.com/im/20190305/408d46b6c6c346a19546ae58064e3bb0",
                            size: 0
                        }, {
                            type: 3,
                            width: 264,
                            height: 198,
                            URL: "https://files.lifesense.com/im/20190305/823b7915bf814f0bb11b8b1ed8d2e70b",
                            size: 4068
                        }]
                    }
                },
                {
                    sendTime: (1551687234546 + 60001),
                    callbackCommand: "Group.CallbackAfterSendMsg",
                    msgId: "xxxxx",
                    msgUniqueId: "xxxxx",
                    fromAccount: "f2a23d2da4bd44ac953344bf761f8216",
                    toAccount: "aeb3dacdb6a44fd49149684e884d8869",
                    msgType: 1,
                    msgContent: {
                        text: "37dhjkkke"
                    }
                },{
                    sendTime: 1551687234546,
                    callbackCommand: "Group.CallbackAfterSendMsg",
                    msgId: "xxxxx",
                    msgUniqueId: "xxxxx",
                    fromAccount: "aeb3dacdb6a44fd49149684e884d8869",
                    toAccount: "f2a23d2da4bd44ac953344bf761f8216",
                    msgType: 2,
                    msgContent: {
                        UUID: "10685_BF00B89EDCB10A9A34205EA8AE8CC74C",
                        imageFormat: 255,
                        imageInfoArray: [{
                            type: 1,
                            width: 500,
                            height: 375,
                            URL: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                            size: 10685
                        }, {
                            type: 2,
                            width: 500,
                            height: 375,
                            URL: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                            size: 0
                        }, {
                            type: 3,
                            width: 264,
                            height: 198,
                            URL: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                            size: 4068
                        }]
                    }
                }]
            })
        }, 1000)
    })
}

//获取最近会话记录
export function getRecentSess(identifiers) {
    // return request({
    //     url: `/im/last_msg_list`,
    //     method: 'post',
    //     data: {
    //         identifiers
    //     },
    // })

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data: [{
                    identifier: "aeb3dacdb6a44fd49149684e884d8869",
                    unReadCount: 21,
                    msgDetail: {
                        sendTime: 1551687234546,
                        callbackCommand: "Group.CallbackAfterSendMsg",
                        msgId: "xxxxx",
                        msgUniqueId: "xxxxx",
                        fromAccount: "f2a23d2da4bd44ac953344bf761f8216",
                        toAccount: "aeb3dacdb6a44fd49149684e884d8869",
                        msgBody: {
                            msgType: 1,
                            msgContent: {
                                text: "37dhjkkke"
                            }
                        }
                    }
                }, {
                    identifier: "55589f4c0960411d917a4f5232736085",
                    unReadCount: 1,
                    msgDetail: {
                        sendTime: 1551687234546,
                        callbackCommand: "Group.CallbackAfterSendMsg",
                        msgId: "xxxxx",
                        msgUniqueId: "xxxxx",
                        fromAccount: "f2a23d2da4bd44ac953344bf761f8216",
                        toAccount: "55589f4c0960411d917a4f5232736085",
                        msgBody: {
                            msgType: 2,
                            msgContent: {

                            }
                        }
                    }
                }]
            })
        }, 1000)
    })

}