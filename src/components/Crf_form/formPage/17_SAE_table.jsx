


/**
 * 不良事件
 */
import React, { Component } from 'react';
import { Form, Button, Input, Table, DatePicker, Icon } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;

class SaeTable extends Component {
    render() {
        let formData = this.props.data || {};
        let tableData = formData[this.props.name] || [];
        tableData = tableData.map((item, index) => {
            item.key = index
            return item;
        })
        const { getFieldDecorator } = this.props.form;

        const renderContent = (text, row, index, type) => {
            let proper = this.props.name ? (this.props.name + '_' + type + '_' + index) : (type + '_' + index)
            let options = {}
            if (typeof text == 'undefined') {
                //判断为undefinded 新增的一行 要不然会复用前面的initialValue
                if (type != 'reportDate') {
                    options.initialValue = ''
                }
            } else {
                options.initialValue = type == 'reportDate' ? moment(text) : text
            }
            if (type == 'opt') {
                return (
                    <div>
                        <Button onClick={() => this.props.handleCheck(this.props.name, index,'check')}>查看</Button>
                        {/* <Button onClick={() => this.props.handleCheck(this.props.name, index,'edit')}>编辑</Button> */}
                        <Button onClick={() => this.props.handleDelete(this.props.name, index)}>删除</Button>
                    </div>
                )
            } else {
                options.rules = [
                    {
                        message:'请输入'+'',
                        required:true
                    }
                ]
                return <FormItem>
                    {
                        getFieldDecorator(proper, options)(
                            type == 'reportDate' ? <DatePicker onChange={(date) => this.props.handleChange(this.props.name, index, type, date.format('YYYY-MM-DD'))} /> : <Input onChange={(event) => this.props.handleChange(this.props.name, index, type, event.target.value)} />
                        )
                    }
                </FormItem>;
            }

        }
        const columns = [{
            title: "SAE名称及诊断",
            align: "center",
            dataIndex: 'saeName',
            render: (text, row, index) => renderContent(text, row, index, 'saeName')
        }, {
            title: "报告时间",
            align: "center",
            dataIndex: 'reportDate',
            render: (text, row, index) => renderContent(text, row, index, 'reportDate')
        }, {
            title: "报告人",
            align: "center",
            dataIndex: 'doctorName',
            width: 170,
            render: (text, row, index) => renderContent(text, row, index, 'doctorName')
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
                footer={() => (<Button type="primary" onClick={this.props.handleOpenSae}><Icon type="plus" />添加SAE报告表</Button>)}
            >
            </Table>
        )
    }
}

export default SaeTable