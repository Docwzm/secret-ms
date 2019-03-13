import React, {
    Component
} from 'react';
import { Badge, List, Avatar, Spin } from 'antd';
import { connect } from 'react-redux'
import actions from '../../../redux/actions'
import { parseTime } from '../../../utils/index'
import { updateReadTime } from '../../../apis/im'
// import InfiniteScroll from 'react-infinite-scroller';

class leftSession extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            hasMore: true,
        }
    }
    dateFilter(time) {
        let date = new Date(time)
        let dateStr = parseTime(date, 'YYYY/MM/DD HH:mm')
        let nowDateStr = parseTime(new Date(), 'YYYY/MM/DD HH:mm')
        if (dateStr.split(' ')[0] == nowDateStr.split(' ')[0]) {
            //当天发送
            return dateStr.split(' ')[1]
        } else {
            return dateStr.split(' ')[0].slice(2)
        }
    }
    resetScroll(props, identifier) {
        let { friendList } = props.imInfo
        // if (this.state.loadMessType == 0) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            let message_list_el = document.getElementById('message');
            console.log(message_list_el)
            if (message_list_el) {
                if (friendList[identifier] && friendList[identifier].scrollTop != undefined) {
                    message_list_el.scrollTop = friendList[identifier].scrollTop
                } else {
                    console.log('l./')
                    console.log(message_list_el.scrollHeight - message_list_el.clientHeight)
                    message_list_el.scrollTop = message_list_el.scrollHeight - message_list_el.clientHeight;
                }
            }
        }, 50)

        // } else if (this.state.loadMessType == 1) {
        //     //加载新消息
        //     clearTimeout(this.timer)
        //     this.timer = setTimeout(() => {
        //         let message_list_el = document.getElementById('message');
        //         if (message_list_el) {
        //             message_list_el.scrollTop = 0
        //         }
        //         this.setState({
        //             loadMessType: 0
        //         })
        //     }, 50)
        // } else if (this.state.loadMessType == 2) {
        //     console.log('hahahhah')
        //     clearTimeout(this.timer)
        //     this.timer = setTimeout(() => {
        //         let message_list_el = document.getElementById('message');
        //         let dom_info = document.getElementById('info');
        //         if (message_list_el) {
        //             message_list_el.scrollTop = dom_info.clientHeight - this.state.scrollHeight
        //         }
        //         this.setState({
        //             loadMessType: 0
        //         })
        //     }, 50)
        // } else {
        //     this.setState({
        //         loadMessType: 0
        //     })
        // }
    }
    setSelToId(item) {
        let { selType, config, friendList, selToId } = this.props.imInfo
        if (selToId == item.identifier) {
            return;
        }
        let message_list_el = document.getElementById('message');
        if (message_list_el) {
            if (friendList[selToId].scrollTop != message_list_el.scrollTop) {
                friendList[selToId].scrollTop = message_list_el.scrollTop;
                this.props.setFriendList(friendList)
            }
        }

        if (item.unReadCount) {
            updateReadTime(config.imLoginInfo.identifier, item.identifier)
        }

        let recentSess = this.props.imInfo.recentSess.map(sess => {
            if (sess.identifier == item.identifier) {
                sess.unReadCount = 0;
            }
            return sess
        })
        this.props.setSelToId(item.identifier)
        this.props.setRecentSess(recentSess)

        // let selSess = window.webim.MsgStore.sessByTypeId(selType, item.identifier);
        // window.webim.setAutoRead(selSess, false, false);

        let historyMsg = this.props.imInfo.historyMsg

        if (historyMsg && historyMsg[item.identifier]) {
            if (item.unReadCount) {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    let message_list_el = document.getElementById('message');
                    if (message_list_el) {
                        message_list_el.scrollTop = message_list_el.scrollHeight - message_list_el.clientHeight;
                    }
                }, 50)
            } else {
                this.resetScroll(this.props, item.identifier)
            }
        } else {
            this.props.loadMess({
                identifier: item.identifier
            }, () => {
                this.resetScroll(this.props, item.identifier)
            })
        }
    }

    handleInfiniteOnLoad = () => {
        this.setState({
            loading: true
        })
    }

    render() {
        return (
            <div className="leftSession">
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
                                    {
                                        item.msgDetail ? <p className="time">{this.dateFilter(item.msgDetail.CreateTime)}</p> : null
                                    }
                                </div>
                                {
                                    item.msgDetail ? <p className="content">{item.msgDetail.MsgBody[0].MsgType == "TIMTextElem" ? item.msgDetail.MsgBody[0].MsgContent.Text : (item.msgDetail.MsgBody[0].MsgType == "TIMImageElem" ? '[图片]' : (
                                        item.msgDetail.MsgBody[0].MsgType == "TIMCustomElem"?item.msgDetail.MsgBody[0].MsgContent.Desc:''
                                    ))}</p> : null
                                }
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
            </div>
        );
    }
}

export default connect(state => state, actions)(leftSession)