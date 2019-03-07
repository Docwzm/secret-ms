import React ,{Component}from 'react';
import {Table} from 'antd'

class Measurement extends Component{
  render(){
    const data = [{
      key: '1',
      name: '血压',
      money: '一日三次',
    }, {
      key: '2',
      name: '血糖',
      money: '一日两次'
    }];

    const columns = [{
      title: '序号',
      dataIndex: 'key',
    }, {
      title: '测量类型',
      dataIndex: 'name',
    }, {
      title: '频率',
      dataIndex: 'money',
    }];

    const header = () => (
      <><span style={{marginRight:"100px"}}>测量方案：<strong>糖尿病患者测量管理</strong></span>剩余时间：<strong>2.5个月</strong></>
    )
    return(
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => header()}
        pagination={false}
      />
    )
  }
}

export default Measurement