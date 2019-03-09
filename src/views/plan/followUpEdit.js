import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Row,Col,Input,Form,Select,Button,Table,Icon} from 'antd';
import {formItemLayoutTitle} from '../../utils/formItemLayout';
import {createFollowUpPlan} from '../../apis/plan'
import PageHeader from '../../components/PageHeader';
import {enumObj} from '../../utils/enum'
import {setArrayItem} from '../../utils/index'
import './styles/edit.css'

const FormItem = Form.Item;
const Option = Select.Option;

class Plan extends Component {
  state = {
    currentTabKey:this.props.location.state.currentTabKey,
    tab1Data:[{key:1,num:1,timeType:1,nodeName:"",site:1,content:"",planTime:""}],
    defaultKey:1,
    name:"",
    timeCategory:1,
    timeType:1
  }

  componentWillMount(){
    let pageState = this.props.location.state
    if(pageState.id){
      //编辑
        this.setState({
            pageType:"编辑"
        })
    }else{
        //添加
        this.setState({
            pageType:"添加"
        })
    }
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
      let {name,timeCategory,tab1Data} = this.state;
      let visitList = tab1Data
      this.actionCreateFollowUpPlan({name,timeCategory,visitList})
  }

  handleGoBack(){
      this.props.history.goBack()
  }

  /**
   * 创建随访计划
   */
  async actionCreateFollowUpPlan(data){
    let followUpPlan =await  createFollowUpPlan(data)
    console.log(followUpPlan)
  }

  render() {
    const {tab1Data,name} = this.state;

    const timeCateOption = enumObj['timeCategory'].map(item => (
        <Option value={item.key} key={item.key}>{item.value}</Option>
    ))

    const timeTypeOption = enumObj['timeType'].map(item => (
        <Option value={item.key} key={item.key}>{item.value}</Option>
    ))

    const siteOption = enumObj['site'].map(item => (
        <Option value={item.key} key={item.key}>{item.value}</Option>
    ))

    //随访方案表头
    const tab1Columns = [{
      title:"序号",
      dataIndex:"num",
      key:"num"
    },{
      title:"时间",
      render:row=>{
        const selectTimeUnit = () => (
          <Select defaultValue={1} onSelect={this.handleTableSelect.bind(this,'timeType',row.num)}>
            {timeTypeOption}
          </Select> 
        )
        return(
          <Input 
            addonBefore="首诊后" 
            addonAfter={selectTimeUnit()} 
            style={{width:"250px"}}
            value={row.planTime}
            onChange={this.handleTableInput.bind(this,'planTime',row.num)}
          />
        )
      }
    },{
      title:"节点名称",
      render:row=>(<Input value={row.nodeName} onChange={this.handleTableInput.bind(this,'nodeName',row.num)}/>)
    },{
      title:"地点",
      render:row=>(
          <Select defaultValue={1} onSelect={this.handleTableSelect.bind(this,'site',row.num)}>
              {siteOption}
          </Select>
      )
    },{
      title:"内容",
      render:row=>(<Input value={row.content} onChange={this.handleTableInput.bind(this,'content',row.num)}/>)
    },{
        title:"操作",
        render:row => (<span className="delete-btn">删除</span>)
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
                            <Select defaultValue={1} style={{ width: 150 }} onSelect={this.handleSelectTimeCate.bind(this)}>
                                {timeCateOption}
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </div>
            <Table dataSource={tab1Data} columns={tab1Columns} pagination={false}/>
        
            <div className='add-btn-icon'>
                <Icon type="plus-circle" onClick={this.handleAddItemTab1.bind(this)}/>
            </div>
            <div className="save-btn-wrap">
                <Button className="save-btn" type="primary" onClick={this.handleSubmitPlan.bind(this)}>保存</Button>
                <Button onClick={this.handleCancelEditTab1.bind(this)}>取消</Button>
            </div>
        </div>
    );
  }
}

export default withRouter(Plan)