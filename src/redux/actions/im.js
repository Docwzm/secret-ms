import { login, getFrendList, getRecentSess, getC2CHistoryMsg, getPrivateImage,updateReadTime } from '../../apis/im'
import config from '../../configs/im'
import { getLocal, randomWord } from '../../utils/index'
import store from '../store';
let timer = null;
let updateUnReadTimer = null;
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
const onMsgNotify = (dispatch, newMsgList) => {
    let {
        selToId,
        recentSess,
        historyMsg,
        config,
        friendList
    } = store.getState().imInfo
    for (let j in newMsgList) { //遍历新消息
        let newMsg = newMsgList[j];
        let { time, seq, random, elems, fromAccount, fromAccountHeadurl, fromAccountNick } = newMsg;
        let imState = {};
        if (!friendList[fromAccount]) {
            friendList[fromAccount] = {
                name: fromAccountNick,
                headUrl: fromAccountHeadurl,
            }
        }

        if (!findIdFromSess(recentSess, fromAccount)) { //会话列表中无此人
            recentSess = [{
                identifier: fromAccount,
                unReadCount: 1,
                msgDetail: {
                    CreateTime: time * 1000,
                    callbackCommand: "C2C.CallbackBeforeSendMsg",
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

            imState.recentSess = recentSess

            friendList[fromAccount].unReadCount = friendList[fromAccount].unReadCount ? (friendList[fromAccount].unReadCount + 1) : 1

        } else {//会话列表中有此人
            
            //更新会话列表
            imState.recentSess = upDateRecentSess(fromAccount, newMsg)

            //添加历史数据
            if (historyMsg && historyMsg[fromAccount]) {//已经加载过历史纪录
                imState.historyMsg = addMsg(newMsg);
            }

            friendList[fromAccount].unReadCount = friendList[fromAccount].unReadCount ? (friendList[fromAccount].unReadCount + 1) : 1

            if (fromAccount == selToId) {
                // let selSess = newMsg.getSession();
                //消息已读上报，并将当前会话的消息设置成自动已读
                // window.webim.setAutoRead(selSess, true, true);
                imState.loadMessType = 3;
                clearTimeout(updateUnReadTimer)
                updateUnReadTimer = setTimeout(() => {
                    updateReadTime(config.imLoginInfo.identifier, selToId)
                },1000)
                
            }
        }

        imState.friendList = friendList

        dispatch({
            type: 'SETIMSTATE',
            payload: {
                data: imState
            }
        })
    }
}

/**
* 更新会话列表
* @param msgElem identifier(发送者ID),newMsg（新消息实体）
*/
const upDateRecentSess = (identifier, newMsg) => {
    let {
        selToId
    } = store.getState().imInfo
    let { time, random, elems } = newMsg;
    let { recentSess } = store.getState().imInfo
    if (!findMsgFromHistory(identifier, random)) {
        let topIndex = 0;
        recentSess.map((item, index) => {
            if (item.identifier == identifier) {
                topIndex = index;
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
            return item;
        })
        if (topIndex) {
            let topItem = recentSess.splice(topIndex, 1);
            recentSess = topItem.concat(recentSess);
        }
    }
    return recentSess
}

const turnImage = (token, msg) => {
    getPrivateImage(token).then(res => {
        let url = msg.url;
    })
}

const getMsgType = (elem) => {
    if (elem.type == window.webim.MSG_ELEMENT_TYPE.CUSTOM) {
        if (elem.content.data) {
            let data = JSON.parse(elem.content.data);
            if (data.type == 4 || data.type == 5) {
                return window.webim.MSG_ELEMENT_TYPE.IMAGE
            }
        }
    }
    return elem.type;
}

/**
* 监听到消息后 增加一条新消息
* @param msgElem msg新消息实体
*/
const addMsg = (msg) => {
    let { time, random, elems, fromAccount } = msg;
    let {
        historyMsg,
        config,
        selToId
    } = store.getState().imInfo;
    if (!findMsgFromHistory(fromAccount, random)) {
        let new_msg = [{
            CreateTime: time * 1000,
            CallbackCommand: "C2C.CallbackAfterSendMsg",
            msgId: random,
            // msgUniqueId: random,
            From_Account: fromAccount,
            To_Account: config.imLoginInfo.identifier,
            MsgBody: [
                {
                    MsgType: getMsgType(elems[0]),
                    MsgContent: convertMsgConten(elems[0])
                }
            ]
        }]

        let latestTime = (historyMsg[fromAccount]&&historyMsg[fromAccount].length>0)?historyMsg[fromAccount][historyMsg[fromAccount].length - 1].CreateTime:0;
        let diffTime = time * 1000 - latestTime;
        if (diffTime > 60000) {
            new_msg[0].showTime = true;
        }
        historyMsg[fromAccount] = historyMsg[fromAccount].concat(new_msg)

    }
    return historyMsg
}

/**
* 发送文本/表情消息
* @param data 消息内容
*/
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

    let Ext = '{viewType:"SessionView",data:{senderId:'+config.imLoginInfo.identifier+'}}'

    msg.PushInfo = {
        "PushFlag": 0,
        "Desc": text, //离线推送内容
        "Ext": Ext, //离线推送透传内容
        // "AndroidInfo": {
        //     "Sound": "" //离线推送声音文件路径。
        // },
        // "ApnsInfo": {
        //     "Sound": "", //离线推送声音文件路径。
        //     "BadgeMode": 1
        // }
    };

    msg.PushInfoBoolean = true; //是否开启离线推送push同步
    msg.sending = 1;
    msg.originContent = text;
    sendMsg(msg, 1, data)
}
/**
* 发送自定义消息
* @param data 消息内容
*/
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
    let _data = JSON.parse(data.value);
    desc = _data.type==1?'随访方案':(_data.type==2?'患教内容':(_data.type==3?'测量计划':''))
    let selSess = new window.webim.Session(selType, selToId, name, headUrl, Math.round(new Date().getTime() / 1000));
    var msg = new window.webim.Msg(selSess, true, -1, -1, -1, config.imLoginInfo.identifier, 0, user.realName);
    var custom_obj = new window.webim.Msg.Elem.Custom(data.value, desc, ext);

    msg.addCustom(custom_obj);
    let Ext = '{viewType:"SessionView",data:{senderId:'+config.imLoginInfo.identifier+'}}'
    //调用发送消息接口
    msg.PushInfo = {
        "PushFlag": 0,
        "Desc": '您有一个新的'+desc, //离线推送内容
        "Ext": Ext, //离线推送透传内容
        // "AndroidInfo": {
        //     "Sound": "" //离线推送声音文件路径。
        // },
        // "ApnsInfo": {
        //     "Sound": "", //离线推送声音文件路径。
        //     "BadgeMode": 1
        // }
    };
    msg.PushInfoBoolean = true; //是否开启离线推送push同步
    msg.sending = 1;
    sendMsg(msg, 3, data)
}

/**
* 发送消息
* @param
*/
const sendMsg = (msg, type, data) => {
    let { random } = msg
    let { value, reSend, msgId } = data;
    let {
        selToId,
        config,
        historyMsg,
        friendList,
        recentSess
    } = store.getState().imInfo;
    let new_historyMsg = historyMsg;
    let newMess = {
        CreateTime: msg.time * 1000,
        CallbackCommand: "C2C.CallbackBeforeSendMsg",
        msgId: random,
        From_Account: config.imLoginInfo.identifier,
        To_Account: selToId,
        MsgBody: [
            {
                MsgContent: convertMsgConten(msg.elems[0]),
                MsgType: filterMsgType(type)
            }
        ]
    }
    let resendItemIndex = 0;

    let latestTime = historyMsg[selToId].length > 0 ? historyMsg[selToId][historyMsg[selToId].length - 1].CreateTime : 0;
    let diffTime = newMess.CreateTime - latestTime;
    if (diffTime > 60000) {
        newMess.showTime = true;
    }

    if (reSend) {
        historyMsg[selToId].map((item, index) => {
            if (item.msgId == msgId) {
                resendItemIndex = index;
            }
            return item;
        })
        historyMsg[selToId].splice(resendItemIndex, 1)
    }

    historyMsg[selToId] = historyMsg[selToId].concat([newMess])
    // friendList[selToId].msgIdMap[random] = true;
    friendList[selToId].scrollTop = undefined
    let topIndex = 0;
    recentSess.map((item, index) => {
        if (item.identifier == selToId) {
            topIndex = index;
            item.msgDetail = newMess
        }
        return item;
    })

    if (topIndex) {
        let topItem = recentSess.splice(topIndex, 1);
        recentSess = topItem.concat(recentSess);
    }

    store.dispatch({
        type: 'SETIMSTATE',
        payload: {
            data:{
                loadMessType:3,
                historyMsg,
                recentSess,
                friendList
            }
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

/**
* 转换消息类型
* @param type 消息类型
*/
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

/**
* 查找会话列表中是否有某个好友
* @param recentSess(会话列表)  id(发送者id)
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

const findMsgFromHistory = (identifier, msgId) => {
    let flag = false;
    let index = -1;
    let { historyMsg } = store.getState().imInfo;
    if (historyMsg && historyMsg[identifier]) {
        index = historyMsg[identifier].findIndex(item => item.msgId == msgId)
    }

    if (index >= 0) {
        flag = true;
    }
    return flag;
}

/**
* 过滤消息
* @param msgElem 消息实体
*/
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
            if (data.type == 4 || data.type == 5) {
                let imageUrl = data.data.imageUrl;
                if (imageUrl.lastIndexOf('http') != 0) {
                    imageUrl = ''
                }
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

export default {
    //im 登陆
    imLogin(callback) {
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

                window.webim.login(imConfig.imLoginInfo,
                    {
                        onConnNotify,
                        jsonpCallback,
                        onMsgNotify: (newMsgList) => {
                            onMsgNotify(dispatch, newMsgList)
                        }
                    },
                    imConfig.imOpts,
                    res => {//登录成回调
                        imConfig.imLoginInfo.headurl = res.headUrl;
                        imConfig.imLoginInfo.identifierNick = res.identifierNick;
                        dispatch({
                            type: 'LOGIN',
                            payload: {
                                imConfig
                            }
                        })
                        callback && callback(imConfig)
                    },
                    err => {
                    }//登录失败回调
                )

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
    initFriendList(){
        return (dispatch,getState) => {
            getFrendList().then(res => {
                let userList = res.data.patients || [];
                let friendList = getState().imInfo.friendList;
                userList.map(item => {
                    if (item) {
                        if(!friendList[item.id]){
                            friendList[item.id] = {}
                            friendList[item.id] = Object.assign({},friendList[item.id],{
                                name: item.nickName || item.realName || item.userName,
                                headUrl: item.headImg,
                                unReadCount: 0,
                                relationId:item.relationId
                            })
                        }
                    }
                })

                dispatch({
                    type: 'SETIMSTATE',
                    payload: {
                        data: {
                            friendList
                        }
                    }
                })
            })
        }
    },
    initRecentContactList(selToId,type) {
        return (dispatch,getState) => {
            return getFrendList().then(res => {
                let userList = res.data.patients || [];
                const identifiers = [];
                let friendList = getState().imInfo.friendList;
                userList.map(item => {
                    if (item) {
                        if(!friendList[item.id]){
                            friendList[item.id] = {}
                        }
                        friendList[item.id] = Object.assign({},friendList[item.id],{
                            name: item.nickName || item.realName || item.userName,
                            headUrl: item.headImg,
                            unReadCount: 0,
                            relationId:item.relationId
                        })
                        identifiers.push(item.id)
                    }
                })

                getRecentSess(identifiers).then(res => {
                    let topIndex = 0;
                    let recentSess = res.data && res.data.msgList ? res.data.msgList : [];
                    recentSess = recentSess.filter(item => {
                        let flag = false;
                        if(type==1){
                            if (item.identifier == selToId) {
                                flag = true;
                            }else{
                                if(item.msgDetail){
                                    flag = true;
                                }else{
                                    flag = false;
                                }
                            }
                        }else{
                            if(item.msgDetail){
                                flag = true;
                            }else{
                                flag = false;
                            }
                        }
                        return flag
                    })
                    let new_recentSess = recentSess.map((item, index) => {
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

                    new_recentSess = new_recentSess.sort((a, b) => {
                        let aCreateTime = a.msgDetail ? a.msgDetail.CreateTime : 0
                        let bCreateTime = b.msgDetail ? b.msgDetail.CreateTime : 0
                        return bCreateTime - aCreateTime
                    })

                    if (selToId && topIndex != 0) {
                        let topItem = new_recentSess.splice(topIndex, 1);
                        new_recentSess = topItem.concat(new_recentSess);
                    }

                    dispatch({
                        type: 'SETIMSTATE',
                        payload: {
                            data: {
                                friendList,
                                recentSess: new_recentSess
                            }
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
    loadMess({ identifier, endTime = '', count = 10, type, unReadCount }, callback) {
        return (dispatch, getState) => {
            if((unReadCount-10)>10){
                count = unReadCount-10
            }
            getC2CHistoryMsg({
                identifier,
                endTime,
                count
            }).then(res => {
                let data = res.data.msgList || [];
                let { historyMsg, friendList, recentSess } = getState().imInfo;
                if (!historyMsg) {
                    historyMsg = {}
                }
                if (!historyMsg[identifier]) {
                    historyMsg[identifier] = [];
                }
                if (!friendList[identifier]) {
                    friendList[identifier] = {}
                }

                if (data.length != 0 && !data.endFlag) {
                    friendList[identifier].hasMoreHistory = true
                } else {
                    friendList[identifier].hasMoreHistory = false
                }

                if (type == 1) {
                    friendList[identifier].unReadCount = 0;
                }

                let obj = {}
                data = data.filter(item => {
                    if (obj[item.msgId]) {
                        return false;
                    }
                    obj[item.msgId] = true;
                    return true
                })

                let imageArr = [];
                data.map((item, index) => {
                    let content = item.MsgBody[0];
                    if (content.MsgType == 'TIMCustomElem') {
                        if (content.MsgContent.Data) {
                            let custom_data = JSON.parse(content.MsgContent.Data)
                            if (custom_data.type == 4 || custom_data.type == 5) {
                                let UUID = randomWord()
                                let imageUrl = custom_data.data.imageUrl;
                                if (imageUrl.lastIndexOf('http') != 0) {
                                    imageUrl = ''
                                }
                                item.MsgBody = [
                                    {
                                        MsgType: 'TIMImageElem',
                                        MsgContent: {
                                            UUID,
                                            ImageFormat: 255,
                                            ImageInfoArray: [{ Type: 1, URL: imageUrl }, { Type: 2, URL: imageUrl }, { Type: 3, URL: imageUrl }]
                                        }
                                    }
                                ]
                                // if (custom_data.type == 5) {
                                //     let promise = new Promise((resolve, reject) => {
                                //         let token = custom_data.data.imageToken || custom_data.data.imageUrl;
                                //         // if(token){
                                //             getPrivateImage(token).then(res => {
                                //                 res.data.msgId = item.msgId
                                //                 resolve(res)
                                //             }).catch(e => {
                                //                 reject(e)
                                //             })
                                //         // }
                                //     })

                                //     imageArr.push(promise)
                                // }
                            }
                        }
                    } else if (content.MsgType == 'TIMImageElem') {
                        // let obj_img_token = {};
                        // let UUID = content.MsgContent.UUID;
                        // content.MsgContent.ImageInfoArray.map((_item, index) => {
                        //     let url = _item.URL || _item.url;
                        //     if (url.indexOf('http') != 0 && !obj_img_token[url]) {
                        //         obj_img_token[url] = true;
                        //         // if(index!=1){
                        //         // getPrivateImage(url).then(res => {
                        //         // document.getElementById(UUID).src = res.data.url
                        //         // resetHistoryImage(identifier, item.msgId, index, res.data.url)
                        //         // })
                        //         // }
                        //     }
                        // })
                    }
                    return item
                })


                if (type == 1 && data.length > 0) {
                    let index = 0;
                    if((unReadCount-10)<=10){
                        index = 10 - (unReadCount-10)
                    }
                    data[index].unReadCountLoadDone = true;//标识以下为新消息
                }

                historyMsg[identifier] = data.concat(historyMsg[identifier])

                let msgId = '';
                let msgDetail = {};
                let flag = false;

                recentSess.map(item => {
                    if (item.identifier == identifier && item.msgDetail && !item.msgDetail.noText) {
                        msgId = item.msgDetail.msgId;
                        msgDetail = item.msgDetail;
                        msgDetail.From_Account = item.msgDetail.fromAccount
                        msgDetail.To_Account = item.msgDetail.toAccount
                    }
                })

                historyMsg[identifier].map(item => {
                    if (msgId && item.msgId == msgId) {
                        flag = true;
                    }
                })

                if (!flag && msgDetail.From_Account) {
                    historyMsg[identifier] = historyMsg[identifier].concat([msgDetail])
                }

                Promise.all(imageArr).then(res => {
                    res.map(data => {
                        let item = data.data;
                        historyMsg[identifier].map(_item => {
                            if (item.msgId == _item.msgId) {
                                _item.MsgBody[0].MsgContent.ImageInfoArray.map(imgItem => {
                                    imgItem.URL = item.url;
                                    return imgItem
                                })
                            }
                            return _item;
                        })
                    })
                    typeof callback == 'function' && callback({ historyMsg, friendList })
                })

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
    },
    setImState(data) {
        return dispatch => {
            dispatch({
                type: 'SETIMSTATE',
                payload: {
                    data
                }
            })
        }
    },
    resetImData() {
        return {
            type: 'RESET'
        }
    }
}



