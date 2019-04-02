import React, { Component } from 'react';
import { Tabs, Button, Table } from 'antd';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { planList } from '../../apis/plan';
import moment from 'moment';
import { switchEnum } from '../../utils/enum'
import{setLocal,getLocal,buttonAuth} from '../../utils/index'
import {getButton} from '../../apis/user'

const TabPane = Tabs.TabPane;

class Plan extends Component {
  state = {
    followUpPlanData: [],
    educationMaterialsData: [],
    measurementSchemeData: [],
    currentTabKey: "1",
    tabLoading: false,
    buttonKey:[]
  }

  componentWillMount() {
    let type =  getLocal('planTab') || this.state.currentTabKey
    console.log(type)
    this.actionPlanList({ type:+type})
    this.actionGetButton({pageId:3})
    this.setState({currentTabKey:type.toString()})
  }

  /**
   * 标签切换回调
   */
  handleTabsCallback(key) {
    this.actionPlanList({ type: parseInt(key) })
    this.setState({ currentTabKey: key })
    setLocal('planTab',key)
  }

  /**
   * 查看、编辑方案
   * @param {*} id 
   */
  handlePageEdit(id) {
    const currentTabKey = getLocal('planTab') ||  this.state.currentTabKey
    if (parseInt(currentTabKey) === 1) {
      this.props.history.push(`/plan/followup?id=${id}`)
    } else if (parseInt(currentTabKey) === 3) {
      this.props.history.push(`/plan/measurement?id=${id}`)
    }
  }

  handleAddPlan() {
    const currentTabKey = getLocal('planTab') ||  this.state.currentTabKey
    if (parseInt(currentTabKey) === 1) {
      this.props.history.push('/plan/followup')
    } else if (parseInt(currentTabKey) === 3) {
      this.props.history.push('/plan/measurement')
    }
  }

  /**
   * 方案列表
   * @param {*} data 
   */
  async actionPlanList(data) {
    this.setState({ tabLoading: true })
    let list = await planList({ ...data, category: 2 })
    this.setState({ tabLoading: false })
    switch (data.type) {
      case 1:
        this.setState({ followUpPlanData: list.data });
        break;
      case 2:
        this.setState({ educationMaterialsData: list.data });
        break;
      case 3:
        this.setState({ measurementSchemeData: list.data })
        break
      default:
        return
    }
  }

  //页面按钮权限
  async actionGetButton(data){
    let buttons = await getButton(data)
    let buttonList = buttons.data.buttons
    let buttonKey = buttonList.map(item => item.buttonKey)
    this.setState({buttonKey})
  }

  render() {
    const { followUpPlanData, educationMaterialsData, measurementSchemeData, tabLoading ,buttonKey} = this.state;
    let currentTabKey =  getLocal('planTab') || this.state.currentTabKey
    
    const followUpPlanColumns = [{
      title: '序号',
      render:(row,record,index)=>index+1
    }, {
      title: '方案名称',
      dataIndex: 'name',
    }, {
      title: '开始时间',
      render: row => {
        return `${switchEnum(row.timeCategory, 'timeCategory')}`
      }
    }, {
      title: '创建时间',
      render: row => (moment(row.created).format('YYYY-MM-DD HH:mm'))
    }, {
      title: '操作',
      render: row => (<span className="edit-btn" onClick={this.handlePageEdit.bind(this, row.id)}>查看</span>)
    }]

    const educationMaterialsColumns = [{
      title: "序号",
      render:(row,record,index)=>index+1
    }, {
      title: "方案名称",
      dataIndex: "name"
    }, {
      title: "创建时间",
      dataIndex: "createdTime",
    }, {
      title: "操作",
      render: row => (<span className="edit-btn" onClick={this.handlePageEdit.bind(this, row.id)}>查看</span>)
    }]

    const measurementSchemeColumns = [{
      title: '序号',
      render:(row,record,index)=>index+1
    }, {
      title: '方案名称',
      dataIndex: 'name',
    }, {
      title: '执行周期',
      render:row=>switchEnum(row.periodicTime,'periodicTime')
    }, {
      title: '创建时间',
      render: row => (moment(row.created).format('YYYY-MM-DD HH:mm'))
    }, {
      title: '操作',
      render: row => (<span className="edit-btn" onClick={this.handlePageEdit.bind(this, row.id)}>查看</span>)
    }]

    const Tab1 = () => (
      <Table
        columns={followUpPlanColumns}
        dataSource={followUpPlanData}
        rowKey={record => record.id}
        loading={tabLoading}
        bordered
        footer={buttonAuth(buttonKey,'follow_manange',()=><Button type="primary" onClick={this.handleAddPlan.bind(this)}>添加</Button>)}
      />
    )

    const Tab2 = () => (
      <Table
        columns={educationMaterialsColumns}
        dataSource={educationMaterialsData}
        rowKey={record => record.id}
        bordered
      />
    )

    const Tab3 = () => (
      <Table
        columns={measurementSchemeColumns}
        dataSource={measurementSchemeData}
        rowKey={record => record.id}
        bordered
        loading={tabLoading}
        footer={buttonAuth(buttonKey,'measure_manange',()=><Button type="primary" onClick={this.handleAddPlan.bind(this)}>添加</Button>)}
      />
    )

    return (
      <div className="plan">
        <PageHeader title='方案管理' />
        <Tabs
          activeKey={currentTabKey}
          onChange={this.handleTabsCallback.bind(this)}
          animated={false}
          type="card"
        >
          {buttonAuth(buttonKey,'follow_manange',<TabPane tab="随访方案" key="1">{Tab1()}</TabPane>)}
          {/* <TabPane tab="宣教资料" key="2">{Tab2()}</TabPane> */}
          {buttonAuth(buttonKey,'measure_manange',<TabPane tab="测量方案" key="3">{Tab3()}</TabPane>)}
        </Tabs>
      </div>
    );
  }
}

export default withRouter(Plan)