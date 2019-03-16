import React, { Component } from 'react';
import { Tabs, Button, Table } from 'antd';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { planList } from '../../apis/plan';
import dayjs from 'dayjs';
import { switchEnum } from '../../utils/enum'

const TabPane = Tabs.TabPane;

class Plan extends Component {
  state = {
    followUpPlanData: [],
    educationMaterialsData: [],
    measurementSchemeData: [],
    currentTabKey: "1",
    tabLoading: false
  }

  componentWillMount() {
    this.actionPlanList({ type: 1 })
  }

  /**
   * 标签切换回调
   */
  handleTabsCallback(key) {
    this.actionPlanList({ type: parseInt(key) })
    this.setState({ currentTabKey: parseInt(key) })
  }

  /**
   * 查看、编辑方案
   * @param {*} id 
   */
  handlePageEdit(id) {
    const { currentTabKey } = this.state
    if (parseInt(currentTabKey) === 1) {
      this.props.history.push(`/plan/followup?id=${id}`)
    } else if (parseInt(currentTabKey) === 3) {

      this.props.history.push(`/plan/measurement?id=${id}`)
    }
  }

  handleAddPlan() {
    const { currentTabKey } = this.state
    if (parseInt(currentTabKey) === 1) {
      this.props.history.push('/plan/followup', { currentTabKey })
    } else if (parseInt(currentTabKey) === 3) {
      this.props.history.push('/plan/measurement', { currentTabKey })
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

  render() {
    const { followUpPlanData, educationMaterialsData, measurementSchemeData, tabLoading } = this.state;
    const followUpPlanColumns = [{
      title: '序号',
      dataIndex: 'id'
    }, {
      title: '方案名称',
      dataIndex: 'name',
    }, {
      title: '执行周期',
      render: row => {
        return `${switchEnum(1, 'timeCategory')}后1${switchEnum(2, 'timeType')}`
      }
    }, {
      title: '创建时间',
      render: row => (dayjs(row.created).format('YYYY-MM-DD HH:mm'))
    }, {
      title: '操作',
      render: row => (<span className="edit-btn" onClick={this.handlePageEdit.bind(this, row.id)}>查看</span>)
    }]

    const educationMaterialsColumns = [{
      title: "序号",
      dataIndex: "id",
      key: "id"
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
      dataIndex: 'id'
    }, {
      title: '方案名称',
      dataIndex: 'name',
    }, {
      title: '执行周期',
      dataIndex: 'cycle',
    }, {
      title: '创建时间',
      render: row => (dayjs(row.created).format('YYYY-MM-DD HH:mm'))
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
      />
    )

    return (
      <div className="plan">
        <PageHeader title='方案管理' />
        <Tabs
          defaultActiveKey="1"
          onChange={this.handleTabsCallback.bind(this)}
          animated={false}
          type="card"
        >
          <TabPane tab="随访方案" key="1">{Tab1()}</TabPane>
          {/* <TabPane tab="宣教资料" key="2">{Tab2()}</TabPane> */}
          <TabPane tab="测量方案" key="3">{Tab3()}</TabPane>
        </Tabs>
        <Button type="primary" onClick={this.handleAddPlan.bind(this)}>添加</Button>
      </div>
    );
  }
}

export default withRouter(Plan)