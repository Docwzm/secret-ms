import React, {
    Component
} from 'react';
import { Badge, List, Avatar, Spin } from 'antd';
import { connect } from 'react-redux'
import actions from '../../../redux/actions'
import { parseTime } from '../../../utils'
import { updateReadTime } from '../../../apis/im'
import { checkPatientInTopic } from '../../../apis/patient'
import '../styles/leftSession.scss';
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
        if (message_list_el) {
            if (friendList[selToId].scrollTop != message_list_el.scrollTop) {
                friendList[selToId].scrollTop = message_list_el.scrollTop;
            }
        }
        if (!friendList[item.identifier] || !friendList[item.identifier].type) {
            checkPatientInTopic(item.identifier).then(res => {
                if (!friendList[item.identifier]) {
                    friendList[item.identifier] = {}
                }
                friendList[item.identifier].type = res.data ? 1 : 2
                this.props.setFriendList(friendList)
            })
        }
        
        imState = {
            loadMessType:0,
            friendList,
            selToId: item.identifier
        }

        if (item.unReadCount) {
            imState.loadMessType = 3;
            imState.recentSess = recentSess.map(sess => {
                if (sess.identifier == item.identifier) {
                    sess.unReadCount = 0;
                }
                return sess
            })
            updateReadTime(config.imLoginInfo.identifier, item.identifier)
        }

        if (historyMsg && historyMsg[item.identifier]) {
            this.props.setImState(imState)
        } else {
            this.props.loadMess({
                identifier: item.identifier
            }, data => {
                data.friendList = Object.assign({}, data.friendList, imState.friendList);
                data.selToId = imState.selToId;
                data.loadMessType = 0;
                this.props.setImState(data)
            })
        }

    }

    handleInfiniteOnLoad = () => {
        this.setState({
            loading: true
        })
    }

    filterContent(item) {
        let msgType = item.msgDetail.MsgBody[0].MsgType;
        let content = '';
        if(msgType=='TIMTextElem'){
            content = item.msgDetail.MsgBody[0].MsgContent.Text;
        }else if(msgType=='TIMImageElem'){
            content = '[图片]'
        }else if(msgType=='TIMCustomElem'){
            let data = item.msgDetail.MsgBody[0].MsgContent.Data;
            if(data){
                data = JSON.parse(data)
                content = (data.type==4||data.type==5)?'[图片]':item.msgDetail.MsgBody[0].MsgContent.Desc
            }
        }
        return content;
    }

    render() {
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
                <div className="tag">医患沟通</div>
                <List
                    dataSource={recentSess}
                    renderItem={item => (
                        <List.Item className={item.identifier == selToId ? 'active' : ''} key={item.identifier} onClick={this.setSelToId.bind(this, item)}>

                            {friendList[item.identifier] ? <Avatar src={friendList[item.identifier].headUrl} /> : null}
                            <div className="text">
                                <div className="top">
                                    {friendList[item.identifier] ? <p className="name">{friendList[item.identifier].name}</p> : null}
                                    {
                                        item.msgDetail ? <p className="time">{this.dateFilter(item.msgDetail.CreateTime)}</p> : null
                                    }
                                </div>
                                <div className="bot">
                                    {
                                        item.msgDetail ? <p className="content">{this.filterContent(item)}</p> : null
                                    }
                                    <Badge count={item.unReadCount} overflowCount={99}></Badge>
                                </div>
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
        imInfo: state.imInfo
    }
}, actions)(leftSession)