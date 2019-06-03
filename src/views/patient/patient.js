import React, { Component } from 'react';
import { Icon, Input, Modal, Button, Table, Select, Tabs, message, Empty ,Spin,Pagination} from 'antd'
import './styles/patient.css'
import { withRouter } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { createGroup, findGroup, findGroupSelf, updateGroup, deleteGroup, findPatientList } from '../../apis/relation';
import { throttle,buttonAuth, getLocal } from '../../utils/index'
import {getButton} from '../../apis/user'
import moment  from 'moment';
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
      key: 'newGroup',
      name: "新入组"
    },{
      key: 'followUp',
      name: "随访"
    }, {
      key: 'warning',
      name: "报警"
    }, {
      key: 'all',
      name: "全部"
    }],
    currentAction: 'newGroup',
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
    groupData: [],
    emptyWords:"暂无新入组患者",
    buttonKey:[],
    spinning:false,
    currentDoctorId:null,
    totalCount:0,
    dateValue:{
      newGroup:-7,
      followUp:7,
      warning:-7
    },
    page:{
      newGroup:{
        pageNum:1,
        total:1
      },
      followUp:{
        pageNum:1,
        total:1
      },
      warning:{
        pageNum:1,
        total:1
      },
      all:{
        pageNum:1,
        total:1
      }
    }
  }

  componentWillMount() {
    this.actionGetGroup()
    this.actionFindGroupSelf()
    //按钮权限
    this.actionGetButton()
    //当前医生
    let user = JSON.parse(getLocal('user'))
    this.setState({currentDoctorId:user.userId})
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
    if(key==="followUp"){this.setState({emptyWords:"暂无随访患者"})}
    if(key==="warning"){this.setState({emptyWords:"暂无报警患者"})}
    if(key==="newGroup"){this.setState({emptyWords:"暂无新入组患者"})}
    if(key==="all"){this.setState({emptyWords:"暂无患者"})}
    let dateValue = {newGroup:-7,followUp:7,warning:-7}
    this.actionGetPatientList({ groupId, topicId, warningType: key })
    this.setState({ currentAction: key ,groupId,topicId,dateValue})
  }

  //tab切换
  handleTabsCallback(key) {
    let groupId = parseInt(key.split('-')[0]);
    let topicId = parseInt(key.split('-')[1])
    let warningType = this.state.currentAction
    this.actionGetPatientList({ groupId, topicId, warningType })
    let dateValue = {newGroup:-7,followUp:7,warning:-7}
    this.setState({ currentGroup: key, groupId,topicId,dateValue})
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
  handleGoToArchives(id,relationId,doctorId,tab=1) {
    this.props.history.push('/patient/archives?id=' + id +"&tab="+tab +"&relationId="+relationId+"&doctorId="+doctorId)
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
    let relationId = parseInt(value.split('-')[0]);
    let patientId = parseInt(value.split('-')[1])
    this.props.history.push('/patient/archives?id=' + patientId + "&relationId="+relationId+"&tab=1")
  }

  //跳转到聊天
  handleJumpToChat(patientId){
    this.props.history.push('/chat?id='+patientId)
  }

  handleChangeSearchDate(value){
    let {currentAction,currentGroup,dateValue} = this.state
    let startDate = '';
    let endDate = '';
    let groupId = +currentGroup.split('-')[0]
    let topicId = +currentGroup.split('-')[1]
    if(value > 0){
      startDate = new Date().getTime()
      endDate = moment().add(value,'days').valueOf()
    }else{
      startDate = moment().add(value,'days').valueOf()
      endDate = new Date().getTime()
    }
    dateValue[currentAction] = value
    this.setState({dateValue})
    this.actionGetPatientList({
      groupId,topicId,warningType:currentAction,startDate,endDate
    })
  }

  handleChangePage(page,pageSize){
    let {currentAction,currentGroup,dateValue} = this.state
    let groupId = +currentGroup.split('-')[0]
    let topicId = +currentGroup.split('-')[1]
    let pageIndex = page;
    let startDate = '';
    let endDate = '';
    let date = dateValue[currentAction]
    if(date > 0){
      startDate = new Date().getTime()
      endDate = moment().add(date,'days').valueOf()
    }else{
      startDate = moment().add(date,'days').valueOf()
      endDate = new Date().getTime()
    }
    this.actionGetPatientList({
      groupId,topicId,warningType:currentAction,startDate,endDate,pageIndex,pageSize
    })
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
    let list = group.data.nodes || []
    let groupDataLen = list.length
    if (groupDataLen > 0) {
      this.actionGetPatientList({ groupId: list[0].id, topicId: list[0].topicId, warningType: "newGroup" })
      this.setState({
        group: list.concat(allGroup),
        currentGroup: list.concat(allGroup)[0].id + "-" + list.concat(allGroup)[0].topicId,//tabs组件传参智能传一个，需要拼接groupId和topicId
      })
    }else{
      this.actionGetPatientList({ groupId: 0, topicId: 0, warningType: "newGroup" })
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
    this.setState({spinning:true})
    let list = await findPatientList({pageSize:20,...data}).catch(err=>{
      this.setState({spinning:false,patientList:[],totalCount:0})
      //message.error(err.msg)
    })
    if(list){
      let totalCount = list.data.totalCount || 0
      let totalPage = Math.ceil(totalCount/20)
      let {page} = this.state
      let pageObj = page[data.warningType]
      pageObj.total = totalPage
      page[data.warningType] = pageObj
      this.setState({ 
        patientList: list.data.patientCards ,
        spinning:false,totalCount,
        page
      })
    }
  }

  /**
   * 搜索患者
   * @param {*} data 
   */
  async actionSerchPatient(data) {
    let list = await findPatientList(data)
    if(list.data.patientCards.length > 0){
      this.setState({ searchList: list.data.patientCards })
    }
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

  //页面按钮权限
  async actionGetButton(){
    let buttons = await getButton({pageId:2})
    let buttonList = buttons.data.buttons
    let buttonKey = buttonList.map(item => item.buttonKey)
    this.setState({buttonKey})
  }

  render() {
    const { group, currentGroup, actionGroup, currentAction, groupEditVisible, 
      showAddBtn, patientList, searchList, groupData ,emptyWords,buttonKey,spinning,
      currentDoctorId,totalCount,dateValue,page} = this.state;
    const editGroupColumns = [{
      title: '序号',
      width: 80,
      align: 'center',
      render:(row,record,index)=>index+1
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
                {buttonAuth(buttonKey,'deleteGroup',<span className="delete-btn" onClick={this.handleDeleteGroup.bind(this, row.groupId)}>删除</span>)}
              </span>
            )
          }
          return (<span className="edit-btn" onClick={this.handleAddGroupItem.bind(this, row.groupId)}>保存</span>)
        } else {
          if (row.deleteFlag) {
            return (
              <span>
                {buttonAuth(buttonKey,'updateGroup',<span className="edit-btn" onClick={this.handleEditable.bind(this, row.groupId)}>编辑</span>)}
                {buttonAuth(buttonKey,'deleteGroup',<span className="delete-btn" onClick={this.handleDeleteGroup.bind(this, row.groupId)}>删除</span>)}
              </span>
            )
          }
          return buttonAuth(buttonKey,'updateGroup',<span className="edit-btn" onClick={this.handleEditable.bind(this, row.groupId)}>编辑</span>)
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
    const options = searchList.map(d => <Option key={d.relationId} value={d.relationId+"-"+d.patientId}>{d.realName}</Option>);
    const warningTotal = (array)=>{
      return array.map((item,index)=>{
        return(
          <span key={index}>{item.warningType}预警&nbsp;{item.warningCount}次{item.warningType}预警&nbsp;{item.warningCount}次</span>
        )
      })
    }

    const warningDetail = (array)=>{
      return array.map((item,index)=>{
        let waringList = []
        if(item.warningDetailVoList){
          waringList = item.warningDetailVoList.map((item,index)=>(
            <div key={index}>{item.warningData}&nbsp;{moment(item.warningTime).format('YY年MM月DD日')}</div>
          ))
        }
        return(
          <div className="warning-detail" key={index}>
            <div className="warning-title">{item.warningType}</div>
            {waringList}
          </div>
        )
      })
    }

    //const data = [{warningType:"血压",warningCount:1,warningDetailVoList:[{warningTime:null,warningData:"120/78"}]}]

    const card = (item,index,tab) =>{
      return(
        <div key={index} className='patient'>
            <div className='patient-top' onClick={this.handleGoToArchives.bind(this, item.patientId,item.relationId,item.doctorId,1)}>
              <div className="name">{item.realName || '未知用户名'}</div>
              {item.sex?(item.sex === "男" ? <Icon type="man" /> : <Icon type="woman" />):null}
            </div>
            <div className="sub-info" onClick={this.handleGoToArchives.bind(this, item.patientId,item.relationId,item.doctorId,1)}>
              <span>{item.age || '--'}岁</span>
              <span>{item.mobile}</span>
            </div>
            <div className='patient-bottom'>
              {currentAction==='newGroup'?<span>{item.enterGroupDate?"入组：" + moment(item.enterGroupDate).format('YY-MM-DD'):""}</span>:''}
              {currentAction==='followUp'?<span>{item.followUpVo?item.followUpVo.currentFollowUp:''}</span>:null}
              {currentAction==='warning'?<div className="warning-words">{warningTotal(item.warningVoList)}</div>:null}
              {/* {item.warningFlag?<span title="报警" onClick={this.handleGoToArchives.bind(this, item.patientId,item.relationId,item.doctorId,2)}>警</span>:null} */}
              {/* 新增判断改患者是否与当前医生有绑定关系 */}
              {currentAction==='warning'?<div className="warning-words"></div>:null}
              {currentAction==='all'?<div></div>:<></>}
              {currentDoctorId === item.doctorId?<Icon type="message" onClick={this.handleJumpToChat.bind(this, item.patientId || '')}/>:null}
            </div>
            {currentAction==='followUp'?(
              <div className="right-hover">
                <div className='wait-follow'>待随访阶段：{item.followUpVo.incomeFollowUp?item.followUpVo.incomeFollowUp:"暂无"}</div>
                <div className="next-time">下次随访时间：{item.followUpVo.nextFollowUpDate?moment(item.followUpVo.nextFollowUpDate).format("YY年MM月DD日"):"暂无"}</div>
              </div>
            ):null}
            {currentAction==='warning' && item.warningVoList.length > 0 ?(
              <div className="right-hover">
                {warningDetail(item.warningVoList)}
              </div>
            ):null}
          </div>
      )
    }
    //患者卡片
    const patientItem = patientList.map((item, index) => {
      return card(item,index,currentAction)
    })

    const selectTimeBox = ()=>{
      switch(currentAction){
        case 'newGroup':
          return(
            <div className="select-time-wrap">
              <div className="count">新入组：{totalCount}人</div>
              <Select value={dateValue[currentAction]} style={{ width: 120 }} onChange={this.handleChangeSearchDate.bind(this)}>
                <Option value={0}>今天</Option>
                <Option value={-7}>过去7天</Option>
                <Option value={-30}>过去30天</Option>
              </Select>
            </div>
          )
        case 'followUp':
          return(
            <div className="select-time-wrap">
              <div className="count">待随访：{totalCount}人</div>
              <Select value={dateValue[currentAction]} style={{ width: 120 }} onChange={this.handleChangeSearchDate.bind(this)}>
                <Option value={0}>今天</Option>
                <Option value={7}>未来7天</Option>
                <Option value={30}>未来30天</Option>
              </Select>
            </div>
          )
        case 'warning':
          return(
            <div className="select-time-wrap">
              <div className="count">血压血糖异常：{totalCount}人</div>
              <Select value={dateValue[currentAction]} style={{ width: 120 }} onChange={this.handleChangeSearchDate.bind(this)}>
                <Option value={0}>今天</Option>
                <Option value={-7}>过去7天</Option>
                <Option value={-30}>过去30天</Option>
              </Select>
            </div>
          )
        case 'all':
          return(
            <div className="select-time-wrap">
              <div className="count no-margin">管理患者：{totalCount}人</div>
            </div>
          )
        default:
          return
      }
    }

    const button = (
      <span
        className="edit-group-icon"
        onClick={this.handleGroupEditVisible.bind(this)}
      >
        <Icon type="form" />&nbsp;编辑分组
      </span>
    )

    const search = (
      <Select
        style={{ width: 200 }}
        showSearch
        placeholder="患者姓名/手机号/编号"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={throttle(this.handleSearch.bind(this), 1000)}
        onChange={this.handleSearchChange.bind(this)}
      >
        {options}
      </Select>
    )

    const tabBarExtra = () => (
      <div className='patient-group-right'>
        {buttonAuth(buttonKey,'findGroups', button)}
        {buttonAuth(buttonKey,'findPatientCards', search)}
      </div>
    )

    //增加按钮
    const addButton = (
      <div className="add-group-icon">
        {showAddBtn ? (<Button icon="plus" type="primary" onClick={this.handleAddGroup.bind(this)}>新增分组</Button>) : null}
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
        {selectTimeBox()}

        {buttonAuth(buttonKey,'findPatientCards',<Spin spinning={spinning}>{patientList.length === 0 ? <Empty description={emptyWords} style={{ marginTop: "100px" }} /> : <div className="patient-list-wrap">{patientItem}</div>} </Spin>)}
        {/** 编辑分组*/}
        <div className="page">
          <Pagination 
            pageSize={20} 
            defaultCurrent={1} 
            total={totalCount} 
            onChange={this.handleChangePage.bind(this)}
          />
        </div>

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
          {buttonAuth(buttonKey,'createGroup',addButton)}
        </Modal>
      </div>
    );
  }
}

export default withRouter(Patient)