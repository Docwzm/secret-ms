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
    this.actionGetPatientData({})
    //计算最近的七个日期
    let {currentDatePage} = this.state
    this.handleLastSenverDays(currentDatePage)
    this.setState({currentDatePage:currentDatePage+1})
  }

  componentDidMount(){
    var data = [{
        "month": "Jan",
        "city": "Tokyo",
        "temperature": 7
    }, {
        "month": "Jan",
        "city": "London",
        "temperature": 3.9
    }, {
        "month": "Feb",
        "city": "Tokyo",
        "temperature": 6.9
    }, {
        "month": "Feb",
        "city": "London",
        "temperature": 4.2
    }, {
        "month": "Mar",
        "city": "Tokyo",
        "temperature": 9.5
    }, {
        "month": "Mar",
        "city": "London",
        "temperature": 5.7
    }, {
        "month": "Apr",
        "city": "Tokyo",
        "temperature": 14.5
    }, {
        "month": "Apr",
        "city": "London",
        "temperature": 8.5
    }, {
        "month": "May",
        "city": "Tokyo",
        "temperature": 18.4
    }, {
        "month": "May",
        "city": "London",
        "temperature": 11.9
    }, {
        "month": "Jun",
        "city": "Tokyo",
        "temperature": 21.5
    }, {
        "month": "Jun",
        "city": "London",
        "temperature": 10
    }, {
        "month": "Jul",
        "city": "Tokyo",
        "temperature": 25.2
    }, {
        "month": "Jul",
        "city": "London",
        "temperature": 17
    }];

    var chart = new G2.Chart({
      container: 'sleepList',
      height: 400,
      width:900,
      padding:[20,50,50,50]
    });

    chart.source(data, {
      month: {
        range: [0, 1]
      }
    });
    chart.scale('month', {
      range: [1/8, 1-1/8]
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.legend('city', false); 
    chart.axis('month', {
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
    chart.axis('temperature', {
      label: {
        formatter: function formatter(val) {
          return val + '°C';
        }
      }
    });
    // chart.line().position('month*temperature').color('city').size(3).style({
    //   lineDash: [ 4, 1 ]
    // });
    chart.line().position('month*temperature').color('city');
    chart.point().position('month*temperature').color('city').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    
    chart.render();
  }

  //近七天的日期
  handleLastSenverDays(currentDatePage){
    let dayArray = []
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

   /**
   * 获取患者测量数据
   * @param {*} param0 
   */
  async actionGetPatientData({beginDate,endDate,patientId}){
    let self = this
    let patientData = await getPatientData({beginDate,endDate,patientId})
    let data = patientData.data;
    for(let i in data){
      self.setState({[i]:data[i]})
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