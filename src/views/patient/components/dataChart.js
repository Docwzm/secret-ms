import React ,{Component}from 'react';
import {Checkbox,Input,Button,Icon} from 'antd'
import G2 from '@antv/g2';
import {getPatientData }from '../../../apis/healthdata'
import moment from 'moment'
import {formatSleepData,formatWeightData,formatBloodPressureData} from '../../../utils/format'
const InputGroup = Input.Group;

class DataTable extends Component{
  state = {
    allTypes:[{
      key:"sleepList",
      name:"睡眠"
    },{
      key: "weightList",
      name:"体重"
    }, {
      key:"pedometerList",
      name:"有氧时长"
    }, {
      key:"bloodPressureList",
      name:"血压"
    }, {
      key:"bloodSugarList",
      name:"血糖"
    }, {
      key:"heartRateList",
      name:"心率"
    }],
    currentDatePage:0,//当前时间分页
    dayArray:[],//要显示的日期
    sleepListData:[],
    weightListData:[],
    bloodPressureListData:[]
  }

  componentWillMount(){
    //计算最近的七个日期
    let {currentDatePage} = this.state
    this.handleLastSenverDays(currentDatePage)
    this.setState({currentDatePage:currentDatePage+1})
  }

  componentDidMount(){
    this.sleepListChart = new G2.Chart({
      container: 'sleepList',
      height: 400,
      width:900,
      padding:[20,50,20,50]
    });

    this.weightListChart = new G2.Chart({
      container: 'weightList',
      height: 400,
      width:900,
      padding:[20,50,20,50]
    });

    this.bloodPressureListChart = new G2.Chart({
      container: 'bloodPressureList',
      height: 400,
      width:900,
      padding:[20,50,20,50]
    });

  }

  
  //近七天的日期
  handleLastSenverDays(currentDatePage){
    let dayArray = []

    let beginDate = moment().subtract((currentDatePage + 1)*7,'day').format('YYYY-MM-DD 00:00:00')
    let endDate = moment().subtract(currentDatePage*7,'day').format("YYYY-MM-DD 00:00:00")

    for(let i=0;i<7;i++){
      let num = i
      dayArray.unshift(moment().subtract(num+currentDatePage * 7,'day').format("MM/DD"))
    }
    this.actionGetPatientData(beginDate,endDate,4408862,dayArray)
    this.setState({dayArray})
  }

  handlePrePage(){
    let {currentDatePage} = this.state
    currentDatePage ++ 
    this.handleLastSenverDays(currentDatePage)
    this.setState({currentDatePage:currentDatePage})
  }

  handleNextPage(){
    let {currentDatePage} = this.state
    currentDatePage --
    if(currentDatePage >= 0){
      this.handleLastSenverDays(currentDatePage)
      this.setState({currentDatePage})
    }
  }


