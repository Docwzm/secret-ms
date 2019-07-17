import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { setLocal,setCookie } from '@/utils/index'
import { isPhoneNumber } from '@/utils/validate'
import { withRouter } from 'react-router-dom';
import { login,getMenu } from '@/apis/user'
import { connect } from 'react-redux'
import actions from '../../redux/actions'
import './styles/login.scss'

const FormItem = Form.Item;

class FormWrap extends Component {

  state = {
    username: '',
    password: '',
    passwordType: true,
    errorMessage: '',
    submitLoading: false
  }

  handleSubmit() {
    let self = this;
    let { username, password } = this.state
    if (username && password) {
      self.setState({ submitLoading: true })
      login({ username, password }).then(res => {
        self.setState({ submitLoading: false });
        self.loginSuccessHanlder(res.data)
      }).catch(err => {
        self.setState({ errorMessage: err.msg, submitLoading: false })
      })
    } else {
      this.setState({ errorMessage: '请输入帐号和密码' })
    }
  }

  //输入框监听
  handleInput(keyName, e) {
    this.setState({
      [keyName]: e.target.value
    })
  }

  //清空输入框
  handleEmpty() {
    this.setState({ username: null })
  }

  handleClearPassword() {
    this.setState({
      password: null
    })
  }

  //显示密码
  handleShowPassword() {
    let { passwordType } = this.state
    this.setState({ passwordType: !passwordType })
  }

  //密码框获取焦点是校验手机号码
  handleFocus() {
    let { username } = this.state;
    if (username && !isPhoneNumber(username)) {
      // this.setState({ errorMessage: '输入的手机号有误' })
    } else {
      this.setState({ errorMessage: null })
    }
  }

  //获取焦点，隐藏errorMessage
  handleInputFocus() {
    this.setState({ errorMessage: null })
  }


  loginSuccessHanlder = (loginData) => {
    setCookie('_secret_token',loginData.token);
    setLocal('_secret_user', JSON.stringify(loginData));
    // this.actionGetMenu()
    console.log('....')
    this.props.setUser(loginData)
    setTimeout(() => {
      this.props.history.push('/')
    },100)
  }

  /**
   * 获取菜单
   */
  async actionGetMenu() {
    let getmenu = await getMenu()
    let menus = getmenu.data.menus || []
    setLocal("menus", JSON.stringify(menus))
    let firstMenu = menus[0].pageUrl;
    window.location.href = '/secretManage/#' + firstMenu
  }


  render() {
    const { username, password, passwordType, errorMessage, submitLoading } = this.state;
    const suffix = username ? <Icon type='close-circle' onClick={this.handleEmpty.bind(this)} /> : null;

    const passwordSuffix = <span>{password ? <Icon type='close-circle' onClick={this.handleClearPassword.bind(this)} style={{ marginRight: "10px" }} /> : null}{passwordType ? <Icon type='eye' onClick={this.handleShowPassword.bind(this)} /> : <Icon type='eye-invisible' onClick={this.handleShowPassword.bind(this)} />}</span>

    const showErrorMsg = errorMessage ? errorMessage : null


    const pageStepOne = () => {
      return (
        <div>
          <div className='login-title'>管理平台</div>
          <Form className='login-form'>
            <FormItem>
              <Input
                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='请输入帐号'
                suffix={suffix}
                onChange={this.handleInput.bind(this, 'username')}
                onFocus={this.handleInputFocus.bind(this)}
                value={username}
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={passwordSuffix}
                type={passwordType ? 'password' : 'text'}
                placeholder='请输入密码'
                onChange={this.handleInput.bind(this, 'password')}
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
                loading={submitLoading}
              >登录</Button>
            </FormItem>
            <div className='bottom-btn'>
              {/* <span onClick={this.handleChangePage.bind(this,1)}>忘记密码</span> */}
              {/* <span onClick={this.handleChangePage.bind(this,1)}>注册用户</span> */}
            </div>
          </Form>
        </div>
      )
    }
    return (
      <div className='login-wrap'>
        <div className='login-center'>
          {pageStepOne()}
        </div>
      </div>
    )
  }
}

const Login = Form.create()(FormWrap);
export default withRouter(connect(null,{
  setUser:actions.setUser
})(Login))
