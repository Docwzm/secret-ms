import React ,{Component}from 'react';
import {Table,Radio,Button} from 'antd'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class DataTable extends Component{
  render(){
    return(
      <>
        <div className='tab2-header'>
          <RadioGroup onChange={this.props.onChange} defaultValue="a">
              <RadioButton value="a">血糖</RadioButton>
              <RadioButton value="b">血压</RadioButton>
              <RadioButton value="c">晨脉</RadioButton>
              <RadioButton value="d">BMI</RadioButton>
              <RadioButton value="e">睡眠</RadioButton>
          </RadioGroup>
          <Button type="primary" onClick={this.props.onChangePageType.bind(this,'chart')}>趋势图</Button>
        </div>
      <Table />
      </>
    )
  }
}

export default DataTable