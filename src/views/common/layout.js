import React, {Component} from 'react';
import {Layout,Form,Breadcrumb,Icon,Modal,Input,Radio,Button,Alert,Tooltip,Row,Col} from 'antd';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
>>>>>>> chat
import {formItemLayout,tailFormItemLayout} from '../../utils/formItemLayout'
import MyMenu from '../../components/MyMenu.jsx'
import {getLocal} from '../../utils/index'
import {logout} from '../../apis/user'
import {delCookie} from '../../utils/index'
import {isPhoneNumber,isPersonName} from '../../utils/validate'
import './styles/layout.css'
import defaultUser from '../../assets/images/default-user.jpg'
<<<<<<< HEAD
import { withRouter } from 'react-router-dom';
=======
>>>>>>> chat

const {Header,Content,Sider} = Layout
const FormItem = Form.Item
const RadioGroup = Radio.Group
const { TextArea } = Input; 


class MyLayoutForm extends Component {
  state = {
<<<<<<< HEAD
    collapsed: true,
=======
    collapsed: false,
>>>>>>> chat
    visible: false,
    addPatientVisible:false,
    groupValue:1,
    submitDisabled:false,
    errorMessage:null,
    name:"",
    addModalState:0,
    wxAddWords:"【我在使用 xxxx 】长按复制全部内容打开到XXXX ，即可联系我。   δYU1EJJK5671δ   应用下载链接：http://lifesense.cn/h.3341sm=0187",
    userItem:false,
    userCenterVisible:false,
    updatePhoneVisible:false,
    changePasswordVisible:false
  };