  //绘制睡眠图表
  handleRenderSleepChart(data){
    this.sleepListChart.source(data, {
      day: {
        range: [0, 1]
      }
    });
    this.sleepListChart.scale('day', {
      range: [1/8, 1-1/8]
    });

    this.sleepListChart.scale('heartRate', {
      alias: '晨脉'
    });

    this.sleepListChart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });

    this.sleepListChart.legend(false)
    this.sleepListChart.scale('totalSleep', {
      alias: '睡眠时长(小时)'
    });

    this.sleepListChart.axis('day', {
      title:null,
      label:null,
      tickLine:null,
      grid: {
        lineStyle: {
          stroke: '#d9d9d9',
          lineWidth: 1,
          lineDash: [ 2, 2 ]
        }
      }
    });
    this.sleepListChart.axis('totalSleep');
    this.sleepListChart.axis('heartRate',{
      grid:false
    });

    this.sleepListChart.line().position('day*totalSleep');
    this.sleepListChart.line().position('day*heartRate').color('#9AD681').size(2);
    this.sleepListChart.point().position('day*heartRate').color('#9AD681').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    this.sleepListChart.point().position('day*totalSleep').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });

    this.sleepListChart.render();
  }

  handleRenderWeightChart(data){
    this.weightListChart.source(data, {
      day: {
        range: [0, 1]
      }
    });
    this.weightListChart.scale('day', {
      range: [1/8, 1-1/8]
    });

    this.weightListChart.scale('weight', {
      alias: '体重'
    });

    this.weightListChart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });

    this.weightListChart.legend(false)
    this.weightListChart.scale('bmi', {
      alias: 'BMI'
    });

    this.weightListChart.axis('day', {
      title:null,
      label:null,
      tickLine:null,
      grid: {
        lineStyle: {
          stroke: '#d9d9d9',
          lineWidth: 1,
          lineDash: [ 2, 2 ]
        }
      }
    });
    this.weightListChart.axis('weight');
    this.weightListChart.axis('bmi',{
      grid:false
    });

    this.weightListChart.line().position('day*weight');
    this.weightListChart.line().position('day*bmi').color('#9AD681').size(2);
    this.weightListChart.point().position('day*bmi').color('#9AD681').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    this.weightListChart.point().position('day*weight').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });

    this.weightListChart.render();
  }

  handleRenderBloodPressureChart(data){
    this.bloodPressureListChart.source(data, {
      day: {
        range: [0, 1]
      }
    });
    this.bloodPressureListChart.scale('day', {
      range: [1/8, 1-1/8]
    });

    this.bloodPressureListChart.scale('diastolicPressure', {
      alias: '收缩压'
    });

    this.bloodPressureListChart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });

    this.bloodPressureListChart.legend(false)
    this.bloodPressureListChart.scale('systolicPressure', {
      alias: '舒张压'
    });

    this.bloodPressureListChart.axis('day', {
      title:null,
      label:null,
      tickLine:null,
      grid: {
        lineStyle: {
          stroke: '#d9d9d9',
          lineWidth: 1,
          lineDash: [ 2, 2 ]
        }
      }
    });
    this.bloodPressureListChart.axis('diastolicPressure');
    this.bloodPressureListChart.axis('systolicPressure',{
      grid:false
    });

    this.bloodPressureListChart.line().position('day*diastolicPressure');
    this.bloodPressureListChart.line().position('day*systolicPressure').color('#9AD681').size(2);
    this.bloodPressureListChart.point().position('day*systolicPressure').color('#9AD681').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    this.bloodPressureListChart.point().position('day*diastolicPressure').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });

    this.bloodPressureListChart.render();
  }

   /**
   * 获取患者测量数据
   * @param {*} param0 
   */
  async actionGetPatientData(beginDate,endDate,patientId,dayArray){
    let self = this
    let patientData = await getPatientData({beginDate,endDate,patientId})
    let data = patientData.data;
    for(let i in data){
      self.setState({[i]:data[i]})
      if(i === 'sleepList'){
        let formatData = formatSleepData(data[i],data.heartRateList,dayArray)
        self.setState({sleepListData:formatData})
        self.handleRenderSleepChart(formatData)
      }
      if(i === 'weightList'){
        let formatData = formatWeightData(data[i],dayArray)
        self.setState({weightListData:formatData})
        self.handleRenderWeightChart(formatData)
      }
      if(i === 'bloodPressureList'){
        let formatData = formatBloodPressureData(data[i],dayArray)
        self.handleRenderBloodPressureChart(formatData)
      }
    }
  }

  render(){
    const {allTypes,dayArray,sleepListData,weightListData} = this.state

    const checkboxItem = allTypes.map((item,index)=>(<Checkbox key={index}>{item.name}</Checkbox>))

    const makeTable = (dataArray,key1,key2,string1,string2) => {
      let line1 = dataArray.map((item,index)=>{
        if(item[key1]){
          return <td>{item[key1]}</td>
        }
        return <td>--</td>
      })

      let line2 = dataArray.map((item,index)=>{
        if(item[key2]){
          return <td>{item[key2]}</td>
        }
        return <td>--</td>
      })
      
      return(
        <table>
          <tbody>
            <tr>
              <td>{string1}</td>
              {line1}
              <td></td>
            </tr>
            <tr>
              <td>{string2}</td>
              {line2}
              <td></td>
            </tr>
          </tbody>
        </table>
      )
    }

    const chartItem = allTypes.map((item,index)=>{
      const dataTable = ()=>{
        switch(item.key){
          case 'sleepList':
            return makeTable(sleepListData,'totalSleep','heartRate','睡眠','晨脉')
          case 'weightList':
            return makeTable(weightListData,'weight','bmi','体重','BMI')
          default:
            return;
        }
      }
      return(
        <div>
          <div id={item.key} key={index} className="chart"></div>
          <div className="chart-table">
            {dataTable()}
          </div>
        </div>
      )
    })

    const tdItem = dayArray.map((item,index)=>(<td key={index}>{item}</td>))

    return(
      <div>
        <div className='tab2-header'>
          <InputGroup>
            {checkboxItem}
          </InputGroup>
          <Button type="primary" onClick={this.props.onChangePageType.bind(this,'table')}>测量数据表</Button>
        </div>
        <div className="chart-wrap">
          <div className="date-wrap">
            <table>
              <tbody>
                <tr>
                  <td onClick={this.handlePrePage.bind(this)}><Icon type="arrow-left"/>上一页</td>
                  {tdItem}
                  <td onClick={this.handleNextPage.bind(this)}>下一页<Icon type="arrow-right" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 根据alltypes生成所有表格 */}
          {chartItem}
        </div>
      </div>
    )
  }
}

export default DataTable