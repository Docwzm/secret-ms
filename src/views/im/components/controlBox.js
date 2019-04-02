import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import actions from '../../../redux/actions'
import { Input, Button, Modal, Icon, DatePicker, Dropdown, Tabs } from 'antd';
import { setLocal } from '../../../utils';
import { switchEnum } from '../../../utils/enum';
import { planList, addPlan, getPatientPlan } from '../../../apis/plan'
import { findPatient } from '../../../apis/relation';
import { getButton } from '../../../apis/user'
import { DataTable, DataChart, Measurement, BaseInfo, MedicalRecord, Followup } from '../../patient/components/index'
import moment from 'moment'
const { TextArea } = Input;
const TabPane = Tabs.TabPane;

class ControlBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tab2PageType: "chart",
            patientInfo: {},
            fileFlag: false,
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
                    btnKey: 'sendFollow'
                },
                // 2: {
                //     title: '患教内容',
                //     name: '患教',
                //     image: '',
                //     content: '为了您的健康，我给你发送了一篇文章，请仔细阅读',
                //     pro: [],
                //     btnKey:'sendPatientInfo'
                // },
                3: {
                    title: '测量计划',
                    name: '测量',
                    image: '',
                    content: '良好的测量习惯有助于健康的改善，以下测量计划记得完成',
                    isAddText: '测量计划正在进行中,确认替换？',
                    pro: [],
                    btnKey: 'sendMeasurePlan'
                }
            },
        }
    }
    componentWillMount() {
        this.actionGetButton({ pageId: 4 })
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
            //...发送操作
            this.props.sendMsg(1, { value: dom.value })
            dom.value = '';
        }
    }
    closeFile = () => {
        this.setState({
            fileFlag: false
        })
    }
    openFile = () => {
        let { friendList,selToId } = this.props.imInfo;
        this.actionFindPatient({ relationId: friendList[selToId].relationId })
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
                this.openProList(type)
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
            this.sendPro(item, type)
        })
    }
    sendPro = (myPro, type) => {
        let {
            selToId
        } = this.props.imInfo
        let programId = ''
        myPro = myPro ? myPro : this.state.myPro;
        type = type ? type : this.state.customType;
        let proData = {
            type,
            data: {}
        };
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
            // this.props.setImState({
            //     loadMessType:3
            // })
        })
    }
    handleTabsCallback(value) {
        setLocal('archivesTab', value.toString())
    }
    handleTab2ChangePageType(type) {
        this.setState({ tab2PageType: type })
    }
    /**
     * 患者信息
     * @param {*} data 
     */
    async actionFindPatient(data) {
        console.log(data)
        let patient = await findPatient(data)
        this.setState({ patientInfo: patient.data || {} })
    }

    //页面按钮权限
    async actionGetButton(data) {
        let { cusTomPro } = this.state
        let buttons = await getButton(data)
        let buttonList = buttons.data.buttons
        for (let x in cusTomPro) {
            let pro_item = cusTomPro[x];
            if (buttonList.findIndex(item => item.buttonKey == pro_item.btnKey) < 0) {
                delete cusTomPro[x]
            }
        }
        this.setState({
            cusTomPro
        })
    }

    handleCustomVisible = (visible) => {
        if (!visible) {
            this.setState({
                customType: 0
            })
        }
    }

    render() {
        let selToId = this.props.imInfo.selToId;
        let currentFriend = this.props.imInfo.friendList ? this.props.imInfo.friendList[selToId] : {};
        const { tab2PageType, patientInfo } = this.state
        const userBaseInfo = () => (
            <div className="base-info">
                <i className="avatar">
                    <img src={patientInfo.headUrl || ''} alt='头像' />
                </i>
                <i className="name">{patientInfo.realName}</i>
                {patientInfo.sex ? <i className='gender'>{patientInfo.sex}</i> : null}
                <i>{patientInfo.age}岁</i>
                <i>{patientInfo.mobile}</i>
                <i>{patientInfo.groupName || ''}</i>
                <i>{patientInfo.subGroupName || ''}</i>
                {patientInfo.patientNo ? <i>编号：{patientInfo.patientNo}</i> : null}
                <i>入组时间：{moment(patientInfo.enterGroupTime).format('YYYY-MM-DD')}</i>
            </div>
        )

        const tab2 = () => (
            <div className='tab2'>
                <div className='tab2-header'>
                    {tab2PageType === 'chart' ? (
                        <Button type="primary" onClick={this.handleTab2ChangePageType.bind(this, 'table')}>测量数据表</Button>
                    ) : (
                            <Button type="primary" onClick={this.handleTab2ChangePageType.bind(this, 'chart')}>趋势图</Button>
                        )}
                </div>
                {tab2PageType === 'chart' ? <DataChart patientId={selToId} /> : <DataTable patientId={selToId} />}
            </div>
        )

        return (
            <div className="controlBox">
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
                    width={'90%'}
                    height={500}
                    className="file-modal"
                    visible={this.state.fileFlag}
                    onCancel={this.closeFile}
                    footer={null}
                    destroyOnClose={true}
                >
                    <div className="archives-wrap">
                        {userBaseInfo()}
                        <Tabs
                            defaultActiveKey='1'
                            onChange={this.handleTabsCallback.bind(this)}
                            type="card"
                        >
                            <TabPane tab="随访管理" key="1"><Followup onlyRead={true} patientId={selToId} /></TabPane>
                            <TabPane tab="综合视图" key="2">{tab2()}</TabPane>
                            <TabPane tab="诊疗记录" key="3"><MedicalRecord patientId={selToId} /></TabPane>
                            <TabPane tab="测量管理" key="4"><Measurement patientId={selToId} /></TabPane>
                            <TabPane tab="基本信息" key="5"><BaseInfo onlyRead={true} patientInfo={patientInfo} /></TabPane>
                        </Tabs>
                        {/* <Archives patientId={selToId} /> */}
                    </div>
                </Modal>

                <div>
                    <div className="control-bar">
                        <div className="patient-file" onClick={this.openFile}>患者档案</div>
                        {
                            currentFriend.type == 2 ? <div className="self-make-mess">
                                {
                                    Object.keys(this.state.cusTomPro).map(type => {
                                        let item = this.state.cusTomPro[type];
                                        let disabled = true;
                                        item.pro.map(pro_item => {
                                            if (pro_item.selected == true) {
                                                if (type == 1) {
                                                    item.begin_time_lable = switchEnum(pro_item.timeCategory, 'timeCategory')
                                                    if (item.begin_time) {
                                                        disabled = false;
                                                    }
                                                } else {
                                                    disabled = false;
                                                }
                                            }
                                        })

                                        const content = (
                                            <div className="pro-drop-wrap">
                                                <div className="pop-title"><span>{item.title}</span><i onClick={this.closeCustom}>x</i></div>
                                                <div className="custom-content">
                                                    <div className="pro">
                                                        {
                                                            item.pro.map((pro_item, index) => {
                                                                return <p key={index} onClick={this.selectPro.bind(this, type, index)}>{pro_item.selected ? <Icon style={{ 'color': '#1890FF' }} theme={'filled'} type="check-circle" /> : <b></b>}<span>{pro_item.name}</span></p>
                                                            })
                                                        }
                                                    </div>
                                                    {
                                                        type == 1 ? <div className="date">
                                                            <p>{item.begin_time_lable ? item.begin_time_lable : '开始时间（请选择日期）'}</p>
                                                            <DatePicker placeholder="请选择开始时间" onChange={(date, dateStr) => this.changeProDate(type, date, dateStr)} value={item.begin_time} />
                                                        </div> : null
                                                    }
                                                    <div className="btn-wrap">
                                                        <Button onClick={this.handleSendPro.bind(this, item, type)} size="small" disabled={disabled}>发送</Button>
                                                    </div>
                                                </div>

                                            </div>
                                        )

                                        return <Dropdown key={type} overlay={content} trigger={['click']} placement="topRight" visible={this.state.customType == type && this.state.showPro} onVisibleChange={this.handleCustomVisible}>
                                            <span className={(type == 1 ? 'follow-btn' : (type == 2 ? 'page-btn' : 'measure-btn')) + (this.state.customType == type ? ' active' : '')} onClick={this.openCustom.bind(this, type)}></span>
                                        </Dropdown>
                                    })
                                }
                            </div> : null
                        }
                    </div>
                    <TextArea ref="text" rows={3} onKeyUp={event => this.sendMsg(event, 'keyup')} />
                    <div className="btn-wrap">
                        <Button onClick={this.sendMsg}>发送</Button>
                        <p>按下Ctrl+Enter换行</p>
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
}, actions)(ControlBox))