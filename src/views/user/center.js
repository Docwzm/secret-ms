import React, { Component } from 'react';
import {Tabs,Button,Form,Input,Alert} from 'antd'
import PageHeader from '../../components/PageHeader';
import {formItemLayout,tailFormItemLayout} from '../../utils/formItemLayout'
import {userInfo ,updateUserPassword} from '../../apis/user';
import {isPassword} from '../../utils/validate';
import {delCookie} from '../../utils/index';
import md5 from 'md5';
import './styles/center.css'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item

class UserCenter extends Component{
    state = {
        userInfo:{},
        errorMessage:null,
        successMessage:null,
        changePasswordLoading:false
    }
    componentWillMount(){
        this.actionGetUserInfo();
    }

    handleTabsCallback(){

    }

    handleGetCode(){

    }

    //检验密码
    handleCheckPassword(e){
        let value = e.target.value;
        if(!isPassword(value)){
            this.setState({errorMessage:"请输入6-16位密码"})
        }
    }

    handleFocusInput(){
        this.setState({errorMessage:null})
    }

    handleCheckPasswordTwice(e){
        let {newPassword} = this.state
        let newPassword2 = e.target.value
        if(newPassword !== newPassword2){
            this.setState({errorMessage:"两次输入的密码不一致"})
        }
    }

    //修改密码输入框
    handlePasswordInput(name,e){
        let value = e.target.value;
        this.setState({[name]:value})
    }

    handleUpdatePassword(){
        let {oldPassword,newPassword,userInfo} = this.state;
        if(isPassword(oldPassword) && isPassword(newPassword)){
            this.actionUpdateUserPassword({
                newPassword:md5(newPassword),
                oldPassword:md5(oldPassword),
                username:userInfo.mobile
            })
            return
        }
        this.setState({errorMessage:"请输入6-16位密码"})
    }

    /**
     * 用户信息
     */
    async actionGetUserInfo(){
        let info = await userInfo();
        this.setState({userInfo:info.data})
    }

    /**
     * 修改密码
     * @param {*} data 
     */
    async actionUpdateUserPassword(data){
        let self = this;
        this.setState({changePasswordLoading:true})
        let updatePassword = await updateUserPassword(data).catch(err=>{
            self.setState({changePasswordLoading:false,errorMessage:err.msg})
        })
        if(updatePassword && updatePassword.code === 200){
            self.setState({changePasswordLoading:false,successMessage:"修改密码成功，请使用新密码登录"})
            setTimeout(()=>{
                delCookie("accessToken")
                delCookie("session")
                window.location.href = '/#/login'
            },2000)
        }
    }

    render(){
        const {userInfo,errorMessage,changePasswordLoading,successMessage} = this.state
        const userBaseInfo = () => (
            <Form className="user-center">
                <FormItem {...formItemLayout} label="姓名" >
                    <Input value={userInfo.realName}/>
                </FormItem>
                <FormItem {...formItemLayout} label="职称" >
                    <Input value={userInfo.jobTitle} />
                </FormItem>
                <FormItem {...formItemLayout} label="医院" >
                    <Input value={userInfo.hospitalName}/>
                </FormItem>
                <FormItem {...formItemLayout} label="科室" >
                    <Input value={userInfo.departmentName}/>
                </FormItem>
                <FormItem {...formItemLayout} label="地址" >
                    <Input value={userInfo.hospitalAddress}/>
                </FormItem>
                <FormItem {...formItemLayout} label="联系方式" >
                    <Input value={userInfo.mobile}/>
                </FormItem>
                <FormItem {...formItemLayout} label='所属课题'>
                    <span className="class-item">课题一</span>
                    <span className="class-item">课题二</span>
                    <span className="class-item">课题三</span>
                    <span className="class-item">课题四</span>
                </FormItem>
                <FormItem {...formItemLayout} label='证书'>
                    <div className="user-center-item">
                        <span className="user-image-wrap">
                            <div className="image-box">
                                <img src={userInfo.doctorQCURL} alt=''/>
                            </div>
                            <div className="image-box">
                                <img src={userInfo.doctorLicenseURL} alt=''/>
                            </div>
                        </span>
                    </div>
                </FormItem>
                <FormItem {...tailFormItemLayout} >
                    <Button type="primary">编辑</Button>
                </FormItem>
            </Form>
        )

        const editAccount = () => (
            <Form className="user-center">
                <FormItem {...formItemLayout} label="帐号">
                    <Input placeholder="请输入新手机号码" />
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
        )

        const editPassword = () => (
            <Form className="user-center">
                <FormItem {...formItemLayout} label="帐号">
                    <span>{userInfo.mobile}</span>
                </FormItem>
                <FormItem {...formItemLayout} label="原密码">
                    <Input 
                        placeholder='请输入原密码' 
                        type="password"
                        onChange={this.handlePasswordInput.bind(this,'oldPassword')}
                        onBlur={this.handleCheckPassword.bind(this)}
                        onFocus={this.handleFocusInput.bind(this)}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="新密码">
                    <Input 
                        placeholder="请输入新密码"
                        type="password"
                        onBlur={this.handleCheckPassword.bind(this)}
                        onFocus={this.handleFocusInput.bind(this)}
                        onChange={this.handlePasswordInput.bind(this,'newPassword')}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="确认新密码">
                    <Input 
                        placeholder="请再次输入新密码"
                        type="password"
                        onBlur={this.handleCheckPasswordTwice.bind(this)}
                        onFocus={this.handleFocusInput.bind(this)}
                        onChange={this.handlePasswordInput.bind(this,'newPassword2')}
                    />
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    {errorMessage ? <Alert message={errorMessage} type="error" /> : null}
                    {successMessage ? <Alert message={successMessage} type="success" /> : null}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button loading={changePasswordLoading} type="primary" onClick={this.handleUpdatePassword.bind(this)}>提交</Button>
                </FormItem>
            </Form>
        )

        return(
            <div>
                <PageHeader title='个人中心'/>
                <Tabs 
                    defaultActiveKey="1" 
                    onChange={this.handleTabsCallback.bind(this)}
                    animated={false}
                    type="card"
                >
                    <TabPane tab="基本信息" key="1">
                        {userBaseInfo()}
                    </TabPane>
                    <TabPane tab="修改帐号" key="2">
                        {editAccount()}
                    </TabPane>
                    <TabPane tab="修改密码" key="3">
                        {editPassword()}
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default UserCenter