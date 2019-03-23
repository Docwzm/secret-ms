import React,{Component} from 'react'
import {Form,Input,Checkbox,Button,Select,DatePicker, message} from 'antd'
import {formItemLayout,tailFormItemLayout} from '../../../utils/formItemLayout'
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import {updatePatientInfo} from '../../../apis/user'
import {getQueryString} from '../../../utils/index';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option
const CheckboxGroup = Checkbox.Group;

class BaseInfo extends Component{
  state = {
    patientInfo:{},
    submitLoading:false,
    historyDisease:[],
    familyDisease:[]
  }

  componentWillMount(){
    let patientId = parseInt(getQueryString('id',this.props.location.search))
    let patientInfo = this.props.patientInfo
    let historyDisease = []
    let familyDisease = []
    patientInfo.patientId = patientId
    if(patientInfo.historyDisease && patientInfo.historyDisease instanceof Array){
      historyDisease  = patientInfo.historyDisease.map(item=>{
        return item.id
      })
    }
    if(patientInfo.familyDisease && patientInfo.familyDisease instanceof Array){
      familyDisease  = patientInfo.familyDisease.map(item=>{
        return item.id
      })
    }
    //设置生日默认值
    patientInfo.birthday = new Date().getTime()
    this.setState({patientInfo,historyDisease,familyDisease})
  }

  //时间控件
  handleBirthdayChange(value){
    let {patientInfo} = this.state
    let birthday = Date.parse(value)
    patientInfo['birthday'] = birthday
    this.setState({patientInfo})
  }

  //多选框
  handleCheckboxGroup(name,value=[]){
    let {patientInfo} = this.state
    let listObj = []
    let familyDisease = []
    let historyDisease = []
    if(name === 'familyDisease'){
      familyDisease = value
    }else if(name === 'historyDisease'){
      historyDisease = value
    }
    for(let i in value){
      let obj = {id:value[i]}
      listObj.push(obj)
    }
    patientInfo[name] = listObj
    this.setState({patientInfo,familyDisease,historyDisease})
  }

  //输入框
  handleInput(name,e){
    let {patientInfo} = this.state
    patientInfo[name] = e.target.value
    this.setState({patientInfo})
  }

  //下拉框
  handleSelectChange(name,value){
    let {patientInfo} = this.state
    patientInfo[name] = value
    this.setState({patientInfo})
  }

  handleSubmit(){
    let {patientInfo} = this.state
    this.setState({submitLoading:true})
    this.actionUpdatePatientInfo(patientInfo)
  }

  /**
   * 更新患者信息
   * @param {*} data 
   */
  async actionUpdatePatientInfo(data){
    let updateInfo = await updatePatientInfo(data).catch(err=>this.setState({submitLoading:false}))
    if(updateInfo && updateInfo.code === 200){
      this.setState({submitLoading:false})
      this.props.onUpdateSuccess()
      message.success('修改患者信息成功')
    }
  }


  render(){
    const {patientInfo,submitLoading,historyDisease,familyDisease} = this.state;
    return(
      <div >
        <Form style={{width:"800px",marginTop:"50px"}}>
          <FormItem
            label="姓名"
            {...formItemLayout}
          >
            <Input value={patientInfo.realName} onChange={this.handleInput.bind(this,'realName')}/>
          </FormItem>
          <FormItem
            label="性别"
            {...formItemLayout}
          >
            <Select style={{width:"200px"}} value={patientInfo.sex} onChange={this.handleSelectChange.bind(this,'sex')}>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </FormItem>
          <FormItem
            label="出生日期"
            {...formItemLayout}
          >
            <DatePicker allowClear={false} value={moment(patientInfo.birthday)} onChange={this.handleBirthdayChange.bind(this)}/>
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
            <CheckboxGroup defaultValue={historyDisease} onChange={this.handleCheckboxGroup.bind(this,'historyDisease')}>
              <Checkbox onChange={this.props.onChange} value={1}>糖尿病</Checkbox>
              <Checkbox onChange={this.props.onChange} value={2}>高血压</Checkbox>
              <Checkbox onChange={this.props.onChange} value={3}>心脑血管</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem
            label="家族病史"
            {...formItemLayout}
          >
            <CheckboxGroup  defaultValue={familyDisease} onChange={this.handleCheckboxGroup.bind(this,'familyDisease')}>
              <Checkbox onChange={this.props.onChange} value={1}>糖尿病</Checkbox>
              <Checkbox onChange={this.props.onChange} value={2}>高血压</Checkbox>
              <Checkbox onChange={this.props.onChange} value={3}>心脑血管</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem 
            label="吸烟史"
            {...formItemLayout}
          >
            <InputGroup compact>
              <Input style={{width:"40%"}} addonBefore="持续" addonAfter="年" value={patientInfo.smokeTime} onChange={this.handleInput.bind(this,'smokeTime')}/>
              <Input style={{width:"50%",marginLeft:"10%"}} addonBefore="平均" value={patientInfo.smokeRate} addonAfter="支/天" onChange={this.handleInput.bind(this,'smokeRate')}/>
            </InputGroup>
          </FormItem>
          <FormItem 
            label="饮酒史"
            {...formItemLayout}
          >
            <InputGroup compact>
              <Input style={{width:"40%"}} addonBefore="持续" addonAfter="年" value={patientInfo.drinkTime} onChange={this.handleInput.bind(this,'drinkTime')}/>
              <Input style={{width:"50%",marginLeft:"10%"}} addonBefore="平均" value={patientInfo.drinkRate} addonAfter="两/天" onChange={this.handleInput.bind(this,'drinkRate')}/>
            </InputGroup>
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" onClick={this.handleSubmit.bind(this)} loading={submitLoading}>提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default withRouter(BaseInfo)