import React ,{Component}from 'react';
import {Table,Radio,Button} from 'antd';
import {getPatientDataByDateAndCount} from '../../../apis/healthdata';
import {formatSleepTable} from '../../../utils/format'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class DataTable extends Component{
  state = {
    currentType:1,
    beginDate:new Date().getTime()
  }

  componentWillMount(){
    let {currentType,beginDate} = this.state
    //this.props.patientId
    this.actionGetPatientDataByDateAndCount({beginDate,patientId:4408862,count:20,dataType:currentType})
  }


  handleChangeDataType(e){
    let value = e.target.alue
    let beginDate = new Date().getTime()
    this.actionGetPatientDataByDateAndCount({beginDate,patientId:4408862,count:20,dataType:value})
    this.setState({currentType:value})
  }

  /**
   * 患者数据
   * @param {*} data 
   */
  async actionGetPatientDataByDateAndCount(data){
    let patientData = await getPatientDataByDateAndCount(data)
    if(patientData.data && patientData.code === 200){
      let list = patientData.data.sleepList || []
      let len = list.length
      if(len > 0){
        switch(data.dataType){
          case 1://睡眠
            let beginDate = Date.parse(list[len-1].awakeningTime) + 1
            let formatData = formatSleepTable(list)
            console.log(formatData)
            this.setState({list,beginDate})
            break;
          default:
            return;
        }
        
      }
    } 
  } 

  render(){
    return(
      <>
        <RadioGroup onChange={this.handleChangeDataType.bind(this)} defaultValue={1}>
          <RadioButton value={1}>睡眠</RadioButton>
          <RadioButton value={2}>体重</RadioButton>
          <RadioButton value={3}>步数</RadioButton>
          <RadioButton value={4}>血压</RadioButton>
          <RadioButton value={5}>血糖</RadioButton>
          <RadioButton value={6}>心率</RadioButton>
          <RadioButton value={7}>有氧时长</RadioButton>
        </RadioGroup>
        <Table />
      </>
    )
  }
}

export default DataTable