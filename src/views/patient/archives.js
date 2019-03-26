import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Button,Tabs} from 'antd'
import PageHeader from '../../components/PageHeader';
import {DataTable,DataChart,Measurement,BaseInfo,MedicalRecord,Followup} from './components/index'
import { findPatient} from '../../apis/relation';
import {getQueryString} from '../../utils/index';
import moment from 'moment'

import "./styles/archives.css"

const TabPane = Tabs.TabPane;


class Plan extends Component {
  state={
    tab2PageType:"chart",
    patientId:0,
    patientInfo:{}
  }

  componentWillMount(){
    let patientId = parseInt(getQueryString('id',this.props.location.search)) || this.props.patientId
    if(patientId){
      this.setState({patientId})
      this.actionFindPatient({patientId})
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

  //基本信息更新成功
  handleUpdateSuccess(){
    let {patientId} = this.state
    this.actionFindPatient({patientId})
  }

  //跳转到聊天
  handleJumpToChat(){
    let {patientId} = this.state
    this.props.history.push('/chat?id='+patientId)
  }

  /**
   * 患者信息
   * @param {*} data 
   */
  async actionFindPatient(data){
    let patient = await findPatient(data)
    this.setState({patientInfo:patient.data || {}})
  }

 

  render() {
    const {tab2PageType,patientId,patientInfo} = this.state;
    
    const userBaseInfo = () =>(
      <div className="base-info">
        <i className="avatar">
          <img src={patientInfo.headUrl || 'http://c.hiphotos.baidu.com/image/pic/item/a5c27d1ed21b0ef4b9e8896ad3c451da81cb3e85.jpg'} alt='头像'/>
        </i>
        <i className="name">{patientInfo.realName}</i>
        <i className='gender'>男</i>
        <i>{patientInfo.age}岁</i>
        <i>{patientInfo.mobile}</i>
        <i>{patientInfo.groupName || ''}</i>
        <i>{patientInfo.subGroupName || ''}</i>
        <i>编号：{patientInfo.patientNo}</i>
        <i>入组时间：{moment(patientInfo.enterGroupTime).format('YYYY-MM-DD')}</i>
        <Button type="primary" onClick={this.handleJumpToChat.bind(this)}>发消息</Button>
      </div>
    )

    const tab2 = () => (
      <div className='tab2'>
        <div className='tab2-header'>
            {tab2PageType === 'chart'?(
              <Button type="primary" onClick={this.handleTab2ChangePageType.bind(this,'table')}>测量数据表</Button>
            ):(
              <Button type="primary" onClick={this.handleTab2ChangePageType.bind(this,'chart')}>趋势图</Button>
            )}
        </div>
        {tab2PageType === 'chart' ? <DataChart patientId={patientId}/> : <DataTable patientId={patientId} />}
      </div>
    )

    return (
      <div className="archives-wrap">
        <PageHeader title="患者档案" onBack={this.handleHeaderBack.bind(this)}/>
        {userBaseInfo()}
        <Tabs 
          defaultActiveKey="1" 
          //onChange={this.handleTabsCallback.bind(this)}
          type="card"
        >
          <TabPane tab="随访管理" key="1"><Followup patientId={patientId}/></TabPane>
          <TabPane tab="综合视图" key="2">{tab2()}</TabPane>
          <TabPane tab="诊疗记录" key="3"><MedicalRecord patientId={patientId}/></TabPane>
          <TabPane tab="测量管理" key="4"><Measurement patientId={patientId}/></TabPane>
          <TabPane tab="基本信息" key="5"><BaseInfo patientInfo={patientInfo} onUpdateSuccess={this.handleUpdateSuccess.bind(this)}/></TabPane>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(Plan)