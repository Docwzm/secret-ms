import React ,{Component}from 'react';
import {Checkbox,Input,Button,Icon} from 'antd'
import G2 from '@antv/g2';
import {getPatientData }from '../../../apis/healthdata'
import dayjs from 'dayjs'
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
  }

  componentWillMount(){
    //计算最近的七个日期
    let {currentDatePage} = this.state
    this.handleLastSenverDays(currentDatePage)
    this.setState({currentDatePage:currentDatePage+1})
  }

  
  //近七天的日期
  handleLastSenverDays(currentDatePage){
    let dayArray = []

    let beginDate = dayjs().subtract((currentDatePage + 1)*7,'day').format('YYYY-MM-DD 00:00:00')
    let endDate = dayjs().subtract(currentDatePage*7,'day').format("YYYY-MM-DD 00:00:00")
    this.actionGetPatientData(beginDate,endDate,4408862)

    for(let i=0;i<7;i++){
      let num = i
      dayArray.unshift(dayjs().subtract(num+currentDatePage * 7,'day').format("MM/DD"))
    }
    this.setState({dayArray})
  }

  handlePrePage(){
    let {currentDatePage} = this.state
    this.handleLastSenverDays(currentDatePage)
    this.setState({currentDatePage:currentDatePage+1})
  }

  handleNextPage(){
    let {currentDatePage} = this.state
    currentDatePage --
    if(currentDatePage >= 0){
      this.handleLastSenverDays(currentDatePage)
      this.setState({currentDatePage})
    }
  }


  //绘制图表
  handleRenderChart(data){
    var chart = new G2.Chart({
      container: 'sleepList',
      height: 400,
      width:900,
      padding:[20,50,50,50]
    });

    chart.source(data, {
      awakeningTime: {
        range: [0, 1]
      }
    });
    chart.scale('awakeningTime', {
      range: [1/8, 1-1/8]
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.legend('city', false); 
    chart.axis('awakeningTime', {
      grid: {
        lineStyle: {
          stroke: '#d9d9d9',
          lineWidth: 1,
          lineDash: [ 2, 2 ]
        }
      },
      label:null,
      tickLine:null
    });
    chart.axis('totalSleepTime', {
      label: {
        formatter: function formatter(val) {
          return val + 'min';
        }
      }
    });
    chart.line().position('awakeningTime*totalSleepTime').color('city');
    chart.point().position('awakeningTime*totalSleepTime').color('city').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    
    chart.render();
  }

   /**
   * 获取患者测量数据
   * @param {*} param0 
   */
  async actionGetPatientData(beginDate,endDate,patientId){
    let self = this
    let patientData = await getPatientData({beginDate,endDate,patientId})
    let data = patientData.data;
    for(let i in data){
      self.setState({[i]:data[i]})
      if(i === 'sleepList'){
        console.log(data[i])
        self.handleRenderChart(data[i])
      }
    }
  }

  render(){
    const {allTypes,dayArray} = this.state

    const checkboxItem = allTypes.map((item,index)=>(<Checkbox key={index}>{item.name}</Checkbox>))

    const chartItem = allTypes.map((item,index)=>( <div id={item.key} key={index} className="chart"></div>))

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