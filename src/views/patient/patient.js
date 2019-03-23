import React, { Component } from 'react';
import { Icon, Input, Modal, Button, Table, Select, Tabs, message, Empty } from 'antd'
import './styles/patient.css'
import { withRouter } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { createGroup, findGroup, findGroupSelf, updateGroup, deleteGroup, findPatientList } from '../../apis/relation';
import { throttle } from '../../utils/index'

const Option = Select.Option;
const TabPane = Tabs.TabPane;

class Patient extends Component {

  state = {
    group: [{
      id: 0,
      value: "全部",
      topicId: 0
    }],
    currentGroup: "0-0",
    actionGroup: [{
      key: 'followUp',
      name: "随访"
    }, {
      key: 'warning',
      name: "报警"
    }, {
      key: 'newGroup',
      name: "新入组"
    }, {
      key: 'all',
      name: "全部"
    }],
    currentAction: 'followUp',
    groupEditVisible: false,
    waitToAddData: [{
      id: "1",
      name: "李时珍",
      mobile: "138000000000",
      remark: "你好，我是李时珍"
    }],
    waitToAddVisible: false,
    showAddBtn: true,
    patientList: [],
    searchList: [],
    groupData: []
  }

  componentWillMount() {
    this.actionGetGroup()
    this.actionFindGroupSelf()
  }

  /**
   * 切换分组
   */
  handleChangeGroup(key) {
    this.setState({ currentGroup: key })
  }

  /**
   * 切换事件
   */
  handleChangeAction(key) {
    let { currentGroup } = this.state;
    let groupId = +currentGroup.split('-')[0]
    let topicId = +currentGroup.split('-')[1]
    this.actionGetPatientList({ groupId, topicId, warningType: key })
    this.setState({ currentAction: key })
  }

  //tab切换
  handleTabsCallback(key) {
    let groupId = parseInt(key.split('-')[0]);
    let topicId = parseInt(key.split('-')[1])
    let warningType = this.state.currentAction
    this.actionGetPatientList({ groupId, topicId, warningType })
    this.setState({ currentGroup: key })
  }

  handleGroupEditVisible() {
    this.actionFindGroupSelf()
    this.setState({ groupEditVisible: true })
  }

  handleGroupEditHide() {
    this.actionFindGroupSelf()
    this.setState({ groupEditVisible: false })
  }

  handleWaitToAddVisible() {
    this.setState({ waitToAddVisible: true })
  }

  handleWaitToAddHide() {
    this.setState({ waitToAddVisible: false })
  }

  //跳转到患者档案
  handleGoToArchives(id) {
    this.props.history.push('/patient/archives?id=' + id)
  }

  //搜索
  handleSearch(value) {
    let keywords = value
    this.actionSerchPatient({ keywords })
  }

  //新增分组
  handleAddGroup() {
    //分组要小于六个
    let { groupData } = this.state;
    let groupLen = groupData.length;
    let lastGroupId = 1
    if (groupLen > 0) {
      lastGroupId = groupData[groupLen - 1].groupId + 1
    }
    if (groupLen < 6) {
      let groupItem = { groupName: "", editable: true, groupId: lastGroupId, newAdd: true }
      groupData.push(groupItem)
      this.setState({ groupData, showAddBtn: false })
    }
  }

  //输入框
  handleInput(groupId, e) {
    let groupName = e.target.value
    this.setState({ editGroupName: groupName, editGroupId: groupId || null })
  }

  //添加分组
  handleAddGroupItem(groupId) {
    const { editGroupName, editGroupId, groupData } = this.state;
    if(editGroupName.trim().length > 20){
      message.error('分组名称过长')
      return
    }
    if (editGroupName.trim()) {
      for (let i in groupData) {
        if (groupData[i].groupId === editGroupId) {
          if (groupData[i].newAdd) {
            this.actionCreateGroup({ groupName: editGroupName })
          } else {
            this.actionUpdateGroup({ groupName: editGroupName, groupId: editGroupId })
          }
        }
      }
      this.setState({ groupData, showAddBtn: true })
    } else {
      message.error('请输入分组名')
    }
  }

  //页面可编辑
  handleEditable(groupId) {
    let { groupData } = this.state
    let editGroupName = ''
    let editGroupId = ''
    for (let i in groupData) {
      if (groupData[i].groupId === groupId) {
        groupData[i].editable = true;
        editGroupName = groupData[i].groupName
        editGroupId = groupData[i].groupId
      }
    }
    this.setState({ groupData, showAddBtn: false, editGroupName, editGroupId })
  }

  //删除分组
  handleDeleteGroup(groupId) {
    this.actionDeleteGroup({ groupId })
  }

  //选中搜索项
  handleSearchChange(value) {
    this.props.history.push('/patient/archives?id=' + value)
  }

  /**
   * 创建分组
   * @param {*} data 
   */
  async actionCreateGroup(data) {
    let group = await createGroup(data)
    if (group && group.code === 200) {
      this.actionGetGroup()
      message.success('添加分组成功')
      this.actionFindGroupSelf()
    }
  }

  /**
   * 获取分组
   */
  async actionGetGroup() {
    let allGroup = [{
      id: 0,
      value: "全部",
      topicId: 0
    }]
    let group = await findGroup()
    let list = group.data.groups || []
    let groupDataLen = list.length
    if (groupDataLen > 0) {
      this.actionGetPatientList({ groupId: list[0].id, topicId: list[0].topicId, warningType: "followUp" })
      this.setState({
        group: list.concat(allGroup),
        currentGroup: list.concat(allGroup)[0].id + "-" + list.concat(allGroup)[0].topicId,//tabs组件传参智能传一个，需要拼接groupId和topicId
      })
    }
  }

