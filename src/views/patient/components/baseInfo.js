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
    familyDisease:[],
    disabled:true
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
    if(!patientInfo.birthday){
      patientInfo.birthday = new Date().getTime()
    }
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

  handleEdit(){
    this.setState({disabled:false})
  }

  /**
   * 更新患者信息
   * @param {*} data 
   */
  async actionUpdatePatientInfo(data){
    let updateInfo = await updatePatientInfo(data).catch(err=>this.setState({submitLoading:false}))
    if(updateInfo && updateInfo.code === 200){
      this.setState({submitLoading:false,disabled:true})
      this.props.onUpdateSuccess()
      message.success('修改患者信息成功')
    }
  }


  render(){
    const {patientInfo,submitLoading,historyDisease,familyDisease,disabled} = this.state;
    const {onlyRead} = this.props;
    const birthday = moment(patientInfo.birthday).format('YYYY/MM/DD')
    return(
      <div >
        <Form style={{width:"800px",marginTop:"50px"}}>
          <FormItem
            label="姓名"
            {...formItemLayout}
          >
            <Input disabled={disabled} value={patientInfo.realName} onChange={this.handleInput.bind(this,'realName')}/>
          </FormItem>
          <FormItem
            label="性别"
            {...formItemLayout}
          >
            <Select disabled={disabled} style={{width:"200px"}} value={patientInfo.sex} onChange={this.handleSelectChange.bind(this,'sex')}>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </FormItem>
          <FormItem
            label="出生日期"
            {...formItemLayout}
          >
            <DatePicker disabled={disabled} allowClear={false} value={moment(birthday)} onChange={this.handleBirthdayChange.bind(this)}/>
          </FormItem>
          <FormItem
            label="身高"
            {...formItemLayout}
          >
            <span>{patientInfo.height || '未填写'}</span>
          </FormItem>
          <FormItem
            label="体重"
            {...formItemLayout}
          >
            <span>{patientInfo.weight || '未填写'}</span>
          </FormItem>

          <FormItem
            label="所属医生"
            {...formItemLayout}
          >
            <span>{patientInfo.doctorName || '未填写'}</span>
          </FormItem>
          <FormItem
            label="所属医院"
            {...formItemLayout}
          >
            <span>{patientInfo.orgName || '未填写'}</span>
          </FormItem>
          <FormItem
            label="分组随机号"
            {...formItemLayout}
          >
            <span>{patientInfo.randomNo || '未知'}</span>
          </FormItem>

          <FormItem
            label="紧急联系人"
            {...formItemLayout}
          >
            <span>{patientInfo.urgentLinkRealName || '未填写'}</span>
          </FormItem>
          <FormItem
            label="联系人手机号"
            {...formItemLayout}
          >
            <span>{patientInfo.urgentLinkMobile || '未填写'}</span>
          </FormItem>
          <FormItem
            label="既往病史"
            {...formItemLayout}
          >
            <CheckboxGroup disabled={disabled} defaultValue={historyDisease} onChange={this.handleCheckboxGroup.bind(this,'historyDisease')}>
              <Checkbox onChange={this.props.onChange} value={1}>糖尿病</Checkbox>
              <Checkbox onChange={this.props.onChange} value={2}>高血压</Checkbox>
              <Checkbox onChange={this.props.onChange} value={3}>心脑血管</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem
            label="家族病史"
            {...formItemLayout}
          >
            <CheckboxGroup disabled={disabled} defaultValue={familyDisease} onChange={this.handleCheckboxGroup.bind(this,'familyDisease')}>
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
              <Input disabled={disabled} style={{width:"40%"}} addonBefore="持续" addonAfter="年" value={patientInfo.smokeTime} onChange={this.handleInput.bind(this,'smokeTime')}/>
              <Input disabled={disabled} style={{width:"50%",marginLeft:"10%"}} addonBefore="平均" value={patientInfo.smokeRate} addonAfter="支/天" onChange={this.handleInput.bind(this,'smokeRate')}/>
            </InputGroup>
          </FormItem>
          <FormItem 
            label="饮酒史"
            {...formItemLayout}
          >
            <InputGroup compact>
              <Input disabled={disabled} style={{width:"40%"}} addonBefore="持续" addonAfter="年" value={patientInfo.drinkTime} onChange={this.handleInput.bind(this,'drinkTime')}/>
              <Input disabled={disabled} style={{width:"50%",marginLeft:"10%"}} addonBefore="平均" value={patientInfo.drinkRate} addonAfter="两/天" onChange={this.handleInput.bind(this,'drinkRate')}/>
            </InputGroup>
          </FormItem>
          {
            !onlyRead?<FormItem {...tailFormItemLayout}>
              {disabled?<Button type="primary" onClick={this.handleEdit.bind(this)} >编辑</Button>:<Button type="primary" onClick={this.handleSubmit.bind(this)} loading={submitLoading}>提交</Button>}
            </FormItem>:null
          }
        </Form>
      </div>
    )
  }
}

export default withRouter(BaseInfo)