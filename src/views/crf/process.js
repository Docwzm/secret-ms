import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Timeline, Button, DatePicker, Dropdown } from 'antd';
import PageHeader from '../../components/PageHeader';
import { getQueryObject } from '../../utils'
import { searchCrf } from '../../apis/crf'
import './styles/process.scss'

class process extends Component {
    constructor(props) {
        super(props)
        this.state = {
            followDate: null,
            vnodeList: []
        }
    }
    componentWillMount() {
        let params = getQueryObject(this.props.location.search);
        searchCrf(params.id).then(res => {
            this.setState({
                vnodeList: res.data
            })
        })
    }
    gotoDetail = (data) => {
        console.log(data)
        return false;
        this.props.history.push('/crf/patient/edit?id=1');
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
                <PageHeader onBack={this.props.history.goBack} content={<div className="patient-info">
                    <p>患者编号：1</p>
                    <p>患者姓名：1213</p>
                    <p>手机号码：123</p>
                    <p>课题分组：21</p>
                    <p>负责医生：21</p>
                </div>} />

                <div className="vnode-list">
                    <Timeline>
                        {
                            this.state.vnodeList.map((item, index) => {
                                return <Timeline.Item color={item.status == 3 ? 'green' : (item.status == 2 ? 'red' : '')}>
                                    <div className="node">
                                        <span className="name">v{index}</span>
                                        {
                                            item.status == 3 ? <i className="done">已完成</i> : (item.status == 2 ? <i className="wait">待录入</i> : null)
                                        }
                                    </div>
                                    <div className="node-detail">
                                        {
                                            item.crfList.map(crfItem => {
                                                return <p className={crfItem.status == 3 ? 'done' : (crfItem.status == 2 ? 'wait' : '')} onClick={this.gotoDetail.bind(this, crfItem)}>知情通知书</p>
                                            })
                                        }
                                    </div>
                                </Timeline.Item>
                            })
                        }
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