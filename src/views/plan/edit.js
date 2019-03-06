import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Row,Col,Input,Form,Select,Button,Table,Icon,Upload} from 'antd';
import {formItemLayoutTitle} from '../../utils/formItemLayout';
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './styles/edit.css'

const FormItem = Form.Item;
const Option = Select.Option;

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
    tab1EditDisable:true,
    tab2EditDisable:true,
    editorState: BraftEditor.createEditorState(null),
    tab3EditDisable:true,
    tab3Data:[{
      id:1,
      name:"血压测量",
      times:"一日三次"
    }]
  }

  //编辑tab1
  handleEditTab1(){
    this.setState({tab1EditDisable:false})
  }
  //取消编辑tab1
  handleCancelEditTab1(){
    this.setState({tab1EditDisable:true})
  }

  //删除tab1
  handleDeleteTab1(){
    console.log('删除tab1')
  }
  //增加项目
  handleAddItemTab1(){
    let {tab1Data} = this.state
    let defaultRow = {id:1,key:1,time:3,nodeName:"",address:"",content:""}
    tab1Data.push(defaultRow)
    this.setState({tab1Data})
  }

  handleEditTab2(){
    this.setState({tab2EditDisable:false})
  }

  handleDeleteTab2(){

  }

  handleCancelEditTab2(){
    this.setState({tab2EditDisable:true})
  }

  handleContentsChangeTab2(value){
    console.log(value.toHTML())
  }

  handleEditTab3(){
    this.setState({tab3EditDisable:false})
  }

  handleDeleteTab3(){
    this.setState({tab3EditDisable:true})
  }

  handleAddItemTab3(){
    let {tab3Data} = this.state
    let defaultRow = {id:1,name:1,times:3}
    tab3Data.push(defaultRow)
    this.setState({tab3Data})
  }

  render() {
    const {currentTabKey,tab1Data,tab1EditDisable,tab2EditDisable,editorState,tab3EditDisable,tab3Data} = this.state
    const excludeControls=["media"]
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={this.uploadHandler}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button type="button" className="control-item button upload-button" data-title="插入图片">
              <Icon type="picture" theme="filled" />&nbsp;插入图片
            </button>
          </Upload>
        )
      }
    ]
    //随访方案表头
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

    //测量方案表头
    const tab3Columns = [{
      title:"序号",
      dataIndex:"id",
      key:"id"
    },{
      title:"测量类型名称",
      render:row=>(
        <Select defaultValue="1" style={{ width: 150 }} disabled={tab3EditDisable}>
          <Option key="1">血压</Option>
          <Option key="2">血糖</Option>
          <Option key="3">体重</Option>
        </Select>
      )
    },{
      title:"测量频次",
      render:row=>(
        <Select defaultValue="1" style={{ width: 150 }} disabled={tab3EditDisable}>
          <Option key="1">一日三次</Option>
        </Select>
      )
    }]

    //随访方案
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
                onClick={tab1EditDisable ? this.handleEditTab1.bind(this):this.handleDeleteTab1.bind(this)}
              >{tab1EditDisable ? "编辑":"删除"}</Button>
              </FormItem>
            </Col>
          </Row>
        </div>
        <Table dataSource={tab1Data} columns={tab1Columns} pagination={false}/>
        
        <div className='add-btn-icon'>
          {tab1EditDisable?null:<Icon type="plus-circle" onClick={this.handleAddItemTab1.bind(this)}/>}
        </div>
        <div className="save-btn-wrap">
          {tab1EditDisable?null:(
            <div>
              <Button className="save-btn" type="primary">保存</Button>
              <Button onClick={this.handleCancelEditTab1.bind(this)}>取消</Button>
            </div>
          )}
        </div>
      </div>
    )
    //宣教资料
    const tab2Contents = () => (
      <div className="edit-wrap">
        <div className='title-wrap'>
          <Row>
            <Col span={6}>
              <FormItem {...formItemLayoutTitle} label={<strong>宣教方案</strong>}>
                <Input value="宣教方案名称" disabled={tab2EditDisable}/>
              </FormItem>
            </Col>
            <Col span={6}> 
              <FormItem>
                <Button 
                type={tab2EditDisable ? "primary":"danger"} 
                onClick={tab2EditDisable ? this.handleEditTab2.bind(this):this.handleDeleteTab2.bind(this)}
              >{tab2EditDisable ? "编辑":"删除"}</Button>
              </FormItem>
            </Col>
          </Row>
        </div>
        <div className="tab2-contents">
          <BraftEditor 
            excludeControls={excludeControls}
            extendControls={extendControls}
            onChange={this.handleContentsChangeTab2.bind(this)}
            value={editorState}
          />
        </div>
        <div className="save-btn-wrap">
          {tab2EditDisable?null:(
            <div>
              <Button className="save-btn" type="primary">保存</Button>
              <Button onClick={this.handleCancelEditTab2.bind(this)}>取消</Button>
            </div>
          )}
        </div>
      </div>
    )

    //测量方案
    const tab3Contents = () => (
      <div className="edit-wrap">
        <div className='title-wrap'>
          <Row>
            <Col span={6}>
              <FormItem {...formItemLayoutTitle} label={<strong>测量方案</strong>}>
                <Input value="测量方案名称" disabled={tab3EditDisable}/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayoutTitle} label={<strong>执行周期</strong>}>
                <span>三个月</span>
              </FormItem>
            </Col>
            <Col span={6}> 
              <FormItem>
                <Button 
                type={tab3EditDisable ? "primary":"danger"} 
                onClick={tab3EditDisable ? this.handleEditTab3.bind(this):this.handleDeleteTab3.bind(this)}
              >{tab3EditDisable ? "编辑":"删除"}</Button>
              </FormItem>
            </Col>
          </Row>
        </div>
        <Table dataSource={tab3Data} columns={tab3Columns} pagination={false}/>
        <div className='add-btn-icon'>
          {tab3EditDisable?null:<Icon type="plus-circle" onClick={this.handleAddItemTab3.bind(this)}/>}
        </div>
        <div className="save-btn-wrap">
          {tab3EditDisable?null:(
            <div>
              <Button className="save-btn" type="primary">保存</Button>
              <Button onClick={this.handleCancelEditTab1.bind(this)}>取消</Button>
            </div>
          )}
        </div>
      </div>
    )

    const contents = {
      "1":tab1Contents(),
      "2":tab2Contents(),
      "3":tab3Contents()
    }
    return (
      <>{contents[currentTabKey]}</>
    );
  }
}

export default withRouter(Plan)