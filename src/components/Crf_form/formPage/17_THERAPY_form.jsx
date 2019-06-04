


/**
 * 新增用药
 */
import React, { Component } from 'react';
import { Form, Button, Input, Table, DatePicker, Icon, Select } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

class TheRapyForm extends Component {
    render() {
        let formData = this.props.data || {};
        let tableData = formData[this.props.name] || [];
        tableData = tableData.map((item, index) => {
            item.key = index
            return item;
        })
        const { getFieldDecorator } = this.props.form;
        const date = [moment(formData.startDate), moment(formData.endDate)];


        const renderContent = (text, row, index, type) => {
            let proper = this.props.name ? (this.props.name + '_' + type + '_' + index) : (type + '_' + index)
            let options = {}
            if (typeof text == 'undefined') {
                //判断为undefinded 新增的一行 要不然会复用前面的initialValue
                if (type != 'startTime' && type != 'endTime') {
                    options.initialValue = ''
                }
            } else {
                options.initialValue = type == 'startTime' || type == 'endTime' ? moment(text) : text
            }
            if (type == 'opt') {
                return <Button onClick={() => this.props.handleDelete(this.props.name, index)}>删除</Button>
            } else {
                return <FormItem>
                    {
                        getFieldDecorator(proper, options)(
                            type == 'saeFlag' ? (<Select onChange={(value) => this.props.handleChange(this.props.name, index, type, value)}>
                                <Option value={true}>是</Option>
                                <Option value={false}>否</Option>
                            </Select>) : (type == 'startTime' || type == 'endTime' ? <DatePicker onChange={(date) => this.props.handleChange(this.props.name, index, type, date.format('YYYY-MM-DD'))} /> : <Input onChange={(event) => this.props.handleChange(this.props.name, index, type, event.target.value)} />)
                        )
                    }
                </FormItem>;
            }

        }
        const columns = [{
            title: "商品名",
            align: "center",
            dataIndex: 'tradeName',
            render: (text, row, index) => renderContent(text, row, index, 'tradeName')
        }, {
            title: "化学名",
            align: "center",
            dataIndex: 'chemicalName',
            render: (text, row, index) => renderContent(text, row, index, 'chemicalName')
        }, {
            title: "适应症",
            align: "center",
            dataIndex: 'indication',
            render: (text, row, index) => renderContent(text, row, index, 'indication')
        }, {
            title: "剂量/频次",
            align: "center",
            dataIndex: 'dosage',
            render: (text, row, index) => renderContent(text, row, index, 'dosage')
        }, {
            title: "给药途径",
            align: "center",
            dataIndex: 'drugRoute',
            render: (text, row, index) => renderContent(text, row, index, 'drugRoute')
        }, {
            title: "开始时间",
            align: "center",
            dataIndex: 'startTime',
            width:170,
            render: (text, row, index) => renderContent(text, row, index, 'startTime')
        }, {
            title: "结束时间",
            align: "center",
            dataIndex: 'endTime',
            width:170,
            render: (text, row, index) => renderContent(text, row, index, 'endTime')
        }, {
            title: "操作",
            align: "center",
            dataIndex: 'opt',
            render: (text, row, index) => renderContent(text, row, index, 'opt')
        }]
        return (
            <Table
                pagination={false}
                bordered
                dataSource={tableData}
                columns={columns}
                // rowKey='id'
                footer={() => (<Button type="primary" onClick={() => this.props.handleAdd(this.props.name)}><Icon type="plus" />增加一行</Button>)}
            >
            </Table>
        )
    }
}

export default TheRapyForm