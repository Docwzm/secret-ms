

        
/**
 * 强化CSII治疗情况
 */
import React, { Component } from 'react';
import { Form, Button, Input, Table, DatePicker, Icon } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;

class TheRapyForm extends Component {
    render() {
        let disabled = this.props.disabled;
        let formData = this.props.data || {};
        let tableData = formData.csiiRecordList||[{}];
        // tableData = tableData.map((item,index) => {
        //     item.key = index
        //     return item;
        // })
        console.log(tableData)
        // return false
        console.log('....................////')
        const {getFieldDecorator} = this.props.form;
        const date = [moment(formData.startDate),moment(formData.endDate)];

        
        const renderContent = (text, row, index,type) => {
            let proper = this.props.name?(this.props.name+'_'+type+'_'+index):(type+'_'+index)
            let options = {
                rules: [{ required: "true", message:'不能为空'}]
            }
            if(text){
                options.initialValue = type=='measurementDate'?moment(text):text
            }else{
                options.initialValue = ''
            }
            if(type=='opt'){
              return <span onClick={() => this.props.handleDelete(index)}>删除</span>
            }else{
              return <FormItem>
              {
                  getFieldDecorator(proper, options)(
                    type=='startDate'||type=='endDate'?<DatePicker onChange={(date) => this.props.handleChange(index,type,date)} disabled={disabled}/>:<Input onChange={(event) => this.props.handleChange(index,type,event)} disabled={disabled} />
                  )
              }
          </FormItem>;
            }
              
          }
          const columns = [{
            title:"商品名",
            align:"center",
            dataIndex:'tradeName',
            render:(text, row, index) => renderContent(text, row, index,'tradeName')
        },{
            title:"化学名",
            align:"center",
            dataIndex:'chemicalName',
            render:(text, row, index) => renderContent(text, row, index,'chemicalName')
        },{
            title:"适应症",
            align:"center",
            dataIndex:'indication',
            render:(text, row, index) => renderContent(text, row, index,'indication')
        },{
            title:"剂量/频次",
            align:"center",
            dataIndex:'dosage',
            render:(text, row, index) => renderContent(text, row, index,'dosage')
        },{
            title:"给药途径",
            align:"center",
            dataIndex:'drugRoute',
            render:(text, row, index) => renderContent(text, row, index,'drugRoute')
        },{
            title:"开始时间",
            align:"center",
            dataIndex:'startTime',
            render:(text, row, index) => renderContent(text, row, index,'startTime')
        },{
            title:"结束时间",
            align:"center",
            dataIndex:'endTime',
            render:(text, row, index) => renderContent(text, row, index,'endTime')
        }]
        return (
                    <Table
                        pagination={false}
                        bordered
                        dataSource={tableData}
                        columns={columns}
                        rowKey='id'
                        footer={() => (<Button disabled={disabled} type="primary" onClick={this.props.handleAdd}><Icon type="plus" />增加一行</Button>)}
                    >
                    </Table>
        )
    }
}

export default TheRapyForm