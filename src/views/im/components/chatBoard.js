import React, { Component } from 'react';
import { connect } from 'react-redux'
import actions from '../../../redux/actions'
import { Input, Button, Avatar } from 'antd';
import { parseTime } from '../../../utils';
const { TextArea } = Input;

class chatBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            hasHistory: false,
            hasUnReadMess: true,
            prevMess: {},
            message: []//会话消息列表
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    componentWillReceiveProps(props) {
        this.setState({
            message: props.imInfo.historyMsg[props.imInfo.selToId]
        })
    }
    render() {
        return (
            <div className="chatBoard">
                {
                    this.props.imInfo.selToId ? <div className="chat-wrap">
                        <div className="title">
                            {this.props.name}
                        </div>
                        <div className="message">
                            <div className="opt">
                            {this.state.loading ? <div className="loading">正在加载中...</div> : null}
                            {this.state.hasHistory ? <div className="load-history">点击加载更多咨询记录</div> : null}
                            {this.state.hasUnReadMess ? <div className="load-unread-mess">11条新消息</div> : null}
                            </div>
                            {
                                this.state.message.length > 0 ? <div className="info">
                                    {

                                        this.state.message.map((item, index) => {
                                            let flag = false;
                                            if (index != 0) {
                                                let diffTime = item.time - this.state.message[index - 1].time;
                                                if (diffTime > 60000) {
                                                    //
                                                }
                                            }
                                            return <div className="mess-wrap" key={index}>
                                                {
                                                    flag ? <div className="date">{parseTime(item.time, 'HH:mm')}</div> : null
                                                }
                                                <div className={'mess ' + (item.isSelf ? 'left' : 'right')}>
                                                    <Avatar src={item.headUrl} />
                                                    <div className="content">
                                                        <div className="text">{item.content}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div> : null
                            }
                        </div>
                        <div className="controlBox">
                            <div className="control-bar">
                                <div className="patient-file">患者档案</div>
                                <div className="self-make-mess">
                                    <span>计划</span>
                                    <span>直教</span>
                                    <span>测量</span>
                                </div>
                            </div>
                            <TextArea rows={4} />
                            <div className="btn-wrap">
                                <span>按下Ctrl+Enter</span>
                                <Button>发送</Button>
                            </div>
                        </div>
                    </div> : <div className="no-selTo">请选择患者</div>
                }



            </div>
        );
    }
}

export default connect(state => state, actions)(chatBoard)