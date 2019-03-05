import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import actions from '../../../redux/actions'
import { Input, Button, Avatar, Modal } from 'antd';
import { parseTime } from '../../../utils';
import ImgPreview from './imageViewer';
const { TextArea } = Input;

class chatBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileFlag: false,
            loading: false,
            hasHistory: false,
            hasUnReadMess: true,
            prevMess: {},
            message: [],//会话消息列表
            previewImg: false
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
        setTimeout(() => {
            let dom = ReactDOM.findDOMNode(this.refs['message'])
            if (dom) {
                dom.scrollTop = dom.scrollHeight - dom.clientHeight
            }
        }, 0)
    }
    sendMsg = (event, type) => {
        this.setState({
            previewImg: true
        })
        let dom = ReactDOM.findDOMNode(this.refs['text'])
        if (type == 'keyup') {
            if (event.ctrlKey && event.keyCode == 13) {
                //换行
                dom.value += '\n'
            } else {
                if (event.keyCode == 13) {
                    //...发送擦操作
                    dom.value = ''
                }
            }
        } else {
            //...发送擦操作
            dom.value = '';
        }
    }
    closePreiveImg = () => {
        this.setState({
            previewImg: false
        })
    }
    closeFile = () => {
        this.setState({
            fileFlag: false
        })
    }
    openFile = () => {
        this.setState({
            fileFlag: true
        })
    }
    render() {
        return (
            <div className="chatBoard">

                <Modal
                    height={500}
                    visible={this.state.fileFlag}
                    onCancel={this.closeFile}
                    footer={null}
                >
                    <div>test</div>
                </Modal>

                <ImgPreview
                    visible={this.state.previewImg}  // 是否可见
                    onClose={this.closePreiveImg} // 关闭事件
                    imgIndex={0}
                    imgArr={['https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', 'http://static-qa.lifesense.com/healthbase/static/avatar/icon_user_no_man.png']} // 图片url
                    picKey={'currentKey'} // 下载需要的key，根据自己需要决定
                    isAlwaysCenterZoom={true} // 是否总是中心缩放，默认false，若为true，每次缩放图片都先将图片重置回屏幕中间
                    isAlwaysShowRatioTips={true} // 是否总提示缩放倍数信息，默认false，只在点击按钮时提示，若为true，每次缩放图片都会提示
                />

                {
                    this.props.imInfo.selToId ? <div className="chat-wrap">
                        <div className="title">
                            {this.props.name}
                        </div>
                        <div className="message" ref="message">
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
                                <div className="patient-file" onClick={this.openFile}>患者档案</div>
                                <div className="self-make-mess">
                                    <span>计划</span>
                                    <span>直教</span>
                                    <span>测量</span>
                                </div>
                            </div>
                            <TextArea ref="text" rows={3} onKeyUp={event => this.sendMsg(event, 'keyup')} />
                            <div className="btn-wrap">
                                <span>按下Ctrl+Enter换行</span>
                                <Button onClick={this.sendMsg}>发送</Button>
                            </div>
                        </div>
                    </div> : <div className="no-selTo">请选择患者</div>
                }



            </div>
        );
    }
}

export default connect(state => state, actions)(chatBoard)