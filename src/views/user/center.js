import React, { Component } from 'react';
import {Tabs,Row,Col,Button,Form,Input} from 'antd'
import PageHeader from '../../components/PageHeader';
import {formItemLayout,tailFormItemLayout} from '../../utils/formItemLayout'
import './styles/center.css'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item

class UserCenter extends Component{

    handleTabsCallback(){

    }

    handleGetCode(){

    }

    render(){
        const userBaseInfo = () => (
            <Form className="user-center">
                <FormItem {...formItemLayout} label="姓名" >
                    <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="职称" >
                    <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="医院" >
                    <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="科室" >
                    <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="地址" >
                    <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="联系方式" >
                    <Input />
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
                            <div className="image-box"></div>
                            <div className="image-box"></div>
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
        )

        const editPassword = () => (
            <Form className="user-center">
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