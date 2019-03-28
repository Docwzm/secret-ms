import React ,{Component}from 'react';
import {Table} from 'antd';
import {getPatientPlan} from '../../../apis/plan'
import { switchEnum } from '../../../utils/enum';

class Measurement extends Component{
  state={
    measurementPlan:{},
    tableLoading:false
  }

  componentWillMount(){
    this.actionGetMeasurementPlan(this.props.patientId,3)
  }

  handleExpireDay(ms){
    let now = new Date();
    const ONE_DAY = 24 * 60 * 60 * 1000
    if(ms <= now){
      return "已过期"
    }
    return parseInt((ms-now)/ONE_DAY).toString() + "天"
  }

  /**
   * 获取测量计划
   * @param {*} patientId 
   * @param {*} type 
   */
  async actionGetMeasurementPlan(patientId,type){
    let self = this
    this.setState({tableLoading:true})
    let measurementPlan = await getPatientPlan(patientId,type).catch(err => {
      self.setState({tableLoading:false})
      return
    })
    if(measurementPlan){
      this.setState({measurementPlan:measurementPlan.data,tableLoading:false})
    }
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
        <span style={{marginRight:"100px"}}>测量方案：<strong>{measurementPlan.name}</strong></span>剩余时间：<strong>{measurementPlan.remainTime}天</strong>
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