import React, { Component } from 'react';
import {Tabs} from 'antd'
import PageHeader from '../../components/PageHeader';
import Info from './components/info'

const TabPane = Tabs.TabPane;

class UserCenter extends Component{
    state = {
    }

    componentWillMount(){
    }

    render(){
        return(
            <div>
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