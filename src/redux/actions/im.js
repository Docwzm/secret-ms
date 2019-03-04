import { login, getGroupLogApi, getFrendList } from '../../apis/im'
import config from '../../configs/im'

// class ImService {
//     static instance = null
//     constructor() {
//         if (!ImService.instance) {
//             ImService.instance = this;
//         }
//         return ImService.instance
//     }

//     initIm() {
//         this.msgMap = {}
//         this.selToID = ""   //当前聊天id
//         this.imLoginData = {};  //im登录成功后用户数据
//         this.imConfig = {
//             imLoginInfo: config.imLoginInfo,
//             imOpts: config.imOpts
//         }
//         this.recentSessionList = [];//最近会话列表
//         this.friendInfoMap = [];
//     }

//     webimLogin() {
//         // if (!this.userInfo) {
//         //   getUserInfo().then(res => {
//         // this.userInfo = {
//         //   id: res.data.id,
//         //   name: res.data.name
//         // }
//         this.initIm()
//         this.getImInfo()
//         //   })
//         // }

//     }

//     getImInfo() {
//         /**
//          * appType (integer, optional): 应用类型，如0医生APP,运动APP ,
//            imType (integer, optional): IM类型，如 0腾讯IM,1环信等 ,
//            userType (integer, optional): 账户类型，如 0医生,1患者,2助理 ,
//            userId (string, optional): 账户id,如医生id ,
//            name (string, optional): 用户的名称
//          */
//         console.log('this.userInfo>', this.userInfo)
//         login().then(res => {
//             this.imConfig.imLoginInfo = {
//                 ...this.imConfig.imLoginInfo,
//                 identifier: res.data.accid,
//                 userSig: res.data.token
//             }
//             console.log('this.imConfig', this.imConfig)
//             //im 登录
//             window.webim.login(this.imConfig.imLoginInfo,
//                 {
//                     onConnNotify: this.onConnNotify,
//                     jsonpCallback: this.jsonpCallback,
//                     onMsgNotify: this.onMsgNotify,
//                 },
//                 this.imConfig.imOpts,
//                 this.initChat,               //登录成回调
//                 this.cbErr                   //登录失败回调
//             )
//         })
//     }

//     //监听连接状态回调变化事件
//     onConnNotify = (resp) => {
//         var info;
//         switch (resp.ErrorCode) {
//             case window.webim.CONNECTION_STATUS.ON:
//                 window.webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
//                 break;
//             case window.webim.CONNECTION_STATUS.OFF:
//                 info = '连接已断开，无法收到新消息，请检查下您的网络是否正常: ' + resp.ErrorInfo;
//                 alert(info);
//                 window.webim.Log.warn(info);
//                 break;
//             case window.webim.CONNECTION_STATUS.RECONNECT:
//                 info = '连接状态恢复正常: ' + resp.ErrorInfo;
//                 alert(info);
//                 window.webim.Log.warn(info);
//                 break;
//             default:
//                 window.webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
//                 break;
//         }
//     };

//     jsonpCallback = (rspData) => {
//         //设置 jsonp 返回的
//         window.webim.setJsonpLastRspData(rspData);
//     }

//     //登录成功
//     initChat = (res) => {
//         this.imLoginData = res;
//         console.log('success')
//         // window.bus.$root.$emit('IM-LOGING-SUCCESS')
//         // this.onSendMsg('hello world ' + new Date().getTime())
//         // this.getHistoryMsgs()
//         // this.initRecentContactList(() => {

//         // }, () => {

//         // })
//         this.initInfoMapByMyFriends()
//         this.initInfoMapByGroup()
//         getFrendList().then(res => {
//             console.log(res)
//         })
//     }

//     initInfoMapByGroup() {
//         var options = {
//             'Member_Account': this.imConfig.imLoginInfo.identifier,
//             'Limit': 200,
//             'Offset': 0,
//             'GroupBaseInfoFilter': [
//                 'Name',
//                 'FaceUrl'
//             ]
//         };
//         window.webim.getJoinedGroupListHigh(
//             options,
//             (resp) => {
//                 console.log(resp);
//                 if (resp.GroupIdList && resp.GroupIdList.length) {
//                     for (var i = 0; i < resp.GroupIdList.length; i++) {
//                         var group_name = resp.GroupIdList[i].Name;
//                         var group_image = resp.GroupIdList[i].FaceUrl;
//                         var key = window.webim.SESSION_TYPE.GROUP + "_" + resp.GroupIdList[i].GroupId;
//                         this.friendInfoMap[key] = {
//                             'name': group_name,
//                             'image': group_image
//                         }
//                     }
//                 }
//             },
//             function (err) {
//                 alert(err.ErrorInfo);
//             }
//         );
//     }

