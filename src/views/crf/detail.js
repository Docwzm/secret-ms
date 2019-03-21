import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Button } from 'antd';
import PageHeader from '../../components/PageHeader'
import PickForm from '../../components/Crf_form'
import { getQueryObject } from '../../utils'
import { getCrfFormDetail, setCrfForm, searchCrf } from '../../apis/crf'
import './styles/detail.scss'

const TabPane = Tabs.TabPane;

class crfDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            proName: '',
            disabled: true,
            vnodeList: [],
            userInfo: {},
            formData: null
        }
    }
    componentWillMount() {
        let params = getQueryObject(this.props.location.search);
        searchCrf(params.id).then(res => {
            let data = res.data;
            data = {
                userTopicInfo: {
                    patientNo: '1',
                    realName: 'tester',
                    mobile: '131000000011',
                    topicName: '分组1',
                    doctorName: 'doctor'
                },
                contentCrfList: [{
                    "id": 3,
                    "userId": 3,
                    "name": "节点1",
                    "site": 1,
                    "status": 1,
                    "startDate": 1552961034000,
                    "content": "CT、OT、XT",
                    "planTime": 7,
                    "num": 1,
                    "programId": 1,
                    "deleted": 0,
                    "timeType": 1,
                    "created": 1552356241000,
                    "updated": 1552620519000,
                    "crfList": [{
                        "id": 1,
                        "userId": 1000000222,
                        "programId": 2,
                        "followUpContentId": 3,
                        "contentNum": 1,
                        "crfFormType": 2,
                        "status": 2,
                        "deleted": 0,
                        "updated": 1552620669000,
                        "created": 1552448099000
                    }]
                }]
            }
            let proId = '';
            if (data) {
                this.setState({
                    userInfo: data.userTopicInfo,
                    vnodeList: data.contentCrfList
                })
                let pro = {};
                let vIndex = data.contentCrfList.findIndex(item => item.status == 1)
                if (vIndex >= 0) {
                    pro = data.contentCrfList[vIndex].crfList.find(item => item.status == 2)
                }
                if (!params.pro && pro.id) {
                    this.selectPro(data.contentCrfList[vIndex].programId, pro.contentNum, pro.crfFormType)
                }
            }
        })
        if (params.pro) {
            this.selectPro(params.planId, params.nodeId, params.pro)
        }
    }
    selectStep = () => {

    }
    selectPro(contentId, contentNum, formId) {
        getCrfFormDetail({
            contentId,
            contentNum,
            formId
        }).then(res => {
            this.setState({
                proName: formId,
                formData: res.data,
            })
        })
    }
    haneleSubmit(data) {
        setCrfForm(data, 1).then(res => {
            this.props.onSubmit(data);
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
                {/* <PageSteps onStepClick={(icon, info) => { console.log(icon) }}></PageSteps> */}
                <Tabs defaultActiveKey="1" onChange={this.selectStep}>
                    {
                        this.state.vnodeList.map((item, index) => {
                            return <TabPane tab={<p className={item.status == 3 ? 'done' : (item.status == 2 ? 'wait' : '')}>v{item.num}</p>} key={item.num}>
                                <div className="pro-list">
                                    {
                                        item.crfList.map((_item, _index) => {
                                            return <p key={_index} className={'pro' + (_item.status == 3 ? ' done' : (_item.status == 2 ? ' wait' : ''))} onClick={this.selectPro.bind(this, _item)}>{_item.crfFormType}</p>
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
                        <PickForm formData={this.state.formData} name={this.state.proName} disabled={this.state.disabled} onCancel={this.handleCancel} onSubmit={this.haneleSubmit.bind(this)}></PickForm>
                    </div> : null
                }
            </div>
        </div>
    }
}

export default withRouter(crfDetail)