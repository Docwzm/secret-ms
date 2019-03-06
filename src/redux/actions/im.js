import { login, getFrendList, getRecentSess, getC2CHistoryMsg } from '../../apis/im'
import config from '../../configs/im'
import { setLocal, getLocal } from '../../utils/index'
import store from '../store';

const onConnNotify = (resp) => {
    let info;
    switch (resp.ErrorCode) {
        case window.webim.CONNECTION_STATUS.ON:
            window.webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
            break;
        case window.CONNECTION_STATUS.OFF:
            info = '连接已断开，无法收到新消息，请检查下您的网络是否正常: ' + resp.ErrorInfo;
            alert(info);
            window.webim.Log.warn(info);
            break;
        case window.webim.CONNECTION_STATUS.RECONNECT:
            info = '连接状态恢复正常: ' + resp.ErrorInfo;
            alert(info);
            window.webim.Log.warn(info);
            break;
        default:
            window.webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
            break;
    }
};

const jsonpCallback = (rspData) => {
    //设置 jsonp 返回的
    window.webim.setJsonpLastRspData(rspData);
}

const findIdFromSess = (recentSess, id) => {
    let flag = false;
    recentSess.map(item => {
        if (item.identifier == id) {
            flag = true;
        }
    })
    return flag
}

/**
* 监听新消息事件
* @param {为新消息数组，结构为[Msg]} newMsgList 
*/
const onMsgNotify = (newMsgList, dispatch) => {
    console.log('消息来了')
    console.log(newMsgList)

    let {
        selToId,
        recentSess,
    } = store.getState().imInfo

    let sess, newMsg, selSess, selType, msgSelToId;
    //获取所有聊天会话
    // let sessMap = webim.MsgStore.sessMap();

    for (let j in newMsgList) { //遍历新消息
        newMsg = newMsgList[j];
        console.log(newMsg)
        msgSelToId = newMsg.getSession().id();

        if (!findIdFromSess(recentSess, msgSelToId)) { //会话列表中无此人
            selType = newMsg.getSession().type();
            selSess = newMsg.getSession();
            let headUrl;
            // if (selType == window.webim.SESSION_TYPE.C2C) {
            //     headUrl = friendHeadUrl;
            // } else {
            //     headUrl = groupHeadUrl;
            // }
            // dispatch({
            //     type: 'RECENTSESS',
            //     payload: {
            //         recentSess: recentSess.concat[{
            //             identifier: msgSelToId,
            //             unReadCount: 1,
            //             msgDetail: {
            //                 sendTime: 1551687234546,
            //                 callbackCommand: "Group.CallbackAfterSendMsg",
            //                 msgId: "xxxxx",
            //                 msgUniqueId: "xxxxx",
            //                 fromAccount: msgSelToId,
            //                 toAccount: "7733333",
            //                 msgBody: {
            //                     msgType: 1,
            //                     msgContent: {
            //                         text: "37dhjkkke"
            //                     }
            //                 }
            //             }
            //         }]
            //     }
            // })
            // addSess(selType, msgSelToId, newMsg.getSession().name(), headUrl, 0, 'sesslist'); //新增一个对象
            // setSelSessStyleOn(msgSelToId);
        }
        if (msgSelToId == selToId) { //为当前聊天对象的消息
            //在聊天窗体中新增一条消息
            //console.warn(newMsg);
            // addMsg(newMsg);
        }
        // msgList.push(newMsg.elems[0].content.text);
    }
    //消息已读上报，以及设置会话自动已读标记
    // webim.setAutoRead(selSess, true, true);

    // for (let i in sessMap) {
    //     sess = sessMap[i];
    //     if (selToId != sess.id()) { //更新其他聊天对象的未读消息数
    //         if (!dateStart) {
    //             dateStart = new Date();
    //         }
    //         updateSessDiv(sess.type(), sess.id(), sess.name(), sess.unread());
    //         console.debug(sess.id(), sess.unread());
    //         dateEnd = new Date();
    //     }
    // }
}

const webImLogin = (dispatch, imConfig) => {
    window.webim.login(imConfig.imLoginInfo,
        {
            onConnNotify,
            jsonpCallback,
            onMsgNotify: newMsgList => {
                onMsgNotify(newMsgList, dispatch)
            },
        },
        imConfig.imOpts,
        res => {//登录成回调
            dispatch({
                type: 'LOGIN',
                payload: {
                    imConfig
                }
            })
        },
        err => {
        }//登录失败回调
    )
}


