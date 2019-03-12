import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Row,Col,Input,Form,Select,Button,Table,Icon,Upload} from 'antd';
import {formItemLayoutTitle} from '../../utils/formItemLayout';
import {createMeasurementPlan,planDetail,updateMeasurementPlan} from '../../apis/plan';
import PageHeader from '../../components/PageHeader';
import {enumObj, switchEnum} from '../../utils/enum';
import {setArrayItem} from '../../utils/index';
import './styles/edit.css'

const FormItem = Form.Item;
const Option = Select.Option;

class Plan extends Component {
  state = {
    tab3Data:[{num:1,periodicTime:1,type:1,frequency:1}],
    name:'',
    periodicTime:1,
    defaultKey:1
  }

  componentWillMount(){
    let pageState = this.props.location.state
    if(pageState.id){
      //编辑
      this.actionPlanDetail(pageState.id)
      this.setState({pageState:"编辑"})
    }else{
      //添加
      this.setState({pageState:"新增"})
    }
  }

  //取消
  handleCancelEditTab3(){
    this.props.history.goBack()
  }

  //增加新行
  handleAddItemTab3(){
    let {tab3Data,defaultKey} = this.state
    defaultKey++
    let defaultRow = {num:defaultKey,periodicTime:1,type:1,frequency:1,}
    tab3Data.push(defaultRow)
    this.setState({tab3Data,defaultKey})
  }

  handleGoBack(){
    this.props.history.goBack()
  }

  //计划名称
  handleInputTitle(e){
    this.setState({name:e.target.value})
  }

  //计划周期
  handleSelectPeriodic(value){
    this.setState({periodicTime:parseInt(value)})
  }

  handleTableSelect(name,key,value){
    let tableData = this.state.tab3Data;
    let newTable = setArrayItem(tableData,key,name,value)
    console.log(newTable)
    this.setState({tab3Data:newTable})
  }

  //提交数据
  handleSubmitPlan(){
    let {name,periodicTime,tab3Data,pageState} = this.state
    if(pageState === '编辑'){
      let programId = this.props.location.state.id
      this.actionUpdateMeasurementPlan({programId,name,periodicTime,measurementList:tab3Data})
      return
    }
    this.actionCreateMeasurementPlan({name,periodicTime,measurementList:tab3Data})
  }

  /**
   * 创建测量计划
   */
  async actionCreateMeasurementPlan(data){
    let measurementPlan =await createMeasurementPlan(data)
    console.log(measurementPlan)
  }

  /**
   * 编辑测量计划
   * @param {*} data 
   */
  async actionUpdateMeasurementPlan(data){
    let updatePlan = await updateMeasurementPlan(data)
    console.log(updatePlan)
  }

  /**
   * 计划明细
   * @param {*} id 
   */
  async actionPlanDetail(id){
    let detail = await planDetail(id)
    this.setState({
      name:detail.data.name,
      periodicTime:switchEnum(detail.data.periodicTime,'periodicTime'),
      tab3Data:detail.data.list
    })
  }

  render() {
    const {tab3Data,name} = this.state
    const measurementTypeOpyion = enumObj['measurementType'].map(item => (
      <Option value={item.key} key={item.key}>{item.value}</Option>
    ))

    const frequencyOption = enumObj['frequency'].map(item => (
      <Option value={item.key} key={item.key}>{item.value}</Option>
    ))
    const periodicTimeOption = enumObj['periodicTime'].map(item => (
      <Option value={item.key} key={item.key}>{item.value}</Option>
    ))
    
    //测量方案表头
    const tab3Columns = [{
      title:"序号",
      dataIndex:"num",
      key:"num"
    },{
      title:"测量类型名称",
      render:row=>(
        <Select defaultValue={1} style={{ width: 150 }} onSelect={this.handleTableSelect.bind(this,'type',row.num)}>
          {measurementTypeOpyion}
        </Select>
      )
    },{
      title:"测量频次",
      render:row=>(
        <Select defaultValue={1} style={{ width: 150 }} onSelect={this.handleTableSelect.bind(this,'frequency',row.num)}>
          {frequencyOption}
        </Select>
      )
    },{
      title:"操作",
      render:row => (<span className="delete-btn">删除</span>)
    }]

    return (
      <div className="edit-wrap">
          <PageHeader title='测量方案' onBack={this.handleGoBack.bind(this)}/>
          <div className='title-wrap'>
              <Row>
                  <Col span={6}>
                      <FormItem 
                        {...formItemLayoutTitle} 
                        label={<strong>测量方案</strong>}
                      >
                          <Input value={name} onChange={this.handleInputTitle.bind(this)}/>
                      </FormItem>
                  </Col>
                  <Col span={6}>
                      <FormItem 
                        {...formItemLayoutTitle} 
                        label={<strong>执行周期</strong>}
                      >
                        <Select defaultValue={1} style={{ width: 150 }} onSelect={this.handleSelectPeriodic.bind(this)}>
                          {periodicTimeOption}
                        </Select>
                      </FormItem>
                  </Col>
              </Row>
          </div>
          <Table dataSource={tab3Data} columns={tab3Columns} pagination={false} rowKey={record => record.num}/>
          <div className='add-btn-icon'>
              <Icon type="plus-circle" onClick={this.handleAddItemTab3.bind(this)}/>
          </div>
          <div className="save-btn-wrap">
              <Button className="save-btn" type="primary" onClick={this.handleSubmitPlan.bind(this)}>保存</Button>
              <Button onClick={this.handleCancelEditTab3.bind(this)}>取消</Button>
          </div>
      </div>
    );
  }
}

export default withRouter(Plan)