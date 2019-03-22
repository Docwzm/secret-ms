/**
 * 血糖监测结果
 */
import React, { Component } from 'react';
import { Form, Button, Input, Table, DatePicker, Icon } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;

class MyTable extends Component {
  state = {
    tableData: [
      {
        key: 0
      }
    ]
  }

  componentWillMount(){
    let tableData = [];
    this.props.data.bloodSugarReportList.map(item => {
      tableData.push({
        key:item.id
      })
    })
    console.log(tableData)
    this.setState({
      tableData
    })
  }

  //增加新行
  handleAddColumn() {
    let tableData = this.state.tableData
    let lastKey = -1
    if(tableData.length>0){
      lastKey = tableData[tableData.length-1].key;
    }
    this.setState({
      tableData:[...this.state.tableData,...[{
        key: lastKey+1
      }]]
    })
    console.log([...this.state.tableData,...[{
      key: lastKey+1
    }]])
  }

  handleDelete(row) {
    console.log(row)
    // return false;
    let tableData = [...this.state.tableData] ;
    this.setState({
      tableData:tableData.filter(item => item.key!=row.key)
    })
  }

  render() {
    const { tableData } = this.state
    const disabled = this.props.disabled;
    const {getFieldDecorator} = this.props.form;

    const renderContent = (text, row, index,type) => {
      let proper = this.props.name?(this.props.name+'_'+type+'_'+index):(type+'_'+index)
      let options = {
          rules: [{ required: "true", message:'不能为空'}]
      }
      
      if(this.props.data.bloodSugarReportList[index]){
        options.initialValue = type=='measurementDate'?moment(this.props.data.bloodSugarReportList[index][type]):this.props.data.bloodSugarReportList[index][type]
      }
      
      if(type=='opt'){
        return <span onClick={this.handleDelete.bind(this,row)}>删除</span>
      } else {
        return <FormItem>
            {
                getFieldDecorator(proper, options)(
                  type=='measurementDate'?<DatePicker disabled={disabled}/>:<Input disabled={disabled} className="middle-input" />
                )
            }
        </FormItem>;
      }
    }

    const columns = [{
      title: "日期",
      align: "center",
      dataIndex: 'measurementDate',
      render:(text, row, index) => renderContent(text, row, index,'measurementDate')
    }, {
      title: "早餐前",
      align: "center",
      dataIndex: 'mornBefore',
      render:(text, row, index) => renderContent(text, row, index,'mornBefore')
    }, {
      title: "早餐后2h",
      align: "center",
      dataIndex: 'mornAfter',
      render:(text, row, index) => renderContent(text, row, index,'mornAfter')
    }, {
      title: "中餐前",
      align: "center",
      dataIndex: 'noonBefore',
      render:(text, row, index) => renderContent(text, row, index,'noonBefore')
    }, {
      title: "中餐后2h",
      align: "center",
      dataIndex: 'noonAfter',
      render:(text, row, index) => renderContent(text, row, index,'noonAfter')
    }, {
      title: "晚餐前",
      align: "center",
      dataIndex: 'evenBefore',
      render:(text, row, index) => renderContent(text, row, index,'evenBefore')
    }, {
      title: "晚餐后2h",
      align: "center",
      dataIndex: 'evenAfter',
      render:(text, row, index) => renderContent(text, row, index,'evenAfter')
    }, {
      title: "操作",
      align: "center",
      render:(text, row, index) => renderContent(text, row, index,'opt')
    }]

    return (
          <Table
            pagination={false}
            style={styles.table}
            bordered
            dataSource={tableData}
            columns={columns}
            footer={() => (<Button type="primary" onClick={this.handleAddColumn.bind(this)}><Icon type="plus" />增加一行</Button>)}
          >
          </Table>
      
    )
  }
}

const styles = {
  table: {
    margin: "40px auto"
  }
}

export default MyTable