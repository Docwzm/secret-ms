import React, { Component } from 'react';
import {Button,Form,Input,Alert} from 'antd'
import {formItemLayout,tailFormItemLayout} from '../../../utils/formItemLayout'
import {userInfo,updateDoctorUserInfo} from '../../../apis/user';

import '../styles/center.css'
const FormItem = Form.Item

class Info extends Component{
    state = {
        userInfo:{},
        errorMessage:null,
        successMessage:null,
        changePasswordLoading:false,
        editLoading:false
    }
    componentWillMount(){
        this.actionGetUserInfo();
    }
    //修改基本信息输入框
    handleInputUserInfo(name,e){
        let {userInfo} = this.state;
        userInfo[name] = e.target.value;
        let newUserInfo = Object.assign({},userInfo)
        this.setState({userInfo:newUserInfo})
    }


    //提交医生基本信息
    handleEditUserInfo(){
        let {userInfo} = this.state
        this.actionUpdateDoctorUserInfo(userInfo)
    }

    /**
     * 用户信息
     */
    async actionGetUserInfo(){
        let info = await userInfo();
        this.setState({userInfo:info.data})
    }

    /**
     * 修改医生基本信息
     */
    async actionUpdateDoctorUserInfo(data){
        this.setState({editLoading:true})
        let updateDoctor = await updateDoctorUserInfo(data).catch(err => this.setState({errorMessage:err.msg,editLoading:false}))
        if(updateDoctor && updateDoctor.code === 200){
            this.setState({successMessage:"修改成功",editLoading:false})
        }
    }

    render(){
        const {userInfo,errorMessage,successMessage,editLoading} = this.state
        return(
            <Form className="user-center">
                <FormItem {...formItemLayout} label="姓名" >
                    <Input value={userInfo.realName} onChange={this.handleInputUserInfo.bind(this,'realName')}/>
                </FormItem>
                <FormItem {...formItemLayout} label="职称" >
                    <Input value={userInfo.jobTitle} onChange={this.handleInputUserInfo.bind(this,'jobTitle')}/>
                </FormItem>
                <FormItem {...formItemLayout} label="医院" >
                    <Input value={userInfo.hospitalName} onChange={this.handleInputUserInfo.bind(this,'hospitalName')}/>
                </FormItem>
                <FormItem {...formItemLayout} label="科室" >
                    <Input value={userInfo.departmentName} onChange={this.handleInputUserInfo.bind(this,'departmentName')}/>
                </FormItem>
                <FormItem {...formItemLayout} label="地址" >
                    <Input value={userInfo.hospitalAddress} onChange={this.handleInputUserInfo.bind(this,'hospitalAddress')}/>
                </FormItem>
                <FormItem {...formItemLayout} label="联系方式" >
                    {userInfo.mobile}
                    <span className="update-mobile">修改手机号</span>
                </FormItem>
                <FormItem {...formItemLayout} label='所属课题'>
                    <span className="class-item">课题一</span>
                    <span className="class-item">课题二</span>
                    <span className="class-item">课题三</span>
                    <span className="class-item">课题四</span>
                </FormItem>
                <FormItem {...tailFormItemLayout} >
                    {errorMessage ? <Alert message={errorMessage} type="error" /> : null}
                    {successMessage ? <Alert message={successMessage} type="success" /> : null}
                </FormItem>
                <FormItem {...tailFormItemLayout} >
                    <Button loading={editLoading} type="primary" onClick={this.handleEditUserInfo.bind(this)}>编辑</Button>
                </FormItem>
            </Form>
        )
    }
}

export default Info