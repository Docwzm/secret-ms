import { login, getFrendList, getRecentSess, getC2CHistoryMsg } from '../../apis/im'
import config from '../../configs/im'
import { setLocal, getLocal, randomWord } from '../../utils/index'
import store from '../store';

let timer = null;

/**
* im登陆
* @param imConfig {im登陆所需信息}
*/
const webImLogin = (imConfig) => {
    window.webim.login(imConfig.imLoginInfo,
        {
            onConnNotify,
            jsonpCallback,
            onMsgNotify
        },
        imConfig.imOpts,
        res => {//登录成回调
            imConfig.imLoginInfo.headurl = res.headUrl;
            imConfig.imLoginInfo.identifierNick = res.identifierNick;
            store.dispatch({
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
//建立链接
const onConnNotify = (resp) => {
    let info;
    switch (resp.ErrorCode) {
        case window.webim.CONNECTION_STATUS.ON:
            window.webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
            break;
        case window.CONNECTION_STATUS.OFF:
            info = '连接已断开，无法收到新消息，请检查下您的网络是否正常: ' + resp.ErrorInfo;
            window.webim.Log.warn(info);
            break;
        case window.webim.CONNECTION_STATUS.RECONNECT:
            info = '连接状态恢复正常: ' + resp.ErrorInfo;
            window.webim.Log.warn(info);
            break;
        default:
            window.webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
            break;
    }
};
//设置 jsonp 返回的
const jsonpCallback = (rspData) => {
    window.webim.setJsonpLastRspData(rspData);
}

/**
* 监听新消息事件
* @param {为新消息数组，结构为[Msg]} newMsgList 
*/
const onMsgNotify = (newMsgList) => {
    let {
        recentSess,
        historyMsg,
        config,
        friendList
    } = store.getState().imInfo

    for (let j in newMsgList) { //遍历新消息
        let newMsg = newMsgList[j];
        let { time, seq, random, elems, fromAccount, fromAccountHeadurl, fromAccountNick } = newMsg;
        if (!friendList[fromAccount]) {
            friendList[fromAccount] = {
                name: fromAccountNick,
                headUrl: fromAccountHeadurl,
                unReadCount: 1
            }
            store.dispatch({
                type: 'FRIENDLIST',
                payload: {
                    data: friendList
                }
            })
        }
        if (!findIdFromSess(recentSess, fromAccount)) { //会话列表中无此人
            recentSess = [{
                identifier: fromAccount,
                unReadCount: 1,
                msgDetail: {
                    CreateTime: time * 1000,
                    // msgId: seq,
                    callbackCommand: "C2C.CallbackAfterSendMsg",
                    msgId: random,
                    fromAccount,
                    toAccount: config.imLoginInfo.identifier,
                    MsgBody: [
                        {
                            MsgType: elems[0].type,
                            MsgContent: convertMsgConten(elems[0])
                        }
                    ]
                }
            }].concat(recentSess)

            store.dispatch({
                type: 'RECENTSESS',
                payload: {
                    data: recentSess
                }
            })
        } else {//会话列表中有此人

            //更新会话列表
            upDateRecentSess(fromAccount, newMsg)

            //添加历史数据
            if (historyMsg && historyMsg[fromAccount]) {//已经加载过历史纪录
                addMsg(newMsg);
            }
        }
    }
}

/**
* 查找会话列表中是否有某个好友
* @param 
*/
const findIdFromSess = (recentSess, id) => {
    let flag = false;
    recentSess.map(item => {
        if (item.identifier == id) {
            flag = true;
        }
    })
    return flag
}

const convertMsgType = (msgElem) => {
    switch (msgElem.type) {
        case window.webim.MSG_ELEMENT_TYPE.TEXT:
            return 1
            break;
        case window.webim.MSG_ELEMENT_TYPE.IMAGE:
            return 2
            break;
        case window.webim.MSG_ELEMENT_TYPE.CUSTOM:
            return 3
            break;
        default:
            return 0
    }
}

const convertMsgConten = (msgElem) => {
    switch (msgElem.type) {
        case window.webim.MSG_ELEMENT_TYPE.TEXT:
            return {
                Text: msgElem.content.text
            }
            break;
        case window.webim.MSG_ELEMENT_TYPE.IMAGE:
            return {
                UUID: msgElem.content.UUID,
                ImageFormat: 255,
                ImageInfoArray: msgElem.content.ImageInfoArray
            }
            break;
        case window.webim.MSG_ELEMENT_TYPE.CUSTOM:
            let data = {};
            if (msgElem.content.data) {
                data = JSON.parse(msgElem.content.data);
            }
            if (data.type == 4) {
                let imageUrl = data.data.imageUrl;
                return {
                    UUID: randomWord(),
                    ImageFormat: 255,
                    ImageInfoArray: [{ Type: 1, URL: imageUrl }, { Type: 2, URL: imageUrl }, { Type: 3, URL: imageUrl }]
                }
            } else {
                let Desc = '';
                if (data.type == 1) {
                    Desc = '[随访计划]'
                } else if (data.type == 2) {
                    Desc = '[患教内容]'
                } else if (data.type == 3) {
                    Desc = '[测量计划]'
                }
                return {
                    Data: msgElem.content.data,
                    Desc
                }
            }
            break;
        default:
            return {}
    }
}

const upDateRecentSess = (identifier, newMsg) => {
    let {
        selToId
    } = store.getState().imInfo
    let { time, seq, random, elems } = newMsg;
    let { recentSess } = store.getState().imInfo
    recentSess.map(item => {
        if (item.identifier == identifier) {
            if (identifier != selToId) {
                //如果非当前的聊天好友 则未读消息+1 
                item.unReadCount += 1;
            }
            item.msgDetail = Object.assign({}, item.msgDetail, {
                CreateTime: time * 1000,
                // msgId: seq,
                msgId: random,
                MsgBody: [
                    {
                        MsgType: elems[0].type,
                        MsgContent: convertMsgConten(elems[0])
                    }
                ]
            })
        }
    })
    store.dispatch({
        type: 'RECENTSESS',
        payload: {
            data: recentSess
        }
    })
}

const findMsgFromHistory = (fromAccount, msgRandom) => {
    let {
        historyMsg,
    } = store.getState().imInfo;
    let flag = false;
    if (historyMsg[fromAccount]) {
        for (let x = 0; x < historyMsg[fromAccount].length; x++) {
            if (historyMsg[fromAccount][x].msgId == msgRandom) {
                flag = true;
                break;
            }
        }
    }
    return flag;
}

//监听到消息后 增加一条新消息
const addMsg = (msg) => {
    let { time, seq, random, elems, fromAccount } = msg;
    let {
        historyMsg,
        config,
        friendList,
        selToId
    } = store.getState().imInfo;
    let new_historyMsg = historyMsg;
    let new_msg = [{
        CreateTime: time * 1000,
        CallbackCommand: "C2C.CallbackAfterSendMsg",
        msgId: seq,
        msgUniqueId: random,
        From_Account: fromAccount,
        To_Account: config.imLoginInfo.identifier,
        MsgBody: [
            {
                MsgType: elems[0].type,
                MsgContent: convertMsgConten(elems[0])
            }
        ]
    }]

    if (!findMsgFromHistory(fromAccount, random)) {
        let latestTime = new_historyMsg[fromAccount][new_historyMsg[fromAccount].length - 1].CreateTime;
        let diffTime = time * 1000 - latestTime;
        if (diffTime > 60000) {
            new_msg[0].showTime = true;
        }
        new_historyMsg[fromAccount] = historyMsg[fromAccount].concat(new_msg)
        //更新历史消息
        store.dispatch({
            type: 'HISTORY_MSG',
            payload: {
                data: new_historyMsg
            }
        })

        if (selToId == fromAccount) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                let message_list_el = document.getElementById('message');
                if (message_list_el) {
                    message_list_el.scrollTop = message_list_el.scrollHeight - message_list_el.clientHeight;
                }
            }, 50)
        }

        // delete friendList[fromAccount].scrollTop
        // store.dispatch({
        //     type: 'FRIENDLIST',
        //     payload: {
        //         data: friendList
        //     }
        // })
    }
}

const sendCommonMsg = (data) => {
    let { value } = data;
    let text = value;
    let {
        selType,
        selToId,
        config,
    } = store.getState().imInfo;
    let user = JSON.parse(getLocal('user'))
    let {
        headUrl,
        name
    } = store.getState().imInfo.friendList[store.getState().imInfo.selToId]

    let selSess = new window.webim.Session(selType, selToId, name, headUrl, Math.round(new Date().getTime() / 1000));
    let isSend = true; //是否为自己发送
    let seq = -1; //消息序列，-1表示sdk自动生成，用于去重
    let random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
    let msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
    let subType = window.webim.C2C_MSG_SUB_TYPE.COMMON; //消息子类型
    if (selType == window.webim.SESSION_TYPE.C2C) {
        subType = window.webim.C2C_MSG_SUB_TYPE.COMMON;
    } else {
        subType = window.webim.GROUP_MSG_SUB_TYPE.COMMON;
    }
    let msg = new window.webim.Msg(selSess, isSend, seq, random, msgTime, config.imLoginInfo.identifier, subType, user.realName);
    let text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
    //解析文本和表情
    let expr = /\[[^[\]]{1,3}\]/mg;
    let emotions = text.match(expr);
    if (!emotions || emotions.length < 1) {
        text_obj = new window.webim.Msg.Elem.Text(text);
        msg.addText(text_obj);
    } else {
        for (let i = 0; i < emotions.length; i++) {
            tmsg = text.substring(0, text.indexOf(emotions[i]));
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
            restMsgIndex = text.indexOf(emotions[i]) + emotions[i].length;
            text = text.substring(restMsgIndex);
        }
        if (text) {
            text_obj = new window.webim.Msg.Elem.Text(text);
            msg.addText(text_obj);
        }
    }

    msg.PushInfo = {
        "PushFlag": 0,
        "Desc": '', //离线推送内容
        "Ext": '', //离线推送透传内容
        "AndroidInfo": {
            "Sound": "" //离线推送声音文件路径。
        },
        "ApnsInfo": {
            "Sound": "", //离线推送声音文件路径。
            "BadgeMode": 1
        }
    };

    msg.PushInfoBoolean = true; //是否开启离线推送push同步
    msg.sending = 1;
    msg.originContent = text;

    sendMsg(msg, 1, data)
}

const sendCustomMsg = (data, desc = '', ext = '') => {
    let {
        selType,
        selToId,
        config,
    } = store.getState().imInfo;
    let user = JSON.parse(getLocal('user'))
    let {
        headUrl,
        name
    } = store.getState().imInfo.friendList[store.getState().imInfo.selToId]

    let selSess = new window.webim.Session(selType, selToId, name, headUrl, Math.round(new Date().getTime() / 1000));
    var msg = new window.webim.Msg(selSess, true, -1, -1, -1, config.imLoginInfo.identifier, 0, user.realName);
    var custom_obj = new window.webim.Msg.Elem.Custom(data.value, desc, ext);
    msg.addCustom(custom_obj);
    //调用发送消息接口
    msg.sending = 1;
    sendMsg(msg, 3, data)

}

const filterMsgType = (type) => {
    switch (type) {
        case 1:
            return "TIMTextElem"
        case 2:
            return "TIMImageElem"
        case 3:
            return "TIMCustomElem"
    }
}

const sendMsg = (msg, type, data) => {
    let { value, reSend, msgUniqueId } = data;
    let {
        selToId,
        config,
        historyMsg,
        friendList
    } = store.getState().imInfo;
    let new_historyMsg = historyMsg;
    let MsgContent = {};
    if (type == 1) {
        MsgContent = {
            Text: value
        }
    } else if (type == 2) {
    } else if (type == 3) {
        let data = JSON.parse(value);
        if (data.type == 4) {
            let imageUrl = data.data.imageUrl;
            MsgContent = {
                UUID: randomWord(),
                ImageFormat: 255,
                ImageInfoArray: [{ type: 1, url: imageUrl }, { type: 2, url: imageUrl }, { type: 3, url: imageUrl }]
            }
        } else {
            MsgContent = {
                Data: value
            }
        }
    }

    let newMess = {
        CreateTime: msg.time * 1000,
        CallbackCommand: "C2C.CallbackBeforeSendMsg",
        msgId: "xxxxx",
        msgUniqueId: Math.round(Math.random() * 4294967296),
        From_Account: config.imLoginInfo.identifier,
        To_Account: selToId,
        MsgBody: [
            {
                MsgContent,
                MsgType: filterMsgType(type)
            }
        ]
    }
    let resendItemIndex = 0;

    let latestTime = new_historyMsg[selToId].length > 0 ? new_historyMsg[selToId][new_historyMsg[selToId].length - 1].CreateTime : 0;
    let diffTime = newMess.CreateTime - latestTime;
    if (diffTime > 60000) {
        newMess.showTime = true;
    }

    if (reSend) {
        new_historyMsg[selToId].map((item, index) => {
            if (item.msgUniqueId == msgUniqueId) {
                resendItemIndex = index;
            }
            return item;
        })
        new_historyMsg[selToId].splice(resendItemIndex, 1)
    }

    new_historyMsg[selToId] = historyMsg[selToId].concat([newMess])

    store.dispatch({
        type: 'HISTORY_MSG',
        payload: {
            data: new_historyMsg
        }
    })

    delete friendList[selToId].scrollTop

    store.dispatch({
        type: 'FRIENDLIST',
        payload: {
            data: friendList
        }
    })

    window.webim.sendMsg(msg, function (resp) {
    }, function (err) {
        newMess.reSend = true
        //更新历史消息
        store.dispatch({
            type: 'HISTORY_MSG',
            payload: {
                data: new_historyMsg
            }
        })
    });
}



export default {
    //im 登陆
    imLogin() {
        return dispatch => {
            let imConfig = {
                imLoginInfo: config.imLoginInfo,
                imOpts: config.imOpts,
            }
            // let imUserInfo = getLocal('imUserInfo');

            // if (imUserInfo) {
            //     imConfig.imLoginInfo = {
            //         ...imConfig.imLoginInfo,
            //         ...JSON.parse(imUserInfo)
            //     }
            //     return webImLogin(imConfig)
            // } else {
            return login().then(res => {
                imConfig.imLoginInfo = {
                    ...imConfig.imLoginInfo,
                    identifier: res.data.identifier,
                    userSig: res.data.token
                }


                // setLocal('imUserInfo', JSON.stringify(imUserInfo))
                //im 登录

                webImLogin(imConfig)

            })
            // }

        }
    },
    setFriendList(data) {
        return {
            type: 'FRIENDLIST',
            payload: {
                data
            }
        }
    },
    initRecentContactList(selToId) {
        return dispatch => {
            return getFrendList().then(res => {
                let userList = res.data.patients || [];
                const identifiers = [];
                let friendList = {};
                userList.map(item => {
                    friendList[item.imUserId] = {
                        name: item.nickName || item.userName,
                        headUrl: item.headImg,
                        unReadCount: 0,
                        // hasMoreHistory: false
                    }
                    identifiers.push(item.imUserId)
                })

                getRecentSess(identifiers).then(res => {
                    let topIndex = 0;
                    let recentSess = res.data&&res.data.msgList?res.data.msgList:[];
                    recentSess = recentSess.map((item, index) => {
                        friendList[item.identifier].unReadCount = item.unReadCount
                        if (item.identifier == selToId) {
                            item.unReadCount = 0;
                            topIndex = index;
                        }
                        if (item.msgDetail && item.msgDetail.MsgBody[0].MsgType == 'TIMCustomElem') {
                            if (item.msgDetail.MsgBody[0].MsgContent.Data) {
                                let custom_data = JSON.parse(item.msgDetail.MsgBody[0].MsgContent.Data);
                                if (custom_data.type == 1) {
                                    item.msgDetail.MsgBody[0].MsgContent.Desc = '[随访计划]'
                                } else if (custom_data.type == 2) {
                                    item.msgDetail.MsgBody[0].MsgContent.Desc = '[患教内容]'
                                } else if (custom_data.type == 3) {
                                    item.msgDetail.MsgBody[0].MsgContent.Desc = '[测量计划]'
                                }
                            }
                        }
                        return item;
                    })

                    if (selToId && topIndex != 0) {
                        let topItem = recentSess.splice(topIndex, 1);
                        recentSess = topItem.concat(recentSess);
                    }

                    dispatch({
                        type: "FRIENDLIST",
                        payload: {
                            data: friendList
                        }
                    })

                    dispatch({
                        type: 'RECENTSESS',
                        payload: {
                            data: recentSess
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
                data: recentSess
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
    loadMess({ identifier, endTime = '', count = 10, type }, callback) {
        return (dispatch, getState) => {
            getC2CHistoryMsg({
                identifier,
                endTime,
                count
            }).then(res => {
                let data = res.data.msgList || [];
                let { historyMsg, friendList, recentSess } = getState().imInfo;
                //时间周期过滤
                let time = data.length > 0 ? data[0].CreateTime : '';
                data.map((item, index) => {
                    if (index != 0) {
                        let diffTime = item.CreateTime - time;
                        if (diffTime > 60000) {
                            item.showTime = true;
                            time = item.CreateTime
                        }
                    } else {
                        item.showTime = true;
                    }

                    let content = item.MsgBody[0];
                    if (content.MsgType == 'TIMCustomElem') {
                        if (content.MsgContent.Data) {
                            let custom_data = JSON.parse(content.MsgContent.Data)
                            if (custom_data.type == 4) {
                                item.MsgBody = [
                                    {
                                        MsgType: 'TIMImageElem',
                                        MsgContent: {
                                            UUID: randomWord(),
                                            ImageFormat: 255,
                                            ImageInfoArray: [{ Type: 1, URL: custom_data.data.imageUrl }, { Type: 2, URL: custom_data.data.imageUrl }, { Type: 3, URL: custom_data.data.imageUrl }]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                    return item
                })

                if (type == 1 && data.length > 0) {
                    data[0].unReadCountLoadDone = true;//标识以下为新消息
                }

                if (!historyMsg) {
                    historyMsg = {}
                }
                if (!historyMsg[identifier]) {
                    historyMsg[identifier] = [];
                }
                historyMsg[identifier] = data.concat(historyMsg[identifier])

                if (historyMsg[identifier].length > 0) {
                    let msgId = '';
                    let msgDetail = {};
                    let flag = false;

                    recentSess.map(item => {
                        if (item.identifier == identifier && item.msgDetail) {
                            msgId = item.msgDetail.msgId;
                            msgDetail = item.msgDetail;
                            msgDetail.From_Account = item.msgDetail.fromAccount
                            msgDetail.To_Account = item.msgDetail.toAccount
                        }
                    })
                    
                    historyMsg[identifier].map(item => {
                        if (item.msgId == msgId) {
                            flag = true;
                        }
                    })

                    if (!flag) {
                        historyMsg[identifier] = historyMsg[identifier].concat([msgDetail])
                    }
                }


                dispatch({
                    type: 'HISTORY_MSG',
                    payload: {
                        data: historyMsg
                    }
                })

                if (type == 1) {
                    this.setUnReadCount(identifier, 0)
                }

                //hasmore
                if (!friendList[identifier]) {
                    friendList[identifier] = {}
                }
                if (data.length != 0 && !data.endFlag) {
                    friendList[identifier].hasMoreHistory = true
                } else {
                    friendList[identifier].hasMoreHistory = false
                }

                dispatch({
                    type: 'FRIENDLIST',
                    payload: {
                        data: friendList
                    }
                })

                typeof callback == 'function' && callback()
            })
        }
    },
    setUnReadCount(identifier, count) {
        return (dispatch, getState) => {
            let friendList = getState().imInfo.friendList;
            friendList[identifier].unReadCount = count;
            dispatch({
                type: 'FRIENDLIST',
                payload: {
                    data: friendList
                }
            })
        }
    },
    sendMsg(msgType, data) {
        return (dispatch, getState) => {
            if (msgType == 1) {
                sendCommonMsg(data)
            } else if (msgType == 2) {

            } else if (msgType == 3) {
                sendCustomMsg(data)
            }
        }
    }
}



