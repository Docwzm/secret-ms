import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Timeline, Button, PageHeader, DatePicker, Dropdown } from 'antd';
import './styles/process.scss'

class process extends Component {
    constructor(props) {
        super(props)
        this.state = {
            followDate: null,
            vnodeList: []
        }
    }
    componentDidMount() {
        console.log(this.props)
    }
    gotoDetail = () => {
        this.props.history.push('/crf/patient/edit', {
            id: '1'
        });
    }
    addFollow = () => {
        this.setState({
            followDate: null,
            addFlag: false
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
        return (
            <div className="crf-process">
                <PageHeader onBack={this.props.history.goBack} title={<div className="patient-info">
                    <p>患者编号：1</p>
                    <p>患者姓名：1213</p>
                    <p>手机号码：123</p>
                    <p>课题分组：21</p>
                    <p>负责医生：21</p>
                </div>} />
                <div className="vnode-list">
                    <Timeline>
                        <Timeline.Item color="green">
                            <div className="node"><span className="name">v0</span><i className="done">已完成</i></div>
                            <div className="node-detail">
                                <p className="done" onClick={this.gotoDetail}>知情通知书</p>
                                <p className="wait">知情通知书</p>
                            </div>
                        </Timeline.Item>
                        <Timeline.Item color="red">
                            <div className="node"><span className="name">v0</span><i className="wait">待录入</i></div>
                            <div className="node-detail">
                                <p>知情通知书</p>
                                <p className="done">知情通知书</p>
                                <p className="wait">知情通知书</p>
                            </div>
                        </Timeline.Item>
                        <Timeline.Item>
                            <div className="node"><span className="name">v0</span></div>
                            <div className="node-detail">
                                <p>知情通知书</p>
                            </div>
                        </Timeline.Item>
                    </Timeline>
                    <Dropdown overlay={
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
                    </Dropdown>
                </div>
            </div>
        );
    }
}

export default withRouter(process)