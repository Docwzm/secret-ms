import React,{Component} from 'react'
import {Form,Input,Checkbox,Button,Select} from 'antd'
import {formItemLayout,tailFormItemLayout} from '../../../utils/formItemLayout'

const FormItem = Form.Item;
const InputGroup = Input.Group;

class BaseInfo extends Component{
  render(){
    return(
      <div >
        <Form style={{width:"800px",marginTop:"50px"}}>
          <FormItem
            label="姓名"
            {...formItemLayout}
          >
            <Input />
          </FormItem>
          <FormItem
            label="性别"
            {...formItemLayout}
          >
            <Select></Select>
          </FormItem>
          <FormItem
            label="出生日期"
            {...formItemLayout}
          >
            <span>1999年12月12日</span>
          </FormItem>
          <FormItem
            label="联系方式"
            {...formItemLayout}
          >
            <span>13800138000</span>
          </FormItem>
          <FormItem
            label="既往病史"
            {...formItemLayout}
          >
            <InputGroup>
              <Checkbox onChange={this.props.onChange}>血糖</Checkbox>
              <Checkbox onChange={this.props.onChange}>血压</Checkbox>
              <Checkbox onChange={this.props.onChange}>晨脉</Checkbox>
              <Checkbox onChange={this.props.onChange}>BMI</Checkbox>
              <Checkbox onChange={this.props.onChange}>睡眠</Checkbox>
            </InputGroup>
          </FormItem>
          <FormItem
            label="家族病史"
            {...formItemLayout}
          >
            <InputGroup>
              <Checkbox onChange={this.props.onChange}>血糖</Checkbox>
              <Checkbox onChange={this.props.onChange}>血压</Checkbox>
              <Checkbox onChange={this.props.onChange}>晨脉</Checkbox>
              <Checkbox onChange={this.props.onChange}>BMI</Checkbox>
              <Checkbox onChange={this.props.onChange}>睡眠</Checkbox>
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

export default BaseInfo