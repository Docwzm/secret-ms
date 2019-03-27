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
import './im.scss'

class Communicate extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount() {
    let params = this.props.location ? getQueryObject(this.props.location.search) : {};
    let selToId = params.id;
    let { recentSess, config } = this.props.imInfo
    if (selToId) {
      this.props.setSelToId(selToId)
      if (!recentSess || recentSess.length == 0) {
        this.props.initRecentContactList(selToId)
      } else {
        let flag = false;
        let topIndex = 0;
        recentSess.map((item, index) => {
          if (item.identifier == selToId) {
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
            identifier: selToId,
            unReadCount: 0,
            msgDetail: {
              sendTime: new Date().getTime(),
              callbackCommand: "Group.CallbackAfterSendMsg",
              msgId: randomWord(),
              msgUniqueId: randomWord(),
              fromAccount: selToId,
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
      if (historyMsg && historyMsg[selToId]) {

      } else {
        this.props.loadMess({
          identifier: selToId
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
  }
  componentDidMount() {
    document.getElementsByClassName('ant-layout-content')[0].style.padding = 0;
    let dom = ReactDOM.findDOMNode(this.refs['chat']);
    dom.style.height = document.body.clientHeight - 64 - 53 - 24 + 'px'
    if (!this.props.imInfo.config.imLoginInfo || !this.props.imInfo.config.imLoginInfo.identifier) {//登陆态判断
      this.props.imLogin();
    }
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
