import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Button,Tabs,Steps} from 'antd'
import PageHeader from '../../components/PageHeader';
import {DataTable,DataChart,Measurement,BaseInfo,MedicalRecord,Followup} from './components/index'
import {getPatientData }from '../../apis/healthdata'
import "./styles/archives.css"

const TabPane = Tabs.TabPane;


class Plan extends Component {
  state={
    tab2PageType:"chart",
  }

  handleTabsCallback(value){
    switch(value){
      case "2":
        this.actionGetPatientData({})
        break;
      default:
        return;
    }
  }


  //切换显示项目
  handleTab2RadioBtn(e){
    console.log(e)
  }

  handleTab2ChangePageType(type){
    this.setState({tab2PageType:type})
  } 

  handleHeaderBack(){
    this.props.history.goBack()
  }

  /**
   * 获取患者测量数据
   * @param {*} param0 
   */
  async actionGetPatientData({beginDate,endDate,patientId}){
    let patientData = await getPatientData({beginDate,endDate,patientId})
    console.log(patientData)
  }

  render() {
    const {tab2PageType} = this.state;

    const userBaseInfo = () =>(
      <div className="base-info">
        <i className="avatar"></i>
        <i className="name">小王啊</i>
        <i className='gender'>男</i>
        <i>63岁</i>
        <i>13800138000</i>
        <i>课题二</i>
        <i>A组</i>
        <i>编号：00001</i>
        <i>入组时间：2019-03-03</i>
        <Button type="primary">发消息</Button>
      </div>
    )

    const tab2 = () => (
      <div className='tab2'>
        {tab2PageType === 'chart' ? <DataChart onChangePageType={this.handleTab2ChangePageType.bind(this)}/> : <DataTable onChange={this.handleTab2RadioBtn.bind(this)} onChangePageType={this.handleTab2ChangePageType.bind(this)}/>}
      </div>
    )

    return (
      <div className="archives-wrap">
        <PageHeader title="患者档案" onBack={this.handleHeaderBack.bind(this)}/>
        {userBaseInfo()}
        <Tabs 
          defaultActiveKey="1" 
          onChange={this.handleTabsCallback.bind(this)}
          type="card"
        >
          <TabPane tab="随访管理" key="1"><Followup /></TabPane>
          <TabPane tab="综合视图" key="2">{tab2()}</TabPane>
          <TabPane tab="诊疗记录" key="3"><MedicalRecord /></TabPane>
          <TabPane tab="测量管理" key="4"><Measurement /></TabPane>
          <TabPane tab="基本信息" key="5"><BaseInfo /></TabPane>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(Plan)