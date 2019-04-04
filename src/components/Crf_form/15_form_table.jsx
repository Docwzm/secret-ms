/**
 * 强化CSII治疗情况
 */
import React, { Component } from 'react';
import { Form, Button, Input, Table, DatePicker, Icon } from 'antd';
import { validDoubleNumber } from '../../utils/formValidate'
import moment from 'moment';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class CSIITable extends Component {
    render() {
        let disabled = this.props.disabled;
        let formData = this.props.data;
        let tableData = formData.csiiRecordList || [];
        tableData = tableData.map((item,index) => {
            item.key = index;
            return item;
        })
        const { getFieldDecorator } = this.props.form;
        const date = [formData.startDate?moment(formData.startDate):'', formData.endDate?moment(formData.endDate):''];
        const tableHeader = () => (
            <div>
                <div>CSII使用情况（注：初始及调整剂量时填）</div>
                <FormItem label="CSII治疗时间：">
                    {
                        getFieldDecorator('date', {
                            initialValue: date,
                        })(
                            <RangePicker onChange={(date) => this.props.handleChange(null, 'date', date)} />
                        )
                    }
                </FormItem>
            </div>
        )

        const renderContent = (text, row, index, type) => {
            let proper = this.props.name ? (this.props.name + '_' + type + '_' + index) : (type + '_' + index)
            let options = {}
            if (text) {
                options.initialValue = type == 'measurementDate' ? moment(text) : text
            } else {
                if(type != 'measurementDate'){
                    options.initialValue = ''
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
            key: 'measurementDate',
            render: (text, row, index) => renderContent(text, row, index, 'measurementDate')
        }, {
            title: "基础率",
            children: [{
                title: "分段（U/h）",
                align: "center",
                dataIndex: 'basalSection',
                key: 'basalSection',
                render: (text, row, index) => renderContent(text, row, index, 'basalSection')
            }, {
                title: "总量",
                align: "center",
                dataIndex: 'basalSum',
                key: 'basalSum',
                render: (text, row, index) => renderContent(text, row, index, 'basalSum')
            }]
        }, {
            title: "餐前追加",
            children: [{
                title: "早",
                align: "center",
                dataIndex: 'beforeMorn',
                key: 'beforeMorn',
                render: (text, row, index) => renderContent(text, row, index, 'beforeMorn')
            }, {
                title: "中",
                align: "center",
                dataIndex: 'beforeNoon',
                key: 'beforeNoon',
                render: (text, row, index) => renderContent(text, row, index, 'beforeNoon')
            }, {
                title: "晚",
                align: "center",
                dataIndex: 'beforeEven',
                key: 'beforeEven',
                render: (text, row, index) => renderContent(text, row, index, 'beforeEven')
            }, {
                title: "总（U）",
                align: "center",
                dataIndex: 'beforeSum',
                key: 'beforeSum',
                render: (text, row, index) => renderContent(text, row, index, 'beforeSum')
            }]
        }, {
            title: "操作",
            align: "center",
            dataIndex: 'opt',
            key: 'opt',
            render: (text, row, index) => renderContent(text, row, index, 'opt')
        }]
        return (
            <Table
                pagination={false}
                bordered
                title={tableHeader}
                dataSource={tableData}
                columns={columns}
                // rowKey='id'
                footer={() => (<Button type="primary" onClick={this.props.handleAdd}><Icon type="plus" />增加一行</Button>)}
            >
            </Table>
        )
    }
}

export default CSIITable