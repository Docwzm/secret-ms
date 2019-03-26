import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import actions from '../../../redux/actions'
import { Input, Button, Avatar, Modal, Icon, DatePicker, Dropdown } from 'antd';
import { parseTime, getLocal } from '../../../utils';
import ImgPreview from './imageViewer';
import { planList, addPlan, getPatientPlan } from '../../../apis/plan'
import { withRouter } from 'react-router-dom';
import Archives from '../../patient/archives'
const { TextArea } = Input;

class chatBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            loadMessType: 0,
            fileFlag: false,
            loading: true,
            previewImg: false,
            previewImgArr: [],
            preViewImgIndex: 0,
            isAddPro: false,
            showPro: false,
            customType: 0,//自定义消息标识 1/随访 2/宣教 3/测量
            cusTomPro: {
                1: {
                    title: '随访计划',
                    name: '随访',
                    image: '',
                    content: '根据你目前的身体状态，我帮你制定了个性化随访计划',
                    isAddText: '随访计划正在进行中,确认替换？',
                    pro: [],
                },
                // 2: {
                //     title: '患教内容',
                //     name: '患教',
                //     image: '',
                //     content: '为了您的健康，我给你发送了一篇文章，请仔细阅读',
                //     pro: [],
                // },
                3: {
                    title: '测量计划',
                    name: '测量',
                    image: '',
                    content: '良好的测量习惯有助于健康的改善，以下测量计划记得完成',
                    isAddText: '测量计划正在进行中,确认替换？',
                    pro: [],
                }
            },
        }
    }
    componentWillMount() {
        let user = this.props.user
        if (!user) {
            let local_user = getLocal('user');
            if (local_user) {
                user = JSON.parse(local_user)
            }
        }
        this.setState({
            user
        })
        if (this.props.imInfo.historyMsg && this.props.imInfo.historyMsg[this.props.imInfo.selToId]) {
            this.setState({
                loading: false
            })
        } else {
            this.setState({
                loading: true
            })
        }
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
    componentDidMount() {
        this.resetScroll(this.props)
    }
    componentWillReceiveProps(props) {
        if (props.imInfo.historyMsg && props.imInfo.historyMsg[props.imInfo.selToId]) {
            this.setState({
                loading: false
            })
        }
        // this.resetScroll(props)
    }
    resetScroll(props) {
        let { friendList, selToId } = props.imInfo
        if (this.state.loadMessType == 0) {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                let message_list_el = document.getElementById('message');
                if (message_list_el) {
                    if (friendList[selToId] && friendList[selToId].scrollTop != undefined) {
                        message_list_el.scrollTop = friendList[selToId].scrollTop
                    } else {
                        message_list_el.scrollTop = message_list_el.scrollHeight - message_list_el.clientHeight;
                    }
                }
            }, 50)

        } else if (this.state.loadMessType == 1) {
            //加载新消息
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                let message_list_el = document.getElementById('message');
                if (message_list_el) {
                    message_list_el.scrollTop = 0
                }
                this.setState({
                    loadMessType: 0
                })
            }, 50)
        } else if (this.state.loadMessType == 2) {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                let message_list_el = document.getElementById('message');
                let dom_info = ReactDOM.findDOMNode(this.refs['info'])
                if (message_list_el) {
                    message_list_el.scrollTop = dom_info.clientHeight - this.state.scrollHeight
                }
                this.setState({
                    loadMessType: 0
                })
            }, 50)
        } else {
            this.setState({
                loadMessType: 0
            })
        }
    }
    setScroll() {
        this.timer = setTimeout(() => {
            let message_list_el = document.getElementById('message');
            if (message_list_el) {
                message_list_el.scrollTop = message_list_el.scrollHeight - message_list_el.clientHeight;
            }
        }, 50)
    }
    sendMsg = (event, type) => {
        let dom = ReactDOM.findDOMNode(this.refs['text'])
        if (type == 'keyup') {
            if (event.ctrlKey && event.keyCode == 13) {
                //换行
                dom.value += '\n'
            } else {
                if (event.keyCode == 13) {
                    if (dom.value.trim() == '') {
                        dom.value = ''
                        return;
                    }
                    dom.value = dom.value.replace(/\n$/, '')
                    this.setScroll()
                    //...发送操作
                    this.props.sendMsg(1, { value: dom.value })
                    dom.value = ''
                }
            }
        } else {
            if (dom.value.trim() == '') {
                dom.value = ''
                return;
            }
            this.setScroll()
            //...发送操作
            this.props.sendMsg(1, { value: dom.value })
            dom.value = '';
        }
    }
    closePreiveImg = () => {
        this.setState({
            previewImg: false
        })
    }
    openPreviewImg = (UUID) => {
        const previewImgArr = [];
        let index = 0;
        let preViewImgIndex = 0;
        this.props.imInfo.historyMsg[this.props.imInfo.selToId].map(item => {
            let type = item.MsgBody[0].MsgType
            let content = item.MsgBody[0].MsgContent
            if (type == "TIMImageElem") {
                if (content.UUID == UUID) {
                    preViewImgIndex = index;
                }
                let imgArr = [];
                content.ImageInfoArray.map(img_item => {
                    let type = img_item.Type || img_item.type;
                    let img_url = img_item.URL || img_item.url;
                    if (type == 2) {
                        imgArr[0] = img_url;
                    } else if (type == 1) {
                        imgArr[1] = img_url;
                    }
                })
                previewImgArr.push(imgArr)
                index += 1;
            }
        })
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
    openProList(type) {
        type = type ? type : this.state.customType;
        const cusTomPro = Object.assign({}, this.state.cusTomPro)
        if (cusTomPro[type].pro.length > 0) {
            delete cusTomPro[type].begin_time
            cusTomPro[type].pro.map(item => {
                item.selected = false;
                return item;
            })

            this.setState({
                customType: type,
                showPro: true,
                cusTomPro
            })
        } else {
            planList({
                type,
                category: 2
            }).then(res => {
                let data = res.data;
                cusTomPro[type].pro = data;
                this.setState({
                    customType: type,
                    showPro: true,
                    cusTomPro
                })
            })
        }
    }
    openCustom = (type) => {
        let { selToId } = this.props.imInfo;
        this.setState({
            showPro: false
        })

        if (type == 2) {
            //患教内容不判断是否已添加
            this.openProList(type)
        } else {
            if (this.state.customType != type) {
                setTimeout(() => {
                    // getPatientPlan(selToId, type).then(res => {
                    //     // 已添加
                    //     this.setState({
                    //         isAddPro: true,
                    //         customType: type,
                    //     })
                    // }).catch(e => {
                    // 未添加
                    this.openProList(type)
                    // })
                }, 100)
            }
        }

    }
    closeCustom = () => {
        this.setState({
            customType: 0,
        })
    }
    handleAddPro = () => {
        this.setState({
            isAddPro: false,
            customType: 0
        })
        this.sendPro()
    }
    handleCancelAddPro = () => {
        this.setState({
            isAddPro: false,
            customType: 0
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
        this.setState({
            cusTomPro
        })
    }
    handleSendPro = (item, type) => {
        let {
            selToId
        } = this.props.imInfo

        getPatientPlan(selToId, type).then(res => {
            // 已添加
            this.setState({
                isAddPro: true,
                customType: type,
                showPro: false,
                myPro: item
            })

        }).catch(e => {
            this.sendPro(item,type)
        })
    }
    sendPro = (myPro, type) => {
        let {
            selToId
        } = this.props.imInfo
        let proData = {
            type,
            data: {}
        };
        let programId = ''
        myPro = myPro?myPro:this.state.myPro;
        type = type?type:this.state.customType;

        myPro.pro.map(pro_item => {
            if (pro_item.selected) {
                programId = pro_item.id;
                proData.data.title = pro_item.name
            }
        })

        let params = {
            programId,
            patientId: selToId
        }

        if (type == 1) {
            params.beginTime = new Date(myPro.begin_time).getTime();
            proData.data.startDate = new Date(myPro.begin_time).getTime();
        } else if (type == 2) {
            proData.data.url = '';
        } else if (type == 3) {
            proData.data.startDate = new Date().getTime();
        }
        proData.data.image = this.state.cusTomPro[type].image;
        proData.data.detail = this.state.cusTomPro[type].content;

        this.setState({
            customType: 0
        })

        addPlan(params).then(res => {
            proData.data.id = res.data;
            this.props.sendMsg(3, { value: JSON.stringify(proData) })
            this.setScroll()
        })

    }
    openPro = (item) => {
        let { selToId } = this.props.imInfo
        let data = JSON.parse(item.MsgBody[0].MsgContent.Data);
        let type = data.type;
        if (type != 2) {
            window.open('/rpm/#/project?id=' + selToId + '&type=' + type)
        }
    }
    imageLoad(data) {
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
            <img src={smallImage + '#' + bigImage} style={{ 'cursor': 'pointer' }} id={content.UUID} onClick={this.openPreviewImg.bind(this, content.UUID)} />
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
    loadMess = (count, type) => {
        let loadMessType = 2;
        if (type == 1) {
            loadMessType = 1;
        }
        this.setState({
            loading: true,
            loadMessType,
            scrollHeight: ReactDOM.findDOMNode(this.refs['info']).clientHeight
        })

        this.props.loadMess({
            identifier: this.props.imInfo.selToId,
            endTime: this.getEndTime(),
            count,
            type
        }, data => {
            this.props.setImState(data)
            this.setState({
                loading: false
            })

            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                let message_list_el = document.getElementById('message');
                let dom_info = ReactDOM.findDOMNode(this.refs['info'])
                if (message_list_el) {
                    if (type == 2) {
                        message_list_el.scrollTop = dom_info.clientHeight - this.state.scrollHeight
                    } else if (type == 1) {
                        message_list_el.scrollTop = 0
                    }
                }
            }, 50)
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
    render() {
        console.log('right')
        let selToId = this.props.imInfo.selToId;
        let currentFriend = this.props.imInfo.friendList ? this.props.imInfo.friendList[selToId] : {};
        let historyMsg = this.props.imInfo.historyMsg ? this.props.imInfo.historyMsg[selToId] : null
        return (
            <div className="chatBoard">
                <Modal
                    visible={this.state.isAddPro}
                    okText='确认'
                    cancelText='取消'
                    onOk={this.handleAddPro}
                    onCancel={this.handleCancelAddPro}
                >
                    <p>{this.state.cusTomPro[this.state.customType] ? this.state.cusTomPro[this.state.customType].isAddText : ''}</p>
                </Modal>

                <Modal
                    width={'80%'}
                    height={500}
                    className="file-modal"
                    visible={this.state.fileFlag}
                    onCancel={this.closeFile}
                    footer={null}
                >
                    <div>
                        <Archives patientId={selToId} onlyShow={true} />
                    </div>
                </Modal>

                <ImgPreview
                    visible={this.state.previewImg}  // 是否可见
                    onClose={this.closePreiveImg} // 关闭事件
                    imgIndex={this.state.preViewImgIndex}
                    imgArr={this.state.previewImgArr} // 图片url
                    picKey={'currentKey'} // 下载需要的key，根据自己需要决定
                    isAlwaysCenterZoom={true} // 是否总是中心缩放，默认false，若为true，每次缩放图片都先将图片重置回屏幕中间
                // isAlwaysShowRatioTips={true} // 是否总提示缩放倍数信息，默认false，只在点击按钮时提示，若为true，每次缩放图片都会提示
                />

                {
                    selToId && currentFriend ? <div className="chat-wrap">
                        <div className="title">
                            {currentFriend.name}
                        </div>
                        <div className="message" id="message" ref="message">
                            <div className="opt">
                                {this.state.loading ? <div className="loading">正在加载中...</div> :
                                    (currentFriend.unReadCount > 10 ? <div className="load-unread-mess" onClick={this.loadMess.bind(this, currentFriend.unReadCount - 10, 1)}>{currentFriend.unReadCount - 10}条新消息</div> : (
                                        currentFriend.hasMoreHistory ? <div onClick={this.loadMess.bind(this, 10, 2)} className="load-history">点击加载更多咨询记录</div> : null
                                    ))
                                }
                            </div>
                            {
                                historyMsg ? <div className="info" id='info' ref="info">
                                    {
                                        historyMsg.map((item, index) => {
                                            return <div className="mess-wrap" key={index}>
                                                {
                                                    item.unReadCountLoadDone ? <div className="new_mess_tip"><span>已下为新消息</span></div> : null
                                                }
                                                {
                                                    item.showTime ? <div className="date">{this.filterTime(item.CreateTime)}</div> : null
                                                }
                                                <div className={'mess ' + (item.From_Account == selToId ? 'left' : 'right')}>
                                                    <Avatar src={item.From_Account == selToId ? currentFriend.headUrl : this.state.user.headUrl} />
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
                                                </div>
                                            </div>
                                        })
                                    }
                                </div> : null
                            }
                        </div>
                        <div className="controlBox">
                            <div className="control-bar">
                                <div className="patient-file" onClick={this.openFile}><Icon type="file-text" />患者档案</div>
                                {
                                    currentFriend.type == 2 ? <div className="self-make-mess">
                                        {
                                            Object.keys(this.state.cusTomPro).map(type => {
                                                let item = this.state.cusTomPro[type];
                                                let disabled = true;
                                                item.pro.map(pro_item => {
                                                    if (pro_item.selected == true) {
                                                        if (type == 1) {
                                                            if (item.begin_time) {
                                                                disabled = false;
                                                            }
                                                        } else {
                                                            disabled = false;
                                                        }
                                                    }
                                                })

                                                const content = (
                                                    <div className="dropdown-wrap">
                                                        <div className="pop-title"><span>{item.title}</span><i onClick={this.closeCustom}>x</i></div>
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
                                                                <Button onClick={this.handleSendPro.bind(this, item, type)} size="small" disabled={disabled}>发送</Button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                )

                                                return <Dropdown key={type} overlay={content} trigger={['click']} placement="topRight" visible={this.state.customType == type && this.state.showPro} onVisibleChange={(visible) => { this.setState({ customType: 0 }) }}>
                                                    <span onClick={this.openCustom.bind(this, type)}>{item.name}</span>
                                                </Dropdown>
                                            })
                                        }
                                    </div> : null
                                }
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
        )
    }
}

export default withRouter(connect(state => {
    return {
        imInfo: state.imInfo
    }
}, actions)(chatBoard))