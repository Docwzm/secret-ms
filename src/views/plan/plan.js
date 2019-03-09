import React, { Component } from 'react';
import { Tabs ,Button,Table} from 'antd';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

const TabPane = Tabs.TabPane;

class Plan extends Component {
  state = {
    followUpPlanData:[{
      id:"1",
      key: '1',
      name: '方案名称',
      cycle:"执行周期",
      createdTime:"创建时间"
    }],
    educationMaterialsData:[{
      id:"1",
      key:"1",
      name:"宣教资料名称",
      createdTime:"2019-03-03"
    }],
    measurementSchemeData:[{
      id:"1",
      key: '1',
      name: '方案名称',
      cycle:"执行周期",
      createdTime:"创建时间"
    }],
    currentTabKey:"1"
  }

  /**
   * 标签切换回调
   */
  handleTabsCallback(key){
    this.setState({currentTabKey:key})
  }

  /**
   * 查看、编辑方案
   * @param {*} id 
   */
  handlePageEdit(id){
    const {currentTabKey} = this.state
    this.props.history.push('/plan/edit',{id,currentTabKey})
  }

  handleAddPlan(){
    const {currentTabKey} = this.state
    if(currentTabKey === '1'){
      this.props.history.push('/plan/followup-edit',{currentTabKey})
    }else if(currentTabKey === '3'){
      this.props.history.push('/plan/measurement-edit',{currentTabKey})
    }
  }

  render() {
    const {followUpPlanData,educationMaterialsData,measurementSchemeData} = this.state;
    const followUpPlanColumns=[{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '方案名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '执行周期',
      dataIndex: 'cycle',
      key: 'cycle',
    },{
      title: '创建时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
    },{
      title: '操作',
      render:row=>(<span className="edit-btn" onClick={this.handlePageEdit.bind(this,row.id)}>查看</span>)
    }]

    const educationMaterialsColumns=[{
      title:"序号",
      dataIndex:"id",
      key:"id"
    },{
      title:"方案名称",
      dataIndex:"name",
      key:"name"
    },{
      title:"创建时间",
      dataIndex:"createdTime",
      key:"createdTime"
    },{
      title:"操作",
      render:row=>(<span className="edit-btn" onClick={this.handlePageEdit.bind(this,row.id)}>查看</span>)
    }]

    const measurementSchemeColumns=[{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '方案名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '执行周期',
      dataIndex: 'cycle',
      key: 'cycle',
    },{
      title: '创建时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
    },{
      title: '操作',
      render:row=>(<span className="edit-btn" onClick={this.handlePageEdit.bind(this,row.id)}>查看</span>)
    }]

    const  Tab1 = () => (
      <Table 
        columns={followUpPlanColumns} 
        dataSource={followUpPlanData}
      />
    )

    const  Tab2 = () => (
      <Table 
        columns={educationMaterialsColumns} 
        dataSource={educationMaterialsData}
      />
    )

    const  Tab3 = () => (
      <Table 
        columns={measurementSchemeColumns} 
        dataSource={measurementSchemeData}
      />
    )

    return (
      <div className="plan">
        <PageHeader title='方案管理'/>
        <Tabs 
          defaultActiveKey="1" 
          onChange={this.handleTabsCallback.bind(this)}
          //tabBarExtraContent={<Button type="primary">添加</Button>}
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