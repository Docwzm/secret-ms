import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Timeline, Button } from 'antd';
import CrfTop from './components/crfTop'
import './styles/process.scss'

class process extends Component {
    constructor(props) {
        super(props)
        this.state = {

            vnodeList: [
                {
                    // content1:''
                },
                {

                }
            ]
        }
    }
    componentDidMount() {
        console.log(this.props)
    }
    gotoDetail = () => {
        this.props.history.push('/crf/patient/edit?id=1');
    }
    addFollowUp(){
        this.setState({
            
        })
    }
    render() {
        let {
            num,
            name,
            phone,
            group,
            doctor
        } = this.state;
        return (
            <div className="crf-process">
                <CrfTop data={{
                    num: '1',
                    name: 'name',
                    phone: '12345678911',
                    group: '糖尿病',
                    doctor: '杨医生',
                }}></CrfTop>
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
                    <Button onClick={this.addFollowUp.bind(this)}>添加随访阶段</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(process)