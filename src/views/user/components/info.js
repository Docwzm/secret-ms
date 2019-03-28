import React, { Component } from 'react';
import {Button,Form,Input,Alert, Modal,message} from 'antd'
import {formItemLayout,tailFormItemLayout,formItemLayoutTitle,tailFormItemLayoutTitle} from '../../../utils/formItemLayout'
import {userInfo,updateDoctorUserInfo,updateAccount} from '../../../apis/user';
import {getValidateCode,sendCode} from '../../../apis/sms';
import '../styles/center.css'
import { isPhoneNumber } from '../../../utils/validate';
import {countDown} from '../../../utils/index';
import configs from '../../../configs/index';
import uuid from 'uuid'
import md5 from 'md5'
const validateCodePath = '/rpmsms_service/verify/getValidateCode'

const FormItem = Form.Item

class Info extends Component{
    state = {
        userInfo:{},
        errorMessage:null,
        successMessage:null,
        changePasswordLoading:false,
        editLoading:false,
        editMobileVisiable:false,
        editMobileErrorMessage:null,
        editMobileSuccessMessage:null,
        mobile:"",
        code:"",
        password:"",
        mobileCodeWords:"获取验证码",
        codeUrl:"",
        updateLoading:false,
        disabled:true
    }
    componentWillMount(){
        this.actionGetUserInfo();
        //this.actionSendCode({mobile:"15919885896",type:0,appType:1,busiType:"",extParam:"",code:"000000"})
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

    handleCancel(){
        this.setState({editMobileVisiable:false})
    }

    handleEditMobile(){
        this.setState({editMobileVisiable:true})
    }

    //修改帐号短信验证码
    handleGetCode(){
        let {mobile,code} = this.state;
        if(mobile && isPhoneNumber(mobile)){
            if(code){
                //获取验证码
                this.actionGetMobileCode({mobile,type:0,appType:1,busiType:'generate_temporary_account',code})
                return
            }
            this.setState({editMobileErrorMessage:'请输入正确的图形验证码'})
            return
        }
        this.setState({editMobileErrorMessage:'请输入正确的手机号'})
    }

    //修改帐号输入框
    handleEditMobileInput(name,e){
        let mobile = e.target.value
        this.setState({[name]:mobile})
        if(isPhoneNumber(mobile)){
            //this.actionGetValidateCode(mobile)
            this.handleMakeUrl(mobile)
        }
    }

    //重新获得焦点是清空错误信息
    handleHideErrorMsg(){
        this.setState({editMobileErrorMessage:null})
    }

    handleMakeUrl(mobile){
        let baseUrl = configs.server + validateCodePath
        let requestId = `${uuid.v1().replace(/-/g,'')}`
        let appType = configs.appType
        let codeUrl =  baseUrl + "?mobile="+mobile+"&requestId="+requestId+"&appType="+appType
        this.setState({codeUrl})
    }

    //提交
    handleUpdateAccount(){
        let {mobile,checkCode,oldPassword} = this.state
        let newMobile = mobile
        if(newMobile && checkCode && oldPassword){
            this.actionUpdateAccount({newMobile,checkCode,oldPassword:md5(oldPassword)})
        }
    }

    handleChangeCode(){
        let {mobile} = this.state
        this.handleMakeUrl(mobile)
    }

    handleEditAble(){
        this.setState({disabled:false})
    }

    /**
     * 用户信息
     */
    async actionGetUserInfo(){
        let info = await userInfo();
        this.setState({userInfo:info.data || {}})
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

    /**
     * 短信验证码
     * @param {*} data 
     */
    async actionGetMobileCode(data){
        let self = this
        let mobileCode = await sendCode(data).catch(err => message.error(err.msg))
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

    /**
     * 图形验证嘛
     * @param {*} mobile 
     */
    async actionGetValidateCode(mobile){
        let code = await getValidateCode(mobile)
        console.log(code)
    }


    /**
     * 短信验证码
     */
    async actionSendCode(data){
        let code = await sendCode(data)
        console.log(code)
    }


    /**
     * 修改帐号
     */
    async actionUpdateAccount(data){
        this.setState({updateLoading:true})
        let account = await updateAccount(data)
        if(account && account.code === 200){
            message.success("帐号修改成功")
            this.setState({updateLoading:false,editMobileVisiable:false})
        }
    }



    render(){
        const {userInfo,errorMessage,successMessage,editLoading,editMobileVisiable,
            editMobileErrorMessage,editMobileSuccessMessage,mobileCodeWords,codeUrl,
            updateLoading,disabled
        } = this.state

        //所属课程
        let topicList = userInfo.topicList || [];
        let topicItem = topicList.map((item,index)=>(<span className="class-item" key={index}>{item.topicName}</span>))

        return(
            <div>
                <Form className="user-center">
                    <FormItem {...formItemLayout} label="姓名" >
                        <Input disabled={disabled} value={userInfo.realName} onChange={this.handleInputUserInfo.bind(this,'realName')}/>
                    </FormItem>
                    <FormItem {...formItemLayout} label="职称" >
                        <Input  disabled={disabled} value={userInfo.jobTitle} onChange={this.handleInputUserInfo.bind(this,'jobTitle')}/>
                    </FormItem>
                    <FormItem {...formItemLayout} label="医院" >
                        <span>{userInfo.hospitalName}</span>
                    </FormItem>
                    <FormItem {...formItemLayout} label="科室" >
                        <Input  disabled={disabled} value={userInfo.departmentName} onChange={this.handleInputUserInfo.bind(this,'departmentName')}/>
                    </FormItem>
                    <FormItem {...formItemLayout} label="地址" >
                        <Input  disabled={disabled} value={userInfo.hospitalAddress} onChange={this.handleInputUserInfo.bind(this,'hospitalAddress')}/>
                    </FormItem>
                    <FormItem {...formItemLayout} label="联系方式" >
                        {userInfo.mobile}
                        <span className="update-mobile" onClick={this.handleEditMobile.bind(this)}>修改手机号</span>
                    </FormItem>
                    <FormItem {...formItemLayout} label='所属课题'>
                        {topicItem && topicItem.length > 0 ? topicItem:"暂无"}
                    </FormItem>
                    <FormItem {...tailFormItemLayout} >
                        {errorMessage ? <Alert message={errorMessage} type="error" /> : null}
                        {successMessage ? <Alert message={successMessage} type="success" /> : null}
                    </FormItem>
                    <FormItem {...tailFormItemLayout} >
                        {disabled?<Button type="primary" onClick={this.handleEditAble.bind(this)}>编辑</Button>:<Button loading={editLoading} type="primary" onClick={this.handleEditUserInfo.bind(this)}>提交</Button>}
                        
                    </FormItem>
                </Form>
                <Modal 
                    title="修改帐号"
                    visible={editMobileVisiable}
                    onCancel={this.handleCancel.bind(this)}
                    footer={false}
                >
                    <Form ref="updateAccountForm" onSubmit={this.handleUpdateAccount.bind(this)}>
                        <FormItem {...formItemLayoutTitle} label="帐号">
                            <Input 
                                placeholder="请输入新手机号码" 
                                onChange={this.handleEditMobileInput.bind(this,'mobile')}
                                onFocus={this.handleHideErrorMsg.bind(this)}
                            />
                        </FormItem>
                        {codeUrl?(
                            <FormItem {...formItemLayoutTitle} label="图形验证码">
                                <Input 
                                    placeholder="请输入图形验证码" 
                                    onChange={this.handleEditMobileInput.bind(this,'code')}
                                    onFocus={this.handleHideErrorMsg.bind(this)}
                                    addonAfter={<img onClick={this.handleChangeCode.bind(this)} style={{display:"block",height:"30px",borderRadius:"5px"}} src={codeUrl} alt=""/>}
                                />
                            </FormItem>
                        ):null}
                        <FormItem {...formItemLayoutTitle} label="短信验证码">
                            <Input 
                                placeholder='请输入短信验证码' 
                                addonAfter={<span onClick={this.handleGetCode.bind(this)} style={{cursor:'pointer'}}>{mobileCodeWords}</span>}
                                onChange={this.handleEditMobileInput.bind(this,'checkCode')}
                                onFocus={this.handleHideErrorMsg.bind(this)}
                            />
                        </FormItem>
                        <FormItem {...formItemLayoutTitle} label="登录密码">
                            <Input 
                                type="password"
                                placeholder="请输入登录密码"
                                onChange={this.handleEditMobileInput.bind(this,'oldPassword')}
                                onFocus={this.handleHideErrorMsg.bind(this)}
                            />
                        </FormItem>
                        <FormItem {...tailFormItemLayoutTitle}>
                            {editMobileErrorMessage ? <Alert message={editMobileErrorMessage} type="error" /> : null}
                            {editMobileSuccessMessage ? <Alert message={editMobileSuccessMessage} type="success" /> : null}
                        </FormItem>
                        <FormItem {...tailFormItemLayoutTitle}>
                            <Button loading={updateLoading} type="primary" onClick={this.handleUpdateAccount.bind(this)}>提交</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default Info