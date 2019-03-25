import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Timeline, Button, DatePicker, Dropdown } from 'antd';
import PageHeader from '../../components/PageHeader';
import { getQueryObject } from '../../utils'
import { searchCrf, addProNode } from '../../apis/crf'
import { formNameObj } from '../../utils/crfForm'
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
    gotoDetail = (data, item) => {
        this.props.history.push('/crf/patient/edit?id=' + this.state.phoneId + '&nodeId=' + data.id + '&pro=' + item.crfFormType);
    }
    addFollow = () => {
        let pro = this.state.vnodeList[this.state.vnodeList.length-1];
        addProNode({
            programId: pro.programId,
            nodeId: pro.id
        }).then(res => {
            let vnodeList = this.state.vnodeList.concat([{
                ...res.data
            }])
            this.setState({
                vnodeList,
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
    getDisabledDate(date) {
        if(date.valueOf()-new Date().getTime()>0){
            return false;
        }else{
            return true;
        }
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
                                        <span className="name">{item.name}</span>
                                        {
                                            item.status == 3 ? <i className="done">已完成</i> : (item.status == 2 ? <i className="wait">待录入</i> : null)
                                        }
                                    </div>
                                    <div className="node-detail">
                                        {
                                            item.crfList.map((crfItem, _index) => {
                                                return <p key={_index} className={crfItem.status == 3 ? 'done' : (crfItem.status == 2 ? 'wait' : '')} onClick={this.gotoDetail.bind(this, item, crfItem)}>{formNameObj[crfItem.crfFormType]}</p>
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
                                <DatePicker disabledDate={this.getDisabledDate.bind(this)} onChange={this.changeFollowDate.bind(this)} value={this.state.followDate} />
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