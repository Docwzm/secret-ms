import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Row,Col,Input,Form,Select,Button,Table,Icon,Upload} from 'antd';
import {formItemLayoutTitle} from '../../utils/formItemLayout';
import {createFollowUpPlan} from '../../apis/plan';
import PageHeader from '../../components/PageHeader';
import {enumObj} from '../../utils/enum'
import './styles/edit.css'

const FormItem = Form.Item;
const Option = Select.Option;

class Plan extends Component {
  constructor(props){
    super(props)
    console.log()
  }
  state = {
    tab3Data:[{
      id:1,
      name:"血压测量",
      times:"一日三次"
    }],
    name:'',
    periodicTime:""
  }

  componentWillMount(){
    let pageState = this.props.location.state
    if(pageState.id){
      //编辑

    }else{
      //添加
      this.setState({

      })
    }
  }

  handleAddItemTab3(){
    let {tab3Data} = this.state
    let defaultRow = {id:1,name:1,times:3}
    tab3Data.push(defaultRow)
    this.setState({tab3Data})
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
    const {tab3Data} = this.state
    const measurementTypeOpyion = enumObj['measurementType'].map(item => (
        <Option value={item.key} key={item.key}>{item.name}</Option>
    ))
    //测量方案表头
    const tab3Columns = [{
      title:"序号",
      dataIndex:"id",
      key:"id"
    },{
      title:"测量类型名称",
      render:row=>(
        <Select defaultValue="1" style={{ width: 150 }} >
          {measurementTypeOpyion}
        </Select>
      )
    },{
      title:"测量频次",
      render:row=>(
        <Select defaultValue="1" style={{ width: 150 }} >
          <Option key="1">一日三次</Option>
        </Select>
      )
    }]

    return (
        <div className="edit-wrap">
            <PageHeader title='测量方案' onBack={this.handleGoBack.bind(this)}/>
            <div className='title-wrap'>
                <Row>
                    <Col span={6}>
                        <FormItem {...formItemLayoutTitle} label={<strong>测量方案</strong>}>
                            <Input value="测量方案名称" />
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem {...formItemLayoutTitle} label={<strong>执行周期</strong>}>
                            <span>三个月</span>
                        </FormItem>
                    </Col>
                </Row>
            </div>
            <Table dataSource={tab3Data} columns={tab3Columns} pagination={false}/>
            <div className='add-btn-icon'>
                <Icon type="plus-circle" onClick={this.handleAddItemTab3.bind(this)}/>
            </div>
            <div className="save-btn-wrap">
                <Button className="save-btn" type="primary">保存</Button>
                {/* <Button onClick={this.handleCancelEditTab1.bind(this)}>取消</Button> */}
            </div>
        </div>
    );
  }
}

export default withRouter(Plan)