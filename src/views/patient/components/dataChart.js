import React ,{Component}from 'react';
import {Checkbox,Input,Button,Icon} from 'antd'
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

    function pick(data, field) {
      return data.map(function(item) {
        var result = {};
        for (var key in item) {
          if (item.hasOwnProperty(key) && field.indexOf(key) !== -1) {
            result[key] = item[key];
          }
        }
        return result;
      });
    }
  
    var chart = new G2.Chart({
      container: 'chart',
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
        <div className="chart-wrap">
          <div className="date-wrap">
            <table>
              <tbody>
                <tr>
                  <td><Icon type="arrow-left" />上一页</td>
                  <td>03/01</td>
                  <td>03/01</td>
                  <td>03/01</td>
                  <td>03/01</td>
                  <td>03/01</td>
                  <td>03/01</td>
                  <td>03/01</td>
                  <td>下一页<Icon type="arrow-right" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="chart" className="chart"></div>
        </div>
      </>
    )
  }
}

export default DataTable