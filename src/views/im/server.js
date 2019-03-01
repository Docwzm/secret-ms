import { login, getGroupLogApi } from '../../apis/im'
import config from './config'

class ImService {
  static instance = null
  constructor() {
    if (!ImService.instance) {
      ImService.instance = this;
    }
    return ImService.instance
  }

  initIm() {
    this.msgMap = {}
    this.selToID = "106004125eb24724b625a2c7c0c563a3"   //当前聊天id
    this.imLoginData = {};  //im登录成功后用户数据
    this.imConfig = {
      imLoginInfo: config.imLoginInfo,
      imOpts: config.imOpts
    }
  }

  webimLogin() {
    // if (!this.userInfo) {
    //   getUserInfo().then(res => {
        // this.userInfo = {
        //   id: res.data.id,
        //   name: res.data.name
        // }
        this.initIm()
        this.getImInfo()
    //   })
    // }

  }

  getImInfo() {
    /**
     * appType (integer, optional): 应用类型，如0医生APP,运动APP ,
       imType (integer, optional): IM类型，如 0腾讯IM,1环信等 ,
       userType (integer, optional): 账户类型，如 0医生,1患者,2助理 ,
       userId (string, optional): 账户id,如医生id ,
       name (string, optional): 用户的名称
     */
    console.log('this.userInfo>', this.userInfo)
    login(6, 0, 1, this.userInfo.id, this.userInfo.name).then(res => {
      this.imConfig.imLoginInfo = {
        ...this.imConfig.imLoginInfo,
        identifier: res.data.accid,
        userSig: res.data.token
      }
      console.log('this.imConfig', this.imConfig)
      //im 登录
      webim.login(this.imConfig.imLoginInfo,
        {
          onConnNotify: this.onConnNotify,
          jsonpCallback: this.jsonpCallback,
          onMsgNotify: this.onMsgNotify,
        },
        this.imConfig.imOpts,
        this.initChat,               //登录成回调
        this.cbErr                   //登录失败回调
      )
    })
  }

  //监听连接状态回调变化事件
  onConnNotify = (resp) => {
    var info;
    switch (resp.ErrorCode) {
      case webim.CONNECTION_STATUS.ON:
        webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
        break;
      case webim.CONNECTION_STATUS.OFF:
        info = '连接已断开，无法收到新消息，请检查下您的网络是否正常: ' + resp.ErrorInfo;
        alert(info);
        webim.Log.warn(info);
        break;
      case webim.CONNECTION_STATUS.RECONNECT:
        info = '连接状态恢复正常: ' + resp.ErrorInfo;
        alert(info);
        webim.Log.warn(info);
        break;
      default:
        webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
        break;
    }
  };

  jsonpCallback = (rspData) => {
    //设置 jsonp 返回的
    webim.setJsonpLastRspData(rspData);
  }

  //登录成功
  initChat = (res) => {
    this.imLoginData = res;
    console.log('success')
    window.bus.$root.$emit('IM-LOGING-SUCCESS')
    //
    // this.onSendMsg('hello world ' + new Date().getTime())
    // this.getHistoryMsgs()
  }

  //登录失败
  cbErr = (res) => {
    console.log('err>>>>>>>', res)
  }

  /**
   * 监听新消息事件
   * @param {为新消息数组，结构为[Msg]} newMsgList 
   */
  onMsgNotify = (newMsgList) => {
    console.log('onMsgNotify>>>>>', newMsgList)
    var sess, newMsg;
    //获取所有聊天会话
    var sessMap = webim.MsgStore.sessMap();
    for (var j in newMsgList) {//遍历新消息
      newMsg = newMsgList[j];
      // if (newMsg.getSession().id() == this.selToID) {//为当前聊天对象的消息

      // }
      console.log('newMsg>>>>>>>', newMsg)
      console.log('newMsg.getSession().getRandom>>>>>>>', newMsg.getRandom())
      console.log('newMsg.getSession().getElems>>>>>>>', newMsg.getElems())
      let _msg = {
        CreateTime: newMsg.getSession().time(),
        From_Account: newMsg.fromAccount,
        GroupId: newMsg.getSession().id(),
        MsgBody: newMsg.getElems(),
        random: newMsg.getRandom()
      }
      console.log('_msg>>>>>>>', _msg)

      this.convertMsg(_msg, 0)
      window.bus.$root.$emit('NEW-MSG', _msg.GroupId)
    }
    console.log(sessMap);
    // return;
    //消息已读上报，以及设置会话自动已读标记
    // webim.setAutoRead(selSess, true, true);
    // for (var i in sessMap) {
    //     sess = sessMap[i];
    //     if (selToID != sess.id()) {//更新其他聊天对象的未读消息数
    //         updateSessDiv(sess.type(), sess.id(), sess.unread());
    //     }
    // }
  }

