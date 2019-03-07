import React ,{Component}from 'react';
import {Checkbox,Input,Button} from 'antd'
import G2 from '@antv/g2';

const InputGroup = Input.Group;

class DataTable extends Component{
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
      "temperature": 15.2
  }, {
      "month": "Jul",
      "city": "Tokyo",
      "temperature": 25.2
  }, {
      "month": "Jul",
      "city": "London",
      "temperature": 17
  }, {
      "month": "Aug",
      "city": "Tokyo",
      "temperature": 26.5
  }, {
      "month": "Aug",
      "city": "London",
      "temperature": 16.6
  }, {
      "month": "Sep",
      "city": "Tokyo",
      "temperature": 23.3
  }, {
      "month": "Sep",
      "city": "London",
      "temperature": 14.2
  }, {
      "month": "Oct",
      "city": "Tokyo",
      "temperature": 18.3
  }, {
      "month": "Oct",
      "city": "London",
      "temperature": 10.3
  }, {
      "month": "Nov",
      "city": "Tokyo",
      "temperature": 13.9
  }, {
      "month": "Nov",
      "city": "London",
      "temperature": 6.6
  }, {
      "month": "Dec",
      "city": "Tokyo",
      "temperature": 9.6
  }, {
      "month": "Dec",
      "city": "London",
      "temperature": 4.8
  }];
  
    var chart = new G2.Chart({
      container: 'chart',
      forceFit: true,
      width:1000,
      height: 400
    });
    chart.source(data, {
      month: {
        range: [0, 1]
      }
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.axis('temperature', {
      label: {
        formatter: function formatter(val) {
          return val + '°C';
        }
      }
    });
    chart.line().position('month*temperature').color('city');
    chart.point().position('month*temperature').color('city').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    chart.render();
  }
  render(){
    return(
      <>
        <div className='tab2-header'>
          <InputGroup>
            <Checkbox onChange={this.props.onChange}>血糖</Checkbox>
            <Checkbox onChange={this.props.onChange}>血压</Checkbox>
            <Checkbox onChange={this.props.onChange}>晨脉</Checkbox>
            <Checkbox onChange={this.props.onChange}>BMI</Checkbox>
            <Checkbox onChange={this.props.onChange}>睡眠</Checkbox>
          </InputGroup>
          <Button type="primary" onClick={this.props.onChangePageType.bind(this,'table')}>测量数据表</Button>
        </div>
        <div id="chart" style={{width:"1000px",height:"400px",margin:"50px auto"}}></div>
      </>
    )
  }
}

export default DataTable