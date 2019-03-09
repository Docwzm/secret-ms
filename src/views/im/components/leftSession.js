import React, {
    Component
} from 'react';
<<<<<<< HEAD
import { Badge, List, Avatar } from 'antd';
import { connect } from 'react-redux'
import actions from '../../../redux/actions'
import { parseTime } from '../../../utils/index'
=======
import { Badge, List, Avatar, Spin } from 'antd';
import { connect } from 'react-redux'
import actions from '../../../redux/actions'
import { parseTime } from '../../../utils/index'
// import InfiniteScroll from 'react-infinite-scroller';
>>>>>>> chat

class leftSession extends Component {
    constructor(props) {
        super(props)
        this.state = {
<<<<<<< HEAD
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.props.initRecentContactList()
    }

=======
            loading: false,
            hasMore: true,
        }
    }
>>>>>>> chat
    dateFilter(time) {
        let date = new Date(time)
        let dateStr = parseTime(date, 'YYYY/MM/DD HH:mm')
        let nowDateStr = parseTime(new Date(), 'YYYY/MM/DD HH:mm')
        if (dateStr.split(' ')[0] == nowDateStr.split(' ')[0]) {
            //当天发送
            return dateStr.split(' ')[1]
        } else {
<<<<<<< HEAD
            return dateStr.split(' ')[0].slice(2, -1)
        }
    }

    setSelToId(item) {
        if(this.props.selToId==item.id){
            return ;
        }
        let recentSess = this.props.imInfo.recentSess.map(sess => {
            if(sess.id==item.id){
                sess.unReadMsgCount = 0;
            }
            return sess
        })
        this.props.setSelToId(item.id)
        this.props.setRecentSess(recentSess)
=======
            return dateStr.split(' ')[0].slice(2)
        }
    }
    setSelToId(item) {
        let {selType} = this.props.imInfo
        if (this.props.imInfo.selToId == item.identifier) {
            return;
        }
        let recentSess = this.props.imInfo.recentSess.map(sess => {
            if (sess.identifier == item.identifier) {
                sess.unReadCount = 0;
            }
            return sess
        })
        this.props.setSelToId(item.identifier)
        this.props.setRecentSess(recentSess)

        let selSess = window.webim.MsgStore.sessByTypeId(selType, item.identifier);
        window.webim.setAutoRead(selSess, false, false);

        let historyMsg = this.props.imInfo.historyMsg

        if (historyMsg && historyMsg[item.identifier]) {

        } else {
            this.props.loadMess({
                identifier: item.identifier
            })
        }
    }

    handleInfiniteOnLoad = () => {
        this.setState({
            loading: true
        })
>>>>>>> chat
    }

    render() {
        return (
            <div className="leftSession">
<<<<<<< HEAD
                <List
                    dataSource={this.props.imInfo.recentSess}
                    renderItem={item => (
                        <List.Item key={item.id} onClick={this.setSelToId.bind(this,item)}>
                            <Badge count={item.unReadMsgCount} overflowCount={99}>
                                <Avatar src={item.headUrl} />
                            </Badge>
                            <div className="text">
                                <p className="name">{item.nickName}</p>
                                {item.unReadMsgCount != 0 ? <p className="content">{item.lastContent}</p> : null}
                            </div>
                            <div className="time">
                                {this.dateFilter(item.date)}
                            </div>
                        </List.Item>
                    )}
                >
                </List>
=======
                {/* <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                > */}
                    <List
                        dataSource={this.props.imInfo.recentSess}
                        renderItem={item => (
                            <List.Item key={item.identifier} onClick={this.setSelToId.bind(this, item)}>
                                <Badge count={item.unReadCount} overflowCount={99}>
                                    <Avatar src={this.props.imInfo.friendList[item.identifier].headUrl} />
                                </Badge>
                                <div className="text">
                                    <div className="top">
                                        <p className="name">{this.props.imInfo.friendList[item.identifier].name}</p>
                                        <p className="time">{this.dateFilter(item.msgDetail.sendTime)}</p>
                                    </div>
                                    <p className="content">{item.msgDetail.msgBody.msgType == 1 ? item.msgDetail.msgBody.msgContent.text : (item.msgDetail.msgBody.msgType == 2 ? '[图片]' : '[自定义消息]')}</p>
                                </div>

                            </List.Item>
                        )}
                    >
                        {this.state.loading && this.state.hasMore && (
                            <div className="loading-container">
                                <Spin />
                            </div>
                        )}
                    </List>
                {/* </InfiniteScroll> */}
>>>>>>> chat
            </div>
        );
    }
}

export default connect(state => state, actions)(leftSession)