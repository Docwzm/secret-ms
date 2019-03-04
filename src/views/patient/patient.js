import React, { Component } from 'react';
import {Icon,Input,Modal, Button,Table} from 'antd'
import './styles/patient.css'
import { withRouter } from 'react-router-dom';

const Search = Input.Search;

class Patient extends Component {

  state = {
    group:[{
      key:0,
      name:"课题一"
    },{
      key:1,
      name:"课题二"
    },{
      key:2,
      name:"课题三"
    },{
      key:3,
      name:"全部"
    }],
    currentGroup:0,
    actionGroup:[{
      key:0,
      name:"随访"
    },{
      key:1,
      name:"报警"
    },{
      key:2,
      name:"新入组"
    },{
      key:3,
      name:"全部"
    }],
    currentAction:0,
    groupEditVisible:false,
    groupDate:[{
      key: '1',
      id: 1,
      name: "糖料病",
      count: 12,
    }],
    waitToAddData:[{
      id:"1",
      name:"李时珍",
      mobile:"138000000000",
      remark:"你好，我是李时珍"
    }],
    waitToAddVisible:false
  }

  /**
   * 切换分组
   */
  handleChangeGroup(key){
    this.setState({currentGroup:key})
  }

  /**
   * 切换事件
   */
  handleChangeAction(key){
    this.setState({currentAction:key})
  }

  handleGroupEditVisible(){
    this.setState({groupEditVisible:true})
  }

  handleGroupEditHide(){
    this.setState({groupEditVisible:false})
  }

  handleWaitToAddVisible(){
    this.setState({waitToAddVisible:true})
  }

  handleWaitToAddHide(){
    this.setState({waitToAddVisible:false})
  }

  /**
   * 跳转到患者档案
   */
  handleGoToArchives(id){
    this.props.history.push('/patient/archives',{id})
  }

  render() {
    const {group,currentGroup,actionGroup,currentAction,groupEditVisible,groupDate,waitToAddData,waitToAddVisible} = this.state;
    const groupItem = group.map((item,index)=>{
      return(
        <span 
          className={currentGroup === item.key ? "group-item current-group":"group-item"} 
          key={index}
          onClick={this.handleChangeGroup.bind(this,item.key)}
        >{item.name}</span>
      )
    })

    const actionItem = actionGroup.map((item,index)=>{
      return(
        <span 
          className={currentAction === item.key ? "action-item current-action":"action-item"} 
          key={index}
          onClick={this.handleChangeAction.bind(this,item.key)}
        >{item.name}</span>
      )
    })

    const editGroupColumns = [{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width:80
    }, {
      title: '分组名称',
      key: 'name',
      render:row => <Input value={row.name} disabled/>
    }, {
      title: '组内人数',
      dataIndex: 'count',
      key: 'count',
    }, {
      title: '操作',
      render: tags => (
        <span>
          <span className="edit-btn">编辑</span>
          <span className='delete-btn'>删除</span>
        </span>
      ),
    }];

    const waitToAddColumns = [{
      title:"序号",
      dataIndex:"id",
      key:"id",
    },{
      title:"姓名",
      dataIndex:"name",
      key:"name"
    },{
      title:"联系方式",
      dataIndex:"mobile",
      key:"mobile"
    },{
      title:"备注",
      dataIndex:"remark",
      key:"remark"
    },{
      title:"操作",
      render:row=>(
        <span>
          <span className="edit-btn">通过</span>
          <span className='delete-btn'>拒绝</span>
        </span>
      )
    }]

    return (
      <div className="patient-content">
        <div className="patient-group-wrap">
          <div className='patient-group-left'>
            {groupItem}
          </div>
          <div className='patient-group-right'>
            <span className="edit-group-icon" onClick={this.handleWaitToAddVisible.bind(this)}>待添加</span>
            <span className="edit-group-icon" onClick={this.handleGroupEditVisible.bind(this)}><Icon type="form" />&nbsp;编辑分组</span>
            <Search
              placeholder="搜索"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </div>
        </div>
        <div className="action-wrap">
          {actionItem}
        </div>

        <div className="patient-list-wrap">
          <div className='patient' onClick={this.handleGoToArchives.bind(this,10)}>
            <div className='patient-top'>
              <div className="name">小王啊</div>
              <Icon type="man" />
              <span>69岁</span>
            </div> 
            <div className='patient-bottom'>
              <span title="随访">随</span>
              <span title="报警">警</span>
              <span title="新入组">新</span>
              <Icon type="message" />
            </div>
          </div>
          <div className='patient' onClick={this.handleGoToArchives.bind(this,11)}>
            <div className='patient-top'>
              <div className="name">小李啊</div>
              <Icon type="woman" />
              <span>39岁</span>
            </div> 
            <div className='patient-bottom'>
              <span title="随访">随</span>
              <span title="报警">警</span>
              <span title="新入组">新</span>
              <Icon type="message" />
            </div>
          </div>
        </div>
        
        {/** 编辑分组*/}
        <Modal
          visible={groupEditVisible}
          title="编辑分组"
          onCancel={this.handleGroupEditHide.bind(this)}
          footer={null}
          width={700}
        >
          <Table 
            columns={editGroupColumns} 
            dataSource={groupDate} 
            pagination={false}
          />
          <div className="add-group-icon">
            <Button icon="plus" type="primary">新增分组</Button>
          </div>
        </Modal>

        {/** 待添加列表 */}
        <Modal
          visible={waitToAddVisible}
          title="待添加列表"
          onCancel={this.handleWaitToAddHide.bind(this)}
          footer={null}
          width={700}
        >
          <Table 
            columns={waitToAddColumns} 
            dataSource={waitToAddData} 
            pagination={false}
          />
        </Modal>



      </div>
    );
  }
}

export default withRouter(Patient)