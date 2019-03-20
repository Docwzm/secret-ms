import React, { Component } from 'react';
import {Tabs} from 'antd'
import PageHeader from '../../components/PageHeader';
import {updateUserPassword} from '../../apis/user';
import {isPassword} from '../../utils/validate';
import {delCookie} from '../../utils/index';
import {Info,UpdatePassword,Certification} from './components/index'
import md5 from 'md5';
import './styles/center.css'

const TabPane = Tabs.TabPane;



class UserCenter extends Component{
    state = {
        userInfo:{},
        errorMessage:null,
        successMessage:null,
        changePasswordLoading:false,
        editLoading:false
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
                window.location.href = '/rpm/#/login'
            },2000)
        }
    }

    render(){
        return(
            <div>
                <PageHeader title='个人中心'/>
                <Tabs defaultActiveKey="1" animated={false} type="card" >
                    <TabPane tab="基本信息" key="1">
                       <Info />
                    </TabPane>
                    <TabPane tab="权威认证" key="2">
                       <Certification />
                    </TabPane>
                    <TabPane tab="修改密码" key="3">
                       <UpdatePassword />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default UserCenter