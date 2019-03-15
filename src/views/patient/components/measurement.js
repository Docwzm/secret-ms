import React ,{Component}from 'react';
import {Table} from 'antd';
import {getPatientPlan} from '../../../apis/plan'
import { switchEnum } from '../../../utils/enum';

class Measurement extends Component{
  state={
    measurementPlan:{}
  }

  componentWillMount(){
    this.actionGetMeasurementPlan(19,3)
  }

  /**
   * 获取测量计划
   * @param {*} patientId 
   * @param {*} type 
   */
  async actionGetMeasurementPlan(patientId,type){
    let measurementPlan = await getPatientPlan(patientId,type)
    this.setState({measurementPlan:measurementPlan.data})
  }

  render(){
    const {measurementPlan} = this.state
    const data = measurementPlan.list || [];

    const columns = [{
      title: '序号',
      dataIndex: 'num',
      align:"center"
    }, {
      title: '测量类型',
      render:row=>(switchEnum(row.type,'measurementType')),
      align:"center"
    }, {
      title: '频率',
      render:row=>(switchEnum(row.frequency,'frequency')),
      align:"center"
    }];

    const header = () => (
      <header>
        <span style={{marginRight:"100px"}}>测量方案：<strong>{measurementPlan.name}</strong></span>剩余时间：<strong>{measurementPlan.expireDate}</strong>
      </header>
    )
    return(
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => header()}
        pagination={false}
        rowKey={record=>record.id}
      />
    )
  }
}

export default Measurement