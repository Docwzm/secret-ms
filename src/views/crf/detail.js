import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Button } from 'antd';
import PageHeader from '../../components/PageHeader'
import PickForm from '../../components/Crf_form'
import { getQueryObject } from '../../utils'
import { getCrfFormList, getCrfFormDetail, setCrfForm } from '../../apis/crf'
import PageSteps from '../../components/MySteps'
import './styles/detail.scss'

const TabPane = Tabs.TabPane;

class crfDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            proName: '',
            disabled: true,
            formData: null
        }
    }
    componentWillMount() {
        let params = getQueryObject(this.props.location.search);
        this.selectPro(params.id)
    }
    selectStep = () => {
        
    }
    selectPro(name) {
        getCrfFormDetail({
            contentId:1,
            contentNum:1,
            formId:1
        }).then(res => {
            this.setState({
                proName: name,
                formData: res.data,
            })
        })
    }
    haneleSubmit(data) {
        setCrfForm(data,1).then(res => {
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
        return <div className="crf-detail">
            <PageHeader onBack={this.props.history.goBack} content={<div className="patient-info">
                    <p>患者编号：1</p>
                    <p>患者姓名：1213</p>
                    <p>手机号码：123</p>
                    <p>课题分组：21</p>
                    <p>负责医生：21</p>
                </div>} />
            <div className="node-detail">
                {/* <PageSteps onStepClick={(icon, info) => { console.log(icon) }}></PageSteps> */}
                <Tabs defaultActiveKey="1" onChange={this.selectStep}>
                    <TabPane tab={<p className="done">v1</p>} key="1">
                        <div className="pro-list">
                            <p className="pro done" onClick={this.selectPro.bind(this, 2)}>入口学资料</p>
                            <p className="pro done" onClick={this.selectPro.bind(this, 11)}>生命体征</p>
                            <p className="pro done">生命体征</p>
                        </div>
                    </TabPane>
                    <TabPane tab={<p className="wait">v2</p>} key="2">
                        <div className="pro-list">
                            <p className="pro wait">生命体征</p>
                            <p className="pro">生命体征</p>
                            <p className="pro">生命体征</p>
                        </div>
                    </TabPane>
                    <TabPane tab={<p>v3</p>} key="3">Content of Tab Pane 3</TabPane>
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