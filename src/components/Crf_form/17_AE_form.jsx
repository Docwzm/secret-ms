


/**
 * 强化CSII治疗情况
 */
import React, { Component } from 'react';
import { Form, Button, Input, Table, DatePicker, Icon, Select } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

class AeForm extends Component {
    render() {
        let disabled = this.props.disabled;
        let formData = this.props.data || {};
        let tableData = formData[this.props.name] && formData[this.props.name].length > 0 ? formData[this.props.name] : [{}];
        // tableData = tableData.map((item,index) => {
        //     item.key = index
        //     return item;
        // })
        // return false
        const { getFieldDecorator } = this.props.form;
        const date = [moment(formData.startDate), moment(formData.endDate)];


        const renderContent = (text, row, index, type) => {
            let proper = this.props.name ? (this.props.name + '_' + type + '_' + index) : (type + '_' + index)
            let options = {
                rules: [{ required: "true", message: '不能为空' }]
            }
            if (typeof text == 'undefined') {
                //判断为undefinded 新增的一行 要不然会复用前面的initialValue
                options.initialValue = ''
            }else{
                options.initialValue = type == 'startDate' || type == 'endDate' ? moment(text) : text
            }
            if (type == 'opt') {
                return <Button disabled={disabled} onClick={() => this.props.handleDelete(this.props.name, index)}>删除</Button>
            } else {
                return <FormItem>
                    {
                        getFieldDecorator(proper, options)(
                            type == 'saeFlag' ? (<Select disabled={disabled} onChange={(value) => this.props.handleChange(this.props.name, index, type, value)}>
                                <Option value={true}>是</Option>
                                <Option value={false}>否</Option>
                            </Select>) : (type == 'startDate' || type == 'endDate' ? <DatePicker onChange={(date) => this.props.handleChange(this.props.name, index, type, date)} disabled={disabled} /> : <Input onChange={(event) => this.props.handleChange(this.props.name, index, type, event)} disabled={disabled} />)
                        )
                    }
                </FormItem>;
            }

        }
        const columns = [{
            title: "AE名称",
            align: "center",
            dataIndex: 'aeName',
            render: (text, row, index) => renderContent(text, row, index, 'aeName')
        }, {
            title: "AE描述",
            align: "center",
            dataIndex: 'aeDescribe',
            render: (text, row, index) => renderContent(text, row, index, 'aeDescribe')
        }, {
            title: "开始时间",
            align: "center",
            dataIndex: 'startDate',
            render: (text, row, index) => renderContent(text, row, index, 'startDate')
        }, {
            title: "结束时间",
            align: "center",
            dataIndex: 'endDate',
            render: (text, row, index) => renderContent(text, row, index, 'endDate')
        }, {
            title: "验证程度",
            align: "center",
            dataIndex: 'severity',
            render: (text, row, index) => renderContent(text, row, index, 'severity')
        }, {
            title: "是否SAE",
            align: "center",
            dataIndex: 'saeFlag',
            render: (text, row, index) => renderContent(text, row, index, 'saeFlag')
        }, {
            title: "与研究的关系",
            align: "center",
            dataIndex: 'researchRelation',
            render: (text, row, index) => renderContent(text, row, index, 'researchRelation')
        }, {
            title: "AE处理",
            align: "center",
            dataIndex: 'aeHandle',
            render: (text, row, index) => renderContent(text, row, index, 'aeHandle')
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
                rowKey='id'
                footer={() => (<Button disabled={disabled} type="primary" onClick={() => this.props.handleAdd(this.props.name)}><Icon type="plus" />增加一行</Button>)}
            >
            </Table>
        )
    }
}

export default AeForm