  componentWillMount() {
    let user = JSON.parse(getLocal("user"))
<<<<<<< HEAD
    console.log(user)
    this.setState({user})
=======
    this.setState({
      user
    })
>>>>>>> chat
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
      delCookie("access_token")
      window.location.href = '/login'
    })
  }

  handleAddPatientVisible(){
    this.setState({addPatientVisible:true})
  }

  handleAddPatientHide(){
    let self = this
    this.setState({addPatientVisible:false})
    setTimeout(()=>{
      self.setState({
        addModalState:0,
        name:"",
        phone:""
      })
    })
  }

  handleSelectGroup(e){
    this.setState({groupValue: e.target.value});
  }

  /**
   * 输入框方法
   */
  handleInput(key,e){
    this.setState({[key]:e.target.value})
  }

  /**
   * 获取焦点时清除错误信息
   */
  handleFocusInput(){
    this.setState({errorMessage:null})
  }

  /**
   * 失去焦点是检查数据
   */
  handleBlurInput(key,e){
    switch(key){
      case "phone":
        if(!isPhoneNumber(e.target.value)) this.setState({errorMessage:'请输入正确的手机号码'})
        break;
      case "name":
        if(!isPersonName(e.target.value)) this.setState({errorMessage:'输入的患者姓名有误'})
        break;
      default:
        return
    }
  }

  /**
   * 切换modal显示状态：0-单个添加，1-批量添加
   * @param {*} state 
   */
  handleChangeAddState(state){
    this.setState({addModalState:state})
  }

  /**
   * 提交患者信息
   */
  handleSubmit(){
    //提交成功后回调
    this.setState({addModalState:2})
  }

  handleShowUserCenter(){
    this.setState({userItem:true})
  }

  handleHideUserCenter(){
    this.setState({userItem:false})
  }

  handleUserCenterHide(){
    this.setState({userCenterVisible:false})
  }

  handleUserCenterVisible(){
<<<<<<< HEAD
    //this.setState({userCenterVisible:true})
    this.props.history.push('/user')
=======
    this.setState({userCenterVisible:true})
>>>>>>> chat
  }

  handleUpdatePhone(){
    this.setState({updatePhoneVisible:true})
  }

  handleUpdatePhoneHide(){
    this.setState({updatePhoneVisible:false})
  }

  handleChangePasswordHide(){
    this.setState({changePasswordVisible:false})
  }

  handleChangePassword(){
    this.setState({changePasswordVisible:true})
  }

  /**
   * 获取验证码
   */
  handleGetCode(){

  }

  render() {
    const {
      addPatientVisible,groupValue,submitDisabled,errorMessage,name,
      addModalState,wxAddWords,userItem,userCenterVisible,changePasswordVisible,
<<<<<<< HEAD
      updatePhoneVisible,user
=======
      updatePhoneVisible
>>>>>>> chat
    } = this.state
    const showErrorMessage = ()=>(
      errorMessage ? <Alert message={errorMessage} type="error" /> : null
    )
    //点个添加
    const sigleAdd = () => (
      <div >
        <FormItem  {...formItemLayout} label="患者姓名">
          <Input 
            placeholder="请输入患者姓名"
            onChange={this.handleInput.bind(this,'name')}
            onBlur={this.handleBlurInput.bind(this,'name')}
            onFocus={this.handleFocusInput.bind(this)}
            value={name}
          />
        </FormItem>
        <FormItem  {...formItemLayout} label="手机号码">
          <Input 
            placeholder="请输入患者的手机号码"
            onBlur={this.handleBlurInput.bind(this,'phone')}
            onFocus={this.handleFocusInput.bind(this)}
          />
        </FormItem>
        <FormItem  {...formItemLayout} label="患者分类">
          <RadioGroup onChange={this.handleSelectGroup.bind(this)} value={groupValue}>
            <Radio value={1}>课题一</Radio>
            <Radio value={2}>课题二</Radio>
            <Radio value={3}>高血压</Radio>
            <Radio value={4}>糖尿病</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem  {...formItemLayout} label="诊疗备注">
          <TextArea autosize={{minRows:3}} />
        </FormItem>
        <FormItem  {...tailFormItemLayout}>
          {showErrorMessage()}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button className="modal-btn" type="primary" onClick={this.handleSubmit.bind(this)} disabled={submitDisabled}>提交</Button>
          <Button className="modal-btn" onClick={this.handleAddPatientHide.bind(this)}>取消</Button>
          <Button className="modal-btn" onClick={this.handleChangeAddState.bind(this,1)}>微信患者批量添加</Button>
        </FormItem>
      </div>
    )
    //微信患者批量添加
    const batchAdd = () => (
      <div>
        <div className="wx-words-refresh"><Icon type="sync"/>&nbsp;刷新后邀请口令即失效</div>
        <Alert
          description={wxAddWords}
          type="info"
        />
        <div className="tips">*为保证医护人员隐私，邀请码将于3月8日过期</div>
        <div className='wx-add-btn'>
          <Button type="primary" className='wx-close-btn' onClick={this.handleAddPatientHide.bind(this)}>去微信粘贴并发送给患者</Button>
          <Button className='wx-close-btn' onClick={this.handleChangeAddState.bind(this,0)}>返回</Button>
        </div>
        <div className="teaching-link"><a href="#/" className="use-teaching">患者使用教学</a></div>
      </div>
    )
    //提交完成
    const addSuccess = () => (
      <div>
        <div className="invite-success-icon"><Icon type="check-circle" /></div>
        <div className="invite-success-wrods">已向“13888888888”患者发送使用邀请</div>
        <div className="return-to-input"><span onClick={this.handleChangeAddState.bind(this,0)} className="return-link">重新输入手机号码</span></div>
        <div className='wx-add-btn padding-bottom'>
          <Button type="primary" onClick={this.handleAddPatientHide.bind(this)}>没问题！患者已收到</Button>
        </div>
      </div>
    )
    //可切换的页面集合
    const addModalArray = [sigleAdd(),batchAdd(),addSuccess()]

    //用户中心菜单
    const showUserItem = () => (
      <div className="user-item-wrap">
        <div className='user-item' onClick={this.handleUserCenterVisible.bind(this)}>个人中心</div>
<<<<<<< HEAD
        {/* <div className='user-item' onClick={this.handleUpdatePhone.bind(this)}>修改帐号</div>
        <div className='user-item' onClick={this.handleChangePassword.bind(this)}>修改密码</div> */}
        <div className='user-item' onClick={this.handleLogout.bind(this)}>登出</div>
      </div>
    )

    const breadcrumbNameMap = {
      '/patient': '患者管理',
      '/patient/archives':'患者档案',
      '/plan': '方案管理',
      '/plan/edit':'添加计划',
      '/plan/followup-edit':'随访方案',
      '/im': '医患沟通',
      '/crf': 'CRF录入',
      '/user':'个人中心'
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
        <Link to="/patient">首页</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);
=======
        <div className='user-item' onClick={this.handleUpdatePhone.bind(this)}>修改帐号</div>
        <div className='user-item' onClick={this.handleChangePassword.bind(this)}>修改密码</div>
        <div className='user-item' onClick={this.handleLogout.bind(this)}>登出</div>
      </div>
    )
