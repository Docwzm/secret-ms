import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Button } from 'antd';
import PageHeader from '../../components/PageHeader'
import PickForm from '../../components/Crf_form'
import CrfFormNode from '../../components/CrfFormNode'
import { getQueryObject } from '../../utils'
import { formNameObj } from '../../utils/crfForm'
import { getCrfFormDetail, setCrfForm, searchCrf } from '../../apis/crf'
import './styles/detail.scss'

class crfDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nodeKey:'0',//当前节点key
            vnodeList: [],//v1-v9节点数据
            userInfo: {},//患者信息
            formData: null,//表单数据
            disabled: true,//是否可编辑
            curPro:{} 
        }
    }
    componentWillMount() {
        let params = getQueryObject(this.props.location.search);
        searchCrf(params.id).then(res => {
            let data = res.data;
            let proId = '';
            if (data) {
                this.setState({
                    userInfo: data.userTopicInfo,
                    vnodeList: data.contentCrfList
                })
                let pro = {};
                let vIndex = data.contentCrfList.findIndex(item => item.id == params.nodeId)
                if (vIndex >= 0) {
                    if (params.pro) {
                        pro = data.contentCrfList[vIndex].crfList.find(item => item.crfFormType == params.pro)
                    } else {
                        pro = data.contentCrfList[vIndex].crfList.find(item => item.status == 2)
                    }
                    this.setState({
                        nodeKey:vIndex.toString()
                    })
                }
                if (pro.id) {
                    this.selectPro({
                        contentNum:pro.contentNum,
                        crfFormType:pro.crfFormType
                    })
                }
            }
        })
    }
    selectStep = (activeKey) => {
        this.setState({
            nodeKey:activeKey
        })
    }
    selectPro(proData) {
        let { nodeKey, vnodeList } = this.state;
        let { contentNum, crfFormType } = proData;
        getCrfFormDetail({
            contentId: vnodeList[nodeKey].id,
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
            crfId:id,
            userId,
            programId,
            followUpContentId,
            num:contentNum,
        }
        if(this.state.formData.id){
            other_data.id = this.state.formData.id
        }
        data = { ...other_data, ...data }
        setCrfForm(data, curPro.crfFormType).then(res => {
            let flag = true;
            this.state.vnodeList[this.state.nodeKey].crfList = this.state.vnodeList[this.state.nodeKey].crfList.map(item => {
                if(item.id==this.state.curPro.id){
                    item.status = 3;
                }
                if(item.status!=3){
                    flag = false
                }
                return item
            })
            if(flag){
                this.state.vnodeList[this.state.nodeKey].status = 3
            }else{
                this.state.vnodeList[this.state.nodeKey].status = 2;
            }
            this.setState({
                vnodeList:this.state.vnodeList,
                disabled: true
            })
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
        return <div className="crf-detail">
            <PageHeader onBack={this.props.history.goBack} content={<div className="patient-info">
                <p>患者编号：{patientNo}</p>
                <p>患者姓名：{realName}</p>
                <p>手机号码：{mobile}</p>
                <p>课题分组：{topicName}</p>
                <p>负责医生：{doctorName}</p>
            </div>} />
            <div className="node-detail">
                <CrfFormNode list={this.state.vnodeList} activeFormId={this.state.curPro.id} activeKey={this.state.nodeKey} selectStep={this.selectStep.bind(this)} selectPro={this.selectPro.bind(this)}></CrfFormNode>
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

export default withRouter(crfDetail)