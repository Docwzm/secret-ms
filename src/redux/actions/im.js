import { login, getGroupLogApi, getFrendList } from '../../apis/im'
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
    // console.log('onMsgNotify>>>>>', newMsgList)
    var sess, newMsg;
    let state = store.getState();
    //获取所有聊天会话
    // var sessMap = webim.MsgStore.sessMap();
    for (var j in newMsgList) {//遍历新消息
        newMsg = newMsgList[j];
        // if (newMsg.getSession().id() == this.selToID) {//为当前聊天对象的消息

        // }
        console.log('newMsg>>>>>>>', newMsg)
        console.log('newMsg.getSession().getElems>>>>>>>', newMsg.getElems())
        let _msg = {
            CreateTime: newMsg.getSession().time(),
            GroupId: newMsg.getSession().id(),
            MsgBody: newMsg.getElems(),
            random: newMsg.getRandom(),
            sessType: newMsg.getSession().type(),
            isSelfSend: newMsg.getIsSend(),
            fromAccount: newMsg.getFromAccount()
        }
        console.log(_msg)
        this.convertMsg(_msg, 0)
        window.bus.$root.$emit('NEW-MSG', _msg.GroupId)

        state.imInfo.recentSess.map(sess => {
            if(sess.id==_msg.id&&_msg.id!=state.imInfo.selToId){
                sess.unReadMsgCount += 1;
            }
        })
    }
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
                return login().then(res => {
                    imConfig.imLoginInfo = {
                        ...imConfig.imLoginInfo,
                        identifier: res.data.accid,
                        userSig: res.data.token
                    }

                    setLocal('imUserInfo', JSON.stringify(imUserInfo))
                    //im 登录

                    webImLogin(dispatch, imConfig)

                })
            }

        }
    },
    initRecentContactList(cbOK, cbErr) {
        return dispath => {
            var options = {
                'Count': 10 //要拉取的最近会话条数
            };
            window.webim.getRecentContactList(
                options,
                resp => {
                    console.log(resp);
                    console.log('/./////////');
                    if (resp.SessionItem && resp.SessionItem.length > 0) {

                    }
                },
                cbErr
            );
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
    // setHistoryMsg(){
    //     return dispatch => {
    //         return getGroupLogApi()
    //     }
    // }
}
