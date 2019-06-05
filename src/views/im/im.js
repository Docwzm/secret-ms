import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import LeftSession from './components/leftSession'
import ChatBoard from './components/chatBoard'
import { connect } from 'react-redux'
import actions from '../../redux/actions'
import { randomWord, getQueryObject, getLocal } from '../../utils'
import { updateReadTime, getFrendList } from '../../apis/im'
import { checkPatientInTopic } from '../../apis/patient'
import './styles/im.scss'

class Communicate extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount() {
    let params = this.props.location ? getQueryObject(this.props.location.search) : {};
    let identifier = params.id;
    let user = this.props.user
    if (!user) {
      let local_user = getLocal('user');
      if (local_user) {
        user = JSON.parse(local_user)
      }
    }
    this.init(user, identifier)
  }
  /**
   * 初始化聊天
   * @param {*} user 医生信息
   * @param {*} identifier 当前聊天对象唯一标识
   */
  init(user, identifier) {
    let { recentSess, config, friendList, selToId } = this.props.imInfo
    /**
     * @param {*} type 1:有聊天对象 canNotFindPatient:没有找到好友
     * @param {*} data 聊天对象信息
     */
    const initChat = (type, data) => {
      //当前聊天对象存在好友列表
      if (type != 'canNotFindPatient') {
        this.props.setSelToId(identifier)
        //如果链接携带患者id 并且该患者不是当前聊天对象（是当前聊天对象的话，不用跟新，因为挡前的聊天对象在收发消息时会自动更新未读消息） 则更新该患者的未读消息
        if (identifier && identifier != selToId) {
          updateReadTime(user.imUserId, identifier)
        }

        //检查该好友是否属于课题内
        checkPatientInTopic(identifier).then(res => {
          if (!friendList[identifier]) {
            friendList[identifier] = {}
          }
          //如果该好友是通过刷新接口查询到的 则需要更新好友列表
          if (type == 1 && data) {
            friendList[identifier] = Object.assign({}, friendList[identifier], {
              name: data.nickName || data.realName || data.userName,
              headUrl: data.headImg,
              unReadCount: 0,
              relationId: data.relationId
            })
          }
          friendList[identifier].type = res.data ? 1 : 2// 1:课题内
          this.props.setFriendList(friendList)
        })
      }

      //没有最近会话 需要加载最近会话
      if (!recentSess || recentSess.length == 0) {
        this.props.initRecentContactList(identifier, 1)
      } else {
        //有具体的聊天对象时
        if (type != 'canNotFindPatient') {
          let flag = false;
          let topIndex = 0;
          //查询会话记录中有无此人
          recentSess.map((item, index) => {
            if (item.identifier == identifier) {
              item.unReadCount = 0; //会话中有此人，置未读消息为0
              topIndex = index;//
              flag = true;
            }
            return item;
          })

          //会话中有此人 
          if (flag) {
            if (topIndex != 0) {
              let topItem = recentSess.splice(topIndex, 1);
              recentSess = topItem.concat(recentSess); //会话记录置顶
            }
            this.props.setRecentSess(recentSess)
          } else {
            //会话无此人 新添加一条会话
            recentSess = [{
              identifier: identifier,
              unReadCount: 0,
              msgDetail: {
                CreateTime: new Date().getTime(),
                callbackCommand: "Group.CallbackAfterSendMsg",
                msgId: randomWord(),
                fromAccount: identifier,
                toAccount: user.imUserId,
                noText: true,
                MsgBody: [{
                  MsgType: 1,
                  MsgContent: {
                    text: ''
                  }
                }]
              }
            }].concat(recentSess)
            this.props.setRecentSess(recentSess)
          }
        }
      }
      
      //历史聊天记录加载
      if (type != 'canNotFindPatient') {
        let historyMsg = this.props.imInfo.historyMsg
        if (historyMsg && historyMsg[identifier]) {
          
        } else {
          //没有此人的历史聊天记录 刷新接口获取
          this.props.loadMess({
            identifier: identifier
          }, data => {
            this.props.setImState(data)
          })
        }
      }
    }

    if (identifier) {
      if (friendList[identifier]) {
        initChat(1)//好友列表中存在聊天对象
      } else {
        //刷新好友接口查看是否存在好友
        getFrendList().then(res => {
          let userList = res.data.patients || [];
          let index = userList.findIndex(item => item.id == identifier);
          if (index >= 0) {
            initChat(1, userList[index])
          } else {
            initChat('canNotFindPatient')
          }
        })
      }
    } else {
      //无具体聊天对象
      if (!recentSess || recentSess.length == 0) {
        this.props.initRecentContactList()
      }
    }
  }
  componentWillUnmount() {
    document.getElementsByClassName('ant-layout-content')[0].style.padding = '24px';
    document.getElementById('my-layout').style.padding = '0 24px';
    document.getElementById('my-breadcrumb').style.display = 'block';
  }
  componentDidMount() {
    document.getElementsByClassName('ant-layout-content')[0].style.padding = 0;
    document.getElementById('my-layout').style.padding = 0;
    document.getElementById('my-breadcrumb').style.display = 'none';
    let dom = ReactDOM.findDOMNode(this.refs['chat']);
    dom.style.height = document.body.clientHeight - 64 + 'px'

  }
  render() {
    return (
      <div className="chat-im" ref="chat">
        <LeftSession></LeftSession>
        <ChatBoard></ChatBoard>
      </div>
    );
  }
}

export default withRouter(connect(state => state, actions)(Communicate))