  /**
   * 修改分组
   * @param {*} data 
   */
  async actionUpdateGroup(data) {
    let group = await updateGroup(data).catch(err => this.actionFindGroupSelf())
    if (group && group.code === 200) {
      this.actionGetGroup()
      this.actionFindGroupSelf()
      message.success('更新分组成功')
    }
  }

  async actionDeleteGroup(data) {
    let group = await deleteGroup(data)
    if (group && group.code === 200) {
      this.actionGetGroup()
      this.actionFindGroupSelf()
      message.success('删除分组成功')
    }
  }

  /**
   * 患者列表
   */
  async actionGetPatientList(data) {
    let list = await findPatientList(data)
    this.setState({ patientList: list.data.patientCards })
  }

  /**
   * 搜索患者
   * @param {*} data 
   */
  async actionSerchPatient(data) {
    let list = await findPatientList(data)
    this.setState({ searchList: list.data.patientCards })
  }

  /**
   * 自建分组
   */
  async actionFindGroupSelf() {
    let selfGroup = await findGroupSelf()

    let showAddBtn = true
    //全部不可编辑状态
    let list = selfGroup.data.groups || []
    for (let i in list) {
      list[i].editable = false
    }
    let groupDataLen = list.length
    if (groupDataLen >= 6) {
      showAddBtn = false
    }
    this.setState({
      groupData: list,
      showAddBtn
    })
  }

  render() {
    const { group, currentGroup, actionGroup, currentAction, groupEditVisible, showAddBtn, patientList, searchList, groupData } = this.state;
    const editGroupColumns = [{
      title: '序号',
      dataIndex: 'groupId',
      key: 'groupId',
      width: 80,
      align: 'center'
    }, {
      title: '分组名称',
      key: 'groupName',
      render: row => {
        return (
          <Input
            defaultValue={row.groupName}
            onChange={this.handleInput.bind(this, row.groupId)}
            disabled={!row.editable}
          />
        )
      }
    }, {
      title: '组内人数',
      dataIndex: 'groupPatientQty',
      key: 'groupPatientQty',
      align: 'center'
    }, {
      title: '操作',
      align: 'center',
      render: row => {
        if (row.editable) {
          if (row.deleteFlag) {
            return (
              <span>
                <span className="edit-btn" onClick={this.handleAddGroupItem.bind(this, row.groupId)}>保存</span>
                <span className="delete-btn" onClick={this.handleDeleteGroup.bind(this, row.groupId)}>删除</span>
              </span>
            )
          }
          return (<span className="edit-btn" onClick={this.handleAddGroupItem.bind(this, row.groupId)}>保存</span>)
        } else {
          if (row.deleteFlag) {
            return (
              <span>
                <span className="edit-btn" onClick={this.handleEditable.bind(this, row.groupId)}>编辑</span>
                <span className="delete-btn" onClick={this.handleDeleteGroup.bind(this, row.groupId)}>删除</span>
              </span>
            )
          }
          return (<span className="edit-btn" onClick={this.handleEditable.bind(this, row.groupId)}>编辑</span>)
        }
      }
    }];

    //分组中分类
    const actionItem = actionGroup.map((item, index) => {
      return (
        <span
          className={currentAction === item.key ? "action-item current-action" : "action-item"}
          key={index}
          onClick={this.handleChangeAction.bind(this, item.key)}
        >
          {item.name}
        </span>
      )
    })
    //分组
    const groupItem = group.map((item) => <TabPane tab={item.value} key={item.id + "-" + item.topicId} >{actionItem}</TabPane>)


    const waitToAddColumns = [{
      title: "序号",
      dataIndex: "num",
      key: "num",
    }, {
      title: "姓名",
      dataIndex: "name",
      key: "name"
    }, {
      title: "联系方式",
      dataIndex: "mobile",
      key: "mobile"
    }, {
      title: "备注",
      dataIndex: "remark",
      key: "remark"
    }, {
      title: "操作",
      render: row => (
        <span>
          <span className="edit-btn">通过</span>
          <span className='delete-btn'>拒绝</span>
        </span>
      )
    }]

    const options = searchList.map(d => <Option key={d.patientId} value={d.patientId}>{d.name}</Option>);

    //患者卡片
    const patientItem = patientList.map((item, index) => (
      <div key={index} className='patient' onClick={this.handleGoToArchives.bind(this, item.patientId || '')}>
        <div className='patient-top'>
          <div className="name">{item.realName || '未知用户名'}</div>
        </div>
        <div className="sub-info">
          <span>69岁</span>
          {item.sex === "男" ? <Icon type="man" /> : <Icon type="woman" />}
        </div>
        <div className='patient-bottom'>
          <span title="报警">警</span>
          <Icon type="message" />
        </div>
      </div>
    ))

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
          onSearch={throttle(this.handleSearch.bind(this), 1000)}
          onChange={this.handleSearchChange.bind(this)}
        >
          {options}
        </Select>
      </div>
    )
    return (
      <div className="patient-content">
        <PageHeader title="患者管理" />
        <Tabs
          type="card"
          activeKey={currentGroup}
          tabBarExtraContent={tabBarExtra()}
          onChange={this.handleTabsCallback.bind(this)}
        >
          {groupItem}
        </Tabs>

        {/* 列表内容 */}
        {patientList.length === 0 ? <Empty style={{ marginTop: "100px" }} /> : <div className="patient-list-wrap">{patientItem}</div>}

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
            {showAddBtn ? (<Button icon="plus" type="primary" onClick={this.handleAddGroup.bind(this)}>新增分组</Button>) : null}
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