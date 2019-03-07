import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import actions from '../../../redux/actions'
import { Input, Button, Avatar, Modal, Popover, Icon, DatePicker } from 'antd';
import { parseTime } from '../../../utils';
import ImgPreview from './imageViewer';
import { getProgramList, addProgram } from '../../../apis/program'
const { TextArea } = Input;

class chatBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadMessType:0,
            fileFlag: false,
            loading: false,
            hasHistory: false,
            hasUnReadMess: true,
            prevMess: {},
            message: [],//会话消息列表
            previewImg: false,
            previewImgArr: [],
            preViewImgIndex: 0,
            customType: 0,
            cusTomPro: {
                1: {
                    title: '随访计划',
                    name: '随访',
                    pro: [{
                        id: '1_1',
                        name: '随访计划1'
                    }, {
                        id: '1_2',
                        name: '随访计划2'
                    }],
                },
                2: {
                    title: '宣教内容',
                    name: '宣教',
                    pro: [{
                        id: '2_1',
                        name: '宣教内容1'
                    }, {
                        id: '2_2',
                        name: '宣教内容2'
                    }],
                },
                3: {
                    title: '测量计划',
                    name: '测量',
                    pro: [{
                        id: '3_1',
                        name: '测量计划1'
                    }, {
                        id: '3_2',
                        name: '测量计划2'
                    }],
                }
            },
        }
    }
    componentWillMount() {
        
    }
    componentDidMount() {

    }
    componentWillReceiveProps(props) {
        if(props.loadMessType==0){
            setTimeout(() => {
                let dom = ReactDOM.findDOMNode(this.refs['message'])
                if (dom) {
                    dom.scrollTop = dom.scrollHeight - dom.clientHeight
                }
            }, 0)

        }else if(props.loadMessType==1){
            //加载新消息
            setTimeout(() => {
                let dom = ReactDOM.findDOMNode(this.refs['message'])
                if (dom) {
                    dom.scrollTop = 0
                }
            }, 0)
            this.setState({
                    loadMessType:0
                })
        }

        // 
        
    }
    sendMsg = (event, type) => {

        let dom = ReactDOM.findDOMNode(this.refs['text'])
        if (type == 'keyup') {
            if (event.ctrlKey && event.keyCode == 13) {
                //换行
                dom.value += '\n'
            } else {
                if (event.keyCode == 13) {
                    //...发送操作
                    this.props.sendMsg(1,dom.value)
                    dom.value = ''
                }
            }
        } else {
            //...发送操作
            this.props.sendMsg(1,dom.value)
            dom.value = '';
        }
    }
    closePreiveImg = () => {
        this.setState({
            previewImg: false
        })
    }
    openPreviewImg = (bigImgSrc, originImgSrc) => {
        const previewImgArr = [];
        let index = 0;
        let preViewImgIndex = 0;
        this.props.imInfo.historyMsg[this.props.imInfo.selToId].map(item => {
            if (item.msgType == 2) {
                let imgArr = [];
                item.msgContent.imageInfoArray.map(img_item => {
                    if (img_item.type == 2) {
                        imgArr[0] = img_item.URL;
                        if (img_item.URL == bigImgSrc) {
                            preViewImgIndex = index;
                        }
                    } else if (img_item.type == 1) {
                        imgArr[1] = img_item.URL;
                    }
                })
                previewImgArr.push(imgArr)
                index += 1;
            }
        })
        console.log(previewImgArr)
        this.setState({
            previewImg: true,
            previewImgArr,
            preViewImgIndex
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
    openCustom = (type) => {

        const cusTomPro = Object.assign({}, this.state.cusTomPro)

        if (this.state.cusTomPro[type]) {

            delete cusTomPro[type].begin_time
            cusTomPro[type].pro.map(item => {
                item.selected = false;
                return item;
            })

            this.setState({
                customType: type,
                cusTomPro
            })
        } else {
            // getProgramList({
            //     program_type:type,
            //     category:1
            // }).then(res => {
            //     let data = res.data;
            //     cusTomPro[type].pro = data;
            //     this.setState({
            //         customType: type,
            //         cusTomPro
            //     })
            // })
        }
    }
    closeCustom = () => {
        this.setState({
            customType: 0,
        })
    }
    selectPro = (type, index) => {
        const cusTomPro = Object.assign({}, this.state.cusTomPro)
        cusTomPro[type].pro.map((item, pro_index) => {
            if (index == pro_index) {
                item.selected = true;
            } else {
                item.selected = false;
            }
            return item;
        })
        this.setState({
            cusTomPro
        })
    }
    changeProDate = (type, date, dateStr) => {
        const cusTomPro = Object.assign({}, this.state.cusTomPro)
        cusTomPro[type].begin_time = date
        console.log(cusTomPro)
        this.setState({
            cusTomPro
        })
    }
    sendPro = (item, type) => {
        let proData = {
            type,
            data:{}
        };
        let program_id = ''
        let begin_time = ''
        item.pro.map(pro_item => {
            if (pro_item.selected) {
                program_id = pro_item.id;
                proData.data.id = pro_item.id;
                proData.data.title = pro_item.name
            }
        })
        if (type == 1) {
            begin_time = item.begin_time;
            proData.data.image = '';
            proData.data.detail = 'test1'
        }else if(type==2){
            proData.data.image = '';
            proData.data.detail = 'test2'
        }else if(type==3){
            proData.data.image = '';
            proData.data.detail = 'test3'
        }
        // addProgram({
        //     program_id,
        //     user_id:'',
        //     begin_time
        // }).then(res => {
        //     console.log(res)
        // })
        this.props.sendMsg(3,JSON.stringify(proData))
    }
    convertImageMsgToHtml(content) {
        let smallImage, bigImage, oriImage; //原图

        content.imageInfoArray.map(item => {
            if (item.type == 1) {
                oriImage = item.URL
            } else if (item.type == 2) {
                bigImage = item.URL
            } else if (item.type == 3) {
                smallImage = item.URL
            }
        })

        if (!bigImage) {
            bigImage = smallImage;
        }
        if (!oriImage) {
            oriImage = smallImage;
        }
        return <img src={smallImage + '#' + bigImage + '#' + oriImage} style={{ 'cursor': 'pointer' }} id={content.UUID} onClick={this.openPreviewImg.bind(this, bigImage, oriImage)} />;
    }
    convertCustomMsgToHtml(content) {
        let data = JSON.parse(content.text).data;
        return <div className="pro_card">
            <p className="title">{data.title}</p>
            <div className="detail">
                <img src={data.image} />
                <p className="content">{data.detail}</p>
            </div>
        </div>
    }
    loadMess = (count,type) => {
        let loadMessType = 2;
        if(type==0){
            loadMessType = 1;
        }
        this.setState({
            loading: true,
            loadMessType
        })
        this.props.loadMess({
            identifier:this.props.imInfo.selToId, 
            endTime:this.getEndTime(),
            count,
            type
        },() => {
            this.setState({
                loading: false
            })
        })
    }
    getEndTime(){
        let historyMsg = this.props.imInfo.historyMsg[this.props.imInfo.selToId];
        return historyMsg[0].sendTime
    }
    render() {
        let selToId = this.props.imInfo.selToId;
        let currentFriend = this.props.imInfo.friendList[selToId];
        let historyMsg = this.props.imInfo.historyMsg[selToId]
        // const 
        return (
            <div className="chatBoard">
                <Modal
                    width={1000}
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
                    imgIndex={this.state.preViewImgIndex}
                    imgArr={this.state.previewImgArr} // 图片url
                    picKey={'currentKey'} // 下载需要的key，根据自己需要决定
                    isAlwaysCenterZoom={true} // 是否总是中心缩放，默认false，若为true，每次缩放图片都先将图片重置回屏幕中间
                    isAlwaysShowRatioTips={true} // 是否总提示缩放倍数信息，默认false，只在点击按钮时提示，若为true，每次缩放图片都会提示
                />

                {
                    selToId ? <div className="chat-wrap">
                        <div className="title">
                            {currentFriend.name}
                        </div>
                        <div className="message" ref="message">
                            <div className="opt">
                                {this.state.loading ? <div className="loading">正在加载中...</div> :
                                    (currentFriend.unReadCount > 10 ? <div className="load-unread-mess" onClick={this.loadMess.bind(this,currentFriend.unReadCount - 10,0)}>{currentFriend.unReadCount - 10}条新消息</div> : (
                                        currentFriend.hasHistory ? <div onClick={this.loadMess.bind(this,10)} className="load-history">点击加载更多咨询记录</div> : null
                                    ))
                                }
                            </div>
                            {
                                historyMsg.length > 0 ? <div className="info">
                                    {
                                        historyMsg.map((item, index) => {
                                            let flag = false;
                                            if (index != 0) {
                                                let diffTime = item.time - historyMsg[index - 1].time;
                                                if (diffTime > 60000) {
                                                    //
                                                }
                                            }
                                            return <div className="mess-wrap" key={index}>
                                                {
                                                    item.unReadCountLoadDone?<div className="new_mess_tip">已下为新消息</div>:null
                                                }
                                                {
                                                    flag ? <div className="date">{parseTime(item.time, 'HH:mm')}</div> : null
                                                }
                                                <div className={'mess ' + (item.fromAccount == selToId ? 'right' : 'left')}>
                                                    <Avatar src={item.fromAccount == selToId ? this.props.imInfo.friendList[item.fromAccount].headUrl : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />
                                                    <div className="content">
                                                        {
                                                            item.msgType == 1 ? <div className="text">{item.msgContent.text}</div> : (
                                                                item.msgType == 2 ? <div className="image">
                                                                    {
                                                                        this.convertImageMsgToHtml(item.msgContent)

                                                                    }
                                                                </div> : (
                                                                        item.msgType == 3 ? <div className="custom">
                                                                            {
                                                                                this.convertCustomMsgToHtml(item.msgContent)
                                                                            }
                                                                        </div> : null
                                                                    )
                                                            )
                                                        }
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

                                    {
                                        Object.keys(this.state.cusTomPro).map(type => {
                                            let item = this.state.cusTomPro[type];
                                            let disabled = false;
                                            item.pro.map(pro_item => {
                                                if (pro_item.selected == true) {
                                                    disabled = false;
                                                }
                                            })
                                            return <Popover
                                                key={type}
                                                placement="topRight"
                                                content={
                                                    <div className="custom-content">
                                                        <div className="pro">
                                                            {
                                                                item.pro.map((pro_item, index) => {
                                                                    return <p key={index} onClick={this.selectPro.bind(this, type, index)}><Icon theme={pro_item.selected ? 'filled' : 'outlined'} type="check-circle" /><span>{pro_item.name}</span></p>
                                                                })
                                                            }
                                                        </div>
                                                        {
                                                            type == 1 ? <div className="date">
                                                                <p>首诊（请选择日期）</p>
                                                                <DatePicker onChange={(date, dateStr) => this.changeProDate(type, date, dateStr)} value={item.begin_time} />
                                                            </div> : null
                                                        }
                                                        <div className="btn-wrap">
                                                            <Button onClick={this.sendPro.bind(this, item, type)} size="small">发送</Button>
                                                        </div>
                                                    </div>
                                                }
                                                title={<div className="pop-title"><span>{item.title}</span><i onClick={this.closeCustom}>x</i></div>}
                                                trigger="click"
                                                visible={this.state.customType == type}
                                            >
                                                <span onClick={this.openCustom.bind(this, type)}>{item.name}</span>
                                            </Popover>
                                        })
                                    }
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