//     //将我的好友资料（昵称和头像）保存在infoMap
//     initInfoMapByMyFriends(cbOK) {

//         var options = {
//             'From_Account': this.imConfig.imLoginInfo.identifier,
//             'TimeStamp': 0,
//             'StartIndex': 0,
//             'GetCount': 200,
//             'LastStandardSequence': 0,
//             "TagList": [
//                 "Tag_Profile_IM_Nick",
//                 "Tag_Profile_IM_Image"
//             ]
//         };

//         window.webim.getAllFriend(
//             options,
//             (resp) => {
//                 console.log(resp)
//                 if (resp.FriendNum > 0) {
//                     var friends = resp.InfoItem;
//                     if (!friends || friends.length == 0) {
//                         if (cbOK)
//                             cbOK();
//                         return;
//                     }
//                     var count = friends.length;

//                     for (var i = 0; i < count; i++) {
//                         var friend = friends[i];
//                         var friend_account = friend.Info_Account;
//                         var friend_name, friend_image;
//                         for (var j in friend.SnsProfileItem) {
//                             switch (friend.SnsProfileItem[j].Tag) {
//                                 case 'Tag_Profile_IM_Nick':
//                                     friend_name = friend.SnsProfileItem[j].Value;
//                                     break;
//                                 case 'Tag_Profile_IM_Image':
//                                     friend_image = friend.SnsProfileItem[j].Value;
//                                     break;
//                             }
//                         }
//                         var key = window.webim.SESSION_TYPE.C2C + "_" + friend_account;
//                         this.friendInfoMap[key] = {
//                             'name': friend_name,
//                             'image': friend_image
//                         };
//                     }
//                     if (cbOK)
//                         cbOK();
//                 }
//             },
//             function (err) {
//                 alert(err.ErrorInfo);
//             }
//         );
//     }


//     // initRecentContactList(cbOK, cbErr) {
//     //     var options = {
//     //         'Count': 10 //要拉取的最近会话条数
//     //     };
//     //     window.webim.getRecentContactList(
//     //         options,
//     //         resp => {
//     //             console.log(resp);
//     //             console.log('/./////////')



//     //             resp.SessionItem.map(item => {
//     //                 let type = item.Type; //接口返回的会话类型
//     //                 let sessType, typeZh, sessionId, sessionNick = '',
//     //                     sessionImage = '',
//     //                     senderId = '',
//     //                     senderNick = '';
//     //                     if (type == window.webim.RECENT_CONTACT_TYPE.C2C) { //私聊


//     //                     }
//     //             })

//     //             var tempSess; //临时会话变量
//     //             var firstSessType; //保存第一个会话类型
//     //             var firstSessId; //保存第一个会话id
//     //             //清空聊天对象列表
//     //             if (resp.SessionItem && resp.SessionItem.length > 0) { //如果存在最近会话记录
//     //                 for (var i in resp.SessionItem) {
//     //                     var item = resp.SessionItem[i];
//     //                     var type = item.Type; //接口返回的会话类型
//     //                     var sessType, typeZh, sessionId, sessionNick = '',
//     //                         sessionImage = '',
//     //                         senderId = '',
//     //                         senderNick = '';
//     //                     if (type == window.webim.RECENT_CONTACT_TYPE.C2C) { //私聊
//     //                         typeZh = '私聊';
//     //                         sessType = window.webim.SESSION_TYPE.C2C; //设置会话类型
//     //                         sessionId = item.To_Account; //会话id，私聊时为好友ID或者系统账号（值为@TIM#SYSTEM，业务可以自己决定是否需要展示），注意：从To_Account获取,

