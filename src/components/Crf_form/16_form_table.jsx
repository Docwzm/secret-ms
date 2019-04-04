/**
 * 血糖监测结果
 */
import React, { Component } from 'react';
import { Form, Button, Input, Table, DatePicker, Icon } from 'antd';
import { validDoubleNumber } from '../../utils/formValidate'
import moment from 'moment';
const FormItem = Form.Item;

class MyTable extends Component {
  render() {
    let formData = this.props.data[this.props.name] || [];
    const { getFieldDecorator } = this.props.form;
    formData = formData.map((item, index) => {
      item.key = index
      return item;
    })

    const renderContent = (text, row, index, type) => {
      let proper = this.props.name ? (this.props.name + '_' + type + '_' + index) : (type + '_' + index)
      let options = {}

      if (typeof text == 'undefined') {
        options.initialValue = ''
      } else {
        if (formData[index]) {
          if (type == 'measurementDate' && formData[index][type]) {
            options.initialValue = moment(formData[index][type])
          } else {
            options.initialValue = formData[index][type]
          }
        }
      }

      if (type != 'measurementDate') {
        options.rules = [{
          validator: validDoubleNumber
        }]
      }

      if (type == 'opt') {
        return <Button onClick={() => this.props.handleDelete(index)}>删除</Button>
      } else {
        return <FormItem>
          {
            getFieldDecorator(proper, options)(
              type == 'measurementDate' ? <DatePicker onChange={(date) => this.props.handleChange(index, type, date)} /> : <Input onChange={(event) => this.props.handleChange(index, type, event)} />
            )
          }
        </FormItem>;
      }
    }

    const columns = [{
      title: "日期",
      align: "center",
      dataIndex: 'measurementDate',
      render: (text, row, index) => renderContent(text, row, index, 'measurementDate')
    }, {
      title: "早餐前",
      align: "center",
      dataIndex: 'mornBefore',
      render: (text, row, index) => renderContent(text, row, index, 'mornBefore')
    }, {
      title: "早餐后2h",
      align: "center",
      dataIndex: 'mornAfter',
      render: (text, row, index) => renderContent(text, row, index, 'mornAfter')
    }, {
      title: "中餐前",
      align: "center",
      dataIndex: 'noonBefore',
      render: (text, row, index) => renderContent(text, row, index, 'noonBefore')
    }, {
      title: "中餐后2h",
      align: "center",
      dataIndex: 'noonAfter',
      render: (text, row, index) => renderContent(text, row, index, 'noonAfter')
    }, {
      title: "晚餐前",
      align: "center",
      dataIndex: 'evenBefore',
      render: (text, row, index) => renderContent(text, row, index, 'evenBefore')
    }, {
      title: "晚餐后2h",
      align: "center",
      dataIndex: 'evenAfter',
      render: (text, row, index) => renderContent(text, row, index, 'evenAfter')
    }, {
      title: "操作",
      align: "center",
      render: (text, row, index) => renderContent(text, row, index, 'opt')
    }]

    return (
      <Table
        pagination={false}
        bordered
        dataSource={formData}
        columns={columns}
        rowKey='key'
        footer={() => (<Button type="primary" onClick={this.props.handleAdd}><Icon type="plus" />增加一行</Button>)}
      >
      </Table>

    )
  }
}

export default MyTable