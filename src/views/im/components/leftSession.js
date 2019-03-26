import React, {
    Component
} from 'react';
import { Badge, List, Avatar, Spin } from 'antd';
import { connect } from 'react-redux'
import actions from '../../../redux/actions'
import { parseTime } from '../../../utils'
import { updateReadTime } from '../../../apis/im'
import { checkPatientInTopic } from '../../../apis/patient'
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
            if (message_list_el) {
                if (friendList[identifier] && friendList[identifier].scrollTop != undefined) {
                    message_list_el.scrollTop = friendList[identifier].scrollTop
                } else {
                    message_list_el.scrollTop = message_list_el.scrollHeight - message_list_el.clientHeight;
                }
            }
        }, 50)
    }
    setSelToId(item) {
        let { config, friendList, selToId, recentSess, historyMsg } = this.props.imInfo
        let imState = {};
        if (selToId == item.identifier) {
            return;
        }

        if (!friendList[selToId]) {
            friendList[selToId] = {}
        }

        let message_list_el = document.getElementById('message');
        if (!friendList[item.identifier] || !friendList[item.identifier].type) {
            if (message_list_el) {
                if (friendList[selToId].scrollTop != message_list_el.scrollTop) {
                    friendList[selToId].scrollTop = message_list_el.scrollTop;
                }
            }
            // checkPatientInTopic(item.identifier).then(res => {
            //     if (!friendList[item.identifier]) {
            //         friendList[item.identifier] = {}
            //     }
            //     friendList[item.identifier].type = res.data ? 1 : 2
            //     this.props.setFriendList(friendList)
            // })
        } else {
            if (message_list_el) {
                if (friendList[selToId].scrollTop != message_list_el.scrollTop) {
                    friendList[selToId].scrollTop = message_list_el.scrollTop;
                    // this.props.setFriendList(friendList)
                }
            }
        }

        if (item.unReadCount) {
            updateReadTime(config.imLoginInfo.identifier, item.identifier)
        }

        imState = {
            friendList,
            selToId: item.identifier
        }
        if (item.unReadCount) {
            imState.recentSess = recentSess.map(sess => {
                if (sess.identifier == item.identifier) {
                    sess.unReadCount = 0;
                }
                return sess
            })
        }

        if (historyMsg && historyMsg[item.identifier]) {
            this.props.setImState(imState)
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
            }, data => {
                // data.friendList = Object.assign({}, data.friendList, imState.friendList);
                data.selToId = imState.selToId;
                // this.props.setImState(data)
                console.log(data.friendList)
                console.log(imState.friendList)
                return false
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
        console.log('left')
        let { friendList, selToId, recentSess } = this.props.imInfo;
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
                    dataSource={recentSess}
                    renderItem={item => (
                        <List.Item className={item.identifier == selToId ? 'active' : ''} key={item.identifier} onClick={this.setSelToId.bind(this, item)}>
                            <Badge count={item.unReadCount} overflowCount={99}>
                                {friendList[item.identifier] ? <Avatar src={friendList[item.identifier].headUrl} /> : null}
                            </Badge>
                            <div className="text">
                                <div className="top">
                                    {friendList[item.identifier] ? <p className="name">{friendList[item.identifier].name}</p> : null}
                                    {
                                        item.msgDetail ? <p className="time">{this.dateFilter(item.msgDetail.CreateTime)}</p> : null
                                    }
                                </div>
                                {
                                    item.msgDetail ? <p className="content">{item.msgDetail.MsgBody[0].MsgType == "TIMTextElem" ? item.msgDetail.MsgBody[0].MsgContent.Text : (item.msgDetail.MsgBody[0].MsgType == "TIMImageElem" ? '[图片]' : (
                                        item.msgDetail.MsgBody[0].MsgType == "TIMCustomElem" ? item.msgDetail.MsgBody[0].MsgContent.Desc : ''
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

export default connect(state => {
    return {
        imInfo:state.imInfo
    }
}, actions)(leftSession)