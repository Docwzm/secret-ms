import React, { Component } from 'react';
import { Form, Icon, Input, Button, message} from 'antd';
import {login,getMobileCode} from '../../apis/user'
import md5 from 'md5'
import './styles/login.css'
import {setLocal, getLocal,removeLocal,countDown} from '../../utils/index'
import {isPhoneNumber} from '../../utils/validate'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import actions from '../../redux/actions'
import configs from '../../configs/index';
import uuid from 'uuid'
const validateCodePath = '/rpmsms_service/verify/getValidateCode'


const FormItem = Form.Item;

class FormWrap extends Component {

  state = {
    loginName:'',
    password:'',
    passwordType:true,
    errorMessage:'',
    pageStep:0,
    showCaptcha:false,
    submitLoading:false,
    mobileCodeWords:"获取验证码",
    mobileCodeInterval:60,
    sendCode:false,
    codeUrl:"",
    checkCode:""
  }
   
  handleSubmit(){
    let self = this;
    let {loginName,password,checkCode} = this.state
    if(loginName &&  password){
      self.setState({submitLoading:true})
      login({loginName,password:md5(password),checkCode}).then(res => {
        self.setState({submitLoading:false});
        self.loginSuccessHanlder(res.data)
      }).catch(err => {
        self.setState({errorMessage:err.msg,submitLoading:false})
        if(err.code === 401){
          setLocal('loginCaptcha',true)
          //三次以上错误，显示图形验证码
          self.actionGetValidateCode()
          self.setState({showCaptcha:true})
        }
      })
    }else{
      this.setState({errorMessage:'请输入帐号和密码'})
    }
  }

  //输入框监听
  handleInput(keyName,e){
    this.setState({
      [keyName]:e.target.value
    })
    if(isPhoneNumber(e.target.value)){
      this.handleMakeUrl(e.target.value)
    }
  }

  //清空输入框
  handleEmpty(){
    this.setState({loginName:null})
  }

  //显示密码
  handleShowPassword(){
    let {passwordType} = this.state
    this.setState({passwordType:!passwordType})
  }

  //密码框获取焦点是校验手机号码
  handleFocus(){
    let {loginName} = this.state;
    if(loginName && !isPhoneNumber(loginName)){
      this.setState({errorMessage:'输入的手机号有误'})
    }else{
      this.setState({errorMessage:null})
    }
  }

  //获取焦点，隐藏errorMessage
  handleInputFocus(){
    this.setState({errorMessage:null})
  }

  //获取短信验证码
  handleGetCode(){
    let {mobile,errorMessage,sendCode} = this.state
    if(mobile && !errorMessage && !sendCode){
      this.actionGetMobileCode({mobile,type:"ForgetPassword"})
    }
  }

  //输入框切换
  handleChangePage(pageStep){
    this.setState({pageStep})
  }

  //修改密码提交
  handleChangePassword(){
    let self = this;
    this.setState({pageStep:2})
    setTimeout(()=>{
      self.setState({pageStep:0})
    },750)
  }

  loginSuccessHanlder = (loginData) => {
    //im登陆
    // setCookie('access_token',loginData.rpmAccessToken);
    setLocal('user',JSON.stringify(loginData));
    removeLocal('loginCaptcha');
    this.props.resetImData();
    window.location.href='/rpm/#/patient'
  }

  //校验手机号
  handleCheckMobile(){
    let {mobile} = this.state;
    if(mobile && !isPhoneNumber(mobile)){
      this.setState({errorMessage:'输入的手机号有误'})
    }else{
      this.setState({errorMessage:null})
    }
  }

  //图像验证码
  handleMakeUrl(mobile){
    let baseUrl = configs.server + validateCodePath
    let requestId = `${uuid.v1().replace(/-/g,'')}`
    let appType = configs.appType
    let codeUrl =  baseUrl + "?mobile="+mobile+"&requestId="+requestId+"&appType="+appType
    this.setState({codeUrl})
  }

  //更新图形验证码
  handleChangeCode(){
    let {mobile} = this.state
    this.handleMakeUrl(mobile)
  }
 
  /**
   * 短信验证码
   * @param {*} data 
   */
  async actionGetMobileCode(data){
    let self = this
    let mobileCode = await getMobileCode(data).catch(err => message.error(err.msg))
    if(mobileCode && mobileCode.code === 200){
      countDown(30,(res)=>{
        if(res === 0){
          self.setState({
            mobileCodeWords:"获取验证码",
            sendCode:false
          })
          return
        }
        self.setState({
          mobileCodeWords:res+"s",
          sendCode:true
        })
      })
    }
  }
    
  render(){
    const {loginName,password,passwordType,errorMessage,pageStep,showCaptcha,submitLoading,mobile,mobileCodeWords,codeUrl,checkCode} = this.state;
    const suffix = loginName ? <Icon type='close-circle' onClick={this.handleEmpty.bind(this)} /> : null;
    const passwordSuffix = passwordType ? <Icon type='eye' onClick={this.handleShowPassword.bind(this)} /> : <Icon type='eye-invisible' onClick={this.handleShowPassword.bind(this)}/>
    const showErrorMsg = errorMessage ? errorMessage : null
    const captcha = () => {
      if((showCaptcha || getLocal('loginCaptcha')) && codeUrl){
        return(
          <FormItem>
            <Input 
              prefix={<Icon type='picture' style={{ color: 'rgba(0,0,0,.25)' }} />} 
              addonAfter={<img onClick={this.handleChangeCode.bind(this)} style={{display:"block",height:"30px",borderRadius:"5px"}} src={codeUrl} alt=""/>}
              placeholder='请输入验证码' 
              onChange={this.handleInput.bind(this,'checkCode')}
              onFocus={this.handleFocus.bind(this)}
              value={checkCode}
            />
          </FormItem>
        )
      }
      
    }

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
                onChange={this.handleInput.bind(this,'loginName')}
                onFocus={this.handleInputFocus.bind(this)}
                value={loginName}
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
            {captcha()}
            <p className='err-msg'>{showErrorMsg}</p>
            <FormItem>
              <Button 
                type='primary' 
                className='login-form-button'
                onClick={this.handleSubmit.bind(this)}
                loading={submitLoading}
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
                onChange={this.handleInput.bind(this,'mobile')}
                onFocus={this.handleInputFocus.bind(this)}
                onBlur={this.handleCheckMobile.bind(this)}
                value={mobile}
              />
            </FormItem>
            <FormItem>
              <Input 
                prefix={<Icon type='key' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='请输入验证码' 
                addonAfter={<span onClick={this.handleGetCode.bind(this)} style={{cursor:'pointer'}}>{mobileCodeWords}</span>}
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
export default withRouter(connect(null,{
  resetImData:actions.resetImData
})(Login))