//     //                         if (sessionId == '@TIM#SYSTEM') { //先过滤系统消息，，
//     //                             window.webim.Log.warn('过滤好友系统消息,sessionId=' + sessionId);
//     //                             continue;
//     //                         }
//     //                         var key = sessType + "_" + sessionId;
//     //                         var c2cInfo = infoMap[key];
//     //                         if (c2cInfo && c2cInfo.name) { //从infoMap获取c2c昵称
//     //                             sessionNick = c2cInfo.name; //会话昵称，私聊时为好友昵称，接口暂不支持返回，需要业务自己获取（前提是用户设置过自己的昵称，通过拉取好友资料接口（支持批量拉取）得到）
//     //                         } else { //没有找到或者没有设置过
//     //                             sessionNick = sessionId; //会话昵称，如果昵称为空，默认将其设成会话id
//     //                         }
//     //                         if (c2cInfo && c2cInfo.image) { //从infoMap获取c2c头像
//     //                             sessionImage = c2cInfo.image; //会话头像，私聊时为好友头像，接口暂不支持返回，需要业务自己获取（前提是用户设置过自己的昵称，通过拉取好友资料接口（支持批量拉取）得到）
//     //                         } else { //没有找到或者没有设置过
//     //                             sessionImage = friendHeadUrl; //会话头像，如果为空，默认将其设置demo自带的头像
//     //                         }
//     //                         senderId = senderNick = ''; //私聊时，这些字段用不到，直接设置为空
//     //                     }
//     //                     if (!sessionId) { //会话id为空
//     //                         window.webim.Log.warn('会话id为空,sessionId=' + sessionId);
//     //                         continue;
//     //                     }

//     //                     if (sessionId == '@TLS#NOT_FOUND') { //会话id不存在，可能是已经被删除了
//     //                         window.webim.Log.warn('会话id不存在,sessionId=' + sessionId);
//     //                         continue;
//     //                     }

//     //                     if (sessionNick.length > maxNameLen) { //帐号或昵称过长，截取一部分，出于demo需要，业务可以自己决定
//     //                         sessionNick = sessionNick.substr(0, maxNameLen) + "...";
//     //                     }

//     //                     tempSess = recentSessMap[sessType + "_" + sessionId];
//     //                     if (!tempSess) { //先判断是否存在（用于去重），不存在增加一个

//     //                         if (!firstSessId) {
//     //                             firstSessType = sessType; //记录第一个会话类型
//     //                             firstSessId = sessionId; //记录第一个会话id
//     //                         }
//     //                         recentSessMap[sessType + "_" + sessionId] = {
//     //                             SessionType: sessType, //会话类型
//     //                             SessionId: sessionId, //会话对象id，好友id或者群id
//     //                             SessionNick: sessionNick, //会话昵称，好友昵称或群名称
//     //                             SessionImage: sessionImage, //会话头像，好友头像或者群头像
//     //                             C2cAccount: senderId, //发送者id，群聊时，才有用
//     //                             C2cNick: senderNick, //发送者昵称，群聊时，才有用
//     //                             UnreadMsgCount: item.UnreadMsgCount, //未读消息数,私聊时需要通过webim.syncMsgs(initUnreadMsgCount)获取,参考后面的demo，群聊时不需要。
//     //                             MsgSeq: item.MsgSeq, //消息seq
//     //                             MsgRandom: item.MsgRandom, //消息随机数
//     //                             MsgTimeStamp: window.webim.Tool.formatTimeStamp(item.MsgTimeStamp), //消息时间戳
//     //                             MsgGroupReadedSeq: item.MsgGroupReadedSeq || 0,
//     //                             MsgShow: item.MsgShow //消息内容,文本消息为原内容，表情消息为[表情],其他类型消息以此类推
//     //                         };
//     //                         //在左侧最近会话列表框中增加一个会话div
//     //                         // addSess(sessType, window.webim.Tool.formatText2Html(sessionId), window.webim.Tool.formatText2Html(sessionNick), sessionImage, item.UnreadMsgCount, 'sesslist');
//     //                     }

//     //                 }
//     //                 //清空聊天界面
//     //                 document.getElementsByClassName("msgflow")[0].innerHTML = "";

//     //                 tempSess = recentSessMap[firstSessType + "_" + firstSessId]; //选中第一个会话
//     //                 selType = tempSess.SessionType; //初始化当前聊天类型

//     //                 selToID = tempSess.SessionId; //初始化当前聊天对象id

//     //                 selSess = window.webim.MsgStore.sessByTypeId(selType, selToID); //初始化当前会话对象

//     //                 setSelSessStyleOn(selToID); //设置当前聊天对象选中样式

