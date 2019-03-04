import React, { Component } from 'react';
import { connect } from 'react-redux'
import actions from '../../../redux/actions'
import { Input, Button, Avatar } from 'antd';
const { TextArea } = Input;

class chatBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            hasHistory: false,
            hasUnReadMess: true,
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="chatBoard">
                <div className="title">
                    {this.props.name}
                </div>
                <div className="message">
                    {this.state.loading ? <div className="loading">正在加载中...</div> : null}
                    {this.state.hasHistory ? <div className="load-history">点击加载更多咨询记录</div> : null}
                    {this.state.hasUnReadMess ? <div className="load-unread-mess">11条新消息</div> : null}
                    <div className="info">
                        <div className="date">08:10</div>
                        <div className="mess left">
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div className="content">
                                <div className="text">contetn</div>
                            </div>
                        </div>
                        <div className="mess right">
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div className="content">
                                <div className="text">contetn</div>
                            </div>
                        </div>
                        <div className="mess left">
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div className="content">
                                <div className="pic">
                                    <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                </div>
                            </div>
                        </div>
                    </div>
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
            </div>
        );
    }
}

export default connect(state => state, actions)(chatBoard)