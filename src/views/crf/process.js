import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Timeline, Button, DatePicker, Dropdown } from 'antd';
import PageHeader from '../../components/PageHeader';
import { getQueryObject } from '../../utils'
import { searchCrf, addProNode } from '../../apis/crf'
import './styles/process.scss'

class process extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneId: '',
            followDate: null,
            userInfo: {},
            vnodeList: []
        }
    }
    componentWillMount() {
        let params = getQueryObject(this.props.location.search);
        this.setState({
            phoneId: params.id
        })
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
            if (data) {
                let userInfo = data.userTopicInfo;
                let vnodeList = data.contentCrfList;
                this.setState({
                    userInfo,
                    vnodeList
                })
            }
        })
    }
    gotoDetail = (data,item) => {
        this.props.history.push('/crf/patient/edit?id=' + this.state.phoneId+'&planId='+data.id+'&nodeId='+item.contentNum+'&pro='+item.crfFormType);
    }
    addFollow = () => {
        addProNode({
            programId: 1,
            nodeId: 1
        }).then(res => {
            this.setState({
                followDate: null,
                addFlag: false
            })
        })
    }
    closeAddFollow = (visible) => {
        this.setState({
            followDate: null,
            addFlag: visible
        })
    }
    changeFollowDate(date, dateStr) {
        this.setState({
            followDate: date
        })
    }
    render() {
        let { patientNo, realName, mobile, topicName, doctorName } = this.state.userInfo;
        return (
            <div className="crf-process">
                <PageHeader onBack={this.props.history.goBack} content={<div className="patient-info">
                    <p>患者编号：{patientNo}</p>
                    <p>患者姓名：{realName}</p>
                    <p>手机号码：{mobile}</p>
                    <p>课题分组：{topicName}</p>
                    <p>负责医生：{doctorName}</p>
                </div>} />

                <div className="vnode-list">
                    <Timeline>
                        {
                            this.state.vnodeList.map((item, index) => {
                                return <Timeline.Item key={index} color={item.status == 3 ? 'green' : (item.status == 2 ? 'red' : 'blue')}>
                                    <div className="node">
                                        <span className="name">v{item.num}</span>
                                        {
                                            item.status == 3 ? <i className="done">已完成</i> : (item.status == 2 ? <i className="wait">待录入</i> : null)
                                        }
                                    </div>
                                    <div className="node-detail">
                                        {
                                            item.crfList.map((crfItem, _index) => {
                                                return <p key={_index} className={crfItem.status == 3 ? 'done' : (crfItem.status == 2 ? 'wait' : '')} onClick={this.gotoDetail.bind(this,item, crfItem)}>{crfItem.crfFormType}</p>
                                            })
                                        }
                                    </div>
                                </Timeline.Item>
                            })
                        }
                    </Timeline>
                    {
                        this.state.vnodeList.length > 0 ? <Dropdown overlay={
                            <div className="add-follow">
                                <div className="title">请输入随访阶段开始时间</div>
                                <DatePicker onChange={this.changeFollowDate.bind(this)} value={this.state.followDate} />
                                <div className="btn-wrap">
                                    <Button size="small" disabled={!this.state.followDate} onClick={this.addFollow}>确定</Button>
                                    <Button size="small" onClick={this.closeAddFollow.bind(this, false)}>取消</Button>
                                </div>
                            </div>
                        } trigger={['click']} visible={this.state.addFlag} onVisibleChange={(visible) => this.closeAddFollow(visible)}>
                            <Button onClick={() => this.setState({ addFlag: true })}>添加随访阶段</Button>
                        </Dropdown> : null
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(process)