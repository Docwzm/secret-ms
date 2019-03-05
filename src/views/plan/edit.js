import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Row,Col,Input,Form,Select,Button,Table} from 'antd';
import {formItemLayoutTitle} from '../../utils/formItemLayout';
import './styles/edit.css'

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

class Plan extends Component {
  constructor(props){
    super(props)
    console.log(props.location.state)
  }
  state = {
    currentTabKey:this.props.location.state.currentTabKey,
    tab1Data:[{
      id:1,
      key:1,
      time:3,
      nodeName:"节点名称",
      address:"深圳市南山区高新南一道",
      content:"记得过来打针啊老弟"
    }],
    tab1EditDisable:true
  }

  handleEditTab1(){
    this.setState({tab1EditDisable:false})
  }

  render() {
    const {currentTabKey,tab1Data,tab1EditDisable} = this.state
    const tab1Columns = [{
      title:"序号",
      dataIndex:"id",
      key:"id"
    },{
      title:"时间",
      render:row=>{
        const selectTimeUnit = () => (
          <Select defaultValue="天" disabled={tab1EditDisable}>
            <Option value="day">天</Option>
            <Option value="week">周</Option>
            <Option value="month">月</Option>
          </Select> 
        )
        return(
          <Input 
            addonBefore="首诊后" 
            addonAfter={selectTimeUnit()} 
            style={{width:"250px"}}
            disabled={tab1EditDisable}
          />
        )
      }
    },{
      title:"节点名称",
      render:row=>(<Input value={row.nodeName} disabled={tab1EditDisable}/>)
    },{
      title:"地点",
      render:row=>(<Input value={row.address} disabled={tab1EditDisable}/>)
    },{
      title:"内容",
      render:row=>(<Input value={row.content} disabled={tab1EditDisable}/>)
    }]
    const tab1Contents = () => (
      <div className="edit-wrap">
        <div className='title-wrap'>
          <Row>
            <Col span={6}>
              <FormItem {...formItemLayoutTitle} label={<strong>随访方案</strong>}>
                <Input value="随访方案名称" disabled={tab1EditDisable}/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayoutTitle} label={<strong>开始时间</strong>}>
                <Select defaultValue="lucy" style={{ width: 150 }} disabled={tab1EditDisable}>
                  <Option value="jack">首诊</Option>
                  <Option value="lucy">就诊</Option>
                  <Option value="disabled">出院</Option>
                  <Option value="Yiminghe">结束治疗</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={6}> 
              <FormItem>
                <Button 
                type={tab1EditDisable ? "primary":"danger"} 
                onClick={this.handleEditTab1.bind(this)}
              >{tab1EditDisable ? "编辑":"删除"}</Button>
              </FormItem>
            </Col>
          </Row>
        </div>
        <Table dataSource={tab1Data} columns={tab1Columns} pagination={false}/>
      </div>
    )
    const contents = {
      "1":tab1Contents()
    }
    return (
      <>{contents[currentTabKey]}</>
    );
  }
}

export default withRouter(Plan)