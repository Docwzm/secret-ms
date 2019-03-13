import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Button } from 'antd';
import CrfTop from './components/crfTop'
import PickForm from '../../components/Crf_form'
import { getCrfFormList, getCrfFormDetail } from '../../apis/crf'
import PageSteps from '../../components/MySteps'
import './styles/detail.scss'

const TabPane = Tabs.TabPane;

class crfDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            proName:2,
            disabled: true,
            formData:{}
        }
    }
    componentDidMount() {
        getCrfFormDetail({}).then(res => {
            this.setState({
                formData:res.data,
                // proName:3
            })
        })
    }
    returnBack() {
        this.props.history.goBack();
    }
    selectStep = () => {

    }
    selectPro(name) {
        this.setState({
            proName: name
        })
    }
    haneleSubmit(data) {
        console.log(data)
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
            <CrfTop data={{
                num: '1',
                name: 'name',
                phone: '12345678911',
                group: '糖尿病',
                doctor: '杨医生',
            }}></CrfTop>
            {/* <PageSteps onStepClick={(icon,info) => {console.log(icon)}}></PageSteps> */}
            <div className="node-detail">
                <Tabs defaultActiveKey="1" onChange={this.selectStep}>
                    <TabPane tab={<p className="done">v1</p>} key="1">
                        <div className="pro-list">
                            <p className="pro done" onClick={this.selectPro.bind(this, 1)}>生命体征</p>
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
                <div className="edit">
                    <Button disabled={!this.state.disabled} onClick={this.editOpen}>编辑</Button>
                </div>
                <PickForm formData={this.state.formData} name={this.state.proName} disabled={this.state.disabled} onCancel={this.handleCancel} onSubmit={this.haneleSubmit.bind(this)}></PickForm>
            </div>
        </div>
    }
}

export default withRouter(crfDetail)