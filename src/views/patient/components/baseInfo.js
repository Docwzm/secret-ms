import React,{Component} from 'react'
import {Form,Input,Checkbox,Button,Select} from 'antd'
import {formItemLayout,tailFormItemLayout} from '../../../utils/formItemLayout'
import {withRouter} from 'react-router-dom';
import dayjs from 'dayjs';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option

class BaseInfo extends Component{
  state = {
    patientInfo:{}
  }

  componentWillMount(){
    this.setState({patientInfo:this.props.patientInfo})
  }


  render(){
    const {patientInfo} = this.state;
    return(
      <div >
        <Form style={{width:"800px",marginTop:"50px"}}>
          <FormItem
            label="姓名"
            {...formItemLayout}
          >
            <Input value={patientInfo.realName}/>
          </FormItem>
          <FormItem
            label="性别"
            {...formItemLayout}
          >
            <Select style={{width:"200px"}} value={patientInfo.sex}>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </FormItem>
          <FormItem
            label="出生日期"
            {...formItemLayout}
          >
            <span>{dayjs(patientInfo.birthday).format('YYYY-MM-DD')}</span>
          </FormItem>
          <FormItem
            label="联系方式"
            {...formItemLayout}
          >
            <span>{patientInfo.mobile}</span>
          </FormItem>
          <FormItem
            label="既往病史"
            {...formItemLayout}
          >
            <InputGroup>
              <Checkbox onChange={this.props.onChange} value={1}>糖尿病</Checkbox>
              <Checkbox onChange={this.props.onChange} value={2}>高血压</Checkbox>
              <Checkbox onChange={this.props.onChange} value={2}>心脑血管</Checkbox>
            </InputGroup>
          </FormItem>
          <FormItem
            label="家族病史"
            {...formItemLayout}
          >
            <InputGroup>
              <Checkbox onChange={this.props.onChange} value={1}>糖尿病</Checkbox>
              <Checkbox onChange={this.props.onChange} value={2}>高血压</Checkbox>
              <Checkbox onChange={this.props.onChange} value={3}>心脑血管</Checkbox>
            </InputGroup>
          </FormItem>
          <FormItem 
            label="吸烟史"
            {...formItemLayout}
          >
            <InputGroup compact>
              <Input style={{width:"40%"}} addonBefore="持续" addonAfter="年"/>
              <Input style={{width:"50%",marginLeft:"10%"}} addonBefore="平均" addonAfter="支/天"/>
            </InputGroup>
          </FormItem>
          <FormItem 
            label="饮酒史"
            {...formItemLayout}
          >
            <InputGroup compact>
              <Input style={{width:"40%"}} addonBefore="持续" addonAfter="年"/>
              <Input style={{width:"50%",marginLeft:"10%"}} addonBefore="平均" addonAfter="两/天"/>
            </InputGroup>
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary">提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default withRouter(BaseInfo)