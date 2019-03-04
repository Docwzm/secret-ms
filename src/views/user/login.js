import React, { Component } from 'react';
import { Form, Icon, Input, Button} from 'antd';
import {login} from '../../apis/user'
import md5 from 'md5'
import './styles/login.css'
import {setCookie,setLocal} from '../../utils/index'
import {isPhoneNumber} from '../../utils/validate'
import { withRouter } from 'react-router-dom';
const FormItem = Form.Item;

class FormWrap extends Component {
  state = {
    userName:'',
    password:'',
    passwordType:true,
    errorMessage:'',
    pageStep:0
  }
    
  handleSubmit = (e) => {
    e.preventDefault();
    let self = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let userName = values.userName
        let password = values.password
        // login(userName,md5(password)).then(res => {
        //     setCookie('access_token',res.data.accessToken.access_token)
        //     self.loginSuccessHanlder(res.data)
        // })
        let resData = {'accessToken':{'access_token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiYXBwdHlwZSI6MywidXNlclR5cGUiOjEsImV4cCI6MTU1MTU4NDU4NSwibmJmIjoxNTUxMzI1Mzg1fQ.UUjLN_VwD4kyOiApD0Cpw-tKu4w_wfabBLL-fqlsYb4','expires_in':259200000,'token_type':'JWT'},'currentUser':{'created':1544756884000,'id':2,'menuTree':{'name':'菜单'},'mobile':'18788888888','name':'admin','promotionCode':1000001,'sex':1,'type':1,'updated':1545980087000},'neededBindMobile':false}
        setCookie('access_token',resData.accessToken.access_token)
        self.loginSuccessHanlder(resData)
      }
    });
  }

  /**
   * 输入框监听
   * @param {*} keyName 
   * @param {*} e 
   */
  handleInput(keyName,e){
    this.setState({
      [keyName]:e.target.value
    })
  }

  /**
   * 清空输入框
   */
  handleEmpty(){
    this.setState({userName:null})
  }

  /**
   * 显示密码
   */
  handleShowPassword(){
    let {passwordType} = this.state
    this.setState({passwordType:!passwordType})
  }

  /**
   * 密码狂获取焦点是校验手机号码
   */
  handleFocus(){
    let {userName} = this.state;
    if(userName && !isPhoneNumber(userName)) this.setState({errorMessage:'输入的手机号有误'})
  }

  /**
   * 获取焦点，隐藏errorMessage
   */
  handleInputFocus(){
    this.setState({errorMessage:null})
  }

  /**
   * 获取短信验证码
   */
  handleGetCode(){

  }

  /**
   * 输入框切换
   * @param {*} pageStep 
   */
  handleChangePage(pageStep){
    this.setState({pageStep})
  }

  /**
   * 修改密码提交
   */
  handleChangePassword(){
    let self = this;
    this.setState({pageStep:2})
    setTimeout(()=>{
      self.setState({pageStep:0})
    },750)
  }

  loginSuccessHanlder = (loginData) => {
    setLocal('user',JSON.stringify(loginData.currentUser))
    setLocal('menu',JSON.stringify(loginData.currentUser.menuTree))
    window.location.href='/patient'
  }
    
  render(){
    const {userName,password,passwordType,errorMessage,pageStep} = this.state;
    const suffix = userName ? <Icon type='close-circle' onClick={this.handleEmpty.bind(this)} /> : null;
    const passwordSuffix = passwordType ? <Icon type='eye' onClick={this.handleShowPassword.bind(this)} /> : <Icon type='eye-invisible' onClick={this.handleShowPassword.bind(this)}/>
    const showErrorMsg = errorMessage ? errorMessage : null
    const pageStepOne = ()=>{
      return(
        <div>
          <div className='login-title'>乐心RPM医生端管理系统</div>
          <Form className='login-form'>
            <FormItem>
              <Input 
                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder='请输入帐号' 
                suffix={suffix}
                onChange={this.handleInput.bind(this,'userName')}
                onFocus={this.handleInputFocus.bind(this)}
                value={userName}
              />
            </FormItem>
            <FormItem>
              <Input 
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} 
                suffix={passwordSuffix}
                type={passwordType?'password':'text'} 
                placeholder='请输入密码' 
                onChange={this.handleInput.bind(this,'password')}
                onFocus={this.handleFocus.bind(this)}
                value={password}
              />
            </FormItem>
            <p className='err-msg'>{showErrorMsg}</p>
            <FormItem>
              <Button 
                type='primary' 
                className='login-form-button'
                onClick={this.handleSubmit.bind(this)}
              >登录</Button>
            </FormItem>
            <div className='bottom-btn'>
              <span onClick={this.handleChangePage.bind(this,1)}>忘记密码</span>
              {/* <span onClick={this.handleChangePage.bind(this,1)}>注册用户</span> */}
            </div>
          </Form>
        </div>
      )
    }
    const pageStepTwo = () => {
      return(
        <div>
          <div className='login-title'>忘记密码</div>
          <Form className='login-form'>
            <FormItem>
              <Input 
                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder='请输入手机号码' 
                suffix={suffix}
                onChange={this.handleInput.bind(this,'userName')}
                onFocus={this.handleInputFocus.bind(this)}
                value={userName}
              />
            </FormItem>
            <FormItem>
              <Input 
                prefix={<Icon type='key' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='请输入验证码' 
                addonAfter={<span onClick={this.handleGetCode.bind(this)} style={{cursor:'pointer'}}>获取验证码</span>}
              />
            </FormItem>
            <FormItem>
              <Input 
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} 
                suffix={passwordSuffix}
                type={passwordType?'password':'text'} 
                placeholder='请输入新密码，6-16位数字或字母' 
                onChange={this.handleInput.bind(this,'password')}
                onFocus={this.handleFocus.bind(this)}
                value={password}
              />
            </FormItem>
            <p className='err-msg'>{showErrorMsg}</p>
            <FormItem>
              <Button 
                type='primary' 
                className='login-form-button'
                onClick={this.handleChangePassword.bind(this)}
              >提交</Button>
            </FormItem>
            <div className='forget-password' onClick={this.handleChangePage.bind(this,0)}>返回登录</div>
          </Form>
        </div>
      )
    }
    const pageStepThree = () => {
      return(
        <div className='change-pass-success'>
          <div className='success-icon'><Icon type='check-circle' /></div>
          <div className='success-words'>修改密码成功</div>
        </div>
      )
    }
    const pageArray = [pageStepOne(),pageStepTwo(),pageStepThree()]
    return(
      <div className='login-wrap'>
        <div className='login-center'>
          {pageArray[pageStep]}
        </div>
      </div>
    )
  }
}

const Login = Form.create()(FormWrap);
export default withRouter(Login)