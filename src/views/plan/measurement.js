import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Row,Col,Input,Form,Select,Button,Table,Icon,Upload, message} from 'antd';
import {formItemLayoutTitle} from '../../utils/formItemLayout';
import {createMeasurementPlan,planDetail,updateMeasurementPlan} from '../../apis/plan';
import PageHeader from '../../components/PageHeader';
import {enumObj, switchEnum} from '../../utils/enum';
import {setArrayItem,deleteTableItem,getQueryString} from '../../utils/index';
import {isMeasureTypeFull} from '../../utils/validate'
import './styles/edit.css'

const FormItem = Form.Item;
const Option = Select.Option;

class Plan extends Component {
  state = {
    tab3Data:[{num:1,periodicTime:1,type:1,frequency:1}],
    name:'',
    periodicTime:1,
    defaultKey:1,
    programId:null,
    tableLoading:false,
    showAddBtn:true
  }

  componentWillMount(){
    let id = getQueryString('id',this.props.location.search)
    if(id){
      //编辑
      this.actionPlanDetail(id)
      this.setState({pageState:"编辑",programId:id})
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
    //需要判断测量类型，全有了就去掉增加按钮
    if(isMeasureTypeFull(tableData)){
      this.setState({showAddBtn:false})
    }
    this.setState({tab3Data:newTable})
  }

  //提交数据
  handleSubmitPlan(){
    let {name,periodicTime,tab3Data,pageState,programId} = this.state
    //增加测量类型重复的判断，“血糖”“血压”“体重”每个一项
    let checkDuplicate = (array) => {
      let result = true
      let key = null
      for(let i in array){
        if(array[i].type !== key){
          key = array[i].type
        }else{
          result = false
        }
      }
      return result
    }
    if(!checkDuplicate(tab3Data)){
      message.error('测量项有重复的值')
      return
    }
    if(pageState === '编辑'){
      this.actionUpdateMeasurementPlan({programId,name,periodicTime,measurementList:tab3Data})
      return
    }
    this.actionCreateMeasurementPlan({name,periodicTime,measurementList:tab3Data})
  }

  //删除表格某项，并重设序号
  handleDeleteTableItem(num){ 
    let table = this.state.tab3Data;
    let newTable = deleteTableItem(table,num)
    let defaultKey = 0
    if(newTable.length > 0){
      defaultKey = newTable[newTable.length-1].num
    }
    this.setState({tab1Data:newTable,defaultKey})
  }

  /**
   * 创建测量计划
   */
  async actionCreateMeasurementPlan(data){
    let measurementPlan =await createMeasurementPlan(data).catch(err => message.error(err.msg))
    if(measurementPlan && measurementPlan.code === 200){
      message.success('创建成功')
      this.props.history.goBack()
    }
  }

  /**
   * 编辑测量计划
   * @param {*} data 
   */
  async actionUpdateMeasurementPlan(data){
    let updatePlan = await updateMeasurementPlan(data).catch(err => message.error(err.msg))
    if(updatePlan && updatePlan.code === 200){
      message.success('编辑成功')
      this.props.history.goBack()
    }
  }

  /**
   * 计划明细
   * @param {*} id 
   */
  async actionPlanDetail(id){
    let detail = await planDetail(id)
    let list = detail.data.list;
    let defaultKey = 1;
    if (list.length > 0) {
      defaultKey = list[list.length - 1].num
    }
    if(isMeasureTypeFull(list)){
      this.setState({showAddBtn:false})
    }
    this.setState({
      name:detail.data.name,
      periodicTime:detail.data.periodicTime,
      tab3Data:list,
      defaultKey
    })
  }

  render() {
    const {tab3Data,name,tableLoading,periodicTime,showAddBtn} = this.state
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
        <Select value={row.type} style={{ width: 150 }} onSelect={this.handleTableSelect.bind(this,'type',row.num)}>
          {measurementTypeOpyion}
        </Select>
      )
    },{
      title:"测量频次",
      render:row=>(
        <Select value={parseInt(row.frequency)} style={{ width: 150 }} onSelect={this.handleTableSelect.bind(this,'frequency',row.num)}>
          {frequencyOption}
        </Select>
      )
    },{
      title:"操作",
      render:row => (<span className="delete-btn" onClick={this.handleDeleteTableItem.bind(this,row.num)}>删除</span>)
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
                        <Select value={periodicTime} style={{ width: 150 }} onSelect={this.handleSelectPeriodic.bind(this)}>
                          {periodicTimeOption}
                        </Select>
                      </FormItem>
                  </Col>
              </Row>
          </div>
          <Table 
            dataSource={tab3Data} 
            columns={tab3Columns} 
            pagination={false} 
            rowKey={record => record.num}
            loading={tableLoading}
            bordered
            footer={()=>(showAddBtn?<Button type="primary" onClick={this.handleAddItemTab3.bind(this)}><Icon type="plus"/>增加一行</Button>:false)}
          />

          <div className="save-btn-wrap">
              <Button className="save-btn" type="primary" onClick={this.handleSubmitPlan.bind(this)}>保存</Button>
              <Button onClick={this.handleCancelEditTab3.bind(this)}>取消</Button>
          </div>
      </div>
    );
  }
}

export default withRouter(Plan)