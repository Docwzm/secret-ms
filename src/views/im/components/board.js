import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Avatar } from 'antd';
import { parseTime, getLocal } from '../../../utils';
import { connect } from 'react-redux'
import actions from '../../../redux/actions'

class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            loadMessType: 0,
            loading: false,
        }
    }
    componentWillMount() {
        let user = this.props.user
        let { historyMsg, selToId } = this.props.imInfo
        if (!user) {
            let local_user = getLocal('user');
            if (local_user) {
                user = JSON.parse(local_user)
            }
        }
        this.setState({
            user
        })
        // if (historyMsg && historyMsg[selToId]) {
        //     this.setState({
        //         loading: false
        //     })
        // } else {
        //     this.setState({
        //         loading: true
        //     })
        // }
    }
    componentWillUnmount() {
        let { friendList, selToId } = this.props.imInfo
        let message_list_el = document.getElementById('message');
        if (message_list_el) {
            if (friendList[selToId].scrollTop != message_list_el.scrollTop) {
                friendList[selToId].scrollTop = message_list_el.scrollTop;
                this.props.setFriendList(friendList)
            }
        }
    }
    componentDidMount(){
        this.resetScroll()
    }
    componentDidUpdate() {
        if (this.message_el) {
            if (!this.state.loading) {
                this.resetScroll()
            }
        }
    }
    // componentWillReceiveProps(props) {
    //     console.log('.../')
    //     if (props.imInfo.historyMsg && props.imInfo.historyMsg[props.imInfo.selToId]) {
    //         this.setState({
    //             loading: false
    //         })
    //     }
    // }
    resetScroll() {
        let { friendList, selToId, loadMessType } = this.props.imInfo;
        console.log(loadMessType)
        if (loadMessType == 0) {
            if (friendList[selToId] && friendList[selToId].scrollTop != undefined) {
                this.message_el.scrollTop = friendList[selToId].scrollTop
            } else {
                this.message_el.scrollTop = this.message_el.scrollHeight - this.message_el.clientHeight;
            }
        } else if (loadMessType == 1) {
            //加载新消息
            this.message_el.scrollTop = document.getElementsByClassName('new_mess_tip')[0].offsetTop
        } else if (loadMessType == 2) {
            //加载历史数据
            // setTimeout(() => {
            //     console.log('...')
                // let dom_info = ReactDOM.findDOMNode(this.refs['info'])
                console.log(this.info_el.clientHeight)
                this.message_el.scrollTop = this.info_el.clientHeight - this.state.scrollHeight
            // }, 2000)
        } else if (loadMessType == 3) {
            //来新消息
            this.message_el.scrollTop = this.message_el.scrollHeight - this.message_el.clientHeight;
        }
    }
    openPro = (item) => {
        let { selToId } = this.props.imInfo
        let data = JSON.parse(item.MsgBody[0].MsgContent.Data);
        let type = data.type;
        if (type != 2) {
            window.open('/rpm/#/project?id=' + selToId + '&type=' + type)
        }
    }
    convertTextToHtml(text) {
        return text.replace(/\n/g, '<br/>')
    }
    convertImageMsgToHtml(data, content) {
        let smallImage, bigImage, oriImage; //原图
        content.ImageInfoArray.map((item, index) => {
            let type = item.Type || item.type;
            let url = item.URL || item.url;
            if (type == 1) {
                oriImage = url
            } else if (type == 2) {
                bigImage = url
            } else if (type == 3) {
                smallImage = url
            }

        })

        if (!bigImage) {
            bigImage = smallImage;
        }
        if (!oriImage) {
            oriImage = smallImage;
        }


        return <div>
            <img src={smallImage + '#' + bigImage} style={{ 'cursor': 'pointer' }} id={content.UUID} onClick={() => this.props.openPreviewImg(content.UUID)} />
            <img src={oriImage} style={{ 'display': 'none' }} />
        </div>;
    }
    convertCustomMsgToHtml(content) {
        if (content.Data) {
            let data = JSON.parse(content.Data).data;
            return <div className="pro_card">
                <p className="title">{data.title}</p>
                <div className="detail">
                    {/* <img src={data.image} /> */}
                    <p className="intro">{data.detail}</p>
                </div>
            </div>
        } else {
            return null
        }
    }
    loadUnReadMess(unReadCount, type){
        let {historyMsg,selToId,friendList} = this.props.imInfo;
        let currentFriend = friendList?friendList[selToId]:null;
        let currentHistoryMsg = historyMsg ? historyMsg[selToId] : null;

        if(currentHistoryMsg&&currentHistoryMsg.length>10){
            // currentHistoryMsg
            currentHistoryMsg = currentHistoryMsg.map((item,index) => {
                item.unReadCountLoadDone = false
                console.log(currentHistoryMsg.length-unReadCount)
                if(index==currentHistoryMsg.length-unReadCount){
                    item.unReadCountLoadDone = true;
                }
                return item
            })

            if(currentFriend){
                currentFriend.unReadCount = 0;
            }
            
            this.props.setImState({
                friendList:Object.assign({},friendList,{[selToId]:currentFriend}),
                loadMessType:type,
                historyMsg:Object.assign({},historyMsg,{[selToId]:currentHistoryMsg})
            })
        }else{
            let loadMessType = 2;
            if (type == 1) {
                loadMessType = 1;
            }

            this.setState({
                loading: true,
                scrollHeight: this.info_el.clientHeight + document.getElementsByClassName('mess-wrap')[0].getElementsByClassName('mess')[0].offsetTop - 58
            })

            this.props.loadMess({
                identifier: this.props.imInfo.selToId,
                endTime: this.getEndTime(),
                unReadCount,
                type
            }, data => {
                data.loadMessType = loadMessType
                this.props.setImState(data)
                this.setState({
                    loading: false
                })
            })
        }
    }
    loadMess = (unReadCount, type) => {
        let loadMessType = 2;
        if (type == 1) {
            loadMessType = 1;
        }

        this.setState({
            loading: true,
            scrollHeight: this.info_el.clientHeight + document.getElementsByClassName('mess-wrap')[0].offsetTop - 58
        })

        this.props.loadMess({
            identifier: this.props.imInfo.selToId,
            endTime: this.getEndTime(),
            unReadCount,
            type
        }, data => {
            data.loadMessType = loadMessType
            this.props.setImState(data)
            this.setState({
                loading: false
            })
        })
    }
    getEndTime() {
        let historyMsg = this.props.imInfo.historyMsg[this.props.imInfo.selToId];
        return historyMsg[0].CreateTime
    }
    reSendText(data) {
        this.props.sendMsg(1, { reSend: data.reSend, value: data.MsgBody[0].MsgContent.Text, msgId: data.msgId })
    }
    filterTime(sendTime) {
        const weekDay = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        const date = new Date(sendTime)
        const now = new Date();
        const diff = (now - date) / 1000;

        let date_year = date.getFullYear();
        let date_month = date.getMonth() + 1;
        let date_day = date.getDate();

        let now_year = now.getFullYear();
        let now_month = now.getMonth() + 1;
        let now_day = now.getDate();

        if (now_year == date_year && now_month == date_month) {
            if (now_day == date_day) {
                //当天内显示时分HH:mm
                return parseTime(sendTime, 'HH:mm')
            } else {
                //非当天 2天内显示昨天+HH:mm 一周内显示星期几+HH:mm
                if (diff < 3600 * 24 * 2) {
                    return '昨天 ' + parseTime(sendTime, 'HH:mm')
                } else {
                    return weekDay[date.getDay() - 1] + ' ' + parseTime(sendTime, 'HH:mm')
                }
            }
        } else {
            //显示YYYY-MM-DD HH:mm
            return parseTime(sendTime, 'YYYY-MM-DD HH:mm')
        }
    }
    //历史消息时间过滤（消息之间超过一分钟则显示时间条）
    transTime(historyMsg) {
        if (historyMsg) {
            let time = historyMsg.length > 0 ? historyMsg[0].CreateTime : '';
            historyMsg = historyMsg.map((item, index) => {
                if (index != 0) {
                    let diffTime = item.CreateTime - time;
                    if (diffTime > 60000) {
                        item.showTime = true;
                        time = item.CreateTime
                    } else {
                        item.showTime = false;
                    }
                } else {
                    item.showTime = true;
                }
                return item;
            })
        }
        return historyMsg
    }

    render() {
        let selToId = this.props.imInfo.selToId;
        let currentFriend = this.props.imInfo.friendList ? this.props.imInfo.friendList[selToId] : {};
        let historyMsg = this.props.imInfo.historyMsg ? this.props.imInfo.historyMsg[selToId] : null
        historyMsg = this.transTime(historyMsg)
        return (
            <div className="board">
                <div className="message-wrap">
                    {
                        currentFriend.unReadCount > 10 ? <div className="load-unread-mess" onClick={this.loadUnReadMess.bind(this, currentFriend.unReadCount, 1)}>{currentFriend.unReadCount}条新消息</div>:null
                    }
                    <div className="message" id="message" ref={el => this.message_el = el}>
                        <div className="opt">
                            {
                                currentFriend.unReadCount > 10?null:(this.state.loading ? <div className="loading">正在加载中...</div> :(
                                    currentFriend.hasMoreHistory ? <div onClick={this.loadMess.bind(this, 10, 2)} className="load-history">点击加载更多咨询记录</div> : null
                                ))
                            }
                        </div>
                        {
                            historyMsg ? <div className="info" id='info' ref={el => this.info_el = el}>
                                {
                                    historyMsg.map((item, index) => {
                                        return <div className="mess-wrap" key={index}>
                                            {
                                                item.unReadCountLoadDone ? <div className="new_mess_tip"><span>以下为新消息</span></div> : null
                                            }
                                            {
                                                item.showTime ? <div className="date">{this.filterTime(item.CreateTime)}</div> : null
                                            }
                                            <div className={'mess ' + (item.From_Account == selToId ? 'left' : 'right')}>
                                                {item.From_Account == selToId ? <Avatar src={item.From_Account == selToId ? currentFriend.headUrl : this.state.user.headUrl} /> : null}
                                                <div className="content">
                                                    {
                                                        item.MsgBody[0].MsgType == window.webim.MSG_ELEMENT_TYPE.TEXT ? <div className="text">{
                                                            item.reSend ? <a href="javasript:void(0)" onClick={this.reSendText.bind(this, item)}>发送失败，请点击重发</a> : <span dangerouslySetInnerHTML={{ __html: this.convertTextToHtml(item.MsgBody[0].MsgContent.Text) }} ></span>
                                                        }</div> : (
                                                                item.MsgBody[0].MsgType == window.webim.MSG_ELEMENT_TYPE.IMAGE ? <div className="image">
                                                                    {
                                                                        this.convertImageMsgToHtml(item, item.MsgBody[0].MsgContent)
                                                                    }
                                                                </div> : (
                                                                        item.MsgBody[0].MsgType == window.webim.MSG_ELEMENT_TYPE.CUSTOM ? <div className="custom" onClick={this.openPro.bind(this, item)}>
                                                                            {
                                                                                this.convertCustomMsgToHtml(item.MsgBody[0].MsgContent)
                                                                            }
                                                                        </div> : null
                                                                    )
                                                            )
                                                    }
                                                </div>
                                                {item.From_Account != selToId ? <Avatar src={item.From_Account == selToId ? currentFriend.headUrl : this.state.user.headUrl} /> : null}
                                            </div>
                                        </div>
                                    })
                                }
                            </div> : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(state => {
    return {
        imInfo: state.imInfo
    }
}, actions)(Board))