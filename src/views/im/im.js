import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import LeftSession from './components/leftSession'
import ChatBoard from './components/chatBoard'
import { connect } from 'react-redux'
import actions from '../../redux/actions'
import { randomWord, getQueryObject } from '../../utils'
import { updateReadTime } from '../../apis/im'
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
    let { config, seltoId } = this.props.imInfo
    if (!config.imLoginInfo || !config.imLoginInfo.identifier) {//登陆态判断
      this.props.imLogin((imConfig) => {
        if (identifier != seltoId) {
          updateReadTime(imConfig.imLoginInfo.identifier, identifier)
        }
      });
      this.init(identifier)
    } else {
      this.init(identifier)
    }
  }
  init(identifier) {
    let { recentSess, config, friendList, seltoId } = this.props.imInfo
    if (identifier) {
      this.props.setSelToId(identifier)
      checkPatientInTopic(identifier).then(res => {
        if (!friendList[identifier]) {
          friendList[identifier] = {}
        }
        friendList[identifier].type = res.data ? 1 : 2
        this.props.setFriendList(friendList)
      })

      if (!recentSess || recentSess.length == 0) {
        this.props.initRecentContactList(identifier)
      } else {
        let flag = false;
        let topIndex = 0;
        recentSess.map((item, index) => {
          if (item.identifier == identifier) {
            item.unReadCount = 0;
            topIndex = index;
            flag = true;
          }
          return item;
        })

        if (flag) {
          if (topIndex != 0) {
            let topItem = recentSess.splice(topIndex, 1);
            recentSess = topItem.concat(recentSess);
          }
          //会话中有此人
          this.props.setRecentSess(recentSess)

        } else {
          //会话无此人
          recentSess = [{
            identifier: identifier,
            unReadCount: 0,
            msgDetail: {
              sendTime: new Date().getTime(),
              callbackCommand: "Group.CallbackAfterSendMsg",
              msgId: randomWord(),
              msgUniqueId: randomWord(),
              fromAccount: identifier,
              toAccount: config.imLoginInfo.identifier,
              msgBody: {
                msgType: 1,
                msgContent: {
                  text: ''
                }
              }
            }
          }].concat(recentSess)
          this.props.setRecentSess(recentSess)
        }
      }

      let historyMsg = this.props.imInfo.historyMsg
      if (historyMsg && historyMsg[identifier]) {

      } else {
        this.props.loadMess({
          identifier: identifier
        }, data => {
          this.props.setImState(data)
        })
      }

      
    } else {
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
