import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Row,Col,Input,Form,Select,Button,Table,Icon,message} from 'antd';
import {formItemLayoutTitle} from '../../utils/formItemLayout';
import {createFollowUpPlan,updateFollowUpPlan,planDetail} from '../../apis/plan'
import PageHeader from '../../components/PageHeader';
import {enumObj, switchEnum} from '../../utils/enum';
import {setArrayItem,deleteTableItem,getQueryString} from '../../utils/index';

import './styles/edit.css'

const FormItem = Form.Item;
const Option = Select.Option;

class Plan extends Component {
  state = {
    tab1Data:[{key:1,num:1,timeType:1,nodeName:"",site:1,content:"",planTime:""}],
    defaultKey:1,
    name:"",
    timeCategory:1,
    timeType:1,
    submintLoading:false,
    tableLoading:false,
    programId:null
  }

  componentWillMount(){
    let id = getQueryString('id',this.props.location.search)
    if(id){
      //编辑
      this.actionPlanDetail(id)
      this.setState({pageType:"编辑",programId:id})
      return
    }
    //添加
    this.setState({pageType:"添加"})
  }

  //增加项目
  handleAddItemTab1(){
    let {tab1Data,defaultKey} = this.state
    defaultKey++
    let defaultRow = {key:defaultKey,num:defaultKey,timeType:1,nodeName:"",site:1,content:"",planTime:""}
    tab1Data.push(defaultRow)
    this.setState({tab1Data,defaultKey})
  }

  handleCancelEditTab1(){
    this.props.history.goBack()
  }

  //标题
  handleInputTitle(e){
    let value = e.target.value
    this.setState({name:value})
  }

  //开始时间
  handleSelectTimeCate(value){
    this.setState({timeCategory:parseInt(value)})
  }

  /**
   * 输入数据
   * @param {*} name 字段名
   * @param {*} key 行号
   * @param {*} e 
   */
  handleTableInput(name,key,e){
    let tableData = this.state.tab1Data;
    let newTable = setArrayItem(tableData,key,name,e.target.value)
    this.setState({tab1Data:newTable})
  }

  handleTableSelect(name,key,value){
    let tableData = this.state.tab1Data;
    let newTable = setArrayItem(tableData,key,name,value)
    this.setState({tab1Data:newTable})
  }

  handleSubmitPlan(){
      let {name,timeCategory,tab1Data,pageType,programId} = this.state;
      let visitList = tab1Data
      if(pageType === '编辑'){
        this.actionUpdatePlan({programId,name,timeCategory,visitList})
        return
      }
      this.actionCreateFollowUpPlan({name,timeCategory,visitList})
  }

  handleGoBack(){
      this.props.history.goBack()
  }

  //删除表格某项，并重设序号
  handleDeleteTableItem(num){
    let table = this.state.tab1Data;
    let newTable = deleteTableItem(table,num)
    let defaultKey = 0
    if(newTable.length > 0){
      defaultKey = newTable[newTable.length-1].num
    }
    this.setState({tab1Data:newTable,defaultKey})
  }

  /**
   * 创建随访计划
   */
  async actionCreateFollowUpPlan(data){
    let createPlan =await  createFollowUpPlan(data).catch(err => message.error(err.msg))
    if(createPlan && createPlan.code === 200){
      message.success('创建成功')
      this.props.history.goBack()
    }
  }

  /**
   * 计划明细
   * @param {*} id 
   */
  async actionPlanDetail(id){
    this.setState({tableLoading:true})
    let detail = await planDetail(id)
    let list = detail.data.list;
    let defaultKey = 1;
    if(list.length > 0){
      defaultKey = list[list.length-1].num
    }

    this.setState({
      tableLoading:false,
      name:detail.data.name,
      timeCategory:detail.data.categoryTime,
      tab1Data:detail.data.list,
      defaultKey //最后一项的序号
    })
  }

  /**
   * 编辑方案
   * @param {*} data 
   */
  async actionUpdatePlan(data){
    this.setState({submintLoading:true})
    let update = await updateFollowUpPlan(data).catch(err=>message.error(err.msg))
    this.setState({submintLoading:false})
    if(update && update.code === 200){
      message.success('编辑成功')
      this.props.history.goBack()
    }
  }

  render() {
    const {tab1Data,name,submintLoading,tableLoading,timeCategory} = this.state;

    const timeCateOption = enumObj['timeCategory'].map(item => (
        <Option value={item.key} key={item.key}>{item.value}</Option>
    ))

    const timeTypeOption = enumObj['timeType'].map(item => (
        <Option value={item.key} key={item.key}>{item.value}</Option>
    ))

    const siteOption = enumObj['site'].map(item => (
        <Option value={item.key} key={item.key}>{item.value}</Option>
    ))

    const selectTimeUnit = (row) => (
      <Select defaultValue={1} onSelect={this.handleTableSelect.bind(this,'timeType',row.num)}>
        {timeTypeOption}
      </Select> 
    )

    //随访方案表头
    const tab1Columns = [{
      title:"序号",
      dataIndex:"num"
    },{
      title:"时间",
      render:row=>(
        <Input 
          addonBefore={<span>{switchEnum(timeCategory,'timeCategory')}后</span>} 
          addonAfter={selectTimeUnit(row)} 
          style={{width:"250px"}}
          value={row.planTime}
          onChange={this.handleTableInput.bind(this,'planTime',row.num)}
        />
      )
    },{
      title:"节点名称",
      render:row=>(<Input value={row.nodeName} onChange={this.handleTableInput.bind(this,'nodeName',row.num)}/>)
    },{
      title:"地点",
      render:row=>(
        <Select value={parseInt(row.site)} onSelect={this.handleTableSelect.bind(this,'site',row.num)}>
            {siteOption}
        </Select>
      )
    },{
      title:"内容",
      render:row=>(<Input value={row.content} onChange={this.handleTableInput.bind(this,'content',row.num)}/>)
    },{
        title:"操作",
        render:row => (<span className="delete-btn" onClick={this.handleDeleteTableItem.bind(this,row.num)}>删除</span>)
    }]

    return (
        <div className="edit-wrap">
            <PageHeader title='随访方案' onBack={this.handleGoBack.bind(this)}/>
            <div className='title-wrap'>
                <Row>
                    <Col span={6}>
                        <FormItem {...formItemLayoutTitle} label={<strong>随访方案名称</strong>}>
                            <Input value={name} onChange={this.handleInputTitle.bind(this)}/>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem {...formItemLayoutTitle} label={<strong>开始时间</strong>}>
                            <Select value={switchEnum(timeCategory,'timeCategory')} style={{ width: 150 }} onSelect={this.handleSelectTimeCate.bind(this)}>
                                {timeCateOption}
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </div>
            <Table 
              dataSource={tab1Data} 
              columns={tab1Columns} 
              pagination={false} 
              rowKey={record => record.num}
              loading={tableLoading}
              bordered
              footer={()=>(<Button type="primary" onClick={this.handleAddItemTab1.bind(this)}><Icon type="plus"/>增加一行</Button>)}
            />
      
            <div className="save-btn-wrap">
                <Button className="save-btn" loading={submintLoading} type="primary" onClick={this.handleSubmitPlan.bind(this)}>保存</Button>
                <Button onClick={this.handleCancelEditTab1.bind(this)}>取消</Button>
            </div>
        </div>
    );
  }
}

export default withRouter(Plan)