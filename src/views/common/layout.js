import React, { Component } from 'react';
import { Layout, Form, Breadcrumb, Icon, Modal, Input, Radio, Button, Alert, message, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { formItemLayout, tailFormItemLayout } from '../../utils/formItemLayout';
import MyMenu from '../../components/MyMenu.jsx';
import { getLocal } from '../../utils/index';
import { logout } from '../../apis/user';
import { bindPatient } from '../../apis/relation';
import { delCookie ,buttonAuth} from '../../utils/index';
import { isPhoneNumber, isPersonName } from '../../utils/validate';
import './styles/layout.css';
import defaultUser from '../../assets/images/default-user.jpg';
import { withRouter } from 'react-router-dom';
import {findGroup,createGroup ,groupSelectInfo,checkMobileBind} from '../../apis/relation';

const { Header, Content, Sider } = Layout;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button; 
const { TextArea } = Input; 


class MyLayoutForm extends Component {
  state = {
    collapsed: true,
    visible: false,
    addPatientVisible: false,
    groupId: 0,
    subGroupId: 1,
    submitDisabled: false,
    errorMessage: null,
    name: "",
    addModalState: 0,
    wxAddWords: "【我在使用 xxxx 】长按复制全部内容打开到XXXX ，即可联系我。   δYU1EJJK5671δ   应用下载链接：http://lifesense.cn/h.3341sm=0187",
    userItem: false,
    userCenterVisible: false,
    updatePhoneVisible: false,
    changePasswordVisible: false,
    addSubmitLoading: false,
    customizeGroup:[],
    classesGroup:[],
    showCustomize:false,
    addState:false,
    newGroupName:"",
    addBtnState:true,
    customizeAdd:false,
    customizeDefaultKey:null
  };

  componentWillMount() {
    let user = JSON.parse(getLocal("user"))
    this.setState({user})
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed
    });
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  /**
   * 退出登录
   */
  handleLogout = () => {
    logout().then(res => {
      delCookie("accessToken")
      delCookie("session")
      window.location.href = '/rpm/#/login'
    })
  }

  handleAddPatientVisible() {
    //获取分组
    this.actionFindGroup()
    this.setState({ addPatientVisible: true })
  }

  handleAddPatientHide() {
    let self = this
    this.setState({ addPatientVisible: false })
    setTimeout(() => {
      self.setState({
        addModalState: 0,
        realName: "",
        mobile: "",
        treatmentRemark:"",
        errorMessage:null
      })
    })
  }

  handleSelectGroup(e) {
    console.log(e)
    if(e.target.dataValue === "0"){
      this.setState({ 
        showCustomize:true,
        errorMessage:null,
        groupId:0,
        topicId:0
      })
    }else{
      let groupId = e.target.value.split('-')[0]
      let topicId = e.target.value.split('-')[1]
      this.setState({ 
        groupId,
        topicId,
        showCustomize:false,
        errorMessage:null
      });
    }
  }

  //获取验证码
  handleGetCode(){}

  //选择自定义分组
  handleSelectGroup2(e){
    this.setState({ 
      groupId: +e.target.value ,
      topicId:0,
      errorMessage:null
    })
  }

  //输入框方法
  handleInput(key, e) {
    this.setState({ [key]: e.target.value })
  }

  //获取焦点时清除错误信息
  handleFocusInput() {
    this.setState({ errorMessage: null })
  }

  //失去焦点是检查数据
  handleBlurInput(key, e) {
    switch (key) {
      case "mobile":
        if (!isPhoneNumber(e.target.value)) this.setState({ errorMessage: '请输入正确的手机号码' })
        break;
      case "realName":
        if (!isPersonName(e.target.value)) this.setState({ errorMessage: '输入的患者姓名有误' })
        break;
      default:
        return
    }
  }

  //切换modal显示状态：0-单个添加，1-批量添加
  handleChangeAddState(state) {
    this.setState({ addModalState: state })
  }

  handleConfirm(){
    const { realName, mobile, groupId, topicId, treatmentRemark,showCustomize } = this.state
    if(realName && mobile){
      // if(showCustomize){
      //   //自定义，不用校验是否选择分组
      //   this.handleChangeAddState(3)
      // }else{
      //   if(groupId && topicId){
      //     this.handleChangeAddState(3)
      //   }else{
      //     this.setState({errorMessage:"请选择患者分类"})
      //   }
      // }
      this.actionCheckMobileBind({realName, mobile, groupId, topicId, treatmentRemark})
    }else{
      this.setState({errorMessage:"请输入正确的患者姓名和手机号码"})
    }
  }

  /**
   * 提交患者信息
   */
  handleSubmit() {
    const { realName, mobile, groupId, topicId, treatmentRemark,showCustomize } = this.state
    if(showCustomize){
      //自定义，不用校验是否选择分组
      this.actionBindPatient({ realName, mobile, groupId, topicId, treatmentRemark })
    }else{
      if(groupId && topicId){
        this.actionBindPatient({ realName, mobile, groupId, topicId, treatmentRemark })
      }else{
        this.setState({errorMessage:"请选择患者分类"})
      }
    }
  }

  handleShowUserCenter() {
    this.setState({ userItem: true })
  }

  handleHideUserCenter() {
    this.setState({ userItem: false })
  }

  handleUserCenterHide() {
    this.setState({ userCenterVisible: false })
  }

  handleUserCenterVisible() {
    //this.setState({userCenterVisible:true})
    this.props.history.push('/user')
    //this.setState({userCenterVisible:true})
  }

  handleUpdatePhone() {
    this.setState({ updatePhoneVisible: true })
  }

  handleUpdatePhoneHide() {
    this.setState({ updatePhoneVisible: false })
  }

  handleChangePasswordHide() {
    this.setState({ changePasswordVisible: false })
  }

  handleChangePassword() {
    this.setState({ changePasswordVisible: true })
  }

  //显示添加分组输入框
  handleShowAddBox(){
    this.setState({addState:true,addBtnState:false})
  }


  handleNewGroupName(e){
    this.setState({newGroupName:e.target.value})
  }

  //添加分组
  handleAddGroup(){
    let {newGroupName} = this.state;
    this.actionCreateGroup({ groupName: newGroupName })
  }

  handleCancelAddGroup(){
    this.setState({addState:false,addBtnState:true})
  }


  /**
   * 创建分组
   * @param {*} data 
   */
  async actionCreateGroup(data) {
    let group = await createGroup(data)
    if (group && group.code === 200) {
      message.success('添加分组成功')
      this.actionFindGroup("addSuccess");
      this.setState({addState:false,addBtnState:true})
    }
  }

  /**
   * 绑定患者
   * @param {*} data 
   */
  async actionBindPatient(data) {
    this.setState({ addSubmitLoading: true })
    let patient = await bindPatient(data).catch(err => {
      this.setState({ errorMessage: err.msg, addSubmitLoading: false })
    })
    if (patient && patient.code === 200) {
      this.setState({
        addSubmitLoading: false,
        customizeDefaultKey:null
      })
      this.handleAddPatientHide()
      window.location.reload()
    }
  }

  /**
   * 获取全部分组
   */
  async actionFindGroup(type=null){
    let group = await groupSelectInfo()
    if(group && group.code === 200){
      let groups = group.data.nodes
      let showSelf = group.data.showSelf || false
      let classesGroup = []
      let customizeGroup=[]
      //是否显示自定义按钮
      this.setState({customizeAdd:showSelf})
      for(let i in groups){
        if(groups[i].topicId === 0){
          //非课题医生
          customizeGroup.push(groups[i])
        }else{
          classesGroup.push(groups[i])
        }
      }
      //添加完成后，默认选中最后一个
      if(type){
        let customizeDefaultKey = customizeGroup[customizeGroup.length-1].id
        this.setState({customizeDefaultKey,groupId:customizeDefaultKey})
      }
      this.setState({customizeGroup,classesGroup})
    }
  }

  async actionCheckMobileBind(data){
    let res = await checkMobileBind(data).catch(err=>{
      this.setState({
        errorMessage:err.msg
      })
      return
    })
    if(res && res.code === 200){
      this.handleChangeAddState(3)
    }
  }

  render() {
    const {
      addPatientVisible,submitDisabled, errorMessage, realName, mobile,
      addModalState, wxAddWords, userItem, user, addSubmitLoading,customizeGroup,classesGroup,showCustomize,addState,
      addBtnState,customizeAdd,customizeDefaultKey,treatmentRemark,groupId,topicId
    } = this.state

    let allGroup = classesGroup.concat(customizeGroup)
    let selectedGroup = ''
    for(let i in allGroup){
      if(allGroup[i].id === +groupId && allGroup[i].topicId === +topicId){
        selectedGroup = allGroup[i].value
      }
    }

    let moreBtn = true
    const showErrorMessage = () => (
      errorMessage ? <Alert message={errorMessage} type="error" /> : null
    )
    const classesItem = classesGroup.map((item,index)=><Radio key={index} value={item.id+"-"+item.topicId}>{item.value}</Radio>)
    const customizeItem = customizeGroup.map((item,index)=><RadioButton key={index} value={item.id}>{item.value}</RadioButton>)
    if(classesItem.length + customizeItem.length >= 6){
      moreBtn=false
    }
    //点个添加
    const sigleAdd = () => (
      <div >
        <FormItem  {...formItemLayout} label={<span className="label-required">患者姓名</span>} >
          <Input
            placeholder="请输入患者姓名"
            onChange={this.handleInput.bind(this, 'realName')}
            onBlur={this.handleBlurInput.bind(this, 'realName')}
            onFocus={this.handleFocusInput.bind(this)}
            value={realName}
          />
        </FormItem>
        <FormItem  {...formItemLayout} label={<span className="label-required">手机号码</span>}>
          <Input
            placeholder="请输入患者的手机号码"
            onChange={this.handleInput.bind(this, 'mobile')}
            onBlur={this.handleBlurInput.bind(this, 'mobile')}
            onFocus={this.handleFocusInput.bind(this)}
            value={mobile}
          />
        </FormItem>
        <FormItem  {...formItemLayout} label="患者分类">
          <RadioGroup onChange={this.handleSelectGroup.bind(this)} value={groupId+"-"+topicId}>
            {classesItem}
            {customizeAdd?<Radio value="0-0" dataValue="0">自定义</Radio>:null}
          </RadioGroup>
        </FormItem>
        
        {/* 自定义分组 */}
        {showCustomize?(
          <FormItem  {...formItemLayout} label="自定义分组">
            <RadioGroup defaultValue={customizeDefaultKey} onChange={this.handleSelectGroup2.bind(this)} style={{marginRight:"20px"}}>
              {customizeItem}
            </RadioGroup>
            {moreBtn && addBtnState?<Button type="primary" onClick={this.handleShowAddBox.bind(this)}><Icon type="plus-circle"/>新增</Button>:null}
          </FormItem>
        ):null}

        {addState?(
          <FormItem  {...tailFormItemLayout}>
            <Input onChange={this.handleNewGroupName.bind(this)} style={{width:"300px"}} addonAfter={
              <div>
                <span style={{cursor:"pointer",marginRight:"20px",fontSize:"20px"}} onClick={this.handleAddGroup.bind(this)}><Icon style={{color:"#1890ff"}} type="check-circle" theme="filled" /></span>
                <span style={{cursor:"pointer",fontSize:"20px"}} onClick={this.handleCancelAddGroup.bind(this)}><Icon style={{color:"#f00"}}type="close-circle" theme="filled" /></span>
              </div>
            }/>
          </FormItem>
        ):null}
        
        <FormItem  {...formItemLayout} label="诊疗备注">
          <TextArea 
            value={treatmentRemark}
            autosize={{ minRows: 3 }} 
            onChange={this.handleInput.bind(this, 'treatmentRemark')} 
            onFocus={this.handleFocusInput.bind(this)}
            placeholder='录入患者备注（非必填）'
          />
        </FormItem>
        <FormItem  {...tailFormItemLayout}>
          {showErrorMessage()}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button className="modal-btn" type="primary" onClick={this.handleConfirm.bind(this,3)}>提交</Button>
          <Button className="modal-btn" onClick={this.handleAddPatientHide.bind(this)}>取消</Button>
        </FormItem>
      </div>
    )
    //微信患者批量添加
    const batchAdd = () => (
      <div>
        <div className="wx-words-refresh"><Icon type="sync" />&nbsp;刷新后邀请口令即失效</div>
        <Alert
          description={wxAddWords}
          type="info"
        />
        <div className="tips">*为保证医护人员隐私，邀请码将于3月8日过期</div>
        <div className='wx-add-btn'>
          <Button type="primary" className='wx-close-btn' onClick={this.handleAddPatientHide.bind(this)}>去微信粘贴并发送给患者</Button>
          <Button className='wx-close-btn' onClick={this.handleChangeAddState.bind(this, 0)}>返回</Button>
        </div>
        <div className="teaching-link"><a href="#/" className="use-teaching">患者使用教学</a></div>
      </div>
    )
    //提交完成
    const addSuccess = () => (
      <div>
        <div className="invite-success-icon"><Icon type="check-circle" /></div>
        <div className="invite-success-wrods">已向“{mobile}”患者发送使用邀请</div>
        <div className="return-to-input"><span onClick={this.handleChangeAddState.bind(this,0)} className="return-link">重新输入手机号码</span></div>
        <div className='wx-add-btn padding-bottom'>
          <Button type="primary" onClick={this.handleAddPatientHide.bind(this)}>没问题！患者已收到</Button>
        </div>
      </div>
    )
    
    //提交确认
    const confirmSubmit = () => (
      <div>
        <FormItem  {...formItemLayout} label="患者姓名" >
          <span className="bold">{realName}</span>
        </FormItem>
        <FormItem  {...formItemLayout} label="手机号码">
          <span className="bold">{mobile}</span>
        </FormItem>
        <FormItem  {...formItemLayout} label="患者分类">
          <span className="bold">{selectedGroup}</span>
        </FormItem>
        <FormItem  {...formItemLayout} label="备注">
          <span className="bold">{treatmentRemark}</span>
        </FormItem>
        <FormItem  {...tailFormItemLayout}>
          {showErrorMessage()}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button
            className="modal-btn"
            type="primary"
            onClick={this.handleSubmit.bind(this)}
            disabled={submitDisabled}
            loading={addSubmitLoading}
          >确认</Button>
          <Button className="modal-btn" onClick={this.handleChangeAddState.bind(this,0)}>修改病例信息</Button>
        </FormItem>
      </div>
    )

    //可切换的页面集合
    const addModalArray = [sigleAdd(), batchAdd(), addSuccess(),confirmSubmit()]

    //用户中心菜单
    const showUserItem = () => (
      <div className="user-item-wrap">
        <div className='user-item' onClick={this.handleUserCenterVisible.bind(this)}>个人中心</div>
        {/* <div className='user-item' onClick={this.handleUpdatePhone.bind(this)}>修改帐号</div>
        <div className='user-item' onClick={this.handleChangePassword.bind(this)}>修改密码</div> */}
        <div className='user-item' onClick={this.handleLogout.bind(this)}>登出</div>
      </div>
    )

    const breadcrumbNameMap = {
      '/patient': '患者管理',
      '/patient/archives': '患者档案',
      '/plan': '方案管理',
      '/plan/measurement':"添加测量方案",
      '/plan/followup':"添加随访方案",
      '/plan/edit': '添加计划',
      '/plan/followup-edit': '随访方案',
      '/chat': '医患沟通',
      '/crf': 'CRF录入',
      '/crf/patient': '患者CRF',
      '/crf/patient/edit': '节点详情',
      '/user': '个人中心'
    };

    const { location } = this.props;

    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [(
      <Breadcrumb.Item key="home">
        {/* <Link to="/patient">首页</Link> */}
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);

    const bindPatientBtn = (
      <div className='add-patient' onClick={this.handleAddPatientVisible.bind(this)}>
        <Icon type="user-add" className='icon' title='添加病例' />
        <span>添加病例</span>
      </div>
    )
    return (
      <Layout style={{ minHeight: '100vh' }}>

        <Header style={{ padding: "0 20px" }}>
          <div className='header'>
            <div className='logo'>国家2型糖尿病智能化管理平台</div>
            <div className='user'>
              {buttonAuth(getLocal('buttons') || [],'bindPatient',bindPatientBtn)}
              <div
                onClick={this.handleUserCenterVisible.bind(this)}
                className='user-info'
              >
                <img src={user.headUrl || defaultUser} alt='' />
                <span>{user.realName}</span>
                {userItem ? showUserItem() : null}
              </div>
              <div className='logout' onClick={this.handleLogout.bind(this)}>
                <Icon className='icon' type="logout" title='退出登录'/>
              </div>
            </div>
          </div>
        </Header>

        <Layout>
          <Sider
            width={200}
            theme="light"
            //collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <MyMenu />
          </Sider>
          <Layout id="my-layout" style={{ padding: '0 24px 24px' }}>
            <div id="my-breadcrumb">
              <Breadcrumb style={{ margin: '16px 0' }} separator=">">
                  {breadcrumbItems}
              </Breadcrumb>
            </div>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 300 }}>
              {this.props.content()}
            </Content>
          </Layout>
        </Layout>

        {/**添加病例弹窗 */}
        <Modal
          visible={addPatientVisible}
          title="添加病例"
          onCancel={this.handleAddPatientHide.bind(this)}
          footer={null}
          width={700}
        >
          {addModalArray[addModalState]}
        </Modal>

      </Layout>
    );
  }
}

const MyLayout = Form.create()(MyLayoutForm);

export default withRouter(MyLayout) 
