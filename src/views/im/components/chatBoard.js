import React, {
    Component
} from 'react';
import { Input, Button, Avatar } from 'antd';

const { TextArea } = Input;

export default class chatBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {

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
                    name
                </div>
                <div className="message">
                    <div className="loading">正在加载中...</div>
                    <div className="load-history">点击加载更多咨询记录</div>
                    <div className="load-unread-mess">11条新消息</div>
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