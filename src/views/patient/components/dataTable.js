import React ,{Component}from 'react';
import {Radio,Empty } from 'antd';
import {getPatientDataByDateAndCount} from '../../../apis/healthdata';
import {formatTable} from '../../../utils/format'
import {switchEnum} from '../../../utils/enum'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class DataTable extends Component{
  state = {
    currentType:1,
    beginDate:new Date().getTime(),
    tableData:[],
    measureType:"sleepList"
  }

  componentWillMount(){
    let {currentType,beginDate} = this.state
    let tableType = switchEnum(currentType,'measureListType')
    this.setState({measureType:tableType})
    //this.props.patientId
    this.actionGetPatientDataByDateAndCount({beginDate,patientId:this.props.patientId,count:100,dataType:currentType},tableType)
  }


  handleChangeDataType(e){
    let value = e.target.value
    let beginDate = new Date().getTime()
    let tableType = switchEnum(value,'measureListType')
    this.setState({measureType:tableType})
    this.actionGetPatientDataByDateAndCount({beginDate,patientId:this.props.patientId,count:100,dataType:value},tableType)
    this.setState({currentType:value})
  }

  handleMakeTimeKey(tableType){
    let timeKey = ''
    switch (tableType) {
      case "sleepList":
          timeKey = "awakeningTime";
          break;
      case "weightList":
          timeKey = "measurementDate";
          break;
      case "pedometerList":
          timeKey = "measurementTime";
          break;
      default:
          timeKey = "measurementDate";
          break;
    }
    return timeKey
  }

  /**
   * 患者数据
   * @param {*} data 
   */
  async actionGetPatientDataByDateAndCount(data,tableType){
    let patientData = await getPatientDataByDateAndCount(data)
    let timeKey = this.handleMakeTimeKey(tableType)
    if(patientData.data && patientData.code === 200){
      let list = patientData.data[tableType] || []
      let len = list.length
      if(len > 0){
        let beginDate = Date.parse(list[len-1][timeKey]) + 1
        let data = formatTable(list,timeKey)
        this.setState({list,beginDate,tableData:data})
      }else{
        this.setState({tableData:[]})
      }
    } 
  }  

  render(){
    const {tableData, measureType} = this.state
    const typeTemplate = {
      sleepList:{
        wording:['浅睡时长','深睡时长','清醒时长','睡眠时长'],
        key:['shallowSleep','deepSleep','awakening','totalSleepTime'],
        unit:"分钟"
      },
      weightList:{
        wording:["BMI","体重","身高"],
        key:["bmi",'weight','height'],
        unit:"千克/厘米"
      },
      pedometerList:{
        wording:["步数"],
        key:['step'],
        unit:"步"
      },
      bloodPressureList:{
        wording:["收缩压","舒张压"],
        key:["systolicPressure","diastolicPressure"],
        unit:"mmHg"
      },
      bloodSugarList:{
        wording:["血糖浓度","用餐状态"],
        key:["glucoseConcentration","mealPeroidName"],
        unit:"mmol/L"
      },
      heartRateList:{
        wording:["心率"],
        key:["silentHeartRate"],
        unit:"次"
      },
      aerobicsTimeList:{
        wording:["中等强度","较大强度"],
        key:["exetimeIf","exetimeCpm"],
        unit:""
      }
    }

    const dataItem = (data) => {
      return data.map((item,index)=>{
        return(
          <div className="data" key={index}>
            {typeTemplate[measureType].key.map((key,index)=>(<span key={index}>{item[key]}</span>))}
            <span>{typeTemplate[measureType].unit}</span>
          </div>
        )
      })
    }
    const listItem = (list) =>{
      return list.map((item,index)=> {
        return(
          <div className="list-item" key={index}>
            <div className="day-box">
              <div className="day">{item.day}</div>
              <div className="data-box">
                {dataItem(item.data)}
              </div>
            </div>
          </div>
        )
      })
    }

    const yearItem = tableData.map((item,index)=>{
      return(
        <div>
          <div className="header">
            <span>年份</span>
            <span>日期</span>
            {typeTemplate[measureType].wording.map((item,index)=>(<span key={index}>{item}</span>))}
            <span>单位</span>
          </div>
          <div className="year-box" key={index}>
            <div className='year'>{item.year}</div>
            <div className="list-box">{listItem(item.list)}</div>
          </div>
        </div>
      )
    })

    

    return(
      <div>
        <RadioGroup onChange={this.handleChangeDataType.bind(this)} defaultValue={1}>
          <RadioButton value={1}>睡眠</RadioButton>
          <RadioButton value={2}>体重</RadioButton>
          <RadioButton value={3}>步数</RadioButton>
          <RadioButton value={4}>血压</RadioButton>
          <RadioButton value={5}>血糖</RadioButton>
          <RadioButton value={6}>心率</RadioButton>
          <RadioButton value={7}>有氧时长</RadioButton>
        </RadioGroup>
        <div className="data-table">
          {yearItem.length>0 ? yearItem : <Empty/>}
        </div>
      </div>
    )
  }
}

export default DataTable