  /**
   * 发送文本或表情
   * @param {消息内容} _msg 
   */
  onSendMsg(_msg) {
    let msgtosend = _msg;
    //群消息=webim.SESSION_TYPE.GROUP 单聊消息=webim.SESSION_TYPE.C2C
    let selType = webim.SESSION_TYPE.GROUP
    let massage = {
      isSend: true,  //是否为自己发送
      seq: -1,       //消息序列，-1表示 SDK 自动生成，用于去重
      random: Math.round(Math.random() * 4294967296), //消息随机数，用于去重
      msgTime: Math.round(new Date().getTime() / 1000), //消息时间戳
    }
    if (selType == webim.SESSION_TYPE.C2C) {
      massage.subType = webim.C2C_MSG_SUB_TYPE.COMMON;
    } else {
      //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
      //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
      //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
      //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
      massage.subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
    }
    if (!this.selSess) {
      this.selSess = new webim.Session(selType, this.selToID, this.selToID, 'friendHeadUrl', Math.round(new Date().getTime() / 1000));
    }
    let msg = new webim.Msg(
      this.selSess,
      massage.isSend,
      massage.seq,
      massage.random,
      massage.msgTime,
      massage.subType,
      this.imConfig.imLoginInfo.identifier,
      this.imLoginData.identifierNick
    );
    var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
    //解析文本和表情
    var expr = /\[[^[\]]{1,3}\]/mg;
    var emotions = msgtosend.match(expr);
    if (!emotions || emotions.length < 1) {
      text_obj = new webim.Msg.Elem.Text(msgtosend);
      msg.addText(text_obj);
    } else {
      for (var i = 0; i < emotions.length; i++) {
        tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
        if (tmsg) {
          text_obj = new webim.Msg.Elem.Text(tmsg);
          msg.addText(text_obj);
        }
        emotionIndex = webim.EmotionDataIndexs[emotions[i]];
        emotion = webim.Emotions[emotionIndex];
        if (emotion) {
          face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
          msg.addFace(face_obj);
        } else {
          text_obj = new webim.Msg.Elem.Text(emotions[i]);
          msg.addText(text_obj);
        }
        restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
        msgtosend = msgtosend.substring(restMsgIndex);
      }
      if (msgtosend) {
        text_obj = new webim.Msg.Elem.Text(msgtosend);
        msg.addText(text_obj);
      }
    }
    console.log(msg);
    webim.sendMsg(msg, function (resp) {
      console.log('send sucess')
    }, function (err) {
      console.log('send error')
    });
  }
  //获取最新的 C2C 历史消息,用于切换好友聊天，重新拉取好友的聊天消息
  getLastC2CHistoryMsgs(cbOk, cbError) {
    // if (this.selType == webim.SESSION_TYPE.GROUP) {
    //   alert('当前的聊天类型为群聊天，不能进行拉取好友历史消息操作');
    //   return;
    // }
    var lastMsgTime = 0;//第一次拉取好友历史消息时，必须传 0
    var msgKey = '';
    var options = {
      'Peer_Account': this.selToID, //好友帐号
      'MaxCnt': 10, //拉取消息条数
      'LastMsgTime': lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
      'MsgKey': msgKey
    };
    webim.getC2CHistoryMsgs(
      options,
      function (resp) {
        console.log(resp)
        return false;
      },
      cbError
    );
  }
  /**
   * 获取历史记录
   * @param {聊天对象id} selToID 
   */
  getHistoryMsgs(selToID) {
    selToID = this.selToID;

    this.getLastC2CHistoryMsgs(()=> {

    },err => {
      
    })

    getGroupLogApi(selToID, 0, 20).then(res => {
      console.log('histery===>', res)
      // let _list = res.data
      // _list = _list.reverse()
      // for (let i = 0; i < _list.length; i++) {
      //   this.convertMsg(_list[i], -1)
      // }
      // window.bus.$root.$emit('GET-HISTORY-MSGS', selToID)
    })
  }
  /**
   * 
   * @param {消息体} _msg 
   * @param {插入位置 头部:-1 尾部:0} index 
   */
  convertMsg(_msg, index) {
    let _key = _msg.GroupId;
    if (!this.msgMap[_key]) {
      this.msgMap[_key] = { map: [], readTime: 0 }
    }
    let _msgMap = this.msgMap[_key].map;
    if (!this.distinct(_msgMap, _msg)) {
      if (index == -1) {
        _msgMap.unshift(_msg)
      } else {
        _msgMap.push(_msg)
      }
    }
    console.log('_msgMap>>>>>>>>>', _msgMap)
  }

  /**
   * 获取指定会话消息数据
   * @param {GroupIdid} _key 
   */
  getMsgList(_key) {
    if (!this.msgMap) {
      this.msgMap = {}
    }
    if (!this.msgMap[_key]) {
      return null
    }
    return this.msgMap[_key]
  }

  /**
   * 消息去重
   * @param {列表} map 
   * @param {消息} msg 
   */
  distinct(map, msg) {
    for (let i = 0; i < map.length; i++) {
      if (msg.random && map[i].random == msg.random) {
        return true
      }
    }
    return false
  }
}
export default new ImService();
