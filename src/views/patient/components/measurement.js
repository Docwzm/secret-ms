import React ,{Component}from 'react';
import {Table} from 'antd';
import {getPatientPlan} from '../../../apis/plan'
import { switchEnum } from '../../../utils/enum';
import dayjs from 'dayjs'

class Measurement extends Component{
  state={
    measurementPlan:{},
    tableLoading:false
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
    this.setState({tableLoading:true})
    let measurementPlan = await getPatientPlan(patientId,type)
    
    this.setState({measurementPlan:measurementPlan.data,tableLoading:false})
  }

  render(){
    const {measurementPlan,tableLoading} = this.state
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
        <span style={{marginRight:"100px"}}>测量方案：<strong>{measurementPlan.name}</strong></span>剩余时间：<strong>{dayjs(measurementPlan.expireDate).format('YYYY/MM/DD')}</strong>
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
        loading={tableLoading}
      />
    )
  }
}

export default Measurement