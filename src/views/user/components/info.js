import React, { Component } from 'react';
import {Form,Input} from 'antd'
import {userInfo} from '../../../apis/user';
import '../styles/center.less'

const FormItem = Form.Item

class Info extends Component{
    state = {
        userInfo:{}
    }
    componentWillMount(){
        // this.actionGetUserInfo();
    }
    /**
     * 用户信息
     */
    async actionGetUserInfo(){
        let info = await userInfo();
        this.setState({userInfo:info.data || {}})
    }

    render(){
        const {
            userInfo
        } = this.state

        return(
            <Form className="user-center">
                <FormItem label="账号" >
                    <Input disabled={true} value={userInfo.realName} />
                </FormItem>
            </Form>
        )
    }
}

export default Info