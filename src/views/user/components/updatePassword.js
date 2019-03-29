import React, { Component } from 'react';
import {Button,Form,Input,Alert} from 'antd'
import {formItemLayout,tailFormItemLayout} from '../../../utils/formItemLayout'
import {updateUserPassword,userInfo} from '../../../apis/user';
import {isPassword} from '../../../utils/validate';
import {delCookie} from '../../../utils/index';
import md5 from 'md5';
import '../styles/center.css'

const FormItem = Form.Item

class UserCenter extends Component{
    state = {
        userInfo:{},
        errorMessage:null,
        successMessage:null,
        changePasswordLoading:false,
        editLoading:false,
        disabled:true
    }

    componentWillMount(){
        this.actionGetUserInfo();
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

    //校验新密码
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

    //修改密码
    handleUpdatePassword(){
        let {oldPassword,newPassword,userInfo} = this.state;
        if(oldPassword && isPassword(oldPassword) && newPassword && isPassword(newPassword)){
            this.actionUpdateUserPassword({
                newPassword:md5(newPassword),
                oldPassword:md5(oldPassword),
                username:userInfo.mobile
            })
            return
        }
        this.setState({errorMessage:"请输入6-16位密码"})
    }

    handleEdit(){
        this.setState({disabled:false})
    }

    handleCancel(){
        this.setState({disabled:true,errorMessage:null})
    }

    /**
     * 用户信息
     */
    async actionGetUserInfo(){
        let info = await userInfo();
        this.setState({userInfo:info.data || {}})
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
            self.setState({changePasswordLoading:false,successMessage:"修改密码成功，请使用新密码登录",disabled:true})
            setTimeout(()=>{
                delCookie("accessToken")
                delCookie("session")
                window.location.href = '/rpm/#/login'
            },2000)
        }
    }

    render(){
        const {userInfo,errorMessage,changePasswordLoading,successMessage,disabled} = this.state
        return(
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
                        disabled={disabled}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="新密码">
                    <Input 
                        placeholder="请输入新密码"
                        type="password"
                        onBlur={this.handleCheckPassword.bind(this)}
                        onFocus={this.handleFocusInput.bind(this)}
                        onChange={this.handlePasswordInput.bind(this,'newPassword')}
                        disabled={disabled}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="确认新密码">
                    <Input 
                        placeholder="请再次输入新密码"
                        type="password"
                        onBlur={this.handleCheckPasswordTwice.bind(this)}
                        onFocus={this.handleFocusInput.bind(this)}
                        onChange={this.handlePasswordInput.bind(this,'newPassword2')}
                        disabled={disabled}
                    />
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    {errorMessage ? <Alert message={errorMessage} type="error" /> : null}
                    {successMessage ? <Alert message={successMessage} type="success" /> : null}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    {disabled?<Button type="primary" onClick={this.handleEdit.bind(this)}>编辑</Button>:<Button loading={changePasswordLoading} type="primary" onClick={this.handleUpdatePassword.bind(this)}>提交</Button>}
                    {disabled?null:<Button onClick={this.handleCancel.bind(this)} type="default" style={{marginLeft:"20px"}}>取消</Button>}
                </FormItem>
            </Form>
        )
    }
}

export default UserCenter