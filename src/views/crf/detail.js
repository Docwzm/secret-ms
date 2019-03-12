import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';
import CrfTop from './components/crfTop'
import PickForm from '../../components/crf_form'
import './styles/detail.scss'

const TabPane = Tabs.TabPane;

class crfDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            proName:2
        }
    }
    componentDidMount() {

    }
    returnBack() {
        this.props.history.goBack();
    }
    selectStep = () => {

    }
    selectPro(name) {
        this.setState({
            proName:name
        })
    }
    haneleSubmit(data) {
        console.log(data)
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
            <div className="node-detail">
                <Tabs defaultActiveKey="1" onChange={this.selectStep}>
                    <TabPane tab={<p className="done">v1</p>} key="1">
                        <div className="pro-list">
                            <p className="pro done" onClick={this.selectPro.bind(this,1)}>生命体征</p>
                            <p className="pro done" onClick={this.selectPro.bind(this,11)}>生命体征</p>
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
                <PickForm name={this.state.proName} onSubmit={this.haneleSubmit.bind(this)}></PickForm>
            </div>
        </div>
    }
}

export default withRouter(crfDetail)