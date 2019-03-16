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
            formData: null
        }
    }
    componentWillMount() {
        let params = getQueryObject(this.props.location.search);
        [1,2].findIndex(item => {
            return item>0
        })
        searchCrf(params.id).then(res => {
            let data = res.data;
            let proId = '';
            this.setState({
                vnodeList: data
            })
            let pro = {};
            let vIndex = data.findIndex(item => item.status==1 )
            if(vIndex>=0){
                pro = data[vIndex].crfList.find(item => item.status==2 )
            }
            
            if(!params.proId){
                this.selectPro(pro.id,pro.crfFormType)
            }
        })
        if(params.proId){
            this.selectPro(params.proId,params.proName)
        }
    }
    selectStep = () => {

    }
    selectPro(id,name) {
        getCrfFormDetail({
            contentId: 1,
            contentNum: 1,
            formId: 1
        }).then(res => {
            this.setState({
                proName: name,
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
                    {
                        this.state.vnodeList.map((item, index) => {
                            return <TabPane tab={<p className={item.status == 3 ? 'done' : (item.status == 2 ? 'wait' : '')}>v{index}</p>} key={index}>
                                <div className="pro-list">
                                    {
                                        item.crfList.map((_item, _index) => {
                                            return <p key={_index} className={'pro' + (_item.status == 3 ? ' done' : (_item.status == 2 ? ' wait' : ''))} onClick={this.selectPro.bind(this, _item)}>入口学资料</p>
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