//     //                 console.debug('herer')
//     //                 window.webim.syncMsgs(initUnreadMsgCount); //初始化最近会话的消息未读数


//     //                 if (cbOK) //回调
//     //                     cbOK();
//     //             }
//     //         },
//     //         cbErr
//     //     );
//     // }

//     //登录失败
//     cbErr = (res) => {
//         console.log('err>>>>>>>', res)
//     }

//     /**
//      * 监听新消息事件
//      * @param {为新消息数组，结构为[Msg]} newMsgList 
//      */
//     onMsgNotify = (newMsgList) => {
//         console.log('onMsgNotify>>>>>', newMsgList)
//         var sess, newMsg;
//         //获取所有聊天会话
//         var sessMap = window.webim.MsgStore.sessMap();
//         for (var j in newMsgList) {//遍历新消息
//             newMsg = newMsgList[j];
//             // if (newMsg.getSession().id() == this.selToID) {//为当前聊天对象的消息

//             // }
//             console.log('newMsg>>>>>>>', newMsg)
//             console.log('newMsg.getSession().getRandom>>>>>>>', newMsg.getRandom())
//             console.log('newMsg.getSession().getElems>>>>>>>', newMsg.getElems())
//             let _msg = {
//                 CreateTime: newMsg.getSession().time(),
//                 From_Account: newMsg.fromAccount,
//                 GroupId: newMsg.getSession().id(),
//                 MsgBody: newMsg.getElems(),
//                 random: newMsg.getRandom()
//             }
//             console.log('_msg>>>>>>>', _msg)

//             this.convertMsg(_msg, 0)
//             window.bus.$root.$emit('NEW-MSG', _msg.GroupId)
//         }
//         console.log(sessMap);
//         // return;
//         //消息已读上报，以及设置会话自动已读标记
//         // window.webim.setAutoRead(selSess, true, true);
//         // for (var i in sessMap) {
//         //     sess = sessMap[i];
//         //     if (selToID != sess.id()) {//更新其他聊天对象的未读消息数
//         //         updateSessDiv(sess.type(), sess.id(), sess.unread());
//         //     }
//         // }
//     }

//     /**
//      * 发送文本或表情
//      * @param {消息内容} _msg 
//      */
//     onSendMsg(_msg) {
//         let msgtosend = _msg;
//         //群消息=window.webim.SESSION_TYPE.GROUP 单聊消息=window.webim.SESSION_TYPE.C2C
//         let selType = window.webim.SESSION_TYPE.GROUP
//         let massage = {
//             isSend: true,  //是否为自己发送
//             seq: -1,       //消息序列，-1表示 SDK 自动生成，用于去重
//             random: Math.round(Math.random() * 4294967296), //消息随机数，用于去重
//             msgTime: Math.round(new Date().getTime() / 1000), //消息时间戳
//         }
//         if (selType == window.webim.SESSION_TYPE.C2C) {
//             massage.subType = window.webim.C2C_MSG_SUB_TYPE.COMMON;
//         } else {
//             //window.webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
//             //window.webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
//             //window.webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
//             //window.webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
//             massage.subType = window.webim.GROUP_MSG_SUB_TYPE.COMMON;
//         }
//         if (!this.selSess) {
//             this.selSess = new window.webim.Session(selType, this.selToID, this.selToID, 'friendHeadUrl', Math.round(new Date().getTime() / 1000));
//         }
//         let msg = new window.webim.Msg(
//             this.selSess,
//             massage.isSend,
//             massage.seq,
//             massage.random,
//             massage.msgTime,
//             massage.subType,
//             this.imConfig.imLoginInfo.identifier,
//             this.imLoginData.identifierNick
//         );
//         var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
//         //解析文本和表情
//         var expr = /\[[^[\]]{1,3}\]/mg;
//         var emotions = msgtosend.match(expr);
//         if (!emotions || emotions.length < 1) {
//             text_obj = new window.webim.Msg.Elem.Text(msgtosend);
//             msg.addText(text_obj);
//         } else {
//             for (var i = 0; i < emotions.length; i++) {
//                 tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
//                 if (tmsg) {
//                     text_obj = new window.webim.Msg.Elem.Text(tmsg);
//                     msg.addText(text_obj);
//                 }
//                 emotionIndex = window.webim.EmotionDataIndexs[emotions[i]];
//                 emotion = window.webim.Emotions[emotionIndex];
//                 if (emotion) {
//                     face_obj = new window.webim.Msg.Elem.Face(emotionIndex, emotions[i]);
//                     msg.addFace(face_obj);
//                 } else {
//                     text_obj = new window.webim.Msg.Elem.Text(emotions[i]);
//                     msg.addText(text_obj);
//                 }
//                 restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
//                 msgtosend = msgtosend.substring(restMsgIndex);
//             }
//             if (msgtosend) {
//                 text_obj = new window.webim.Msg.Elem.Text(msgtosend);
//                 msg.addText(text_obj);
//             }
//         }
//         console.log(msg);
//         window.webim.sendMsg(msg, function (resp) {
//             console.log('send sucess')
//         }, function (err) {
//             console.log('send error')
//         });
//     }
//     //获取最新的 C2C 历史消息,用于切换好友聊天，重新拉取好友的聊天消息
//     getLastC2CHistoryMsgs(cbOk, cbError) {
//         // if (this.selType == window.webim.SESSION_TYPE.GROUP) {
//         //   alert('当前的聊天类型为群聊天，不能进行拉取好友历史消息操作');
//         //   return;
//         // }
//         var lastMsgTime = 0;//第一次拉取好友历史消息时，必须传 0
//         var msgKey = '';
//         var options = {
//             'Peer_Account': this.selToID, //好友帐号
//             'MaxCnt': 10, //拉取消息条数
//             'LastMsgTime': lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
//             'MsgKey': msgKey
//         };
//         window.webim.getC2CHistoryMsgs(
//             options,
//             function (resp) {
//                 console.log(resp)
//                 return false;
//             },
//             cbError
//         );
//     }
//     /**
//      * 获取历史记录
//      * @param {聊天对象id} selToID 
//      */
//     getHistoryMsgs(selToID) {
//         selToID = this.selToID;

