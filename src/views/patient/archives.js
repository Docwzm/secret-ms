import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Button,Tabs,Steps} from 'antd'
import PageHeader from '../../components/PageHeader';
import {DataTable,DataChart,Measurement,BaseInfo,MedicalRecord} from './components/index'
import PickForm from '../../components/Crf_form/index.jsx'
import "./styles/archives.css"

const TabPane = Tabs.TabPane;
const Step = Steps.Step;


class Plan extends Component {
  state={
    pageState:true,//页面初始状态（包含列表显示和输入）
    tab2PageType:"chart"
  }

  handleTabsCallback(){

  }

  handleInputPage(){
    this.setState({pageState:false})
  }

  //横向步骤条点击
  handleStepClick(iconDot, info){
    console.log(info)
    //根据每个阶段显示不同的内容
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

  haneleSubmit(values){
    console.log('--->',values)
  }

  render() {
    const {pageState,tab2PageType} = this.state;

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

    //节点内容
    const node = () => (
      <div className="node-wrap">
        <span>19-01-04</span>
        <span>V0</span>
        <span>知情同意书|入组信息|糖化血红蛋白|知情同意书|入组信息|糖化血红蛋白|知情同意书|入组信息|糖化血红蛋白</span>
        <span><Button onClick={this.handleInputPage.bind(this)}>待录入</Button></span>
      </div>
    )

    //随访列表
    const stepPage = () => (
      <Steps direction="vertical" size="small" current={1}>
        <Step title={node()}  />
        <Step title={node()}  />
        <Step title={node()}  />
        <Step title={node()}  />
        <Step title={node()}  />
        <Step title={node()}  />
        <Step title={node()}  />
        <Step title={node()}  />
        <Step title={node()}  />
        <Step title={node()}  />
      </Steps>
    )

    //随访录入
    const inputPage = () => (
      <div className="input-page">
        <Steps 
          progressDot={(icon,info)=>(<span className="dot" onClick={this.handleStepClick.bind(this,icon,info)}></span>)} 
          current={1}
        >
          <Step title="V0" />
          <Step title="V1" />
          <Step title="V2"  />
          <Step title="V3"  />
          <Step title="V4"  />
          <Step title="V5"  />
          <Step title="V6"  />
          <Step title="V7"  />
          <Step title="V8"  />
          <Step title="V9"  />
        </Steps>
        <div className="content-list">
          <div className='list-item'>
            <div className="item">
              <span>入选标准&排除标准</span>
              <span className="item-status finish"></span>
            </div>
          </div>
          <div className='list-item'>
            <div className="item">
              <span>入组信息&人口学资料</span>
              <span className="item-status process"></span>
            </div>
          </div>
        </div>
        <PickForm name="23" onSubmit={this.haneleSubmit.bind(this)}/>
      </div>
    )

    const tab1 = () =>  (
      <div className="tab1">
        <div className="follow-up-info">
          <span className="follow-up-type">随访类型：<i>课题二A组</i></span>
          <span className="follow-up-time">开始时间：<i>V0访视</i></span>
        </div>
        {pageState ? stepPage() : inputPage()}
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
          <TabPane tab="随访管理" key="1">{tab1()}</TabPane>
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