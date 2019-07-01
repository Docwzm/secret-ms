import React, { Component } from 'react';
import {Form,Input} from 'antd'
import {getLocal} from '@/utils';

const FormItem = Form.Item

class Info extends Component{
    state = {
        userInfo:{}
    }
    componentWillMount(){
        // this.actionGetUserInfo();
        let user = getLocal('_secret_user')
        if(user){
            user = JSON.parse(user);
            this.setState({
                userInfo:user
            })
        }
    }
    /**
     * 用户信息
     */
    // async actionGetUserInfo(){
    //     let info = await userInfo();
    //     this.setState({userInfo:info.data || {}})
    // }

    render(){
        const {
            userInfo
        } = this.state

        return(
            <Form className="user-center">
                <FormItem label="账号" >
                    <Input disabled={true} value={userInfo.username} />
                </FormItem>
            </Form>
        )
    }
}

export default Info