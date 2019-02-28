import React, { Component } from 'react';
import { Form, Icon, Input, Button} from 'antd';
import {login} from '../../apis/user'
import md5 from 'md5'
import "./styles/login.css"
import {setCookie,setLocal} from '../../utils/index'
import { withRouter } from 'react-router-dom';
const FormItem = Form.Item;

class FormWrap extends Component {
  state = {
    userName:"admin",
    password:"admin"
  }
    
  handleSubmit = (e) => {
    e.preventDefault();
    let self = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let userName = values.userName
        let password = values.password
        // login(userName,md5(password)).then(res => {
        //     setCookie("access_token",res.data.accessToken.access_token)
        //     self.loginSuccessHanlder(res.data)
        // })
        let resData = {"accessToken":{"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiYXBwdHlwZSI6MywidXNlclR5cGUiOjEsImV4cCI6MTU1MTU4NDU4NSwibmJmIjoxNTUxMzI1Mzg1fQ.UUjLN_VwD4kyOiApD0Cpw-tKu4w_wfabBLL-fqlsYb4","expires_in":259200000,"token_type":"JWT"},"currentUser":{"created":1544756884000,"id":2,"menuTree":{"name":"菜单"},"mobile":"18788888888","name":"admin","promotionCode":1000001,"sex":1,"type":1,"updated":1545980087000},"neededBindMobile":false}
        setCookie("access_token",resData.accessToken.access_token)
        self.loginSuccessHanlder(resData)
      }
    });
  }

  loginSuccessHanlder = (loginData) => {
    setLocal("user",JSON.stringify(loginData.currentUser))
    setLocal('menu',JSON.stringify(loginData.currentUser.menuTree))
    window.location.href='/dashboard'
  }
    
  render(){
    const { getFieldDecorator } = this.props.form;
    const {userName,password} = this.state
    return(
      <div className='login-wrap'>
        <div className='login-center'>
          <div className='login-title'>乐心RPM医生端管理系统</div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', { initialValue: userName },{
                  rules: [{ required: true, message: '请输入帐号' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入帐号" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password',{ initialValue: password }, {
                  rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </FormItem>
            <a>忘记密码</a>
          </Form>
        </div>
      </div>
    )
  }
}

const Login = Form.create()(FormWrap);
export default withRouter(Login)