const sendCommonMsg = (msgContent, dispatch) => {
    let {
        selType,
        selToId,
        config,
        historyMsg
    } = store.getState().imInfo;
    let {
        headUrl,
        name
    } = store.getState().imInfo.friendList[store.getState().imInfo.selToId]
    let new_historyMsg = historyMsg;
    new_historyMsg[selToId] = historyMsg[selToId].concat([
        {
            sendTime: new Date().getTime(),
            callbackCommand: "Group.CallbackAfterSendMsg",
            msgId: "xxxxx",
            msgUniqueId: "xxxxx",
            fromAccount: '1212121321fdafafa',
            toAccount: selToId,
            msgType: 1,
            msgContent: {
                text: msgContent
            }
        }
    ])
    console.log(new_historyMsg)
    //更新历史消息
    dispatch({
        type: 'SEND_MSG',
        payload: {
            data: new_historyMsg
        }
    })
    // if (!selSess) {
    // let selSess = new window.webim.Session(selType, selToId, selToId, headUrl, Math.round(new Date().getTime() / 1000));
    // // }
    // let isSend = true; //是否为自己发送
    // let seq = -1; //消息序列，-1表示sdk自动生成，用于去重
    // let random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
    // let msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
    // let subType = window.webim.C2C_MSG_SUB_TYPE.COMMON; //消息子类型
    // if (selType == window.webim.SESSION_TYPE.C2C) {
    //     subType = window.webim.C2C_MSG_SUB_TYPE.COMMON;
    // } else {
    //     subType = window.webim.GROUP_MSG_SUB_TYPE.COMMON;
    // }
    // let msg = new window.webim.Msg(selSess, isSend, seq, random, msgTime, config.imLoginInfo.identifier, subType, name);

    // let text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
    // //解析文本和表情
    // let expr = /\[[^[\]]{1,3}\]/mg;
    // let emotions = msgContent.match(expr);
    // if (!emotions || emotions.length < 1) {
    //     text_obj = new window.webim.Msg.Elem.Text(msgContent);
    //     msg.addText(text_obj);
    // } else {
    //     for (let i = 0; i < emotions.length; i++) {
    //         tmsg = msgContent.substring(0, msgContent.indexOf(emotions[i]));
    //         if (tmsg) {
    //             text_obj = new window.webim.Msg.Elem.Text(tmsg);
    //             msg.addText(text_obj);
    //         }
    //         emotionIndex = window.webim.EmotionDataIndexs[emotions[i]];
    //         emotion = window.webim.Emotions[emotionIndex];

    //         if (emotion) {
    //             face_obj = new window.webim.Msg.Elem.Face(emotionIndex, emotions[i]);
    //             msg.addFace(face_obj);
    //         } else {
    //             text_obj = new window.webim.Msg.Elem.Text(emotions[i]);
    //             msg.addText(text_obj);
    //         }
    //         restMsgIndex = msgContent.indexOf(emotions[i]) + emotions[i].length;
    //         msgContent = msgContent.substring(restMsgIndex);
    //     }
    //     if (msgContent) {
    //         text_obj = new window.webim.Msg.Elem.Text(msgContent);
    //         msg.addText(text_obj);
    //     }
    // }

    // msg.PushInfo = {
    //     "PushFlag": 0,
    //     "Desc": '测试离线推送内容', //离线推送内容
    //     "Ext": '测试离线推送透传内容', //离线推送透传内容
    //     "AndroidInfo": {
    //         "Sound": "android.mp3" //离线推送声音文件路径。
    //     },
    //     "ApnsInfo": {
    //         "Sound": "apns.mp3", //离线推送声音文件路径。
    //         "BadgeMode": 1
    //     }
    // };

    // msg.PushInfoBoolean = true; //是否开启离线推送push同步
    // msg.sending = 1;
    // msg.originContent = msgContent;
    // // addMsg(msg);

    // console.log(msg)

    // window.webim.sendMsg(msg, function (resp) {
    //     console.log(resp)
    //     let new_historyMsg = historyMsg;
    //     new_historyMsg[selToId] = historyMsg[selToId].concat([
    //         {
    //             sendTime: new Date().getTime(),
    //             callbackCommand: "Group.CallbackAfterSendMsg",
    //             msgId: "xxxxx",
    //             msgUniqueId: "xxxxx",
    //             fromAccount: '1212121321fdafafa',
    //             toAccount: selToId,
    //             msgType: 1,
    //             msgContent: {
    //                 text: msgContent
    //             }
    //         }
    //     ])
    //     console.log(new_historyMsg)
    //     //更新历史消息
    //     dispatch({
    //         type: 'SEND_MSG',
    //         payload: {
    //             data: new_historyMsg
    //         }
    //     })

    // }, function (err) {

    // });
}



