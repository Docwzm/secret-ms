import { login, getFrendList, getRecentSess, getC2CHistoryMsg } from '../../apis/im'
import config from '../../configs/im'
import { setLocal, getLocal } from '../../utils/index'
import store from '../store';

const onConnNotify = (resp) => {
    var info;
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

/**
* 监听新消息事件
* @param {为新消息数组，结构为[Msg]} newMsgList 
*/
const onMsgNotify = (newMsgList, dispatch) => {
    console.log('消息来了')
    console.log(newMsgList)
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
                // return login().then(res => {
                imConfig.imLoginInfo = {
                    ...imConfig.imLoginInfo,
                    identifier: 'f4614ff88ff14663bbd94c6436608fac',
                    userSig: 'eJxFkF1PgzAYhf8L18a19AMw8QK10elwE7cRuSFAW1JwrEKHkMX-LhIWb8-znrznnLO1Xb1fp1ornqQmQQ23bixgXU2y6LVqRJJKI5pRhoQQG4AL7UTTqmM9AhtAAm0EwD9UXNRGSTUZJaYQS*m6UkJMKcoy7uGcYkQpcGWaz55WFeNxwHb3S0Y2W5KzODxEfeGX6**geCxfqm4NPoLXUDLnyfmKn9-iTQR9xfyTIK2u2qh37zJv0YXDg5afsV*HfDmsCGOLXVMWTqT2fXV7ecarZKr9VwyPwSGiDp2hUQcxFcbQI2RMOetpnh9PtUnMoMW0088vaWZe9g__',
                    // identifier: res.data.imInfo.identifier,
                    // userSig: res.data.imInfo.token
                }


                setLocal('imUserInfo', JSON.stringify(imUserInfo))
                //im 登录

                webImLogin(dispatch, imConfig)

                // })
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
            let historyMsg = getState().imInfo.historyMsg;
            handleMsgSend(value)
            return false;
            //更新历史消息
            dispatch({
                type: 'SEND_MSG',
                payload: {
                    data: ''
                }
            })
        }
    }
}

function handleMsgSend(msgContent) {
    // if (!selSess) {
    var selSess = new window.webim.Session(window.webim.SESSION_TYPE.C2C, 'aeb3dacdb6a44fd49149684e884d8869', 'aeb3dacdb6a44fd49149684e884d8869', 'friendHeadUrl', Math.round(new Date().getTime() / 1000));
    // }
    var isSend = true; //是否为自己发送
    var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
    var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
    var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
    var subType = window.webim.C2C_MSG_SUB_TYPE.COMMON; //消息子类型
    // if (selType == window.webim.SESSION_TYPE.C2C) {
    //     subType = window.webim.C2C_MSG_SUB_TYPE.COMMON;
    // } else {
    //     subType = window.webim.GROUP_MSG_SUB_TYPE.COMMON;
    // }
    console.log(store.getState().imInfo)
    var msg = new window.webim.Msg(selSess, isSend, seq, random, msgTime, store.getState().imInfo.config.imLoginInfo.identifier, subType, '阳阳');

    var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
    //解析文本和表情
    var expr = /\[[^[\]]{1,3}\]/mg;
    var emotions = msgContent.match(expr);
    if (!emotions || emotions.length < 1) {
        text_obj = new window.webim.Msg.Elem.Text(msgContent);
        msg.addText(text_obj);
    } else {
        for (var i = 0; i < emotions.length; i++) {
            tmsg = msgContent.substring(0, msgContent.indexOf(emotions[i]));
            if (tmsg) {
                text_obj = new window.webim.Msg.Elem.Text(tmsg);
                msg.addText(text_obj);
            }
            emotionIndex = window.webim.EmotionDataIndexs[emotions[i]];
            emotion = window.webim.Emotions[emotionIndex];

            if (emotion) {
                face_obj = new window.webim.Msg.Elem.Face(emotionIndex, emotions[i]);
                msg.addFace(face_obj);
            } else {
                text_obj = new window.webim.Msg.Elem.Text(emotions[i]);
                msg.addText(text_obj);
            }
            restMsgIndex = msgContent.indexOf(emotions[i]) + emotions[i].length;
            msgContent = msgContent.substring(restMsgIndex);
        }
        if (msgContent) {
            text_obj = new window.webim.Msg.Elem.Text(msgContent);
            msg.addText(text_obj);
        }
    }

    msg.PushInfo = {
        "PushFlag": 0,
        "Desc": '测试离线推送内容', //离线推送内容
        "Ext": '测试离线推送透传内容', //离线推送透传内容
        "AndroidInfo": {
            "Sound": "android.mp3" //离线推送声音文件路径。
        },
        "ApnsInfo": {
            "Sound": "apns.mp3", //离线推送声音文件路径。
            "BadgeMode": 1
        }
    };

    msg.PushInfoBoolean = true; //是否开启离线推送push同步
    msg.sending = 1;
    msg.originContent = msgContent;
    // addMsg(msg);


    // $("#send_msg_text").val('');
    // turnoffFaces_box();
    console.log(msg)
    // return false;

    window.webim.sendMsg(msg, function (resp) {
        console.log(resp)
        //发送成功，把sending清理
        // $("#id_" + msg.random).find(".spinner").remove();
        // webim.Tool.setCookie("tmpmsg_" + selToID, '', 0);
    }, function (err) {
        //alert(err.ErrorInfo);
        //提示重发
        // showReSend(msg);
    });
}