>>>>>>> chat
    
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{padding:"0 20px"}}>
          <div className='header'>
            <div className='logo'>乐心RPM医生端管理平台</div>
            <div className='user'>
              <div className='add-patient' onClick={this.handleAddPatientVisible.bind(this)}>
                <Icon className='icon' type="usergroup-add" title='添加病例' />
              </div>
              <div 
                className='user-info' 
                onMouseEnter={this.handleShowUserCenter.bind(this)}
                onMouseLeave={this.handleHideUserCenter.bind(this)}
              >
<<<<<<< HEAD
                <img src={user.headUrl || defaultUser} alt=''/>
=======
                <img src={defaultUser} alt=''/>
>>>>>>> chat
                {userItem ? showUserItem() : null}
              </div>
            </div>
          </div>
        </Header>
        <Layout>
          <Sider 
            width={200} 
            theme="light"
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <MyMenu/>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
<<<<<<< HEAD
              <Breadcrumb style={{ margin: '16px 0' }}>
                {breadcrumbItems}
              </Breadcrumb>
              <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 300}}>
=======
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
              <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 300,}}
            >
>>>>>>> chat
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

        {/** 用户中心 */}
        <Modal 
          title="个人中心"
          visible={userCenterVisible}
          onCancel={this.handleUserCenterHide.bind(this)}
          footer={null}
          width={700}
        >
          <div className="user-center">
            <Row>
              <Col span={10} offset={2}>
                <div className="user-center-item">
                  <span>姓名：</span>
                  <span>李时珍</span>
                </div>
              </Col>
              <Col span={10} offset={2}>
                <div className="user-center-item">
                  <span>职称：</span>
                  <input value="主任医师" disabled/>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={10} offset={2}>
                <div className="user-center-item">
                  <span>医院：</span>
                  <input value="南山医院" disabled/>
                </div>
              </Col>
              <Col span={10} offset={2}>
                <div className="user-center-item">
                  <span>科室：</span>
                  <input value="外科" disabled/>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={22} offset={2}>
                <div className="user-center-item">
                  <span>地址：</span>
                  <input className="user-address" value="深圳市南山区高新南一道" disabled />
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={22} offset={2}>
                <div className="user-center-item">
                  <span>联系方式：13800138000</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={22} offset={2}>
                <div className="user-center-item">
                  <span>所属课题：</span>
                  <span className="class-item">课题一</span>
                  <span className="class-item">课题二</span>
                  <span className="class-item">课题三</span>
                  <span className="class-item">课题四</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={22} offset={2}>
                <div className="user-center-item">
                  <span>证书：</span>
                  <span className="user-image-wrap">
                    <div className="image-box"></div>
                    <div className="image-box"></div>
                  </span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={22} offset={2}>
                <div className="user-center-item">
                  <Button type="primary">编辑</Button>
                </div>
              </Col>
            </Row>
          </div>
        </Modal>

        {/** 修改帐号 */}
        <Modal 
          visible={updatePhoneVisible}
          title="修改帐号"
          onCancel={this.handleUpdatePhoneHide.bind(this)}
          footer={null}
          width={700}
        >
          <Form>
            <FormItem {...formItemLayout} label="帐号">
              <Input placeholder="请输入新手机号码"/>
            </FormItem>
            <FormItem {...formItemLayout} label="验证码">
              <Input 
                placeholder='请输入验证码' 
                addonAfter={<span onClick={this.handleGetCode.bind(this)} style={{cursor:'pointer'}}>获取验证码</span>}
              />
            </FormItem>
            <FormItem {...formItemLayout} label="登录密码">
              <Input placeholder="请输入登录密码"/>
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary">提交</Button>
            </FormItem>
          </Form>
        </Modal>

        {/** 修改密码 */}
        <Modal 
          visible={changePasswordVisible}
          title="修改密码"
          onCancel={this.handleChangePasswordHide.bind(this)}
          footer={null}
          width={700}
        >
          <Form>
            <FormItem {...formItemLayout} label="帐号">
              <span>13800138000</span>
            </FormItem>
            <FormItem {...formItemLayout} label="原密码">
              <Input 
                placeholder='请输入原密码' 
                type="password"
              />
            </FormItem>
            <FormItem {...formItemLayout} label="新密码">
              <Input 
                placeholder="请输入新密码"
                type="password"
              />
            </FormItem>
            <FormItem {...formItemLayout} label="确认新密码">
              <Input 
                placeholder="请再次输入新密码"
                type="password"
              />
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary">提交</Button>
            </FormItem>
          </Form>
        </Modal>

      </Layout>
    );
  } 
}

const MyLayout = Form.create()(MyLayoutForm);

<<<<<<< HEAD
export default withRouter(MyLayout) 
=======
export default MyLayout
>>>>>>> chat