const sendCustomMsg = (dispatch, data, desc = '', ext = '') => {
    let {
        selType,
        selToId,
        config,
        historyMsg
    } = store.getState().imInfo;
    let {
        headUrl,
        name
    } = store.getState().imInfo.friendList[store.getState().imInfo.selToId]

    let new_historyMsg = historyMsg;
    new_historyMsg[selToId] = historyMsg[selToId].concat([
        {
            sendTime: new Date().getTime(),
            callbackCommand: "Group.CallbackAfterSendMsg",
            msgId: "xxxxx",
            msgUniqueId: "xxxxx",
            fromAccount: '1212121321fdafafa',
            toAccount: selToId,
            msgType: 3,
            msgContent: {
                text: data
            }
        }
    ])
    dispatch({
        type: 'HISTORY_MSG',
        payload: {
            data: new_historyMsg
        }
    })

    // let selSess = new window.webim.Session(selType, selToId, selToId, headUrl, Math.round(new Date().getTime() / 1000));
    // var msg = new window.webim.Msg(selSess, true, -1, -1, -1, config.imLoginInfo.identifier, 0, name);
    // var custom_obj = new window.webim.Msg.Elem.Custom(data, desc, ext);
    // msg.addCustom(custom_obj);
    // //调用发送消息接口
    // msg.sending = 1;
    // window.webim.sendMsg(msg, function (resp) {
    //     console.log(resp)
    //     let new_historyMsg = historyMsg;
    //     new_historyMsg[selToId] = historyMsg[selToId].concat([
    //         {
    //             sendTime: new Date().getTime(),
    //             callbackCommand: "Group.CallbackAfterSendMsg",
    //             msgId: "xxxxx",
    //             msgUniqueId: "xxxxx",
    //             fromAccount: '1212121321fdafafa',
    //             toAccount: selToId,
    //             msgType: 3,
    //             msgContent: {
    //                 text: data
    //             }
    //         }
    //     ])
    //     dispatch({
    //         type: 'HISTORY_MSG',
    //         payload: {
    //             data: new_historyMsg
    //         }
    //     })
    // }, function (err) {
    //     alert(err.ErrorInfo);
    // });
}


export default {
    //im 登陆
    imLogin() {
        return dispatch => {

            let imConfig = {
                imLoginInfo: config.imLoginInfo,
                imOpts: config.imOpts,
            }
            let imUserInfo = getLocal('imUserInfo');

            if (imUserInfo) {
                imConfig.imLoginInfo = {
                    ...imConfig.imLoginInfo,
                    ...JSON.parse(imUserInfo)
                }
                return webImLogin(dispatch, imConfig)
            } else {
                return login().then(res => {
                    imConfig.imLoginInfo = {
                        ...imConfig.imLoginInfo,
                        identifier: res.data.imInfo.identifier,
                        userSig: res.data.imInfo.token
                    }

                    setLocal('imUserInfo', JSON.stringify(imUserInfo))
                    //im 登录

                    webImLogin(dispatch, imConfig)

                })
            }

        }
    },
    initRecentContactList() {
        return dispatch => {
            return getFrendList().then(res => {
                let userList = res.data.users;
                const identifiers = [];
                userList.map(item => {
                    identifiers.push(item.identifier)
                })
                getRecentSess(identifiers).then(res => {
                    let recentSess = res.data.msgList;
                    dispatch({
                        type: 'RECENTSESS',
                        payload: {
                            recentSess
                        }
                    })
                })
            })
        }
    },
    setRecentSess(recentSess) {
        return {
            type: 'RECENTSESS',
            payload: {
                recentSess
            }
        }
    },
    setSelToId(selToId) {
        return {
            type: 'SELTOID',
            payload: {
                selToId
            }
        }
    },
    loadMess({ identifier, endTime = '', count = 10 }, callback) {
        return (dispatch, getState) => {
            let historyMsg = getState().imInfo.historyMsg;
            historyMsg[getState().imInfo.selToId] = historyMsg[getState().imInfo.selToId].concat(historyMsg[getState().imInfo.selToId])
            setTimeout(() => {
                dispatch({
                    type: 'HISTORY_MSG',
                    payload: {
                        data: historyMsg
                    }
                })

                this.setUnReadCount(identifier, 0)

                callback()

            }, 2000)

            // getC2CHistoryMsg({
            //     identifier,
            //     endTime,
            //     count
            // }).then(res => {
            //     let historyMsg = getState().imInfo.historyMsg;
            //     historyMsg[identifier] = historyMsg[identifier].concat(res.data)
            //     dispatch({
            //         type: 'HISTORY_MSG',
            //         payload: {
            //             data: historyMsg
            //         }
            //     })
            //     this.setUnReadCount(identifier, 0)
            // callback()
            // })
        }
    },
    setUnReadCount(identifier, count) {
        return (dispatch, getState) => {
            let friendList = getState().imInfo.friendList;
            friendList[identifier].unReadCount = count;
            dispatch({
                type: 'UPDATE_UNREADCOUNT',
                payload: {
                    data: friendList
                }
            })
        }
    },
    sendMsg(msgType, value) {
        return (dispatch, getState) => {
            if (msgType == 1) {
                sendCommonMsg(value, dispatch)
            } else if (msgType == 2) {

            } else if (msgType == 3) {
                sendCustomMsg(dispatch, value)
            }

        }
    }
}



