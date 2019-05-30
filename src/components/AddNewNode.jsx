import React, { Component } from 'react';
import { Modal,Button, Table,Icon,DatePicker,Form,Input,Select} from 'antd';
import { formItemLayout, tailFormItemLayout } from '../utils/formItemLayout';
import {addNewNode} from '../apis/plan'

import moment from 'moment';
const { TextArea } = Input;
const Option = Select.Option
const FormItem = Form.Item;


class AddNewNode extends Component{
   state = {
      newNode:{},
      addNodeModel:{},
      btnLoading:false
   }

   componentWillReceiveProps(){
      let {list,groupId, id} = this.props
      //说明：增加额外随访节点，课题二时默认未V9，课题三时默认为V11
      let addNodeModel = {}
      if(groupId === 2){
            //课题二
            for(let i in list){
               if(list[i].num === 9){
                  addNodeModel = list[i]
               }
            }
      }
      if(groupId === 3){
            //课题三
            for(let i in list){
               if(list[i].num === 11){
                  addNodeModel = list[i]
               }
            }
      }
      addNodeModel.startTime = moment(addNodeModel.startDate).format('YYYY/MM/DD')
      this.setState({addNodeModel,groupId,id})
   }

   handleInputNewNode(key,e){
      let {newNode} = this.state
      let value=''
      if(key === 'site'){
         value = e
      }else if(key ==='startDate'){
         value = e.valueOf()
      }else{
         value = e.target.value
      }
      newNode[key] = value
      this.setState({newNode})
   }

   handleSubmitAddNewNode(){
      let {newNode,addNodeModel,groupId,id} = this.state;
      let params = {}
      params.programId = id;
      params.site = newNode.site || addNodeModel.site;
      params.name = newNode.name || '额外随访';
      params.describes = newNode.describes || addNodeModel.describes;
      params.startDate = newNode.startDate || addNodeModel.startDate;
      params.groupId = groupId
      params.nodeId = addNodeModel.id
      console.log(params)
      this.actionAddNewNode(params)
   }

   /**
    * 新增随访
    */
   async actionAddNewNode(data){
      this.setState({btnLoading:true})
      let res = await addNewNode(data)
      this.setState({btnLoading:false})
      console.log(res)
      this.props.onHide()
   }

   render(){
      let {addNodeModel,btnLoading} = this.state
      return(
         <Modal
                visible={this.props.visible}
                title="添加额外随访"
                onCancel={this.props.onHide}
                footer={null}
                width={700}
            >
               <div>
                  <FormItem  {...formItemLayout} label="名称" >
                     <Input placeholder="请输入名称" defaultValue="额外随访" onChange={this.handleInputNewNode.bind(this,'name')}/>
                  </FormItem>
                  <FormItem  {...formItemLayout} label="地点">
                     <Select defaultValue={addNodeModel.site} style={{ width: 120 }} onChange={this.handleInputNewNode.bind(this,'site')}>
                           <Option value={1}>医院</Option>
                           <Option value={2}>社康</Option>
                     </Select>
                  </FormItem>
                  <FormItem  {...formItemLayout} label="内容">
                     <TextArea rows={4} defaultValue={addNodeModel.describes} onChange={this.handleInputNewNode.bind(this,'describes')}/>
                  </FormItem>
                  <FormItem  {...formItemLayout} label="随访时间">
                     <DatePicker 
                           defaultValue={moment(addNodeModel.startTime, 'YYYY/MM/DD')} 
                           format='YYYY/MM/DD' 
                           onChange={this.handleInputNewNode.bind(this,'startDate')}
                           disabledDate={(current)=>current && current < moment().endOf('day')}
                           allowClear={false}
                     />
                  </FormItem>
                  <FormItem {...tailFormItemLayout}>
                     <Button className="modal-btn" type="primary" onClick={this.handleSubmitAddNewNode.bind(this)} loading={btnLoading}>确认</Button>
                     <Button className="modal-btn" onClick={this.props.onHide}>取消</Button>
                  </FormItem>
               </div>
         </Modal>
      )
   }
}

export default AddNewNode