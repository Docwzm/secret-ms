import React, { Component } from 'react';
import {Icon,Input,Modal, Button,Table,Select,Tabs, message} from 'antd'
import './styles/patient.css'
import { withRouter } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { createGroup,findGroup,updateGroup,deleteGroup} from '../../apis/relation';
import {findPatientList} from '../../apis/patient'

const Option = Select.Option;
const TabPane = Tabs.TabPane;

class Patient extends Component {

  state = {
    group:[{
      groupId:0,
      groupName:"全部"
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
    groupData:[],
    waitToAddData:[{
      id:"1",
      name:"李时珍",
      mobile:"138000000000",
      remark:"你好，我是李时珍"
    }],
    waitToAddVisible:false,
    showAddBtn:true
  }

  componentWillMount(){
    this.actionGetGroup()
    this.actionGetPatientList({groupId:1,subGroupKey:1})
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

  //tab切换
  handleTabsCallback(key){
    this.setState({currentGroup:key})
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

  //跳转到患者档案
  handleGoToArchives(id){
    this.props.history.push('/patient/archives',{id})
  }

  handleSearch(value){
    //console.log(value)
  }

  //新增分组
  handleAddGroup(){
    //分组要小于六个
    let {groupData} = this.state;
    let groupLen = groupData.length;
    let lastGroupId = parseInt(groupData[groupLen-1].groupId) + 1
    if(groupLen < 6){
      let groupItem = {groupName:"",editable:true,groupId:lastGroupId}
      groupData.push(groupItem)
      this.setState({groupData})
    }
  }

  //输入框
  handleInput(groupId,e){
    let {groupData} = this.state
    for(let i in groupData){
      if(groupData[i].groupId === groupId){
        groupData[i].groupName = e.target.value
      }
    }
    this.setState({groupData})
  }

  //添加分组
  handleAddGroupItem(groupId){
    const {groupName,groupData} = this.state;
    let editState = false;
    let currentGroup = {}
    for(let i in groupData){
      if(groupData[i].flag === 'edit'){
        editState = true
      }
      currentGroup = groupData[i]
    }
    if(currentGroup.groupName){
      if(editState){
        this.actionUpdateGroup(currentGroup)
        return
      }
      this.actionCreateGroup({groupName:currentGroup.groupName})
    }
    
  }

  //页面可编辑
  handleEditable(groupId){
    let {groupData} = this.state
    for(let i in groupData){
      if(groupData[i].groupId === groupId){
        groupData[i].editable = true;
        groupData[i].flag = "edit"
      }
    }
    this.setState({groupData})
  }

  //删除分组
  handleDeleteGroup(groupId){
    this.actionDeleteGroup({groupId})
  }

  /**
   * 创建分组
   * @param {*} data 
   */
  async actionCreateGroup(data){
    let group = await createGroup(data)
    if(group && group.code === 200){
      this.actionGetGroup()
      message.success('添加分组成功')
    }
  }

  /**
   * 获取分组
   */
  async actionGetGroup(){
    let allGroup = this.state.group
    let group = await findGroup()
    let showAddBtn = true
    //全部不可编辑状态
    let list = group.data.groups || []
    for(let i in list){
      list[i].editable = false
    }
    let groupDataLen = list.length 
    if(groupDataLen >= 6){
      showAddBtn = false
    }
    this.setState({
      groupData:list,
      showAddBtn,
      group:list.concat(allGroup),
      currentGroup:list.concat(allGroup)[0].groupId
    })
  }

  /**
   * 修改分组
   * @param {*} data 
   */
  async actionUpdateGroup(data){
    let group  =await updateGroup(data)
    if(group && group.code === 200){
      this.actionGetGroup()
      message.success('更新分组成功')
    }
  }

  async actionDeleteGroup(data){
    let group = await deleteGroup(data)
    if(group && group.code === 200){
      this.actionGetGroup()
      message.success('删除分组成功')
    }
  }

  /**
   * 或者列表
   */
  async actionGetPatientList(){
    let list = await findPatientList()
    console.log(list)
  }

  render() {
    const {group,currentGroup,actionGroup,currentAction,groupEditVisible,groupData,showAddBtn} = this.state;
    const actionItem = actionGroup.map((item,index)=>{
      return(
        <span 
          className={currentAction === item.key ? "action-item current-action":"action-item"} 
          key={index}
          onClick={this.handleChangeAction.bind(this,item.key)}
        >
          {item.name}
        </span>
      )
    })
    const groupItem = group.map((item)=><TabPane tab={item.groupName} key={item.groupId.toString()} >{actionItem}</TabPane>)

    const editGroupColumns = [{
      title: '序号',
      dataIndex: 'groupId',
      key: 'groupId',
      width:80,
      align:'center'
    }, {
      title: '分组名称',
      key: 'groupName',
      render:row => {
        return(
          <Input 
            defaultValue={row.groupName} 
            onChange={this.handleInput.bind(this,row.groupId)} 
            disabled={!row.editable}
          />
        )
      }
    }, {
      title: '组内人数',
      dataIndex: 'groupPatientQty',
      key: 'groupPatientQty',
      align:'center'
    }, {
      title: '操作',
      align:'center',
      render: row => {
        if(row.editable){
          if(row.deleteFlag){
            return(
              <span>
                <span className="edit-btn" onClick={this.handleAddGroupItem.bind(this,row.groupId)}>保存</span>
                <span className="delete-btn" onClick={this.handleDeleteGroup.bind(this,row.groupId)}>删除</span>
              </span>
            )
          }
          return(<span className="edit-btn" onClick={this.handleAddGroupItem.bind(this,row.groupId)}>保存</span>)
        }else{
          if(row.deleteFlag){
            return(
              <span>
                <span className="edit-btn" onClick={this.handleEditable.bind(this,row.groupId)}>编辑</span>
                <span className="delete-btn" onClick={this.handleDeleteGroup.bind(this,row.groupId)}>删除</span>
              </span>
            )
          }
          return(<span className="edit-btn" onClick={this.handleEditable.bind(this,row.groupId)}>编辑</span>)
        }
      }
    }];

    const waitToAddColumns = [{
      title:"序号",
      dataIndex:"num",
      key:"num",
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

    const options = [].map(d => <Option key={d.value}>{d.text}</Option>);
    const tabBarExtra = () => (
      <div className='patient-group-right'>
        <span 
          className="edit-group-icon" 
          onClick={this.handleGroupEditVisible.bind(this)}
        >
          <Icon type="form" />&nbsp;编辑分组
        </span>
        <Select
          style={{ width: 200 }}
          showSearch
          value={this.state.value}
          placeholder="搜索"
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={this.handleSearch.bind(this)}
          onChange={this.handleChange}
        >
          {options}
        </Select>
      </div>
    )
    return (
      <div className="patient-content">
        <PageHeader title="患者管理"/>
        <Tabs 
          type="card"
          activeKey={currentGroup.toString()} 
          tabBarExtraContent={tabBarExtra()}
          onChange={this.handleTabsCallback.bind(this)}
        >
          {groupItem}
        </Tabs>
        <div className="patient-list-wrap">
          <div className='patient' onClick={this.handleGoToArchives.bind(this,10)}>
            <div className='patient-top'>
              <div className="name">小王啊</div>
              <Icon type="man" />
              <span>69岁</span>
            </div> 
            <div className='patient-bottom'>
              <span title="报警">警</span>
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
              <span title="报警">警</span>
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
            dataSource={groupData} 
            pagination={false}
            rowKey={record => record.groupId}
          />
          <div className="add-group-icon">
            {showAddBtn?(<Button icon="plus" type="primary" onClick={this.handleAddGroup.bind(this)}>新增分组</Button>):null}
          </div>
        </Modal>

        {/** 待添加列表 */}
        {/* <Modal
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
            rowKey={record => record.id}
          />
        </Modal> */}

      </div>
    );
  }
}

export default withRouter(Patient)