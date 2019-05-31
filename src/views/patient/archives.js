import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Button,Tabs,Icon} from 'antd'
import PageHeader from '../../components/PageHeader';
import { DataTable, DataChart, Measurement, BaseInfo, MedicalRecord, Followup, DrugRecord, CrfReport } from './components/index'
import { findPatient } from '../../apis/relation';
import { getQueryString, setLocal, getLocal, buttonAuth } from '../../utils/index';
import { getButton } from '../../apis/user'
import moment from 'moment'

import "./styles/archives.css"

const TabPane = Tabs.TabPane;


class Plan extends Component {
  state = {
    tab2PageType: "chart",
    patientId: 0,
    patientInfo: {},
    currentType: "1",
    buttonKey: []
  }

  componentWillMount() {
    let patientId = this.props.patientId || parseInt(getQueryString('id', this.props.location.search)) || this.props.patientId
    let relationId = parseInt(getQueryString('relationId', this.props.location.search))
    let doctorId = parseInt(getQueryString('doctorId', this.props.location.search))
    //点击“警”默认进去综合视图
    let archivesTab = getQueryString('tab', this.props.location.search) || getLocal('archivesTab') || "1"
    if (patientId) {
      this.setState({ patientId, currentType: archivesTab, relationId, doctorId })
      this.actionFindPatient({ relationId })
    }
    this.actionGetButton({ pageId: 2 })
  }

  //切换显示项目
  handleTabsCallback(value) {
    setLocal('archivesTab', value.toString())
    this.setState({
      currentType:value
    })
  }

  handleTab2ChangePageType(type) {
    this.setState({ tab2PageType: type })
  }

  handleHeaderBack() {
    this.props.history.goBack()
  }

  //基本信息更新成功
  handleUpdateSuccess() {
    let { patientId, relationId } = this.state
    this.actionFindPatient({ relationId })
  }

  //跳转到聊天
  handleJumpToChat() {
    let { patientId } = this.state
    this.props.history.push('/chat?id=' + patientId)
  }

  /**
   * 患者信息
   * @param {*} data 
   */
  async actionFindPatient(data) {
    let patient = await findPatient(data)
    this.setState({ patientInfo: patient.data || {} })
  }

  //页面按钮权限
  async actionGetButton() {
    let buttons = await getButton({ pageId: 2 })
    let buttonList = buttons.data.buttons
    let buttonKey = buttonList.map(item => item.buttonKey)
    this.setState({ buttonKey })
  }

  render() {
    const {tab2PageType,patientId,patientInfo,currentType,buttonKey,doctorId} = this.state;
    const userBaseInfo = () =>{
      return(
        <div className="base-info">
          <Icon
              style={{ fontSize: "14px", verticalAlign: "middle", marginRight: "10px", paddingRight: "10px", borderRight: "1px solid #ccc", cursor: "point" }}
              type="arrow-left"
              onClick={this.handleHeaderBack.bind(this)}
          />
          <i className="avatar">
            <img src={patientInfo.headUrl || ''} alt=''/>
          </i>
          <div className="info-right">
            <div className='top'>
              <i className="name">{patientInfo.realName}</i>
              {patientInfo.sex?<i className='gender'>{patientInfo.sex}</i>:null}
              {patientInfo.age?<i>{patientInfo.age}岁</i>:null}
              <i>{patientInfo.groupName || ''}（{patientInfo.subGroupName || ''}）</i>
            </div>
            <div className="bottom">
              {patientInfo.patientNo?<i>患者编号：{patientInfo.patientNo}</i>:null}
              <i>手机号：{patientInfo.mobile}</i>
              <i>入组时间：{moment(patientInfo.enterGroupTime).format('YYYY-MM-DD')}</i>
              {buttonAuth(buttonKey,'sendMsg',<Button type="primary" onClick={this.handleJumpToChat.bind(this)}>发消息</Button>)}
            </div>
          </div>
        </div>
      )
    }

    const tab2 = () => (
      <div className='tab2'>
        <div className='tab2-header'>
          {tab2PageType === 'chart' ? (
            <Button type="primary" onClick={this.handleTab2ChangePageType.bind(this, 'table')}>测量数据表</Button>
          ) : (
              <Button type="primary" onClick={this.handleTab2ChangePageType.bind(this, 'chart')}>趋势图</Button>
            )}
        </div>
        {tab2PageType === 'chart' ? <DataChart patientId={patientId} /> : <DataTable patientId={patientId} />}
      </div>
    )
    return (
      <div className="archives-wrap">
        {/* <PageHeader title="患者档案" onBack={this.handleHeaderBack.bind(this)}/> */}
        {userBaseInfo()}
        <Tabs
          defaultActiveKey={currentType}
          onChange={this.handleTabsCallback.bind(this)}
          type="card"
        >
          {buttonAuth(buttonKey,'getPatientFollow',<TabPane tab="随访管理" key="1"><Followup patientId={patientId} doctorId={doctorId}/></TabPane>)}
          {buttonAuth(buttonKey,'getPatientDeviceData',<TabPane tab="综合视图" key="2">{tab2()}</TabPane>)}
          {buttonAuth(buttonKey,'findTreatmentRecord',<TabPane tab="诊疗记录" key="3"><MedicalRecord patientId={patientId}/></TabPane>)}
          {buttonAuth(buttonKey,'getPatientMeasure',<TabPane tab="测量管理" key="4"><Measurement patientId={patientId} doctorId={doctorId}/></TabPane>)}
          {buttonAuth(buttonKey,'getDoctorPatient',<TabPane tab="基本信息" key="5"><BaseInfo patientInfo={patientInfo} onUpdateSuccess={this.handleUpdateSuccess.bind(this)}/></TabPane>)}
          {buttonAuth(buttonKey,'crf_use_medication',<TabPane tab="用药记录" key="6">
            {
              currentType==6?<DrugRecord patientId={patientId}/>:null
            }
          </TabPane>)}
          {buttonAuth(buttonKey,'crf_special_event',<TabPane tab="特殊事件" key="7">
          {
            currentType==7?<CrfReport patientInfo={patientInfo} patientId={patientId}/>:null
          }</TabPane>)}
        </Tabs>
      </div>
    );
  }
}

export default withRouter(Plan)