import React, { Component } from 'react';
import {Tabs} from 'antd'
import PageHeader from '../../components/PageHeader';
import {Info,UpdatePassword} from './components/index'
import './styles/center.less'

const TabPane = Tabs.TabPane;

class UserCenter extends Component{
    state = {
    }

    componentWillMount(){
    }

    render(){
        return(
            <div>
                <PageHeader title='个人中心'/>
                <Tabs defaultActiveKey="1" animated={false} type="card" >
                    <TabPane tab="基本信息" key="1">
                       <Info />
                    </TabPane>
                    {/* <TabPane tab="修改密码" key="3">
                       <UpdatePassword />
                    </TabPane> */}
                </Tabs>
            </div>
        )
    }
}

export default UserCenter