export default {
    user: null,
    imInfo: {
        config: {
        },//im相关配置信息以及用户信息
        loadMessType:0,//0-初始化/来新消息 1-加载新消息 2-加载历史记录
        selType:window.webim.SESSION_TYPE.C2C,//类型 私聊/群聊
        selToId: '',//当前会话的用户
        friendList: {},//好友列表 {id:{}}
        recentSess: [],//最近会话列表
        historyMsg: null//历史纪录 {id:{}}
    }
}