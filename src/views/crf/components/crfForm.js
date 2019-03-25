import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Button } from 'antd';
import PickForm from '../../../components/Crf_form'
import PageHeader from '../../../components/PageHeader'
import { formNameObj } from '../../../utils/crfForm'
import { getCrfFormDetail, setCrfForm, searchCrf } from '../../../apis/crf'
import '../styles/detail.scss'

const TabPane = Tabs.TabPane;

class CrfForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nodeKey: '1',
            proName: '',
            disabled: true,
            vnodeList: [],
            userInfo: {},
            formData: null,
            curPro: {}
        }
    }
    componentWillMount() {
        searchCrf(this.props.id).then(res => {
            let data = res.data;
            let proId = '';
            if (data) {
                this.setState({
                    userInfo: data.userTopicInfo,
                    vnodeList: data.contentCrfList
                })
                let pro = {};
                let vIndex = data.contentCrfList.findIndex(item => item.id == this.props.nodeId)
                if (vIndex >= 0) {
                    if (this.props.pro) {
                        pro = data.contentCrfList[vIndex].crfList.find(item => item.crfFormType == this.props.pro)
                    } else {
                        pro = data.contentCrfList[vIndex].crfList.find(item => item.status == 2)
                    }
                    this.setState({
                        planId: data.contentCrfList[vIndex].id,
                        curPro: pro,
                        nodeKey: vIndex.toString()
                    })
                }
                if (pro.id) {
                    this.selectPro()
                }
            }
        })
    }
    selectStep = (activeKey) => {
        this.setState({
            planId: this.state.vnodeList[activeKey].id,
            nodeKey: activeKey
        })
    }
    selectPro(proData) {
        let { planId, curPro } = this.state;
        let contentNum = proData ? proData.contentNum : curPro.contentNum;
        let crfFormType = proData ? proData.crfFormType : curPro.crfFormType;
        getCrfFormDetail({
            contentId: planId,
            contentNum,
            crfFormType
        }).then(res => {
            let params = {
                formData: res.data || {}
            }
            if (proData) {
                params.curPro = proData;
            }
            this.setState(params)
        })
    }
    haneleSubmit(data) {
        let curPro = this.state.curPro
        let { id, userId, programId, followUpContentId, contentNum } = curPro;
        let other_data = {
            crfId: id,
            userId,
            programId,
            followUpContentId,
            num: contentNum,
        }
        if (this.state.formData.id) {
            other_data.id = this.state.formData.id
        }
        data = { ...other_data, ...data }
        setCrfForm(data, curPro.crfFormType).then(res => {
            this.state.vnodeList[this.state.nodeKey].crfList = this.state.vnodeList[this.state.nodeKey].crfList.map(item => {
                if (item.id == this.state.curPro.id) {
                    item.status = 3;
                }
                return item
            })
            this.setState({
                vnodeList: this.state.vnodeList,
                disabled: true
            })
            this.props.submitCall(res)
        })
    }
    handleCancel = () => {
        this.setState({
            disabled: true
        })
    }
    editOpen = () => {
        this.setState({
            disabled: false
        })
    }
    render() {
        let { patientNo, realName, mobile, topicName, doctorName } = this.state.userInfo;
        return <div>
            {
                this.props.hasHeader?<PageHeader onBack={this.props.history.goBack} content={<div className="patient-info">
                    <p>患者编号：{patientNo}</p>
                    <p>患者姓名：{realName}</p>
                    <p>手机号码：{mobile}</p>
                    <p>课题分组：{topicName}</p>
                    <p>负责医生：{doctorName}</p>
                </div>} />:null
            }
            <div className="node-detail">
                <Tabs activeKey={this.state.nodeKey} onChange={this.selectStep}>
                    {
                        this.state.vnodeList.map((item, index) => {
                            return <TabPane tab={<p className={item.status == 3 ? 'done' : (item.status == 2 ? 'wait' : '')}>{item.name}</p>} key={index}>
                                <div className="pro-list">
                                    {
                                        item.crfList.map((_item, _index) => {
                                            return <p key={_index} className={'pro' + (_item.status == 3 ? ' done' : (_item.status == 2 ? ' wait' : ''))} onClick={this.selectPro.bind(this, _item)}>{formNameObj[_item.crfFormType]}</p>
                                        })
                                    }
                                </div>
                            </TabPane>
                        })
                    }
                </Tabs>
                {
                    this.state.formData ? <div>
                        <div className="edit">
                            <Button disabled={!this.state.disabled} onClick={this.editOpen}>编辑</Button>
                        </div>
                        <PickForm formData={this.state.formData} name={this.state.curPro.crfFormType} disabled={this.state.disabled} onCancel={this.handleCancel} onSubmit={this.haneleSubmit.bind(this)}></PickForm>
                    </div> : null
                }
            </div>
        </div>
    }
}

export default withRouter(CrfForm)