//         this.getLastC2CHistoryMsgs(() => {

//         }, err => {

//         })

//         getGroupLogApi(selToID, 0, 20).then(res => {
//             console.log('histery===>', res)
//             // let _list = res.data
//             // _list = _list.reverse()
//             // for (let i = 0; i < _list.length; i++) {
//             //   this.convertMsg(_list[i], -1)
//             // }
//             // window.bus.$root.$emit('GET-HISTORY-MSGS', selToID)
//         })
//     }
//     /**
//      * 
//      * @param {消息体} _msg 
//      * @param {插入位置 头部:-1 尾部:0} index 
//      */
//     convertMsg(_msg, index) {
//         let _key = _msg.GroupId;
//         if (!this.msgMap[_key]) {
//             this.msgMap[_key] = { map: [], readTime: 0 }
//         }
//         let _msgMap = this.msgMap[_key].map;
//         if (!this.distinct(_msgMap, _msg)) {
//             if (index == -1) {
//                 _msgMap.unshift(_msg)
//             } else {
//                 _msgMap.push(_msg)
//             }
//         }
//         console.log('_msgMap>>>>>>>>>', _msgMap)
//     }

//     /**
//      * 获取指定会话消息数据
//      * @param {GroupIdid} _key 
//      */
//     getMsgList(_key) {
//         if (!this.msgMap) {
//             this.msgMap = {}
//         }
//         if (!this.msgMap[_key]) {
//             return null
//         }
//         return this.msgMap[_key]
//     }

//     /**
//      * 消息去重
//      * @param {列表} map 
//      * @param {消息} msg 
//      */
//     distinct(map, msg) {
//         for (let i = 0; i < map.length; i++) {
//             if (msg.random && map[i].random == msg.random) {
//                 return true
//             }
//         }
//         return false
//     }
// }


export default {
    //im 登陆
    imLogin() {
        return dispatch => {
            return login().then(res => {
                let imConfig = {
                    imLoginInfo: config.imLoginInfo,
                    imOpts: config.imOpts,
                    identifier: res.data.accid,
                    userSig: res.data.token
                }
                //im 登录
                window.webim.login(imConfig.imLoginInfo,
                    {
                        onConnNotify: () => { },
                        jsonpCallback: () => { },
                        onMsgNotify: () => { },
                    },
                    imConfig.imOpts,
                    res => {//登录成回调
                        dispatch({
                            type: 'IM_LOGIN',
                            payload: {
                                imConfig
                            }
                        })
                    },
                    err => { }//登录失败回调
                )
            })
        }

    }
}
